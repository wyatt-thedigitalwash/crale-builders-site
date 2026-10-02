import Image from 'next/image';
import Link from 'next/link';
import { container } from '@/components/site/container';
import { COMMERCIAL_PHOTOS } from '@/lib/site/commercial-photos';
import { CUSTOM_HOME_PHOTOS } from '@/lib/site/custom-home-photos';
import { LAKE_PHOTOS } from '@/lib/site/lake-photos';
import { REMODELING_PHOTOS } from '@/lib/site/remodeling-photos';

const CARDS = [
  { title: 'Custom homes', href: '/custom-homes', text: 'New homes on your lot, drawn in-house.', photo: CUSTOM_HOME_PHOTOS.whiteModernFarmhouse },
  { title: 'Indian Lake homes', href: '/indian-lake', text: 'Lake homes, rebuilds, and remodels.', photo: LAKE_PHOTOS.capeCod },
  { title: 'Remodeling', href: '/remodeling', text: 'Kitchens, baths, additions, second stories.', photo: REMODELING_PHOTOS.whiteKitchenPeninsula },
  { title: 'Commercial', href: '/commercial', text: 'Offices, warehouses, and the upkeep after.', photo: COMMERCIAL_PHOTOS.villageSalonBuilding },
];

/** The whole business in four cards, each a way into the page that covers it. */
export function AboutWhatWeBuild() {
  return (
    <section data-bg="white" aria-labelledby="about-build-title">
      <div className={container}>
        <div className="max-w-[46rem]">
          <h2
            id="about-build-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What we build
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-ink-soft">
            Houses are most of the work, and we have built for businesses since the start.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {CARDS.map((card) => (
            <li key={card.title} className="group relative">
              <Image
                src={card.photo.image}
                alt={card.photo.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                className="aspect-[3/2] w-full rounded-[4px] object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <h3 className="mt-4 font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
                <Link
                  href={card.href}
                  className="underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors after:absolute after:inset-0 after:content-[''] hover:text-crale-green motion-reduce:transition-none"
                >
                  {card.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-[32ch] text-[17px] leading-relaxed text-ink-soft">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
