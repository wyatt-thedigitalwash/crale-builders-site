'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const LINKS = [
  { href: '/admin', label: 'Home' },
  { href: '/admin/rentals', label: 'Rentals' },
  { href: '/admin/gallery', label: 'Project Gallery' },
];

const linkClass =
  'font-display text-[15px] font-[580] text-ink decoration-2 underline-offset-[10px] transition-colors hover:text-crale-green aria-[current=page]:text-crale-green aria-[current=page]:underline motion-reduce:transition-none';

/**
 * Portal sections, with the current one underlined in Crale green like the public site's header.
 * The current page comes from the URL, which is only known at request time, so the highlighted version
 * streams in inside Suspense and the same links render unhighlighted until then.
 */
export function PortalNav() {
  return (
    <Suspense fallback={<NavLinks pathname={null} />}>
      <CurrentNav />
    </Suspense>
  );
}

function CurrentNav() {
  return <NavLinks pathname={usePathname()} />;
}

function NavLinks({ pathname }: { pathname: string | null }) {
  const isCurrent = (href: string) =>
    pathname !== null && (href === '/admin' ? pathname === href : pathname.startsWith(href));

  return (
    <nav aria-label="Portal">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            View website
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
