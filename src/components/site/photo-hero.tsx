import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { buttonLight } from './button-styles';
import { container } from './container';

type LinkItem = { label: string; href: string };

type Props = {
  titleId: string;
  image: StaticImageData;
  alt: string;
  /** object-position classes, for example "object-[38%_50%] lg:object-[55%_55%]" */
  imageClassName: string;
  line1: string;
  line2: string;
  primary: LinkItem;
  secondary: LinkItem;
  /** One line that says what and where, under the buttons. */
  detail: string;
  /** "full" is the tall opening for the homepage and Indian Lake; "half" is the shorter service-page version. */
  size?: 'full' | 'half';
};

// Note: the hero photos are 1920x800 originals, so a tall container crops their sides. "full" is the
// homepage's signature opening and stays full height by choice; the crop is the accepted cost.
const HEIGHT = {
  full: 'h-[min(100svh,44rem)] min-h-[34rem] lg:h-[min(100svh,62rem)] lg:min-h-[42rem]',
  half: 'h-[min(66svh,26rem)] min-h-[21rem] lg:h-[min(72svh,33rem)] lg:min-h-[25rem]',
};

const TYPE = {
  full: {
    one: 'text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] 2xl:text-[5rem]',
    two: 'text-[2.125rem] sm:text-[2.625rem] lg:text-[3.125rem] 2xl:text-[3.625rem]',
  },
  half: {
    one: 'text-[2.125rem] sm:text-[2.75rem] lg:text-[3.25rem]',
    two: 'text-[1.625rem] sm:text-[2.125rem] lg:text-[2.5rem]',
  },
};

const PADDING = { full: 'pb-10 sm:pb-12 lg:pb-16', half: 'pb-8 lg:pb-10' };

/**
 * Full-width photo hero. Two-line headline in heavy condensed Archivo, second line in Job Sign Yellow,
 * bottom left over a soft near-black fade so the photo stays the focus. The section pulls up under the
 * sticky header, so any page using it must be listed in OVERLAY_PATHS (header-shell.tsx).
 */
export function PhotoHero({
  titleId,
  image,
  alt,
  imageClassName,
  line1,
  line2,
  primary,
  secondary,
  detail,
  size = 'full',
}: Props) {
  const type = TYPE[size];

  return (
    <section
      data-bg="evergreen"
      aria-labelledby={titleId}
      className={`relative isolate -mt-[4.5rem] flex items-end overflow-hidden py-0 lg:-mt-[5.5rem] ${HEIGHT[size]}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        preload
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        className={`-z-20 object-cover ${imageClassName}`}
      />
      {/* Soft fades only where text sits: the header at the top, the headline at the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(12_16_14/0.42),transparent_22%),linear-gradient(to_top,rgb(12_16_14/0.78),rgb(12_16_14/0.16)_45%,transparent_65%)] lg:bg-[linear-gradient(to_bottom,rgb(12_16_14/0.42),transparent_22%),linear-gradient(to_top,rgb(12_16_14/0.72),rgb(12_16_14/0.12)_42%,transparent_60%)]"
      />

      <div className={`${container} ${PADDING[size]}`}>
        <h1 id={titleId} className="font-display font-[780] leading-[0.92] tracking-[-0.03em] font-stretch-semi-condensed">
          <span className={`block text-white ${type.one}`}>{line1}</span>{' '}
          <span className={`mt-0.5 block text-sign-yellow lg:mt-1 ${type.two}`}>{line2}</span>
        </h1>
        <div className={`flex flex-wrap items-center gap-x-7 gap-y-4 ${size === 'half' ? 'mt-5 lg:mt-6' : 'mt-7 lg:mt-8'}`}>
          <Link href={primary.href} className={`${buttonLight} inline-flex h-12`}>
            {primary.label}
          </Link>
          <Link
            href={secondary.href}
            className="font-display text-[15px] font-semibold text-white underline decoration-sign-yellow decoration-2 underline-offset-[6px]"
          >
            {secondary.label}
          </Link>
        </div>
        <p
          className={`font-display text-[15px] text-white/85 lg:text-base ${size === 'half' ? 'mt-4 lg:mt-5' : 'mt-6 lg:mt-7'}`}
        >
          {detail}
        </p>
      </div>
    </section>
  );
}
