import type { StaticImageData } from 'next/image';

/** A bundled photo and its alt text, as used by the strips, sliders, and galleries. */
export type SitePhoto = { image: StaticImageData; alt: string };

/**
 * A photo ready to display, from either a bundled import or the portal (a URL plus its size).
 * Dimensions are required so a photo can be laid out without cropping.
 */
export type DisplayPhoto = { src: StaticImageData | string; alt: string; width: number; height: number };

export function toDisplayPhoto({ image, alt }: SitePhoto): DisplayPhoto {
  return { src: image, alt, width: image.width, height: image.height };
}
