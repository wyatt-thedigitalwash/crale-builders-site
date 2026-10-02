import { container } from '@/components/site/container';

const STEPS = [
  {
    title: 'Design and drafting',
    text: 'Our own draftsmen turn your ideas into plans, and we sit down with you as many times as it takes.',
  },
  {
    title: 'Pricing and planning',
    text: 'Clear costs, a schedule, and financing decisions settled before any work starts.',
  },
  {
    title: 'Construction',
    text: 'One project manager runs your build from the foundation to the final walkthrough.',
  },
  {
    title: 'Warranty',
    text: 'Every Crale project is covered by a one-year warranty after it is finished.',
  },
];

/** The payoff for the "From concept to completion" headline. Numbered because the order is real. */
export function ProjectProcess() {
  return (
    <section data-bg="seawall" aria-labelledby="process-title">
      <div className={container}>
        <div className="max-w-[46rem]">
          <h2
            id="process-title"
            className="font-display text-[1.875rem] font-[720] leading-[1.08] tracking-[-0.015em] text-balance font-stretch-semi-condensed md:text-[2.5rem]"
          >
            How a Crale project runs
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            One team from the first sketch to the final walkthrough, so nothing gets lost between the designer and the
            builder.
          </p>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-x-10">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid content-start gap-3">
              <span
                aria-hidden="true"
                className="font-display text-[3rem] font-[780] leading-none tracking-[-0.03em] text-crale-green tabular-nums font-stretch-semi-condensed md:text-[3.5rem]"
              >
                {index + 1}
              </span>
              <h3 className="font-display text-[1.375rem] font-[680] leading-tight font-stretch-semi-condensed">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="max-w-[34ch] text-[17px] leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
