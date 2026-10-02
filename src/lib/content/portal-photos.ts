import 'server-only';
import type { DisplayPhoto } from '@/lib/site/photos';
import type { GalleryCategory } from './options';
import { getGalleryImages } from './public';

/**
 * A portal gallery category, ready for a photo strip, in the order set in the portal.
 * `skip` lists stored file names (for example "residential-025") of photos the page already shows
 * higher up, so the gallery does not repeat them. A name matches with or without the random suffix
 * Vercel Blob adds ("residential-025-AbC123.jpg").
 */
export async function getPortalPhotos(category: GalleryCategory, skip: string[] = []): Promise<DisplayPhoto[]> {
  const images = await getGalleryImages(category);
  const isSkipped = (pathname: string) =>
    skip.some((name) => pathname.startsWith(`gallery/${name}.`) || pathname.startsWith(`gallery/${name}-`));

  return images
    .filter((image) => image.width && image.height && !isSkipped(image.pathname))
    .map((image) => ({ src: image.url, alt: image.alt, width: image.width as number, height: image.height as number }));
}
