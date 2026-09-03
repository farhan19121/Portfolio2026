import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  FileCheck2, 
  Users, 
  ChevronDown, 
  LineChart, 
  FileText,
  Sparkles
} from 'lucide-react';
import DynamicDotGrid from '../ui/DynamicDotGrid';

export default function Hero({ onOpenResume }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#fffcfc]"
    >
      {/* Dynamic Notebook Dot Grid Background on Parchment */}
      <DynamicDotGrid />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto text-center space-y-9 my-auto">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 pill-eyebrow shadow-[rgba(49,38,59,0.04)_0_1px_3px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
          <span className="font-mono-plex text-[11px] font-medium text-[#43394c]">
            Quantitative Analysis & Business Intelligence
          </span>
        </div>

        {/* Editorial Headline Hierarchy (Hex Signature: Serif Italic + Engineered Sans) */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#01011b] leading-[1.15]">
            <span className="font-editorial italic font-extralight block text-5xl sm:text-7xl lg:text-8xl text-[#01011b]">
              Turning "What happened?"
            </span>
            <span className="font-formula font-extrabold tracking-tight text-[#31263b] block text-3xl sm:text-5xl lg:text-6xl mt-1">
              into "What should we do next?"
              <span className="inline-block ml-2 text-[#cd5973] text-2xl sm:text-4xl align-middle">✦</span>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#43394c] leading-relaxed font-plex font-normal pt-2">
            I'm <strong className="text-[#01011b] font-semibold">Farhan Khan</strong> — an engineering student and data analyst combining rigorous SQL queries, Python data transformation, and commercial business modeling to unlock revenue and efficiency.
          </p>
        </div>

        {/* Action Controls (Hex Outlined + Ghost Pattern) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <button
            onClick={() => scrollTo('projects')}
            className="btn-outlined px-5 py-2.5 text-xs font-semibold"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#31263b]" />
          </button>

          <button
            onClick={() => scrollTo('experience')}
            className="btn-ghost text-xs"
          >
            <span>View Experience →</span>
          </button>

          <button
            onClick={onOpenResume}
            className="btn-ghost text-xs text-[#717a94] hover:text-[#01011b]"
          >
            <FileText className="w-3.5 h-3.5 text-[#717a94]" />
            <span>Resume & Metrics</span>
          </button>
        </div>

        {/* Verified Analytics Metrics Notebook Panels (Hex Design System) */}
        <div className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            {/* Metric 1 */}
            <div className="notebook-card p-5 bg-[#ffffff]">
              <div className="flex items-center justify-between text-[#717a94] mb-2 font-mono-plex text-[10px] uppercase">
                <span className="font-semibold text-[#43394c]">Ostwal Group</span>
                <FileCheck2 className="w-3.5 h-3.5 text-[#473982]" />
              </div>
              <div className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b]">
                8,000+
              </div>
              <div className="text-xs text-[#43394c] font-plex mt-1 leading-snug">
                Production & inventory records validated for plant operations
              </div>
            </div>

            {/* Metric 2 */}
            <div className="notebook-card p-5 bg-[#ffffff]">
              <div className="flex items-center justify-between text-[#717a94] mb-2 font-mono-plex text-[10px] uppercase">
                <span className="font-semibold text-[#43394c]">Retail Study</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#473982]" />
              </div>
              <div className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b]">
                $15.36
              </div>
              <div className="text-xs text-[#43394c] font-plex mt-1 leading-snug">
                Per-transaction margin gap discovered across customer tiers
              </div>
            </div>

            {/* Metric 3 */}
            <div className="notebook-card p-5 bg-[#ffffff]">
              <div className="flex items-center justify-between text-[#717a94] mb-2 font-mono-plex text-[10px] uppercase">
                <span className="font-semibold text-[#43394c]">ISTE MITS</span>
                <Users className="w-3.5 h-3.5 text-[#473982]" />
              </div>
              <div className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b]">
                450+
              </div>
              <div className="text-xs text-[#43394c] font-plex mt-1 leading-snug">
                Active member records managed with 99% verified accuracy
              </div>
            </div>

            {/* Metric 4 */}
            <div className="notebook-card p-5 bg-[#ffffff]">
              <div className="flex items-center justify-between text-[#717a94] mb-2 font-mono-plex text-[10px] uppercase">
                <span className="font-semibold text-[#43394c]">Web Analytics</span>
                <LineChart className="w-3.5 h-3.5 text-[#473982]" />
              </div>
              <div className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b]">
                +28%
              </div>
              <div className="text-xs text-[#43394c] font-plex mt-1 leading-snug">
                Increase in website session duration through UX & data insights
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down cue */}
        <div className="pt-2 flex justify-center">
          <button 
            onClick={() => scrollTo('projects')}
            className="text-[#717a94] hover:text-[#01011b] transition-colors p-1"
            aria-label="Scroll to case studies"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
