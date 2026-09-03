import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ResumeModal from './components/layout/ResumeModal';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { ArrowLeft } from 'lucide-react';

function MainApp() {
  const { isAuthenticated, isStaff } = useAuth();
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'admin-login' | 'admin-dashboard'
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleOpenAdmin = () => {
    if (isAuthenticated && isStaff) {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('admin-login');
    }
  };

  // Admin views — no Navbar, dedicated fixed exit button at top right
  if (currentView === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#fffcfc] text-[#01011b] flex flex-col">
        {/* Exit button fixed top-right */}
        <button
          onClick={() => setCurrentView('portfolio')}
          className="fixed top-4 right-4 z-50 btn-outlined text-xs py-1.5 px-3 shadow-sm bg-[#ffffff]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#31263b]" />
          <span>Exit to Portfolio</span>
        </button>
        <div className="flex-1">
          <AdminLogin
            onBack={() => setCurrentView('portfolio')}
            onSuccess={() => setCurrentView('admin-dashboard')}
          />
        </div>
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    );
  }

  if (currentView === 'admin-dashboard') {
    if (!isAuthenticated || !isStaff) {
      return (
        <div className="min-h-screen bg-[#fffcfc] text-[#01011b] flex flex-col">
          <button
            onClick={() => setCurrentView('portfolio')}
            className="fixed top-4 right-4 z-50 btn-outlined text-xs py-1.5 px-3 shadow-sm bg-[#ffffff]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#31263b]" />
            <span>Exit to Portfolio</span>
          </button>
          <div className="flex-1">
            <AdminLogin
              onBack={() => setCurrentView('portfolio')}
              onSuccess={() => setCurrentView('admin-dashboard')}
            />
          </div>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#fffcfc] text-[#01011b] flex flex-col">
        {/* Exit button fixed top-right — always visible in any admin sub-view */}
        <button
          onClick={() => setCurrentView('portfolio')}
          className="fixed top-4 right-4 z-50 btn-outlined text-xs py-1.5 px-3 shadow-sm bg-[#ffffff]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#31263b]" />
          <span>Exit to Portfolio</span>
        </button>
        <main className="flex-1 pt-6 pb-12">
          <AdminDashboard onBackToPublic={() => setCurrentView('portfolio')} />
        </main>
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    );
  }

  // Main portfolio view — Navbar + Sections + Footer
  // Case Studies is placed immediately after Hero section
  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#01011b] flex flex-col justify-between selection:bg-[#473982]/15 selection:text-[#01011b]">
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      <main className="flex-1">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>

      <Footer />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
