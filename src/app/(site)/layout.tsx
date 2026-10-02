import type { ReactNode } from 'react';
import { JsonLd } from '@/components/site/json-ld';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { localBusinessSchema } from '@/lib/seo';

// Public site chrome. The /admin portal sits outside this group and has its own layout.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* The business itself, on every public page. Pages add their own Service and breadcrumb data. */}
      <JsonLd data={localBusinessSchema} />
      <a
        href="#main"
        className="sr-only rounded-[4px] bg-white px-4 py-3 font-display font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
