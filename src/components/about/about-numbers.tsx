import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';

// Numbers the user approved for publishing. Never publish the exact project counts or the commercial count.
const NUMBERS = [
  { value: String(BUSINESS.founded), label: 'Established in Sidney' },
  { value: '200+', label: 'Residential builds' },
  { value: '100+', label: 'Renovation projects' },
  { value: String(BUSINESS.indianLakeSince), label: 'At Indian Lake since' },
];

/** The page's one dark moment: three decades of work, in four numbers. */
export function AboutNumbers() {
  return (
    <section data-bg="evergreen" aria-labelledby="about-numbers-title">
      <div className={container}>
        <h2
          id="about-numbers-title"
          className="max-w-[24ch] font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance text-white font-stretch-semi-condensed md:text-[2.5rem]"
        >
          Three decades of building around Sidney
        </h2>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-12 lg:grid-cols-4">
          {NUMBERS.map((number) => (
            <div key={number.label}>
              <dt className="sr-only">{number.label}</dt>
              <dd className="m-0">
                <span className="block font-display text-[3rem] font-[780] leading-none tracking-[-0.03em] text-white tabular-nums font-stretch-semi-condensed md:text-[4rem] xl:text-[4.75rem]">
                  {number.value.replace('+', '')}
                  {number.value.includes('+') && <span className="text-sign-yellow">+</span>}
                </span>
                <span className="mt-3 block font-display text-[15px] text-evergreen-soft md:text-base">
                  {number.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
