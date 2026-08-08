import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { BRAND } from '../data/site';

const LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#how', label: 'How it works' },
  { href: '/#play-store', label: 'App' },
  { href: '/#partner', label: 'Partner' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Navbar({ legalOnly = false }) {
  const { isDark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300"
      style={{
        background: scrolled || open ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled || open ? '1px solid var(--line)' : '1px solid transparent',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? 'var(--shadow)' : 'none',
      }}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="h-9 w-9 overflow-hidden rounded-xl ring-1 ring-black/10">
            <img
              src="/brand/logo.png"
              alt=""
              className="h-full w-full object-cover scale-[1.35] transition group-hover:scale-[1.42]"
            />
          </span>
          <span
            className={
              scrolled || open
                ? 'font-display text-lg font-extrabold tracking-tight text-[var(--ink)] sm:text-xl'
                : 'font-display text-lg font-extrabold tracking-tight text-white sm:text-xl drop-shadow'
            }
          >
            {BRAND.name}
          </span>
        </Link>

        {!legalOnly ? (
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={
                  scrolled || open
                    ? 'rounded-full px-3.5 py-2 text-sm font-medium text-[var(--mute)] transition hover:bg-[var(--bg-muted)] hover:text-[var(--ink)]'
                    : 'rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white'
                }
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link to={BRAND.legal.privacy} className="text-[var(--mute)] hover:text-brand">
              Privacy
            </Link>
            <Link to={BRAND.legal.terms} className="text-[var(--mute)] hover:text-brand">
              Terms
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={
              scrolled || open
                ? 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition hover:border-brand/40'
                : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20'
            }
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {!legalOnly ? (
            <a
              href="#play-store"
              className="hidden rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow)] transition hover:bg-brand-deep sm:inline-flex"
            >
              Get the app
            </a>
          ) : null}

          {!legalOnly ? (
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {open && !legalOnly ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--line)] md:hidden"
            style={{ background: 'var(--nav-bg)' }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--bg-muted)]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#play-store"
                className="mt-2 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get the app
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
