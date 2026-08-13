/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Target, Award, Heart, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import bgiLeadershipBanner from '../assets/images/bgi_leadership_banner_1783616636400.jpg';

interface AboutViewProps {
  initialSubView?: string;
  onNavigate: (view: string) => void;
}

export default function AboutView({ initialSubView = 'know', onNavigate }: AboutViewProps) {
  const [subView, setSubView] = useState(initialSubView);

  const sidebarItems = [
    { id: 'know', label: '📖 Know About BGI', icon: Sparkles },
    { id: 'history', label: '📜 Community History', icon: Calendar },
    { id: 'mission', label: '🎯 Mission & Vision', icon: Target },
    { id: 'achievements', label: '🏆 Achievements', icon: Award }
  ];

  const timelineEvents = [
    { year: '2021', title: 'The Foundation', desc: 'BGI Community was founded by 5 visionary students with the sole goal of creating a unified resource-sharing circle.' },
    { year: '2022', title: 'Ecosystem Expansion', desc: 'IT and Marketing departments were formally established, growing active members to over 300.' },
    { year: '2023', title: 'Emergency Response Node', desc: 'Launched the Emergency live blood donor system, facilitating over 400 blood bags in the first year of crisis.' },
    { year: '2024', title: 'Academic Accreditation', desc: 'BGI partners with 3 major technology laboratories, securing internship pipelines for 50+ seniors.' },
    { year: '2025', title: 'National Recognition', desc: 'Awarded the Youth Leadership Excellence Award for community-led volunteerism and crisis response actions.' },
    { year: '2026', title: 'Enterprise Modernization', desc: 'Launches the secure BGI Console v5 to track real-time certificates, registrations, and logs for 1,400+ active members.' }
  ];

  return (
    <div id="about-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Nexus Hub</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">BGI Community Foundation</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Discover our history, strategic mission values, and milestones of excellence.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        
        {/* Sub-view sidebar selection */}
        <div className="space-y-2 lg:col-span-1 bg-zinc-50/50 dark:bg-zinc-950/30 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-850">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-3 mb-2 block">Chapters</span>
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSubView(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                  subView === item.id 
                    ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 font-bold border-l-2 border-emerald-500 shadow-sm' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Core Sub-view detail display */}
        <div className="lg:col-span-3 min-h-[60vh]">
          <AnimatePresence mode="wait">
            {subView === 'know' && (
              <motion.div
                key="know"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8"
              >
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 space-y-6">
                  <h2 className="font-sans font-extrabold text-2xl text-zinc-900 dark:text-white">📖 About BGI Community</h2>
                  
                  {/* Premium BGI Leadership Banner */}
                  <div className="relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl my-6 bg-zinc-900">
                    <img 
                      src={bgiLeadershipBanner} 
                      alt="BGI Community Leadership" 
                      className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                      <span className="px-3 py-1 rounded-full bg-sky-500 text-slate-950 text-[10px] font-mono uppercase tracking-widest font-extrabold shadow-md">
                        Executive Core Matrix
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed">
                    BGI Community is a premier, enterprise-grade, student-run hub designed to serve as the ultimate center for educational incubation, talent acceleration, athletic empowerment, and on-ground relief operations. 
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    We believe that academic excellence alone is insufficient in preparing modern youth for the challenges of tomorrow. Through our 13 specialized departments, we cultivate practical hands-on experience by assigning responsibility to members under structured mentoring guidance.
                  </p>
                </div>

                {/* Core Values grid */}
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white">Our 4 Core Values</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><ShieldCheck className="w-4 h-4" /></div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Absolute Accountability</h4>
                      <p className="text-[11px] text-zinc-400">All member logs, inventory items, and budgets are audited to ensure maximum trust.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><Heart className="w-4 h-4" /></div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Mutual Disaster Relief</h4>
                      <p className="text-[11px] text-zinc-400">We stand ready to deploy relief food packages and match blood donor queries within minutes.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><Sparkles className="w-4 h-4" /></div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Practical Talent Incubation</h4>
                      <p className="text-[11px] text-zinc-400">Our IT, research, and marketing boots-on-the-ground develop industry standard portfolios.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><Target className="w-4 h-4" /></div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Interdisciplinary Harmony</h4>
                      <p className="text-[11px] text-zinc-400">Sports meets science, operations meets creative writing — bringing disparate students together.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {subView === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-sans font-extrabold text-2xl text-zinc-900 dark:text-white">📜 Community History</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Tracing our evolutionary steps from a 5-student network to a 1,400+ robust ecosystem.</p>
                </div>

                {/* Animated Timeline */}
                <div className="relative border-l-2 border-emerald-500/20 pl-6 ml-4 space-y-8 py-2">
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline node circle */}
                      <span className="absolute -left-10 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {evt.year.slice(2)}
                      </span>
                      <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-1.5 hover:border-emerald-500/20 transition-all">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{evt.year} Timeline Node</span>
                        <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{evt.title}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{evt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {subView === 'mission' && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8 text-zinc-600 dark:text-zinc-300"
              >
                <div>
                  <h2 className="font-sans font-extrabold text-2xl text-zinc-900 dark:text-white">🎯 Mission & Vision</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Our guiding star parameters and core objectives.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white">The Mission Statement</h3>
                    <p className="text-xs leading-relaxed">
                      To empower academic students with robust modern industry skills, foster a highly accountable research mindset, coordinate emergency volunteer networks, and create an inclusive home for collaborative talent development.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white">The Grand Vision</h3>
                    <p className="text-xs leading-relaxed">
                      To build an elite, globally connected peer ecosystem recognized as the gold standard of student organization, fostering high-accountability corporate leadership and breakthrough societal relief.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 text-left space-y-4">
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Operational Objectives</h3>
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>Run 12 rigorous skills development bootcamps each academic cycle.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>Expand on-ground blood donor mapping to guarantee matches under 15 minutes.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>Secure 5 corporate sponsorship contracts annually for community infrastructure support.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {subView === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8 text-zinc-600 dark:text-zinc-300"
              >
                <div>
                  <h2 className="font-sans font-extrabold text-2xl text-zinc-900 dark:text-white">🏆 Our Achievements</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Honors won and miles traveled by BGI volunteers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center space-y-2">
                    <span className="text-3xl font-black text-emerald-500">1,200+</span>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Emergency Bags Facilitated</h4>
                    <p className="text-[11px] text-zinc-400">Awarded the Red Crescent Excellence Merit Certificate.</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center space-y-2">
                    <span className="text-3xl font-black text-emerald-500">15+</span>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">IEEE Research Publications</h4>
                    <p className="text-[11px] text-zinc-400">Co-authored by BGI students and research mentors.</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center space-y-2">
                    <span className="text-3xl font-black text-emerald-500">Gold</span>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Inter-Club Champions Cup</h4>
                    <p className="text-[11px] text-zinc-400">Won consecutive soccer and athletic cups in 2025.</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-500/20 text-left flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 text-emerald-500 shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">National Outstanding Youth Leadership Award 2025</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Recognized by the Ministry of Education for establishing outstanding peer-to-peer tutoring systems and community mutual relief logistics.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
