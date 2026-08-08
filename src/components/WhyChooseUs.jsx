import { WHY } from '../data/site';
import { Reveal } from './motion';

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative scroll-mt-24 wash-brand-mist px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(80%,42rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/35 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Why QuickMech</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            Verified mechanics. Honest quotes. Real ratings.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {WHY.map((item) => (
            <Reveal key={item.title}>
              <article className="group relative min-h-[260px] overflow-hidden rounded-[1.35rem] border border-[var(--line)] shadow-[var(--shadow)] sm:min-h-[300px]">
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(18,10,12,0.92) 0%, rgba(18,10,12,0.55) 45%, rgba(18,10,12,0.2) 100%)',
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6 sm:min-h-[300px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                    Why QuickMech
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-[1.65rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
