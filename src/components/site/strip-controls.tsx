'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Edge = 'start' | 'middle' | 'end' | 'both';

/** Tracks whether a horizontal scroller is at its start, end, or somewhere between. */
function useScrollEdge(targetId: string): Edge {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const strip = document.getElementById(targetId);
      strip?.addEventListener('scroll', onChange, { passive: true });
      window.addEventListener('resize', onChange);
      return () => {
        strip?.removeEventListener('scroll', onChange);
        window.removeEventListener('resize', onChange);
      };
    },
    [targetId],
  );

  const getSnapshot = useCallback((): Edge => {
    const strip = document.getElementById(targetId);
    if (!strip) return 'start';
    const atStart = strip.scrollLeft <= 4;
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
    if (atStart && atEnd) return 'both';
    if (atStart) return 'start';
    return atEnd ? 'end' : 'middle';
  }, [targetId]);

  return useSyncExternalStore(subscribe, getSnapshot, () => 'start');
}

const buttonClass =
  'grid size-12 place-items-center rounded-[4px] bg-seawall text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:bg-seawall disabled:hover:text-ink motion-reduce:transition-none';

/** Back and forward arrows for a photo strip. Desktop only; phones swipe. */
export function StripControls({ targetId, label }: { targetId: string; label: string }) {
  const edge = useScrollEdge(targetId);

  const scroll = (direction: 1 | -1) => {
    const strip = document.getElementById(targetId);
    if (!strip) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollBy({ left: strip.clientWidth * 0.8 * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="hidden gap-2 md:flex">
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={edge === 'start' || edge === 'both'}
        aria-controls={targetId}
        aria-label={`Scroll ${label} back`}
        className={buttonClass}
      >
        <ArrowLeft aria-hidden="true" className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={edge === 'end' || edge === 'both'}
        aria-controls={targetId}
        aria-label={`Scroll ${label} forward`}
        className={buttonClass}
      >
        <ArrowRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
