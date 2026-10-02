import { cacheLife } from 'next/cache';

/** Current year, cached so the footer stays in the static shell. */
export async function CopyrightYear() {
  'use cache';
  cacheLife('days');
  return <>{new Date().getFullYear()}</>;
}
