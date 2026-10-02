import 'server-only';
import { count, eq, sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { galleryImages, rentalImages, rentalUnits } from '@/lib/db/schema';
import { deleteStoredImage } from '@/lib/storage';

/** Deletes the stored file once no rental or gallery row points at it (seeded exteriors are shared). */
export async function deleteImageIfUnreferenced(url: string): Promise<void> {
  const db = await getDb();
  const [[rental], [gallery]] = await Promise.all([
    db.select({ n: count() }).from(rentalImages).where(eq(rentalImages.url, url)),
    db.select({ n: count() }).from(galleryImages).where(eq(galleryImages.url, url)),
  ]);
  if (rental.n + gallery.n === 0) await deleteStoredImage(url);
}

/** Returns ids in their new order, or null when the move is not possible. */
export function reorderIds(ids: number[], id: number, direction: 'up' | 'down'): number[] | null {
  const index = ids.indexOf(id);
  const target = direction === 'up' ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= ids.length) return null;

  const next = [...ids];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Writes sort_order = position for every id in one statement. */
export async function applySortOrder(
  table: typeof rentalImages | typeof galleryImages | typeof rentalUnits,
  ids: number[],
): Promise<void> {
  if (ids.length === 0) return;
  const db = await getDb();
  const rows = sql.join(
    ids.map((id, position) => sql`(${id}::int, ${position}::int)`),
    sql`, `,
  );
  await db.execute(
    sql`update ${table} set sort_order = v.pos from (values ${rows}) as v(id, pos) where ${table}.id = v.id`,
  );
}
