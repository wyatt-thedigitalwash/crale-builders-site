import type { Metadata } from 'next';
import Link from 'next/link';
import {
  buttonPrimary,
  buttonSecondary,
  cardClass,
  pageIntroClass,
  pageTitleClass,
  sectionTitleClass,
} from '@/components/admin/ui';
import { getPortalSummary } from '@/lib/admin/queries';
import { GALLERY_CATEGORIES, GALLERY_CATEGORY_LABELS } from '@/lib/content/options';

export const metadata: Metadata = {
  title: 'Portal Home',
  description: 'Overview of rentals and project photos on the Crale Builders website.',
};

const statValue = 'font-display text-[2.5rem] font-[780] leading-none tracking-[-0.03em] text-ink tabular-nums font-stretch-semi-condensed';
const statLabel = 'mt-1 font-display text-[15px] text-ink-soft';

export default async function PortalHome() {
  const summary = await getPortalSummary();
  const photoCount = GALLERY_CATEGORIES.reduce((total, category) => total + (summary.galleryByCategory[category] ?? 0), 0);

  return (
    <>
      <h1 className={pageTitleClass}>Website portal</h1>
      <p className={pageIntroClass}>Anything you save here shows on the website right away. There is nothing to publish.</p>

      {summary.photosNeedingDescriptions > 0 && (
        <p className="mt-6 rounded-[4px] bg-sign-yellow/40 p-4 text-ink">
          <strong>{summary.photosNeedingDescriptions}</strong>{' '}
          {summary.photosNeedingDescriptions === 1 ? 'photo needs' : 'photos need'} a description before{' '}
          {summary.photosNeedingDescriptions === 1 ? 'it appears' : 'they appear'} on the website.
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="rentals-heading" className={`${cardClass} flex flex-col`}>
          <h2 id="rentals-heading" className={sectionTitleClass}>
            Rentals
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-6">
            <div className="flex flex-col-reverse">
              <dt className={statLabel}>Rental units</dt>
              <dd className={statValue}>{summary.rentalCount}</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className={statLabel}>Marked available</dt>
              <dd className={statValue}>{summary.availableCount}</dd>
            </div>
          </dl>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-ink-soft">
            Shows on the Rentals page, with a page for each address.
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link href="/admin/rentals" className={buttonPrimary}>
              Manage rentals
            </Link>
            <Link href="/admin/rentals/new" className={buttonSecondary}>
              Add a rental
            </Link>
          </div>
        </section>

        <section aria-labelledby="gallery-heading" className={`${cardClass} flex flex-col`}>
          <h2 id="gallery-heading" className={sectionTitleClass}>
            Project Gallery
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {GALLERY_CATEGORIES.map((category) => (
              <div key={category} className="flex flex-col-reverse">
                <dt className={statLabel}>{GALLERY_CATEGORY_LABELS[category]}</dt>
                <dd className="font-display text-[1.75rem] font-[760] leading-none text-ink tabular-nums font-stretch-semi-condensed">
                  {summary.galleryByCategory[category] ?? 0}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-ink-soft">
            {photoCount} photos. Each one shows on Our Work, and Indian Lake, Custom Homes, and Remodeling photos also
            show on those pages.
          </p>
          <div className="mt-auto pt-6">
            <Link href="/admin/gallery" className={buttonPrimary}>
              Manage gallery
            </Link>
          </div>
        </section>
      </div>

      <section aria-labelledby="tips-heading" className="mt-12">
        <h2 id="tips-heading" className={sectionTitleClass}>
          Good to know
        </h2>
        <ul className="mt-3 grid max-w-3xl gap-2 font-body text-[17px] leading-relaxed text-ink-soft">
          <li>Every photo needs a short description. It helps people using screen readers and helps Google find the site.</li>
          <li>Photos straight from a phone are fine. The website resizes them automatically.</li>
          <li>Use &quot;Move up&quot; and &quot;Move down&quot; to choose which photos show first.</li>
          <li>Unchecking &quot;Show this rental on the website&quot; hides a rental without deleting it.</li>
        </ul>
      </section>
    </>
  );
}
