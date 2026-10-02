import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import Link from 'next/link';
import { Suspense } from 'react';
import { WorkGallery, type WorkPhoto } from '@/components/our-work/work-gallery';
import { ClosingCta } from '@/components/site/closing-cta';
import { container } from '@/components/site/container';
import { GALLERY_CATEGORIES, type GalleryCategory } from '@/lib/content/options';
import { getGalleryImages } from '@/lib/content/public';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Our Work',
  description:
    'Photos of custom homes, Indian Lake homes, remodels, interiors, and commercial buildings by Crale Builders, a general contractor in Sidney, Ohio since 1995.',
  path: '/our-work',
});

const structuredData = breadcrumbSchema([{ name: 'Our Work', path: '/our-work' }]);

const heading =
  'font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]';

/** Photos come from the portal, so Crale can add to this page without a rebuild. */
async function Gallery() {
  const images = await getGalleryImages();

  const photos: WorkPhoto[] = images
    .filter((image) => image.width && image.height)
    .map((image) => ({
      id: image.id,
      src: image.url,
      alt: image.alt,
      width: image.width as number,
      height: image.height as number,
      category: image.category,
    }));

  const present = new Set(photos.map((photo) => photo.category));
  const categories = GALLERY_CATEGORIES.filter((category): category is GalleryCategory => present.has(category));

  if (photos.length === 0) {
    return (
      <div className={container}>
        <p className="text-lg text-ink-soft">
          Photos are on their way. Call {BUSINESS.phone.display} and we will walk you through recent projects.
        </p>
      </div>
    );
  }

  return <WorkGallery photos={photos} categories={categories} />;
}

function GallerySkeleton() {
  return (
    <div className={`${container} flex flex-wrap gap-3 sm:gap-4`} aria-hidden="true">
      {[4 / 3, 3 / 2, 4 / 3, 16 / 10, 3 / 2, 4 / 3].map((ratio, index) => (
        <div
          key={index}
          style={{ flex: `${ratio} 1 ${ratio * 14}rem`, aspectRatio: String(ratio) }}
          className="rounded-[4px] bg-seawall"
        />
      ))}
    </div>
  );
}

export default function OurWorkPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section data-bg="white" aria-labelledby="our-work-title">
        <div className={container}>
          <h1 id="our-work-title" className={heading}>
            Our work
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Custom homes, lake homes, interiors, and commercial buildings across {listWithAnd(BUSINESS.counties)}{' '}
            counties. Tap any photo to see it larger.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            <Link
              href="/indian-lake"
              className="font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
            >
              Indian Lake homes
            </Link>
            <Link
              href="/custom-homes"
              className="font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
            >
              Custom homes
            </Link>
            <Link
              href="/remodeling"
              className="font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
            >
              Remodeling
            </Link>
          </p>
        </div>
      </section>

      <section data-bg="white" aria-label="Project photos">
        <Suspense fallback={<GallerySkeleton />}>
          <Gallery />
        </Suspense>
      </section>

      <ClosingCta background="seawall" />
    </>
  );
}
