/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Play, Compass, Calendar, Trophy, Heart, Users, CheckCircle, 
  ChevronLeft, ChevronRight, Mail, Newspaper, ArrowUpRight, ShieldCheck, Zap, Globe, X
} from 'lucide-react';
import { EVENTS, TESTIMONIALS, PARTNERS } from '../data';

// ছবিগুলোর অরিজিনাল পাথ ইমপোর্ট
import bgiLeadershipBanner from '../assets/images/bgi_leadership_banner_1783616636400.jpg';
import founderImg from '../assets/images/founder.jpg';
import coFounderImg from '../assets/images/cofounder.jpg';
import ceoImg from '../assets/images/ceo.jpg';

// ভিডিও ফাইলগুলোর ইমপোর্ট
import bgiVideo from '../assets/vid/bgi.mp4';
import bgi1 from '../assets/vid/bgi1.mp4';
import bgi2 from '../assets/vid/bgi2.mp4';
import bgi3 from '../assets/vid/bgi3.mp4';

interface HeroProps {
  onNavigate: (view: string, extra?: any) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Statistics counter states
  const [stats, setStats] = useState({
    members: 0,
    departments: 0,
    events: 0,
    volunteers: 0,
    projects: 0
  });

  // Testimonials slider
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Video intro modal (Hero Section Video)
  const [introModalOpen, setIntroModalOpen] = useState(false);

  // Activities Video Modal State (For fullscreen click-to-play)
  const [selectedActivityVideo, setSelectedActivityVideo] = useState<{
    title: string;
    src: string;
  } | null>(null);

  // Animate counts on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const targets = {
      members: 1450,
      departments: 13,
      events: 42,
      volunteers: 280,
      projects: 75
    };

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        members: Math.min(targets.members, Math.round((targets.members / steps) * currentStep)),
        departments: Math.min(targets.departments, Math.round((targets.departments / steps) * currentStep)),
        events: Math.min(targets.events, Math.round((targets.events / steps) * currentStep)),
        volunteers: Math.min(targets.volunteers, Math.round((targets.volunteers / steps) * currentStep)),
        projects: Math.min(targets.projects, Math.round((targets.projects / steps) * currentStep))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div id="landing-hero-container" className="relative overflow-hidden pt-20">
      
      {/* Dynamic Animated Background Glowing Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[10%] w-[450px] h-[450px] bg-sky-500/15 dark:bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-15%] right-[10%] w-[550px] h-[550px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Decorative Visual Elements */}
      <div className="absolute left-4 top-1/3 hidden lg:flex flex-col space-y-20 opacity-25 pointer-events-none">
        <div className="w-12 h-12 rounded-full border border-sky-500/40 border-dashed animate-[spin_10s_linear_infinite]" />
        <div className="w-8 h-[200px] border-l border-dashed border-sky-500/30 ml-6" />
      </div>
      <div className="absolute right-4 top-1/4 hidden lg:flex flex-col space-y-20 opacity-25 pointer-events-none items-end">
        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/30 border-dotted animate-[spin_15s_linear_infinite]" />
        <div className="w-8 h-[150px] border-r border-dashed border-indigo-500/30 mr-8" />
      </div>

      {/* Floating Aesthetic Grid Dots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center flex flex-col items-center justify-center space-y-10"
        >
          
          {/* Headings - Adjusted Weights for Visual Balance */}
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.2] max-w-5xl mx-auto flex flex-col items-center justify-center gap-y-1.5 sm:gap-y-2 px-4"
          >
            {/* Bold, Distinct Sans-Serif for Top Line */}
            <span className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 text-center font-extrabold text-zinc-950 dark:text-white select-none cursor-default tracking-tight">
              <span className="inline-block hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300">
                Embracing
              </span>
              <span className="inline-block hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300">
                Diversity,
              </span>
            </span>
            
            {/* Elegant, Thinner & Sleek Cursive/Italic Line */}
            <span className="relative inline-block animate-[gradient-shift_3s_ease_infinite] bg-[linear-gradient(to_right,#38bdf8,#818cf8,#f472b6,#38bdf8,#818cf8)] bg-[length:200%_auto] bg-clip-text text-transparent font-serif italic font-normal tracking-wide scale-105 drop-shadow-[0_0_10px_rgba(129,140,248,0.15)] hover:scale-[1.08] transition-all duration-300 cursor-default select-none pb-1 shrink-0 text-center">
              Inspiring Unity
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xs sm:text-sm font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-300 uppercase select-none -mt-4 hover:scale-105 transition-transform duration-300 cursor-default"
          >
            WE STAND TOGETHER
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-sm sm:text-base text-zinc-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            At BGI Community, we believe in the power of collaboration and the strength of our collective efforts. Our organization offers a wide array of programs and initiatives aimed at empowering young people, fostering leadership skills, and promoting personal development. We are committed to providing a platform for our members to express themselves, explore their potential, and pursue their aspirations.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-auto w-full sm:w-auto px-4"
          >
            <button
              id="hero-join-btn"
              onClick={() => onNavigate('join')}
              className="group w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] flex items-center justify-center space-x-2"
            >
              <span>Explore Community</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('departments')}
              className="group w-full sm:w-auto px-8 py-4 bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md text-zinc-800 dark:text-white font-bold rounded-xl hover:bg-white/10 hover:border-sky-500/40 dark:hover:border-sky-400/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Compass className="w-4 h-4 text-sky-500 group-hover:rotate-45 transition-transform duration-300" />
              <span>Explore Departments</span>
            </button>

            <button
              id="hero-watch-btn"
              onClick={() => setIntroModalOpen(true)}
              className="group w-full sm:w-auto px-8 py-4 bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md text-zinc-800 dark:text-white font-bold rounded-xl hover:bg-white/10 hover:border-sky-500/40 dark:hover:border-sky-400/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-sky-500 text-sky-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Intro Video</span>
            </button>
          </motion.div>

          {/* Micro Brands Cloud */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="pt-8 border-t border-zinc-100 dark:border-zinc-900 w-full max-w-2xl mx-auto text-center space-y-4"
          >
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Community Backed By</p>
            <div className="flex flex-wrap justify-center items-center gap-3 px-4">
              {PARTNERS.map((p, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-1.5 rounded-full bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-sans font-extrabold text-xs tracking-tight backdrop-blur-sm hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/20 dark:hover:border-sky-400/20 hover:scale-105 transition-all duration-300 cursor-default shadow-sm"
                >
                  {p.name}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Statistical Counters Bar */}
      <section className="relative py-12 border-y border-zinc-200/60 dark:border-white/10 bg-white/20 dark:bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: 'Active Members', value: stats.members, suffix: '+' },
              { label: 'Enterprise Nodes', value: stats.departments, suffix: '' },
              { label: 'Events Hosted', value: stats.events, suffix: '+' },
              { label: 'Registered Volunteers', value: stats.volunteers, suffix: '' },
              { label: 'Completed Projects', value: stats.projects, suffix: '+' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
                  {stat.value}{stat.suffix}
                </span>
                <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Who We Are</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">
                About Us
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              <p>
                BGI Community is a premier, student-run enterprise incubator and relief ecosystem designed to bridge the gap between classroom theory and real-world industrial excellence. Established in 2021, we have grown to coordinate over 1,400 active leaders, advisors, and volunteers working across 13 specialized departments.
              </p>
              <p>
                We foster a diverse and unified network where young minds can develop practical portfolios, organize emergency response live blood donations, publish scientific research, and drive consecutive athletic championships.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-500/20 flex items-center justify-center text-sky-500 shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">13 Specialized Depts</h4>
                  <p className="text-[10px] text-zinc-455 dark:text-zinc-400">Led by active student head clusters.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-500/20 flex items-center justify-center text-sky-500 shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Emergency Relief Node</h4>
                  <p className="text-[10px] text-zinc-455 dark:text-zinc-400">Blood matching under 15 minutes.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('about-know')}
                className="group px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-sky-500/10"
              >
                <span>Read Full Foundation Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative group">
              <div className="absolute -inset-2.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-45 transition duration-1000 group-hover:duration-300"></div>
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-sky-500/20 bg-zinc-950 shadow-2xl">
                <img 
                  src={bgiLeadershipBanner} 
                  alt="BGI Community Core Leadership" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-left space-y-1">
                  <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 text-[8px] font-mono uppercase tracking-widest font-black inline-block">
                    Executive Council Matrix
                  </span>
                  <p className="text-xs sm:text-sm text-sky-200 italic font-medium font-sans">
                    "United in the pursuit of greatness."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Message from our Founder Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none"></div>
        <div className="relative rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:border-sky-500/50 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-sky-500/20 bg-zinc-900 shadow-2xl">
                <img 
                  src={founderImg} 
                  alt="Founder of BGI Community" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="px-2 py-1 rounded bg-sky-500 text-slate-950 text-[9px] font-mono uppercase tracking-widest font-black">
                    Founding Node
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sans text-zinc-900 dark:text-white">Syed Abu Tahrim Sanjid</h3>
              <p className="text-xs text-sky-400 font-semibold tracking-wider uppercase">Founder & Chairman, BGI Community</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left relative">
            <div className="absolute top-[-30px] left-[-20px] font-serif text-8xl text-sky-500/10 pointer-events-none">“</div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Founder's Vision</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">
                Message from our Founder
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal">
              <p>
                From the very beginning, BGI Community was built on a simple yet profound truth: true education lies beyond the pages of a textbook. When we established BGI in 2021, our vision was to bridge the gap between classroom theory and real-world industrial excellence. We wanted to create an ecosystem where young minds can innovate, collaborate, and tackle real-world problems.
              </p>
              <p>
                As we move forward, our focus remains on empowering our members to reach their maximum potential. The true strength of a community is measured not by its wealth, but by its capacity to lift its members when they fall and to guide them towards leadership.
              </p>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                I invite you to join us on this journey of learning, resilience, and meaningful societal impact. Let's push boundaries together and build a legacy we can all be proud of.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-zinc-800 dark:text-white">Syed Abu Tahrim Sanjid</span>
                <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-medium">Founder & Chairman, BGI Community</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Message from our Co-Founder Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-tl from-sky-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none"></div>
        <div className="relative rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:border-sky-500/50 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6 text-left relative">
            <div className="absolute top-[-30px] left-[-20px] font-serif text-8xl text-sky-500/10 pointer-events-none">“</div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Academic & Research Dispatch</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">
                Message from our Co-Founder
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal">
              <p>
                At BGI Community, we believe that curiosity combined with rigorous, structured inquiry is the ultimate generator of breakthrough human progress. By fostering strong academic partnerships, research laboratories, and peer-tutoring networks, we aim to establish a gold standard of intellectual and technical growth.
              </p>
              <p>
                Our role is to nurture the innate talent of the youth and align it with world-class standard research and development protocols. Through publication supervision, hands-on bootcamps, and guidance, we are transforming curious students into structured thinkers who are ready to make a global difference.
              </p>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                Growth is not a passive event—it is an active pursuit. I encourage every member to ask hard questions, collaborate fearlessly, and utilize the vast educational infrastructure BGI offers.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-zinc-800 dark:text-white">Syed Aiman</span>
                <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-medium">Co-Founder, BGI Community</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-sky-500/20 bg-zinc-900 shadow-2xl">
                <img 
                  src={coFounderImg} 
                  alt="Co-Founder of BGI Community" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="px-2 py-1 rounded bg-sky-505 text-slate-950 text-[9px] font-mono uppercase tracking-widest font-black">
                    Advisory Node
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1 lg:text-right">
              <h3 className="text-xl font-bold font-sans text-zinc-900 dark:text-white">Syed Aiman</h3>
              <p className="text-xs text-sky-400 font-semibold tracking-wider uppercase">Co-Founder</p>
            </div>
          </div>

        </div>
      </section>

      {/* Message from our CEO Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none"></div>
        <div className="relative rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:border-sky-500/50 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-sky-500/20 bg-zinc-900 shadow-2xl">
                <img 
                  src={ceoImg} 
                  alt="CEO of BGI Community" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="px-2 py-1 rounded bg-sky-500 text-slate-950 text-[9px] font-mono uppercase tracking-widest font-black">
                    Executive Node
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sans text-zinc-900 dark:text-white">Sumaiya Akter Onima</h3>
              <p className="text-xs text-sky-400 font-semibold tracking-wider uppercase">Chief Executive Officer</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left relative">
            <div className="absolute top-[-30px] left-[-20px] font-serif text-8xl text-sky-500/10 pointer-events-none">“</div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Executive Dispatch</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">
                Message from our CEO
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal">
              <p>
                My vision for BGI Community has been very clear since I started. I wanted to bring together a community of young people to learn, lead and make meaningful change together. All students and all young professionals need to have a forum where they can have their say and where their potential can be developed.
              </p>
              <p>
                That's why BGI Community was created. It is a platform that allows youth to lead, collaborate, learn, do social work, and engage in their community. We feel that growth is achieved when we take responsibility, collaborate as a team and take action on what we know.
              </p>
              <p>
                Our mission is not to organise events and/or run projects. Our goal is to cultivate critical thinkers, ethical servants and inspirational role models. All of our efforts are aimed at increasing the confidence of our members, enhancing their skills and enabling them to make a difference in society.
              </p>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                As the CEO, I am proud of where we have started. BGI Community's success is a testament to all of those who have chosen to lead, volunteer and grow with BGI. We are creating an environment together, where ambition meets purpose, and where today's youth are tomorrow's leaders.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-zinc-800 dark:text-white">Sumaiya Akter Onima</span>
                <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-medium">Chief Executive Officer, BGI Community</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose BGI Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest block">Core Ecosystem Pillars</span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">Why BGI Community Matters</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Discover how BGI operates with professional precision and deep community care.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[
            {
              title: 'Academic Incubation',
              desc: 'Free bootcamps, programming masterclasses, and research advisor boards help you build modern skills.',
              icon: Zap,
              color: 'from-sky-400 to-blue-600',
              iconColor: 'text-sky-500 dark:text-sky-400'
            },
            {
              title: 'On-ground Operations',
              desc: 'A complete physical inventory, event venue coordinates, and dedicated team logs manage massive student crowds.',
              icon: Globe,
              color: 'from-cyan-400 to-sky-500',
              iconColor: 'text-cyan-500 dark:text-cyan-400'
            },
            {
              title: 'Certified Verification',
              desc: 'Gain verified digital certificates, secure peer mentoring credentials, and community badges stored in real-time databases.',
              icon: ShieldCheck,
              color: 'from-blue-500 to-indigo-600',
              iconColor: 'text-blue-500 dark:text-blue-400'
            },
            {
              title: 'Research & Publications',
              desc: 'Get structured assistance on writing journal publications, conference proceedings, and collaborative thesis projects under top advisors.',
              icon: Compass,
              color: 'from-indigo-400 to-purple-600',
              iconColor: 'text-indigo-500 dark:text-indigo-400'
            },
            {
              title: 'Social Service & Disaster Relief',
              desc: 'Participate in critical relief distribution, local fundraising, winter clothes campaigns, and environmental drives.',
              icon: Heart,
              color: 'from-sky-500 to-indigo-500',
              iconColor: 'text-sky-500 dark:text-sky-400'
            },
            {
              title: 'Professional Mentorship',
              desc: 'Unlock exclusive pathways to corporate internships, tech summits, peer networking sessions, and career counseling.',
              icon: Users,
              color: 'from-cyan-500 to-blue-600',
              iconColor: 'text-cyan-500 dark:text-cyan-400'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-md p-6 shadow-md hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.15)] hover:border-sky-500/30 dark:hover:border-sky-400/30 hover:scale-[1.03] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} p-[1px] mb-5`}>
                  <div className="w-full h-full rounded-[9px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${feat.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`} />
                  </div>
                </div>
                <h3 className="font-sans font-bold text-base text-zinc-800 dark:text-white mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-300">{feat.title}</h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="bg-white/5 dark:bg-black/10 backdrop-blur-md py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest block">Active Calendar</span>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">Featured Community Events</h2>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 border border-indigo-500/20 transition-colors flex items-center space-x-2"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.slice(0, 3).map((evt) => (
              <div 
                key={evt.id}
                className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm text-indigo-300 text-[9px] font-mono uppercase tracking-widest">
                    {evt.category}
                  </div>
                </div>
                <div className="p-5 text-left space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-indigo-500 font-mono font-medium">{evt.date} &bull; {evt.time}</span>
                    <h3 className="font-sans font-bold text-sm text-zinc-800 dark:text-white line-clamp-1 group-hover:text-indigo-500 transition-colors">{evt.title}</h3>
                    <p className="text-xs text-zinc-455 dark:text-zinc-400 line-clamp-2 leading-relaxed">{evt.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
                    <span className="text-[10px] text-zinc-455">{evt.seatsRemaining} seats remaining</span>
                    <button
                      onClick={() => onNavigate('events', { eventId: evt.id })}
                      className="text-xs font-semibold text-indigo-500 hover:underline flex items-center space-x-1"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Glimpses of BGI Community
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Captured moments from our recent campaigns, bootcamps, and gatherings.
            </p>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 border border-zinc-200 dark:border-zinc-800/80 hover:border-sky-500/30 dark:hover:border-sky-500/30 bg-white dark:bg-zinc-950 px-4 py-2.5 rounded-xl shadow-sm transition-all shrink-0 self-start sm:self-center"
          >
            <span>View All Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "Tech Carnival 2026",
              category: "Bootcamp",
              img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
            },
            {
              id: 2,
              title: "UI/UX Design Workshop",
              category: "Academic",
              img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
            },
            {
              id: 3,
              title: "Intra-Community Sports",
              category: "Entertainment",
              img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
            }
          ].map((item) => (
            <div 
              key={item.id}
              className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-md bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
              onClick={() => onNavigate('gallery')}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-left">
                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-sky-500/10 text-sky-500 border border-sky-500/20 mb-2">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Activities Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-left mb-10">
          <span className="text-[10px] font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest block mb-1">
            Life inside BGI
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Our Activities
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Click on any video block to watch in full-screen mode with clear sound channels.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, title: "Strategic Planning Session", category: "Core Operations", src: bgi1 },
            { id: 2, title: "Programming Bootcamp Recap", category: "Academic Node", src: bgi2 },
            { id: 3, title: "Emergency Relief Campaign", category: "Social Service", src: bgi3 }
          ].map((video) => (
            <div 
              key={video.id}
              onClick={() => setSelectedActivityVideo({ title: video.title, src: video.src })}
              className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg bg-zinc-950 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-300 cursor-pointer"
            >
              <video 
                src={video.src}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-xl transform scale-70 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              <div className="absolute top-4 left-4 pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-sky-400 text-[9px] font-mono uppercase tracking-widest backdrop-blur-md">
                  {video.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md text-left pointer-events-none group-hover:border-sky-500/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white tracking-tight line-clamp-1">
                    {video.title}
                  </h3>
                  <span className="text-[10px] text-sky-400 font-medium tracking-tight flex items-center space-x-1">
                    <span>Watch Full</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auto Sliding Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center space-y-12">
        <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest block">Voice of the Family</span>
        <h2 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">What Members Say About BGI</h2>

        <div className="relative max-w-3xl mx-auto rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="absolute top-4 right-8 font-serif text-7xl text-indigo-500/10 pointer-events-none">“</div>
          
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 italic leading-relaxed text-left">
            {TESTIMONIALS[activeTestimonial].quote}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center space-x-3 text-left">
              <img 
                src={TESTIMONIALS[activeTestimonial].image} 
                alt={TESTIMONIALS[activeTestimonial].name} 
                className="w-10 h-10 rounded-full object-cover border border-indigo-500"
              />
              <div>
                <span className="block text-xs font-bold text-zinc-800 dark:text-white">{TESTIMONIALS[activeTestimonial].name}</span>
                <span className="text-[10px] text-zinc-455">{TESTIMONIALS[activeTestimonial].role}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={handlePrevTestimonial}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-black/30 text-zinc-600 dark:text-zinc-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextTestimonial}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-black/30 text-zinc-600 dark:text-zinc-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Form Spacer */}
      <motion.section 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 py-16 text-white text-center rounded-3xl max-w-7xl mx-auto my-12 shadow-xl hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transition-shadow duration-500"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-sans font-black text-2xl sm:text-3xl tracking-tight">Stay Locked into the BGI Matrix</h2>
          <p className="text-xs text-indigo-50 max-w-md mx-auto leading-relaxed">
            Get instant dispatch warnings on upcoming recruitment bootcamps, emergency relief campaigns, and sports tournament brackets.
          </p>
        </div>
      </motion.section>

      {/* Hero Section Video Modal Player */}
      <AnimatePresence>
        {introModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
            >
              <div className="p-4 border-b border-zinc-900 flex items-center justify-between text-white">
                <span className="text-xs font-mono tracking-widest text-emerald-400">BGI_COMMUNITY_INTRO.MP4</span>
                <button 
                  onClick={() => setIntroModalOpen(false)}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs transition-colors hover:text-rose-400"
                >
                  Close
                </button>
              </div>
              
              <div className="aspect-video bg-zinc-900 w-full h-full">
                <video 
                  src={bgiVideo} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Activities Video Player Modal */}
      <AnimatePresence>
        {selectedActivityVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_0_50px_rgba(14,165,233,0.25)]"
            >
              <div className="p-4 bg-zinc-900/50 border-b border-zinc-800/80 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-wide text-zinc-200">
                    {selectedActivityVideo.title}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedActivityVideo(null)}
                  className="p-1.5 bg-zinc-800/80 hover:bg-rose-500/20 hover:text-rose-400 rounded-xl transition-all duration-200 group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
              
              <div className="aspect-video bg-black w-full relative flex items-center justify-center">
                <video 
                  src={selectedActivityVideo.src} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}