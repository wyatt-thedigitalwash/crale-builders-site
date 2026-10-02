import Link from 'next/link';
import { container } from '@/components/site/container';
import { PhotoStrip } from '@/components/site/photo-strip';
import { StripControls } from '@/components/site/strip-controls';
import { BUSINESS } from '@/lib/site/business';
import { LAKE_PHOTOS } from '@/lib/site/lake-photos';
import { toDisplayPhoto } from '@/lib/site/photos';

const PHOTOS = [
  LAKE_PHOTOS.balconiesBoatLift,
  LAKE_PHOTOS.boardBattenLakeSide,
  LAKE_PHOTOS.dockChairs,
  LAKE_PHOTOS.ripRapPatio,
  LAKE_PHOTOS.aFrame,
  LAKE_PHOTOS.capeCod,
  LAKE_PHOTOS.gableBoatLift,
  LAKE_PHOTOS.cottage,
];

/** Homepage Indian Lake section: short intro and a strip of lake homes. */
export function IndianLakeStrip() {
  return (
    <section data-bg="white" aria-labelledby="indian-lake-title">
      <div className={`${container} flex flex-wrap items-end justify-between gap-x-12 gap-y-6`}>
        <div className="max-w-[46rem]">
          <h2
            id="indian-lake-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Building at Indian Lake since {BUSINESS.indianLakeSince}
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-ink-soft">
            Our Indian Lake project managers work only at the lake, on new homes, tear-down rebuilds, and remodels from
            Lakeview and Russells Point to Orchard Island and Belle Center.
          </p>
          <Link
            href="/indian-lake"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            See Indian Lake homes
          </Link>
        </div>
        <StripControls targetId="indian-lake-strip" label="Indian Lake photos" />
      </div>

      <PhotoStrip id="indian-lake-strip" label="Indian Lake projects" photos={PHOTOS.map(toDisplayPhoto)} className="mt-10 lg:mt-12" />
    </section>
  );
}
