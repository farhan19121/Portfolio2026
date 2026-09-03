import React from 'react';
import { Database, Code2, LayoutDashboard, TrendingUp, Check } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'SQL & Relational Databases',
      icon: Database,
      accent: '#473982',
      description: 'Querying complex relational schemas to extract business metrics and cohorts.',
      skills: [
        'Complex Joins (Inner, Left, Cross)',
        'Common Table Expressions (CTEs)',
        'Window Functions (ROW_NUMBER, RANK, DENSE_RANK)',
        'NTILE Distribution Analysis',
        'Subqueries & Aggregations',
        'Customer Cohort & RFM Modeling',
        'Data Validation & Integrity Checks'
      ]
    },
    {
      title: 'Python & Data Analysis',
      icon: Code2,
      accent: '#21918c',
      description: 'Exploratory data analysis, statistical operations, and automated cleaning pipelines.',
      skills: [
        'Pandas (DataFrames, GroupBy, Merging)',
        'NumPy (Array Operations, Math)',
        'Exploratory Data Analysis (EDA)',
        'Data Cleansing & Handling Nulls',
        'Data Transformation & Reshaping',
        'Matplotlib & Seaborn Visuals'
      ]
    },
    {
      title: 'Business Intelligence & Dashboards',
      icon: LayoutDashboard,
      accent: '#544692',
      description: 'Translating raw calculations into intuitive executive reporting tools.',
      skills: [
        'Power BI (Data Modeling, Dashboards)',
        'Basic DAX Measures & Calculations',
        'KPI Card & Funnel Architecture',
        'Advanced Microsoft Excel (Pivot Tables, Lookups)',
        'Google Analytics (User Flows & Drops)',
        'Interactive Drill-Throughs'
      ]
    },
    {
      title: 'Business & Commercial Analytics',
      icon: TrendingUp,
      accent: '#6f63b7',
      description: 'Applying commercial domain acumen to solve margin and growth questions.',
      skills: [
        'Customer Segmentation (Loyal vs Casual)',
        'Unit Economics & Margin Gap Discovery',
        'Product & Category Performance',
        'Discount Sensitivity & Elasticity',
        'Cross-Selling & Basket Bundling',
        'Churn & Retention Strategy'
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-14">
        <div className="pill-eyebrow">
          <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
          <span>04 / TECHNICAL & ANALYTICAL TOOLKIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight mt-1">
          Grouped Core Competencies
        </h2>
        <p className="text-[#43394c] font-plex text-sm max-w-2xl mt-0.5">
          Structured by analytical workbench function rather than arbitrary percentage bars.
        </p>
      </div>

      {/* Skills Grid (Hex Notebook Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="notebook-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="p-2.5 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da]"
                    style={{ color: cat.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#717a94] font-plex">{cat.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] hover:border-[#473982] transition-colors"
                    >
                      <Check className="w-3 h-3 text-[#473982]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dbd7da]/60 flex items-center justify-between text-[11px] font-mono-plex text-[#717a94]">
                <span>VERIFIED TOOLSET</span>
                <span className="text-[#01011b] font-medium">{cat.skills.length} Capabilities</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
