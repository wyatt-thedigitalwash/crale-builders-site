import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { RemodelGallery } from '@/components/remodeling/remodel-gallery';
import { RemodelIntro } from '@/components/remodeling/remodel-intro';
import { RemodelRooms } from '@/components/remodeling/remodel-rooms';
import { RemodelScope } from '@/components/remodeling/remodel-scope';
import { ClosingCta } from '@/components/site/closing-cta';
import { PhotoHero } from '@/components/site/photo-hero';
import { REMODELING_PHOTOS } from '@/lib/site/remodeling-photos';
import { COUNTY_AREAS, breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Remodeling and Additions',
  description:
    'Crale Builders remodels kitchens and bathrooms and builds additions and second stories for homes in Sidney, Ohio and across Shelby, Logan, and Miami counties.',
  path: '/remodeling',
});

const structuredData = [
  serviceSchema({
    name: 'Home remodeling and additions',
    description: metadata.description as string,
    path: '/remodeling',
    serviceType: 'Home remodeling',
    areaServed: COUNTY_AREAS,
  }),
  breadcrumbSchema([{ name: 'Remodeling', path: '/remodeling' }]),
];

export default function RemodelingPage() {
  const hero = REMODELING_PHOTOS.kitchenBlueBacksplash;

  return (
    <>
      <JsonLd data={structuredData} />
      <PhotoHero
        size="half"
        titleId="remodeling-hero-title"
        image={hero.image}
        alt={hero.alt}
        imageClassName="object-[50%_55%]"
        line1="Change the house,"
        line2="not the address."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See recent work', href: '#work' }}
        detail="Kitchens, bathrooms, additions, and second stories in Sidney and across west central Ohio."
      />
      <RemodelIntro />
      <RemodelScope />
      <RemodelRooms />
      <RemodelGallery />
      <ClosingCta
        background="seawall"
        title="Thinking about a remodel or an addition?"
        text="Tell us about the room or the space you wish you had. We will walk through it with you in a free, no obligation consultation."
      />
    </>
  );
}
