/** Soft mesh blobs + blueprint grid + grain — free CSS/SVG art, no deps. */
export default function AmbientBackdrop({ variant = 'page' }) {
  if (variant === 'hero') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full blur-3xl animate-mesh"
          style={{ background: 'var(--mesh-1)' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/5 h-[60%] w-[60%] rounded-full blur-3xl animate-mesh"
          style={{ background: 'var(--mesh-2)', animationDelay: '-6s' }}
        />
        <div
          className="absolute left-1/3 top-1/3 h-[40%] w-[40%] rounded-full blur-3xl animate-mesh"
          style={{ background: 'var(--mesh-3)', animationDelay: '-11s' }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div
        className="absolute -left-32 top-24 h-80 w-80 rounded-full blur-3xl animate-mesh"
        style={{ background: 'var(--mesh-1)' }}
      />
      <div
        className="absolute -right-24 top-[40%] h-96 w-96 rounded-full blur-3xl animate-mesh"
        style={{ background: 'var(--mesh-2)', animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full blur-3xl animate-mesh"
        style={{ background: 'var(--mesh-3)', animationDelay: '-12s' }}
      />
      {/* Subtle bolt / wrench doodles */}
      <svg
        className="absolute right-[8%] top-[18%] h-24 w-24 opacity-[0.07]"
        viewBox="0 0 80 80"
        fill="currentColor"
      >
        <path d="M52 10c-5 0-9.5 2.2-12.5 5.7L36 20l-3-3a5 5 0 0 0-7 0L18 25a5 5 0 0 0 0 7l3 3-18 18a8 8 0 0 0 0 11l4 4a8 8 0 0 0 11 0l18-18 3 3a5 5 0 0 0 7 0l8-8a5 5 0 0 0 0-7l-3-3 3.5-4C58 24.5 60 20 60 15c0-2.8-2.2-5-5-5z" />
      </svg>
      <svg
        className="absolute left-[6%] bottom-[22%] h-28 w-28 opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="10" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <rect
            key={d}
            x="47"
            y="14"
            width="6"
            height="12"
            rx="2"
            fill="currentColor"
            transform={`rotate(${d} 50 50)`}
          />
        ))}
      </svg>
    </div>
  );
}
