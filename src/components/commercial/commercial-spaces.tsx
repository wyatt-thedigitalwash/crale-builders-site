import Link from 'next/link';
import { container } from '@/components/site/container';
import { PhotoSlider, type Slide } from '@/components/site/photo-slider';
import { COMMERCIAL_PHOTOS } from '@/lib/site/commercial-photos';

// Different businesses, so captions describe the space, never one project.
const SLIDES: Slide[] = [
  { ...COMMERCIAL_PHOTOS.villageSalonBuilding, caption: 'Salon and spa building with its round green sign' },
  { ...COMMERCIAL_PHOTOS.salonInteriorStations, caption: 'Styling stations and decorative lighting inside the salon' },
  { ...COMMERCIAL_PHOTOS.warehouseRacking, caption: 'Warehouse with steel racking and overhead doors' },
  { ...COMMERCIAL_PHOTOS.gymBasketballCourt, caption: 'Gym with a full basketball court' },
  { ...COMMERCIAL_PHOTOS.trainingRoom, caption: 'Training room with epoxy flooring' },
  { ...COMMERCIAL_PHOTOS.patioStorefront, caption: 'Storefront with a covered patio and picnic tables' },
  { ...COMMERCIAL_PHOTOS.salonInteriorLong, caption: 'Styling chairs under an exposed ceiling' },
];

/** The range of buildings Crale has put up for businesses. */
export function CommercialSpaces() {
  return (
    <section id="work" data-bg="white" aria-labelledby="commercial-spaces-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <PhotoSlider slides={SLIDES} label="Commercial projects" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="commercial-spaces-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Offices, shops, and everything after
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            A salon, a warehouse, a gym, a training room. The building is different every time, and so is the way the
            people inside it need to use the space.
          </p>
          <Link
            href="/our-work"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            See all of our work
          </Link>
        </div>
      </div>
    </section>
  );
}
