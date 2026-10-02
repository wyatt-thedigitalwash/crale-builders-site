import Link from 'next/link';
import { container } from '@/components/site/container';

// Grounded in Crale's own description of their residential services. Add anything else only once confirmed.
const SCOPE = [
  {
    name: 'Design and drafting',
    text: 'Plans drawn in-house and revised with you until the layout is right.',
  },
  {
    name: 'Construction management',
    text: 'Scheduling and running the trades so the job keeps moving.',
  },
  {
    name: 'General contracting',
    text: 'Crale carries the contract and the responsibility for the build.',
  },
  {
    name: 'Budget and schedule meetings',
    text: 'As many sit-downs as it takes to make the call on design, costs, and financing.',
  },
  {
    name: 'Garages and detached buildings',
    text: 'Attached or standalone, built with the house or added later.',
  },
  {
    name: 'Concrete work',
    text: 'Driveways, walks, and patios poured as part of the build.',
  },
];

/** What Crale actually handles on a new home, so nobody has to ask what is included. */
export function CustomScope() {
  return (
    <section data-bg="seawall" aria-labelledby="custom-scope-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2
            id="custom-scope-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What Crale handles
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            One contract, one team, and one number to call when you have a question.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            Start a project
          </Link>
        </div>

        <dl className="m-0 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
          {SCOPE.map((item) => (
            <div key={item.name}>
              <dt className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
                {item.name}
              </dt>
              <dd className="m-0 mt-2 max-w-[40ch] text-[17px] leading-relaxed text-ink-soft">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
