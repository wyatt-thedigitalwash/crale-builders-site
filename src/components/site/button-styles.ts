// Shared button classes for the public site.
// Display and height are left to each use (for example "inline-flex h-12" or "hidden lg:inline-flex h-11"),
// so responsive visibility classes never fight a display value baked in here.

const base =
  'items-center justify-center gap-2 rounded-[4px] px-5 font-display text-[15px] font-semibold leading-none transition-colors motion-reduce:transition-none';

/** Crale Green, for light backgrounds. */
export const buttonPrimary = `${base} bg-crale-green text-white hover:bg-crale-green-dark`;

/** White, for Evergreen backgrounds. */
export const buttonLight = `${base} bg-white text-evergreen hover:bg-evergreen-ink`;
