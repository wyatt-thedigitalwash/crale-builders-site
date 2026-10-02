import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/site/business';

// Search metadata and structured data shared by every public page.

export const SITE_URL = 'https://www.cralebuilders.com';
const TITLE_SUFFIX = `${BUSINESS.name}, ${BUSINESS.address.city}, ${BUSINESS.address.state}`;
const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Crale Builders logo over a blue two-story farmhouse with a wraparound porch. Sidney, Ohio, 937.498.8000.',
};

type PageSeo = {
  /** Short page name. The title becomes "[name] | Crale Builders, Sidney, Ohio". */
  name: string;
  /** 150 to 160 characters, naming the service and the location. */
  description: string;
  /** Path from the site root, for example "/indian-lake". */
  path: string;
};

/** Title, description, canonical URL, Open Graph, and Twitter card for one page. */
export function pageMetadata({ name, description, path }: PageSeo): Metadata {
  const title = `${name} | ${TITLE_SUFFIX}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      siteName: BUSINESS.name,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

// Structured data -------------------------------------------------------------

const BUSINESS_ID = `${SITE_URL}/#business`;

/** Site-wide business details. GeneralContractor is the closest schema.org type to what Crale does. */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': BUSINESS_ID,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description:
    'General contractor in Sidney, Ohio building custom homes, remodels, additions, and light commercial projects across west central Ohio, and Indian Lake homes since 1999.',
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: '+1-937-498-8000',
  faxNumber: '+1-937-498-8001',
  email: BUSINESS.email,
  foundingDate: String(BUSINESS.founded),
  founder: [
    { '@type': 'Person', name: 'Dale Bensman' },
    { '@type': 'Person', name: 'Craig Kuck' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: 'OH',
    postalCode: BUSINESS.address.zip,
    addressCountry: 'US',
  },
  // US Census Bureau geocoder match for 3486 State Route 29, Sidney, OH 45365.
  geo: { '@type': 'GeoCoordinates', latitude: 40.33082, longitude: -84.19229 },
  areaServed: [
    ...BUSINESS.counties.map((county) => ({ '@type': 'AdministrativeArea', name: `${county} County, Ohio` })),
    { '@type': 'Place', name: 'Indian Lake, Ohio' },
  ],
  // Placeholder tier until Crale confirms how they want pricing described.
  priceRange: '$$$',
};

type ServiceSeo = { name: string; description: string; path: string; serviceType: string; areaServed: string[] };

/** One service, provided by the business above. */
export function serviceSchema({ name, description, path, serviceType, areaServed }: ServiceSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed.map((place) => ({ '@type': 'Place', name: place })),
  };
}

/** Home > [Parent] > [Page]. Pass the trail after Home; the last item is the current page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export const COUNTY_AREAS = BUSINESS.counties.map((county) => `${county} County, Ohio`);
export const LAKE_AREAS = ['Indian Lake, Ohio', ...BUSINESS.lakeCommunities.map((place) => `${place}, Ohio`)];
