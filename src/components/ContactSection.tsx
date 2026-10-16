import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';

interface ContactSectionProps {
  attachedEstimate?: {
    platform: string;
    estimatedCost: string;
    estimatedWeeks: string;
    category: ServiceCategory;
    selectedFeatures: string[];
  } | null;
  onClearEstimate?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  attachedEstimate,
  onClearEstimate
}) => {
  const { addInquiry } = useAnalytics();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(
    attachedEstimate?.category || 'web'
  );
  const [budgetRange, setBudgetRange] = useState('$50,000 – $100,000');
  const [timeline, setTimeline] = useState('2 – 4 Months');
  const [requirements, setRequirements] = useState(
    attachedEstimate
      ? `Estimated Scope: ${attachedEstimate.platform} architecture (${attachedEstimate.estimatedCost}, ${attachedEstimate.estimatedWeeks}). Features: ${attachedEstimate.selectedFeatures.join(', ')}.`
      : ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim()) {
      errs.email = 'Please provide your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid work email address';
    }
    if (!company.trim()) errs.company = 'Please provide your organization name';
    if (!requirements.trim() || requirements.trim().length < 15) {
      errs.requirements = 'Please describe your project objectives (minimum 15 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addInquiry({
        name,
        email,
        company,
        serviceCategory,
        budgetRange,
        timeline,
        requirements,
        estimatorConfig: attachedEstimate
          ? {
              platform: attachedEstimate.platform,
              estimatedCost: attachedEstimate.estimatedCost,
              estimatedWeeks: attachedEstimate.estimatedWeeks
            }
          : undefined
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setRequirements('');
    setIsSubmitted(false);
    if (onClearEstimate) onClearEstimate();
  };

  return (
    <section id="contact" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Initiate Engagement
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Schedule an architectural review for your upcoming system.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tell us about your technical objectives, operational constraints, and delivery horizon. We review all submissions and respond within one business day with a structured engineering plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Container */}
          <div className="lg:col-span-8 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-cyan-950 border border-cyan-700 text-cyan-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Proposal Request Logged
                </h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{name}</span>. Our engineering team has received your project brief for <span className="text-cyan-400 font-semibold">{company}</span>.
                </p>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Inquiry Summary
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="text-white font-medium capitalize">{serviceCategory} Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Budget:</span>
                    <span className="text-white font-medium">{budgetRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline:</span>
                    <span className="text-white font-medium">{timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Telemetry SLA:</span>
                    <span className="text-cyan-400 font-mono">Response within 24h</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attached Estimate Notice */}
                {attachedEstimate && (
                  <div className="p-3.5 bg-cyan-950/40 border border-cyan-800/80 rounded-xl flex items-center justify-between text-xs text-cyan-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>
                        Attached Estimator Scope: <strong>{attachedEstimate.platform}</strong> ({attachedEstimate.estimatedCost}, {attachedEstimate.estimatedWeeks})
                      </span>
                    </div>
                    {onClearEstimate && (
                      <button
                        type="button"
                        onClick={onClearEstimate}
                        className="text-[11px] text-cyan-400 underline hover:text-cyan-200 cursor-pointer ml-3"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-3.5 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                          errors.name ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Corporate Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="alex@organization.com"
                        className={`w-full px-3.5 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Organization & Service Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="e.g. Vanguard Logistics Corp"
                      className={`w-full px-3.5 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                        errors.company ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Primary Service Focus
                    </label>
                    <select
                      value={serviceCategory}
                      onChange={e => setServiceCategory(e.target.value as ServiceCategory)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="web">Web Application Engineering</option>
                      <option value="mobile">Mobile Application Development</option>
                      <option value="desktop">Desktop Application Development</option>
                      <option value="custom">Custom Software Solutions</option>
                    </select>
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Target Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={e => setBudgetRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="$30,000 – $50,000">$30,000 – $50,000 (MVP / Prototype)</option>
                      <option value="$50,000 – $100,000">$50,000 – $100,000 (Production Scale)</option>
                      <option value="$100,000 – $250,000">$100,000 – $250,000 (Complex Architecture)</option>
                      <option value="$250,000+">$250,000+ (Enterprise Overhaul)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Desired Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={e => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="Under 2 Months">Rapid Sprint (Under 2 Months)</option>
                      <option value="2 – 4 Months">Standard Milestones (2 – 4 Months)</option>
                      <option value="4 – 6 Months">Multi-Phase Pipeline (4 – 6 Months)</option>
                      <option value="Flexible / Ongoing">Flexible / Ongoing Engineering Partner</option>
                    </select>
                  </div>
                </div>

                {/* Project Requirements */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Project Brief & Technical Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={requirements}
                    onChange={e => setRequirements(e.target.value)}
                    placeholder="Describe your user base, technical requirements, existing tech stack, and primary business objectives..."
                    className={`w-full px-3.5 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                      errors.requirements ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.requirements && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.requirements}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Validating & Logging Brief...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Architecture Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact & Security Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Direct Engineering Line
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefer an immediate technical exchange? Contact our lead partners directly for NDA execution or technical discussions.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="mailto:zarki201432@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-cyan-400 underline underline-offset-2">zarki201432@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Monday – Friday · 08:00 – 19:00 UTC</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-3 text-xs text-slate-300">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">
                Engagement Standards
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Mutual NDA executed prior to deep architectural inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>100% intellectual property & code ownership transferred to client</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Fixed-scope or sprint-based transparent billing with no hidden fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
