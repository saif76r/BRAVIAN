/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, Calendar, QrCode, Bell, 
  Settings, Key, AlertCircle, ShieldCheck, CheckCircle2, 
  ExternalLink, ChevronRight, Sparkles, BookOpen, Clock, Activity, Award
} from 'lucide-react';
import { UserProfile, AppNotification } from '../types';

interface DashboardViewProps {
  user: any;
  userProfile: UserProfile | null;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onUpdateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  onChangePassword: (password: string) => Promise<void>;
}

export default function DashboardView({
  user,
  userProfile,
  notifications,
  onMarkNotificationRead,
  onUpdateProfile,
  onChangePassword
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      await onUpdateProfile({
        fullName,
        phone,
        address
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    setUpdatingPassword(true);
    try {
      await onChangePassword(newPassword);
      setPasswordSuccess(true);
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div id="account-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Authorized Node</span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">Member Dashboard</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">View your verified membership pass, track recent activities, update security logs, and access the BGI Console.</p>
        </div>

        {/* Tab selection links */}
        <div className="flex p-1 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'overview' 
                ? 'text-emerald-500 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'settings' 
                ? 'text-emerald-500 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Member profile bio and interactive QR Membership Card */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Profile Quick Summary Card */}
          <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center space-y-4 shadow-md">
            <div className="relative w-24 h-24 mx-auto">
              {/* Profile pic circular completion border */}
              <div className="absolute inset-0 rounded-full border-4 border-zinc-100 dark:border-zinc-800"></div>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-r-transparent transform -rotate-45"></div>
              <div className="w-full h-full rounded-full overflow-hidden p-2">
                <img 
                  src={userProfile?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                  alt="Member Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full text-[8px] font-bold border-2 border-white dark:border-zinc-950">
                {userProfile?.profileCompletion || 100}%
              </span>
            </div>

            <div>
              <h3 className="font-sans font-black text-base text-zinc-900 dark:text-white leading-tight">{userProfile?.fullName || 'BGI Member'}</h3>
              <p className="text-[10px] text-zinc-400 font-mono mt-1">{userProfile?.role || 'Member'} &bull; {userProfile?.department || 'IT Node'}</p>
            </div>

            {/* Expire and active badges */}
            <div className="flex justify-center space-x-2 pt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold tracking-wider uppercase border border-emerald-500/10">
                {userProfile?.membershipStatus || 'Active'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 text-[9px] font-mono">
                Batch {userProfile?.batch || '23'}
              </span>
            </div>
          </div>

          {/* Interactive QR Glassmorphic Card (Rotates slightly on hover) */}
          <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-zinc-950 p-6 shadow-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none"></div>
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[8px] font-mono text-emerald-400 tracking-wider uppercase font-bold block">BGI Global Grid Card</span>
                <span className="text-xs font-sans font-bold text-white uppercase mt-0.5">Community Node Pass</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <QrCode className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4 my-6 text-xs text-white">
              <div className="flex justify-between">
                <div>
                  <span className="text-[8px] text-zinc-400 uppercase font-mono block">Scanned ID</span>
                  <span className="font-mono font-bold text-[11px] tracking-wide text-emerald-400">{userProfile?.memberId || 'BGI-GUEST'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-zinc-400 uppercase font-mono block">Node Expire</span>
                  <span className="font-mono font-semibold text-[10px] text-zinc-300">{userProfile?.membershipExpiry ? new Date(userProfile.membershipExpiry).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>

              {/* QR scanner preview block */}
              <div className="p-3 bg-white rounded-xl shadow-inner border border-zinc-100 flex items-center justify-center w-28 h-28 mx-auto">
                <QrCode className="w-full h-full text-zinc-950" />
              </div>
            </div>

            <span className="text-[8px] font-mono text-zinc-500 block text-center tracking-widest uppercase">ENCRYPTED RFID ACCESS CODE</span>
          </div>

        </div>

        {/* Right Main columns: Overview information tabs or Settings Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              
              /* Main Stats Overview Tab */
              <motion.div
                key="overview-panels"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8"
              >
                
                {/* 1. Official BGI Console Integration Card (Glass card) */}
                <div className="p-6 rounded-2xl bg-gradient-to-tr from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest block">ADMIN ACCESS MODULE</span>
                      <h3 className="font-sans font-black text-base text-zinc-900 dark:text-white">BGI Community Console</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[8px] font-mono font-bold text-zinc-400">v5_Vercel_Build</span>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Access your personalized administrative tools, real-time membership tracking trackers, operational rosters, and audit reports directly on the secure remote Vercel node.
                  </p>

                  <a 
                    href="https://bgi-community.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    <span>Open BGI Console</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                </div>

                {/* 2. Registered Account Meta list */}
                <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 backdrop-blur-xl space-y-4 text-left">
                  <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>Membership Profile Metadata</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Institutional Email</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userProfile?.email || user.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Phone Contact</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userProfile?.phone || 'Not updated'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Academic ID</span>
                      <span className="font-mono text-zinc-800 dark:text-zinc-200">{userProfile?.studentId || 'Not updated'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Home Address</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">{userProfile?.address || 'Not updated'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Blood Group</span>
                      <span className="font-bold text-rose-500">{userProfile?.bloodGroup || 'Not updated'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="text-zinc-400">Join Date</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userProfile?.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Interactive Activity Timeline */}
                <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 backdrop-blur-xl space-y-4 text-left">
                  <h3 className="font-sans font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span>Member Activity Timeline</span>
                  </h3>

                  <div className="space-y-4 pl-4 border-l border-zinc-150 dark:border-zinc-900 relative">
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-mono text-zinc-400">Today</span>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-white">Active node connection logged successfully</h4>
                      <p className="text-[10px] text-zinc-400">Authenticated via Firebase Authentication with secure key.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-mono text-zinc-400">Joined Node</span>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-white">BGI Community profile synced</h4>
                      <p className="text-[10px] text-zinc-400">Created membership credentials and generated QR scanner access code.</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            ) : (
              
              /* Edit Profile & Security Tab Settings */
              <motion.div
                key="settings-panels"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-8"
              >
                {/* Profile update form */}
                <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/40 backdrop-blur-xl space-y-4 text-left shadow-lg">
                  <h3 className="font-sans font-black text-base text-zinc-850 dark:text-white flex items-center space-x-2">
                    <User className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Update Profile Logs</span>
                  </h3>

                  {profileSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Profile updated successfully! Welcome to BGI.</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Update your name"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Phone Contact</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Update phone"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Home Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Update home address"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-md disabled:opacity-50"
                    >
                      {updatingProfile ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  </form>
                </div>

                {/* Password update form */}
                <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/40 backdrop-blur-xl space-y-4 text-left shadow-lg">
                  <h3 className="font-sans font-black text-base text-zinc-850 dark:text-white flex items-center space-x-2">
                    <Key className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Change Node Password</span>
                  </h3>

                  {passwordSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Node password changed successfully! Keep it secure.</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Min 6 characters"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updatingPassword}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-md disabled:opacity-50"
                    >
                      {updatingPassword ? 'Updating...' : 'Change Password'}
                    </button>
                  </form>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
