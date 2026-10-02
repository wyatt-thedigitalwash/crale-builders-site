import Link from 'next/link';
import { container } from '@/components/site/container';

// Seawalls, docks, and boat lifts are left out until Crale confirms they build them.
const SERVICES = [
  {
    name: 'New lake homes',
    text: 'Custom homes designed around your lot, your family, and the view.',
  },
  {
    name: 'Tear-down and rebuild',
    text: 'Replace an older cottage with a home built for how you use the lake today.',
  },
  {
    name: 'Second-story additions',
    text: 'Add bedrooms and a better view without giving up yard space.',
  },
  {
    name: 'Lake home remodels',
    text: 'Kitchens, bathrooms, and open floor plans that make an older lake home work year-round.',
  },
  {
    name: 'Decks, porches, and sunrooms',
    text: 'Upper decks, screened porches, and sunrooms that face the water.',
  },
  {
    name: 'Garages',
    text: 'Attached and detached garages with room for the boat gear and the golf cart.',
  },
];

/** Spec list: answers "do they do my kind of project?" right after the intro. */
export function LakeServices() {
  return (
    <section data-bg="seawall" aria-labelledby="lake-services-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2
            id="lake-services-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            What we build at the lake
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            From a first lake home to a second story on the cottage you already own.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none"
          >
            Start a lake project
          </Link>
        </div>

        <dl className="m-0 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
          {SERVICES.map((service) => (
            <div key={service.name}>
              <dt className="font-display text-[1.25rem] font-[680] leading-tight font-stretch-semi-condensed md:text-[1.375rem]">
                {service.name}
              </dt>
              <dd className="m-0 mt-2 max-w-[40ch] text-[17px] leading-relaxed text-ink-soft">{service.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
