import type { MetadataRoute } from 'next';
import { getPublishedRentals } from '@/lib/content/public';
import { SITE_URL as BASE_URL } from '@/lib/seo';
import { withRentalSlugs } from '@/lib/site/rental-slug';

// Priority reflects how much of the business each page carries, with Indian Lake high on purpose.
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/indian-lake', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/custom-homes', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/remodeling', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/commercial', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/our-work', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/rentals', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/partners', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages = PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    lastModified,
  }));

  // One entry per published rental, so a search for a specific address can land on its own page.
  const units = await getPublishedRentals();
  const rentals = withRentalSlugs(units).map(({ unit, slug }) => ({
    url: `${BASE_URL}/rentals/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
    lastModified: unit.updatedAt ?? lastModified,
  }));

  return [...pages, ...rentals];
}
