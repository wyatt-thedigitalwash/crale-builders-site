import { buttonPrimary } from '@/components/site/button-styles';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';

// The rest of the paperwork from Crale's old rentals page. Blank forms and public safety information only:
// anything a renter fills in comes back to the office on paper.
const DOCUMENTS = [
  { label: 'Rental lease', href: '/documents/crale-rental-lease.pdf', size: '145 KB' },
  { label: 'Lead-based paint disclosure form', href: '/documents/lead-based-paint-disclosure-form.pdf', size: '170 KB' },
  { label: 'Protect Your Family From Lead (EPA pamphlet)', href: '/documents/protect-your-family-from-lead-epa.pdf', size: '690 KB' },
  { label: 'Carbon monoxide safety (Ohio State Fire Marshal)', href: '/documents/carbon-monoxide-safety.pdf', size: '7.2 MB' },
];

const STEPS = [
  { label: 'One', text: 'Call the office to ask what is open and to set up a time to see it.' },
  { label: 'Two', text: 'Print the application, fill it out, and return it to the office.' },
  { label: 'Three', text: 'We will go over the terms with you and set a move-in date.' },
];

/**
 * How to apply. The application asks for a Social Security number, so it stays a paper form that
 * comes back to the office. Never rebuild it as a web form.
 */
export function ApplySection() {
  return (
    <section id="apply" data-bg="seawall" aria-labelledby="apply-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="apply-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            How to apply
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            The application asks for personal details, so we keep it on paper rather than online. Print it, fill it out,
            and bring it by the office or mail it in.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="/documents/crale-rental-application.pdf"
              target="_blank"
              rel="noopener"
              className={`${buttonPrimary} inline-flex h-12`}
            >
              Open the application (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={BUSINESS.phone.href}
              className="font-display text-[15px] font-semibold text-ink tabular-nums underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
            >
              or call {BUSINESS.phone.display}
            </a>
          </div>

          <h3 className="mt-10 font-display text-[1.125rem] font-[680] leading-tight font-stretch-semi-condensed">
            Lease and required disclosures
          </h3>
          <ul className="mt-3 grid gap-2">
            {DOCUMENTS.map((file) => (
              <li key={file.href} className="text-[17px] leading-snug">
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener"
                  className="font-display font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[5px] transition-colors hover:text-crale-green motion-reduce:transition-none"
                >
                  {file.label}
                </a>{' '}
                <span className="text-[15px] text-ink-soft">
                  (PDF, {file.size})<span className="sr-only">, opens in a new tab</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="m-0 grid gap-6 p-0 sm:grid-cols-3 lg:col-span-7">
          {STEPS.map((step, index) => (
            <li key={step.label} className="list-none">
              <span aria-hidden="true" className="font-display text-[2rem] font-[760] leading-none text-crale-green">
                {index + 1}
              </span>
              <p className="mt-3 max-w-[32ch] text-[17px] leading-relaxed text-ink-soft">
                <span className="sr-only">Step {index + 1}: </span>
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
