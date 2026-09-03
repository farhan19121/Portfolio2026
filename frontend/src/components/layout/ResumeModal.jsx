import React from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pdfUrl = '/Farhan_Khan_Resume.pdf';

  const handleOpenNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#01011b]/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#ffffff] border border-[#dbd7da] rounded-[6px] shadow-[rgba(49,38,59,0.3)_0_25px_60px] flex flex-col overflow-hidden my-auto text-[#01011b]">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#dbd7da] bg-[#fffcfc] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] flex items-center justify-center text-[#473982]">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-formula font-bold text-[#01011b] tracking-tight">
                Farhan_Khan_Resume.pdf
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Farhan_Khan_Resume.pdf"
              className="btn-outlined py-1 px-2.5 sm:px-3 text-xs"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#31263b]" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={handleOpenNewTab}
              className="btn-outlined py-1 px-2.5 sm:px-3 text-xs"
              title="Open in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#473982]" />
              <span className="hidden sm:inline">Open in Tab</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#717a94] hover:text-[#01011b] hover:bg-[#ecedf2] rounded-[3px] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-[#ecedf2] overflow-hidden relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Farhan Khan Resume"
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom bar */}
        <div className="px-4 sm:px-6 py-2.5 border-t border-[#dbd7da] bg-[#fffcfc] flex items-center justify-between text-[11px] font-mono-plex text-[#717a94] shrink-0">
          <span>Official Resume // Farhan Khan</span>
          <button
            onClick={onClose}
            className="btn-outlined py-1 px-3 text-[11px] font-medium"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
