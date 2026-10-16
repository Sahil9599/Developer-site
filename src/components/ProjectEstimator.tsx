import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import { Calculator, ArrowRight, Check, Sliders, Shield, Zap, Sparkles } from 'lucide-react';

interface ProjectEstimatorProps {
  onAttachToContact: (estimate: {
    platform: string;
    estimatedCost: string;
    estimatedWeeks: string;
    category: ServiceCategory;
    selectedFeatures: string[];
  }) => void;
  onNavigate: (sectionId: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onAttachToContact,
  onNavigate
}) => {
  const [platform, setPlatform] = useState<ServiceCategory>('web');
  const [scale, setScale] = useState<'mvp' | 'standard' | 'enterprise'>('standard');
  const [offlineSync, setOfflineSync] = useState<boolean>(true);
  const [biometricsSecurity, setBiometricsSecurity] = useState<boolean>(false);
  const [realtimeSockets, setRealtimeSockets] = useState<boolean>(true);
  const [complianceAudit, setComplianceAudit] = useState<boolean>(false);
  const [hardwareBridge, setHardwareBridge] = useState<boolean>(false);

  const { trackEvent } = useAnalytics();

  // Dynamic calculation logic
  const calculateEstimate = () => {
    let baseWeeks = 8;
    let baseMinCost = 35;
    let baseMaxCost = 55;

    if (platform === 'mobile') {
      baseWeeks = 10;
      baseMinCost = 40;
      baseMaxCost = 65;
    } else if (platform === 'desktop') {
      baseWeeks = 12;
      baseMinCost = 45;
      baseMaxCost = 75;
    } else if (platform === 'custom') {
      baseWeeks = 14;
      baseMinCost = 60;
      baseMaxCost = 95;
    }

    if (scale === 'mvp') {
      baseWeeks *= 0.7;
      baseMinCost *= 0.7;
      baseMaxCost *= 0.75;
    } else if (scale === 'enterprise') {
      baseWeeks *= 1.4;
      baseMinCost *= 1.6;
      baseMaxCost *= 1.8;
    }

    if (offlineSync) {
      baseWeeks += 1.5;
      baseMinCost += 8;
      baseMaxCost += 12;
    }
    if (biometricsSecurity) {
      baseWeeks += 1;
      baseMinCost += 5;
      baseMaxCost += 9;
    }
    if (realtimeSockets) {
      baseWeeks += 1.5;
      baseMinCost += 7;
      baseMaxCost += 12;
    }
    if (complianceAudit) {
      baseWeeks += 2;
      baseMinCost += 12;
      baseMaxCost += 18;
    }
    if (hardwareBridge) {
      baseWeeks += 2.5;
      baseMinCost += 14;
      baseMaxCost += 22;
    }

    const roundedWeeks = Math.round(baseWeeks);
    const minCostFormatted = Math.round(baseMinCost);
    const maxCostFormatted = Math.round(baseMaxCost);

    return {
      weeks: `${roundedWeeks - 1}–${roundedWeeks + 2} Weeks`,
      cost: `$${minCostFormatted},000 – $${maxCostFormatted},000`
    };
  };

  const estimate = calculateEstimate();

  const handleApplyToContact = () => {
    const selectedFeatures: string[] = [];
    if (offlineSync) selectedFeatures.push('Offline Sync');
    if (biometricsSecurity) selectedFeatures.push('Biometrics & Enclave Security');
    if (realtimeSockets) selectedFeatures.push('Real-time WebSockets');
    if (complianceAudit) selectedFeatures.push('Compliance & Audit Trail');
    if (hardwareBridge) selectedFeatures.push('Hardware / Low-level Bridge');

    onAttachToContact({
      platform: platform.toUpperCase(),
      estimatedCost: estimate.cost,
      estimatedWeeks: estimate.weeks,
      category: platform,
      selectedFeatures
    });

    trackEvent('estimator_use', platform, `Attached estimate (${estimate.cost}) to contact form`);
    onNavigate('contact');
  };

  return (
    <section id="estimator" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Scope & Budget Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Interactive Project Cost & Timeline Estimator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Configure your technical scope, platform requirements, and compliance parameters to generate a realistic timeline and budget estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Form */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. Target Platform & Architecture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'web', label: 'Web Platform' },
                  { id: 'mobile', label: 'Mobile App' },
                  { id: 'desktop', label: 'Desktop App' },
                  { id: 'custom', label: 'Custom Enterprise' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPlatform(item.id as ServiceCategory);
                      trackEvent('estimator_use', item.id as ServiceCategory, `Selected estimator platform: ${item.label}`);
                    }}
                    className={`p-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                      platform === item.id
                        ? 'bg-cyan-950 text-cyan-200 border border-cyan-700 shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale & Stage */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                2. Project Scale & Stage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mvp', title: 'Agile MVP', desc: 'Core features, rapid market validation' },
                  { id: 'standard', title: 'Production Standard', desc: 'Full testing, scalable infrastructure' },
                  { id: 'enterprise', title: 'High-Scale Enterprise', desc: 'Rigorous SLA, redundancy, high load' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setScale(item.id as any)}
                    className={`p-3 rounded-lg text-left transition-all cursor-pointer ${
                      scale === item.id
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Specialized Modules */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                3. Technical Capabilities & Requirements
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    state: offlineSync,
                    setter: setOfflineSync,
                    label: 'Offline-First SQLite Sync Engine',
                    desc: 'Encrypted local cache with conflict resolution'
                  },
                  {
                    state: biometricsSecurity,
                    setter: setBiometricsSecurity,
                    label: 'Hardware Biometrics & Enclave',
                    desc: 'Secure Enclave / KeyStore cryptographic keys'
                  },
                  {
                    state: realtimeSockets,
                    setter: setRealtimeSockets,
                    label: 'Sub-Second Real-Time WebSockets',
                    desc: 'Continuous bi-directional streaming pipeline'
                  },
                  {
                    state: complianceAudit,
                    setter: setComplianceAudit,
                    label: 'SOC2 / HIPAA Compliance Audit',
                    desc: 'Tamper-proof audit logs & encryption at rest'
                  },
                  {
                    state: hardwareBridge,
                    setter: setHardwareBridge,
                    label: 'Low-Level Hardware / USB / BLE',
                    desc: 'Direct device drivers & peripheral protocols'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => item.setter(!item.state)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                      item.state
                        ? 'bg-slate-900/90 border-cyan-800/80 text-white'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        item.state ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700 bg-slate-900'
                      }`}
                    >
                      {item.state && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Calculated Estimate Card */}
          <div className="lg:col-span-5 bg-[#0b1120] border border-cyan-800/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Engineering Projection
              </span>
              <span className="text-xs font-mono text-slate-400">Fixed-Price or Milestones</span>
            </div>

            {/* Numbers */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Estimated Investment</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1 tabular-nums">
                  {estimate.cost}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Includes full design, engineering, QA, and initial deployment
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Target Delivery Horizon</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
                  {estimate.weeks}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Bi-weekly demo sprints with production-grade milestones
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-400">Platform:</span>
                <span className="font-semibold text-white uppercase">{platform} Architecture</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Scale:</span>
                <span className="font-semibold text-white capitalize">{scale} Scale</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Code Ownership:</span>
                <span className="font-semibold text-cyan-400">100% Unencumbered IP</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleApplyToContact}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Attach Scope to Contact Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
