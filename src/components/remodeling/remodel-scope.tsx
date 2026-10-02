import Link from 'next/link';
import { container } from '@/components/site/container';

// Grounded in Crale's own additions, renovations, and small projects copy. Add anything else only once confirmed.
const SCOPE = [
  {
    name: 'Kitchens',
    text: 'New layouts, cabinets, and counters in the space you already have.',
  },
  {
    name: 'Bathrooms',
    text: 'Walk-in showers, soaking tubs, and tile work.',
  },
  {
    name: 'Additions',
    text: 'More square footage for a family room, a bedroom, or a bigger kitchen.',
  },
  {
    name: 'Second stories',
    text: 'Another floor when the footprint cannot grow any wider.',
  },
  {
    name: 'Siding, roofing, and windows',
    text: 'Exterior work that changes how the house looks and how it holds up.',
  },
  {
    name: 'Garages, outbuildings, and concrete',
    text: 'Detached garages, storage buildings, driveways, walks, and patios.',
  },
];

/** What Crale takes on, from a single room to another floor. */
export function RemodelScope() {
  return (
    <section data-bg="seawall" aria-labelledby="remodel-scope-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2
            id="remodel-scope-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What we remodel
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            No project is too small. The same crews handle a single bathroom and a second-story addition.
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
