import React, { useState } from 'react';
import { 
  Compass, 
  Database,
  LineChart,
  Search,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Table,
  FileSpreadsheet,
  BarChart3,
  Code2,
  PieChart
} from 'lucide-react';

export default function About() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Bento Grid Tech Stack Items
  const techStackBento = [
    {
      name: 'Python',
      subtitle: 'Pandas & NumPy',
      category: 'Data Wrangling',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.81v.825H3.9S0 5.78 0 11.908c0 6.134 3.4 5.922 3.4 5.922h2.03v-2.858s-.11-3.4 3.34-3.4h5.75s3.23.05 3.23-3.132V2.656S18.15 0 11.914 0zm-3.23 1.693c.617 0 1.118.5 1.118 1.118 0 .617-.5 1.118-1.118 1.118a1.118 1.118 0 1 1 0-2.236zm3.4 22.307c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.81v-.825h8.116s3.9.453 3.9-5.675c0-6.134-3.4-5.922-3.4-5.922h-2.03v2.858s.11 3.4-3.34 3.4h-5.75s-3.23-.05-3.23 3.132v5.782s-.404 2.656 5.836 2.656zm3.23-1.693a1.118 1.118 0 1 1 0-2.236 1.118 1.118 0 0 1 0 2.236z" fill="#473982"/>
        </svg>
      ),
      accent: '#473982',
      colSpan: 'col-span-1'
    },
    {
      name: 'SQL',
      subtitle: 'CTEs & Window Functions',
      category: 'Querying',
      icon: <Database className="w-5 h-5 text-[#21918c]" />,
      accent: '#21918c',
      colSpan: 'col-span-1'
    },
    {
      name: 'MS Excel',
      subtitle: 'Pivot & Lookups',
      category: 'Modeling',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#107c41]" />,
      accent: '#107c41',
      colSpan: 'col-span-1'
    },
    {
      name: 'Power BI',
      subtitle: 'Interactive Dashboards',
      category: 'BI & KPIs',
      icon: <BarChart3 className="w-5 h-5 text-[#d97706]" />,
      accent: '#d97706',
      colSpan: 'col-span-1'
    },
    {
      name: 'EDA',
      subtitle: 'Exploratory Analysis',
      category: 'Discovery',
      icon: <LineChart className="w-5 h-5 text-[#544692]" />,
      accent: '#544692',
      colSpan: 'col-span-1'
    },
    {
      name: 'Tableau',
      subtitle: 'Visual Analytics',
      category: 'Reporting',
      icon: <PieChart className="w-5 h-5 text-[#cd5973]" />,
      accent: '#cd5973',
      colSpan: 'col-span-1'
    }
  ];

  const lifecycleCards = [
    {
      id: '01',
      title: 'Problem Definition',
      icon: Search,
      accent: '#473982',
      bgAccent: 'rgba(71, 57, 130, 0.08)',
      borderColor: '#473982',
      description: 'Understanding root business drivers, margin leakage, and operational bottlenecks before writing a single line of query.',
      deliverables: ['KPI Mapping', 'Margin Gap Discovery', 'Hypothesis Design']
    },
    {
      id: '02',
      title: 'Relational & Messy Data Handling',
      icon: Database,
      accent: '#21918c',
      bgAccent: 'rgba(33, 145, 140, 0.08)',
      borderColor: '#21918c',
      description: 'Cleaning unstructured inputs, writing SQL CTEs, window functions, and validating records to eliminate bias and inaccuracies.',
      deliverables: ['SQL CTEs & Windowing', 'Data Integrity Audits', 'Schema Normalization']
    },
    {
      id: '03',
      title: 'Exploratory & KPI Modeling',
      icon: LineChart,
      accent: '#544692',
      bgAccent: 'rgba(84, 70, 146, 0.08)',
      borderColor: '#544692',
      description: 'Segmenting customer tiers, calculating unit economics, and discovering purchase affinity patterns.',
      deliverables: ['Cohort RFM Analysis', 'Unit Economics', 'Purchase Affinity Curves']
    },
    {
      id: '04',
      title: 'Actionable Recommendations',
      icon: Lightbulb,
      accent: '#cd5973',
      bgAccent: 'rgba(205, 89, 115, 0.08)',
      borderColor: '#cd5973',
      description: 'Delivering clear, metric-backed strategic steps that leadership, marketing, or operations teams can execute immediately.',
      deliverables: ['Executive Briefs', 'Revenue Recovery Plans', 'Strategic Dashboards']
    }
  ];

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? lifecycleCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === lifecycleCards.length - 1 ? 0 : prev + 1));
  };

  const activeCard = lifecycleCards[activeCardIndex];
  const ActiveIcon = activeCard.icon;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight">
          About &amp; Philosophy
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: 1st Paragraph Story + Tech Stack Bento Grid */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 py-1">
          <div className="space-y-4">
            <h3 className="text-xl font-formula font-bold text-[#01011b] tracking-tight flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#473982]" />
              The Journey from Engineering to Analytics
            </h3>
            
            <p className="text-[#31263b] font-plex text-sm sm:text-base leading-relaxed">
              My engineering education instilled a disciplined, first-principles problem-solving framework. I quickly realized that the intersection of rigorous quantitative methods and commercial business decisions is where data creates transformative value.
            </p>
          </div>

          {/* Bento Grid: Core Analytics Tech Stack */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-plex text-[#717a94] uppercase tracking-wider font-semibold">
                Analytics Tech Stack &amp; Tooling
              </span>
              <span className="text-[10px] font-mono-plex text-[#473982]">Verified Stack</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {techStackBento.map((item, idx) => (
                <div
                  key={idx}
                  className="notebook-card p-3 bg-[#ffffff] hover:bg-[#fffcfc] border border-[#dbd7da] rounded-[4px] flex flex-col justify-between transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-[3px] bg-[#ecedf2] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-mono-plex text-[#717a94] uppercase group-hover:text-[#01011b] transition-colors">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-formula font-bold text-xs sm:text-sm text-[#01011b] leading-none">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#717a94] font-plex mt-1 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Swipeable Cards with Title Only (Details expand on click) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Header with Navigation Controls */}
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-sm font-formula font-bold text-[#01011b] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#473982]" />
                The Analytical Lifecycle Framework
              </h3>
              <p className="text-[11px] font-mono-plex text-[#717a94]">
                Click any card to inspect stage deliverables
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-[3px] border border-[#dbd7da] bg-[#ffffff] hover:bg-[#ecedf2] text-[#01011b] transition-colors"
                title="Previous stage"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-[3px] border border-[#dbd7da] bg-[#ffffff] hover:bg-[#ecedf2] text-[#01011b] transition-colors"
                title="Next stage"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipeable / Clickable Cards Row (Title Only on Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {lifecycleCards.map((card, idx) => {
              const Icon = card.icon;
              const isSelected = activeCardIndex === idx;

              return (
                <button
                  key={card.id}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`p-3.5 rounded-[4px] border text-left transition-all duration-200 flex flex-col justify-between h-28 relative group cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'bg-[#ffffff] shadow-md -translate-y-1'
                      : 'bg-[#ffffff]/70 hover:bg-[#ffffff] hover:-translate-y-0.5'
                  }`}
                  style={{
                    borderColor: isSelected ? card.accent : '#dbd7da',
                    borderWidth: isSelected ? '1.5px' : '1px'
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span 
                      className="text-[10px] font-mono-plex font-bold px-1.5 py-0.5 rounded-[2px]"
                      style={{ backgroundColor: card.bgAccent, color: card.accent }}
                    >
                      {card.id}
                    </span>
                    <Icon className="w-4 h-4" style={{ color: card.accent }} />
                  </div>

                  {/* Title Only on Card */}
                  <div className="mt-auto">
                    <h4 className="font-formula font-bold text-xs sm:text-[13px] text-[#01011b] leading-snug line-clamp-2">
                      {card.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Details Panel (Appears / Updates dynamically on Card Click) */}
          <div 
            className="p-5 sm:p-6 rounded-[6px] border bg-[#ffffff] shadow-sm transition-all duration-300 space-y-4"
            style={{ borderColor: activeCard.accent }}
          >
            <div className="flex items-center justify-between border-b border-[#ecedf2] pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-[3px] flex items-center justify-center"
                  style={{ backgroundColor: activeCard.bgAccent, color: activeCard.accent }}
                >
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-plex font-bold uppercase tracking-wider" style={{ color: activeCard.accent }}>
                    Stage {activeCard.id} Details
                  </span>
                  <h4 className="text-base font-formula font-bold text-[#01011b]">
                    {activeCard.title}
                  </h4>
                </div>
              </div>

              <div className="text-xs font-mono-plex text-[#717a94] hidden sm:block">
                {activeCardIndex + 1} of {lifecycleCards.length}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#31263b] font-plex leading-relaxed">
              {activeCard.description}
            </p>

            {/* Key Deliverables */}
            <div className="pt-2">
              <span className="text-[10px] font-mono-plex text-[#717a94] uppercase tracking-wider block mb-2">
                Stage Deliverables:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCard.deliverables.map((item, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-plex rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#01011b]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#473982]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
