import { container } from '@/components/site/container';
import { BUSINESS } from '@/lib/site/business';
import { OFFICE, PROJECT_MANAGERS } from '@/lib/site/team';

const linkStyle =
  'font-display text-[15px] font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[6px] transition-colors hover:text-crale-green motion-reduce:transition-none';

// Founders come first in PROJECT_MANAGERS, so they lead the list.
const TEAM = [...PROJECT_MANAGERS, ...OFFICE];

/** The people behind the jobs: heading on the left, the team in two columns on the right. */
export function AboutTeam() {
  return (
    <section data-bg="white" aria-labelledby="about-team-title">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <h2
            id="about-team-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            The people running your job
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            A small team. The founders still run jobs themselves, and you can reach any of us directly or call the office
            at {BUSINESS.phone.display}.
          </p>
        </div>

        <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {TEAM.map((person) => (
            <li key={person.email}>
              <p className="font-display text-[1.375rem] font-[700] leading-tight font-stretch-semi-condensed md:text-[1.5rem]">
                {person.name}
              </p>
              <p className="mt-1 text-[17px] text-ink-soft">{person.role}</p>
              <a href={`mailto:${person.email}`} className={`${linkStyle} mt-2 inline-block`}>
                {person.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
