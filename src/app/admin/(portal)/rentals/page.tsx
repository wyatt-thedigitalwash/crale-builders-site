import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buttonPrimary, buttonSecondary, pageTitleClass, sectionTitleClass } from '@/components/admin/ui';
import { listRentalsForAdmin } from '@/lib/admin/queries';
import { RENTAL_TYPE_LABELS } from '@/lib/content/options';
import { setRentalStatus } from './actions';
import { StatusSelect } from './status-select';

export const metadata: Metadata = {
  title: 'Rentals',
  description: 'Manage rental listings on the Crale Builders website.',
};

export default async function RentalsPage() {
  const rentals = await listRentalsForAdmin();
  const byCity = Map.groupBy(rentals, (unit) => unit.city);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={pageTitleClass}>Rentals</h1>
          <p className="mt-1 text-zinc-700">
            {rentals.length} units. Change a status and the website updates right away.
          </p>
        </div>
        <Link href="/admin/rentals/new" className={buttonPrimary}>
          Add a Rental
        </Link>
      </div>

      {[...byCity].map(([city, units]) => (
        <section key={city} aria-label={city} className="mt-8">
          <h2 className={sectionTitleClass}>
            {city} <span className="font-normal text-zinc-600">({units.length})</span>
          </h2>
          <ul className="mt-3 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white">
            {units.map((unit) => {
              const cover = unit.images.find((image) => image.kind === 'photo') ?? unit.images[0];
              const missing = unit.images.filter((image) => !image.alt).length;
              const details = [
                unit.community,
                RENTAL_TYPE_LABELS[unit.type],
                unit.sqft && `${unit.sqft.toLocaleString('en-US')} sq ft`,
                unit.rent && `$${unit.rent.toLocaleString('en-US')}/mo`,
              ].filter(Boolean);

              return (
                <li key={unit.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded bg-zinc-100 sm:block">
                    {cover && <Image src={cover.url} alt="" fill sizes="96px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/rentals/${unit.id}`} className="font-semibold text-zinc-900 hover:underline">
                      {unit.address}
                    </Link>
                    <p className="text-sm text-zinc-600">{details.join(' · ')}</p>
                    <p className="mt-1 flex flex-wrap gap-2 text-xs">
                      {!unit.published && <span className="rounded bg-zinc-200 px-2 py-0.5 text-zinc-800">Hidden from website</span>}
                      {unit.images.length === 0 && <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-700">No photos</span>}
                      {missing > 0 && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-900">
                          {missing} {missing === 1 ? 'photo needs' : 'photos need'} a description
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusSelect
                      action={setRentalStatus.bind(null, unit.id)}
                      status={unit.status}
                      label={`Status for ${unit.address}`}
                    />
                    <Link href={`/admin/rentals/${unit.id}`} className={buttonSecondary}>
                      Edit
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
