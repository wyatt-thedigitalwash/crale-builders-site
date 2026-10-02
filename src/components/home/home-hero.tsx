import { PhotoHero } from '@/components/site/photo-hero';
import farmhouse from '@/../public/images/home/home-hero-blue-farmhouse.jpg';

export function HomeHero() {
  return (
    <PhotoHero
      titleId="home-hero-title"
      image={farmhouse}
      alt="Blue two-story farmhouse with a wraparound porch, dormers, and a stone chimney"
      imageClassName="object-[50%_50%]"
      line1="From concept"
      line2="to completion."
      primary={{ label: 'Start a project', href: '/contact' }}
      secondary={{ label: 'See our work', href: '/our-work' }}
      detail="Custom homes, remodeling, and Indian Lake homes in Sidney, Ohio."
    />
  );
}
