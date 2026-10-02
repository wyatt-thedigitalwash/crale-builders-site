// URLs for rental detail pages come from the address and city, so staff never have to think about
// slugs in the portal. Two units that would collide both get their id appended, which keeps every
// URL stable as long as the address stays the same.

type SluggableUnit = { id: number; address: string; city: string };

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function baseSlug(unit: SluggableUnit): string {
  return `${slugify(unit.address)}-${slugify(unit.city)}`;
}

/** Pairs each unit with its URL slug. Always call this with the full published list. */
export function withRentalSlugs<T extends SluggableUnit>(units: T[]): { unit: T; slug: string }[] {
  const counts = new Map<string, number>();
  for (const unit of units) {
    const base = baseSlug(unit);
    counts.set(base, (counts.get(base) ?? 0) + 1);
  }

  return units.map((unit) => {
    const base = baseSlug(unit);
    return { unit, slug: (counts.get(base) ?? 0) > 1 ? `${base}-${unit.id}` : base };
  });
}
