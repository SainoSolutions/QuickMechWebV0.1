import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/site';
import { Reveal } from './motion';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative scroll-mt-24 wash-brand-mist px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
            Got questions?
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="surface overflow-hidden rounded-2xl transition hover:border-brand/30"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[var(--ink)]">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[var(--mute)] transition ${isOpen ? 'rotate-180 text-brand' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p className="border-t border-[var(--line)] px-5 py-4 text-sm leading-relaxed text-[var(--mute)]">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
