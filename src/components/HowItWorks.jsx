import { HOW_STEPS } from '../data/site';
import { Item, Reveal, Stagger } from './motion';

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden wash-elevated py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-25"
        style={{
          backgroundImage: 'url(/art/tools.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 20%, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-brand/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">How it works</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            Book. Track. OTP. Done.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {HOW_STEPS.map((step, i) => (
            <Item key={step.title}>
              <div className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg)]/80 p-6 shadow-[var(--shadow)] backdrop-blur-sm transition hover:border-brand/40">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-5xl font-extrabold leading-none text-brand/20 transition group-hover:text-brand/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--mute)]">
                    Step
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--mute)]">{step.text}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
