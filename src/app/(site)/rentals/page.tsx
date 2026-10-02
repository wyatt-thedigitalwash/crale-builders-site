import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { Suspense } from 'react';
import { ApplySection } from '@/components/rentals/apply-section';
import { RentalsList } from '@/components/rentals/rentals-list';
import { container } from '@/components/site/container';
import { getPublishedRentals } from '@/lib/content/public';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

const RENTAL_CITIES = ['Sidney', 'Anna', 'Troy', 'Tipp City', 'Indian Lake'];

export const metadata: Metadata = pageMetadata({
  name: 'Rental Homes and Apartments',
  description:
    'Houses, townhomes, and apartments managed by Crale Builders in Sidney, Anna, Troy, Tipp City, and Indian Lake, Ohio. Call 937.498.8000 for current availability.',
  path: '/rentals',
});

const structuredData = [
  serviceSchema({
    name: 'Rental homes and property management',
    description: metadata.description as string,
    path: '/rentals',
    serviceType: 'Residential property management',
    areaServed: RENTAL_CITIES.map((city) => `${city}, Ohio`),
  }),
  breadcrumbSchema([{ name: 'Rentals', path: '/rentals' }]),
];

/** Listings come from the portal, so Crale can update them without a rebuild. */
async function Listings() {
  const units = await getPublishedRentals();
  return <RentalsList units={units} />;
}

/** Matches the shape of the text-only cards, so nothing shifts when the listings arrive. */
function ListingsSkeleton() {
  return (
    <div className={`${container} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="bg-seawall p-5">
          <div className="h-6 w-2/3 rounded-[2px] bg-[#dfe3dc]" />
          <div className="mt-3 h-4 w-1/2 rounded-[2px] bg-[#dfe3dc]" />
          <div className="mt-8 h-7 w-36 rounded-[2px] bg-[#dfe3dc]" />
        </div>
      ))}
    </div>
  );
}

export default function RentalsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section data-bg="white" aria-labelledby="rentals-intro-title">
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16`}>
          <div className="lg:col-span-7">
            <h1
              id="rentals-intro-title"
              className="font-display text-[2.375rem] font-[760] leading-[1] tracking-[-0.025em] text-balance font-stretch-semi-condensed md:text-[3.25rem] xl:text-[3.75rem]"
            >
              Rentals managed by Crale
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
              Crale builds these homes and looks after them too, so the people who take your call are the people who
              maintain the building.
            </p>
          </div>

          {/* Label over value, so the two facts renters need are easy to scan */}
          <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <div>
              <dt className="font-display text-[15px] text-ink-soft">Where</dt>
              <dd className="mt-1 font-display text-[1.25rem] font-[650] leading-snug font-stretch-semi-condensed">
                {listWithAnd(RENTAL_CITIES)}
              </dd>
            </div>
            <div>
              <dt className="font-display text-[15px] text-ink-soft">Availability changes often</dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <a
                  href={BUSINESS.phone.href}
                  className="font-display text-[1.25rem] font-[650] tabular-nums text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] font-stretch-semi-condensed hover:text-crale-green"
                >
                  Call {BUSINESS.phone.display}
                </a>
                <a
                  href="#apply"
                  className="font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] hover:text-crale-green"
                >
                  How to apply
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="listings" data-bg="white" aria-label="Rental listings">
        <Suspense fallback={<ListingsSkeleton />}>
          <Listings />
        </Suspense>
      </section>

      <ApplySection />
    </>
  );
}
