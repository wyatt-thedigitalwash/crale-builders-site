import Link from 'next/link';
import { container } from '@/components/site/container';

// Grounded in Crale's own commercial and industrial copy. Add anything else only once confirmed.
const SCOPE = [
  {
    name: 'New commercial buildings',
    text: 'Offices, storefronts, and shops built from the ground up.',
  },
  {
    name: 'Industrial and warehouse space',
    text: 'Room to store, build, and ship, with the doors and clearances the work needs.',
  },
  {
    name: 'Additions',
    text: 'More floor space when the business outgrows the building it is in.',
  },
  {
    name: 'Interior renovations',
    text: 'Reworking the space you have around how the business runs today.',
  },
  {
    name: 'Exterior renovations',
    text: 'A new face on the building, from the entry to the roofline.',
  },
  {
    name: 'Design build',
    text: 'Drawings and construction under one contract, priced as the plan takes shape.',
  },
];

/** What Crale takes on for a business. */
export function CommercialScope() {
  return (
    <section data-bg="seawall" aria-labelledby="commercial-scope-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2
            id="commercial-scope-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What we build
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            New buildings, renovations, and additions for businesses around west central Ohio.
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
