import { container } from '@/components/site/container';
import { PhotoStrip } from '@/components/site/photo-strip';
import { StripControls } from '@/components/site/strip-controls';
import { getPortalPhotos } from '@/lib/content/portal-photos';

// The same houses as the Custom Homes hero and intro photos, so not repeated here.
const SHOWN_ABOVE = ['residential-004-rev', 'residential-018'];

/** Breadth of Crale's custom home work. The hero's "See homes we've built" link jumps here. */
export async function CustomGallery() {
  // From the portal's custom-homes category, so photos added there show up here too.
  const photos = await getPortalPhotos('custom-homes', SHOWN_ABOVE);
  if (photos.length === 0) return null;

  return (
    <section id="homes" data-bg="white" aria-labelledby="custom-gallery-title">
      <div className={`${container} flex flex-wrap items-end justify-between gap-x-12 gap-y-6`}>
        <div className="max-w-[46rem]">
          <h2
            id="custom-gallery-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Homes we have built
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Custom homes around Sidney and across west central Ohio. Tap any photo to see it larger.
          </p>
        </div>
        <StripControls targetId="custom-homes-strip" label="custom home photos" />
      </div>

      <PhotoStrip id="custom-homes-strip" label="Custom homes" photos={photos} className="mt-10 lg:mt-12" />
    </section>
  );
}
