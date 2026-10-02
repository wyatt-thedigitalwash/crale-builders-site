import { container } from '@/components/site/container';
import { PhotoStrip } from '@/components/site/photo-strip';
import { StripControls } from '@/components/site/strip-controls';
import { getPortalPhotos } from '@/lib/content/portal-photos';

// Shown higher on the Remodeling page (hero, intro, and the rooms slider), so not repeated here.
const SHOWN_ABOVE = [
  'residential-025',
  'residential-028',
  'residential-034',
  'residential-026',
  'residential-014',
  'residential-029',
];

/** A few more rooms. The hero's "See recent work" link jumps here. */
export async function RemodelGallery() {
  // From the portal's remodeling category, so photos added there show up here too.
  const photos = await getPortalPhotos('remodeling', SHOWN_ABOVE);
  if (photos.length === 0) return null;

  return (
    <section id="work" data-bg="white" aria-labelledby="remodel-gallery-title">
      <div className={`${container} flex flex-wrap items-end justify-between gap-x-12 gap-y-6`}>
        <div className="max-w-[46rem]">
          <h2
            id="remodel-gallery-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            More rooms we have remodeled
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            More rooms from Crale projects. Tap any photo to see it larger.
          </p>
        </div>
        <StripControls targetId="remodeling-strip" label="remodeling photos" />
      </div>

      <PhotoStrip id="remodeling-strip" label="Remodeling work" photos={photos} className="mt-10 lg:mt-12" />
    </section>
  );
}
