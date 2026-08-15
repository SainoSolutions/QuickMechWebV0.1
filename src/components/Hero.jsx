import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND } from '../data/site';
import AmbientBackdrop from './AmbientBackdrop';
import ServiceMarquee from './ServiceMarquee';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden grain">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={BRAND.heroImage}
          alt=""
          className="h-full w-full object-cover scale-105 object-[center_35%]"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-wash)', opacity: 0.82 }} />
        <AmbientBackdrop variant="hero" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,8,9,0.12) 0%, rgba(10,8,9,0.42) 48%, rgba(10,8,9,0.72) 72%, transparent 100%)',
          }}
        />
        {/* Soft land into page background */}
        <div
          className="absolute inset-x-0 bottom-0 h-[38%] sm:h-[42%]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--bg) 55%, transparent) 55%, var(--bg) 100%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-36 pt-28 sm:px-6 sm:pb-40 lg:justify-center lg:pb-44 lg:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Doorstep vehicle care
          </div>

          <p className="font-display text-[clamp(3.2rem,10vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-white">
            {BRAND.name}
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(1.4rem,3.4vw,2.35rem)] font-bold leading-[1.15] text-white/95">
            Doorstep vehicle care — book in a minute.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
            {BRAND.motto} Verified mechanics. Live tracking. OTP handoff. Clear prices before the
            wrench turns.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#play-store"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-brand-darker shadow-lg transition hover:scale-[1.02] hover:bg-brand-mist"
            >
              Coming soon on Play Store
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" />
              Explore services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mt-14 grid max-w-3xl grid-cols-3 gap-2.5 sm:gap-4"
        >
          {[
            ['01', 'Live track', 'Mechanic on map'],
            ['02', 'OTP secure', 'Start & finish'],
            ['03', 'Clear price', 'Pay your way'],
          ].map(([n, k, v]) => (
            <div
              key={k}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/8 px-3 py-3.5 backdrop-blur-md transition hover:border-white/35 hover:bg-white/14 sm:px-4 sm:py-5"
            >
              <p className="font-display text-[10px] font-bold tracking-widest text-white/40">{n}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/55">{k}</p>
              <p className="mt-0.5 text-sm font-bold text-white sm:text-base">{v}</p>
              <ArrowDownRight className="absolute bottom-3 right-3 h-4 w-4 text-white/0 transition group-hover:text-white/50" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Service ticker bridges hero into the page */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <ServiceMarquee tone="dark" />
        <div
          className="h-10 sm:h-14"
          style={{
            background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 40%, transparent), var(--bg))',
          }}
        />
      </div>
    </section>
  );
}
