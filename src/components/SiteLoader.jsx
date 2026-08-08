import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '../data/site';

/**
 * Full-viewport brand intro — logo, wordmark, motto, and progress bar.
 * Plays on every full page load / refresh.
 */
export default function SiteLoader({ minMs = 2200, onDone }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const hold = reduceMotion ? Math.min(minMs, 600) : minMs;
    const t1 = window.setTimeout(() => setExiting(true), hold);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, hold + 480);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [minMs, reduceMotion, onDone]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="qm-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden grain"
          style={{
            background:
              'linear-gradient(155deg, #b33a47 0%, #822733 48%, #48151d 100%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading QuickMech"
        >
          {/* Subtle garage atmosphere */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${BRAND.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 35%',
              opacity: 0.28,
              filter: 'saturate(0.75) contrast(1.05)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(179,58,71,0.15), transparent 70%), linear-gradient(160deg, rgba(179,58,71,0.55) 0%, rgba(72,21,29,0.82) 55%, rgba(26,12,14,0.92) 100%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-brand-soft/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center">
            <motion.img
              src="/brand/logo.png"
              alt=""
              className="h-16 w-16 rounded-2xl object-cover scale-[1.35] ring-2 ring-white/25 shadow-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            />

            <motion.p
              className="mt-8 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              QuickMech
            </motion.p>

            <motion.p
              className="mt-2 font-display text-lg font-bold text-white/85 sm:text-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.4 }}
            >
              We wrench. You chill.
            </motion.p>

            <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/15 sm:w-52">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: exiting ? '100%' : '88%' }}
                transition={{
                  duration: reduceMotion ? 0.4 : minMs / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>

            <motion.p
              className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Warming the garage
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
