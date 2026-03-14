import React from 'react';
import { motion } from 'framer-motion';

// Skill Icons - Using simple SVG paths or font icons
const skillCategories = [
  {
    title: 'Frontend',
    color: 'indigo',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 80 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    color: 'purple',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Authentication', level: 80 },
    ],
  },
  {
    title: 'Database',
    color: 'cyan',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'SQL', level: 75 },
      { name: 'Mongoose', level: 80 },
    ],
  },
  {
    title: 'Languages',
    color: 'green',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'DSA', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: 'orange',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Vercel', level: 85 },
      { name: 'Netlify', level: 80 },
    ],
  },
  {
    title: 'Core Skills',
    color: 'pink',
    skills: [
      { name: 'Problem Solving', level: 85 },
      { name: 'OOP Concepts', level: 90 },
      { name: 'Clean Code', level: 85 },
      { name: 'Debugging', level: 80 },
    ],
  },
];

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    bar: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bar: 'bg-purple-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bar: 'bg-cyan-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    bar: 'bg-green-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    bar: 'bg-orange-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    bar: 'bg-pink-500',
  },
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="section-container bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">02. Expertise</p>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle mx-auto mt-4">
            Technologies and tools I've been working with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`glass-card glass-card-hover p-6 ${colorClasses[category.color].border} border`}
              data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Category Header */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colorClasses[category.color].bg} mb-4`}>
                <div className={`w-2 h-2 rounded-full ${colorClasses[category.color].bar}`} />
                <span className={`text-sm font-medium ${colorClasses[category.color].text}`}>
                  {category.title}
                </span>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-sm">{skill.name}</span>
                      <span className="text-slate-500 text-xs font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${colorClasses[category.color].bar} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">Primary Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'Java', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-slate-300 text-sm font-mono hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
