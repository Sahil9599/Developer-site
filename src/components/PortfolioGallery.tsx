import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject, ServiceCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import {
  ExternalLink,
  X,
  Play,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Smartphone,
  Globe,
  Monitor,
  Cpu,
  Activity,
  Terminal,
  Shield,
  Zap
} from 'lucide-react';

interface PortfolioGalleryProps {
  onNavigate: (sectionId: string) => void;
  selectedCategory?: ServiceCategory | null;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onNavigate,
  selectedCategory
}) => {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>(selectedCategory || 'all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeTab, setActiveTab] = useState<'case-study' | 'live-demo'>('case-study');
  const { trackEvent } = useAnalytics();

  // Simulated live demo interactive states
  const [demoState, setDemoState] = useState<{
    fintechSimProgress: number;
    fintechSimStatus: string;
    telemetryVal: number;
    audioFftBands: number[];
    routeOptimized: boolean;
  }>({
    fintechSimProgress: 0,
    fintechSimStatus: 'Idle · Ready to authorize',
    telemetryVal: 142.8,
    audioFftBands: [34, 58, 72, 85, 45, 62, 38, 91, 74, 53, 67, 48],
    routeOptimized: false
  });

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  const handleProjectClick = (proj: PortfolioProject) => {
    setActiveProject(proj);
    setActiveTab('case-study');
    trackEvent('portfolio_view', proj.category, `Inspected case study: ${proj.title}`, {
      projectId: proj.id,
      duration: proj.duration
    });
  };

  const runLiveSimulation = () => {
    if (!activeProject) return;

    if (activeProject.demoType === 'fintech') {
      setDemoState(prev => ({ ...prev, fintechSimProgress: 15, fintechSimStatus: 'Validating biometric cryptographic key...' }));
      setTimeout(() => {
        setDemoState(prev => ({ ...prev, fintechSimProgress: 60, fintechSimStatus: 'Signing offline voucher with Secure Enclave...' }));
      }, 500);
      setTimeout(() => {
        setDemoState(prev => ({ ...prev, fintechSimProgress: 100, fintechSimStatus: 'Transaction confirmed · 85ms latency SLA passed' }));
      }, 1000);
    } else if (activeProject.demoType === 'telemetry') {
      const nextVal = +(130 + Math.random() * 25).toFixed(1);
      setDemoState(prev => ({ ...prev, telemetryVal: nextVal }));
    } else if (activeProject.demoType === 'audio') {
      const newBands = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15);
      setDemoState(prev => ({ ...prev, audioFftBands: newBands }));
    } else if (activeProject.demoType === 'logistics') {
      setDemoState(prev => ({ ...prev, routeOptimized: !prev.routeOptimized }));
    }

    trackEvent('portfolio_view', activeProject.category, `Ran interactive system simulator for ${activeProject.title}`);
  };

  // Render stylized procedural visual preview cards adhering to Zero-Broken-Image Policy
  const renderCardMockup = (project: PortfolioProject) => {
    switch (project.category) {
      case 'mobile':
        return (
          <div className="w-full h-44 bg-[#0a0f1d] p-3 flex items-center justify-center border-b border-slate-800/80 relative overflow-hidden group">
            {/* Ambient decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-blue-900/10" />
            {/* Phone shell */}
            <div className="w-36 h-full bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-1.5 shadow-lg flex flex-col relative">
              <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-1.5" />
              <div className="flex-1 bg-slate-950 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono mb-1">
                    <span>{project.title.split(' ')[0]}</span>
                    <span className="text-cyan-400 font-bold">120Hz</span>
                  </div>
                  <div className="h-6 w-full bg-cyan-950/50 rounded flex items-center px-1.5 border border-cyan-800/40">
                    <span className="text-[9px] font-mono text-cyan-300 font-bold">$124,500.00</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-3/4 bg-slate-800 rounded" />
                  <div className="h-2 w-1/2 bg-slate-850 rounded" />
                </div>
                <div className="h-4 w-full bg-cyan-500/20 rounded flex items-center justify-center text-[7px] font-mono text-cyan-300">
                  Biometric Auth Validated
                </div>
              </div>
            </div>
          </div>
        );

      case 'web':
        return (
          <div className="w-full h-44 bg-[#0a0f1d] p-3 flex flex-col justify-between border-b border-slate-800/80 relative overflow-hidden group">
            {/* Browser top chrome */}
            <div className="w-full flex items-center gap-1.5 pb-2 border-b border-slate-800/80">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <div className="ml-2 flex-1 h-3.5 bg-slate-900 rounded px-2 flex items-center text-[8px] font-mono text-slate-500 truncate">
                https://cloud.{project.id}.systems/telemetry
              </div>
            </div>
            {/* Browser viewport data grid */}
            <div className="flex-1 pt-2 grid grid-cols-3 gap-2">
              <div className="col-span-2 bg-slate-950/80 p-2 rounded border border-slate-800/80 flex flex-col justify-between">
                <div className="flex justify-between text-[8px] font-mono text-slate-400">
                  <span>TELEMETRY STREAM</span>
                  <span className="text-emerald-400">450k/sec</span>
                </div>
                {/* SVG Sparkline */}
                <svg className="w-full h-8 text-cyan-400" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M0 20 Q 20 5, 40 18 T 70 8 T 100 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="bg-slate-900/60 p-2 rounded border border-slate-800 flex flex-col justify-between text-[8px] font-mono">
                <span className="text-slate-400">LATENCY</span>
                <span className="text-cyan-300 text-xs font-bold">12ms</span>
                <span className="text-slate-500 text-[7px]">Edge node</span>
              </div>
            </div>
          </div>
        );

      case 'desktop':
        return (
          <div className="w-full h-44 bg-[#080d1a] p-3 flex flex-col justify-between border-b border-slate-800/80 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
                <Monitor className="w-3 h-3 text-indigo-400" />
                {project.title.split(' ')[0]} 64-Bit Desktop Workstation
              </span>
              <span className="text-indigo-400 font-mono text-[8px]">0.02ms Jitter</span>
            </div>
            {/* Visualizer bars */}
            <div className="flex-1 py-2 flex items-end gap-1.5 justify-between">
              {[40, 75, 55, 90, 65, 80, 45, 95, 60, 85, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-indigo-900 via-indigo-600 to-cyan-400 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
              <span>BUFFER: 64 SAMPLES</span>
              <span className="text-indigo-300">DIRECT KERNEL IO</span>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="w-full h-44 bg-[#0a0f1d] p-3 flex flex-col justify-between border-b border-slate-800/80 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Cpu className="w-3 h-3 text-amber-400" />
                {project.title.split(' ')[0]} Custom Architecture
              </span>
              <span className="text-amber-400 font-mono text-[8px]">Kafka Pipeline</span>
            </div>
            {/* Pipeline schematic */}
            <div className="flex-1 flex items-center justify-around px-2">
              <div className="w-12 h-10 bg-slate-900 border border-amber-600/40 rounded flex flex-col items-center justify-center text-[7px] font-mono text-amber-300">
                <span>INGEST</span>
                <span className="text-slate-500">50k/s</span>
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-600/60 to-cyan-500/60 mx-1" />
              <div className="w-14 h-11 bg-slate-900 border border-cyan-500/40 rounded flex flex-col items-center justify-center text-[7px] font-mono text-cyan-300">
                <span>ROUTING</span>
                <span className="text-slate-500">Heuristic</span>
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500/60 to-indigo-500/60 mx-1" />
              <div className="w-12 h-10 bg-slate-900 border border-indigo-600/40 rounded flex flex-col items-center justify-center text-[7px] font-mono text-indigo-300">
                <span>DISPATCH</span>
                <span className="text-slate-500">AGV Mesh</span>
              </div>
            </div>
            <div className="text-[8px] font-mono text-slate-500 flex justify-between">
              <span>99.99% FAULT RESILIENT</span>
              <span className="text-amber-400 font-semibold">$1.4M SAVINGS</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="portfolio" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Verified Production Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Proof of engineering execution across mission-critical systems.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Explore concrete case studies demonstrating how our web, mobile, desktop, and custom architectures solve hard business and technical problems.
            </p>
          </div>

          {/* Filter Bar (Segmented control with buttons - adhering to anti-slop guidelines) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setFilter('all');
                trackEvent('portfolio_view', undefined, 'Filtered portfolio by ALL');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Systems
            </button>
            <button
              onClick={() => {
                setFilter('mobile');
                trackEvent('portfolio_view', 'mobile', 'Filtered portfolio by Mobile');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'mobile'
                  ? 'bg-blue-950 text-blue-200 shadow-sm border border-blue-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => {
                setFilter('web');
                trackEvent('portfolio_view', 'web', 'Filtered portfolio by Web');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'web'
                  ? 'bg-cyan-950 text-cyan-200 shadow-sm border border-cyan-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => {
                setFilter('desktop');
                trackEvent('portfolio_view', 'desktop', 'Filtered portfolio by Desktop');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'desktop'
                  ? 'bg-indigo-950 text-indigo-200 shadow-sm border border-indigo-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => {
                setFilter('custom');
                trackEvent('portfolio_view', 'custom', 'Filtered portfolio by Custom');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'custom'
                  ? 'bg-amber-950 text-amber-200 shadow-sm border border-amber-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Solutions
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group bg-[#0b1120] border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Visual Procedural Mockup */}
                {renderCardMockup(project)}

                {/* Content Area */}
                <div className="p-5">
                  {/* Clean unboxed metadata (Strict Zero-Pill Rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="text-cyan-400 font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Proof Metrics Strip */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-cyan-400 font-mono tabular-nums">
                    {project.metrics[0].primary}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {project.metrics[0].label}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                  <span>Inspect Case</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study & Live Simulator Modal Drawer */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b1120] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/70">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400">{activeProject.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.duration}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 truncate">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="px-6 pt-3 border-b border-slate-800 bg-[#090e1a] flex gap-4">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'case-study'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Case Study & Architecture
              </button>
              <button
                onClick={() => setActiveTab('live-demo')}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'live-demo'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-3 h-3 text-cyan-400" />
                <span>Interactive System Simulator</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'case-study' ? (
                <>
                  {/* Verified Impact Metrics */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono tabular-nums">
                          {m.primary}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1.5">
                        The Challenge
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeProject.problem}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                        The Engineering Solution
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Key Engineering Features
                    </h4>
                    <div className="space-y-2">
                      {activeProject.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map(t => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Interactive Live System Simulator */
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span>Simulated Runtime Engine</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">Sandbox Mode</span>
                    </div>

                    {activeProject.demoType === 'fintech' && (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300">
                          Simulate the biometric cryptographic offline payment protocol:
                        </p>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="bg-cyan-400 h-full transition-all duration-300"
                            style={{ width: `${demoState.fintechSimProgress}%` }}
                          />
                        </div>
                        <div className="text-xs font-mono text-cyan-300">
                          {demoState.fintechSimStatus}
                        </div>
                      </div>
                    )}

                    {activeProject.demoType === 'telemetry' && (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300">
                          Live simulated sensor stream from substation transformer #04:
                        </p>
                        <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-lg">
                          <div>
                            <div className="text-[10px] text-slate-500 font-mono">VOLTAGE (KV)</div>
                            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                              {demoState.telemetryVal} kV
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Streaming at 25,000 frames/sec over edge WebSocket.
                          </div>
                        </div>
                      </div>
                    )}

                    {activeProject.demoType === 'audio' && (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300">
                          Fast Fourier Transform (FFT) real-time spectral response:
                        </p>
                        <div className="h-24 bg-slate-900 rounded-lg p-2 flex items-end gap-2 border border-slate-800">
                          {demoState.audioFftBands.map((val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-indigo-500 rounded-t transition-all duration-150"
                              style={{ height: `${val}%` }}
                            />
                          ))}
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          Rust lock-free circular buffer: 2.1ms round-trip latency.
                        </div>
                      </div>
                    )}

                    {activeProject.demoType === 'logistics' && (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300">
                          Autonomous heuristic route recalculation engine:
                        </p>
                        <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300">
                          Status: {demoState.routeOptimized ? 'Optimal Heuristic Active (Travel Distance: -28%)' : 'Standard Baseline Route'}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={runLiveSimulation}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Trigger Simulation Step</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Interested in a system like this for your organization?
              </span>
              <button
                onClick={() => {
                  setActiveProject(null);
                  onNavigate('contact');
                  trackEvent('contact_submit', activeProject.category, `Requested consultation based on ${activeProject.title}`);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 cursor-pointer transition-colors"
              >
                Inquire About Similar Architecture
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
