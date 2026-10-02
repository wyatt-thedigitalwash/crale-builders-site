import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/home-hero';
import { IndianLakeStrip } from '@/components/home/indian-lake-strip';
import { ProjectProcess } from '@/components/home/project-process';
import { Proof } from '@/components/home/proof';
import { RentalsSignpost } from '@/components/home/rentals-signpost';
import { WhatWeBuild } from '@/components/home/what-we-build';
import { ClosingCta } from '@/components/site/closing-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Custom Homes and Remodeling',
  description:
    'Crale Builders is a Sidney, Ohio general contractor building custom homes, remodels, and additions across west central Ohio, and Indian Lake homes since 1999.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhatWeBuild />
      <IndianLakeStrip />
      <ProjectProcess />
      <Proof />
      <RentalsSignpost />
      <ClosingCta />
    </>
  );
}
