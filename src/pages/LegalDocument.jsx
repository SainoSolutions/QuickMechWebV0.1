import { Link } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';

/**
 * Shared layout for public legal documents (/docs/*).
 */
export default function LegalDocument({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-darkBg text-slate-200">
      <header className="border-b border-white/10 bg-primary/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80">
            <Car className="h-7 w-7 text-secondary" />
            <span className="text-lg font-bold">Quick Mech</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Legal</p>
        <h1 className="mb-2 text-3xl font-black text-white sm:text-4xl">{title}</h1>
        {updated ? <p className="mb-10 text-sm text-slate-400">Last updated: {updated}</p> : null}

        <div className="legal-prose space-y-6 text-[15px] leading-7 text-slate-300 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-secondary [&_a]:underline">
          {children}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm">
          <Link to="/docs/privacy-policy" className="text-slate-400 hover:text-secondary">
            Privacy Policy
          </Link>
          <Link to="/docs/terms-and-conditions" className="text-slate-400 hover:text-secondary">
            Terms &amp; Conditions
          </Link>
          <a href="mailto:support@quickmech.in" className="text-slate-400 hover:text-secondary">
            support@quickmech.in
          </a>
        </div>
      </article>
    </div>
  );
}
