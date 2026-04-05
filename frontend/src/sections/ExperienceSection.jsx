import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Web Development Intern',
    company: 'Horizon Flare India',
    type: 'Internship',
    duration: 'Mar 2025 – May 2025',
    location: 'Remote',
    description: [
      'Built responsive and scalable MERN applications',
      'Worked on production-ready solutions with modern best practices',
      'Collaborated in agile development workflows',
      'Implemented REST APIs and database integrations',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    color: 'indigo',
  },
  {
    id: 2,
    role: 'Full Stack Web Development Training',
    company: 'RICR – Raj Institute of Coding & Robotics',
    type: 'Training',
    duration: 'Nov 2024 – Mar 2026',
    location: 'Bhopal, India',
    description: [
      'Intensive MERN stack training program',
      'Built multiple hands-on projects from scratch',
      'Learned REST API design and implementation',
      'Practiced authentication and authorization patterns',
      'Explored database design and optimization',
      'Deployed full-stack applications to production',
    ],
    technologies: ['MERN Stack', 'REST APIs', 'JWT Auth', 'Deployment'],
    color: 'purple',
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="section-container bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">03. Journey</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle mt-4">
            My professional journey and training in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-800" />

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-12 md:pl-20"
                data-testid={`experience-card-${exp.id}`}
              >
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-4 border-slate-950 z-10 ${
                    exp.color === 'indigo' ? 'bg-indigo-500' : 'bg-purple-500'
                  }`}
                />

                {/* Card */}
                <div className="glass-card glass-card-hover p-6 group">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${
                        exp.type === 'Internship' 
                          ? 'bg-indigo-500/20 text-indigo-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-indigo-400 font-medium">{exp.company}</p>
                    </div>
                    <Briefcase className={`w-8 h-8 ${
                      exp.color === 'indigo' ? 'text-indigo-500/30' : 'text-purple-500/30'
                    } group-hover:text-indigo-400/50 transition-colors`} />
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-slate-500 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          exp.color === 'indigo' ? 'bg-indigo-500' : 'bg-purple-500'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
