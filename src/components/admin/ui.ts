// Shared Tailwind class strings for the portal.

export const inputClass =
  'block w-full rounded-[4px] border border-zinc-500 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-crale-green focus:outline-none focus:ring-2 focus:ring-crale-green/30 aria-[invalid=true]:border-red-700 md:text-sm';

export const labelClass = 'block text-sm font-medium text-ink';

const button =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-[4px] px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crale-green disabled:cursor-not-allowed disabled:opacity-60';

export const buttonPrimary = `${button} bg-crale-green text-white hover:bg-crale-green-dark`;
export const buttonSecondary = `${button} border border-zinc-300 bg-white text-ink hover:border-crale-green hover:text-crale-green`;
export const buttonDanger = `${button} bg-red-700 text-white hover:bg-red-800`;
export const buttonQuiet = `${button} px-2 text-ink hover:bg-seawall`;

export const cardClass = 'rounded-[4px] bg-white p-4 shadow-[0_18px_40px_-26px_rgba(15,53,38,0.5)] md:p-6';

// Type, matching the public site: semi-condensed Archivo headings, Source Serif body copy.
export const pageTitleClass =
  'font-display text-[2rem] font-[760] leading-[1.02] tracking-[-0.02em] text-ink font-stretch-semi-condensed md:text-[2.5rem]';
export const pageIntroClass = 'mt-2 max-w-2xl font-body text-[17px] leading-relaxed text-ink-soft';
export const sectionTitleClass =
  'font-display text-[1.375rem] font-[720] leading-tight tracking-[-0.01em] text-ink font-stretch-semi-condensed';
