'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PhotoLightbox } from '@/components/site/photo-lightbox';
import { container } from '@/components/site/container';
import { GALLERY_CATEGORY_LABELS, type GalleryCategory } from '@/lib/content/options';
import type { DisplayPhoto } from '@/lib/site/photos';

export type WorkPhoto = DisplayPhoto & { id: number; category: GalleryCategory };

type Props = { photos: WorkPhoto[]; categories: GalleryCategory[] };

const filterBase =
  'font-display text-[15px] font-semibold underline-offset-[6px] transition-colors motion-reduce:transition-none';

/**
 * Every project photo, filtered by category. The rows are justified: each photo grows in proportion
 * to its aspect ratio, so a row fills the width and no photo is cropped. Tap one to see it larger.
 */
export function WorkGallery({ photos, categories }: Props) {
  const [active, setActive] = useState<GalleryCategory | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const shown = active === 'all' ? photos : photos.filter((photo) => photo.category === active);

  const choose = (next: GalleryCategory | 'all') => {
    setActive(next);
    setOpenIndex(null);
  };

  return (
    <>
      <div className={`${container} flex flex-wrap items-center gap-x-7 gap-y-3`}>
        <h2 className="sr-only">Filter photos by project type</h2>
        <button
          type="button"
          onClick={() => choose('all')}
          aria-pressed={active === 'all'}
          className={`${filterBase} ${active === 'all' ? 'text-ink underline decoration-crale-green decoration-2' : 'text-ink-soft hover:text-ink'}`}
        >
          All work <span className="tabular-nums text-ink-soft">({photos.length})</span>
        </button>
        {categories.map((category) => {
          const count = photos.filter((photo) => photo.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => choose(category)}
              aria-pressed={active === category}
              className={`${filterBase} ${active === category ? 'text-ink underline decoration-crale-green decoration-2' : 'text-ink-soft hover:text-ink'}`}
            >
              {GALLERY_CATEGORY_LABELS[category]} <span className="tabular-nums text-ink-soft">({count})</span>
            </button>
          );
        })}
      </div>

      <div className={`${container} mt-8 lg:mt-10`}>
        <ul aria-label="Project photos" className="flex flex-wrap gap-3 sm:gap-4">
          {shown.map((photo, index) => {
            const ratio = photo.width / photo.height;
            return (
              <li key={photo.id} className="min-w-0" style={{ flex: `${ratio} 1 ${ratio * 14}rem` }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-haspopup="dialog"
                  className="block w-full cursor-zoom-in rounded-[4px]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-auto w-full rounded-[4px]"
                  />
                </button>
              </li>
            );
          })}
          {/* Spacers keep the last row from stretching a photo across the full width. */}
          <li aria-hidden="true" className="h-0 grow-[10] basis-[20rem]" />
          <li aria-hidden="true" className="h-0 grow-[10] basis-[20rem]" />
        </ul>
      </div>

      <PhotoLightbox label="Crale projects" photos={shown} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}
