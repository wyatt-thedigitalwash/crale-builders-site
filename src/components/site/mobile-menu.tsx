'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BUSINESS } from '@/lib/site/business';
import { CTA, isActivePath, type NavItem } from '@/lib/site/navigation';
import { buttonLight } from './button-styles';
import { useMobileMenu } from './header-shell';

/** The header's Menu button. It stays in place and becomes Close while the menu is open. */
export function MenuToggle() {
  const { open, toggle } = useMobileMenu();

  return (
    <button
      id="menu-toggle"
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="inline-flex h-11 w-[6.5rem] items-center justify-center gap-2 rounded-[4px] bg-ink px-4 font-display text-[15px] font-semibold text-white transition-colors duration-[220ms] ease-out aria-expanded:bg-white aria-expanded:text-evergreen group-data-[overlay]:bg-white group-data-[overlay]:text-ink lg:hidden motion-reduce:transition-none"
    >
      {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
      {open ? 'Close' : 'Menu'}
    </button>
  );
}

type PanelProps = { items: NavItem[]; secondary: NavItem[] };

/** Evergreen menu panel directly below the header on phones and tablets. Fades in with a small rise. */
export function MobileMenuPanel({ items, secondary }: PanelProps) {
  const { open, close } = useMobileMenu();
  const pathname = usePathname();
  const { address } = BUSINESS;

  return (
    <div
      id="mobile-menu"
      hidden={!open}
      data-surface="evergreen"
      className="fixed inset-x-0 bottom-0 top-[4.5rem] z-30 flex flex-col overflow-y-auto overscroll-contain bg-evergreen text-evergreen-ink animate-menu-in motion-reduce:animate-none lg:hidden"
    >
      <nav aria-label="Main navigation" className="px-4 pb-10 pt-4 sm:px-6">
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                className="block py-1.5 font-display text-[2.125rem] font-bold leading-tight tracking-[-0.015em] font-stretch-semi-condensed text-evergreen-ink hover:text-white aria-[current=page]:text-sign-yellow"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {secondary.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="font-display text-base text-evergreen-soft underline-offset-4 hover:text-evergreen-ink hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto grid gap-5 bg-evergreen-deep px-4 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-7 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href={CTA.href} onClick={close} className={`${buttonLight} inline-flex h-12`}>
            {CTA.label}
          </Link>
          <a
            href={BUSINESS.phone.href}
            className="border-b-[3px] border-sign-yellow pb-0.5 font-display text-lg font-semibold tabular-nums text-evergreen-ink"
          >
            {BUSINESS.phone.display}
          </a>
        </div>
        <p className="text-[15px] text-evergreen-soft">
          {address.street}, {address.city}, {address.state} {address.zip}
        </p>
      </div>
    </div>
  );
}
