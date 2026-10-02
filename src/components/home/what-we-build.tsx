import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { container } from '@/components/site/container';
import modernFarmhouse from '@/../public/images/home/custom-home-modern-farmhouse.jpg';
import fallDecks from '@/../public/images/indian-lake/fall-decks.jpg';
import whiteKitchen from '@/../public/images/home/remodel-white-kitchen.jpg';

type Path = {
  href: string;
  title: string;
  text: string;
  cue: string;
  image: StaticImageData;
  alt: string;
};

// Indian Lake first (see SITE.md). Cards share a 3:2 frame, so crops stay light.
const PATHS: Path[] = [
  {
    href: '/indian-lake',
    title: 'Indian Lake homes',
    text: 'New lake homes, tear-down rebuilds, and remodels designed around the water and the lot you have.',
    cue: 'Explore Indian Lake',
    image: fallDecks,
    alt: 'Two-story lake home with a stone lower level and wide decks in fall color',
  },
  {
    href: '/custom-homes',
    title: 'Custom homes',
    text: 'Build on your lot anywhere in Shelby, Logan, Miami, Auglaize, or Champaign County, from plans drawn by our own draftsmen.',
    cue: 'See custom homes',
    image: modernFarmhouse,
    alt: 'White modern farmhouse with board-and-batten gables and a black-trimmed front porch',
  },
  {
    href: '/remodeling',
    title: 'Remodeling and additions',
    text: 'Kitchens, bathrooms, basements, and additions that make the home you already own work better.',
    cue: 'See remodeling',
    image: whiteKitchen,
    alt: 'White kitchen with a peninsula, barstools, and gray plank floors',
  },
];

export function WhatWeBuild() {
  return (
    <section data-bg="white" aria-labelledby="what-we-build-title">
      <div className={container}>
        {/* Heading and intro stay together on the left, so they read as one block. */}
        <div className="max-w-[46rem]">
          <h2
            id="what-we-build-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What we build
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Whether you are starting from an empty lot, a lake cottage, or a kitchen that no longer works.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-12 md:mt-12 md:grid-cols-3">
          {PATHS.map((path) => (
            <li key={path.href} className="group relative grid content-start gap-3">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] bg-[#d9ddd6]">
                <Image
                  src={path.image}
                  alt={path.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <h3 className="mt-2 font-display text-[1.375rem] font-[680] leading-tight font-stretch-semi-condensed">
                {/* The title is the link; its overlay makes the whole card clickable with a short link name. */}
                <Link href={path.href} className="after:absolute after:inset-0 after:content-['']">
                  {path.title}
                </Link>
              </h3>
              <p className="max-w-[44ch] text-[17px] leading-relaxed text-ink-soft">{path.text}</p>
              <span
                aria-hidden="true"
                className="justify-self-start font-display text-[15px] font-semibold text-crale-green underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-crale-green motion-reduce:transition-none"
              >
                {path.cue}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
