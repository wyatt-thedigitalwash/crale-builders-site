'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PhotoLightbox } from './photo-lightbox';
import type { DisplayPhoto } from '@/lib/site/photos';

type Props = {
  id: string;
  /** Accessible name, for example "Indian Lake homes". */
  label: string;
  /** Built-in photos (via toDisplayPhoto) or photos from the portal. */
  photos: DisplayPhoto[];
  className?: string;
};

// Left padding matches the page container, including on screens wider than the 120rem page width.
const stripPadding =
  'pl-4 scroll-pl-4 sm:pl-6 sm:scroll-pl-6 lg:pl-[max(2.5rem,calc((100vw-120rem)/2+2.5rem))] lg:scroll-pl-[max(2.5rem,calc((100vw-120rem)/2+2.5rem))] 2xl:pl-[max(3.5rem,calc((100vw-120rem)/2+3.5rem))] 2xl:scroll-pl-[max(3.5rem,calc((100vw-120rem)/2+3.5rem))]';

/**
 * Sideways photo strip: every photo the same height at its natural width, so nothing is cropped.
 * Starts at the page's left edge and runs off the right edge of the screen. Tap a photo to open it
 * larger, then move through the set with the arrows or the arrow keys.
 */
export function PhotoStrip({ id, label, photos, className = '' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul
        id={id}
        tabIndex={0}
        aria-label={`${label}, scrolls sideways`}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:thin] after:w-2 after:shrink-0 after:content-[''] lg:gap-5 ${stripPadding} ${className}`}
      >
        {photos.map((photo, index) => (
          <li key={`${index}-${photo.alt}`} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-haspopup="dialog"
              className="block cursor-zoom-in rounded-[4px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                placeholder={typeof photo.src === 'string' ? 'empty' : 'blur'}
                // Sized by height (14rem to 24rem), so a 4:3 photo shows about 300px wide on phones and 530px on desktop.
                sizes="(min-width: 1024px) 540px, (min-width: 640px) 420px, 320px"
                className="h-[clamp(14rem,28vw,24rem)] w-auto max-w-none rounded-[4px]"
              />
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox label={label} photos={photos} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}
