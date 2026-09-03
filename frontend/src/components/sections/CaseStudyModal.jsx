import React from 'react';
import { 
  X, 
  ArrowLeft, 
  TrendingUp, 
  Lightbulb, 
  Layers
} from 'lucide-react';

export default function CaseStudyModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const tools = Array.isArray(project.tools)
    ? project.tools
    : typeof project.tools === 'string'
      ? JSON.parse(project.tools || '[]')
      : [];

  const blocks = project.blocks || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#01011b]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-[#ffffff] border border-[#dbd7da] rounded-[6px] shadow-[rgba(49,38,59,0.25)_0_25px_60px] overflow-hidden my-6">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[#dbd7da] bg-[#ffffff]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-outlined py-1.5 px-3 text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </button>
            <span className="text-xs font-mono-plex text-[#473982] font-semibold hidden sm:inline-block">
              // CASE STUDY NOTEBOOK
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#717a94] hover:text-[#01011b] hover:bg-[#ecedf2] rounded-[3px] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto space-y-8 text-[#01011b]">
          {/* Hero Header */}
          <div className="space-y-4 border-b border-[#dbd7da] pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-[3px] text-xs font-mono-plex font-medium bg-[#ecedf2] text-[#473982] border border-[#dbd7da]">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-0.5 rounded-[3px] text-xs font-mono-plex font-medium bg-[#fffcfc] text-[#01011b] border border-[#31263b]">
                  Featured Study
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="text-sm sm:text-base text-[#43394c] font-plex">
                {project.subtitle}
              </p>
            )}

            {/* Tools list */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#43394c] font-mono-plex"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Executive Key Insight Box */}
            {project.key_insight && (
              <div className="mt-5 p-4 rounded-[6px] bg-[#ecedf2]/80 border border-[#dbd7da] flex items-start gap-3.5 shadow-sm">
                <div className="p-2 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#473982] shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono-plex font-semibold uppercase tracking-wider text-[#473982]">
                    Primary Key Insight & Commercial Impact
                  </h4>
                  <p className="text-sm text-[#01011b] font-plex mt-0.5 font-medium leading-relaxed">
                    {project.key_insight}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cover image if available */}
          {(project.cover_image || project.cover_image_url) && (
            <div className="rounded-[6px] overflow-hidden border border-[#dbd7da] max-h-96 shadow-sm">
              <img
                src={project.cover_image || project.cover_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Summary / Business Problem Overview */}
          {project.summary && (
            <div className="notebook-card p-6 space-y-2 bg-[#fffcfc]">
              <h3 className="text-xs font-mono-plex uppercase tracking-wider text-[#717a94] font-semibold">
                Executive Problem Statement
              </h3>
              <p className="text-sm sm:text-base text-[#31263b] font-plex leading-relaxed">
                {project.summary}
              </p>
            </div>
          )}

          {/* Dynamic Repeatable Blocks */}
          <div className="space-y-6">
            <div className="pill-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
              <span>Detailed Case Breakdown & Findings</span>
            </div>

            {blocks.length === 0 ? (
              <p className="text-xs text-[#717a94] italic font-plex">No additional content blocks defined for this project yet.</p>
            ) : (
              <div className="space-y-6">
                {blocks.map((block, idx) => {
                  switch (block.block_type) {
                    case 'heading':
                      return (
                        <div key={idx} className="pt-4 border-t border-[#dbd7da]">
                          <h3 className="text-xl sm:text-2xl font-formula font-bold text-[#01011b] tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
                            {block.heading}
                          </h3>
                        </div>
                      );

                    case 'subheading':
                      return (
                        <h4 key={idx} className="text-base font-formula font-bold text-[#473982] pt-1">
                          {block.heading || block.content}
                        </h4>
                      );

                    case 'text':
                      return (
                        <div key={idx} className="text-xs sm:text-sm text-[#31263b] font-plex leading-relaxed whitespace-pre-line">
                          {block.content}
                        </div>
                      );

                    case 'metric':
                      return (
                        <div key={idx} className="notebook-card p-5 bg-[#ffffff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b]">
                              {block.metric_value}
                            </div>
                            <div className="text-sm font-formula font-semibold text-[#473982] mt-0.5">
                              {block.metric_label}
                            </div>
                            {block.content && (
                              <p className="text-xs text-[#43394c] font-plex mt-1 max-w-xl leading-relaxed">
                                {block.content}
                              </p>
                            )}
                          </div>
                          <div className="p-2.5 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982] shrink-0">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                        </div>
                      );

                    case 'image':
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="rounded-[6px] overflow-hidden border border-[#dbd7da] bg-[#ecedf2] shadow-sm">
                            <img
                              src={block.image || block.image_url}
                              alt={block.image_caption || 'Case Study Visual'}
                              className="w-full max-h-96 object-cover"
                            />
                          </div>
                          {block.image_caption && (
                            <p className="text-xs text-center text-[#717a94] font-mono-plex italic">
                              Figure: {block.image_caption}
                            </p>
                          )}
                        </div>
                      );

                    case 'quote':
                      return (
                        <div key={idx} className="border-l-2 border-[#473982] bg-[#ecedf2]/60 p-4 rounded-r-[6px] italic text-[#31263b] font-plex text-xs sm:text-sm">
                          "{block.content}"
                        </div>
                      );

                    default:
                      return (
                        <div key={idx} className="text-xs sm:text-sm text-[#31263b] font-plex">
                          {block.content}
                        </div>
                      );
                  }
                })}
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-[#dbd7da] flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-[#717a94] font-mono-plex">
              End of case study // Farhan Khan Analytics Notebook
            </span>
            <button
              onClick={onClose}
              className="btn-outlined px-5 py-2 text-xs font-semibold"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
