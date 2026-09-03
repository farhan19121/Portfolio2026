import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Lightbulb, 
  Loader2,
  FileCode2
} from 'lucide-react';
import { apiService } from '../../services/api';
import CaseStudyModal from './CaseStudyModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    'All',
    'Retail & E-Commerce',
    'Operations & Supply Chain',
    'Product & Web Analytics'
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProjects(selectedCategory === 'All' ? 'all' : selectedCategory);
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="pill-eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
            <span>01 / FEATURED CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight mt-1">
            Analytical Business Case Studies
          </h2>
          <p className="text-[#43394c] font-plex text-sm max-w-2xl mt-0.5">
            Real quantitative investigations framed around root commercial challenges, SQL queries, EDA models, and executive recommendations.
          </p>
        </div>

        {/* Category Filter Tabs (Hex Outlined Control Style) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#ffffff] p-1 rounded-[3px] border border-[#dbd7da] w-fit shadow-[rgba(49,38,59,0.03)_0_1px_3px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-plex rounded-[3px] transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-[#01011b] text-[#ffffff] font-medium shadow-sm'
                  : 'text-[#43394c] hover:text-[#01011b] hover:bg-[#ecedf2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#717a94]">
          <Loader2 className="w-6 h-6 animate-spin text-[#473982]" />
          <span className="text-xs font-mono-plex">Loading verified case studies...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 text-[#717a94] notebook-card p-8">
          <p className="text-sm font-plex">No projects found in this category.</p>
        </div>
      ) : (
        /* Projects Card Grid (Hex Notebook Panels) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const tools = Array.isArray(project.tools)
              ? project.tools
              : typeof project.tools === 'string'
                ? JSON.parse(project.tools || '[]')
                : [];

            return (
              <div
                key={project.id}
                className="notebook-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Cover Image Header */}
                  {(project.cover_image || project.cover_image_url) && (
                    <div className="relative h-44 w-full overflow-hidden bg-[#ecedf2] border-b border-[#dbd7da]">
                      <img
                        src={project.cover_image || project.cover_image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-[3px] text-[10px] font-mono-plex font-medium bg-[#ffffff]/95 backdrop-blur-md text-[#01011b] border border-[#dbd7da] shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-3.5">
                    {!project.cover_image && !project.cover_image_url && (
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-[3px] text-[10px] font-mono-plex font-medium bg-[#ecedf2] text-[#473982] border border-[#dbd7da]">
                          {project.category}
                        </span>
                      </div>
                    )}

                    <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight group-hover:text-[#473982] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {project.subtitle && (
                      <p className="text-xs text-[#717a94] font-plex line-clamp-2">
                        {project.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-[#31263b] font-plex line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Key Insight Highlight Box */}
                    {project.key_insight && (
                      <div className="p-3 rounded-[4px] bg-[#ecedf2]/70 border border-[#dbd7da] text-xs text-[#01011b] flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-[#473982] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 font-plex font-medium leading-relaxed">{project.key_insight}</span>
                      </div>
                    )}

                    {/* Tool Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tools.slice(0, 4).map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] font-mono-plex rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#43394c]"
                        >
                          {tool}
                        </span>
                      ))}
                      {tools.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono-plex rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#717a94]">
                          +{tools.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-5 pt-3 border-t border-[#dbd7da]/60">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="btn-outlined w-full text-xs font-semibold py-2"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#31263b]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Case Study Reader Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
