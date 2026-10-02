import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import Link from 'next/link';
import { ContactForm } from '@/components/contact/contact-form';
import { container } from '@/components/site/container';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { OFFICE, PROJECT_MANAGERS } from '@/lib/site/team';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Start a Project',
  description:
    'Start a project with Crale Builders in Sidney, Ohio. Call 937.498.8000 or send a note for a free, no obligation consultation on a new home, remodel, or build.',
  path: '/contact',
});

const structuredData = breadcrumbSchema([{ name: 'Start a Project', path: '/contact' }]);

const heading =
  'font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]';
const linkStyle =
  'font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none';

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section data-bg="white" aria-labelledby="contact-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <h1 id="contact-title" className={heading}>
              Tell us about your project
            </h1>
            <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-ink-soft">
              Send a note and someone from the office will get back to you. Consultations are free, with no obligation.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-display text-[1.5rem] font-[720] leading-tight font-stretch-semi-condensed md:text-[1.875rem]">
              The office
            </h2>
            <address className="mt-4 not-italic text-lg leading-relaxed text-ink-soft">
              {BUSINESS.legalName}
              <br />
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            </address>

            <dl className="mt-6 grid gap-4">
              <div>
                <dt className="font-display text-[15px] text-ink-soft">Phone</dt>
                <dd className="m-0 mt-0.5">
                  <a href={BUSINESS.phone.href} className={`${linkStyle} tabular-nums`}>
                    {BUSINESS.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-[15px] text-ink-soft">Email</dt>
                <dd className="m-0 mt-0.5">
                  <a href={`mailto:${BUSINESS.email}`} className={linkStyle}>
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-[15px] text-ink-soft">Fax</dt>
                <dd className="m-0 mt-0.5 font-display text-[15px] tabular-nums text-ink">{BUSINESS.fax}</dd>
              </div>
            </dl>

            <p className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className={linkStyle}>
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              <Link href="/rentals" className={linkStyle}>
                Looking for a rental?
              </Link>
            </p>

            <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              Crale works across {listWithAnd(BUSINESS.counties)} counties and all around Indian Lake.
            </p>
          </div>
        </div>
      </section>

      <section data-bg="seawall" aria-labelledby="team-title">
        <div className={container}>
          <h2 id="team-title" className={heading}>
            Who you will be working with
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Reach a project manager directly, or start with the office and we will point you to the right person.
          </p>

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h3 className="font-display text-[15px] text-ink-soft">Project managers</h3>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {PROJECT_MANAGERS.map((person) => (
                  <li key={person.email}>
                    <p className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[17px] text-ink-soft">{person.role}</p>
                    <a href={`mailto:${person.email}`} className={`${linkStyle} mt-1 inline-block`}>
                      {person.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="font-display text-[15px] text-ink-soft">Office</h3>
              <ul className="mt-4 grid gap-6">
                {OFFICE.map((person) => (
                  <li key={person.email}>
                    <p className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[17px] text-ink-soft">{person.role}</p>
                    <a href={`mailto:${person.email}`} className={`${linkStyle} mt-1 inline-block`}>
                      {person.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
