import React from 'react';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ServiceCategory } from '../types';
import { ArrowUpRight, ShieldCheck, Terminal, Cpu, Sparkles } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

interface HeroSectionProps {
  onSelectService: (service: ServiceCategory) => void;
  selectedService: ServiceCategory | null;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectService,
  selectedService,
  onNavigate
}) => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="hero" className="relative w-full bg-[#070b14] pt-8 lg:pt-14 overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
          <span className="text-cyan-400 font-semibold tracking-wide uppercase text-[11px]">Bespoke Engineering</span>
          <span aria-hidden="true">·</span>
          <span>Web Platforms</span>
          <span aria-hidden="true">·</span>
          <span>Mobile Systems</span>
          <span aria-hidden="true">·</span>
          <span>Desktop Workstations</span>
          <span aria-hidden="true">·</span>
          <span>Custom Logic</span>
        </div>

        {/* Hero Headline with text-wrap: balance and no orphan words */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
            Engineering software systems tailored for high-stakes operational scale.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            We partner with ambitious enterprises and technology leaders to build responsive web applications, resilient offline-first mobile apps, low-latency desktop software, and tailored custom architectures.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              onNavigate('portfolio');
              trackEvent('portfolio_view', undefined, 'Clicked Hero CTA: Explore Case Studies');
            }}
            className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onNavigate('estimator');
              trackEvent('estimator_use', undefined, 'Clicked Hero CTA: Calculate Project Scope');
            }}
            className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            Calculate Project Scope
          </button>

          <button
            onClick={() => {
              onNavigate('contact');
              trackEvent('contact_submit', undefined, 'Clicked Hero CTA: Schedule Discovery');
            }}
            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors py-2 px-3 whitespace-nowrap cursor-pointer"
          >
            Schedule Discovery Call →
          </button>
        </div>

        {/* Quantitative Proof Strip placed adjacent to proposition */}
        <div className="mt-10 pt-6 pb-4 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums">48+</div>
            <div className="text-xs text-slate-400 mt-1">Shipped Production Systems</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">99.98%</div>
            <div className="text-xs text-slate-400 mt-1">Client Uptime & Crash-Free SLA</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums">&lt;380ms</div>
            <div className="text-xs text-slate-400 mt-1">Median Time-To-Interactive</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-indigo-400 font-mono tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-1">Attributable Code Ownership</div>
          </div>
        </div>
      </div>

      {/* 3D Scene Hero Stage */}
      <div className="relative mt-4 border-t border-slate-800/80">
        <ThreeHeroScene
          onSelectService={onSelectService}
          selectedService={selectedService}
        />
      </div>
    </section>
  );
};
