import Link from 'next/link';
import type { ReactNode } from 'react';
import { BUSINESS } from '@/lib/site/business';
import { buttonPrimary } from './button-styles';
import { Logo } from './logo';

const linkStyle =
  'font-display text-[15px] font-semibold text-ink tabular-nums underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none';

/**
 * Shared layout for the 404 page and the error boundary. These render outside the site layout,
 * so the logo stands in for the header and links home.
 */
export function StatusPage({ title, text, actions }: { title: string; text: string; actions?: ReactNode }) {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center bg-seawall px-4 py-16 text-center sm:px-6"
    >
      <Link href="/" className="rounded-[2px]">
        <Logo alt="Crale Builders home" className="h-14 w-auto" />
      </Link>
      <h1 className="mt-10 font-display text-[2.375rem] font-[760] leading-[1.02] tracking-[-0.02em] text-balance text-ink font-stretch-semi-condensed md:text-[3.25rem]">
        {title}
      </h1>
      <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft">{text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
        {actions}
        <Link href="/" className={`${buttonPrimary} inline-flex h-12`}>
          Go home
        </Link>
        <a href={BUSINESS.phone.href} className={linkStyle}>
          or call {BUSINESS.phone.display}
        </a>
      </div>
    </main>
  );
}
