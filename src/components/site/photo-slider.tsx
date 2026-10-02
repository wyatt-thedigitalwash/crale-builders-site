'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Slide = {
  image: StaticImageData;
  alt: string;
  caption: string;
  /** Optional object-position class, for a photo whose shape differs from the frame. */
  position?: string;
};

type Props = {
  slides: Slide[];
  /** Accessible name for the slider, for example "Rental homes". */
  label: string;
  sizes: string;
  /** Tailwind aspect class for the frame. Match it to the photos so crops stay light. */
  aspectClass?: string;
};

const arrowClass =
  'grid size-11 shrink-0 place-items-center rounded-[4px] bg-seawall text-ink transition-colors hover:bg-ink hover:text-white motion-reduce:transition-none';

/**
 * Several photos in one frame. Slides with the arrows, the progress bar, the keyboard, or a swipe
 * (the track is a native scroll-snap row, so touch scrolling works without extra code).
 */
export function PhotoSlider({ slides, label, sizes, aspectClass = 'aspect-[4/3]' }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  const go = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = (index + count) % count;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setCurrent(Math.min(Math.max(index, 0), count - 1));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(current + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(current - 1);
    }
  };

  return (
    <div className="grid gap-4">
      <ul
        ref={trackRef}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label={`${label}, use the arrow keys to move between photos`}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[4px] bg-[#d9ddd6] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <li
            key={slide.alt}
            aria-label={`Photo ${index + 1} of ${count}`}
            className={`relative w-full shrink-0 snap-start snap-always ${aspectClass}`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              placeholder="blur"
              sizes={sizes}
              className={`object-cover ${slide.position ?? ''}`}
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div role="group" aria-label="Choose a photo" className="flex min-w-0 flex-1 gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.alt}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show photo ${index + 1} of ${count}`}
              aria-current={index === current}
              className="relative h-1 flex-1 rounded-[2px] bg-[#c9cfc6] transition-colors before:absolute before:inset-x-0 before:-inset-y-3 before:content-[''] aria-[current=true]:bg-crale-green motion-reduce:transition-none"
            />
          ))}
        </div>
        <span aria-live="polite" className="shrink-0 font-display text-[15px] tabular-nums text-ink-soft">
          {current + 1} / {count}
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(current - 1)} aria-label="Previous photo" className={arrowClass}>
            <ArrowLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" onClick={() => go(current + 1)} aria-label="Next photo" className={arrowClass}>
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <p className="min-h-[1.5em] text-[15px] italic text-ink-soft">{slides[current].caption}</p>
    </div>
  );
}
