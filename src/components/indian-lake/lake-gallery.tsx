import { container } from '@/components/site/container';
import { PhotoStrip } from '@/components/site/photo-strip';
import { StripControls } from '@/components/site/strip-controls';
import { getPortalPhotos } from '@/lib/content/portal-photos';

// Shown higher on the Indian Lake page (intro and the board-and-batten feature), so not repeated here.
const SHOWN_ABOVE = ['indian-lake-005', 'indian-lake-020', 'indian-lake-021'];

/** Breadth of Crale's lake work. The hero's "See lake homes" link jumps here. */
export async function LakeGallery() {
  // From the portal's indian-lake category, so photos added there show up here too.
  const photos = await getPortalPhotos('indian-lake', SHOWN_ABOVE);
  if (photos.length === 0) return null;

  return (
    <section id="from-the-water" data-bg="white" aria-labelledby="from-the-water-title">
      <div className={`${container} flex flex-wrap items-end justify-between gap-x-12 gap-y-6`}>
        <div className="max-w-[46rem]">
          <h2
            id="from-the-water-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            From the water
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Homes Crale has built and remodeled around Indian Lake. Tap any photo to see it larger.
          </p>
        </div>
        <StripControls targetId="lake-gallery-strip" label="lake photos" />
      </div>

      <PhotoStrip id="lake-gallery-strip" label="Indian Lake homes" photos={photos} className="mt-10 lg:mt-12" />
    </section>
  );
}
