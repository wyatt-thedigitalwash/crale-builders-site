'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PhotoLightbox } from '@/components/site/photo-lightbox';
import type { DisplayPhoto } from '@/lib/site/photos';

/**
 * Photos of one rental, each shown whole at its own shape (no cropping). Tap any to see it larger
 * and move through the set.
 */
export function RentalPhotos({ photos, label }: { photos: DisplayPhoto[]; label: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul aria-label={label} className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <li key={`${photo.src}-${index}`}>
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
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                className="h-auto w-full rounded-[4px]"
              />
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox label={label} photos={photos} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}
