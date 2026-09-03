import React from 'react';
import { ArrowUp, BarChart2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#dbd7da] bg-[#fffcfc] py-12 px-4 sm:px-6 lg:px-8 text-sm text-[#43394c]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-[3px] bg-[#ffffff] border border-[#31263b] flex items-center justify-center text-[#01011b]">
            <BarChart2 className="w-3.5 h-3.5 text-[#473982]" />
          </div>
          <div>
            <span className="font-formula font-bold text-[#01011b] text-xs sm:text-sm">Farhan Khan</span>
            <p className="text-[11px] font-mono-plex text-[#717a94]">Data & Commercial Analytics Portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <span className="text-[#717a94] font-editorial italic text-sm">
            "Turning 'What happened?' into 'What should we do next?'"
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="btn-outlined py-1.5 px-3 text-xs"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#31263b]" />
            <span className="hidden sm:inline">Back to Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-[#ecedf2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#717a94] font-mono-plex gap-4">
        <div>
          © {new Date().getFullYear()} Farhan Khan. Built with React, Vite, Tailwind CSS & Django REST Framework.
        </div>
        <div className="text-[#717a94]">
          Madhav Institute of Technology & Science (MITS), Gwalior
        </div>
      </div>
    </footer>
  );
}
