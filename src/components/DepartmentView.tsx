import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, Users, Laptop, Briefcase, MessageSquare, Palette,
  GitPullRequest, ShieldAlert, ArrowRight, Mail, CheckCircle2, Trophy, Globe, FileText, BookOpen
} from 'lucide-react';

// Simulated data layout matching your setup
const DEPARTMENTS_DATA = [
  {
    id: 'pr',
    name: 'PR Department',
    icon: 'Megaphone',
    banner: '/banners/prb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'The Public Relations Department leads external communication, media relations, brand representation, and community engagement for BGI Community.',
    responsibilities: ['Managing external communications and press releases', 'Maintaining relationships with university authorities', 'Drafting official community invitation letters'],
    projects: [{ name: 'Global Outreach 2026', desc: 'Expanding BGI presence in new international institutions.', status: 'Ongoing' }],
    achievements: ['Successfully completed 50+ institutional collaborations.'],
    head: { name: 'Tasnim Ahmed', role: 'PR Director', email: 'aimanakil08@gmail.com', quote: 'Building relationships is not just about communication; it is about creating trust.', imageKey: 'aiman.jpg' }
  },
  {
    id: 'hr',
    name: 'HR Department',
    icon: 'Users',
    banner: '/banners/hrb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Manages internal human capital, onboarding operations, and member engagement performance across all sectors.',
    responsibilities: ['Conducting interview boards', 'Evaluating member performance reviews quarterly', 'Organizing leadership training sessions'],
    projects: [{ name: 'Onboarding 2026', desc: 'Streamlining recruitment pipeline workflows.', status: 'Completed' }],
    achievements: ['Managed a base of over 500 active contributors smoothly.'],
    head: { name: 'Asma Sultana Minan', role: 'HR Dept Head', email: 'asma.globalunityfoundation@gmail.com', quote: 'Nurturing potential is the best investment for sustainable growth.', imageKey: 'minan.jpg' }
  },
  {
    id: 'it',
    name: 'IT Department',
    icon: 'Laptop',
    banner: '/banners/itb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Builds and maintains the digital infrastructure, web portals, and software solutions for the BGI Ecosystem.',
    responsibilities: ['Developing open-source web application modules', 'Maintaining cloud hosting servers', 'Ensuring systemic data security protocol compliance'],
    projects: [{ name: 'BGI Portal Upgrades', desc: 'Migrating legacy client screens to optimized server setups.', status: 'Ongoing' }],
    achievements: ['Scaled internal app infrastructure to handle real-time student concurrent hits.'],
    head: { name: 'S.M. Miftahul Islam', role: 'IT Dept Head', email: 'miftahul.bgi.community@gmail.com', quote: 'Code is clean when it solves a complex problem with invisible simplicity.', imageKey: 'mif.jpg' }
  },
  {
    id: 'management',
    name: 'Management Department',
    icon: 'Briefcase',
    banner: '/banners/mnb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Oversees operations logistics, timing parameters, resource budgeting, and synchronization for all live execution runs.',
    responsibilities: ['Allocating structural tracking logistics', 'Supervising schedule flow sheets', 'Creating inter-departmental bridge pathways'],
    projects: [{ name: 'Summit Optimization', desc: 'Structuring asset pipelines for central events.', status: 'Completed' }],
    achievements: ['Delivered 12 massive project runs on budget without execution delays.'],
    head: { 
      name: 'Afsana Siddika Mim', 
      role: 'Management Dept Head', 
      email: 'afsanasiddikamim2024@gmail.com', 
      quote: 'Execution is everything; a plan is only as sharp as its weakest operational node.', 
      imageKey: 'mim.jpg' 
    }
  },
  {
    id: 'communication',
    name: 'Communication Department',
    icon: 'MessageSquare',
    banner: '/banners/cb.jpg', // ফিক্সড: src/assets বাদ দিয়ে public রিলেটিভ করা হয়েছে
    description: 'Monitors public channels, handles queries, and distributes critical announcements across all digital touchpoints.',
    responsibilities: ['Handling corporate helpdesk emails', 'Structuring instant feedback protocols', 'Moderating global interactive forums'],
    projects: [{ name: 'Helpdesk Automation', desc: 'Deploying chat routing loops for rapid query settlement.', status: 'Ongoing' }],
    achievements: ['Reduced member query response times below a 15-minute average threshold.'],
    head: { name: 'Jannatul Maowa', role: 'Communication Dept Head', email: 'jannatul.bgi.community@gmail.com', quote: 'Clarity in words prevents chaos in actions.', imageKey: 'jannat.jpg' }
  },
  {
    id: 'creative-design',
    name: 'Creative & Design Department',
    icon: 'Palette',
    banner: '/banners/cdb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Designs UI systems, brand kits, video aesthetics, and promotional typography structures for all public campaigns.',
    responsibilities: ['Crafting visual design assets', 'Formatting brand typography frameworks', 'Directing rich media promotional video assets'],
    projects: [{ name: 'Brand Guide v3', desc: 'Overhauling structural theme patterns for 2026 rollouts.', status: 'Completed' }],
    achievements: ['Delivered over 300 highly curated custom user-interface layouts.'],
    head: { name: 'Jinia Akter', role: 'Media Marketing Dept Head', email: 'jiniaakter893@gmail.com', quote: 'Design is intelligence made visible to the naked eye.', imageKey: 'jinia.jpg' }
  },
  {
    id: 'operation',
    name: 'Operation Department',
    icon: 'GitPullRequest',
    banner: '/banners/opb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Manages on-ground configurations, immediate tactical deployments, and regional campus network activations.',
    responsibilities: ['Supervising on-field event installations', 'Managing vendor communication loops', 'Structuring security layouts for large crowds'],
    projects: [{ name: 'Regional Hub Launch', desc: 'Deploying operations teams to peripheral university structures.', status: 'Ongoing' }],
    achievements: ['Successfully localized ground operations infrastructure across three divisions.'],
    head: { name: 'Nazia Amrin Taha', role: 'Operation Dept Head', email: 'operation.head@bgi-community.org', quote: 'We find ways where others see structural walls.', imageKey: 'taha.jpg' }
  },
  {
    id: 'research',
    name: 'Research Department',
    icon: 'SearchCode',
    banner: '/banners/rcb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Fosters scholastic advancement through IEEE journals, peer-reviewed labs, and structured technical data tracking.',
    responsibilities: ['Reviewing methodology drafts', 'Coordinating peer-to-peer data science labs', 'Structuring journal publication pipelines'],
    projects: [{ name: 'Neural Net Modeling', desc: 'Testing low-resource speech datasets with academic partners.', status: 'Ongoing' }],
    achievements: ['Co-authored 4 IEEE papers accepted in premium regional symposiums.'],
    head: { name: 'Saima Islam Eti', role: 'Research Dept Head', email: 'research.head@bgi-community.org', quote: 'Rigorous exploration transforms random questions into structural human wisdom.', imageKey: 'rch.jpg' }
  },
  {
    id: 'sports',
    name: 'Sports Department',
    icon: 'Trophy',
    banner: '/banners/sb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'Promotes athletic excellence and physical well-being through organized competitions, training programs, and community engagement.',
    responsibilities: ['Organizing inter-university tournaments', 'Coordinating athlete training sessions', 'Managing sports equipment and facilities'],
    projects: [{ name: 'Intra-University Championship', desc: 'Hosting a multi-day event for student athletes across different disciplines.', status: 'Ongoing' }],
    achievements: ['Co-authored 4 IEEE papers accepted in premium regional symposiums.'],
    head: { name: 'Farjana Nayeem', role: 'Sports Dept Head', email: 'sports.head@bgi-community.org', quote: 'Rigorous exploration transforms random questions into structural human wisdom.', imageKey: 'farjana.jpg' }
  },
  {
    id: 'emergency',
    name: 'Emergency Department',
    icon: 'ShieldAlert',
    banner: '/banners/eb.jpg', // ফিক্সড: শুরুতে / যোগ করা হয়েছে
    description: 'A rapid response force managing critical operational crises, immediate medical relief workflows, and community support lines.',
    responsibilities: ['Deploying immediate crisis mitigation protocols', 'Coordinating mutual aid logistics under strict time caps', 'Monitoring community safety signals'],
    projects: [{ name: 'Relief Grid 2026', desc: 'Setting up standby resource lines for immediate distribution.', status: 'Ongoing' }],
    achievements: ['Mobilized full disaster relief supply units within a strict 6-hour response window.'],
    head: { name: 'Jabed Mia', role: 'Emergency Dept Head', email: 'emergency.head@bgi-community.org', quote: 'In moments of absolute crisis, speed saves potential; preparation saves lives.', imageKey: 'jabed.jpg' }
  }
];

interface DepartmentViewProps {
  initialDeptId?: string;
}

export default function DepartmentView({ initialDeptId }: DepartmentViewProps) {
  const [activeDeptId, setActiveDeptId] = useState(initialDeptId || 'pr');

  useEffect(() => {
    if (initialDeptId) {
      setActiveDeptId(initialDeptId);
    }
  }, [initialDeptId]);

  const activeDept = DEPARTMENTS_DATA.find(d => d.id === activeDeptId) || DEPARTMENTS_DATA[0];

  // Lucide icon mapping configuration
  const iconMap: Record<string, any> = {
    Megaphone, Users, Laptop, Briefcase, MessageSquare, Palette, GitPullRequest, ShieldAlert
  };

  const ActiveIcon = iconMap[activeDept.icon] || BookOpen;

  // Resolves images cleanly from the public/team directory based on structural keys
  const getHeadImageUrl = (imageKey: string) => {
    // ফিক্সড: /src/assets/team/ বাদ দিয়ে সরাসরি /team/ করা হয়েছে
    return `/team/${imageKey}`;
  };

  return (
    <div id="departments-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Upper header section */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 text-center md:text-left">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Ecosystem Structures</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">Our Specialized Departments</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Discover BGI’s filtered core nodes executing digital services, tracking logs, and management runs daily.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side Tab Drawer (Filtered Nodes Directory) */}
        <div className="lg:col-span-1 space-y-2 max-h-[75vh] overflow-y-auto pr-2 bg-zinc-50/40 dark:bg-zinc-950/20 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-900">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-3 block mb-3">Nodes Directory</span>
          {DEPARTMENTS_DATA.map(dept => {
            const DeptIcon = iconMap[dept.icon] || BookOpen;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveDeptId(dept.id)}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center space-x-3 transition-all ${
                  activeDeptId === dept.id 
                    ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 font-bold border-l-2 border-emerald-500 shadow-sm' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40'
                }`}
              >
                <DeptIcon className={`w-4 h-4 shrink-0 ${activeDeptId === dept.id ? 'text-emerald-500' : 'text-zinc-400'}`} />
                <span className="truncate">{dept.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Department Profile Detail Pane */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Banner & Brand Card */}
          <div className="relative rounded-2xl overflow-hidden h-60 border border-zinc-200/50 dark:border-zinc-800 shadow-lg">
            <img src={activeDept.banner} alt={activeDept.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
                  <ActiveIcon className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">Active Operations Node</span>
                  <h2 className="font-sans font-black text-xl sm:text-2xl">{activeDept.name}</h2>
                </div>
              </div>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">{activeDept.description}</p>
            </div>
          </div>

          {/* Grid Layout of Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Responsibilities list & project workflows */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Responsibilities Card */}
              <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/50 space-y-4">
                <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Responsibilities</span>
                </h3>
                <ul className="space-y-3">
                  {activeDept.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Card */}
              <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/50 space-y-4">
                <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span>Active & Completed Projects</span>
                </h3>
                <div className="space-y-3">
                  {activeDept.projects.map((proj, index) => (
                    <div key={index} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-850 text-left space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100">{proj.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${proj.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{proj.status}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Card */}
              <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/50 space-y-4">
                <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <span>Node Achievements</span>
                </h3>
                <ul className="space-y-2.5">
                  {activeDept.achievements.map((ach, index) => (
                    <li key={index} className="flex items-start space-x-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Department Head Profile Section */}
            <div className="md:col-span-1">
              
              {/* Leader profile linking image into public/team/ */}
              <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center space-y-4 shadow-sm">
                <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest block">Department Head</span>
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-emerald-500 p-[2px]">
                  <img 
                    src={getHeadImageUrl(activeDept.head.imageKey)} 
                    alt={activeDept.head.name} 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-white">{activeDept.head.name}</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{activeDept.head.role}</p>
                </div>
                {activeDept.head.quote && (
                  <p className="text-[11px] text-zinc-400 italic leading-relaxed pt-2 border-t border-zinc-100 dark:border-zinc-900">
                    "{activeDept.head.quote}"
                  </p>
                )}
                <div className="pt-2">
                  <a href={`mailto:${activeDept.head.email}`} className="text-[10px] text-emerald-500 hover:underline flex items-center justify-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{activeDept.head.email}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}