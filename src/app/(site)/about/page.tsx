import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/json-ld';
import { AboutNumbers } from '@/components/about/about-numbers';
import { AboutStandard } from '@/components/about/about-standard';
import { AboutStory } from '@/components/about/about-story';
import { AboutTeam } from '@/components/about/about-team';
import { AboutWhatWeBuild } from '@/components/about/about-what-we-build';
import { ClosingCta } from '@/components/site/closing-cta';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'About',
  description:
    'Crale Builders was founded in Sidney, Ohio in 1995 by Dale Bensman and Craig Kuck, and builds custom homes, remodels, and commercial projects across the region.',
  path: '/about',
});

const structuredData = breadcrumbSchema([{ name: 'About', path: '/about' }]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <AboutStory />
      <AboutTeam />
      <AboutNumbers />
      <AboutWhatWeBuild />
      <AboutStandard />
      <ClosingCta background="seawall" />
    </>
  );
}
