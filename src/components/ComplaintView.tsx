/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, AlertTriangle, CheckCircle2, History, Send, 
  Paperclip, Filter, Search, Shield, ArrowRight, Eye
} from 'lucide-react';
import { Complaint } from '../types';

interface ComplaintViewProps {
  user: any;
  userProfile: any;
  onNavigate: (view: string) => void;
  complaints: Complaint[];
  onSubmitComplaint: (complaintData: any) => Promise<void>;
}

export default function ComplaintView({
  user,
  userProfile,
  onNavigate,
  complaints,
  onSubmitComplaint
}: ComplaintViewProps) {
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Membership' as Complaint['category'],
    priority: 'Medium' as Complaint['priority'],
    description: '',
    attachmentName: ''
  });

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onNavigate('auth-login');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitComplaint({
        name: userProfile?.fullName || 'BGI Member',
        memberId: userProfile?.memberId || 'BGI-GUEST',
        email: userProfile?.email || user.email,
        phone: userProfile?.phone || '',
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        attachmentUrl: formData.attachmentName ? `https://storage.bgi-community.org/attachments/${formData.attachmentName}` : undefined,
        status: 'Pending',
        timestamp: new Date().toISOString()
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          subject: '',
          category: 'Membership',
          priority: 'Medium',
          description: '',
          attachmentName: ''
        });
        setActiveTab('history');
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const priorityColors = {
    Low: 'bg-blue-500/10 text-blue-500',
    Medium: 'bg-amber-500/10 text-amber-500',
    High: 'bg-rose-500/15 text-rose-500 font-bold'
  };

  const statusColors = {
    Pending: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500',
    'In Progress': 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    Resolved: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
  };

  return (
    <div id="complaint-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Virtual Helpdesk</span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">Complaints &amp; Inquiries</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">File standard disputes, track response progress, or ask administrative questions directly.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850 rounded-xl">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'submit' 
                ? 'text-sky-500 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>File Inquiry</span>
          </button>
          <button
            onClick={() => {
              if (!user) {
                onNavigate('auth-login');
                return;
              }
              setActiveTab('history');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'history' 
                ? 'text-sky-500 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Track History</span>
          </button>
        </div>
      </div>

      {!user ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20 max-w-lg mx-auto space-y-4">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mx-auto">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-800 dark:text-white">Authentication Required</h4>
            <p className="text-[10px] text-zinc-400 mt-1">Please sign in to file complaints, log attachments, or track previous tickets.</p>
          </div>
          <button
            onClick={() => onNavigate('auth-login')}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md"
          >
            Log In &bull; Active Node
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'submit' ? (
                
                /* Submitting Card Form */
                <motion.div
                  key="submit-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/40 backdrop-blur-xl shadow-xl space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-sky-500 font-bold uppercase block">Secure Dispatch Desk</span>
                    <h3 className="font-sans font-black text-base text-zinc-850 dark:text-white">Submit a Verified Inquiry Pack</h3>
                  </div>

                  {success ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-500 mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Dispute Received!</h4>
                      <p className="text-[10px] text-zinc-400 max-w-xs mx-auto">Your docket is saved into the Firestore database with priority indicators. Our support nodes are tracking it now.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Autofilled Member Badge details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 text-xs">
                        <div>
                          <span className="text-[9px] text-zinc-400 uppercase font-mono tracking-wider block">Member Name</span>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userProfile?.fullName || 'BGI Member'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-400 uppercase font-mono tracking-wider block">Membership ID</span>
                          <span className="font-mono font-bold text-sky-500">{userProfile?.memberId || 'BGI-GUEST'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Category Node</label>
                          <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as Complaint['category'] })}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                          >
                            {['Membership', 'Department', 'Event', 'Facility', 'Technical', 'Other'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Priority Level</label>
                          <select
                            value={formData.priority}
                            onChange={e => setFormData({ ...formData, priority: e.target.value as Complaint['priority'] })}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                          >
                            {['Low', 'Medium', 'High'].map(pr => (
                              <option key={pr} value={pr}>{pr} Priority</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Subject Topic</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                          placeholder="e.g. Inquiry on Event Ticket Registration error"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Detailed Description</label>
                        <textarea
                          value={formData.description}
                          onChange={e => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500 h-28 resize-none"
                          placeholder="Please provide complete context so our support department heads can audit..."
                          required
                        />
                      </div>

                      {/* File Uploader for Attachments */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Log Support Attachment</label>
                        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center cursor-pointer hover:border-sky-500/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-center space-x-2">
                          <Paperclip className="w-4 h-4 text-zinc-400 shrink-0" />
                          <input 
                            type="file" 
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) setFormData({ ...formData, attachmentName: file.name });
                            }}
                            className="hidden" 
                            id="file-attachment" 
                          />
                          <label htmlFor="file-attachment" className="text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer">
                            {formData.attachmentName || "Click to browse or drop log snapshot (max 5MB)"}
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'Dispatching...' : 'Dispatch Ticket'}</span>
                      </button>

                    </form>
                  )}
                </motion.div>
              ) : (
                
                /* Submitting List History Tracking */
                <motion.div
                  key="history-list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-xl border border-zinc-250 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/20 text-xs">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Notice</span>
                    All complaint histories are synchronized in real-time with the BGI IT Firestore cluster, securing full transparency.
                  </div>

                  {complaints.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs flex flex-col items-center justify-center space-y-2">
                      <ClipboardList className="w-6 h-6 text-zinc-400" />
                      <span>You have not filed any complaints/inquiries yet.</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {complaints.map((comp) => (
                        <div 
                          key={comp.id}
                          className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950 hover:border-sky-500/20 transition-all text-left space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] text-zinc-400 block font-mono">{new Date(comp.timestamp).toLocaleDateString()} &bull; {comp.category}</span>
                              <h4 className="text-xs font-bold text-zinc-800 dark:text-white mt-0.5">{comp.subject}</h4>
                            </div>
                            <div className="flex space-x-1.5 items-center">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono ${priorityColors[comp.priority]}`}>{comp.priority}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-semibold ${statusColors[comp.status]}`}>{comp.status}</span>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{comp.description}</p>
                          
                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between">
                            <span className="text-[9px] text-zinc-400 font-mono">DOCKET_ID: {comp.id.slice(0, 8).toUpperCase()}</span>
                            <button
                              onClick={() => setSelectedComplaint(comp)}
                              className="text-[10px] text-sky-500 font-bold hover:underline flex items-center space-x-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Track Ticket</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column: administrative context card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 p-5 space-y-5 text-left">
              <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/20 flex items-center justify-center text-sky-500">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-zinc-850 dark:text-white">Audit Policy parameters</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Our operations guidelines enforce complete accountability:
              </p>
              <ul className="space-y-2 text-[10px] text-zinc-400 pl-1">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0"></span>
                  <span><strong>Low priority</strong> inquiries are verified within 24 working hours.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0"></span>
                  <span><strong>High priority</strong> dockets trigger a direct email notification to the Department Head.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* Detailed Ticket Tracker Modal Dialog */}
      <AnimatePresence>
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-left"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[9px] font-mono text-sky-500 font-bold uppercase">Ticket Audit Logs</span>
                <button 
                  onClick={() => setSelectedComplaint(null)}
                  className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs rounded-lg"
                >
                  Close
                </button>
              </div>

              <div className="p-6 space-y-6 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-zinc-400 block font-mono">{selectedComplaint.category} Node</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono ${statusColors[selectedComplaint.status]}`}>{selectedComplaint.status}</span>
                  </div>
                  <h3 className="font-sans font-black text-sm text-zinc-900 dark:text-white leading-snug">{selectedComplaint.subject}</h3>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 text-xs leading-relaxed space-y-2">
                  <span className="text-[8px] font-mono text-zinc-400 block uppercase">Inquiry Packet description</span>
                  <p className="text-zinc-700 dark:text-zinc-300">{selectedComplaint.description}</p>
                </div>

                {/* Audit trail visualization */}
                <div className="space-y-4">
                  <span className="text-[8px] font-mono text-zinc-400 block uppercase">Audit Trail Milestone Tracking</span>
                  
                  <div className="space-y-4 pl-4 border-l border-zinc-200 dark:border-zinc-800 relative">
                    {/* Node 1 */}
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                      <div>
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-[11px]">Ticket Created &amp; Synced</h4>
                        <p className="text-[10px] text-zinc-400">Successfully locked into Firestore instance. Timestamp: {new Date(selectedComplaint.timestamp).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Node 2 */}
                    <div className="relative">
                      <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${selectedComplaint.status !== 'Pending' ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}></span>
                      <div>
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-[11px]">Assigned to Department Head</h4>
                        <p className="text-[10px] text-zinc-400">Queue updated to active moderator track.</p>
                      </div>
                    </div>

                    {/* Node 3 */}
                    <div className="relative">
                      <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${selectedComplaint.status === 'Resolved' ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}></span>
                      <div>
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-[11px]">Resolution Issued</h4>
                        <p className="text-[10px] text-zinc-400">Resolved state locked. Verified report sent back to Member.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
