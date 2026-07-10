/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, Ticket, 
  Download, QrCode, Filter, AlertCircle, ChevronLeft, ChevronRight, Share2, X, ZoomIn
} from 'lucide-react';

const EVENTS = [
  {
    id: 'retro-to-metro-2.0',
    title: 'Retro to Metro 2.0',
    description: 'BGI Community\'s flagship transition event celebrating retro vibes and modern metropolitan culture with amazing music, guest speakers, and dynamic performances.',
    category: 'CULTURAL',
    date: '2026-07-25',
    venue: 'BGI Grand Convention Hall, Dhaka',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500',
    seatsRemaining: 176,
    status: 'Upcoming'
  },
  {
    id: 'ifter-party-2026',
    title: 'BGI Community Ifter Party 2026',
    description: 'A holy gathering of BGI Community members sharing blessings, thoughts, and breaking the fast together in the month of Ramadan.',
    category: 'CULTURAL',
    date: '2026-03-20',
    venue: 'BGI Grand Convention Hall, Dhaka',
    image: 'https://images.unsplash.com/photo-1661994215679-cde7c2c5c060?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    seatsRemaining: 0,
    status: 'Past'
  },
  {
    id: 'cultural-fest-2026',
    title: 'BGI Cultural Fest 2026',
    description: 'An extraordinary showcase of art, music, and dramatic performances celebrating the rich traditions and creative talents within the BGI Community.',
    category: 'CULTURAL',
    date: '2026-02-15',
    venue: 'BGI Grand Convention Hall, Dhaka',
    image: 'https://english.news.cn/20220122/36e85e938b6d4ae295512cfa4681c4e9/2022012236e85e938b6d4ae295512cfa4681c4e9_ad97b354-d080-463f-8e63-22344804bcc8.jpg', 
    seatsRemaining: 0,
    status: 'Past'
  }
];

// ইফতার পার্টির ইমেজ লিস্ট
const IFTER_GALLERY_IMAGES = [
  '/gallery/Events_Iftar Party 26_2026-03-07.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_1.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_2.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_3.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_4.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_5.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_6.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_7.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_8.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_9.jpg',
  '/gallery/Events_Iftar Party 26_2026-03-07_10.jpg',
];

// কালচারাল প্রোগ্রামের ইমেজ লিস্ট
const CULTURAL_GALLERY_IMAGES = [
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_1.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_2.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_3.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_4.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_5.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_6.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_7.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_8.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_9.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_10.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_11.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_12.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_13.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_14.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_15.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_16.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_17.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_18.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_19.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_20.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_21.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_22.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_23.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_24.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_25.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_26.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_27.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_28.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_29.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_30.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_31.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_32.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_33.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_34.jpg',
  '/gallery/Cultural Programs_BGI Cultural Fest 2026_2026-02-20_35.jpg',
];

interface EventPortalProps {
  user: any;
  userProfile: any;
  onNavigate: (view: string) => void;
  registeredTickets: any[];
  onRegisterEvent: (event: any) => void;
}

export default function EventPortal({
  user,
  userProfile,
  onNavigate,
  registeredTickets,
  onRegisterEvent
}: EventPortalProps) {
  const [filter, setFilter] = useState<'Upcoming' | 'Ongoing' | 'Past' | 'Calendar'>('Upcoming');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [viewingTicketId, setViewingTicketId] = useState<string | null>(null);
  
  // Gallery Modal State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeEventTitle, setActiveEventTitle] = useState('');
  const [activeEventId, setActiveEventId] = useState<string>('');
  
  // Lightbox State (For viewing single image in full-screen)
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); 

  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: Record<string, string> = {};
      EVENTS.forEach(evt => {
        const diff = new Date(evt.date + 'T' + '09:00:00').getTime() - new Date().getTime();
        if (diff <= 0) {
          newCountdowns[evt.id] = 'Completed / Live';
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 65)) / (1000 * 60));
          newCountdowns[evt.id] = `${days}d ${hours}h ${mins}m`;
        }
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = EVENTS.filter(e => e.status === filter);

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonthIndex = (month: number, year: number) => new Date(year, month, 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const calendarDaysList: any[] = [];
  const totalDays = daysInMonth(currentMonth, currentYear);
  const startingOffset = firstDayOfMonthIndex(currentMonth, currentYear);

  for (let i = 0; i < startingOffset; i++) {
    calendarDaysList.push({ day: null, isEventDay: false, events: [] });
  }

  for (let d = 1; d <= totalDays; d++) {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const dateQuery = `${currentYear}-${monthStr}-${dayStr}`;

    const matchEvents = EVENTS.filter(e => e.date === dateQuery);
    calendarDaysList.push({
      day: d,
      isEventDay: matchEvents.length > 0,
      events: matchEvents,
      dateString: dateQuery
    });
  }

  const handleRegisterClick = (evt: any) => {
    window.open('https://bgi-ticket.vercel.app/', '_blank');
  };

  // Function to open gallery modal with respective images
  const openGallery = (eventId: string, eventTitle: string) => {
    setActiveEventId(eventId);
    setActiveEventTitle(eventTitle);
    setIsGalleryOpen(true);
  };

  // Determine which images to show in the modal based on active event ID
  const currentGalleryImages = activeEventId === 'cultural-fest-2026' ? CULTURAL_GALLERY_IMAGES : IFTER_GALLERY_IMAGES;

  return (
    <div id="events-portal-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left relative">
      
      {/* Title Header */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Operational Calendar</span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">BGI Community Events</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Register, get verified tickets, and plan your schedules with the BGI node calendar.</p>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850 rounded-xl shrink-0">
          {(['Upcoming', 'Ongoing', 'Past', 'Calendar'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setFilter(tab); setSelectedEventId(null); setViewingTicketId(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filter === tab 
                  ? 'text-sky-500 dark:text-sky-450 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main view col */}
        <div className="lg:col-span-2 space-y-6">
          {filter === 'Calendar' ? (
            /* High Fidelity Calendar Grid */
            <div className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-black text-base text-zinc-900 dark:text-white">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-400">Click highlighted days to view events</span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handlePrevMonth} className="p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={handleNextMonth} className="p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDaysList.map((dayObj, idx) => {
                  const isCurrentDay = dayObj.day === 9 && currentMonth === 6 && currentYear === 2026; 
                  return (
                    <div 
                      key={idx} 
                      className={`min-h-16 p-1.5 rounded-xl border flex flex-col justify-between text-left transition-all relative ${
                        dayObj.day === null ? 'border-transparent bg-transparent' : isCurrentDay ? 'bg-sky-500/10 border-sky-500/40 ring-1 ring-sky-500' : 'border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/30'
                      }`}
                    >
                      {dayObj.day && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-bold ${isCurrentDay ? 'text-sky-500' : 'text-zinc-500'}`}>{dayObj.day}</span>
                            {dayObj.isEventDay && <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)] animate-pulse"></span>}
                          </div>

                          {dayObj.isEventDay && (
                            <div className="space-y-1 mt-1.5">
                              {dayObj.events.map((evt: any) => (
                                <button
                                  key={evt.id}
                                  onClick={() => handleRegisterClick(evt)}
                                  className="w-full text-[8px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded px-1 truncate block text-left"
                                  title={evt.title}
                                >
                                  {evt.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 text-xs flex flex-col items-center justify-center space-y-2">
              <AlertCircle className="w-6 h-6 text-zinc-400" />
              <span>No BGI Community events found in this category.</span>
            </div>
          ) : (
            /* Standard Event Listing Cards */
            <div className="space-y-6">
              {filteredEvents.map((evt) => {
                return (
                  <div 
                    key={evt.id}
                    className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:border-sky-500/15 transition-all text-left group"
                  >
                    <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 shrink-0 border border-zinc-100 dark:border-zinc-850">
                      <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-sky-500 font-mono font-bold tracking-widest uppercase">{evt.category} Node</span>
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md">
                            Seats: {evt.seatsRemaining} Left
                          </span>
                        </div>

                        <h3 className="font-sans font-black text-sm text-zinc-800 dark:text-white leading-snug group-hover:text-sky-500 transition-colors">{evt.title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{evt.description}</p>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900/60 flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center space-x-4 text-[10px] text-zinc-400">
                          <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{evt.date}</span></span>
                          <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /> <span>{evt.venue.split(',')[0]}</span></span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {countdowns[evt.id] || 'Loading...'}
                          </div>
                          
                          {filter === 'Past' ? (
                            <button
                              onClick={() => openGallery(evt.id, evt.title)}
                              className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors duration-200 font-extrabold cursor-pointer"
                            >
                              Learn More
                            </button>
                          ) : (
                            <a
                              href="https://bgi-ticket.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-sky-300/20 text-white font-extrabold hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]"
                            >
                              Get Ticket
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="p-1 space-y-4">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest pl-3 block mb-1">BGI Ticket Gateway</span>
              
              <div id="visual-downloadable-ticket" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-6 shadow-2xl relative overflow-hidden text-left space-y-6 border-b-8 border-b-sky-500">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sky-500/10 blur-2xl"></div>
                
                <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-850 pb-4">
                  <div>
                    <span className="text-[8px] font-mono font-bold text-sky-500 tracking-wider uppercase">Official Ticket Hub</span>
                    <h4 className="font-sans font-black text-xs text-zinc-850 dark:text-white leading-tight uppercase truncate max-w-[160px]">BGI Ticket Service</h4>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Ticket className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    BGI Community leverages our centralized digital ticketing engine at <a href="https://bgi-ticket.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">bgi-ticket.vercel.app</a> to dispense fast, secure, and authenticated entries to our premium events.
                  </p>
                  <p>Scan your generated QR passes at on-ground checkpoints for instant validation.</p>
                </div>

                <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 my-4 relative">
                  <span className="absolute left-[-26px] top-[-6px] w-3 h-3 bg-white dark:bg-zinc-950 rounded-full border-r border-zinc-200 dark:border-zinc-800"></span>
                  <span className="absolute right-[-26px] top-[-6px] w-3 h-3 bg-white dark:bg-zinc-950 rounded-full border-l border-zinc-200 dark:border-zinc-800"></span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 py-2 bg-white dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850">
                  <div className="p-3 bg-white rounded-xl shadow-inner border border-zinc-100 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-zinc-900" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest text-center">BGI Digital Auth Matched</span>
                </div>

                <div className="pt-2">
                  <a
                    href="https://bgi-ticket.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md hover:scale-[1.02]"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Go to Ticket Gateway</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- Image Gallery Modal --- */}
      <AnimatePresence>
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGalleryOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-850 w-full max-w-6xl max-h-[90vh] rounded-2xl p-6 md:p-8 overflow-y-auto relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] scrollbar-thin text-left"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-6">
                <div>
                  <span className="text-[10px] text-sky-500 font-mono font-bold uppercase tracking-widest">Event Memories</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{activeEventTitle}</h2>
                </div>
                <button 
                  onClick={() => setIsGalleryOpen(false)}
                  className="p-2.5 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Grid Layout (Dynamic images based on selection) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentGalleryImages.map((src, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveLightboxImg(src)}
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-850 hover:border-sky-500/60 transition-all duration-300 group relative shadow-lg cursor-zoom-in"
                  >
                    <img 
                      src={src} 
                      alt={`Gallery view ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e)=>{
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600';
                      }}
                    />
                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="self-end p-1.5 bg-black/60 rounded-lg backdrop-blur-sm border border-zinc-800 text-sky-400">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-zinc-300 font-mono bg-black/50 px-2 py-1 rounded w-max backdrop-blur-sm">Memory #{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Fullscreen Lightbox Overlay --- */}
      <AnimatePresence>
        {activeLightboxImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxImg(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-lg"
            />

            {/* Cinematic Fullscreen Image Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveLightboxImg(null)}
                className="absolute -top-12 right-0 md:right-4 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-850 rounded-xl transition-all cursor-pointer shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <img 
                src={activeLightboxImg} 
                alt="Enlarged gallery view" 
                className="max-w-full max-h-[80vh] object-contain rounded-xl border border-zinc-800/50 shadow-2xl"
                onError={(e)=>{
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800';
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}