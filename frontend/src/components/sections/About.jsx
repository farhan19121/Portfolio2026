import React from 'react';
import { 
  GraduationCap, 
  Lightbulb, 
  Compass, 
  Database,
  LineChart,
  Search,
  Check
} from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Search,
      title: '1. Problem Definition',
      description: 'Understanding root business drivers, margin leakage, and operational bottlenecks before writing a single line of query.',
      accent: '#473982'
    },
    {
      icon: Database,
      title: '2. Relational & Messy Data Handling',
      description: 'Cleaning unstructured inputs, writing SQL CTEs, window functions, and validating records to eliminate bias and inaccuracies.',
      accent: '#21918c'
    },
    {
      icon: LineChart,
      title: '3. Exploratory & KPI Modeling',
      description: 'Segmenting customer tiers, calculating unit economics, and discovering purchase affinity patterns.',
      accent: '#544692'
    },
    {
      icon: Lightbulb,
      title: '4. Actionable Recommendations',
      description: 'Delivering clear, metric-backed strategic steps that leadership, marketing, or operations teams can execute immediately.',
      accent: '#6f63b7'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-14">
        <div className="pill-eyebrow">
          <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
          <span>02 / ABOUT & PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight mt-1">
          Connecting Technical Rigor with Commercial Strategy
        </h2>
        <p className="text-[#43394c] font-plex text-sm max-w-2xl mt-0.5">
          I don't just build dashboards with arbitrary charts. I approach every dataset as a research notebook to uncover profit, retention, and operational efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Story & Background Notebook Card */}
        <div className="lg:col-span-6 space-y-5">
          <div className="notebook-card p-7 sm:p-8 space-y-4">
            <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#473982]" />
              The Journey from Engineering to Analytics
            </h3>
            
            <p className="text-[#31263b] font-plex text-xs sm:text-sm leading-relaxed">
              My engineering education at <strong className="text-[#01011b]">Madhav Institute of Technology & Science (MITS), Gwalior</strong> instilled a disciplined, first-principles problem-solving framework. I quickly realized that the intersection of rigorous quantitative methods and commercial business decisions is where data creates transformative value.
            </p>

            <p className="text-[#31263b] font-plex text-xs sm:text-sm leading-relaxed">
              Whether auditing <strong className="text-[#01011b]">8,000+ manufacturing records</strong> at Ostwal Group of Industries or dissecting <strong className="text-[#01011b]">retail margins across 3,900+ customers</strong>, my focus remains constant: uncover the "why" behind the numbers and deliver actionable solutions.
            </p>

            {/* Target roles badge list */}
            <div className="pt-4 border-t border-[#dbd7da]/70">
              <span className="text-[11px] font-mono-plex text-[#717a94] block mb-2 uppercase tracking-wider">
                Target Roles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Data Analyst',
                  'Business Analyst',
                  'Product Analyst',
                  'Analytics Associate',
                  'Operations Analyst'
                ].map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 text-xs font-plex font-medium rounded-[3px] bg-[#ecedf2] text-[#01011b] border border-[#dbd7da]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="notebook-card p-5 flex items-start gap-3.5">
            <div className="p-2.5 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono-plex text-[#717a94] font-medium uppercase">EDUCATION</div>
              <h4 className="text-sm font-formula font-bold text-[#01011b] mt-0.5">Bachelor of Technology — Electrical Engineering</h4>
              <p className="text-xs text-[#43394c] font-plex mt-0.5">
                Madhav Institute of Technology & Science (MITS), Gwalior
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Pillar Analytical Framework */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-mono-plex uppercase tracking-wider text-[#717a94] mb-1">
            The Analytical Lifecycle Framework
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="notebook-card p-4 sm:p-5 flex items-start gap-3.5"
                >
                  <div 
                    className="w-9 h-9 rounded-[3px] border border-[#dbd7da] flex items-center justify-center shrink-0 bg-[#ecedf2]"
                    style={{ color: pillar.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-formula font-bold text-[#01011b] text-sm">{pillar.title}</h4>
                    <p className="text-xs text-[#43394c] font-plex mt-0.5 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
