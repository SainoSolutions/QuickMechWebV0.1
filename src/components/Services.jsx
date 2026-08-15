import { motion } from 'framer-motion';
import { SERVICES } from '../data/site';
import { Item, Reveal, Stagger } from './motion';

/**
 * Desktop bento (4 cols):
 * [ Full 2×2 ] [ Basic ] [ Car Wash ]
 *              [ Battery ] [ AC ]
 * [ Wheel 2× ] [ Detailing ] [ Inspection ]
 * [ Custom — full width 4× ]
 */
const BENTO_ORDER = [
  'full-service',
  'basic-service',
  'car-wash',
  'battery-care',
  'ac-service',
  'wheel-alignment',
  'detailing',
  'inspection',
  'custom-service',
];

const BENTO_SPAN = {
  'full-service': 'md:col-span-2 md:row-span-2',
  'basic-service': 'md:col-span-1',
  'car-wash': 'md:col-span-1',
  'battery-care': 'md:col-span-1',
  'ac-service': 'md:col-span-1',
  'wheel-alignment': 'md:col-span-2',
  detailing: 'md:col-span-1',
  inspection: 'md:col-span-1',
  'custom-service': 'md:col-span-4',
};

const FEATURED = new Set(['full-service', 'custom-service', 'wheel-alignment']);

export default function Services() {
  const byId = Object.fromEntries(SERVICES.map((s) => [s.id, s]));
  const tiles = BENTO_ORDER.map((id) => byId[id]).filter(Boolean);

  return (
    <section id="services" className="relative scroll-mt-24 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Services</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
                Doorstep care.
                <span className="text-brand"> Clear pricing.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--mute)] md:text-right">
              From Basic Service to Detailing — or describe a Custom Request and we send a mechanic.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-flow-dense">
          {tiles.map((s) => {
            const isCustom = s.id === 'custom-service';
            const isFeatured = FEATURED.has(s.id);
            const isTall = s.id === 'full-service';
            const span = BENTO_SPAN[s.id] ?? 'md:col-span-1';

            return (
              <Item key={s.id} className={`h-full ${span}`}>
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                  className={`group relative h-full overflow-hidden rounded-[1.35rem] border ${
                    isCustom ? 'border-dashed border-brand/50' : 'border-[var(--line)]'
                  } ${isTall ? 'min-h-[420px] md:min-h-full' : 'min-h-[210px]'}`}
                >
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isFeatured
                        ? 'linear-gradient(to top, rgba(18,10,12,0.92) 0%, rgba(18,10,12,0.45) 48%, rgba(18,10,12,0.15) 100%)'
                        : 'linear-gradient(to top, rgba(18,10,12,0.9) 0%, rgba(18,10,12,0.4) 55%, rgba(18,10,12,0.12) 100%)',
                    }}
                    aria-hidden
                  />
                  {isCustom ? (
                    <div className="absolute inset-0 bg-brand/25 mix-blend-multiply" aria-hidden />
                  ) : null}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition duration-500 group-hover:scale-x-100"
                    aria-hidden
                  />

                  <div
                    className={`relative flex h-full flex-col justify-end p-5 ${isTall ? 'sm:p-7' : ''}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {isCustom ? 'Tell us what you need' : 'At your doorstep'}
                    </p>
                    <h3
                      className={`mt-1.5 font-display font-bold tracking-tight text-white ${
                        isTall
                          ? 'text-2xl sm:text-3xl'
                          : isFeatured
                            ? 'text-xl sm:text-2xl'
                            : 'text-lg'
                      }`}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={`mt-2 leading-relaxed text-white/72 ${
                        isTall || isCustom
                          ? 'max-w-lg text-sm sm:text-base'
                          : 'text-sm line-clamp-2'
                      }`}
                    >
                      {s.blurb}
                    </p>
                  </div>
                </motion.article>
              </Item>
            );
          })}
        </Stagger>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent"
        aria-hidden
      />
    </section>
  );
}
