import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Eye } from 'lucide-react';
import ProjectModal from '../components/ProjectModal.jsx';
import voltPath from '../asset/voltPath.png';

const featuredProjects = [
  {
    id: 1,
    title: 'VoltPath',
    subtitle: 'Smart EV Route Planning Platform',
    description: 'A full-stack EV route planning platform that enables users to plan optimized electric vehicle journeys with charging station discovery, route visualization, and weather insights.',
    fullDescription: `VoltPath is a comprehensive full-stack electric vehicle route planning platform designed to make EV travel seamless and worry-free. The application addresses the key challenges EV owners face - range anxiety and finding charging stations along their route.

The platform integrates multiple external APIs to provide real-time data on charging stations, optimal routes considering EV range limitations, and weather conditions that might affect battery performance. Users can plan their journeys with confidence, knowing exactly where they'll need to charge and how long each segment will take.

Built with a modern tech stack, VoltPath demonstrates proficiency in full-stack development, API integration, and user-centric design. The application features responsive design, secure authentication, and an intuitive interface that makes complex route planning simple.`,
    image: voltPath,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Leaflet', 'REST APIs', 'JWT'],
    features: [
      'Optimized EV route planning with range calculation',
      'Real-time charging station discovery and availability',
      'Interactive route visualization with Leaflet maps',
      'Weather insights affecting battery performance',
      'Google OAuth & JWT authentication',
      'Save and manage favorite routes',
      'Responsive design for mobile and desktop',
      'Real-time API integrations',
    ],
    challenges: [
      'Integrated multiple external APIs (routing, weather, charging stations) with proper error handling and rate limiting',
      'Implemented complex route optimization algorithm considering EV range, charging time, and user preferences',
      'Built secure authentication system with both Google OAuth and traditional JWT-based login',
    ],
    github: 'https://github.com/GauravAthode/VoltPath',
    live: 'https://volt-path.vercel.app/',
    duration: 'Jan 2026 – March 2026',
    color: 'indigo',
  },
  {
    id: 2,
    title: 'Cravings',
    subtitle: 'Food Ordering Web Application',
    description: 'A full-stack food ordering platform with user authentication, restaurant listings, responsive UI, and scalable REST APIs. Built with future-ready architecture for payment and order tracking.',
    fullDescription: `Cravings is a modern food ordering web application that connects hungry users with their favorite restaurants. The platform provides a seamless ordering experience from browsing menus to placing orders.

The application features a clean, intuitive interface that makes it easy for users to discover restaurants, browse menus, and customize their orders. The backend is built with scalability in mind, using proper API design patterns and database optimization techniques.

Key technical achievements include implementing a robust authentication system, designing an efficient database schema for restaurants and orders, and creating a responsive UI that works flawlessly on all devices. The architecture is designed to easily integrate payment gateways and real-time order tracking in future iterations.`,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'CSS3', 'REST APIs'],
    features: [
      'Secure user authentication and authorization',
      'Restaurant listings with search and filters',
      'Menu browsing with item customization',
      'Shopping cart functionality',
      'Responsive design for all devices',
      'Scalable REST API architecture',
      'Order history and tracking ready',
      'Future-ready payment integration',
    ],
    challenges: [
      'Designed scalable database schema for restaurants, menus, and orders with efficient queries',
      'Implemented state management for shopping cart with persistence across sessions',
      'Built reusable React components for consistent UI across the application',
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
    fullDescription: `The Car Rental Management System is a comprehensive Java-based console application that demonstrates strong object-oriented programming principles and software design patterns.

The system allows users to manage a fleet of vehicles, handle customer bookings, process rentals and returns, and calculate rental costs dynamically based on various factors like duration, car type, and seasonal rates.

This project showcases proficiency in Java, understanding of OOP concepts like inheritance, polymorphism, and encapsulation, and the ability to design modular, maintainable code. The application uses proper data structures for efficient operations and includes input validation and error handling.`,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    technologies: ['Java', 'OOP', 'Data Structures', 'File I/O', 'Collections Framework'],
    features: [
      'Complete car inventory management',
      'Customer registration and management',
      'Booking and reservation system',
      'Rental and return processing',
      'Dynamic cost calculation with multiple factors',
      'Availability checking and scheduling',
      'Report generation for analytics',
      'Data persistence with file handling',
    ],
    challenges: [
      'Implemented complex pricing algorithm considering duration, car category, seasonal rates, and discounts',
      'Designed modular class structure following SOLID principles for maintainability',
      'Built efficient search and filter functionality using Java Collections',
    ],
    github: 'https://github.com/GauravAthode/car-rental-system',
    live: null,
    duration: 'Aug 2024 – Sep 2024',
    color: 'cyan',
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
                <div 
                  className="relative group overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 bg-indigo-500 text-white rounded-full flex items-center gap-2 font-medium">
                      <Eye size={18} />
                      View Details
                    </span>
                  </div>
                  
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
                        onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
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
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    data-testid={`project-details-btn-${project.id}`}
                    className={`mt-2 text-sm font-medium flex items-center gap-2 ${
                      project.color === 'indigo' ? 'text-indigo-400 hover:text-indigo-300' : 
                      project.color === 'purple' ? 'text-purple-400 hover:text-purple-300' : 
                      'text-cyan-400 hover:text-cyan-300'
                    } transition-colors ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
                  >
                    <Eye size={16} />
                    View Full Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
