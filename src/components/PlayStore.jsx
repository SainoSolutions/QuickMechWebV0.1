import { motion } from 'framer-motion';
import { BellRing, Smartphone } from 'lucide-react';
import { Reveal } from './motion';

export default function PlayStore() {
  return (
    <section id="play-store" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--bg)] to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand/30 bg-brand shadow-[var(--shadow)] grain">
            <img
              src="/art/bike-detail.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-deep/95 to-brand-darker" />
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
              aria-hidden
            />

            <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  <BellRing className="h-3.5 w-3.5" />
                  Coming soon
                </p>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  QuickMech on Google Play
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                  Instant booking, live tracking, OTP handoff, offers, and Google sign-in — landing
                  on Play Store soon. We’ll drop the download link the moment it goes live.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-brand-darker">
                    <Smartphone className="h-4 w-4" />
                    Play Store — Coming soon
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Get notified
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="justify-self-center"
              >
                <div className="relative w-[230px] rounded-[2.1rem] border border-white/25 bg-black/35 p-3 shadow-2xl backdrop-blur-md sm:w-[260px]">
                  <div className="overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-brand-darker to-black">
                    <img
                      src="/brand/mark.png"
                      alt=""
                      className="mx-auto mt-12 h-24 w-24 scale-125 object-contain drop-shadow-lg"
                    />
                    <div className="mt-6 px-5 pb-9 text-center text-white">
                      <p className="font-display text-xl font-extrabold">QuickMech</p>
                      <p className="mt-1 text-xs text-white/65">We wrench. You chill.</p>
                      <div className="mt-5 rounded-full bg-white/12 py-2 text-xs font-semibold">
                        Android · Coming soon
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
