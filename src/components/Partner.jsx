import { Clock3, MapPinned, Wallet } from 'lucide-react';
import { Reveal } from './motion';

const POINTS = [
  { icon: Wallet, title: 'Earn on your terms', text: 'Jobs in your locality with clear payouts.' },
  { icon: Clock3, title: 'Set your own hours', text: 'Accept work that fits your schedule.' },
  { icon: MapPinned, title: 'Work nearby', text: 'Service Expert or Garage Owner — your call.' },
];

export default function Partner() {
  return (
    <section
      id="partner"
      className="relative scroll-mt-24 wash-elevated px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Partners</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            Become a QuickMech Partner
          </h2>
          <p className="mt-3 max-w-lg text-[var(--mute)]">
            Earn on your terms, work at your schedule. Trusted by mechanics who already run doorstep
            jobs with QuickMech.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">{title}</p>
                  <p className="text-sm text-[var(--mute)]">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="#play-store"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-white shadow-[var(--shadow)] transition hover:bg-brand-deep hover:scale-[1.02]"
          >
            Partner app — Coming soon on Play Store
          </a>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] shadow-[var(--shadow)]">
            <img src="/art/engine.jpg" alt="" className="h-56 w-full object-cover sm:h-64" />
            <div className="surface relative -mt-8 mx-4 mb-4 rounded-2xl p-6 backdrop-blur-md sm:mx-6 sm:mb-6">
              <img
                src="/brand/partner-logo.png"
                alt=""
                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-black/10"
              />
              <p className="mt-4 font-display text-2xl font-extrabold text-[var(--ink)]">
                QuickMech Partner
              </p>
              <p className="mt-2 text-sm text-[var(--mute)]">
                Open the Partner app when it lands on Play Store.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {['Service Expert', 'Garage Owner'].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
