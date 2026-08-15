import { SERVICES } from '../data/site';

/** Infinite horizontal service ticker — for hero (dark) or page (light). */
export default function ServiceMarquee({ tone = 'dark' }) {
  const items = [...SERVICES, ...SERVICES];
  const isDark = tone === 'dark';

  return (
    <div
      className={`relative overflow-hidden ${
        isDark
          ? 'border-y border-white/10 bg-black/25 backdrop-blur-md'
          : 'border-y border-[var(--line)] bg-[var(--bg-elevated)]/80'
      }`}
      aria-hidden
    >
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 ${
          isDark
            ? 'bg-gradient-to-r from-black/50 to-transparent'
            : 'bg-gradient-to-r from-[var(--bg)] to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 ${
          isDark
            ? 'bg-gradient-to-l from-black/50 to-transparent'
            : 'bg-gradient-to-l from-[var(--bg)] to-transparent'
        }`}
      />
      <div className="flex w-max animate-marquee gap-8 py-3.5 pr-8">
        {items.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className={`whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-white/70' : 'text-[var(--mute)]'
            }`}
          >
            {s.name}
            <span className={`ml-8 ${isDark ? 'text-white/40' : 'text-brand'}`}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
