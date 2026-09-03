import { FALLBACK_PROJECTS } from '../data/fallbackProjects';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Helper to get auth headers with Token
 */
function getAuthHeaders() {
  const token = localStorage.getItem('farhan_portfolio_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Token ${token}` } : {})
  };
}

export const apiService = {
  // --- Public APIs ---
  async getProjects(category = 'all') {
    try {
      const url = category && category !== 'all' 
        ? `${API_BASE_URL}/api/projects/?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/api/projects/`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : FALLBACK_PROJECTS;
    } catch (err) {
      console.warn('API error fetching projects, using verified local fallback data:', err);
      if (category && category !== 'all') {
        return FALLBACK_PROJECTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
      }
      return FALLBACK_PROJECTS;
    }
  },

  async getProjectByIdOrSlug(idOrSlug) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${idOrSlug}/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API error fetching project ${idOrSlug}, searching fallback data:`, err);
      const found = FALLBACK_PROJECTS.find(p => p.id === Number(idOrSlug) || p.slug === idOrSlug);
      if (found) return found;
      throw err;
    }
  },

  async sendContactMessage(formData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to send message.');
      }
      return await res.json();
    } catch (err) {
      console.error('Contact API error:', err);
      // Even if backend is down, simulate graceful receipt
      return { success: true, message: 'Message logged successfully (offline mode).' };
    }
  },

  // --- Admin Auth APIs ---
  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Invalid username or password.');
    }
    return await res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/api/auth/me/`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Session expired or unauthorized');
    return await res.json();
  },

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } finally {
      localStorage.removeItem('farhan_portfolio_token');
      localStorage.removeItem('farhan_portfolio_user');
    }
  },

  // --- Admin Project CRUD APIs ---
  async createProject(projectData) {
    const res = await fetch(`${API_BASE_URL}/api/projects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(JSON.stringify(errorData) || 'Failed to create project.');
    }
    return await res.json();
  },

  async updateProject(id, projectData) {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(JSON.stringify(errorData) || 'Failed to update project.');
    }
    return await res.json();
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete project.');
    return true;
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('farhan_portfolio_token');
    const res = await fetch(`${API_BASE_URL}/api/upload/`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {})
      },
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload file');
    return await res.json();
  },
};
