import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim() || formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      
      if (response.data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'gauravathode123@gmail.com', href: 'mailto:gauravathode123@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91-9755784190', href: 'tel:+919755784190' },
    { icon: MapPin, label: 'Location', value: 'Bhopal, Madhya Pradesh, India', href: null },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/GauravAthode', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/gaurav-athode-6b435a289', label: 'LinkedIn' },
  ];

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="section-container bg-slate-900/50"
    >
      <Toaster position="top-right" theme="dark" richColors />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm mb-2">08. Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle mx-auto mt-4">
            Have a project in mind or want to discuss opportunities? Let's connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Let's Talk</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <item.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          data-testid={`contact-${item.label.toLowerCase()}-link`}
                          className="text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <p className="text-slate-500 text-sm mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`contact-social-${social.label.toLowerCase()}`}
                      className="p-3 bg-slate-800/50 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="glass-card p-6 border-l-2 border-indigo-500">
              <p className="text-slate-400 text-sm">
                I'm currently looking for new opportunities. Whether you have a question or just want 
                to say hi, I'll do my best to get back to you!
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5" data-testid="contact-form">
              <h3 className="text-xl font-semibold text-white mb-2">Send a Message</h3>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-slate-400 text-sm mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  data-testid="contact-name-input"
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-slate-400 text-sm mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  data-testid="contact-email-input"
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-slate-400 text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  data-testid="contact-subject-input"
                  className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder="Job Opportunity / Project Discussion"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-slate-400 text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  data-testid="contact-message-input"
                  rows={5}
                  className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Hi Gaurav, I'd like to discuss..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="contact-submit-btn"
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
