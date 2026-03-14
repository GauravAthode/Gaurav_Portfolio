import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Target, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    { icon: Target, label: 'Problem Solver', desc: 'DSA & Algorithms' },
    { icon: GraduationCap, label: 'B.Tech CSE', desc: 'LNCT Bhopal' },
    { icon: MapPin, label: 'Based in', desc: 'Bhopal, India' },
  ];

  return (
    <section
      id="about"
      data-testid="about-section"
      className="section-container bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">01. Introduction</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7"
          >
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p className="text-lg">
                I am a <span className="text-white font-medium">MERN Stack Developer</span> with 
                strong problem-solving skills and hands-on experience in building scalable web applications.
              </p>
              
              <p>
                Proficient in <span className="text-indigo-400">Data Structures and Algorithms</span>, 
                I am passionate about developing efficient, user-centric solutions while continuously 
                improving my technical expertise. My journey in software development has been driven 
                by curiosity and a desire to create impactful digital experiences.
              </p>

              <p>
                Currently pursuing my B.Tech in Computer Science and Engineering from LNCT Group of Colleges, 
                Bhopal, I have complemented my academic learning with intensive training in full-stack 
                development and real-world project experience.
              </p>

              <p>
                When I'm not coding, you'll find me solving problems on LeetCode, exploring new technologies, 
                or contributing to open-source projects. I believe in writing clean, maintainable code and 
                following best practices in software development.
              </p>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="glass-card glass-card-hover p-4 text-center"
                >
                  <item.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-white font-semibold">Education</h3>
              </div>

              <div className="space-y-6">
                {/* B.Tech */}
                <div className="relative pl-6 border-l-2 border-indigo-500/30">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-indigo-500" />
                  <p className="text-indigo-400 font-mono text-xs mb-1">2022 - 2026</p>
                  <h4 className="text-white font-medium">B.Tech Computer Science</h4>
                  <p className="text-slate-400 text-sm">LNCT Group, Bhopal</p>
                  <p className="text-slate-500 text-sm mt-1">CGPA: 7.28/10</p>
                </div>

                {/* 12th */}
                <div className="relative pl-6 border-l-2 border-purple-500/30">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-purple-500" />
                  <p className="text-purple-400 font-mono text-xs mb-1">2022</p>
                  <h4 className="text-white font-medium">Higher Secondary (12th)</h4>
                  <p className="text-slate-400 text-sm">Jawahar Navodaya Vidyalaya</p>
                  <p className="text-slate-500 text-sm mt-1">Score: 79%</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <h4 className="text-white font-medium mb-4">Certifications</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500" />
                    <div>
                      <p className="text-slate-300 text-sm">DSA using Java</p>
                      <p className="text-slate-500 text-xs">Infosys Springboard • 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500" />
                    <div>
                      <p className="text-slate-300 text-sm">Programming Using Java</p>
                      <p className="text-slate-500 text-xs">Infosys Springboard • 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
