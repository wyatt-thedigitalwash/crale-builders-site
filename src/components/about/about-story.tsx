import Image from 'next/image';
import { container } from '@/components/site/container';
import { BUSINESS, listWithAnd } from '@/lib/site/business';
// From the old site's Residential page, with its baked-in white frame and drop shadow trimmed off.
// Only 416px wide. Replace it if Crale has a larger original.
import storyPhoto from '@/../public/images/about/founders-reviewing-plans.jpg';
// The yard sign from the old About page, frame trimmed the same way. 263px wide, so it only ever shows small.
import signPhoto from '@/../public/images/about/crale-yard-sign.jpg';

/** The top of the About page: who started Crale, and what the company actually is. */
export function AboutStory() {
  return (
    <section data-bg="white" aria-labelledby="about-story-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-6">
          <h1
            id="about-story-title"
            className="font-display text-[2.375rem] font-[760] leading-[1] tracking-[-0.025em] text-balance font-stretch-semi-condensed md:text-[3.25rem] xl:text-[3.75rem]"
          >
            Two builders who stayed
          </h1>
          <p className="mt-6 max-w-[44ch] text-xl leading-relaxed text-ink md:text-[1.375rem] md:leading-relaxed">
            Dale Bensman and Craig Kuck started Crale Builders in {BUSINESS.founded}. Three decades later, they are still
            the ones you sit across the table from.
          </p>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Design, drafting, construction management, and general contracting all happen in-house, so the people
            drawing your plans and the people running your job work for the same outfit. We build across{' '}
            {listWithAnd(BUSINESS.counties)} counties, and at Indian Lake since {BUSINESS.indianLakeSince}.
          </p>
        </div>

        {/* The yard sign sits over the bottom left corner of the plans photo, like two prints laid on a table */}
        <div className="relative order-first pb-10 pl-10 sm:pb-14 sm:pl-16 lg:order-none lg:col-span-5 lg:col-start-8 lg:pl-0">
          <Image
            src={storyPhoto}
            alt="Three people reviewing a set of house plans at a conference table"
            placeholder="blur"
            preload
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-[4px]"
          />
          <div className="absolute bottom-0 left-0 w-[34%] max-w-[14rem] rounded-[6px] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(15,53,38,0.5)] sm:p-2 lg:-left-10">
            <Image
              src={signPhoto}
              alt="Yellow Crale Builders yard sign with the phone number 498-8000"
              placeholder="blur"
              sizes="14rem"
              className="h-auto w-full rounded-[3px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
