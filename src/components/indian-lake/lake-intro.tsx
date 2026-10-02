import Image from 'next/image';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { LAKE_PHOTOS } from '@/lib/site/lake-photos';

const FACTS = [
  { label: 'At Indian Lake', value: `Since ${BUSINESS.indianLakeSince}` },
  { label: 'Project managers', value: 'Dedicated to the lake' },
  { label: 'Design and drafting', value: 'In-house' },
  { label: 'Warranty', value: 'One year on all work' },
];

/** Why Crale, for the lake specifically. Split layout with a label-over-value facts grid. */
export function LakeIntro() {
  const photo = LAKE_PHOTOS.grayWaterfrontDeck;

  return (
    <section data-bg="white" aria-labelledby="lake-intro-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="lake-intro-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Building at the lake since {BUSINESS.indianLakeSince}
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            A lake lot is not like a lot in town. Lots are often narrow, the view matters from every room, and the
            water shapes where and how you can build. Crale has built and remodeled homes around Indian Lake since{' '}
            {BUSINESS.indianLakeSince}, with project managers who work only at the lake.
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
