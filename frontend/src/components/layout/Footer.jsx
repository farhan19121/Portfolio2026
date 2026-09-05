import React, { useState } from 'react';
import { 
  ArrowUp, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Clock,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { apiService } from '../../services/api';

export default function Footer({ onOpenResume }) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-[#dbd7da] bg-[#fffcfc] text-[#01011b] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header (Main Heading replaced with small pointer text, no eyebrow pill) */}
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-3xl sm:text-4xl font-formula font-bold text-[#01011b] tracking-tight">
            Get In Touch
          </h2>
        </div>

        {/* Contact Grid: Direct Info (blended with background) & Emphasized Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels (Blended seamlessly with canvas, no card box) */}
          <div className="lg:col-span-5 space-y-6 py-2">
            <div>
              <h3 className="text-xl font-formula font-bold text-[#01011b] tracking-tight">
                Direct Contact &amp; Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#43394c] font-plex mt-1.5 leading-relaxed">
                Open to full-time roles, internships, and quantitative data consulting projects.
              </p>
            </div>

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
                  <span className="font-medium text-[#01011b]">Immediate for Full-Time &amp; Internship Roles</span>
                </div>
              </div>
            </div>

            {/* Social links (Clean floating links) */}
            <div className="pt-4 border-t border-[#dbd7da]/60 space-y-2">
              <span className="text-xs font-mono-plex text-[#717a94] block uppercase tracking-wider mb-2">
                Professional Profiles:
              </span>

              <a
                href="https://www.linkedin.com/in/farhankhanmits/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-[3px] hover:bg-[#ecedf2]/60 border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#473982]" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">Connect →</span>
              </a>

              <a
                href="https://github.com/farhan19121"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-[3px] hover:bg-[#ecedf2]/60 border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#473982]" />
                  <span>GitHub Repositories</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">View Code →</span>
              </a>

              <button
                onClick={onOpenResume}
                className="w-full flex items-center justify-between p-2.5 rounded-[3px] hover:bg-[#ecedf2]/60 border border-[#dbd7da] text-xs font-plex font-medium text-[#01011b] transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#473982]" />
                  <span>Download / View Resume</span>
                </div>
                <span className="text-[#717a94] group-hover:text-[#01011b] font-mono-plex text-[10px]">PDF →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Emphasized Elevated Contact Form */}
          <div className="lg:col-span-7">
            <div className="notebook-card p-7 sm:p-9 bg-[#ffffff] shadow-lg border border-[#dbd7da] rounded-[6px]">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-[3px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982]">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-formula font-bold text-[#01011b] tracking-tight">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-xs text-[#717a94] font-plex mb-6">
                Your message is routed directly to my analytics inbox and logged in the backend.
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
                        className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors shadow-inner"
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
                        className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors shadow-inner"
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
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors shadow-inner"
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
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors resize-none leading-relaxed shadow-inner"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-outlined w-full py-3 text-xs font-semibold bg-[#01011b] text-white hover:bg-[#31263b] hover:text-white border-[#01011b] shadow-md transition-all duration-200"
                  >
                    {loading ? (
                      <span>Sending message...</span>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar (MITS text removed) */}
        <div className="pt-8 border-t border-[#ecedf2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717a94] font-mono-plex">
          <div className="flex items-center gap-3">
            <span className="font-formula font-bold text-[#01011b] text-sm">FARHAN KHAN</span>
            <span>•</span>
            <span className="font-editorial italic text-sm text-[#43394c]">
              "Turning 'What happened?' into 'What should we do next?'"
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              © {new Date().getFullYear()} Farhan Khan. Built with React, Vite &amp; Tailwind CSS.
            </div>
            <button
              onClick={scrollToTop}
              className="btn-outlined py-1 px-2.5 text-xs"
              title="Scroll to top"
            >
              <ArrowUp className="w-3 h-3 text-[#31263b]" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
