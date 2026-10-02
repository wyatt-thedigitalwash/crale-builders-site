import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { CustomGallery } from '@/components/custom-homes/custom-gallery';
import { CustomInteriors } from '@/components/custom-homes/custom-interiors';
import { CustomIntro } from '@/components/custom-homes/custom-intro';
import { CustomScope } from '@/components/custom-homes/custom-scope';
import { ClosingCta } from '@/components/site/closing-cta';
import { PhotoHero } from '@/components/site/photo-hero';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
// The 1920px original from the live site's rotating banner. The gallery keeps the 1000px crop of the same house.
import heroPhoto from '@/../public/images/custom-homes/stone-ranch-circle-drive-wide.jpg';
import { COUNTY_AREAS, breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Custom Home Builder',
  description:
    'Crale Builders designs and builds custom homes on your lot in Sidney, Ohio and across Shelby, Logan, Miami, Auglaize, and Champaign counties, drafted in-house.',
  path: '/custom-homes',
});

const structuredData = [
  serviceSchema({
    name: 'Custom home building',
    description: metadata.description as string,
    path: '/custom-homes',
    serviceType: 'Custom home construction',
    areaServed: COUNTY_AREAS,
  }),
  breadcrumbSchema([{ name: 'Custom Homes', path: '/custom-homes' }]),
];

export default function CustomHomesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PhotoHero
        size="half"
        titleId="custom-homes-hero-title"
        image={heroPhoto}
        alt="Stone and siding ranch home with a gabled front porch and a curved driveway"
        imageClassName="object-[50%_45%]"
        line1="Built the way"
        line2="you live."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: "See homes we've built", href: '#homes' }}
        detail={`Custom homes on your lot in ${listWithAnd(BUSINESS.counties)} counties.`}
      />
      <CustomIntro />
      <CustomScope />
      <CustomInteriors />
      <CustomGallery />
      <ClosingCta
        background="seawall"
        title="Thinking about building a new home?"
        text="Tell us about your lot and how you want to live in it. We will walk through it with you in a free, no obligation consultation."
      />
    </>
  );
}
