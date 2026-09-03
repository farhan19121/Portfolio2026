import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Data Analyst Intern',
      company: 'Ostwal Group of Industries',
      period: 'September 2025 – November 2025',
      badge: 'Manufacturing & Operations',
      highlights: [
        'Cleaned and validated over 8,000 production and inventory records to ensure data integrity across plant facilities.',
        'Executed exploratory data analysis (EDA) to uncover throughput trends, cycle time variations, and batch discrepancies.',
        'Audited structured operational business datasets to eliminate duplicate entries and standardize reporting formats.',
        'Collaborated with plant engineering teams to provide reliable reporting benchmarks for inventory restocking decisions.'
      ],
      metrics: [
        { label: 'Records Validated', val: '8,000+' },
        { label: 'Core Tooling', val: 'Python & SQL' },
        { label: 'Domain Scope', val: 'Inventory & Operations' }
      ]
    },
    {
      role: 'Web Developer & Data Analytics Associate',
      company: 'ISTE MITS Gwalior',
      period: 'January 2025 – April 2025',
      badge: 'Web Analytics & Operations',
      highlights: [
        'Managed a centralized database for 450+ active student members and supported registration data for 20+ events.',
        'Conducted user flow and engagement analysis using Google Analytics, identifying key website traffic drop-off points.',
        'Achieved a 28% increase in average website session duration through data-backed layout and UX recommendations.',
        'Cleaned and organized 500+ student records, sustaining approximately 99% data accuracy.',
        'Built monthly executive reporting dashboards utilizing Power BI and Excel to track event conversion rates.'
      ],
      metrics: [
        { label: 'Avg Session Duration', val: '+28%' },
        { label: 'Data Accuracy', val: '99%' },
        { label: 'Members Database', val: '450+' },
        { label: 'Events Supported', val: '20+' }
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-14">
        <div className="pill-eyebrow">
          <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
          <span>03 / PROFESSIONAL EXPERIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight mt-1">
          Verified Hands-On Industry Experience
        </h2>
        <p className="text-[#43394c] font-plex text-sm max-w-2xl mt-0.5">
          Measurable quantitative contributions in operational data validation, relational database management, and web analytics.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="notebook-card p-6 sm:p-7 space-y-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#dbd7da]/70">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-formula font-bold text-[#01011b] tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-[10px] font-mono-plex px-2 py-0.5 rounded-[3px] bg-[#ecedf2] text-[#473982] border border-[#dbd7da] font-medium">
                    {exp.badge}
                  </span>
                </div>
                <div className="text-xs font-plex font-medium text-[#717a94] mt-1">
                  {exp.company}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-plex text-[#43394c] bg-[#ecedf2] px-3 py-1.5 rounded-[3px] border border-[#dbd7da] w-fit">
                <Calendar className="w-3.5 h-3.5 text-[#473982]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Content & Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
              <div className="lg:col-span-8 space-y-2.5">
                <h4 className="text-xs font-mono-plex uppercase tracking-wider text-[#717a94] mb-1">
                  Key Responsibilities & Measurable Impact:
                </h4>
                <ul className="space-y-2">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#31263b] font-plex leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#473982] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="bg-[#ecedf2]/60 p-4 rounded-[6px] border border-[#dbd7da] space-y-2.5">
                  <div className="text-[10px] font-mono-plex text-[#717a94] uppercase tracking-wider font-medium">
                    Verified Outcomes
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {exp.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-[#ffffff] p-2.5 rounded-[3px] border border-[#dbd7da]">
                        <div className="text-base font-formula font-bold text-[#01011b]">{m.val}</div>
                        <div className="text-[10px] text-[#717a94] font-plex leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
