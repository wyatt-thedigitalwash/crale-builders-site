import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { CommercialIntro } from '@/components/commercial/commercial-intro';
import { CommercialScope } from '@/components/commercial/commercial-scope';
import { CommercialSpaces } from '@/components/commercial/commercial-spaces';
import { ClosingCta } from '@/components/site/closing-cta';
import { PhotoHero } from '@/components/site/photo-hero';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { COMMERCIAL_PHOTOS } from '@/lib/site/commercial-photos';
import { COUNTY_AREAS, breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Commercial Construction',
  description:
    'Crale Builders builds and renovates offices, warehouses, and shops in Sidney, Ohio and across Shelby, Logan, Miami, Auglaize, and Champaign counties since 1995.',
  path: '/commercial',
});

const structuredData = [
  serviceSchema({
    name: 'Commercial construction',
    description: metadata.description as string,
    path: '/commercial',
    serviceType: 'Commercial construction and renovation',
    areaServed: COUNTY_AREAS,
  }),
  breadcrumbSchema([{ name: 'Commercial', path: '/commercial' }]),
];

export default function CommercialPage() {
  const hero = COMMERCIAL_PHOTOS.brickOfficeFlagpole;

  return (
    <>
      <JsonLd data={structuredData} />
      <PhotoHero
        size="half"
        titleId="commercial-hero-title"
        image={hero.image}
        alt={hero.alt}
        imageClassName="object-[50%_50%]"
        line1="Built for the way"
        line2="your business runs."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See commercial work', href: '#work' }}
        detail={`Offices, warehouses, and build-outs in ${listWithAnd(BUSINESS.counties)} counties.`}
      />
      <CommercialIntro />
      <CommercialScope />

      <CommercialSpaces />

      <ClosingCta
        background="seawall"
        title="Need more space, or a building that works better?"
        text="Tell us what the business needs to do that the building will not let it do. We will walk through it with you in a free, no obligation consultation."
      />
    </>
  );
}
