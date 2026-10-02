import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RentalPhotos } from '@/components/rentals/rental-photos';
import { buttonPrimary } from '@/components/site/button-styles';
import { container } from '@/components/site/container';
import { RENTAL_STATUS_LABELS, RENTAL_TYPE_LABELS } from '@/lib/content/options';
import { getPublishedRentals } from '@/lib/content/public';
import { JsonLd } from '@/components/site/json-ld';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/site/business';
import type { DisplayPhoto } from '@/lib/site/photos';
import { withRentalSlugs } from '@/lib/site/rental-slug';

type Params = { params: Promise<{ slug: string }> };

async function findUnit(slug: string) {
  const units = await getPublishedRentals();
  return withRentalSlugs(units).find((entry) => entry.slug === slug)?.unit;
}

export async function generateStaticParams() {
  const units = await getPublishedRentals();
  return withRentalSlugs(units).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const unit = await findUnit((await params).slug);
  if (!unit) return {};

  return pageMetadata({
    name: `${unit.address} Rental, ${unit.city}`,
    description: rentalDescription(unit),
    path: `/rentals/${(await params).slug}`,
  });
}

/** A 150 to 160 character description. Addresses vary in length, so it tries a few phrasings. */
function rentalDescription(unit: { address: string; city: string; type: keyof typeof RENTAL_TYPE_LABELS; bedrooms: number | null }) {
  const type = RENTAL_TYPE_LABELS[unit.type].toLowerCase();
  const what = unit.bedrooms ? `${unit.bedrooms} bedroom ${type}` : type;
  const what1 = what.charAt(0).toUpperCase() + what.slice(1);
  const where = `${unit.address} in ${unit.city}, Ohio`;
  const phone = BUSINESS.phone.display;
  const who = [
    'managed by Crale Builders',
    'built and managed by Crale Builders',
    'built and managed by Crale Builders of Sidney',
    'built and managed by Crale Builders of Sidney, Ohio',
  ];
  const ask = [
    'for availability.',
    'to ask about availability.',
    'to ask about current availability.',
    'to ask about availability or set up a showing.',
    'to ask about current availability or set up a showing.',
  ];
  const options = who.flatMap((w) => ask.map((q) => `${what1} for rent at ${where}, ${w}. Call ${phone} ${q}`));
  const fits = options.find((option) => option.length >= 150 && option.length <= 160);
  if (fits) return fits;
  // Otherwise the option closest to the range.
  const distance = (text: string) => (text.length < 150 ? 150 - text.length : Math.max(0, text.length - 160));
  return [...options].sort((a, b) => distance(a) - distance(b))[0];
}

const heading =
  'font-display text-[1.5rem] font-[720] leading-tight font-stretch-semi-condensed md:text-[1.875rem]';

export default async function RentalDetailPage({ params }: Params) {
  const { slug } = await params;
  const unit = await findUnit(slug);
  if (!unit) notFound();

  const photos: DisplayPhoto[] = unit.images
    .filter((image) => image.kind === 'photo')
    .map((image) => ({
      src: image.url,
      alt: image.alt,
      width: image.width ?? 1000,
      height: image.height ?? 750,
    }));
  const plans = unit.images.filter((image) => image.kind === 'floor_plan');

  const facts = [
    unit.bedrooms ? { label: 'Bedrooms', value: String(unit.bedrooms) } : null,
    unit.bathrooms ? { label: 'Bathrooms', value: String(unit.bathrooms) } : null,
    unit.sqft ? { label: 'Square feet', value: unit.sqft.toLocaleString() } : null,
    unit.rent ? { label: 'Rent', value: `$${unit.rent.toLocaleString()} a month` } : null,
    unit.availableOn ? { label: 'Available', value: unit.availableOn } : null,
  ].filter((fact) => fact !== null);

  const structuredData = breadcrumbSchema([
    { name: 'Rentals', path: '/rentals' },
    { name: unit.address, path: `/rentals/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={structuredData} />
      <section data-bg="white" aria-labelledby="unit-title">
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <p className="font-display text-[15px] text-ink-soft">
              <Link
                href="/rentals"
                className="underline decoration-crale-green decoration-2 underline-offset-[5px] transition-colors hover:text-crale-green motion-reduce:transition-none"
              >
                Rentals
              </Link>
              <span aria-hidden="true"> / </span>
              {unit.city}
            </p>

            <h1
              id="unit-title"
              className="mt-4 font-display text-[2.25rem] font-[760] leading-[1.04] tracking-[-0.02em] text-balance font-stretch-semi-condensed md:text-[3rem]"
            >
              {unit.address}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              {unit.community ? `${unit.community} · ` : ''}
              {unit.city}, Ohio {'· '}
              {RENTAL_TYPE_LABELS[unit.type]}
            </p>

            <p className="mt-5">
              <span className="inline-block bg-sign-yellow px-3 py-1.5 font-display text-[15px] font-semibold text-ink">
                {RENTAL_STATUS_LABELS[unit.status]}
              </span>
            </p>

            {unit.description && (
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{unit.description}</p>
            )}

            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-display text-[15px] text-ink-soft">{fact.label}</dt>
                    <dd className="m-0 mt-1 font-display text-[1.25rem] font-[680] leading-tight tabular-nums font-stretch-semi-condensed">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-seawall p-6 md:p-8">
              <h2 className={heading}>Interested in this one?</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
                Call the office to ask whether it is open and to set up a time to see it. Applications are on paper, not
                online.
              </p>
              <div className="mt-6 grid gap-4">
                <a href={BUSINESS.phone.href} className={`${buttonPrimary} inline-flex h-12 justify-center`}>
                  Call {BUSINESS.phone.display}
                </a>
                <Link
                  href="/rentals#apply"
                  className="font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
                >
                  How to apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section data-bg="white" aria-labelledby="unit-photos-title">
          <div className={container}>
            <h2 id="unit-photos-title" className={heading}>
              Photos
            </h2>
            <div className="mt-6">
              <RentalPhotos photos={photos} label={`${unit.address} photos`} />
            </div>
          </div>
        </section>
      )}

      {plans.length > 0 && (
        <section data-bg="white" aria-labelledby="unit-plan-title">
          <div className={container}>
            <h2 id="unit-plan-title" className={heading}>
              {plans.length === 1 ? 'Floor plan' : 'Floor plans'}
            </h2>
            <ul className="mt-6 grid gap-6 lg:grid-cols-2">
              {plans.map((plan) => (
                <li key={plan.id}>
                  <Image
                    src={plan.url}
                    alt={plan.alt}
                    width={plan.width ?? 1000}
                    height={plan.height ?? 750}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="h-auto w-full rounded-[4px] bg-white"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section data-bg="seawall" aria-labelledby="more-rentals-title">
        <div className={container}>
          <h2 id="more-rentals-title" className={heading}>
            More rentals
          </h2>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            See everything Crale manages in {unit.city} and the other towns we cover.
          </p>
          <Link
            href="/rentals"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            All rentals
          </Link>
        </div>
      </section>
    </>
  );
}
