import Link from 'next/link';
import { buttonPrimary } from './button-styles';
import { container } from './container';
import { BUSINESS } from '@/lib/site/business';
import { CTA } from '@/lib/site/navigation';

type Props = {
  title?: string;
  text?: string;
  ctaLabel?: string;
  /** Never Evergreen: this sits directly above the Evergreen footer. */
  background?: 'white' | 'seawall';
};

/**
 * Last section before the footer: headline, one button, and the phone number, centered as one block
 * so the ask stays together instead of splitting across the page.
 */
export function ClosingCta({
  title = 'Planning a new home, addition, or remodel?',
  text = 'Tell us about the lot or the room. We will walk through it with you in a free, no obligation consultation.',
  ctaLabel = CTA.label,
  background = 'seawall',
}: Props) {
  return (
    <section data-bg={background} aria-labelledby="closing-cta-title">
      <div className={`${container} flex flex-col items-center text-center`}>
        <h2
          id="closing-cta-title"
          className="max-w-[20ch] font-display text-[2.25rem] font-[760] leading-[1.02] tracking-[-0.02em] text-balance font-stretch-semi-condensed md:text-[3.25rem] xl:text-[3.75rem]"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{text}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <Link href={CTA.href} className={`${buttonPrimary} inline-flex h-12`}>
            {ctaLabel}
          </Link>
          <a
            href={BUSINESS.phone.href}
            className="font-display text-[15px] font-semibold text-ink tabular-nums underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            or call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
