import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Star, Quote, Building2, MapPin, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="w-full bg-[#070b14] py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Client Verification
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Attributable endorsements from engineering & product leaders.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Real outcomes delivered for venture-backed startups and established enterprise teams across our core service verticals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map(t => (
            <div
              key={t.id}
              className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div>
                {/* Author Info & Verified Mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 font-mono"
                      style={{ backgroundColor: t.accentColor }}
                    >
                      {t.avatarInitials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.author}</div>
                      <div className="text-xs text-slate-400">
                        {t.role} · <span className="text-slate-300 font-medium">{t.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Unboxed Metadata (Strict Zero-Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                  <span className="text-cyan-400 font-semibold">{t.serviceName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {t.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{t.projectYear}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Concrete Outcome Callout */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 bg-slate-950/60 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 px-6 sm:px-8 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quantified Outcome
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {t.outcome}
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400 shrink-0 ml-4 tabular-nums">
                  {t.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
