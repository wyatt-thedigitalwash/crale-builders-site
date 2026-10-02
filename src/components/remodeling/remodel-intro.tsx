import Image from 'next/image';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { REMODELING_PHOTOS } from '@/lib/site/remodeling-photos';

const FACTS = [
  { label: 'Renovation projects', value: 'More than 100' },
  { label: 'Building since', value: String(BUSINESS.founded) },
  { label: 'Design and drafting', value: 'In-house' },
  { label: 'Warranty', value: 'One year on all work' },
];

/** Why Crale for work on a house someone already lives in. */
export function RemodelIntro() {
  const photo = REMODELING_PHOTOS.whiteKitchenPeninsula;

  return (
    <section data-bg="white" aria-labelledby="remodel-intro-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="remodel-intro-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Work that fits the house you have
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            Done right, an addition or a renovation gives you more room and a house that works better day to day, and it
            adds to what the place is worth. Whether that means more square footage, another story, a new face on the
            outside, or changes within, Crale has been doing this work around Sidney since {BUSINESS.founded}.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-[15px] text-ink-soft">{fact.label}</dt>
                <dd className="m-0 mt-1 font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <Image
            src={photo.image}
            alt={photo.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full rounded-[4px]"
          />
        </div>
      </div>
    </section>
  );
}
