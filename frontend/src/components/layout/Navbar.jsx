import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Menu, 
  X, 
  Lock, 
  LayoutDashboard, 
  FileText 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenResume, onOpenAdmin }) {
  const { isAuthenticated, isStaff } = useAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ordered: Home -> Case Studies (directly after Hero) -> About -> Experience -> Skills -> Contact
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#fffcfc]/92 backdrop-blur-md border-b border-[#dbd7da] shadow-[rgba(49,38,59,0.03)_0_2px_8px] py-3' 
          : 'bg-[#fffcfc]/80 backdrop-blur-sm border-b border-[#dbd7da]/60 py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-7 h-7 rounded-[3px] bg-[#ffffff] border border-[#31263b] flex items-center justify-center text-[#01011b] group-hover:border-[#01011b] transition-colors shadow-sm">
            <BarChart3 className="w-3.5 h-3.5 text-[#31263b]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-formula font-bold text-sm tracking-tight text-[#01011b]">
              FARHAN KHAN
            </span>
            <span className="text-[10px] font-mono-plex px-1.5 py-0.5 rounded-[3px] bg-[#ecedf2] text-[#43394c] border border-[#dbd7da]">
              Analytics
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ffffff] px-2 py-1 rounded-[3px] border border-[#dbd7da] shadow-[rgba(49,38,59,0.03)_0_1px_3px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 text-xs font-plex transition-all duration-150 rounded-[3px] ${
                  isActive
                    ? 'bg-[#ecedf2] text-[#01011b] font-semibold'
                    : 'text-[#43394c] hover:text-[#01011b] hover:bg-[#fffcfc]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenResume}
            className="btn-outlined text-xs py-1.5 px-3"
          >
            <FileText className="w-3.5 h-3.5 text-[#43394c]" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="btn-outlined text-xs py-1.5 px-3"
          >
            {isAuthenticated && isStaff ? (
              <>
                <LayoutDashboard className="w-3.5 h-3.5 text-[#473982]" />
                <span>Admin</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#717a94]" />
                <span>Admin</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-[3px] text-[#01011b] bg-[#ffffff] border border-[#dbd7da] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffcfc] border-b border-[#dbd7da] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-md">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-left text-xs font-plex rounded-[3px] transition-colors ${
                    isActive
                      ? 'bg-[#ecedf2] text-[#01011b] font-semibold border border-[#dbd7da]'
                      : 'text-[#43394c] hover:bg-[#ffffff] hover:text-[#01011b]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#dbd7da] flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="btn-outlined w-full py-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#43394c]" />
              <span>View Resume (PDF)</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="btn-outlined w-full py-2"
            >
              {isAuthenticated && isStaff ? <LayoutDashboard className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isAuthenticated && isStaff ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
