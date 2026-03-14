import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Calendar } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'VoltPath',
    subtitle: 'Smart EV Route Planning Platform',
    description: 'A full-stack EV route planning platform that enables users to plan optimized electric vehicle journeys with charging station discovery, route visualization, and weather insights.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Leaflet', 'REST APIs'],
    features: [
      'Optimized EV route planning',
      'Charging station discovery',
      'Route visualization with maps',
      'Weather insights integration',
      'Google OAuth & JWT authentication',
    ],
    github: 'https://github.com/GauravAthode/VoltPath',
    live: 'https://voltpath.vercel.app/',
    duration: 'Jan 2026 – Present',
    color: 'indigo',
  },
  {
    id: 2,
    title: 'Cravings',
    subtitle: 'Food Ordering Web Application',
    description: 'A full-stack food ordering platform with user authentication, restaurant listings, responsive UI, and scalable REST APIs. Built with future-ready architecture for payment and order tracking.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    features: [
      'User authentication system',
      'Restaurant listings & search',
      'Responsive modern UI',
      'Scalable REST APIs',
      'Order management ready',
    ],
    github: 'https://github.com/GauravAthode/Cravings',
    live: null,
    duration: 'Sep 2025 – Jan 2026',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Car Rental System',
    subtitle: 'Java Console Application',
    description: 'A Java console application for managing car inventory, bookings, and rentals. Features modular OOP design with dynamic rental cost calculation.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    technologies: ['Java', 'OOP', 'Data Structures'],
    features: [
      'Car inventory management',
      'Booking system',
      'Rental tracking',
      'Dynamic cost calculation',
      'Modular OOP design',
    ],
    github: 'https://github.com/GauravAthode/car-rental-system',
    live: null,
    duration: 'Aug 2024 – Sep 2024',
    color: 'cyan',
  },
];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      data-testid="projects-section"
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
          <p className="text-indigo-400 font-mono text-sm mb-2">04. Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto mt-4">
            Some of the projects I've built to solve real-world problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`project-card-${project.id}`}
              className={`grid md:grid-cols-12 gap-6 items-center ${
                index % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar size={14} />
                      {project.duration}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${project.id}`}
                        className="p-2 bg-slate-900/80 backdrop-blur rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`project-live-${project.id}`}
                          className="p-2 bg-slate-900/80 backdrop-blur rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-mono mb-1 ${
                      project.color === 'indigo' ? 'text-indigo-400' : 
                      project.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                    }`}>
                      Featured Project
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                    <p className="text-slate-400">{project.subtitle}</p>
                  </div>

                  <div className="glass-card p-4">
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className={`space-y-1 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                    {project.features.slice(0, 4).map((feature, i) => (
                      <li 
                        key={i} 
                        className={`flex items-center gap-2 text-slate-400 text-sm ${
                          index % 2 === 1 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          project.color === 'indigo' ? 'bg-indigo-500' : 
                          project.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
