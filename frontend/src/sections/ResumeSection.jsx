import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Eye } from 'lucide-react';

const RESUME_URL = 'https://customer-assets.emergentagent.com/job_gaurav-fullstack-dev/artifacts/xh0pr0l0_GauravNewResume.pdf';

const ResumeSection = () => {
  return (
    <section
      id="resume"
      data-testid="resume-section"
      className="section-container bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">07. Document</p>
          <h2 className="section-title">My Resume</h2>
          <p className="section-subtitle mx-auto mt-4">
            Download my resume to learn more about my qualifications
          </p>
        </motion.div>

        {/* Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
            <FileText className="w-10 h-10 text-indigo-400" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-white mb-2">Gaurav Athode</h3>
          <p className="text-indigo-400 font-medium mb-2">Full Stack Developer Resume</p>
          <p className="text-slate-500 text-sm mb-8">Updated March 2026</p>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Experience', value: '1+ Year' },
              { label: 'Projects', value: '10+' },
              { label: 'Technologies', value: '15+' },
              { label: 'Education', value: 'B.Tech CSE' },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="text-slate-500 text-xs">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="resume-view-btn"
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              View Resume
            </a>
            <a
              href={RESUME_URL}
              download="Gaurav_Athode_Resume.pdf"
              data-testid="resume-download-btn"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          {/* Additional Info */}
          <p className="text-slate-600 text-xs mt-6">
            PDF Format • Available for Immediate Download
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
