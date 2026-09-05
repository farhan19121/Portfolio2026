import React from 'react';
import { 
  ArrowRight, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import DynamicDotGrid from '../ui/DynamicDotGrid';

export default function Hero() {
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

      <div className="relative z-10 max-w-[900px] w-full mx-auto text-center space-y-7 my-auto flex flex-col items-center justify-center">
        {/* Main Heading — Scaled Down Font Size */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <h1 className="font-editorial italic font-extralight tracking-tight text-[#01011b] text-3xl sm:text-5xl lg:text-6xl leading-[1.18]">
            <span className="block">
              Turning "What happened?"
            </span>
            <span className="block mt-1">
              into "What should we do next?"
            </span>
          </h1>

          {/* Hero description */}
          <p className="max-w-xl mx-auto text-sm sm:text-base lg:text-lg text-[#43394c] leading-relaxed font-plex font-normal pt-3">
            I'm Farhan Khan — an engineering student and data analyst who love to turn data into cash
          </p>
        </div>

        {/* Highly Highlighted, Colorful & Animated CTA Button */}
        <div className="pt-2 relative group">
          {/* Colorful ambient glow ring */}
          <div className="absolute -inset-1 rounded-[6px] bg-gradient-to-r from-[#473982] via-[#6f63b7] to-[#cd5973] opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500 group-hover:duration-200 animate-pulse"></div>
          
          <button
            onClick={() => scrollTo('projects')}
            className="relative px-7 py-3.5 rounded-[4px] bg-gradient-to-r from-[#01011b] via-[#31263b] to-[#473982] text-white text-xs sm:text-sm font-formula font-bold tracking-wide shadow-xl flex items-center gap-2.5 transform group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 border border-[#9e91d6]/30 overflow-hidden"
          >
            {/* Shimmer light animation effect across button */}
            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-out"></span>
            
            <Sparkles className="w-3.5 h-3.5 text-[#9e91d6] animate-spin" style={{ animationDuration: '4s' }} />
            <span>Explore Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Scroll down cue */}
        <div className="pt-4">
          <button 
            onClick={() => scrollTo('projects')}
            className="text-[#717a94] hover:text-[#01011b] transition-colors p-2"
            aria-label="Scroll to case studies"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
