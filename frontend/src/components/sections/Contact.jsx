import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { apiService } from '../../services/api';

export default function Contact({ onOpenResume }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiService.sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Could not deliver message right now. Please reach out directly via email or LinkedIn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#ecedf2]">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-14">
        <div className="pill-eyebrow">
          <span className="w-1.5 h-1.5 rounded-full bg-[#473982]"></span>
          <span>05 / GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight mt-1">
          Let's Discuss Analytics & Opportunities
        </h2>
        <p className="text-[#43394c] font-plex text-sm max-w-2xl mt-0.5">
          Open to full-time roles, internships, and data consulting projects. Send a note below or connect directly on professional channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info & Socials */}
        <div className="lg:col-span-5 space-y-5">
          <div className="notebook-card p-7 sm:p-8 space-y-6">
            <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight">
              Direct Contact & Channels
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-[#31263b] font-plex">
                <div className="p-2 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-plex text-[#717a94] block uppercase">Location</span>
                  <span className="font-medium text-[#01011b]">Gwalior, Madhya Pradesh, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#31263b] font-plex">
                <div className="p-2 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-plex text-[#717a94] block uppercase">Availability</span>
                  <span className="font-medium text-[#01011b]">Immediate for Full-Time & Internship Roles</span>
                </div>
              </div>
            </div>

            {/* Social links (Hex Restraint Buttons) */}
            <div className="pt-4 border-t border-[#dbd7da]/70 space-y-2">
              <span className="text-xs font-mono-plex text-[#717a94] block uppercase tracking-wider">
                Professional Profiles:
              </span>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-[3px] bg-[#fffcfc] hover:bg-[#ecedf2] border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#473982]" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">Connect →</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-[3px] bg-[#fffcfc] hover:bg-[#ecedf2] border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#473982]" />
                  <span>GitHub Repositories</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">View Code →</span>
              </a>

              <button
                onClick={onOpenResume}
                className="w-full flex items-center justify-between p-3 rounded-[3px] bg-[#fffcfc] hover:bg-[#ecedf2] border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#473982]" />
                  <span>Download / View Resume</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">PDF →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Notebook */}
        <div className="lg:col-span-7">
          <div className="notebook-card p-7 sm:p-8">
            <h3 className="text-base font-formula font-bold text-[#01011b] tracking-tight mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#717a94] font-plex mb-5">
              Messages are routed directly to my analytics inbox and logged in the backend.
            </p>

            {submitted ? (
              <div className="p-6 rounded-[6px] bg-[#ecedf2] border border-[#dbd7da] text-center space-y-2.5">
                <CheckCircle2 className="w-8 h-8 text-[#473982] mx-auto" />
                <h4 className="text-sm font-formula font-bold text-[#01011b]">Message Received</h4>
                <p className="text-xs text-[#43394c] font-plex">
                  Thank you for reaching out. I will review your message and respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-mono-plex text-[#473982] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {error && (
                  <div className="p-3 rounded-[3px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-plex font-medium text-[#43394c]">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-plex font-medium text-[#43394c]">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-plex font-medium text-[#43394c]">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Opportunity: Data Analyst Role"
                    className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-plex font-medium text-[#43394c]">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note or project brief here..."
                    className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors resize-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-outlined w-full py-2.5 text-xs font-semibold"
                >
                  {loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#31263b]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
