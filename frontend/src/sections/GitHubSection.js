import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, Code2, ExternalLink, Award } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const GitHubSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/github/stats`);
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const languageColors = {
    JavaScript: '#f7df1e',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    TypeScript: '#3178c6',
  };

  return (
    <section
      id="github"
      data-testid="github-section"
      className="section-container bg-slate-900/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">06. Development</p>
          <h2 className="section-title">GitHub & Coding Profiles</h2>
          <p className="section-subtitle mx-auto mt-4">
            My contribution stats and coding activity
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Stats Grid */}
        {!loading && stats && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* GitHub Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
              data-testid="github-profile-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={stats.avatar_url}
                  alt="GitHub Avatar"
                  className="w-16 h-16 rounded-full border-2 border-indigo-500/30"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{stats.username}</h3>
                  <p className="text-slate-400 text-sm">{stats.bio || 'Full Stack Developer'}</p>
                  {stats.location && (
                    <p className="text-slate-500 text-xs mt-1">{stats.location}</p>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Code2 className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{stats.public_repos}</p>
                  <p className="text-slate-500 text-xs">Repos</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{stats.total_stars}</p>
                  <p className="text-slate-500 text-xs">Stars</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{stats.followers}</p>
                  <p className="text-slate-500 text-xs">Followers</p>
                </div>
              </div>

              {/* Top Languages */}
              <div>
                <p className="text-slate-400 text-sm mb-3">Top Languages</p>
                <div className="space-y-2">
                  {Object.entries(stats.top_languages).slice(0, 5).map(([lang, count]) => {
                    const total = Object.values(stats.top_languages).reduce((a, b) => a + b, 0);
                    const percentage = Math.round((count / total) * 100);
                    return (
                      <div key={lang} className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[lang] || '#6366f1' }}
                        />
                        <span className="text-slate-300 text-sm flex-grow">{lang}</span>
                        <span className="text-slate-500 text-xs">{percentage}%</span>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: languageColors[lang] || '#6366f1',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View Profile Button */}
              <a
                href={stats.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="github-profile-link"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-300"
              >
                <Github size={18} />
                View GitHub Profile
                <ExternalLink size={14} />
              </a>
            </motion.div>

            {/* Coding Profiles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* LeetCode Card */}
              <div className="glass-card p-6" data-testid="leetcode-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">LeetCode</h4>
                    <p className="text-slate-500 text-sm">Problem Solving</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Practicing Data Structures and Algorithms to enhance problem-solving skills
                </p>
                <a
                  href="https://leetcode.com/u/GauravAthode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="leetcode-link"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-all duration-300"
                >
                  View LeetCode Profile
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* LinkedIn Card */}
              <div className="glass-card p-6" data-testid="linkedin-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">LinkedIn</h4>
                    <p className="text-slate-500 text-sm">Professional Network</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Connect with me for professional opportunities and networking
                </p>
                <a
                  href="https://linkedin.com/in/gaurav-athode-6b435a289"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="linkedin-link"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                >
                  View LinkedIn Profile
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* GitHub Stats Image */}
              <div className="glass-card p-4 overflow-hidden">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=GauravAthode&show_icons=true&theme=transparent&hide_border=true&title_color=818cf8&text_color=94a3b8&icon_color=6366f1`}
                  alt="GitHub Stats"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-4 overflow-x-auto"
        >
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=GauravAthode&theme=transparent&hide_border=true&stroke=334155&ring=6366f1&fire=a855f7&currStreakLabel=f8fafc&sideLabels=94a3b8&dates=64748b`}
            alt="GitHub Streak Stats"
            className="w-full max-w-3xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
