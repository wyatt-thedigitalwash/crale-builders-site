import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import Link from 'next/link';
import { ClosingCta } from '@/components/site/closing-cta';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { PARTNER_SECTIONS } from '@/lib/site/partners';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Products and Partners',
  description:
    'The suppliers and brands behind a Crale Builders project in Sidney, Ohio: windows, roofing, siding, cabinetry, flooring, masonry, and more, local and national.',
  path: '/partners',
});

const structuredData = breadcrumbSchema([{ name: 'Products and Partners', path: '/partners' }]);

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section data-bg="white" aria-labelledby="partners-title">
        <div className={container}>
          <h1
            id="partners-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Products and partners
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            The local shops and national brands behind a Crale build. If you have something in mind that is not here,{' '}
            <Link
              href="/contact"
              className="text-ink underline decoration-crale-green decoration-2 underline-offset-[5px] transition-colors hover:text-crale-green motion-reduce:transition-none"
            >
              ask us
            </Link>{' '}
            or call {BUSINESS.phone.display}.
          </p>
        </div>
      </section>

      <section data-bg="white" aria-label="Suppliers">
        {/* CSS columns, so each group starts right after the one above it instead of waiting for the tallest in its row */}
        <div className={`${container} gap-x-12 sm:columns-2 lg:columns-3`}>
          {PARTNER_SECTIONS.map((section) => (
            <section
              key={section.title}
              className="mb-12 break-inside-avoid last:mb-0"
              aria-labelledby={`partners-${section.title.replace(/\W+/g, '-')}`}>
              <h2
                id={`partners-${section.title.replace(/\W+/g, '-')}`}
                className="font-display text-[1.375rem] font-[720] leading-tight font-stretch-semi-condensed md:text-[1.5rem]"
              >
                {section.title}
              </h2>
              <ul className="mt-3 grid gap-1.5">
                {section.partners.map((partner) => (
                  <li key={partner.name} className="text-[17px] leading-snug text-ink-soft">
                    {partner.url ? (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener"
                        className="transition-colors hover:text-crale-green hover:underline motion-reduce:transition-none"
                      >
                        {partner.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      partner.name
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <ClosingCta background="seawall" />
    </>
  );
}
