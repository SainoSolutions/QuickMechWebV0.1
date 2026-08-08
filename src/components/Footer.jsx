import { Link } from 'react-router-dom';
import { BRAND } from '../data/site';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg)] px-4 py-12 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="h-9 w-9 overflow-hidden rounded-xl">
              <img
                src="/brand/logo.png"
                alt=""
                className="h-full w-full object-cover scale-[1.35]"
              />
            </span>
            <span className="font-display text-lg font-extrabold text-[var(--ink)]">{BRAND.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--mute)]">
            {BRAND.motto} Doorstep vehicle care for cars and bikes — book, track, and pay in the app.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#services" className="text-[var(--ink-soft)] hover:text-brand">
                  Services
                </a>
              </li>
              <li>
                <a href="#how" className="text-[var(--ink-soft)] hover:text-brand">
                  How it works
                </a>
              </li>
              <li>
                <a href="#play-store" className="text-[var(--ink-soft)] hover:text-brand">
                  Play Store
                </a>
              </li>
              <li>
                <a href="#partner" className="text-[var(--ink-soft)] hover:text-brand">
                  Partner
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to={BRAND.legal.privacy} className="text-[var(--ink-soft)] hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={BRAND.legal.terms} className="text-[var(--ink-soft)] hover:text-brand">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to={BRAND.legal.refund} className="text-[var(--ink-soft)] hover:text-brand">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to={BRAND.legal.deleteAccount}
                  className="text-[var(--ink-soft)] hover:text-brand"
                >
                  Delete account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="text-[var(--ink-soft)] hover:text-brand"
                >
                  {BRAND.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--mute)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <p>Play Store apps — coming soon.</p>
      </div>
    </footer>
  );
}
