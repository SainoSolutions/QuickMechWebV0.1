import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, Download } from 'lucide-react';

const Navbar = ({ hideLinks = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const legalLinks = (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      <Link to="/docs/privacy-policy" className="hover:text-secondary transition-colors">
        Privacy Policy
      </Link>
      <span className="text-slate-600" aria-hidden>
        |
      </span>
      <Link to="/docs/terms-and-conditions" className="hover:text-secondary transition-colors">
        Terms &amp; Conditions
      </Link>
    </div>
  );

  return (
    <nav className="fixed w-full z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Car className="text-secondary w-8 h-8" />
            <span className="text-xl font-bold text-white">Quick Mech</span>
          </Link>

          {/* Coming-soon / minimal nav: still show legal links */}
          {hideLinks && <div className="hidden sm:block">{legalLinks}</div>}

          {/* Desktop Menu */}
          {!hideLinks && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('trending')}
                  className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Trending
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  All Services
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('inquiry')}
                  className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </button>
                {legalLinks}
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download App
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!hideLinks && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}

          {hideLinks && (
            <div className="sm:hidden flex items-center gap-2 text-[11px] text-slate-400">
              <Link to="/docs/privacy-policy" className="hover:text-secondary">
                Privacy
              </Link>
              <span className="text-slate-600">|</span>
              <Link to="/docs/terms-and-conditions" className="hover:text-secondary">
                Terms
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!hideLinks && isOpen && (
        <div className="md:hidden glassmorphism border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('trending')}
              className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              🔥 Trending Services
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              All Services
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('inquiry')}
              className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </button>
            <Link
              to="/docs/privacy-policy"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white block w-full text-left px-3 py-2 rounded-md text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/docs/terms-and-conditions"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white block w-full text-left px-3 py-2 rounded-md text-sm"
            >
              Terms &amp; Conditions
            </Link>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="w-full text-left bg-gradient-to-r from-orange-500 to-orange-600 text-white block px-3 py-2 rounded-md text-base font-medium mt-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
