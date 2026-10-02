import Image from 'next/image';

type Props = {
  className?: string;
  alt?: string;
  /** Preload when the logo is above the fold (the header). */
  preload?: boolean;
  /** "reversed" is for Evergreen and other dark backgrounds: white letters with a deep green outline. */
  variant?: 'color' | 'reversed';
};

const SOURCES = {
  color: '/brand/crale-builders-wordmark.svg',
  reversed: '/brand/crale-builders-wordmark-reversed.svg',
};

/** Crale Builders wordmark, original vector artwork from the brochure. */
export function Logo({ className, alt = 'Crale Builders', preload = false, variant = 'color' }: Props) {
  return (
    <Image
      src={SOURCES[variant]}
      alt={alt}
      width={301}
      height={161}
      preload={preload}
      className={className}
    />
  );
}
