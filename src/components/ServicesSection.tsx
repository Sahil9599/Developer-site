import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import { Smartphone, Globe, Monitor, Cpu, CheckCircle2, ArrowRight, Code2, Clock } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (cat: ServiceCategory) => void;
  onNavigate: (sectionId: string) => void;
  selectedCategory: ServiceCategory | null;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigate,
  selectedCategory
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>(selectedCategory || 'web');
  const { trackEvent } = useAnalytics();

  const handleTabClick = (category: ServiceCategory) => {
    setActiveTab(category);
    onSelectService(category);
    trackEvent('service_inspect', category, `Selected ${category.toUpperCase()} service specification tab`);
  };

  const currentService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      case 'custom':
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Engineering Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Bespoke software solutions tailored to complex business logic.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every software discipline has unique constraints. Whether you need an offline-first mobile app, a sub-second web platform, a native desktop suite, or a tailored enterprise pipeline, we provide end-to-end technical execution.
          </p>
        </div>

        {/* Interactive Segmented Service Switcher (Button tabs adhering to anti-slop design) */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-[#090e1a] rounded-xl border border-slate-800/90">
          {SERVICES_DATA.map(service => {
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => handleTabClick(service.id)}
                className={`flex items-center gap-2.5 p-3 rounded-lg text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800/90 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                  {getServiceIcon(service.id)}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-500">{service.numericIndex}.</div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{service.title.split(' ')[0]} {service.title.split(' ')[1]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="mt-8 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Description & Architecture */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                {/* Clean unboxed metadata with separators (Strict Zero-Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="font-mono text-cyan-400">{currentService.numericIndex}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentService.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {currentService.typicalTimeline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {currentService.title}
                </h3>
                <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                  {currentService.fullDesc}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Architectural Pillars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.architectureHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies: Clean text tags with separators (Strict Zero-Pill Rule) */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Core Technologies
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  {currentService.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200">
                        {tech}
                      </span>
                      {idx < currentService.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Deliverables & Benchmark Box */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800/90">
              {/* Benchmark Stat Card */}
              <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {currentService.metricBadge.label}
                </div>
                <div className="text-3xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
                  {currentService.metricBadge.value}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Guaranteed production engineering benchmark
                </div>
              </div>

              {/* Production Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Standard Production Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {currentService.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                      <span className="font-mono text-cyan-400 font-bold">›</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    trackEvent('contact_submit', currentService.id, `Inquired about ${currentService.title}`);
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Proposal for {currentService.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onNavigate('portfolio');
                    trackEvent('portfolio_view', currentService.id, `Filter case studies by ${currentService.title}`);
                  }}
                  className="w-full py-2 px-4 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
                >
                  View Related Case Studies →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
