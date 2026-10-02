import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { and, asc, eq, ne } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { galleryImages, rentalImages, rentalUnits } from '@/lib/db/schema';
import type { GalleryCategory } from './options';
import { GALLERY_TAG, RENTALS_TAG } from './tags';

// Public site reads. Cached until a portal Server Action calls updateTag,
// so edits appear immediately without a rebuild or redeploy.
// Images without alt text are held back until someone describes them.

export async function getPublishedRentals() {
  'use cache';
  cacheTag(RENTALS_TAG);
  cacheLife('max');

  const db = await getDb();
  return db.query.rentalUnits.findMany({
    where: eq(rentalUnits.published, true),
    orderBy: [asc(rentalUnits.city), asc(rentalUnits.sortOrder), asc(rentalUnits.id)],
    with: {
      images: {
        where: ne(rentalImages.alt, ''),
        orderBy: [asc(rentalImages.sortOrder), asc(rentalImages.id)],
      },
    },
  });
}

export async function getGalleryImages(category?: GalleryCategory) {
  'use cache';
  cacheTag(GALLERY_TAG);
  cacheLife('max');

  const db = await getDb();
  const described = ne(galleryImages.alt, '');
  return db
    .select()
    .from(galleryImages)
    .where(category ? and(eq(galleryImages.category, category), described) : described)
    .orderBy(asc(galleryImages.category), asc(galleryImages.sortOrder), asc(galleryImages.id));
}
