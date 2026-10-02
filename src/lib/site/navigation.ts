export type NavItem = { label: string; href: string };

/** Main navigation, in order. Indian Lake leads (see SITE.md). Also the footer's main link row. */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Indian Lake', href: '/indian-lake' },
  { label: 'Custom Homes', href: '/custom-homes' },
  { label: 'Remodeling', href: '/remodeling' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'About', href: '/about' },
];

/** Pages that live outside the main navigation (mobile menu). */
export const SECONDARY_NAV: NavItem[] = [
  { label: 'Commercial', href: '/commercial' },
  { label: 'Products and Partners', href: '/partners' },
];

/** Smaller link row under the footer's main links. */
export const FOOTER_SECONDARY: NavItem[] = [
  ...SECONDARY_NAV,
  { label: 'Rental Application', href: '/rentals#apply' },
];

export const CTA: NavItem = { label: 'Start a project', href: '/contact' };

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
