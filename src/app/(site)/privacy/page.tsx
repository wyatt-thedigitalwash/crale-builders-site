import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/json-ld';
import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

// Plain-language policy describing what this site actually does. It is not legal advice: have counsel
// review it before launch. Update it if anything changes, especially adding analytics, advertising
// pixels, chat widgets, or any form that collects more than the contact form does.
export const metadata: Metadata = pageMetadata({
  name: 'Privacy Policy',
  description:
    'How Crale Builders of Sidney, Ohio handles information from this website: what the contact form collects, who receives it, and the cookies this site uses.',
  path: '/privacy',
});

const structuredData = breadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy' }]);

const UPDATED = 'September 2026';

const heading = 'font-display text-[1.375rem] font-[720] leading-tight font-stretch-semi-condensed md:text-[1.75rem]';
const body = 'mt-3 max-w-[68ch] text-lg leading-relaxed text-ink-soft';
const linkStyle =
  'font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[4px] transition-colors hover:text-crale-green motion-reduce:transition-none';

export default function PrivacyPage() {
  return (
    <section data-bg="white" aria-labelledby="privacy-title">
      <JsonLd data={structuredData} />
      <div className={container}>
        <h1
          id="privacy-title"
          className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
        >
          Privacy policy
        </h1>
        <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-ink-soft">
          Last updated {UPDATED}. This page explains what {BUSINESS.name} does with information from this website. The
          short version: we collect what you send us, we use it to answer you, and we do not sell it.
        </p>

        <div className="mt-12 grid gap-10">
          <section aria-labelledby="what-we-collect">
            <h2 id="what-we-collect" className={heading}>
              What we collect
            </h2>
            <p className={body}>
              If you fill out the form on our{' '}
              <Link href="/contact" className={linkStyle}>
                contact page
              </Link>
              , we receive your name, your email address, your phone number if you choose to give one, what the project
              is about, and whatever you write in the message. That is the only form on this site. Browsing the rest of
              the site does not require you to tell us anything.
            </p>
          </section>

          <section aria-labelledby="how-we-use-it">
            <h2 id="how-we-use-it" className={heading}>
              How we use it
            </h2>
            <p className={body}>
              We use it to reply to you and to talk through your project. We do not sell it, rent it, or trade it, and
              we do not add you to a marketing list from the contact form.
            </p>
          </section>

          <section aria-labelledby="rental-applications">
            <h2 id="rental-applications" className={heading}>
              Rental applications
            </h2>
            <p className={body}>
              Rental applications are not submitted through this website. The application is a PDF you print, fill out,
              and return to the office, so the details it asks for never travel through this site. See{' '}
              <Link href="/rentals#apply" className={linkStyle}>
                how to apply
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className={heading}>
              Cookies
            </h2>
            <p className={body}>
              This site does not use advertising cookies or tracking pixels, and it does not follow you to other sites.
              The only cookie we set is a sign-in cookie for Crale staff using the private portal that manages rental
              listings and photos. If you are not staff signing in, nothing is set.
            </p>
          </section>

          <section aria-labelledby="service-providers">
            <h2 id="service-providers" className={heading}>
              Companies that help run this site
            </h2>
            <p className={body}>
              A few services make the site work, and they handle information only to do that job: Vercel hosts the site
              and stores photos, Neon stores the rental and gallery content staff manage in the portal, and Resend
              delivers the email when you send us a note. Our web host keeps standard server logs, which can include IP
              addresses, as part of running and protecting the site.
            </p>
          </section>

          <section aria-labelledby="how-long">
            <h2 id="how-long" className={heading}>
              How long we keep it
            </h2>
            <p className={body}>
              A message you send arrives as email in our office inbox and stays there with the rest of our
              correspondence. If you would rather we delete it, ask and we will.
            </p>
          </section>

          <section aria-labelledby="your-choices">
            <h2 id="your-choices" className={heading}>
              Your choices
            </h2>
            <p className={body}>
              Call or email us to ask what we have from you, to correct it, or to have it deleted. We will take care of
              it.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2 id="children" className={heading}>
              Children
            </h2>
            <p className={body}>
              This site is meant for people looking to build, remodel, or rent. It is not directed to children, and we
              do not knowingly collect information from anyone under 13.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className={heading}>
              Changes to this policy
            </h2>
            <p className={body}>
              If we change how this site handles information, we will update this page and the date at the top.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className={heading}>
              Questions
            </h2>
            <p className={body}>
              Call{' '}
              <a href={BUSINESS.phone.href} className={`${linkStyle} tabular-nums`}>
                {BUSINESS.phone.display}
              </a>
              , email{' '}
              <a href={`mailto:${BUSINESS.email}`} className={linkStyle}>
                {BUSINESS.email}
              </a>
              , or write to {BUSINESS.legalName}, {BUSINESS.address.street}, {BUSINESS.address.city},{' '}
              {BUSINESS.address.state} {BUSINESS.address.zip}.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
