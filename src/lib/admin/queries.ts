import 'server-only';
import { and, asc, count, eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth/session';
import type { GalleryCategory } from '@/lib/content/options';
import { getDb } from '@/lib/db';
import { galleryImages, rentalImages, rentalUnits } from '@/lib/db/schema';

// Portal reads. Every function re-checks the session itself, because layouts
// do not re-run on client navigation and cannot be relied on for authorization.

export async function listRentalsForAdmin() {
  await requireAdmin();
  const db = await getDb();
  return db.query.rentalUnits.findMany({
    orderBy: [asc(rentalUnits.city), asc(rentalUnits.sortOrder), asc(rentalUnits.id)],
    with: {
      images: {
        columns: { id: true, url: true, alt: true, kind: true },
        orderBy: [asc(rentalImages.sortOrder), asc(rentalImages.id)],
      },
    },
  });
}

export async function getRentalForAdmin(id: number) {
  await requireAdmin();
  const db = await getDb();
  return db.query.rentalUnits.findFirst({
    where: eq(rentalUnits.id, id),
    with: { images: { orderBy: [asc(rentalImages.sortOrder), asc(rentalImages.id)] } },
  });
}

export async function listGalleryForAdmin(category: GalleryCategory) {
  await requireAdmin();
  const db = await getDb();
  return db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.category, category))
    .orderBy(asc(galleryImages.sortOrder), asc(galleryImages.id));
}

export async function getPortalSummary() {
  await requireAdmin();
  const db = await getDb();
  const [[units], [available], [rentalMissing], [galleryMissing], galleryByCategory] = await Promise.all([
    db.select({ n: count() }).from(rentalUnits),
    db.select({ n: count() }).from(rentalUnits).where(and(eq(rentalUnits.status, 'available'), eq(rentalUnits.published, true))),
    db.select({ n: count() }).from(rentalImages).where(eq(rentalImages.alt, '')),
    db.select({ n: count() }).from(galleryImages).where(eq(galleryImages.alt, '')),
    db.select({ category: galleryImages.category, n: count() }).from(galleryImages).groupBy(galleryImages.category),
  ]);

  return {
    rentalCount: units.n,
    availableCount: available.n,
    photosNeedingDescriptions: rentalMissing.n + galleryMissing.n,
    galleryByCategory: Object.fromEntries(galleryByCategory.map((row) => [row.category, row.n])) as Partial<
      Record<GalleryCategory, number>
    >,
  };
}
