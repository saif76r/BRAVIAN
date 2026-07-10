/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Mail, Users, Quote, ArrowUpRight } from 'lucide-react';

export default function LeadershipView() {
  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);

  // Core Executive Data - Simple File Names (ফিক্সড: public/ বাদ দিয়ে /team/... করা হয়েছে)
  const founder = {
    id: 'founder',
    name: 'SAT  Sanjid',
    designation: 'Founder & Chairman, BGI Community',
    image: '/team/founder.jpg',
    bio: 'SAT  Sanjid is a veteran technology leader and philanthropist. He founded BGI in 2021 with the vision of bridging the gap between textbook education and practical industrial operations.',
    quote: 'The true strength of a community is measured not by its wealth, but by its capacity to lift members when they fall.',
    facebook: 'https://www.facebook.com/syed.sanjid.37',
    linkedin: 'https://linkedin.com',
    email: 'sanjidsat@gmail.com',
    signature: 'S. Sanjid'
  };

  const coFounder = {
    id: 'co-founder',
    name: 'Dr. Shahriar Khan',
    designation: 'Co-Founder & Advisor',
    image: '/team/co-founder.jpg',
    bio: 'Dr. Shahriar Khan is an academic scholar and researcher. He assists BGI in forming research lab partnerships, supervising IEEE publications, and designing peer-tutoring syllabi.',
    quote: 'Curiosity combined with rigorous, structured inquiry is the ultimate generator of breakthrough human progress.',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    email: 'co.founder@bgi-community.org',
    signature: 'S. Khan'
  };

  const ceo = {
    id: 'ceo',
    name: 'Sumaiya Akter Onima',
    designation: 'Chief Executive Officer',
    image: '/team/ceo.jpg',
    bio: 'Sumaiya Akter Onima oversees day-to-day operations across all 13 BGI departments. She manages financial audits, external press releases, and coordinates with university administrations.',
    quote: 'Leadership is not about a position; it is about taking full accountability for outcomes and inspiring teams to excel.',
    facebook: 'https://www.facebook.com/sumaiya.akter.onima.2024',
    linkedin: 'https://linkedin.com',
    email: 'ceo@bgi-community.org',
    signature: 'S. Onima'
  };

  // New Advisors Data (ফিক্সড: public/ বাদ দেওয়া হয়েছে)
  const advisors = [
    {
      id: 'advisor-1',
      name: 'Dr. Shamsul Arefin',
      designation: 'Chief Advisor, BGI',
      image: '/team/ad1.jpg',
      bio: 'Brief description and professional background of the first advisor goes here.',
      quote: 'Inspiring wisdom and guidance fuels the community towards sustainable development.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'advisor1@bgi-community.org',
      signature: 'Dr. S. Arefin'
    },
    {
      id: 'advisor-2',
      name: 'Nahida Akter Pinky',
      designation: 'Advisor, BGI',
      image: '/team/ad2.jpg',
      bio: 'Brief description and professional background of the second advisor goes here.',
      quote: 'Strategic mentorship bridges the potential of youths with corporate benchmarks.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'advisor2@bgi-community.org',
      signature: 'N. A. Pinky'
    }
  ];

  // 4 General Secretaries / Executive Members (ফিক্সড: public/ বাদ দেওয়া হয়েছে)
  const generalSecretaries = [
    {
      name: 'Afrina Haque',
      role: 'General Secretary',
      email: 'afrinahaqueofficial@gmail.com',
      image: '/team/afrina.jpg'
    },
    {
      name: 'Aannafi Hossain',
      role: 'Additional General Secretary',
      email: 'hossainaannafi2004@gmail.com',
      image: '/team/annafi.jpg'
    },
    {
      name: 'Sunerah Jahan',
      role: 'Assistant General Secretary',
      email: 'vp@bgi-community.org',
      image: '/team/sunerah.jpg'
    },
    {
      name: 'Waheda Rahman',
      role: 'AssistantJoint Secretary',
      email: 'angelwahedarahman89@gmail.com',
      image: '/team/waheda.jpg'
    },
    {
      name: 'Asma Sultana Minan ',
      role: 'Internal Joint Secretary',
      email: 'asma.globalunityfoundation@gmail.com',
      image: '/team/minan.jpg'
    },
    {
      name: 'Abdullah Al Hasib ',
      role: 'Executive Secretary',
      email: 'treasurer@bgi-community.org',
      image: '/team/hasib.jpg'
    }
  ];

  // Department Heads (ফিক্সড: public/ বাদ দেওয়া হয়েছে)
  const departmentHeads = [
    { name: 'Aiman Akil', role: 'Dept Head PR, Marketing & collabration', image: '/team/aiman.jpg' },
    { name: 'Asma Sultana Minan', role: 'HR Dept Head', image: '/team/minan.jpg' },
    { name: 'S.M. Miftahul Islam', role: 'Dept Head IT', image: '/team/mif.jpg' },
    { name: 'Afsana Siddika Mim', role: 'Dept Head Management', image: '/team/mim.jpg' },
    { name: 'Jannatul Maowa', role: 'Dept Head Communication', image: '/team/jannat.jpg' },
    { name: 'Nazia Amrin Taha', role: 'Dept Head Operation ', image: '/team/taha.jpg' },
    { name: 'Saima Islam Eti', role: 'Dept Head Research', image: '/team/rch.jpg' },
    { name: 'Farjana Nayeem', role: 'Dept Head Sports', image: '/team/farjana.jpg' },
    { name: 'Jabed Mia', role: 'Dept Head Emergency', image: '/team/jabed.jpg' },
    { name: 'Jinia Akter', role: 'Dept Head Creative & Design', image: '/team/jinia.jpg' },
  ];

  const LeaderCard = ({ leader }: { leader: any }) => (
    <div className="group relative rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col w-full max-w-sm mx-auto">
      <div className="relative h-64 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <img 
          src={leader.image} 
          alt={leader.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-xs text-emerald-300 italic font-medium leading-relaxed">
            "{leader.quote}"
          </p>
        </div>
      </div>

      <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest uppercase block">{leader.designation}</span>
          <h3 className="font-sans font-black text-base text-zinc-850 dark:text-white">{leader.name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">{leader.bio}</p>
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div className="flex space-x-3">
            <a href={leader.facebook} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-emerald-500 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-emerald-500 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${leader.email}`} className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-emerald-500 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setSelectedLeader(leader)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all flex items-center space-x-1"
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div id="leadership-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Header Block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-12 text-center md:text-left">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Executive Board</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">BGI Leadership Board</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Meet the visionaries, academic advisors, and active executive directors who steer the BGI Community.</p>
      </div>

      {/* Hierarchical Core Leadership Layout */}
      <div className="space-y-12 mb-20">
        {/* Row 1: Founder Centered */}
        <div className="flex justify-center">
          <LeaderCard leader={founder} />
        </div>

        {/* Row 2: Co-Founder (Left) & CEO (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <LeaderCard leader={coFounder} />
          <LeaderCard leader={ceo} />
        </div>

        {/* Row 3: Advisor Team Section (Just Below Co-Founder & CEO) */}
        <div className="space-y-6 max-w-4xl mx-auto pt-6 border-t border-zinc-100/30 dark:border-zinc-900/50">
          <div className="text-center">
            <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest uppercase block mb-1">Advisory Panel</span>
            <h2 className="font-sans font-extrabold text-xl text-zinc-800 dark:text-zinc-200">Advisor Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisors.map((advisor) => (
              <LeaderCard key={advisor.id} leader={advisor} />
            ))}
          </div>
        </div>
      </div>

      {/* Our Team Master Section */}
      <section className="space-y-12 pt-12 border-t border-zinc-100 dark:border-zinc-900">

        {/* Subsection 1: 4 General Secretaries Grid */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <h3 className="font-sans font-bold text-sm text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">General Secretaries</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {generalSecretaries.map((member, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 text-center space-y-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-350"
              >
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-tight truncate" title={member.name}>
                    {member.name}
                  </h4>
                  <p className="text-[9px] font-mono font-medium text-emerald-500">
                    {member.role}
                  </p>
                  <a href={`mailto:${member.email}`} className="text-[8px] text-zinc-400 hover:text-emerald-500 hover:underline block truncate mt-1">{member.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 2: Department Heads Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center space-x-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <h3 className="font-sans font-bold text-sm text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Department Heads</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {departmentHeads.map((member, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 sm:p-4 text-center space-y-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-350"
              >
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-tight truncate" title={member.name}>
                    {member.name}
                  </h4>
                  <p className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Leader Modal Drawer */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-emerald-500 font-bold uppercase">{selectedLeader.id}_profile.db</span>
                <button 
                  onClick={() => setSelectedLeader(null)}
                  className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs rounded-lg"
                >
                  Close
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1 rounded-xl overflow-hidden h-48 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                  <img src={selectedLeader.image} alt={selectedLeader.name} className="w-full h-full object-cover" />
                </div>

                <div className="sm:col-span-2 text-left space-y-4">
                  <div>
                    <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">{selectedLeader.designation}</span>
                    <h3 className="font-sans font-black text-xl text-zinc-900 dark:text-white">{selectedLeader.name}</h3>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{selectedLeader.bio}</p>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 relative space-y-2">
                    <Quote className="w-5 h-5 text-emerald-500/20 absolute top-2 right-4" />
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                      "{selectedLeader.quote}"
                    </p>
                    <span className="text-[9px] font-mono text-zinc-400 block text-right font-bold">— {selectedLeader.signature}</span>
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