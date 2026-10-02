import Link from 'next/link';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { FOOTER_SECONDARY, PRIMARY_NAV } from '@/lib/site/navigation';
import { container } from './container';
import { CopyrightYear } from './copyright-year';
import { Logo } from './logo';

const linkClass = 'decoration-sign-yellow decoration-2 underline-offset-[6px] hover:underline';

/** Compact footer: logo, main links, and phone on one row; contact details and secondary links below. */
export function SiteFooter() {
  const { address } = BUSINESS;

  return (
    <footer id="site-footer" data-surface="evergreen" className="bg-evergreen text-evergreen-ink">
      <div className={`${container} py-12 lg:py-14`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <Link href="/" className="self-start rounded-[2px] lg:self-center">
            <Logo alt="Crale Builders home" variant="reversed" className="h-12 w-auto" />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${linkClass} font-display text-base font-semibold`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={BUSINESS.phone.href}
            className="self-start border-b-[3px] border-sign-yellow pb-0.5 font-display text-lg font-semibold tabular-nums lg:self-center"
          >
            {BUSINESS.phone.display}
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 font-display text-[15px] text-evergreen-soft lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} hover:text-evergreen-ink`}
            >
              {address.street}, {address.city}, {address.state} {address.zip}
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className={`${linkClass} hover:text-evergreen-ink`}>
              {BUSINESS.email}
            </a>
            <span className="tabular-nums">Fax {BUSINESS.fax}</span>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_SECONDARY.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`${linkClass} hover:text-evergreen-ink`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-evergreen-deep">
        <div
          className={`${container} flex flex-col gap-2 py-5 font-display text-sm text-evergreen-soft lg:flex-row lg:items-center lg:justify-between lg:gap-12`}
        >
          <p>Serving {listWithAnd(BUSINESS.counties)} counties and the Indian Lake area.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              &copy; <CopyrightYear /> {BUSINESS.legalName}
            </li>
            <li>
              <Link href="/privacy" className={`${linkClass} hover:text-evergreen-ink`}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/admin" className={`${linkClass} hover:text-evergreen-ink`}>
                Staff sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
