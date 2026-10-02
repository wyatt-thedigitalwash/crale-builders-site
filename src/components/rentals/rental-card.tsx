import Link from 'next/link';
import { RENTAL_STATUS_LABELS, RENTAL_TYPE_LABELS } from '@/lib/content/options';
import type { RentalImage, RentalUnit } from '@/lib/db/schema';

type Props = { unit: RentalUnit & { images: RentalImage[] }; slug: string };

/**
 * One listing in the index. Deliberately text only: barely a quarter of the units have a photo, and a
 * grid where some cards carry an image and others do not reads as broken. The photos live on the
 * detail page, where a unit that has them gets all of them.
 */
export function RentalCard({ unit, slug }: Props) {
  const photos = unit.images.filter((image) => image.kind === 'photo').length;
  const plans = unit.images.filter((image) => image.kind === 'floor_plan').length;

  const details = [
    unit.bedrooms ? `${unit.bedrooms} bed` : null,
    unit.bathrooms ? `${unit.bathrooms} bath` : null,
    unit.sqft ? `${unit.sqft.toLocaleString()} sq ft` : null,
    unit.rent ? `$${unit.rent.toLocaleString()} a month` : null,
  ].filter(Boolean);

  const extras = [
    photos > 0 ? `${photos} photo${photos === 1 ? '' : 's'}` : null,
    plans > 0 ? 'Floor plan' : null,
  ].filter(Boolean);

  return (
    <article className="group relative flex h-full w-full flex-col bg-seawall p-5 transition-colors hover:bg-[#e3e6e0] motion-reduce:transition-none">
      <h3 className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
        <Link
          href={`/rentals/${slug}`}
          className="underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-crale-green motion-reduce:transition-none"
        >
          {unit.address}
        </Link>
      </h3>

      <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">
        {unit.community ? `${unit.community} · ` : ''}
        {RENTAL_TYPE_LABELS[unit.type]}
      </p>
      {details.length > 0 && (
        <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{details.join(' · ')}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
        {/* Status reads like the rider board clipped under a yard sign, not a badge. */}
        <span className="inline-block bg-sign-yellow px-2.5 py-1 font-display text-[13px] font-semibold text-ink">
          {RENTAL_STATUS_LABELS[unit.status]}
        </span>
        {extras.length > 0 && (
          <span className="font-display text-[14px] text-ink-soft">{extras.join(' · ')}</span>
        )}
      </div>
    </article>
  );
}
