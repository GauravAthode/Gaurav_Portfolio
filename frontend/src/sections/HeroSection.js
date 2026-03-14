import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Code2, Download, ArrowRight, Mail } from 'lucide-react';

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/GauravAthode', label: 'github' },
    { icon: Linkedin, href: 'https://linkedin.com/in/gaurav-athode-6b435a289', label: 'linkedin' },
    { icon: Code2, href: 'https://leetcode.com/u/GauravAthode/', label: 'leetcode' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-slate-950 to-purple-500/5" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-0">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 text-center md:text-left"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-indigo-400 font-mono text-sm mb-4"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-outfit text-white mb-4 tracking-tight">
              Gaurav Athode
            </h1>

            {/* Typing Animation */}
            <div className="h-12 md:h-14 mb-6">
              <span className="text-xl md:text-2xl lg:text-3xl text-slate-300">
                I'm a{' '}
                <TypeAnimation
                  sequence={[
                    'MERN Stack Developer',
                    2000,
                    'Full Stack Engineer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Java Developer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-indigo-400 font-semibold"
                />
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Passionate about building scalable web applications with modern technologies.
              Strong problem-solving skills and hands-on experience in the complete MERN stack.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <button
                data-testid="view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://customer-assets.emergentagent.com/job_gaurav-fullstack-dev/artifacts/xh0pr0l0_GauravNewResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="download-resume-btn"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </a>
              <button
                data-testid="contact-me-btn"
                onClick={() => scrollToSection('contact')}
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`hero-social-${social.label.toLowerCase()}`}
                  className="p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 hidden md:block"
          >
            <div className="relative">
              {/* Code Block Visual */}
              <div className="glass-card p-6 font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-slate-400">
                  <code>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-400">developer</span> = {'{'}
                    {'\n'}  <span className="text-slate-500">name:</span>{' '}
                    <span className="text-green-400">"Gaurav Athode"</span>,
                    {'\n'}  <span className="text-slate-500">role:</span>{' '}
                    <span className="text-green-400">"Full Stack Dev"</span>,
                    {'\n'}  <span className="text-slate-500">stack:</span> [
                    {'\n'}    <span className="text-yellow-400">"React"</span>,
                    {'\n'}    <span className="text-yellow-400">"Node.js"</span>,
                    {'\n'}    <span className="text-yellow-400">"MongoDB"</span>
                    {'\n'}  ],
                    {'\n'}  <span className="text-slate-500">passion:</span>{' '}
                    <span className="text-green-400">"Building"</span>
                    {'\n'}{'}'};
                  </code>
                </pre>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
