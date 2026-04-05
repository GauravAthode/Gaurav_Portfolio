import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

// Sections
import HeroSection from './sections/HeroSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import MiniProjectsSection from './sections/MiniProjectsSection.jsx';
import GitHubSection from './sections/GitHubSection.jsx';
import ResumeSection from './sections/ResumeSection.jsx';
import ContactSection from './sections/ContactSection.jsx';

// Loading Screen Component
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold font-outfit text-white mb-4"
      >
        GA<span className="text-indigo-500">.</span>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-1 bg-indigo-500 rounded-full mx-auto"
      />
    </div>
  </motion.div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Secret key combo to open admin (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App bg-slate-950 min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {showAdmin && (
          <AdminDashboard onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <MiniProjectsSection />
              <GitHubSection />
              <ResumeSection />
              <ContactSection />
            </main>

            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
