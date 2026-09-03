import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Heading, 
  Type, 
  TrendingUp, 
  Layers, 
  Upload, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiService } from '../../services/api';

export default function ProjectBuilder({ projectToEdit, onCancel, onSaved }) {
  const isEditing = !!projectToEdit;

  const [title, setTitle] = useState(projectToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(projectToEdit?.subtitle || '');
  const [category, setCategory] = useState(projectToEdit?.category || 'Retail & E-Commerce');
  const [summary, setSummary] = useState(projectToEdit?.summary || '');
  const [keyInsight, setKeyInsight] = useState(projectToEdit?.key_insight || '');
  const [toolsInput, setToolsInput] = useState(
    Array.isArray(projectToEdit?.tools) 
      ? projectToEdit.tools.join(', ') 
      : (typeof projectToEdit?.tools === 'string' ? JSON.parse(projectToEdit?.tools || '[]').join(', ') : 'SQL, Python, Power BI')
  );
  const [coverImageUrl, setCoverImageUrl] = useState(projectToEdit?.cover_image_url || '');
  const [featured, setFeatured] = useState(projectToEdit ? !!projectToEdit.featured : true);
  
  // Repeatable Dynamic Content Blocks
  const [blocks, setBlocks] = useState(
    projectToEdit?.blocks && projectToEdit.blocks.length > 0
      ? projectToEdit.blocks
      : [
          {
            block_type: 'heading',
            heading: '1. Business Problem & Analytical Objectives',
            content: '',
            image_url: '',
            image_caption: '',
            metric_value: '',
            metric_label: '',
            order: 1
          },
          {
            block_type: 'text',
            heading: '',
            content: 'Describe the core commercial challenge, datasets investigated, and why this problem matters for stakeholders...',
            image_url: '',
            image_caption: '',
            metric_value: '',
            metric_label: '',
            order: 2
          },
          {
            block_type: 'metric',
            heading: '',
            content: 'Key quantitative discovery across behavioral customer segments or operational records.',
            image_url: '',
            image_caption: '',
            metric_value: '$15.36',
            metric_label: 'Per-Transaction Margin Gap Discovered',
            order: 3
          }
        ]
  );

  const [loading, setLoading] = useState(false);
  const [uploadingImageIdx, setUploadingImageIdx] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddBlock = (blockType) => {
    const newBlock = {
      block_type: blockType,
      heading: blockType === 'heading' ? 'New Section Heading' : blockType === 'subheading' ? 'Subheading Title' : '',
      content: '',
      image_url: '',
      image_caption: '',
      metric_value: blockType === 'metric' ? '100%' : '',
      metric_label: blockType === 'metric' ? 'Metric Label' : '',
      order: blocks.length + 1
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], [field]: value };
    setBlocks(updated);
  };

  const handleMoveBlock = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;

    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    updated.forEach((b, i) => { b.order = i + 1; });
    setBlocks(updated);
  };

  const handleDeleteBlock = (index) => {
    const updated = blocks.filter((_, i) => i !== index);
    updated.forEach((b, i) => { b.order = i + 1; });
    setBlocks(updated);
  };

  const handleImageUpload = async (e, blockIdx = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (blockIdx !== null) setUploadingImageIdx(blockIdx);
    try {
      const res = await apiService.uploadFile(file);
      if (blockIdx === null) {
        setCoverImageUrl(res.url);
      } else {
        handleBlockChange(blockIdx, 'image_url', res.url);
      }
    } catch (err) {
      console.warn('Image upload fallback to data URL:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (blockIdx === null) {
          setCoverImageUrl(reader.result);
        } else {
          handleBlockChange(blockIdx, 'image_url', reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      if (blockIdx !== null) setUploadingImageIdx(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Project title is required.');
      return;
    }
    if (!summary.trim()) {
      setError('Project description / business problem is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const tools = toolsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      subtitle,
      category,
      summary,
      key_insight: keyInsight,
      tools,
      cover_image_url: coverImageUrl,
      featured,
      blocks: blocks.map((b, i) => ({
        block_type: b.block_type,
        heading: b.heading || '',
        content: b.content || '',
        image_url: b.image_url || '',
        image_caption: b.image_caption || '',
        metric_value: b.metric_value || '',
        metric_label: b.metric_label || '',
        order: i + 1
      }))
    };

    try {
      let savedResult;
      if (isEditing && projectToEdit.id) {
        savedResult = await apiService.updateProject(projectToEdit.id, payload);
        setSuccess('Project updated successfully in Django backend!');
      } else {
        savedResult = await apiService.createProject(payload);
        setSuccess('New Project & Repeatable Blocks published successfully!');
      }
      setTimeout(() => {
        if (onSaved) onSaved(savedResult);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save project to Django backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#01011b] bg-[#fffcfc]">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dbd7da] pb-6">
        <div>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-mono-plex text-[#717a94] hover:text-[#01011b] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Content Manager</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-formula font-bold text-[#01011b] tracking-tight">
            {isEditing ? `Edit Project: ${projectToEdit.title}` : 'Dynamic Project Builder'}
          </h1>
          <p className="text-xs text-[#43394c] font-plex mt-0.5">
            Build and customize rich case studies with repeatable dynamic section blocks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="btn-outlined py-1.5 px-3.5 text-xs"
          >
            {previewMode ? <EyeOff className="w-4 h-4 text-[#473982]" /> : <Eye className="w-4 h-4 text-[#473982]" />}
            <span>{previewMode ? 'Exit Preview' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-outlined py-1.5 px-4 text-xs font-semibold bg-[#01011b] text-[#ffffff] hover:bg-[#31263b] hover:text-[#ffffff] border-[#01011b]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? 'Saving...' : isEditing ? 'Update Project' : 'Publish Project'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-3.5 rounded-[3px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-plex">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#01011b] text-xs flex items-center gap-2 font-plex">
          <Check className="w-4 h-4 text-[#473982] shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1: Metadata & Core Details */}
        <div className="notebook-card p-6 sm:p-7 space-y-5 bg-[#ffffff]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#dbd7da]">
            <span className="w-5 h-5 rounded-[2px] bg-[#ecedf2] text-[#473982] flex items-center justify-center text-xs font-bold font-mono-plex">
              1
            </span>
            <h2 className="text-sm font-formula font-bold text-[#01011b] tracking-tight">
              Project Title & Core Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Flipkart Sales & Customer Analysis"
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs font-medium"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Customer segmentation and margin gap analysis"
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs"
              >
                <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                <option value="Product & Web Analytics">Product & Web Analytics</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Financial Analytics">Financial Analytics</option>
              </select>
            </div>

            {/* Tools list */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Tools Used (comma separated)
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="e.g. SQL, Python, Pandas, Power BI, Excel, EDA"
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs"
              />
            </div>

            {/* Description / Problem Statement */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Description / Business Problem Statement *
              </label>
              <textarea
                required
                rows="3"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe the business background and analytical problem..."
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Primary Key Insight */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Key Analytical Insight & Impact
              </label>
              <input
                type="text"
                value={keyInsight}
                onChange={(e) => setKeyInsight(e.target.value)}
                placeholder="e.g. Discovered a $15.36 per-transaction margin gap across customer tiers..."
                className="w-full px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs"
              />
            </div>

            {/* Cover image URL & File Upload */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-plex font-medium text-[#43394c]">
                Cover Image (URL or Upload)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs"
                />
                <label className="cursor-pointer btn-outlined py-2 px-3 text-xs shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#473982]" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Repeatable Content Block Builder */}
        <div className="notebook-card p-6 sm:p-7 space-y-5 bg-[#ffffff]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#dbd7da]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-[2px] bg-[#ecedf2] text-[#473982] flex items-center justify-center text-xs font-bold font-mono-plex">
                2
              </span>
              <div>
                <h2 className="text-sm font-formula font-bold text-[#01011b] tracking-tight">
                  Repeatable Dynamic Content Blocks
                </h2>
                <p className="text-xs text-[#717a94] font-plex">
                  Add dynamic headings, text fields, images/charts, or KPI metrics.
                </p>
              </div>
            </div>

            {/* Add Block Action Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono-plex text-[#717a94] mr-1">+ Add:</span>
              <button
                type="button"
                onClick={() => handleAddBlock('heading')}
                className="btn-outlined py-1 px-2 text-xs"
              >
                <Heading className="w-3 h-3 text-[#473982]" />
                <span>Heading</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddBlock('subheading')}
                className="btn-outlined py-1 px-2 text-xs"
              >
                <Type className="w-3 h-3 text-[#473982]" />
                <span>Subheading</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddBlock('text')}
                className="btn-outlined py-1 px-2 text-xs"
              >
                <Layers className="w-3 h-3 text-[#473982]" />
                <span>Text</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddBlock('image')}
                className="btn-outlined py-1 px-2 text-xs"
              >
                <ImageIcon className="w-3 h-3 text-[#473982]" />
                <span>Image</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddBlock('metric')}
                className="btn-outlined py-1 px-2 text-xs"
              >
                <TrendingUp className="w-3 h-3 text-[#473982]" />
                <span>Metric</span>
              </button>
            </div>
          </div>

          {/* Block items list */}
          {blocks.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-[#dbd7da] rounded-[4px] p-5 space-y-1.5 bg-[#fffcfc]">
              <Layers className="w-6 h-6 text-[#89828d] mx-auto" />
              <p className="text-xs text-[#717a94] font-plex">No content blocks added yet. Click one of the buttons above to insert your first block.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="bg-[#fffcfc] border border-[#dbd7da] rounded-[4px] p-4 space-y-2.5 shadow-sm"
                >
                  {/* Block Header & Reorder Bar */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#ecedf2]">
                    <span className="text-[10px] font-mono-plex font-semibold uppercase px-2 py-0.5 rounded-[2px] bg-[#ecedf2] text-[#473982]">
                      #{idx + 1} {block.block_type.toUpperCase()} BLOCK
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 rounded text-[#717a94] hover:text-[#01011b] disabled:opacity-30 hover:bg-[#ecedf2]"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(idx, 1)}
                        disabled={idx === blocks.length - 1}
                        className="p-1 rounded text-[#717a94] hover:text-[#01011b] disabled:opacity-30 hover:bg-[#ecedf2]"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlock(idx)}
                        className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 ml-1"
                        title="Delete Block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Block Inputs */}
                  {block.block_type === 'heading' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono-plex text-[#717a94]">Heading Text</label>
                      <input
                        type="text"
                        value={block.heading}
                        onChange={(e) => handleBlockChange(idx, 'heading', e.target.value)}
                        placeholder="e.g. 2. Dataset Architecture & SQL Transformations"
                        className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#01011b] text-xs font-bold focus:outline-none focus:border-[#473982]"
                      />
                    </div>
                  )}

                  {block.block_type === 'subheading' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono-plex text-[#717a94]">Subheading Text</label>
                      <input
                        type="text"
                        value={block.heading}
                        onChange={(e) => handleBlockChange(idx, 'heading', e.target.value)}
                        placeholder="e.g. High-Value Cohort Recency Analysis"
                        className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#473982] text-xs font-semibold focus:outline-none focus:border-[#473982]"
                      />
                    </div>
                  )}

                  {block.block_type === 'text' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono-plex text-[#717a94]">Text Content / Narrative</label>
                      <textarea
                        rows="4"
                        value={block.content}
                        onChange={(e) => handleBlockChange(idx, 'content', e.target.value)}
                        placeholder="Write analysis paragraphs, SQL logic details, findings..."
                        className="w-full px-3 py-2 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#31263b] text-xs leading-relaxed focus:outline-none focus:border-[#473982] resize-none font-plex"
                      ></textarea>
                    </div>
                  )}

                  {block.block_type === 'image' && (
                    <div className="space-y-2.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono-plex text-[#717a94]">Image / Chart URL or File</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={block.image_url}
                            onChange={(e) => handleBlockChange(idx, 'image_url', e.target.value)}
                            placeholder="https://..."
                            className="flex-1 px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#01011b] text-xs focus:outline-none focus:border-[#473982]"
                          />
                          <label className="cursor-pointer btn-outlined py-1.5 px-3 text-xs shrink-0">
                            <Upload className="w-3.5 h-3.5 text-[#473982]" />
                            <span>{uploadingImageIdx === idx ? 'Uploading...' : 'Upload Image'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, idx)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono-plex text-[#717a94]">Figure Caption</label>
                        <input
                          type="text"
                          value={block.image_caption}
                          onChange={(e) => handleBlockChange(idx, 'image_caption', e.target.value)}
                          placeholder="e.g. Figure 1: RFM Customer Distribution and Repeat Purchase Frequency"
                          className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#717a94] text-xs focus:outline-none focus:border-[#473982] italic font-mono-plex"
                        />
                      </div>

                      {block.image_url && (
                        <div className="mt-1.5 rounded-[4px] overflow-hidden border border-[#dbd7da] max-h-48 bg-[#ecedf2]">
                          <img src={block.image_url} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}

                  {block.block_type === 'metric' && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono-plex text-[#717a94]">Metric Value *</label>
                          <input
                            type="text"
                            value={block.metric_value}
                            onChange={(e) => handleBlockChange(idx, 'metric_value', e.target.value)}
                            placeholder="e.g. $15.36 or 8,000+"
                            className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#01011b] font-formula font-bold text-sm focus:outline-none focus:border-[#473982]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono-plex text-[#717a94]">Metric Label *</label>
                          <input
                            type="text"
                            value={block.metric_label}
                            onChange={(e) => handleBlockChange(idx, 'metric_label', e.target.value)}
                            placeholder="e.g. Margin Gap Identified per Transaction"
                            className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#473982] text-xs font-semibold focus:outline-none focus:border-[#473982]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono-plex text-[#717a94]">Context Note</label>
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => handleBlockChange(idx, 'content', e.target.value)}
                          placeholder="e.g. Calculated across 3,900 customers comparing discount-only vs organic repeat tiers."
                          className="w-full px-3 py-1.5 rounded-[3px] bg-[#ffffff] border border-[#dbd7da] text-[#43394c] text-xs focus:outline-none focus:border-[#473982] font-plex"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STEP 3: Submit Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#dbd7da]">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outlined py-2 px-4 text-xs font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="btn-outlined py-2 px-6 text-xs font-semibold bg-[#01011b] text-[#ffffff] hover:bg-[#31263b] hover:text-[#ffffff] border-[#01011b]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? 'Submitting to Django...' : isEditing ? 'Update & Save Case Study' : 'Submit & Publish Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
