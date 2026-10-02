import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { TESTIMONIALS } from '@/lib/site/testimonials';

// Rounded on purpose (see SITE.md Numbers): exact counts stay internal, and the commercial count stays off the site.
const NUMBERS = [
  { value: '200', plus: true, label: 'homes built' },
  { value: '100', plus: true, label: 'renovation projects' },
  { value: String(BUSINESS.founded), plus: false, label: 'the year Crale started, in Sidney' },
];

const QUOTES = [TESTIMONIALS.coil, TESTIMONIALS.goettemoeller, TESTIMONIALS.hubble];

/** The one dark, weighty moment mid-page: rounded numbers, then three client quotes of equal weight. */
export function Proof() {
  return (
    <section data-bg="evergreen" aria-labelledby="proof-title">
      <div className={container}>
        <h2
          id="proof-title"
          className="max-w-[24ch] font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance text-white font-stretch-semi-condensed md:text-[2.5rem]"
        >
          Three decades of building around Sidney and Indian Lake
        </h2>

        <dl className="mt-10 grid gap-y-5 sm:grid-cols-3 sm:gap-x-10 md:mt-12">
          {NUMBERS.map((number) => (
            <div key={number.label} className="flex items-baseline gap-4 sm:grid sm:content-start sm:gap-2">
              <dd className="order-1 m-0 shrink-0 font-display text-[3rem] font-[780] leading-none tracking-[-0.03em] text-white tabular-nums font-stretch-semi-condensed md:text-[4.5rem] lg:text-[5.25rem]">
                {number.value}
                {number.plus && <span className="text-sign-yellow">+</span>}
              </dd>
              <dt className="order-2 text-[17px] leading-snug text-evergreen-soft md:text-lg">{number.label}</dt>
            </div>
          ))}
        </dl>

        {/* Same column rhythm as the numbers above, so the section reads as one grid */}
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3 md:mt-24">
          {QUOTES.map((testimonial) => (
            <li key={testimonial.name}>
              <figure className="grid content-start gap-4">
                <span aria-hidden="true" className="block h-7 font-body text-[4rem] leading-none text-sign-yellow">
                  &ldquo;
                </span>
                <blockquote className="grid gap-3">
                  <p className="font-display text-[1.625rem] font-[700] leading-[1.1] tracking-[-0.01em] text-balance text-white font-stretch-semi-condensed lg:text-[1.875rem]">
                    {testimonial.pull}
                  </p>
                  <p className="max-w-[40ch] text-[17px] leading-relaxed text-evergreen-ink/90">{testimonial.quote}</p>
                </blockquote>
                <figcaption className="font-display text-[15px] text-evergreen-soft">
                  <span className="font-semibold text-evergreen-ink">{testimonial.name}</span>, {testimonial.place}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
