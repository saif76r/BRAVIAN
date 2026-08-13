/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Heart, Users, Laptop, Trophy, GraduationCap, 
  SearchCode, ShieldAlert, BookOpen, MapPin, Zap
} from 'lucide-react';

export default function ActivitiesView() {
  const activities = [
    {
      id: 'act-1',
      title: 'Community Events',
      desc: 'Grand youth festivals, alumni reunions, and coordinate dinners to build a massive supportive networking grid.',
      icon: Users,
      color: 'from-sky-500 to-blue-400',
      tag: 'Ecosystem'
    },
    {
      id: 'act-2',
      title: 'Volunteer Programs',
      desc: 'Forming structured teams for event coordination, public relations representation, and media documentation.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-400',
      tag: 'Social Good'
    },
    {
      id: 'act-3',
      title: 'Workshops & Camps',
      desc: 'Interactive software dev sprints, mock interview camps, and media masterclasses led by BGI industry alumni.',
      icon: Laptop,
      color: 'from-emerald-500 to-teal-400',
      tag: 'Skills'
    },
    {
      id: 'act-4',
      title: 'Training Sessions',
      desc: 'Certified bootcamps teaching advanced data science, IELTS preparation, digital design, and financial auditing.',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-400',
      tag: 'Education'
    },
    {
      id: 'act-5',
      title: 'Blood Donation Campaigns',
      desc: 'Semi-annual camps in partnership with national red crescent councils. We map the live donor directory in real-time.',
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-400',
      tag: 'Medical Relief'
    },
    {
      id: 'act-6',
      title: 'Educational Seminars',
      desc: 'Hosting prominent international faculty advisors to map postgraduate research pipelines and global admission tracks.',
      icon: BookOpen,
      color: 'from-teal-500 to-emerald-400',
      tag: 'Academic'
    },
    {
      id: 'act-7',
      title: 'Research Activities',
      desc: 'Scientific paper formulation circles, dataset modeling projects, and submitting co-authored papers to Scopus.',
      icon: SearchCode,
      color: 'from-cyan-500 to-blue-400',
      tag: 'Inquiry'
    },
    {
      id: 'act-8',
      title: 'Sports Activities',
      desc: 'Annual football league tournaments, inter-department cricket trophies, and health habit checklist groups.',
      icon: Trophy,
      color: 'from-amber-500 to-orange-400',
      tag: 'Stamina'
    },
    {
      id: 'act-9',
      title: 'Cultural Programs',
      desc: 'Celebrating national milestones with spectacular music concerts, poetry recitation grids, and drama theater productions.',
      icon: Zap,
      color: 'from-fuchsia-500 to-pink-500',
      tag: 'Creative'
    },
    {
      id: 'act-10',
      title: 'Social Awareness Campaigns',
      desc: 'Structuring digital hygiene programs, mental wellness hotlines, and raising funds for regional disaster relief.',
      icon: Heart,
      color: 'from-rose-400 to-rose-300',
      tag: 'Relief Hub'
    }
  ];

  return (
    <div id="activities-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Core Engagements</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">Our Community Activities</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Discover BGI’s active volunteer spectrum spanning athletic trophies, blood donations, and computer labs.</p>
      </div>

      {/* Grid of activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div 
              key={act.id}
              className="group relative rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} p-[1px]`}>
                    <div className="w-full h-full rounded-[9px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-[9px] font-mono font-bold text-zinc-400 border border-zinc-100 dark:border-zinc-850 uppercase tracking-wider">
                    {act.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-base text-zinc-850 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">{act.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{act.desc}</p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">Activity Code: {act.id.toUpperCase()}</span>
                <span className="text-[10px] text-emerald-500 font-bold hover:underline cursor-pointer flex items-center">
                  Learn Details &bull; Active Node
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
