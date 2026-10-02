import { RentalCard } from './rental-card';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { withRentalSlugs } from '@/lib/site/rental-slug';
import type { RentalImage, RentalUnit } from '@/lib/db/schema';

type Unit = RentalUnit & { images: RentalImage[] };

/** Listings grouped by city, in the order the portal returns them. */
export function RentalsList({ units }: { units: Unit[] }) {
  if (units.length === 0) {
    return (
      <div className={container}>
        <p className="text-lg leading-relaxed text-ink-soft">
          Nothing is listed right now. Call {BUSINESS.phone.display} and we will tell you what is coming open.
        </p>
      </div>
    );
  }

  const cities: { city: string; entries: { unit: Unit; slug: string }[] }[] = [];
  for (const entry of withRentalSlugs(units)) {
    const group = cities.find((city) => city.city === entry.unit.city);
    if (group) group.entries.push(entry);
    else cities.push({ city: entry.unit.city, entries: [entry] });
  }

  return (
    <div className={`${container} grid gap-14 lg:gap-16`}>
      {cities.map(({ city, entries }) => {
        const id = `city-${city.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <section key={city} aria-labelledby={id}>
            <h2
              id={id}
              className="font-display text-[1.75rem] font-[720] leading-[1.08] tracking-[-0.015em] font-stretch-semi-condensed md:text-[2.25rem]"
            >
              {city} <span className="font-[620] tabular-nums text-ink-soft">({entries.length})</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map(({ unit, slug }) => (
                <li key={unit.id} className="flex">
                  <RentalCard unit={unit} slug={slug} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
