import Link from 'next/link';
import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/site/business';
import { CTA, PRIMARY_NAV, SECONDARY_NAV } from '@/lib/site/navigation';
import { buttonPrimary } from './button-styles';
import { container } from './container';
import { DesktopNav } from './desktop-nav';
import { HeaderShell } from './header-shell';
import { Logo } from './logo';
import { MenuToggle, MobileMenuPanel } from './mobile-menu';

export function SiteHeader() {
  return (
    <HeaderShell>
      {/* Shared page width: logo and nav sit near the left edge, phone and button near the right. */}
      <div
        className={`${container} flex h-[4.5rem] items-center gap-6 lg:h-[5.5rem] lg:gap-12 lg:transition-[height] lg:duration-300 lg:group-data-[scrolled]:h-[4.75rem] motion-reduce:transition-none`}
      >
        <Link href="/" className="shrink-0 rounded-[2px]">
          <Logo
            alt="Crale Builders home"
            preload
            className="h-11 w-auto group-data-[menu-open]:hidden group-data-[overlay]:hidden lg:h-[3.25rem] lg:transition-[height] lg:duration-300 lg:group-data-[scrolled]:h-[2.875rem] motion-reduce:transition-none"
          />
          {/* Same spot, reversed colors over a hero photo or while the Evergreen mobile menu is open */}
          <Logo
            alt="Crale Builders home"
            variant="reversed"
            className="hidden h-11 w-auto group-data-[menu-open]:block group-data-[overlay]:block lg:h-[3.25rem]"
          />
        </Link>

        <DesktopNav items={PRIMARY_NAV} />

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-6">
          <a
            href={BUSINESS.phone.href}
            className="hidden font-display text-[15px] font-semibold tabular-nums text-ink transition-colors hover:text-crale-green group-data-[overlay]:text-white group-data-[overlay]:text-shadow-[0_1px_8px_rgb(0_0_0/0.45)] group-data-[overlay]:hover:text-white xl:inline motion-reduce:transition-none"
          >
            {BUSINESS.phone.display}
          </a>
          <Link href={CTA.href} className={`${buttonPrimary} hidden h-11 lg:inline-flex`}>
            {CTA.label}
          </Link>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex h-11 items-center gap-2 rounded-[4px] px-3 font-display text-[15px] font-semibold text-ink transition-colors duration-[220ms] ease-out hover:bg-white group-data-[menu-open]:text-evergreen-ink group-data-[menu-open]:hover:bg-evergreen-deep group-data-[overlay]:text-white group-data-[overlay]:hover:bg-white/15 lg:hidden motion-reduce:transition-none"
          >
            <Phone aria-hidden="true" className="size-4" />
            Call
          </a>
          <MenuToggle />
        </div>
      </div>

      <MobileMenuPanel items={PRIMARY_NAV} secondary={SECONDARY_NAV} />
    </HeaderShell>
  );
}
