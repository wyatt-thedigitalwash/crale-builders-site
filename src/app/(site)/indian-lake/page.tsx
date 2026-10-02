import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { LakeFeature } from '@/components/indian-lake/lake-feature';
import { LakeGallery } from '@/components/indian-lake/lake-gallery';
import { LakeIntro } from '@/components/indian-lake/lake-intro';
import { LakeServices } from '@/components/indian-lake/lake-services';
import { ClosingCta } from '@/components/site/closing-cta';
import { PhotoHero } from '@/components/site/photo-hero';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
import { LAKE_PHOTOS } from '@/lib/site/lake-photos';
import { LAKE_AREAS, breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Indian Lake Home Builder',
  description:
    'Crale Builders has built and remodeled Indian Lake homes since 1999: new lake homes, tear-down rebuilds, additions, and decks in Lakeview and Russells Point.',
  path: '/indian-lake',
});

const structuredData = [
  serviceSchema({
    name: 'Indian Lake home building and remodeling',
    description: metadata.description as string,
    path: '/indian-lake',
    serviceType: 'Home building and remodeling',
    areaServed: LAKE_AREAS,
  }),
  breadcrumbSchema([{ name: 'Indian Lake', path: '/indian-lake' }]),
];

// The aerial build timeline joins LakeFeature once the aerial construction photos arrive.
export default function IndianLakePage() {
  const hero = LAKE_PHOTOS.fallDecks;

  return (
    <>
      <JsonLd data={structuredData} />
      <PhotoHero
        size="half"
        titleId="indian-lake-hero-title"
        image={hero.image}
        alt={hero.alt}
        imageClassName="object-[50%_50%]"
        line1="Built for life"
        line2="at Indian Lake."
        primary={{ label: 'Start a lake project', href: '/contact' }}
        secondary={{ label: 'See lake homes', href: '#from-the-water' }}
        detail={`Lake homes, rebuilds, and remodels in ${listWithAnd(BUSINESS.lakeCommunities)}.`}
      />
      <LakeIntro />
      <LakeServices />
      <LakeFeature />
      <LakeGallery />
      <ClosingCta
        background="seawall"
        title="Thinking about building or remodeling at the lake?"
        text="Tell us about your lot or the home you have now. We will walk through it with you in a free, no obligation consultation."
        ctaLabel="Start a lake project"
      />
    </>
  );
}
