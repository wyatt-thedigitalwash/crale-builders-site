import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';

const STANDARD = [
  {
    name: 'A staff that has done this before',
    text: 'Qualified, experienced design and construction people, not a crew assembled for one job.',
  },
  {
    name: 'Subcontractors who share the standard',
    text: 'We choose subcontractors and suppliers who care about customer satisfaction as much as we do.',
  },
  {
    name: 'Right the first time',
    text: 'We would rather get it right than come back, and all construction carries a one-year warranty.',
  },
];

/** How Crale says they work, plus the chambers, which belong on their own rather than in the list. */
export function AboutStandard() {
  return (
    <section data-bg="white" aria-labelledby="about-standard-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2
            id="about-standard-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            The standard
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            Whether the project is your house or your business, it does not change.
          </p>

          <p className="mt-8 font-display text-[15px] text-ink-soft">Members of</p>
          <ul className="mt-2 grid gap-1">
            {BUSINESS.chambers.map((chamber) => (
              <li key={chamber.href}>
                <a
                  href={chamber.href}
                  target="_blank"
                  rel="noopener"
                  className="font-display text-[1.0625rem] font-[640] leading-snug underline decoration-crale-green decoration-2 underline-offset-[5px] transition-colors hover:text-crale-green motion-reduce:transition-none"
                >
                  {chamber.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="m-0 grid gap-x-10 gap-y-9 sm:grid-cols-3 lg:col-span-8">
          {STANDARD.map((item) => (
            <div key={item.name}>
              <dt className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
                {item.name}
              </dt>
              <dd className="m-0 mt-2 max-w-[36ch] text-[17px] leading-relaxed text-ink-soft">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
