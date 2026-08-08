import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { BRAND } from '../data/site';
import { Moon, Sun } from 'lucide-react';

function LegalChrome({ title, updated, children }) {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80">
            <span className="h-8 w-8 overflow-hidden rounded-xl">
              <img
                src="/brand/logo.png"
                alt=""
                className="h-full w-full object-cover scale-[1.35]"
              />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">{BRAND.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--mute)] transition hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">Legal</p>
        <h1 className="mb-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {updated ? <p className="mb-10 text-sm text-[var(--mute)]">Last updated: {updated}</p> : null}

        <div className="legal-prose space-y-6 text-[15px] leading-7 text-[var(--ink-soft)] [&_a]:text-brand [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--ink)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-[var(--line)] pt-8 text-sm">
          <Link to={BRAND.legal.privacy} className="text-[var(--mute)] hover:text-brand">
            Privacy Policy
          </Link>
          <Link to={BRAND.legal.terms} className="text-[var(--mute)] hover:text-brand">
            Terms &amp; Conditions
          </Link>
          <Link to={BRAND.legal.refund} className="text-[var(--mute)] hover:text-brand">
            Refund Policy
          </Link>
          <a href={`mailto:${BRAND.supportEmail}`} className="text-[var(--mute)] hover:text-brand">
            {BRAND.supportEmail}
          </a>
        </div>
      </article>
    </div>
  );
}

/**
 * Shared layout for public legal documents (/docs/*).
 * Routes for privacy & terms are unchanged.
 */
export default function LegalDocument({ title, updated, children }) {
  return (
    <ThemeProvider>
      <LegalChrome title={title} updated={updated}>
        {children}
      </LegalChrome>
    </ThemeProvider>
  );
}
