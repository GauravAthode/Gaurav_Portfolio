import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Code2, Layers, CheckCircle2 } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const colorClasses = {
    indigo: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    purple: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    cyan: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm"
            data-testid="project-modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden rounded-2xl"
            data-testid="project-modal"
          >
            <div className="h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
              {/* Header Image */}
              <div className="relative h-48 md:h-64 flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  data-testid="project-modal-close"
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <X size={20} />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <span className={`inline-block px-3 py-1 text-xs font-mono rounded-full mb-2 ${colorClasses[project.color]}`}>
                    Featured Project
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-outfit">
                    {project.title}
                  </h2>
                  <p className="text-slate-400">{project.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={16} className="text-indigo-400" />
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Layers size={16} className="text-purple-400" />
                    {project.technologies.length} Technologies
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 size={16} className="text-green-400" />
                    {project.features.length} Features
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code2 size={18} className="text-indigo-400" />
                    About This Project
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
                      >
                        <CheckCircle2 size={18} className={`flex-shrink-0 mt-0.5 ${
                          project.color === 'indigo' ? 'text-indigo-400' :
                          project.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                        }`} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-mono hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions (if available) */}
                {project.challenges && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Challenges & Solutions</h3>
                    <div className="space-y-3">
                      {project.challenges.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border-l-2 border-indigo-500">
                          <p className="text-slate-300 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex-shrink-0 p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="project-modal-github"
                    className="flex-1 btn-outline flex items-center justify-center gap-2"
                  >
                    <Github size={18} />
                    View Source Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="project-modal-live"
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
