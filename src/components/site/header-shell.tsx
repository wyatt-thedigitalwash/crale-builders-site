'use client';

import { usePathname } from 'next/navigation';
import { createContext, use, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

type MenuState = { open: boolean; toggle: () => void; close: () => void };

const MenuContext = createContext<MenuState | null>(null);

export function useMobileMenu(): MenuState {
  const value = use(MenuContext);
  if (!value) throw new Error('useMobileMenu must be used inside HeaderShell');
  return value;
}

/**
 * Pages whose hero photo runs underneath the header. On these pages the header is transparent
 * over the photo until the page scrolls. The hero on each page must pull itself up under the header.
 */
const OVERLAY_PATHS = new Set([
  '/',
  '/indian-lake',
  '/custom-homes',
  '/remodeling',
  '/commercial',
]);

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

/**
 * Sticky header wrapper and mobile menu state.
 * - Over a hero photo at the top of the page: transparent, reversed logo, white text.
 * - Once the page scrolls it turns white and tightens slightly (color and a soft shadow, no divider line).
 * - When the mobile menu opens, the same header stays in place and turns Evergreen; the menu panel opens below it.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  // The menu remembers the page it was opened on, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const toggle = () => setOpenOn(open ? null : pathname);

  const overlay = OVERLAY_PATHS.has(pathname) && !scrolled && !open;

  useEffect(() => {
    if (!open) return;

    // Keep keyboard and screen reader focus inside the header and menu while it is open.
    const page = [document.getElementById('main'), document.getElementById('site-footer')];
    for (const element of page) if (element) element.inert = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenOn(null);
      document.getElementById('menu-toggle')?.focus();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = () => {
      if (desktop.matches) setOpenOn(null);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      for (const element of page) if (element) element.inert = false;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  return (
    <MenuContext value={{ open, toggle, close }}>
      <header
        data-scrolled={scrolled ? '' : undefined}
        data-menu-open={open ? '' : undefined}
        data-overlay={overlay ? '' : undefined}
        className="group sticky top-0 isolate z-40 bg-seawall transition-[background-color,box-shadow] duration-[220ms] ease-out data-[overlay]:bg-transparent data-[scrolled]:bg-white data-[scrolled]:shadow-[0_12px_32px_-22px_rgba(15,53,38,0.5)] data-[menu-open]:bg-evergreen data-[menu-open]:data-[scrolled]:bg-evergreen data-[menu-open]:data-[scrolled]:shadow-none motion-reduce:transition-none"
      >
        {/* Over a photo: a soft dark fade behind the header (not a full background) so the white nav stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+3rem)] bg-[linear-gradient(to_bottom,rgb(10_16_13/0.62),rgb(10_16_13/0.34)_55%,transparent)] opacity-0 transition-opacity duration-[220ms] group-data-[overlay]:opacity-100 motion-reduce:transition-none"
        />
        {children}
      </header>
    </MenuContext>
  );
}
