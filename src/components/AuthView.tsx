/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ShieldCheck, AlertCircle, ArrowRight, Eye, Key, ShieldAlert } from 'lucide-react';

interface AuthViewProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onNavigate: (view: string) => void;
  onResetPassword: (email: string) => Promise<void>;
}

export default function AuthView({ onLogin, onNavigate, onResetPassword }: AuthViewProps) {
  const [screen, setScreen] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      await onLogin(email, password);
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err?.message || 'Access Denied. Invalid BGI credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      await onResetPassword(email);
      setSuccess('A recovery ticket email has been routed to your mailbox.');
      setEmail('');
    } catch (err: any) {
      setError(err?.message || 'Failed to route recovery ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="auth-view-wrapper" className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-32 text-left">
      <div className="p-6 sm:p-10 rounded-3xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/40 backdrop-blur-xl shadow-2xl space-y-6">
        
        <AnimatePresence mode="wait">
          {screen === 'login' ? (
            
            /* Standard Login Card */
            <motion.div
              key="login-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Authorization Core</span>
                <h2 className="font-sans font-black text-2xl text-zinc-900 dark:text-white">BGI Access Node</h2>
                <p className="text-xs text-zinc-400">Sign in to your verified BGI profile to log tickets or generate event passes.</p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Verified Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. sabbir@bgi-community.org"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Credential Key</label>
                    <button
                      type="button"
                      onClick={() => setScreen('forgot')}
                      className="text-[10px] text-zinc-400 hover:text-emerald-500"
                    >
                      Forgot Key?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-zinc-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{submitting ? 'Authenticating Access...' : 'Connect Access Node'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-zinc-400">New to BGI? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('auth-join')}
                  className="text-[11px] text-emerald-500 font-bold hover:underline"
                >
                  Join Community &bull; Onboarding
                </button>
              </div>
            </motion.div>
          ) : (
            
            /* Credential Key Recovery */
            <motion.div
              key="forgot-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Recovery Portal</span>
                <h2 className="font-sans font-black text-2xl text-zinc-900 dark:text-white">Recover Credential Key</h2>
                <p className="text-xs text-zinc-400">Submit your institutional email to request a secure reset ticket link.</p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-center space-x-2">
                  <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. sabbir@bgi-community.org"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{submitting ? 'Routing Link...' : 'Send Recovery Ticket'}</span>
                </button>
              </form>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setScreen('login')}
                  className="text-[11px] text-zinc-400 hover:text-emerald-500 font-bold"
                >
                  Back to Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
