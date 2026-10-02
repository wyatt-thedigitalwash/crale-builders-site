import { container } from '@/components/site/container';
import { PhotoSlider, type Slide } from '@/components/site/photo-slider';
import { REMODELING_PHOTOS } from '@/lib/site/remodeling-photos';

// Different houses, so captions name the room only.
const SLIDES: Slide[] = [
  { ...REMODELING_PHOTOS.showerFramelessGlass, caption: 'Frameless glass shower with marble-look tile beside a soaking tub' },
  { ...REMODELING_PHOTOS.vaultedShiplapCeiling, caption: 'Vaulted shiplap ceiling with a wood beam' },
  { ...REMODELING_PHOTOS.livingRoomFireplaceMantel, caption: 'Living room with a stone fireplace and a wood mantel' },
  { ...REMODELING_PHOTOS.cofferedCeilingBar, caption: 'Coffered wood ceiling above a custom bar with turned columns' },
];

/** Finish work, room by room. */
export function RemodelRooms() {
  return (
    <section data-bg="white" aria-labelledby="remodel-rooms-title">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <PhotoSlider slides={SLIDES} label="Rooms Crale has finished" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="remodel-rooms-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            Down to the finish work
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Tile, trim, cabinets, and ceilings from houses around Sidney and west central Ohio. The finish work is where
            a remodel either looks like it belongs in the house or does not.
          </p>
        </div>
      </div>
    </section>
  );
}
