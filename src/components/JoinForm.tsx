/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, Lock, Hash, Calendar, BookOpen, 
  MapPin, ShieldAlert, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle
} from 'lucide-react';
import { DEPARTMENTS } from '../data';

interface JoinFormProps {
  onRegister: (registerData: any) => Promise<void>;
  onNavigate: (view: string) => void;
}

export default function JoinForm({ onRegister, onNavigate }: JoinFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [batch, setBatch] = useState('');
  const [department, setDepartment] = useState('IT Node');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await onRegister({
        fullName,
        email,
        password,
        phone,
        studentId,
        batch,
        department,
        bloodGroup,
        address,
        emergencyContact,
        photoUrl
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onNavigate('dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="join-registration-container" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Institutional Protocol</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">BGI Community Onboarding</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Complete the verified registration packet. All fields are locked under active secure Firestore rules.</p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/40 backdrop-blur-xl shadow-2xl space-y-8">
        
        {success ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-500 mx-auto animate-pulse">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-sans font-black text-lg text-zinc-900 dark:text-white">Onboarding Complete!</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Welcome to the family. Your verified Membership ID has been generated and your QR access code is now synced. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Profile Pic Selector Frame */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-zinc-100 dark:border-zinc-900">
              <img 
                src={photoUrl} 
                alt="Avatar Selection" 
                className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 shadow-lg"
              />
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Profile Photo Token</span>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
                  ].map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoUrl(url)}
                      className={`px-2 py-1 rounded border text-[9px] font-semibold transition-all ${
                        photoUrl === url 
                          ? 'border-sky-500 text-sky-500 bg-sky-50/50 dark:bg-sky-950/20' 
                          : 'border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50'
                      }`}
                    >
                      Token {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* General Credentials Section */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">General Credentials</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. Tasnim Ahmed"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Institutional Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. tasnim@bgi-community.org"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Secure Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-855 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="Min 6 characters"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-855 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="Match password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Academic Information</span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. 21-45678-2"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Academic Batch</label>
                  <input
                    type="text"
                    value={batch}
                    onChange={e => setBatch(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. 23"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Selected Department</label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Emergency & medical sections */}
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">Emergency &amp; Logistics</span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Primary Phone Contact</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. 01712345678"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Emergency Phone</label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                    placeholder="Emergency Contact"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={e => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase block">Home Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Banani, Block G, Road 4, House 12"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Authenticating & Onboarding...' : 'Submit Member Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-zinc-400">Already a verified BGI member? </span>
              <button
                type="button"
                onClick={() => onNavigate('auth-login')}
                className="text-[11px] text-sky-500 font-bold hover:underline"
              >
                Sign In
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
