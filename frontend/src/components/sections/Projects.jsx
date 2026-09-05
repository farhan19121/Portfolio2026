import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Loader2 
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
      {/* Section Header (No Subheading) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight">
            Featured Case Studies
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-transparent p-1 rounded-[3px] border border-[#dbd7da] w-fit">
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
        /* Projects Card Grid (Clean: Image + Category Tag + Title + Hover Blur Action) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const imgSrc = project.cover_image || project.cover_image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="notebook-card overflow-hidden flex flex-col justify-between group cursor-pointer relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#ffffff]"
              >
                {/* Image Container with Category Tag & Hover Overlay */}
                <div className="relative h-60 w-full overflow-hidden bg-[#ecedf2]">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                  />

                  {/* Category Tag (Over the image) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-[3px] text-[11px] font-mono-plex font-semibold bg-[#ffffff]/95 backdrop-blur-md text-[#01011b] border border-[#dbd7da] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Blur Overlay with "View Case Study" action */}
                  <div className="absolute inset-0 bg-[#01011b]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 z-20">
                    <div className="btn-outlined bg-[#ffffff] text-[#01011b] px-4 py-2 text-xs font-semibold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#31263b]" />
                    </div>
                  </div>
                </div>

                {/* Card Title Only */}
                <div className="p-5">
                  <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight group-hover:text-[#473982] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
