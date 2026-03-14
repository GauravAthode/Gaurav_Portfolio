import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/GauravAthode', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/gaurav-athode-6b435a289', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:gauravathode123@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer data-testid="footer" className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-outfit text-white mb-4">
              Gaurav Athode<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack MERN Developer passionate about building scalable web applications
              and solving complex problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4">
              gauravathode123@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Gaurav Athode. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-2">
            Built with <Heart size={14} className="text-red-500" /> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
