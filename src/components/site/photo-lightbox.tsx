'use client';

import Image from 'next/image';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { DisplayPhoto } from '@/lib/site/photos';

type Props = {
  /** Accessible name, for example "Indian Lake homes". */
  label: string;
  photos: DisplayPhoto[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
};

const button =
  'grid size-12 place-items-center rounded-[4px] bg-white/10 text-white transition-colors hover:bg-white/20 motion-reduce:transition-none';

/**
 * One photo shown large in a native <dialog>, so focus handling, Escape, and an inert background
 * come for free. Arrow buttons and the arrow keys move through the set.
 */
export function PhotoLightbox({ label, photos, index, onChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = photos.length;

  // The element that opened the dialog, so focus can go back to it on close.
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
      openerRef.current?.focus();
      openerRef.current = null;
    } else if (!dialog.open) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    }
  }, [index]);

  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + count) % count);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    // Keep Tab and Shift+Tab cycling inside the viewer instead of escaping to the browser's toolbar.
    if (event.key === 'Tab') {
      const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>('button')].filter(
        (element) => element.offsetParent !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  const photo = index === null ? null : photos[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${label}, enlarged photo`}
      data-surface="evergreen"
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[rgb(8_14_11)] p-0 text-evergreen-ink backdrop:bg-[rgb(8_14_11)]"
    >
      {photo && index !== null && (
        <figure className="grid h-full grid-rows-[auto_1fr_auto]">
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
            <span className="font-display text-[15px] tabular-nums text-evergreen-soft">
              {index + 1} / {count}
            </span>
            <button type="button" onClick={() => onChange(null)} aria-label="Close" className={button}>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* The photo fills whatever space is left, scaled to fit without cropping. */}
          <div className="relative flex min-h-0 items-center gap-4 px-4 py-4 sm:px-6 lg:gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className={`${button} hidden shrink-0 md:grid`}
            >
              <ArrowLeft aria-hidden="true" className="size-6" />
            </button>
            <div className="relative h-full min-w-0 flex-1">
              <Image
                key={index}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className={`${button} hidden shrink-0 md:grid`}
            >
              <ArrowRight aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 px-4 pb-5 sm:px-6 md:justify-center md:pb-7">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${button} md:hidden`}>
              <ArrowLeft aria-hidden="true" className="size-6" />
            </button>
            <figcaption className="text-center text-base italic md:text-lg">{photo.alt}</figcaption>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${button} md:hidden`}>
              <ArrowRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </figure>
      )}
    </dialog>
  );
}
