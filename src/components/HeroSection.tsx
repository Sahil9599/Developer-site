import React from 'react';
import { ServiceCategory } from '../types';
import {
  ArrowUpRight,
  Smartphone,
  Globe,
  Monitor,
  Cpu,
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
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

  const serviceCards: {
    id: ServiceCategory;
    title: string;
    headline: string;
    tagline: string;
    icon: React.ReactNode;
    color: string;
    badgeColor: string;
    stat: string;
    statLabel: string;
    tech: string[];
  }[] = [
    {
      id: 'web',
      title: 'Web Engineering',
      headline: 'Next-Gen Responsive SaaS & Cloud Portals',
      tagline: 'Edge streaming SSR with sub-380ms Time-To-Interactive.',
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 hover:border-cyan-500/60',
      badgeColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-800/80',
      stat: '<380ms',
      statLabel: 'Median Time-To-Interactive',
      tech: ['React 19', 'Next.js', 'TypeScript', 'Edge Workers']
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      headline: 'Native iOS & Android Offline Systems',
      tagline: 'Hardware Secure Enclave biometrics with 120Hz gesture response.',
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-500/60',
      badgeColor: 'text-blue-400 bg-blue-950/70 border-blue-800/80',
      stat: '99.98%',
      statLabel: 'Crash-Free Sessions SLA',
      tech: ['Swift', 'Kotlin', 'React Native', 'SQLite Sync']
    },
    {
      id: 'desktop',
      title: 'Desktop Application Dev',
      headline: 'Cross-Platform 64-Bit Workstation Suites',
      tagline: 'Multi-threaded computing, audio DSP, and direct OS hardware I/O.',
      icon: <Monitor className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/30 hover:border-indigo-500/60',
      badgeColor: 'text-indigo-400 bg-indigo-950/70 border-indigo-800/80',
      stat: '<2.1ms',
      statLabel: 'Round-Trip Audio Buffer',
      tech: ['Tauri', 'Rust', 'C++', 'Electron']
    },
    {
      id: 'custom',
      title: 'Custom Software Solutions',
      headline: 'Tailored Enterprise Pipelines & Heuristics',
      tagline: 'Event-driven Kafka streaming engineered for unique operational constraints.',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-500/60',
      badgeColor: 'text-amber-400 bg-amber-950/70 border-amber-800/80',
      stat: '99.99%',
      statLabel: 'Operational Uptime SLA',
      tech: ['Go', 'Python', 'Kafka', 'Docker']
    }
  ];

  return (
    <section id="hero" className="relative w-full bg-[#070b14] pt-8 lg:pt-14 pb-16 overflow-hidden border-b border-slate-800/80">
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

        {/* Hero Headline with text-wrap: balance */}
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

        {/* Quantitative Proof Strip */}
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

        {/* High-Performance, Zero-Lag Interactive Service Showcase */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Core Service Verticals · Click to Inspect</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Ultra-Fast Responsive Suite</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCards.map(card => {
              const isSelected = selectedService === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    onSelectService(card.id);
                    onNavigate('services');
                    trackEvent('service_inspect', card.id, `Selected ${card.title} from Hero Showcase`);
                  }}
                  className={`bg-[#0b1120] border rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-cyan-400 ring-1 ring-cyan-400/40 bg-slate-900/90'
                      : `${card.color} bg-[#0b1120]`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        {card.icon}
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${card.badgeColor}`}>
                        {card.stat}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {card.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mb-3">
                      {card.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-cyan-400 font-medium">
                      <span>Explore Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
