import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, CheckCircle2, Send, ExternalLink } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Web3Forms API এর মাধ্যমে ইমেইল পাঠানোর অবজেক্ট তৈরি
    const submissionData = {
      ...formData,
      // আপনার ইমেইলে সরাসরি মেসেজ পাঠানোর জন্য Web3Forms এর public access key
      access_key: "de5b1775-6b14-4055-9845-be68089a583a" 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      const resData = await response.json();

      if (resData.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Communication Gateway</span>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">Contact Our HQ Desk</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Get in touch with BGI administration, request collaboration partnerships, or check office hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info and Custom Styled Map Block */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-sans font-extrabold text-lg text-zinc-850 dark:text-white">Headquarters Information</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Our physical hub is open to current students, alumni mentors, and corporate partnership managers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><MapPin className="w-4 h-4" /></div>
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">BGI Plaza</h4>
              <p className="text-[11px] text-zinc-400">Uttarati, Dhaka Division, Bangladesh</p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500"><Clock className="w-4 h-4" /></div>
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Office Hours</h4>
              <p className="text-[11px] text-zinc-400">Saturday - Thursday: 09:00 AM - 05:00 PM</p>
            </div>
          </div>

          {/* Premium Custom Map Layout with Social Media Links */}
          <div className="relative rounded-2xl overflow-hidden h-64 border border-zinc-200 dark:border-zinc-800 shadow-lg bg-zinc-100 dark:bg-zinc-900 flex flex-col justify-between p-6">
            <div className="absolute inset-0 bg-[radial-gradient(#10b98120_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
            
            <div className="z-10 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider block">Realtime Location Tracker</span>
                <h4 className="text-xs font-extrabold text-zinc-800 dark:text-white">BGI Community headquarters</h4>
              </div>
              
              {/* Social Media Links Area */}
              <div className="flex items-center space-x-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
                <a 
                  href="https://www.facebook.com/profile.php?id=100093125752073" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-zinc-500 hover:text-emerald-500 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/bravian_youth/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-zinc-500 hover:text-emerald-500 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800 flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">Coordinates</span>
                <span className="font-mono font-bold text-zinc-850 dark:text-zinc-200 text-[11px]">23.7949&deg; N, 90.4043&deg; E</span>
              </div>
              <a 
                href="https://maps.google.com/?q=Dhaka,+Bangladesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center space-x-1"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Block */}
        <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 bg-white dark:bg-zinc-950/55 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase block">Interactive Form</span>
            <h3 className="font-sans font-extrabold text-lg text-zinc-900 dark:text-white">Send Us a Direct Message</h3>
          </div>

          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Message Dispatched!</h4>
              <p className="text-[10px] text-zinc-400 max-w-xs mx-auto">Thank you for writing. BGI Communications department representatives will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Sabbir Rahman"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. sabbir@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Subject Topic</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Collaboration Request, Event Sponsorship"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:border-emerald-500 h-28 resize-none"
                  placeholder="Describe your query in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}