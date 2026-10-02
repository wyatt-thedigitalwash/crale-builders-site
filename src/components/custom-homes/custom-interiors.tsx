import { container } from '@/components/site/container';
import { PhotoSlider, type Slide } from '@/components/site/photo-slider';
import { CUSTOM_HOME_PHOTOS } from '@/lib/site/custom-home-photos';

// Each slide is a different home, so captions describe the room, never a single project.
const SLIDES: Slide[] = [
  { ...CUSTOM_HOME_PHOTOS.greatRoomVaulted, caption: 'Vaulted great room with dark beams and an arched window wall' },
  { ...CUSTOM_HOME_PHOTOS.livingRoomColumns, caption: 'Two-story living room with white columns, open to the kitchen' },
  { ...CUSTOM_HOME_PHOTOS.livingRoomVaulted, caption: 'Vaulted living room with a floor-to-ceiling stone fireplace' },
  { ...CUSTOM_HOME_PHOTOS.kitchenDark, caption: 'Kitchen with dark cabinetry, a granite island, and pendant lights' },
];

/** Interior finishes, drawn from several different Crale homes. */
export function CustomInteriors() {
  return (
    <section data-bg="white" aria-labelledby="custom-interiors-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <PhotoSlider slides={SLIDES} label="Inside Crale homes" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="custom-interiors-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Inside the homes we build
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Kitchens, great rooms, and finish work from homes around west central Ohio. Every one of them started as a
            conversation about how the family wanted to live in the space.
          </p>
        </div>
      </div>
    </section>
  );
}
