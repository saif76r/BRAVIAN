/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, Ticket, 
  Download, QrCode, Filter, AlertCircle, ChevronLeft, ChevronRight, Share2
} from 'lucide-react';
import { EVENTS } from '../data';

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
  
  // Custom states for interactive calendar
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, so 6 = July 2026

  // Countdown timer helper
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
          const mins = Math.floor((diff % (1000 * 60 * 65)) / (1000 * 60));
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

  // Calendar Day rendering helpers
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

  // Pad the start offset days
  for (let i = 0; i < startingOffset; i++) {
    calendarDaysList.push({ day: null, isEventDay: false, events: [] });
  }

  // Populate actual calendar days
  for (let d = 1; d <= totalDays; d++) {
    // Check if there is a BGI event on this date
    // Date string format format: 'YYYY-MM-DD'
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

  const activeTicketDetails = registeredTickets.find(t => t.id === viewingTicketId) || 
                          (selectedEventId ? registeredTickets.find(t => t.eventId === selectedEventId) : null);

  const printTicket = () => {
    window.print();
  };

  return (
    <div id="events-portal-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
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
        
        {/* Left main view col (Grid of events or Calendar Grid) */}
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

              {/* Day Headings */}
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
              </div>

              {/* Calendar Grid of days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDaysList.map((dayObj, idx) => {
                  const isCurrentDay = dayObj.day === 9 && currentMonth === 6 && currentYear === 2026; // July 9, 2026 (local time mock)
                  return (
                    <div 
                      key={idx} 
                      className={`min-h-16 p-1.5 rounded-xl border flex flex-col justify-between text-left transition-all relative ${
                        dayObj.day === null 
                          ? 'border-transparent bg-transparent' 
                          : isCurrentDay
                            ? 'bg-sky-500/10 border-sky-500/40 ring-1 ring-sky-500'
                            : 'border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/30'
                      }`}
                    >
                      {dayObj.day && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-bold ${isCurrentDay ? 'text-sky-500' : 'text-zinc-500'}`}>{dayObj.day}</span>
                            {dayObj.isEventDay && <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)] animate-pulse"></span>}
                          </div>

                          {/* Render small tag for event */}
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
            
            /* Standard Event Listing Cards with countdown */
            <div className="space-y-6">
              {filteredEvents.map((evt) => {
                const isRegistered = registeredTickets.some(t => t.eventId === evt.id);
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

                      {/* Info footer line with countdown */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900/60 flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center space-x-4 text-[10px] text-zinc-400">
                          <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{evt.date}</span></span>
                          <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /> <span>{evt.venue.split(',')[0]}</span></span>
                        </div>

                        {/* Countdown block */}
                        <div className="flex items-center space-x-3">
                          <div className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {countdowns[evt.id] || 'Loading...'}
                          </div>
                          
                          <a
                            href="https://bgi-ticket.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-sky-300/20 text-white font-extrabold hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]"
                          >
                            Get Ticket
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: Active Ticket Display Pass */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            <div className="p-1 space-y-4">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest pl-3 block mb-1">BGI Ticket Gateway</span>
              
              {/* Visual Premium Ticket Graphic */}
              <div id="visual-downloadable-ticket" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-6 shadow-2xl relative overflow-hidden text-left space-y-6 border-b-8 border-b-sky-500">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sky-500/10 blur-2xl"></div>
                
                {/* Top Header */}
                <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-850 pb-4">
                  <div>
                    <span className="text-[8px] font-mono font-bold text-sky-500 tracking-wider uppercase">Official Ticket Hub</span>
                    <h4 className="font-sans font-black text-xs text-zinc-850 dark:text-white leading-tight uppercase truncate max-w-[160px]">BGI Ticket Service</h4>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Ticket className="w-4 h-4" />
                  </div>
                </div>

                {/* Metadata fields */}
                <div className="space-y-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    BGI Community leverages our centralized digital ticketing engine at <a href="https://bgi-ticket.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">bgi-ticket.vercel.app</a> to dispense fast, secure, and authenticated entries to our premium events.
                  </p>
                  <p>
                    Scan your generated QR passes at on-ground checkpoints for instant validation.
                  </p>
                </div>

                <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 my-4 relative">
                  <span className="absolute left-[-26px] top-[-6px] w-3 h-3 bg-white dark:bg-zinc-950 rounded-full border-r border-zinc-200 dark:border-zinc-800"></span>
                  <span className="absolute right-[-26px] top-[-6px] w-3 h-3 bg-white dark:bg-zinc-950 rounded-full border-l border-zinc-200 dark:border-zinc-800"></span>
                </div>

                {/* QR Core Graphic */}
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
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md hover:scale-[1.02] transition-transform"
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

    </div>
  );
}
