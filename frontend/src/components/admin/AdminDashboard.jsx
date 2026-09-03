import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  RefreshCw,
  Eye,
  ShieldCheck,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import ProjectBuilder from './ProjectBuilder';

export default function AdminDashboard({ onBackToPublic }) {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProjects('all');
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects in admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiService.deleteProject(id);
      setActionMessage('Project deleted successfully.');
      setDeleteConfirmId(null);
      loadProjects();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to delete project.');
    }
  };

  const handleStartCreate = () => {
    setEditingProject(null);
    setIsBuilding(true);
  };

  const handleStartEdit = (proj) => {
    setEditingProject(proj);
    setIsBuilding(true);
  };

  const handleBuildSaved = () => {
    setIsBuilding(false);
    setEditingProject(null);
    loadProjects();
    setActionMessage('Project saved successfully!');
    setTimeout(() => setActionMessage(''), 3000);
  };

  if (isBuilding) {
    return (
      <ProjectBuilder
        projectToEdit={editingProject}
        onCancel={() => { setIsBuilding(false); setEditingProject(null); }}
        onSaved={handleBuildSaved}
      />
    );
  }

  const totalBlocks = projects.reduce((sum, p) => sum + (p.blocks?.length || 0), 0);

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#01011b] bg-[#fffcfc]">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dbd7da] pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono-plex text-[#473982] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED AS {user?.username?.toUpperCase() || 'ADMIN'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b] tracking-tight">
            Portfolio Content Workbench
          </h1>
          <p className="text-xs text-[#43394c] font-plex mt-0.5">
            Manage case studies, customize dynamic content blocks, and publish updates to Django REST backend.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToPublic}
            className="btn-outlined py-1.5 px-3 text-xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#473982]" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="btn-outlined py-1.5 px-3.5 text-xs font-semibold bg-[#01011b] text-[#ffffff] hover:bg-[#31263b] hover:text-[#ffffff] border-[#01011b]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-[3px] bg-[#ffffff] hover:bg-red-50 border border-[#dbd7da] hover:border-red-200 text-[#717a94] hover:text-red-600 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#01011b] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#473982] shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="notebook-card p-5 bg-[#ffffff]">
          <div className="flex items-center justify-between text-[#717a94] text-xs font-mono-plex">
            <span>TOTAL PROJECTS</span>
            <Database className="w-4 h-4 text-[#473982]" />
          </div>
          <div className="text-3xl font-formula font-bold text-[#01011b] mt-2">{projects.length}</div>
          <p className="text-[11px] text-[#717a94] font-plex mt-1">Live in Django backend</p>
        </div>

        <div className="notebook-card p-5 bg-[#ffffff]">
          <div className="flex items-center justify-between text-[#717a94] text-xs font-mono-plex">
            <span>DYNAMIC CONTENT BLOCKS</span>
            <Layers className="w-4 h-4 text-[#473982]" />
          </div>
          <div className="text-3xl font-formula font-bold text-[#01011b] mt-2">{totalBlocks}</div>
          <p className="text-[11px] text-[#717a94] font-plex mt-1">Headings, metrics, text & images</p>
        </div>

        <div className="notebook-card p-5 bg-[#ffffff]">
          <div className="flex items-center justify-between text-[#717a94] text-xs font-mono-plex">
            <span>DJANGO API STATUS</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <div className="text-base font-formula font-bold text-[#473982] mt-3">Connected & Active</div>
          <p className="text-[11px] text-[#717a94] font-plex mt-1">REST API + Token Auth</p>
        </div>
      </div>

      {/* Projects Table / List */}
      <div className="notebook-card overflow-hidden bg-[#ffffff]">
        <div className="px-6 py-4 border-b border-[#dbd7da] flex items-center justify-between bg-[#fffcfc]">
          <h2 className="text-xs font-mono-plex font-bold text-[#01011b] tracking-tight flex items-center gap-2 uppercase">
            <BarChart3 className="w-4 h-4 text-[#473982]" />
            <span>Published Case Studies ({projects.length})</span>
          </h2>
          <button
            onClick={loadProjects}
            className="p-1.5 rounded-[3px] text-[#717a94] hover:text-[#01011b] hover:bg-[#ecedf2] transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs font-mono-plex text-[#717a94]">
            Syncing projects with Django...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#717a94] space-y-3 font-plex">
            <p>No projects found in the database.</p>
            <button
              onClick={handleStartCreate}
              className="btn-outlined text-xs font-semibold py-2 px-4"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#ecedf2]">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#fffcfc] transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-formula font-bold text-[#01011b]">{proj.title}</h3>
                    <span className="text-[10px] font-mono-plex px-2 py-0.5 rounded-[3px] bg-[#ecedf2] text-[#473982] border border-[#dbd7da]">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] font-mono-plex px-2 py-0.5 rounded-[3px] bg-[#fffcfc] text-[#01011b] border border-[#31263b]">
                        Featured
                      </span>
                    )}
                  </div>

                  {proj.subtitle && (
                    <p className="text-xs text-[#717a94] font-plex">{proj.subtitle}</p>
                  )}

                  <div className="flex items-center gap-4 text-[11px] text-[#717a94] font-mono-plex pt-1">
                    <span>{proj.blocks?.length || 0} Dynamic Blocks</span>
                    <span>•</span>
                    <span className="truncate max-w-xs">{proj.key_insight || 'No insight highlight'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartEdit(proj)}
                    className="btn-outlined py-1.5 px-3 text-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#473982]" />
                    <span>Edit Blocks</span>
                  </button>

                  {deleteConfirmId === proj.id ? (
                    <div className="flex items-center gap-1 bg-red-50 p-1 rounded-[3px] border border-red-200">
                      <span className="text-[10px] text-red-600 px-1 font-mono-plex">Confirm?</span>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="px-2 py-0.5 rounded-[2px] bg-red-600 text-white text-[10px] font-bold"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-0.5 rounded-[2px] bg-[#ecedf2] text-[#01011b] text-[10px]"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-2 rounded-[3px] text-[#717a94] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
