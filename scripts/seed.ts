// Imports rentals and gallery photos extracted from the old cralebuilders.com
// (research/rentals.json and research/old-site/assets) into the database.
//
//   npm run db:seed              skips if rentals already exist
//   npm run db:seed -- --force   clears rentals and gallery rows first
//
// Uploads to Vercel Blob when BLOB_READ_WRITE_TOKEN is set, otherwise copies
// into public/uploads. With the local PGlite database, stop `npm run dev` first.
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { loadEnvConfig } from '@next/env';
import { count } from 'drizzle-orm';
import { createDatabase } from '../src/lib/db/client';
import { galleryImages, rentalImages, rentalUnits } from '../src/lib/db/schema';
import type { GalleryCategory, RentalType } from '../src/lib/content/options';
import {
  COMMERCIAL_ALT,
  FEATURED,
  INDIAN_LAKE_ALT,
  INTERIOR_ALT,
  REMODELING_KEYS,
  RESIDENTIAL_EXTERIOR_ALT,
} from './seed-data';

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, 'research/old-site/assets');
const TOWNHOME_COMMUNITIES = ['Winter Ridge', 'Cumberland', 'Cider Mill', 'Abby Glen'];
const CONTENT_TYPES: Record<string, string> = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };

type RentalSeed = { city: string; address: string; street: string; type: string; sqft: number | null; images: string[] };
type Stored = { url: string; pathname: string; width: number | null; height: number | null };

const log = (message: string) => process.stdout.write(`${message}\n`);

/** Dimensions recorded in research/image-inventory.csv ("1000x731"). */
async function loadDimensions(): Promise<Map<string, [number, number]>> {
  const csv = await readFile(path.join(ROOT, 'research/image-inventory.csv'), 'utf8');
  const dims = new Map<string, [number, number]>();
  for (const line of csv.split('\n').slice(1)) {
    const match = line.match(/^research\/old-site\/assets\/([^,]+),[^,]*,(\d+)x(\d+),/);
    if (match) dims.set(match[1], [Number(match[2]), Number(match[3])]);
  }
  return dims;
}

async function main() {
  loadEnvConfig(ROOT);
  const force = process.argv.includes('--force');
  const { db, driver, close } = await createDatabase();
  const dimensions = await loadDimensions();
  const stored = new Map<string, Stored>();

  const [{ n: existing }] = await db.select({ n: count() }).from(rentalUnits);
  if (existing > 0 && !force) {
    log(`Database already has ${existing} rentals. Run with --force to replace rentals and gallery.`);
    await close();
    return;
  }
  if (force) {
    await db.delete(rentalImages);
    await db.delete(rentalUnits);
    await db.delete(galleryImages);
  }

  async function store(relPath: string, folder: 'rentals' | 'gallery'): Promise<Stored> {
    const cached = stored.get(relPath);
    if (cached) return cached;

    const ext = path.extname(relPath).toLowerCase();
    // Include the source subfolder: every old gallery folder has its own 001.jpg.
    const stem = relPath.slice(0, -ext.length).replace(/^images\/(gallery|rentals)\//i, '');
    const name = `${stem.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${ext}`;
    const [width, height] = dimensions.get(relPath) ?? [null, null];
    let result: Stored;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const blob = await put(`${folder}/${name}`, await readFile(path.join(ASSETS, relPath)), {
        access: 'public',
        addRandomSuffix: true,
        contentType: CONTENT_TYPES[ext],
      });
      result = { url: blob.url, pathname: blob.pathname, width, height };
    } else {
      const pathname = `${folder}/${name}`;
      await mkdir(path.join(ROOT, 'public/uploads', folder), { recursive: true });
      await copyFile(path.join(ASSETS, relPath), path.join(ROOT, 'public/uploads', pathname));
      result = { url: `/uploads/${pathname}`, pathname, width, height };
    }

    stored.set(relPath, result);
    return result;
  }

  // Rentals ------------------------------------------------------------------
  const rentals: RentalSeed[] = JSON.parse(await readFile(path.join(ROOT, 'research/rentals.json'), 'utf8'));
  const positionInCity = new Map<string, number>();

  for (const rental of rentals) {
    const isTownhome = rental.type === 'Townhome';
    const community = isTownhome ? (TOWNHOME_COMMUNITIES.find((c) => rental.street.includes(c)) ?? null) : null;
    // Old site did not say which non-townhomes are apartments; unit letters and "1/2" suggest it. Confirm with client.
    const type: RentalType = isTownhome ? 'townhome' : /\s[A-D]\s|1\/2/.test(rental.address) ? 'apartment' : 'house';
    const sortOrder = positionInCity.get(rental.city) ?? 0;
    positionInCity.set(rental.city, sortOrder + 1);

    const [unit] = await db
      .insert(rentalUnits)
      .values({ address: rental.address, city: rental.city, community, type, status: 'call', sqft: rental.sqft, sortOrder })
      .returning({ id: rentalUnits.id });

    const images = rental.images
      .map((src) => src.replace('/interior/small/', '/interior/').replace(/-SM\.jpg$/, '.jpg'))
      .map((src) => ({
        src,
        kind: src.includes('floor plans') ? ('floor_plan' as const) : ('photo' as const),
        rank: src.includes('exterior') ? 0 : src.includes('interior') ? 1 : 2,
      }))
      .sort((a, b) => a.rank - b.rank || a.src.localeCompare(b.src));

    const place = `${rental.address}, ${rental.city}`;
    for (const [index, image] of images.entries()) {
      const file = await store(image.src, 'rentals');
      const alt =
        image.kind === 'floor_plan'
          ? `Floor plan for ${place}`
          : image.rank === 0
            ? `Exterior of ${community ? `${community} townhomes` : 'rental'} at ${place}`
            : `Interior of ${place}, photo ${index}`;
      await db.insert(rentalImages).values({ ...file, unitId: unit.id, alt, kind: image.kind, sortOrder: index });
    }
  }
  log(`Imported ${rentals.length} rentals.`);

  // Gallery ------------------------------------------------------------------
  const groups: { folder: string; alts: Record<string, string>; category: GalleryCategory }[] = [
    { folder: 'indian-lake', alts: INDIAN_LAKE_ALT, category: 'indian-lake' },
    { folder: 'residential', alts: RESIDENTIAL_EXTERIOR_ALT, category: 'custom-homes' },
    { folder: 'residential', alts: INTERIOR_ALT, category: 'interiors' },
    { folder: 'commercial', alts: COMMERCIAL_ALT, category: 'commercial' },
  ];

  let galleryCount = 0;
  for (const group of groups) {
    for (const [index, [key, alt]] of Object.entries(group.alts).entries()) {
      const file = await store(`images/Gallery/${group.folder}/${key.toUpperCase()}.jpg`, 'gallery');
      await db.insert(galleryImages).values({
        ...file,
        alt,
        category: group.category === 'interiors' && REMODELING_KEYS.has(key) ? 'remodeling' : group.category,
        featured: FEATURED.has(`${group.folder}/${key}`),
        sortOrder: index,
      });
      galleryCount += 1;
    }
  }
  log(`Imported ${galleryCount} gallery photos (${stored.size} files stored, ${driver}).`);

  await close();
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});
