'use server';

import { refresh, updateTag } from 'next/cache';
import { asc, eq, max } from 'drizzle-orm';
import { z } from 'zod';
import type { ActionResult, FormState } from '@/lib/admin/form-state';
import { applySortOrder, deleteImageIfUnreferenced, reorderIds } from '@/lib/admin/images';
import {
  directionSchema,
  galleryImageSchema,
  idSchema,
  invalid,
  uploadedImagesSchema,
} from '@/lib/admin/validation';
import { requireAdmin } from '@/lib/auth/session';
import { GALLERY_CATEGORIES, type GalleryCategory, type UploadedImage } from '@/lib/content/options';
import { GALLERY_TAG } from '@/lib/content/tags';
import { getDb } from '@/lib/db';
import { galleryImages } from '@/lib/db/schema';
import { isTrustedImageUrl } from '@/lib/storage';

/** Expire the public gallery cache and re-render the portal page. */
function galleryChanged() {
  updateTag(GALLERY_TAG);
  refresh();
}

async function nextSortOrder(category: GalleryCategory): Promise<number> {
  const db = await getDb();
  const [{ top }] = await db
    .select({ top: max(galleryImages.sortOrder) })
    .from(galleryImages)
    .where(eq(galleryImages.category, category));
  return (top ?? -1) + 1;
}

export async function addGalleryImages(images: UploadedImage[], category: string): Promise<ActionResult> {
  await requireAdmin();
  const parsedImages = uploadedImagesSchema.safeParse(images);
  const parsedCategory = z.enum(GALLERY_CATEGORIES).safeParse(category);
  if (!parsedImages.success || !parsedCategory.success || !parsedImages.data.every((i) => isTrustedImageUrl(i.url))) {
    return { ok: false, message: 'Those uploads could not be saved. Please try again.' };
  }

  const start = await nextSortOrder(parsedCategory.data);
  const db = await getDb();
  await db.insert(galleryImages).values(
    parsedImages.data.map((image, index) => ({
      ...image,
      category: parsedCategory.data,
      sortOrder: start + index,
    })),
  );

  galleryChanged();
  const n = parsedImages.data.length;
  return {
    ok: true,
    message: `${n} ${n === 1 ? 'photo' : 'photos'} uploaded. Add a description to each one so it shows on the website.`,
  };
}

export async function updateGalleryImage(
  imageId: number,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const id = idSchema.parse(imageId);
  const parsed = galleryImageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);

  const db = await getDb();
  const [current] = await db.select({ category: galleryImages.category }).from(galleryImages).where(eq(galleryImages.id, id));
  if (!current) return { status: 'error', message: 'This photo has been deleted.' };

  // A photo moved to another category goes to the end of that category.
  const sortOrder = current.category === parsed.data.category ? undefined : await nextSortOrder(parsed.data.category);
  await db
    .update(galleryImages)
    .set({ ...parsed.data, ...(sortOrder === undefined ? {} : { sortOrder }) })
    .where(eq(galleryImages.id, id));

  galleryChanged();
  return { status: 'saved', message: 'Saved.' };
}

export async function moveGalleryImage(imageId: number, direction: 'up' | 'down'): Promise<void> {
  await requireAdmin();
  const id = idSchema.parse(imageId);
  const db = await getDb();
  const [image] = await db.select({ category: galleryImages.category }).from(galleryImages).where(eq(galleryImages.id, id));
  if (!image) return;

  const siblings = await db
    .select({ id: galleryImages.id })
    .from(galleryImages)
    .where(eq(galleryImages.category, image.category))
    .orderBy(asc(galleryImages.sortOrder), asc(galleryImages.id));
  const order = reorderIds(siblings.map((s) => s.id), id, directionSchema.parse(direction));
  if (!order) return;

  await applySortOrder(galleryImages, order);
  galleryChanged();
}

export async function deleteGalleryImage(imageId: number): Promise<void> {
  await requireAdmin();
  const db = await getDb();
  const [deleted] = await db
    .delete(galleryImages)
    .where(eq(galleryImages.id, idSchema.parse(imageId)))
    .returning({ url: galleryImages.url });
  if (deleted) await deleteImageIfUnreferenced(deleted.url);
  galleryChanged();
}
