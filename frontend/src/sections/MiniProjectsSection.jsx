import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2, Filter } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Featured project names to exclude (already shown in main projects)
const excludedRepos = ['VoltPath', 'Cravings', 'car-rental-system'];

const MiniProjectsSection = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [languages, setLanguages] = useState(['All']);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/github/repos`);
        const allRepos = response.data.repos || [];
        
        // Filter out featured projects
        const miniProjects = allRepos.filter(
          repo => !excludedRepos.some(name => 
            name.toLowerCase() === repo.name.toLowerCase()
          )
        );
        
        setRepos(miniProjects);
        setFilteredRepos(miniProjects);

        // Extract unique languages
        const langs = ['All', ...new Set(miniProjects.map(r => r.language).filter(Boolean))];
        setLanguages(langs);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedLanguage === 'All') {
      setFilteredRepos(repos);
    } else {
      setFilteredRepos(repos.filter(repo => repo.language === selectedLanguage));
    }
  }, [selectedLanguage, repos]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section
      id="mini-projects"
      data-testid="mini-projects-section"
      className="section-container bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">05. Explore</p>
          <h2 className="section-title">Other Projects</h2>
          <p className="section-subtitle mx-auto mt-4">
            Mini projects and experiments from my GitHub
          </p>
        </motion.div>

        {/* Language Filter */}
        {!loading && !error && languages.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-8 flex-wrap"
          >
            <Filter size={16} className="text-slate-500" />
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                data-testid={`filter-${lang.toLowerCase()}`}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                  selectedLanguage === lang
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-slate-400">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.slice(0, 9).map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                data-testid={`mini-project-${repo.name}`}
                className="glass-card glass-card-hover p-6 flex flex-col h-full group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Code2 className="w-10 h-10 text-indigo-500/50 group-hover:text-indigo-400 transition-colors" />
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Github size={20} />
                  </a>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-slate-400 text-sm flex-grow mb-4 line-clamp-3">
                  {repo.description || 'No description available'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-slate-500 text-sm">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span className="text-xs">{formatDate(repo.updated_at)}</span>
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/50">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* View All on GitHub */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a
              href="https://github.com/GauravAthode?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="view-all-github-btn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 rounded-full hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300"
            >
              <Github size={18} />
              View All Repositories
              <ExternalLink size={14} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MiniProjectsSection;
