import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/90 border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          Vanguard Tech Studio
        </button>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('services')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('estimator')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Estimator
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleNavClick('analytics')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Analytics
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Request Proposal
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090d16] px-6 py-4 flex flex-col gap-3">
          <button
            onClick={() => handleNavClick('services')}
            className="text-left text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="text-left text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('estimator')}
            className="text-left text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors cursor-pointer"
          >
            Estimator
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="text-left text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleNavClick('analytics')}
            className="text-left text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors cursor-pointer"
          >
            Analytics Dashboard
          </button>
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 text-center cursor-pointer transition-colors"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
