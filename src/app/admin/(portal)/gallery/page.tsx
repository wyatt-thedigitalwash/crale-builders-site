import type { Metadata } from 'next';
import Link from 'next/link';
import { ImageUploader } from '@/components/admin/image-uploader';
import { cardClass, pageIntroClass, pageTitleClass, sectionTitleClass } from '@/components/admin/ui';
import { getPortalSummary, listGalleryForAdmin } from '@/lib/admin/queries';
import { GALLERY_CATEGORIES, GALLERY_CATEGORY_LABELS, type GalleryCategory } from '@/lib/content/options';
import { getStorageMode } from '@/lib/storage';
import { addGalleryImages, deleteGalleryImage, moveGalleryImage, updateGalleryImage } from './actions';
import { GalleryImageCard } from './gallery-image-card';

export const metadata: Metadata = {
  title: 'Project Gallery',
  description: 'Manage project photos on the Crale Builders website.',
};

// Tells staff exactly where each category appears, so the connection to the site is clear.
const WHERE_SHOWN: Record<GalleryCategory, string> = {
  'indian-lake': 'Shows on the Indian Lake page and on Our Work.',
  'custom-homes': 'Shows on the Custom Homes page and on Our Work.',
  interiors: 'Shows on Our Work.',
  remodeling: 'Shows on the Remodeling page and on Our Work.',
  commercial: 'Shows on Our Work.',
};

const categoryOptions = GALLERY_CATEGORIES.map((value) => ({ value, label: GALLERY_CATEGORY_LABELS[value] }));

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const requested = (await searchParams).category as GalleryCategory;
  const category = GALLERY_CATEGORIES.includes(requested) ? requested : 'indian-lake';
  const [images, summary] = await Promise.all([listGalleryForAdmin(category), getPortalSummary()]);
  const label = GALLERY_CATEGORY_LABELS[category];

  return (
    <>
      <h1 className={pageTitleClass}>Project Gallery</h1>
      <p className={pageIntroClass}>
        Upload finished project photos. They show on the website as soon as each has a description.
      </p>

      <nav aria-label="Gallery categories" className="mt-6 overflow-x-auto">
        <ul className="flex min-w-max gap-1 border-b border-zinc-300">
          {GALLERY_CATEGORIES.map((value) => {
            const active = value === category;
            return (
              <li key={value}>
                <Link
                  href={`/admin/gallery?category=${value}`}
                  aria-current={active ? 'page' : undefined}
                  className={`-mb-px inline-block border-b-2 px-4 py-2 text-sm font-semibold ${
                    active ? 'border-crale-green text-ink' : 'border-transparent text-ink-soft hover:text-ink'
                  }`}
                >
                  {GALLERY_CATEGORY_LABELS[value]} ({summary.galleryByCategory[value] ?? 0})
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section aria-labelledby="upload-heading" className={`mt-6 ${cardClass}`}>
        <h2 id="upload-heading" className={sectionTitleClass}>
          Upload photos
        </h2>
        <div className="mt-4">
          <ImageUploader
            key={category}
            folder="gallery"
            storageMode={getStorageMode()}
            onComplete={addGalleryImages}
            choiceLabel="Add to category"
            choices={categoryOptions}
            defaultChoice={category}
          />
        </div>
      </section>

      <section aria-labelledby="photos-heading" className="mt-10">
        <h2 id="photos-heading" className={sectionTitleClass}>
          {label} photos ({images.length})
        </h2>
        <p className="mt-1 text-sm text-ink-soft">{WHERE_SHOWN[category]} Photos show in this order.</p>
        {images.length === 0 ? (
          <p className={`mt-4 ${cardClass} text-ink-soft`}>No photos in {label} yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image, index) => (
              <li key={image.id}>
                <GalleryImageCard
                  image={image}
                  categoryOptions={categoryOptions}
                  update={updateGalleryImage.bind(null, image.id)}
                  moveUp={moveGalleryImage.bind(null, image.id, 'up')}
                  moveDown={moveGalleryImage.bind(null, image.id, 'down')}
                  remove={deleteGalleryImage.bind(null, image.id)}
                  isFirst={index === 0}
                  isLast={index === images.length - 1}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
