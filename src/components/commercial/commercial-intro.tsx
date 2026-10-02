import Image from 'next/image';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { COMMERCIAL_PHOTOS } from '@/lib/site/commercial-photos';

const FACTS = [
  { label: 'Building since', value: String(BUSINESS.founded) },
  { label: 'Design and drafting', value: 'In-house' },
  { label: 'Counties served', value: 'Five' },
  { label: 'Warranty', value: 'One year on all work' },
];

/** Why a business owner would hire Crale rather than a bigger outfit from out of town. */
export function CommercialIntro() {
  const photo = COMMERCIAL_PHOTOS.brickStuccoOffice;

  return (
    <section data-bg="white" aria-labelledby="commercial-intro-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="commercial-intro-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            One contractor, start to finish
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            Design and drafting, construction management, and general contracting come from the same company, so there
            is one number to call when something needs an answer. We work through each phase with you and sit down as
            many times as it takes to settle design, costs, schedule, and financing.
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
