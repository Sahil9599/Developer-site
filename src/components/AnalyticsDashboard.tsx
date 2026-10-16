import React, { useState } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { ServiceCategory } from '../types';
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Download,
  RotateCcw,
  Sparkles,
  Smartphone,
  Globe,
  Monitor,
  Cpu,
  Clock,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const {
    events,
    serviceStats,
    totalEventsCount,
    totalInquiriesCount,
    simulateTrafficEvent,
    exportAnalyticsData,
    clearAnalytics,
    trackEvent
  } = useAnalytics();

  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d'>('7d');
  const [selectedFilter, setSelectedFilter] = useState<ServiceCategory | 'all'>('all');

  // Multiplier for timeframe view
  const multiplier = timeframe === 'today' ? 0.35 : timeframe === '7d' ? 1 : 3.8;

  const services: { key: ServiceCategory; name: string; icon: React.ReactNode; color: string }[] = [
    { key: 'web', name: 'Web Application Engineering', icon: <Globe className="w-4 h-4 text-cyan-400" />, color: 'bg-cyan-500' },
    { key: 'mobile', name: 'Mobile App Development', icon: <Smartphone className="w-4 h-4 text-blue-400" />, color: 'bg-blue-500' },
    { key: 'desktop', name: 'Desktop Application Dev', icon: <Monitor className="w-4 h-4 text-indigo-400" />, color: 'bg-indigo-500' },
    { key: 'custom', name: 'Custom Software Solutions', icon: <Cpu className="w-4 h-4 text-amber-400" />, color: 'bg-amber-500' }
  ];

  // Calculate total views across all services for relative percentage
  const totalViews = Object.values(serviceStats).reduce((sum, s) => sum + s.views * multiplier, 0);

  // Filter events if service filter is active
  const filteredEvents = selectedFilter === 'all'
    ? events
    : events.filter(e => e.serviceCategory === selectedFilter);

  return (
    <section id="analytics" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Engagement Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Cross-Service Analytics & Interaction Dashboard
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Live observability tracking user engagement, portfolio interest, and conversion funnels across all 4 engineering services.
            </p>
          </div>

          {/* Interactive Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setTimeframe('today')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  timeframe === 'today' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeframe('7d')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  timeframe === '7d' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe('30d')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  timeframe === '30d' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                30 Days
              </button>
            </div>

            {/* Simulate Event Button */}
            <button
              onClick={simulateTrafficEvent}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Trigger a simulated real-time user event to watch telemetry update"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate User Event</span>
            </button>

            {/* Export Report */}
            <button
              onClick={exportAnalyticsData}
              className="p-1.5 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Export Analytics Data (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={clearAnalytics}
              className="p-1.5 text-slate-400 bg-slate-900 border border-slate-800 rounded-lg hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset Local Analytics"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0b1120] border border-slate-800/90 rounded-xl p-5 shadow-lg">
            <div className="text-xs text-slate-400 font-medium">Total Tracked Interactions</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
              {Math.round(totalEventsCount * multiplier + 540 * multiplier)}
            </div>
            <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24.6% vs previous period</span>
            </div>
          </div>

          <div className="bg-[#0b1120] border border-slate-800/90 rounded-xl p-5 shadow-lg">
            <div className="text-xs text-slate-400 font-medium">Active Client Inquiries</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1 tabular-nums">
              {Math.round(totalInquiriesCount + 88 * multiplier)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Qualified enterprise leads
            </div>
          </div>

          <div className="bg-[#0b1120] border border-slate-800/90 rounded-xl p-5 shadow-lg">
            <div className="text-xs text-slate-400 font-medium">Avg Dwell on Architecture</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
              3m 18s
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              In-depth technical review
            </div>
          </div>

          <div className="bg-[#0b1120] border border-slate-800/90 rounded-xl p-5 shadow-lg">
            <div className="text-xs text-slate-400 font-medium">Case Study Inspection Rate</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono mt-1 tabular-nums">
              68.4%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Visitors inspect case studies
            </div>
          </div>
        </div>

        {/* Middle Section: Service Engagement Matrix & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Service-by-Service Breakdown (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Service Engagement Distribution
              </h3>
              <span className="text-xs text-slate-400 font-mono">Relative Traffic Weight</span>
            </div>

            <div className="space-y-5">
              {services.map(svc => {
                const stat = serviceStats[svc.key];
                const weightedViews = Math.round(stat.views * multiplier);
                const percent = totalViews > 0 ? Math.round((weightedViews / totalViews) * 100) : 25;
                const weightedInquiries = Math.round(stat.inquiries * multiplier);

                return (
                  <div key={svc.key} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {svc.icon}
                        <span className="font-semibold text-white">{svc.name}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-slate-400 text-[11px]">
                        <span>{weightedViews} Views</span>
                        <span aria-hidden="true" className="text-slate-700">·</span>
                        <span className="text-cyan-400">{weightedInquiries} Inquiries</span>
                        <span aria-hidden="true" className="text-slate-700">·</span>
                        <span className="text-white font-bold">{percent}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${svc.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom comparison note */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Top engagement driver: Web Application Engineering</span>
              <span className="text-cyan-400 font-mono font-medium">32.8% Conversion</span>
            </div>
          </div>

          {/* Conversion Funnel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Service Inbound Funnel
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Progression from service discovery to consultation inquiry
              </p>
            </div>

            <div className="space-y-3">
              {[
                { stage: '1. Service Page Discovery', count: Math.round(1840 * multiplier), drop: '100%' },
                { stage: '2. Architecture Drill-Down', count: Math.round(1260 * multiplier), drop: '68.5%' },
                { stage: '3. Portfolio Case Study Inspection', count: Math.round(890 * multiplier), drop: '48.4%' },
                { stage: '4. Interactive Scope Estimation', count: Math.round(410 * multiplier), drop: '22.3%' },
                { stage: '5. Form Submission / Proposal Request', count: Math.round(88 * multiplier + totalInquiriesCount), drop: '6.4%' }
              ].map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">{step.stage}</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">{step.count}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>Step Retention</span>
                    <span className="font-mono">{step.drop}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live User Activity Stream
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time event feed capturing interactions across the platform
              </p>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-500 px-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Filter:
              </span>
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('web')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedFilter === 'web' ? 'bg-cyan-950 text-cyan-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setSelectedFilter('mobile')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedFilter === 'mobile' ? 'bg-blue-950 text-blue-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setSelectedFilter('desktop')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedFilter === 'desktop' ? 'bg-indigo-950 text-indigo-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setSelectedFilter('custom')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedFilter === 'custom' ? 'bg-amber-950 text-amber-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Event Stream List */}
          <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No events recorded for this category yet.
              </div>
            ) : (
              filteredEvents.slice(0, 15).map(evt => (
                <div key={evt.id} className="py-2.5 flex items-center justify-between text-xs gap-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="font-mono text-slate-400 shrink-0 text-[11px]">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="text-slate-200 truncate">{evt.label}</span>
                  </div>

                  {evt.serviceCategory && (
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider shrink-0 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {evt.serviceCategory}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
