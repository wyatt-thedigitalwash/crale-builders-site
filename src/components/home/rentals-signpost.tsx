import Link from 'next/link';
import { container } from '@/components/site/container';
import { PhotoSlider, type Slide } from '@/components/site/photo-slider';
import ciderMill from '@/../public/images/home/rental-cider-mill.jpg';
import cloverHill from '@/../public/images/home/rental-clover-hill.jpg';
import cumberland from '@/../public/images/home/rental-cumberland.jpg';
import winterRidge901 from '@/../public/images/home/rental-winter-ridge-901.jpg';
import winterRidge956 from '@/../public/images/home/rental-winter-ridge-956.jpg';

// Rental exteriors are very wide (about 2.1 to 2.6:1), so the slider uses a 2:1 frame to keep crops light.
const SLIDES: Slide[] = [
  { image: winterRidge901, caption: 'Winter Ridge, Sidney', alt: 'Single-story brick and siding townhome with an attached garage at Winter Ridge in Sidney' },
  { image: cumberland, caption: 'Cumberland, Sidney', alt: 'Brick and siding duplex townhomes with two-car garages on Cumberland in Sidney' },
  { image: ciderMill, caption: 'Cider Mill, Tipp City', alt: 'Townhomes with attached garages at Cider Mill in Tipp City' },
  { image: winterRidge956, caption: 'Winter Ridge, Sidney', alt: 'Stone and brick townhome with landscaping at Winter Ridge in Sidney' },
  { image: cloverHill, caption: 'Clover Hill, Tipp City', alt: 'Brick ranch rental home with a two-car garage on Clover Hill in Tipp City' },
];

/**
 * A signpost for renters, who make up much of Crale's search traffic but are not building a home.
 * Static for now; it could later show live "available now" counts from the portal.
 */
export function RentalsSignpost() {
  return (
    <section data-bg="white" aria-labelledby="rentals-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <PhotoSlider slides={SLIDES} label="Rental homes" sizes="(min-width: 1024px) 55vw, 100vw" aspectClass="aspect-[2/1]" />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="rentals-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Rentals in Sidney and Tipp City
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Crale builds and manages townhomes and houses for rent, including the Winter Ridge and Cumberland
            communities in Sidney and Cider Mill in Tipp City.
          </p>
          <Link
            href="/rentals"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-crale-green underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green-dark motion-reduce:transition-none"
          >
            See rentals
          </Link>
        </div>
      </div>
    </section>
  );
}
