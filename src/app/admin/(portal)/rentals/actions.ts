'use server';

import { redirect } from 'next/navigation';
import { refresh, updateTag } from 'next/cache';
import { asc, eq, max } from 'drizzle-orm';
import { z } from 'zod';
import type { ActionResult, FormState } from '@/lib/admin/form-state';
import { applySortOrder, deleteImageIfUnreferenced, reorderIds } from '@/lib/admin/images';
import {
  directionSchema,
  idSchema,
  invalid,
  rentalImageSchema,
  rentalSchema,
  uploadedImagesSchema,
} from '@/lib/admin/validation';
import { requireAdmin } from '@/lib/auth/session';
import { RENTAL_IMAGE_KINDS, RENTAL_STATUSES, type UploadedImage } from '@/lib/content/options';
import { RENTALS_TAG } from '@/lib/content/tags';
import { getDb } from '@/lib/db';
import { rentalImages, rentalUnits } from '@/lib/db/schema';
import { isTrustedImageUrl } from '@/lib/storage';

/** Expire the public rentals cache and re-render the portal page. */
function rentalsChanged() {
  updateTag(RENTALS_TAG);
  refresh();
}

export async function saveRental(
  unitId: number | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = rentalSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);
  const db = await getDb();

  if (unitId === null) {
    const [created] = await db.insert(rentalUnits).values(parsed.data).returning({ id: rentalUnits.id });
    updateTag(RENTALS_TAG);
    redirect(`/admin/rentals/${created.id}`);
  }

  const [updated] = await db
    .update(rentalUnits)
    .set(parsed.data)
    .where(eq(rentalUnits.id, idSchema.parse(unitId)))
    .returning({ id: rentalUnits.id });
  if (!updated) return { status: 'error', message: 'This rental has been deleted.' };

  rentalsChanged();
  return { status: 'saved', message: 'Saved. The website now shows these changes.' };
}

export async function setRentalStatus(unitId: number, formData: FormData): Promise<void> {
  await requireAdmin();
  const status = z.enum(RENTAL_STATUSES).parse(formData.get('status'));
  const db = await getDb();
  await db.update(rentalUnits).set({ status }).where(eq(rentalUnits.id, idSchema.parse(unitId)));
  rentalsChanged();
}

export async function deleteRental(unitId: number): Promise<void> {
  await requireAdmin();
  const id = idSchema.parse(unitId);
  const db = await getDb();
  const images = await db.select({ url: rentalImages.url }).from(rentalImages).where(eq(rentalImages.unitId, id));
  await db.delete(rentalUnits).where(eq(rentalUnits.id, id));
  await Promise.all([...new Set(images.map((image) => image.url))].map(deleteImageIfUnreferenced));
  updateTag(RENTALS_TAG);
  redirect('/admin/rentals');
}

export async function addRentalImages(
  unitId: number,
  images: UploadedImage[],
  kind: string,
): Promise<ActionResult> {
  await requireAdmin();
  const id = idSchema.parse(unitId);
  const parsedImages = uploadedImagesSchema.safeParse(images);
  const parsedKind = z.enum(RENTAL_IMAGE_KINDS).safeParse(kind);
  if (!parsedImages.success || !parsedKind.success || !parsedImages.data.every((i) => isTrustedImageUrl(i.url))) {
    return { ok: false, message: 'Those uploads could not be saved. Please try again.' };
  }

  const db = await getDb();
  const [unit] = await db.select({ id: rentalUnits.id }).from(rentalUnits).where(eq(rentalUnits.id, id));
  if (!unit) return { ok: false, message: 'This rental has been deleted.' };

  const [{ top }] = await db
    .select({ top: max(rentalImages.sortOrder) })
    .from(rentalImages)
    .where(eq(rentalImages.unitId, id));
  const start = (top ?? -1) + 1;

  await db.insert(rentalImages).values(
    parsedImages.data.map((image, index) => ({
      ...image,
      unitId: id,
      kind: parsedKind.data,
      sortOrder: start + index,
    })),
  );

  rentalsChanged();
  const n = parsedImages.data.length;
  return {
    ok: true,
    message: `${n} ${n === 1 ? 'photo' : 'photos'} uploaded. Add a description to each one so it shows on the website.`,
  };
}

export async function updateRentalImage(
  imageId: number,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = rentalImageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);

  const db = await getDb();
  await db.update(rentalImages).set(parsed.data).where(eq(rentalImages.id, idSchema.parse(imageId)));
  rentalsChanged();
  return { status: 'saved', message: 'Saved.' };
}

export async function moveRentalImage(imageId: number, direction: 'up' | 'down'): Promise<void> {
  await requireAdmin();
  const id = idSchema.parse(imageId);
  const db = await getDb();
  const [image] = await db.select({ unitId: rentalImages.unitId }).from(rentalImages).where(eq(rentalImages.id, id));
  if (!image) return;

  const siblings = await db
    .select({ id: rentalImages.id })
    .from(rentalImages)
    .where(eq(rentalImages.unitId, image.unitId))
    .orderBy(asc(rentalImages.sortOrder), asc(rentalImages.id));
  const order = reorderIds(siblings.map((s) => s.id), id, directionSchema.parse(direction));
  if (!order) return;

  await applySortOrder(rentalImages, order);
  rentalsChanged();
}

export async function deleteRentalImage(imageId: number): Promise<void> {
  await requireAdmin();
  const db = await getDb();
  const [deleted] = await db
    .delete(rentalImages)
    .where(eq(rentalImages.id, idSchema.parse(imageId)))
    .returning({ url: rentalImages.url });
  if (deleted) await deleteImageIfUnreferenced(deleted.url);
  rentalsChanged();
}
