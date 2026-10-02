import Link from 'next/link';
import { container } from '@/components/site/container';
import { PhotoSlider, type Slide } from '@/components/site/photo-slider';
import { LAKE_PHOTOS } from '@/lib/site/lake-photos';

// Captions carry the details, and only what can be seen in the photos. Add owner-approved specifics
// (rooms, scope) when Crale supplies them.
const SLIDES: Slide[] = [
  {
    ...LAKE_PHOTOS.boardBattenLakeSide,
    caption: 'Lake side: covered patio under a vaulted gable, with a wall of glass doors',
  },
  {
    ...LAKE_PHOTOS.boardBattenStreetSide,
    caption: 'Street side: board-and-batten siding, a stone wainscot, and black-framed windows',
  },
  {
    ...LAKE_PHOTOS.boardBattenGreatRoom,
    caption: 'Great room: vaulted ceiling with dark beams, open to the kitchen and island',
  },
];

/**
 * Project story (feature set): one real lake home in a photo slider, with the story beside it.
 * Every photo is of the same house; never mix in rooms from other homes. When the aerial build
 * photos arrive, this becomes the finished-home half of that project's story.
 */
export function LakeFeature() {
  return (
    <section data-bg="white" aria-labelledby="lake-feature-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <PhotoSlider slides={SLIDES} label="One lake home" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="lake-feature-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            One lake home, from the street to the water
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            From the street, a quiet face with a single garage door and stone along the base. From the lake, a vaulted
            covered patio and a full glass gable open the house to the water.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            Start a lake project
          </Link>
        </div>
      </div>
    </section>
  );
}
