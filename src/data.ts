/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DepartmentInfo, Event, GalleryItem } from './types';

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'pr',
    name: 'PR Department',
    icon: 'Megaphone',
    description: 'The Public Relations Department leads external communication, media relations, brand representation, and community engagement for BGI Community, building strong connections with the global ecosystem.',
    banner: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Tasnim Ahmed',
      role: 'PR Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      quote: 'Building relationships is not just about communication; it is about creating trust and mutual growth.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'pr.head@bgi-community.org'
    },
    members: [
      { name: 'Sabbir Rahman', role: 'Media Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
      { name: 'Nabila Karim', role: 'External Liaison', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Managing external communications and press releases',
      'Maintaining relationships with university authorities and partner organizations',
      'Overseeing BGI brand guidelines in all public forums',
      'Drafting official community invitation letters and response notes'
    ],
    projects: [
      { name: 'Global Outreach 2026', status: 'Ongoing', desc: 'Expanding BGI presence in 5 new international institutions.' },
      { name: 'Media Kit Refresh', status: 'Completed', desc: 'Designed the unified brand book and digital assets.' }
    ],
    achievements: [
      'Featured in 3 national education news outlets',
      'Successfully hosted the Annual Alumni PR Summit'
    ],
    contactEmail: 'pr@bgi-community.org'
  },
  {
    id: 'marketing',
    name: 'Marketing Department',
    icon: 'TrendingUp',
    description: 'Marketing manages our social media presence, visual strategy, outreach campaigns, and event promotions to amplify the mission and drive community membership growth.',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Rahat Chowdhury',
      role: 'Marketing Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      quote: 'Great marketing does not feel like marketing; it feels like a genuine invitation to belong.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'marketing.head@bgi-community.org'
    },
    members: [
      { name: 'Fariha Jannat', role: 'Social Media Manager', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
      { name: 'Anik Sen', role: 'Copywriter', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Managing BGI Official social media pages (Facebook, LinkedIn, Instagram)',
      'Designing social media campaigns for community events',
      'Creating engaging promotional videos and content calendars',
      'Analyzing and reporting engagement analytics'
    ],
    projects: [
      { name: 'Campaign: #WeAreBGI', status: 'Completed', desc: 'A multi-platform campaign celebrating our community spirit.' },
      { name: 'BGI Newsletter Volume 5', status: 'Ongoing', desc: 'Crafting the quarterly digest showcasing student success stories.' }
    ],
    achievements: [
      'Grew official page reach by 120% in Q1 2026',
      'Generated over 1,500 organic student signups via social campaigns'
    ],
    contactEmail: 'marketing@bgi-community.org'
  },
  {
    id: 'hr',
    name: 'HR Department',
    icon: 'Users',
    description: 'The Human Resources Department focuses on member recruitment, onboarding, conflict resolution, mental well-being, motivation, and leadership talent development within BGI.',
    banner: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Ayesha Siddiqua',
      role: 'HR Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      quote: 'Behind every successful community is a highly motivated, valued, and tightly-knit family.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'hr.head@bgi-community.org'
    },
    members: [
      { name: 'Zahid Hasan', role: 'Onboarding Coordinator', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150' },
      { name: 'Sumaiya Akhter', role: 'Talent Dev Strategist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Conducting quarterly recruitment campaigns',
      'Organizing internal team-building and training camps',
      'Evaluating volunteer performance and issuing merit certificates',
      'Facilitating dispute resolutions and active listening support'
    ],
    projects: [
      { name: 'Onboarding Kit 2026', status: 'Completed', desc: 'Standardized handbook and interactive guide for new joinees.' },
      { name: 'Leadership Path', status: 'Ongoing', desc: 'A mentorship framework matching senior execs with high-potential members.' }
    ],
    achievements: [
      'Onboarded 250+ new members with zero attrition',
      'Launched the BGI Mental Wellness Helpdesk'
    ],
    contactEmail: 'hr@bgi-community.org'
  },
  {
    id: 'it',
    name: 'IT Department',
    icon: 'Laptop',
    description: 'IT is the digital backbone of BGI, managing the community web platforms, custom portal services, database persistence, and providing complete technical support.',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Sajid Al Mahim',
      role: 'IT Lead & Full Stack Architect',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      quote: 'We write code that connects people, automates tedious workflows, and scales communities.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'it.head@bgi-community.org'
    },
    members: [
      { name: 'Miraz Hossain', role: 'Frontend Engineer', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150' },
      { name: 'Tanvir Rahman', role: 'Database Admin', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Developing and maintaining the main web applications',
      'Implementing secure authentication and database architectures',
      'Integrating system platforms and administrative console dashboards',
      'Hosting live virtual webinar software solutions'
    ],
    projects: [
      { name: 'BGI Console Web App', status: 'Completed', desc: 'Enterprise member tracking console at bgi-community.vercel.app.' },
      { name: 'Secure Database Migration', status: 'Completed', desc: 'Migrating legacy member information to unified, encrypted firestore instances.' }
    ],
    achievements: [
      'Attained 99.9% uptime for all community servers',
      'Successfully implemented real-time QR generation for event ticket systems'
    ],
    contactEmail: 'it@bgi-community.org'
  },
  {
    id: 'management',
    name: 'Management Department',
    icon: 'Briefcase',
    description: 'The Management Department oversees corporate governance, resource allocation, audit control, standard operating procedures, and overall organizational workflow.',
    banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Adnan Sami',
      role: 'Management Director',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150',
      quote: 'Precision, accountability, and agile frameworks define the BGI corporate excellence.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'mgmt.head@bgi-community.org'
    },
    members: [
      { name: 'Farzana Karim', role: 'Operations Auditor', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150' },
      { name: 'Noman Siddique', role: 'Inventory Coordinator', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Drafting BGI quarterly budgets and resource tracking sheets',
      'Verifying operational accountability reports across all sub-sectors',
      'Ensuring strict compliance with community regulations and guidelines',
      'Managing physical assets, office resources, and inventory locks'
    ],
    projects: [
      { name: 'SOP Standardization', status: 'Completed', desc: 'Documented 15 structural guidelines for standard event execution.' }
    ],
    achievements: [
      'Achieved a 15% optimization in event execution costs via resource sharing',
      'Completed the 2025 Comprehensive Operations Audit with high distinction'
    ],
    contactEmail: 'mgmt@bgi-community.org'
  },
  {
    id: 'communication',
    name: 'Communication Department',
    icon: 'MessageSquare',
    description: 'The Communication Department handles standard internal messaging, newsletter dispatches, virtual helpdesk queries, and direct notification systems.',
    banner: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Sultana Yeasmin',
      role: 'Communication Chief',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150',
      quote: 'Clear, direct, and timely exchange of information keeps a massive network beautifully synchronized.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'comm.head@bgi-community.org'
    },
    members: [
      { name: 'Kazi Arif', role: 'Support Coordinator', image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Managing helpdesk complaints and resolving student inquiries',
      'Drafting and dispatching internal email announcements and newsletters',
      'Coordinating critical notices with department representatives',
      'Moderating community communication forums'
    ],
    projects: [
      { name: 'Direct-Connect App API', status: 'Ongoing', desc: 'Developing a unified notification dispatcher' }
    ],
    achievements: [
      'Reduced typical helpdesk response wait time to under 4 hours',
      'Maintained a community newsletter reader score of 82%'
    ],
    contactEmail: 'comm@bgi-community.org'
  },
  {
    id: 'collab',
    name: 'Collaboration (Collab) Department',
    icon: 'GitPullRequest',
    description: 'The Collab Department establishes partnerships, organizes combined research programs, and creates cross-institutional study networks with national and global entities.',
    banner: 'https://images.unsplash.com/photo-1511551203524-9a24350a5771?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Muntasir Billah',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      quote: 'Collaborative networks accelerate growth, unlock massive research capital, and make global breakthroughs possible.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'collab.head@bgi-community.org'
    },
    members: [
      { name: 'Nusrat Jahan', role: 'Corporate Liaison', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Establishing MOUs with academic institutes',
      'Partnering with corporate entities for intern pipelines',
      'Organizing cross-department cooperative activities'
    ],
    projects: [
      { name: 'Industry-Academia bridge', status: 'Ongoing', desc: 'Connecting senior students with research lab internships.' }
    ],
    achievements: [
      'Executed 8 formal partnerships with technology labs in 2025',
      'Brought in $10K in sponsorship funding'
    ],
    contactEmail: 'collab@bgi-community.org'
  },
  {
    id: 'recent-info',
    name: 'Recent Info Department & Post',
    icon: 'Newspaper',
    description: 'This department functions as BGI’s independent newsroom, archiving current events, community journals, local highlights, and official community posts.',
    banner: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Faisal Karim',
      role: 'Editor-in-Chief',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
      quote: 'Documenting the active steps of today secures the rich, authentic history of tomorrow.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'info.head@bgi-community.org'
    },
    members: [
      { name: 'Taskeen Ara', role: 'Lead Reporter', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Maintaining the official BGI News blog and daily feeds',
      'Reporting live from BGI on-ground events and workshops',
      'Conducting interviews with community achievers and leaders',
      'Publishing the BGI Annual Community Review'
    ],
    projects: [
      { name: 'BGI Post Archive', status: 'Completed', desc: 'Digitized all BGI community journals since 2021.' }
    ],
    achievements: [
      'Published 120+ student articles and research reports in 2025',
      'Re-designed the digital BGI Press room'
    ],
    contactEmail: 'info@bgi-community.org'
  },
  {
    id: 'operation',
    name: 'Operation Department',
    icon: 'Activity',
    description: 'Operations runs the active logistics of BGI Community. They govern on-ground schedules, venue bookings, safety protocols, and supply distribution networks.',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Rashedul Bari',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
      quote: 'We map the mechanics, clear the obstacles, and make grand plans happen flawlessly on the ground.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'ops.head@bgi-community.org'
    },
    members: [
      { name: 'Imran Khan', role: 'Logistics Supervisor', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Managing stage setup, sound engineering, and lighting locks for events',
      'Structuring visitor safety plans and security credentials',
      'Procuring, tracking, and distributing physical community assets',
      'Supervising on-ground volunteer networks'
    ],
    projects: [
      { name: 'Zero-Waste Events', status: 'Ongoing', desc: 'Structuring logistics to ensure all event materials are strictly recycled.' }
    ],
    achievements: [
      'Executed the 2025 BGI Youth Festival with zero logistical delays',
      'Established a standard inventory tracking scanner database'
    ],
    contactEmail: 'ops@bgi-community.org'
  },
  {
    id: 'research',
    name: 'Research Department',
    icon: 'SearchCode',
    description: 'The Research Department promotes academic inquiries, technical papers, data analysis, and coordinates research workshops with prominent research faculties.',
    banner: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Dr. Mehzabin Reza',
      role: 'Director of Research',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
      quote: 'Inquiry is the engine of progress. We teach members how to formulate hypotheses and publish globally.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'research.head@bgi-community.org'
    },
    members: [
      { name: 'Abrar Tanvir', role: 'Data Researcher', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Hosting workshops on scientific paper writing and methodology',
      'Assisting members in submitting to accredited scientific journals',
      'Coordinating independent research groups',
      'Organizing the annual BGI Research Symposium'
    ],
    projects: [
      { name: 'BGI Journal of Science', status: 'Ongoing', desc: 'Designing the official open-source community research journal.' }
    ],
    achievements: [
      '15 student papers successfully published in IEEE & Scopus-indexed journals',
      'Awarded $5,000 in student research grants'
    ],
    contactEmail: 'research@bgi-community.org'
  },
  {
    id: 'sports',
    name: 'Sports Department',
    icon: 'Trophy',
    description: 'The Sports Department drives athletic growth, organizing tournaments, fitness workshops, mental stamina camps, and leading BGI teams in national inter-club championships.',
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Asif Mustaba',
      role: 'Sports Coordinator',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
      quote: 'Champions are made in the hours when no one is watching. Play with honor, win with humility.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'sports.head@bgi-community.org'
    },
    members: [
      { name: 'Niaz Morshed', role: 'Athletics Coach', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Organizing annual cricket, football, and indoor game championships',
      'Supervising healthy habit challenges and daily fitness workshops',
      'Formulating team rosters, jerseys, and field requirements',
      'Tracking equipment inventory and game-day scheduling'
    ],
    projects: [
      { name: 'BGI Premier League 2026', status: 'Ongoing', desc: 'Organizing the 16-team community cricket tournament.' }
    ],
    achievements: [
      'Won the 2025 Inter-Community Football Champions Cup',
      'Trained 100+ members in professional self-defense classes'
    ],
    contactEmail: 'sports@bgi-community.org'
  },
  {
    id: 'education',
    name: 'Education Department',
    icon: 'GraduationCap',
    description: 'The Education Department manages community tutoring classes, skills development bootcamps, and arranges study materials for student development.',
    banner: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Prof. Shamim Chowdhury',
      role: 'Academic Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      quote: 'Education is the ultimate tool for liberation. We make elite skills development open to everyone.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'edu.head@bgi-community.org'
    },
    members: [
      { name: 'Mahruba Khan', role: 'Syllabus Curator', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Structuring academic bootcamps (Software Engineering, IELTS prep, SQL)',
      'Organizing student peer-to-peer tutoring circles',
      'Maintaining the virtual BGI Classrooms and resource libraries',
      'Issuing specialized skill certificates'
    ],
    projects: [
      { name: 'AI & Data Science Bootcamp', status: 'Ongoing', desc: 'A rigorous 12-week course teaching Python, ML models, and API tools.' }
    ],
    achievements: [
      'Graduated 400+ members in advanced computer skill training programs',
      'Maintained a peer-tutor satisfaction score of 96%'
    ],
    contactEmail: 'edu@bgi-community.org'
  },
  {
    id: 'emergency',
    name: 'Emergency Department',
    icon: 'ShieldAlert',
    description: 'The Emergency Department forms BGI’s immediate response squad, managing rapid blood donation databases, emergency community relief, and disaster aid funds.',
    banner: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=1200',
    head: {
      name: 'Rana Masud',
      role: 'Emergency Response Chief',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
      quote: 'When crisis strikes, split seconds matter. We stand prepared to serve the community 24/7.',
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'emergency.head@bgi-community.org'
    },
    members: [
      { name: 'Zeeshan Alam', role: 'Blood Donation Manager', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' }
    ],
    responsibilities: [
      'Maintaining the BGI Live Blood Donor directory and contact center',
      'Deploying emergency on-ground support during natural disasters',
      'Conducting certified CPR, first-aid, and safety mock drills',
      'Collecting and distributing relief materials and medical aid'
    ],
    projects: [
      { name: 'Donor Directory App Integration', status: 'Completed', desc: 'Real-time SMS system matching emergency blood requests to local donors.' }
    ],
    achievements: [
      'Facilitated 1,200+ bags of emergency blood donations in 2025',
      'Raised and deployed $8,000 for local flood relief campaigns'
    ],
    contactEmail: 'emergency@bgi-community.org'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'evt-retro-metro',
    title: 'Retro to Metro 2.0',
    description: 'BGI Community’s flagship transition event celebrating retro vibes and modern metropolitan culture with amazing music, guest speakers, and dynamic performances.',
    date: '2026-07-25',
    time: '04:00 PM - 09:00 PM',
    venue: 'BGI Grand Convention Hall, Dhaka',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    capacity: 1000,
    registeredCount: 824,
    category: 'Cultural',
    seatsRemaining: 176,
    status: 'Upcoming'
  }
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', title: 'Community Hackathon Pitching', category: 'Workshops', date: 'March 2026' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800', title: 'IT Programming Class session', category: 'Seminars', date: 'April 2026' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800', title: 'Emergency Relief distribution', category: 'Volunteers', date: 'June 2025' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'President receiving National Excellence Award', category: 'Awards', date: 'October 2025' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800', title: 'Blood Donation Camp onground', category: 'Volunteers', date: 'February 2026' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', title: 'Marketing Masterclass Summit', category: 'Events', date: 'May 2026' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1511551203524-9a24350a5771?auto=format&fit=crop&q=80&w=800', title: 'Alumni Cultural Performance', category: 'Cultural Programs', date: 'January 2026' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1531415080290-bc9854503f3f?auto=format&fit=crop&q=80&w=800', title: 'Sports Club Trophy ceremony', category: 'Awards', date: 'December 2025' }
];

export const TESTIMONIALS = [
  {
    name: 'Suhana Ferdous',
    role: 'Alumna, Senior Software Engineer at Stripe',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    quote: 'Joining the BGI IT Department during my first year was the single best decision of my student life. The peer mentorship, open-source projects, and leadership training were instrumental in helping me clear my Stripe interview.'
  },
  {
    name: 'Kashif Alam',
    role: 'Co-Founder of TechSprint',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    quote: 'The collaborative projects under BGI Collab Department allowed me to team up with brilliant minds across other faculties. We built our startup MVP right here in the BGI Innovation labs!'
  },
  {
    name: 'Professor Rafiqul Islam',
    role: 'Academic Advisor at BGI',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    quote: 'BGI Community teaches students exactly what the traditional curriculum misses — ownership, accountability, public presentation skills, and the true meaning of volunteer service.'
  }
];

export const PARTNERS = [
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_blue.svg' },
  { name: 'Vercel', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vercel_logo_black.svg' },
  { name: 'Linear', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Notion', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg' }
];
