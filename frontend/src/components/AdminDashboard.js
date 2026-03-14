import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Eye, EyeOff, ArrowLeft, Trash2, RefreshCw, User, MessageSquare } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/messages`);
      setMessages(response.data.messages || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-auto"
      data-testid="admin-dashboard"
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              data-testid="admin-close-btn"
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm">Manage contact messages</p>
            </div>
          </div>
          <button
            onClick={fetchMessages}
            data-testid="admin-refresh-btn"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{messages.length}</p>
                <p className="text-slate-500 text-sm">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {messages.filter(m => m.read).length}
                </p>
                <p className="text-slate-500 text-sm">Read</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <EyeOff className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {messages.filter(m => !m.read).length}
                </p>
                <p className="text-slate-500 text-sm">Unread</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white mb-4">Messages</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 glass-card">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No messages yet</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMessage(msg)}
                  data-testid={`message-card-${index}`}
                  className={`glass-card p-4 cursor-pointer transition-all duration-300 ${
                    selectedMessage === msg
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'hover:bg-white/5'
                  } ${!msg.read ? 'border-l-2 border-l-indigo-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <User size={14} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{msg.name}</p>
                        <p className="text-slate-500 text-xs">{msg.email}</p>
                      </div>
                    </div>
                    {!msg.read && (
                      <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm font-medium truncate">{msg.subject}</p>
                  <p className="text-slate-500 text-xs mt-1 truncate">{msg.message}</p>
                  <p className="text-slate-600 text-xs mt-2 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(msg.created_at)}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Message Details</h2>
            
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
                data-testid="message-detail"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <User size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{selectedMessage.name}</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-indigo-400 text-sm hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Subject</p>
                    <p className="text-white font-medium">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-xs mb-1">Message</p>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-slate-500 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      Received: {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    data-testid="reply-btn"
                    className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Reply to {selectedMessage.name}
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
