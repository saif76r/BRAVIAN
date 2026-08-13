/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, Sun, Moon, LogIn, ChevronDown, Menu, X, 
  ArrowRight, Shield, Calendar, User, ClipboardList, Image, 
  BookOpen, Star, HelpCircle, Trophy, Sparkles, MessageSquare, ExternalLink
} from 'lucide-react';
import { DEPARTMENTS, EVENTS } from '../data';
import bgiLogo from '../assets/images/bgi_logo_1783613714921.png';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string, extra?: any) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  user: any; // User object from Firebase auth or null
  userProfile: any; // Firestore user document or null
  onLogout: () => void;
  notifications: any[];
  onMarkNotificationRead: (id: string) => void;
}

export default function Navbar({
  activeView,
  onNavigate,
  darkMode,
  setDarkMode,
  user,
  userProfile,
  onLogout,
  notifications,
  onMarkNotificationRead
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Track scrolling to toggle navbar background transparency/blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Search Results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...DEPARTMENTS.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(d => ({ type: 'department', name: d.name, view: `dept-${d.id}`, icon: BookOpen, subtitle: 'Department' })),
    { name: 'Know About BGI', view: 'about-know', icon: Sparkles, subtitle: 'About Page' },
    { name: 'Leadership Team', view: 'leadership', icon: Star, subtitle: 'About Page' },
    { name: 'Community History', view: 'about-history', icon: BookOpen, subtitle: 'About Page' },
    { name: 'Mission & Vision', view: 'about-mission', icon: HelpCircle, subtitle: 'About Page' },
    { name: 'Achievements', view: 'about-achievements', icon: Trophy, subtitle: 'About Page' },
    { name: 'Our Activities', view: 'activities', icon: Sparkles, subtitle: 'Activities' },
    { name: 'Events Calendar', view: 'events', icon: Calendar, subtitle: 'Events' },
    { name: 'Gallery Portfolio', view: 'gallery', icon: Image, subtitle: 'Media Portfolio' },
    { name: 'Contact Information', view: 'contact', icon: MessageSquare, subtitle: 'Contact Us' }
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  const handleSearchSelect = (view: string) => {
    onNavigate(view);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about-know', dropdown: true },
    { label: 'Departments', view: 'departments', list: true },
    { label: 'Events', view: 'events' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Our Squad', view: 'leadership' },
    { label: 'Contact', view: 'contact' }
  ];

  return (
    <>
      <nav 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b shadow-lg backdrop-blur-md ${
          scrolled 
            ? 'py-3 bg-white/70 dark:bg-zinc-950/70 border-zinc-200/50 dark:border-zinc-800/50' 
            : 'py-5 bg-transparent border-transparent'
        }`}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo in top-left corner */}
            <div 
              id="bgi-brand-logo"
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md group-hover:border-sky-500/50 transition-all duration-300 overflow-hidden">
                <img src={bgiLogo} alt="BGI Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm tracking-tight text-zinc-900 dark:text-white leading-none">
                  BGI <span className="text-sky-500 dark:text-sky-400">Community</span>
                </span>
                <span className="font-mono text-[8px] tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold uppercase mt-0.5">
                  
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menus */}
            <div className="hidden lg:flex items-center space-x-1 mx-auto">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div 
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                      <button 
                        id="nav-dropdown-about"
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1 relative hover:scale-105 active:scale-95 origin-center ${
                          activeView.startsWith('about-') 
                            ? 'text-zinc-900 dark:text-white font-bold' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                        {activeView.startsWith('about-') && (
                          <motion.div 
                            layoutId="activeNavIndicator" 
                            className="absolute bottom-0 left-3 right-3 h-[2px] bg-zinc-900 dark:bg-white rounded-full" 
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* About Mega Dropdown Menu */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 z-50 grid grid-cols-2 gap-4"
                          >
                            <div className="col-span-2 pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                              <span className="font-sans font-semibold text-xs tracking-wider text-sky-500 dark:text-sky-400 uppercase">BGI Nexus</span>
                              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Explore our foundation</span>
                            </div>

                            <button onClick={() => onNavigate('about-know')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">📖 Know About BGI</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Our identity & history</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('join')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <User className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">🤝 How to Join</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Membership protocols</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('leadership')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <Star className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">👑 Leadership Team</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Our premium board</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('departments')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <BookOpen className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">🏢 Our Departments</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Specialized nodes</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('about-mission')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <HelpCircle className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">🎯 Mission & Vision</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Core targets & focus</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('about-history')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">📜 Community History</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Evolution milestones</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('about-achievements')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <Trophy className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">🏆 Achievements</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Our historic awards</p>
                              </div>
                            </button>

                            <button onClick={() => onNavigate('activities')} className="flex items-start space-x-3 text-left p-2 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">🎉 Our Activities</h4>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Campaigns & bootcamps</p>
                              </div>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.list) {
                  return (
                    <div 
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setDeptDropdownOpen(true)}
                      onMouseLeave={() => setDeptDropdownOpen(false)}
                    >
                      <button 
                        id="nav-dropdown-departments"
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1 relative hover:scale-105 active:scale-95 origin-center ${
                          activeView === 'departments' || activeView.startsWith('dept-')
                            ? 'text-zinc-900 dark:text-white font-bold' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                        {(activeView === 'departments' || activeView.startsWith('dept-')) && (
                          <motion.div 
                            layoutId="activeNavIndicator" 
                            className="absolute bottom-0 left-3 right-3 h-[2px] bg-zinc-900 dark:bg-white rounded-full" 
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {deptDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-[280px] bg-white dark:bg-zinc-950 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 max-h-[380px] overflow-y-auto"
                          >
                            <button onClick={() => { onNavigate('departments'); setDeptDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-sky-500 dark:text-sky-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between">
                              <span>All Departments Directory</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800/60 my-1"></div>
                            {DEPARTMENTS.map(dept => (
                              <button
                                key={dept.id}
                                onClick={() => { onNavigate(`dept-${dept.id}`); setDeptDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between"
                              >
                                <span>{dept.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.view)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative hover:scale-105 active:scale-95 origin-center ${
                      activeView === item.view 
                        ? 'text-zinc-900 dark:text-white font-bold' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeView === item.view && (
                      <motion.div 
                        layoutId="activeNavIndicator" 
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-zinc-900 dark:bg-white rounded-full" 
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* My Account Tab only visible if logged in */}
              {user && (
                <button
                  id="nav-my-account"
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative hover:scale-105 active:scale-95 origin-center ${
                    activeView === 'dashboard'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span>My Account</span>
                  {activeView === 'dashboard' && (
                    <motion.div 
                      layoutId="activeNavIndicator" 
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-zinc-900 dark:bg-white rounded-full" 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )}
            </div>

            {/* Top Right Action Panel */}
            <div className="flex items-center space-x-3 shrink-0">
              
              {/* Search Toggle */}
              <button 
                id="search-trigger-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-white transition-all"
                title="Search Site"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notification Center Trigger */}
              <div className="relative">
                <button 
                  id="notif-bell-trigger"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-white transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span id="unread-notif-badge" className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white font-sans font-bold text-[9px] flex items-center justify-center ring-2 ring-white dark:ring-zinc-950">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                <AnimatePresence>
                  {notifDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 z-50"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2 mb-2">
                        <span className="font-sans font-semibold text-xs text-zinc-800 dark:text-white">Notification Hub</span>
                        <span className="text-[10px] text-emerald-500 font-medium">BGI Core</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 text-xs text-zinc-400">
                            No active notifications.
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              className={`p-2 rounded-lg text-left text-xs transition-colors ${
                                notif.read 
                                  ? 'bg-transparent text-zinc-500 dark:text-zinc-400' 
                                  : 'bg-emerald-50/50 dark:bg-emerald-950/10 text-zinc-800 dark:text-zinc-200 font-medium border-l-2 border-emerald-500'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span>{notif.title}</span>
                                {!notif.read && (
                                  <button 
                                    onClick={() => onMarkNotificationRead(notif.id)}
                                    className="text-[9px] text-emerald-500 hover:underline"
                                  >
                                    Mark
                                  </button>
                                )}
                              </div>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">{notif.message}</p>
                              <span className="text-[9px] text-zinc-400 block mt-1">{new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Day / Night Theme Toggle */}
              <button 
                id="theme-toggle-btn"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-white transition-all"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
              </button>

              {/* Login / Profile controls */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    id="user-profile-avatar-btn"
                    onClick={() => onNavigate('dashboard')}
                    className="w-9 h-9 rounded-full overflow-hidden border border-sky-500/50 p-[2px] hover:scale-105 transition-transform"
                  >
                    <img 
                      src={userProfile?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                  <button
                    id="nav-logout-btn"
                    onClick={onLogout}
                    className="hidden md:block px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    id="nav-join-btn"
                    onClick={() => onNavigate('join')}
                    className="hidden md:block px-6 py-2.5 rounded-full text-xs font-extrabold text-white dark:text-black bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 dark:from-sky-400 dark:via-sky-300 dark:to-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.3)] dark:shadow-[0_0_15px_rgba(56,189,248,0.5)] border border-sky-400/20 hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] transition-all duration-300"
                  >
                    Join now
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                 {navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.label} className="py-2 border-b border-zinc-100 dark:border-zinc-900">
                        <span className="block px-3 text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest mb-2">BGI About Menu</span>
                        <div className="grid grid-cols-2 gap-2 pl-3">
                          <button onClick={() => { onNavigate('about-know'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">📖 Know BGI</button>
                          <button onClick={() => { onNavigate('join'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">🤝 How to Join</button>
                          <button onClick={() => { onNavigate('leadership'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">👑 Leadership</button>
                          <button onClick={() => { onNavigate('departments'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">🏢 Departments</button>
                          <button onClick={() => { onNavigate('about-mission'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">🎯 Mission</button>
                          <button onClick={() => { onNavigate('about-history'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">📜 History</button>
                          <button onClick={() => { onNavigate('about-achievements'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">🏆 Awards</button>
                          <button onClick={() => { onNavigate('activities'); setMobileMenuOpen(false); }} className="text-left text-xs text-zinc-500 dark:text-zinc-400 py-1 hover:text-sky-500">🎉 Activities</button>
                        </div>
                      </div>
                    );
                  }

                  if (item.list) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => { onNavigate('departments'); setMobileMenuOpen(false); }}
                        className="w-full text-left block px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white"
                      >
                        {item.label} Directory
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => { onNavigate(item.view); setMobileMenuOpen(false); }}
                      className={`w-full text-left block px-3 py-2 transition-all duration-300 ${
                        activeView === item.view 
                          ? 'text-zinc-900 dark:text-white border-l-2 border-zinc-900 dark:border-white pl-3 font-bold bg-zinc-100 dark:bg-white/5' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {user ? (
                  <>
                    <button
                      onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                      className={`w-full text-left block px-3 py-2 transition-all duration-300 ${
                        activeView === 'dashboard' 
                          ? 'text-zinc-900 dark:text-white border-l-2 border-zinc-900 dark:border-white pl-3 font-bold bg-zinc-100 dark:bg-white/5' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="w-full text-left block px-3 py-2 rounded-lg text-base font-bold text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/20"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-2 pl-3">
                    <button
                      onClick={() => { onNavigate('join'); setMobileMenuOpen(false); }}
                      className="w-full px-4 py-2 text-sm font-extrabold text-white bg-gradient-to-r from-sky-600 to-sky-700 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.2)] text-center"
                    >
                      Join Us
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Search Command Palette Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 w-full">
                  <Search className="w-5 h-5 text-sky-500 dark:text-sky-400 shrink-0" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search departments, events, history, activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.value)}
                    className="w-full bg-transparent border-none outline-none text-sm text-zinc-800 dark:text-white placeholder-zinc-400"
                    autoFocus
                  />
                </div>
                <button 
                  id="search-close-btn"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Suggestions and Results */}
              <div className="max-h-80 overflow-y-auto p-4">
                {searchQuery.trim() === '' ? (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Recommended Searches</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleSearchSelect('about-know')} className="flex items-center space-x-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-sky-500/10 text-left text-xs transition-colors">
                        <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">📖 Know BGI</span>
                      </button>
                      <button onClick={() => handleSearchSelect('leadership')} className="flex items-center space-x-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-sky-500/10 text-left text-xs transition-colors">
                        <Star className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">👑 Leadership</span>
                      </button>
                      <button onClick={() => handleSearchSelect('dept-it')} className="flex items-center space-x-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-sky-500/10 text-left text-xs transition-colors">
                        <Laptop className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">🏢 IT Department</span>
                      </button>
                      <button onClick={() => handleSearchSelect('gallery')} className="flex items-center space-x-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-sky-500/10 text-left text-xs transition-colors">
                        <Image className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">📸 Media Gallery</span>
                      </button>
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-8 text-sm text-zinc-400">
                    No matching BGI community nodes found.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.map((res, index) => {
                      const ResIcon = res.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(res.view)}
                          className="w-full text-left p-3 rounded-xl hover:bg-sky-500/10 flex items-center justify-between transition-colors border border-transparent hover:border-sky-500/20"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                              <ResIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-semibold text-zinc-800 dark:text-zinc-100">{res.name}</span>
                              <span className="text-[10px] text-zinc-400">{res.subtitle}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}