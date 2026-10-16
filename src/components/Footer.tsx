import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050810] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-base font-bold text-white tracking-tight">
              Vanguard Tech Studio
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Bespoke web application engineering, offline-first mobile apps, high-performance desktop systems, and tailored enterprise software.
            </p>
            <div className="flex items-center gap-2 text-slate-500 pt-1">
              <span>Zurich</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco</span>
              <span aria-hidden="true">·</span>
              <span>London</span>
            </div>
            <div className="pt-1">
              <a
                href="mailto:zarki201432@gmail.com"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
              >
                zarki201432@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Capabilities
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Mobile Application Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Web Application Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Desktop Application Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Custom Software Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-2 space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Verified Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Project Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Client Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analytics')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Engagement Telemetry
                </button>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Vanguard Engineering Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SOC2 Type II Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Knowledge Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Strict NDA Enforcement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
