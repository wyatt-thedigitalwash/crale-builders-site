'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActivePath, type NavItem } from '@/lib/site/navigation';

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden lg:block">
      <ul className="flex items-center gap-6 xl:gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
              className="font-display text-[15px] font-[580] text-ink decoration-2 underline-offset-[10px] transition-colors hover:text-crale-green aria-[current=page]:text-crale-green aria-[current=page]:underline group-data-[overlay]:text-white group-data-[overlay]:text-shadow-[0_1px_8px_rgb(0_0_0/0.45)] group-data-[overlay]:aria-[current=page]:text-white group-data-[overlay]:decoration-sign-yellow group-data-[overlay]:hover:text-white group-data-[overlay]:hover:underline motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
