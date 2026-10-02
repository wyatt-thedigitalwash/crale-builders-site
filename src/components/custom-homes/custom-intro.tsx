import Image from 'next/image';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
// The 1920px original from the live site's rotating banner.
import introPhoto from '@/../public/images/custom-homes/white-modern-farmhouse-wide.jpg';

const FACTS = [
  { label: 'Building since', value: String(BUSINESS.founded) },
  { label: 'Homes built', value: 'More than 200' },
  { label: 'Design and drafting', value: 'In-house' },
  { label: 'Warranty', value: 'One year on all work' },
];

/** Why Crale for a new home: one team, and the numbers behind it. */
export function CustomIntro() {
  return (
    <section data-bg="white" aria-labelledby="custom-intro-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="custom-intro-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Design and drafting under one roof
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            Crale draws the plans, manages the schedule, and carries the contract, so one team is responsible for your
            home from the first drawing to the day you move in. We will sit down with you as many times as it takes to
            settle the layout, the costs, and the schedule before anything is framed.
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
            src={introPhoto}
            alt="White modern farmhouse with board-and-batten gables, a standing seam porch roof, and black windows"
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full rounded-[4px]"
          />
        </div>
      </div>
    </section>
  );
}
