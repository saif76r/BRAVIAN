import React from 'react';
import { MapPin, Phone, Facebook, Instagram, ArrowUpRight, ChevronRight } from 'lucide-react';
import { DEPARTMENTS } from '../data';
import bgiLogo from '../assets/images/bgi_logo_1783613714921.png';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-900 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden">
                <img src={bgiLogo} alt="BGI Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                BGI <span className="text-sky-400">Community</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Creating a world-class collaborative platform for talent incubation, academic research, sports excellence, and community mutual relief efforts.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=100093125752073" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-sky-400 dark:hover:text-sky-450 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/bravian_youth/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-sky-400 dark:hover:text-sky-450 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: 'Know BGI', view: 'about-know' },
                { label: 'Leadership', view: 'leadership' },
                { label: 'Media Gallery', view: 'gallery' },
                { label: 'Activities Portal', view: 'activities' }
              ].map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigate(link.view)} 
                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-sky-400 dark:hover:text-sky-450 hover:translate-x-1 transition-all flex items-center"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-zinc-300 dark:text-zinc-700" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments Grid Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Selected Nodes</h3>
            <ul className="grid grid-cols-2 gap-2">
              {DEPARTMENTS.slice(0, 8).map(dept => (
                <li key={dept.id}>
                  <button 
                    onClick={() => onNavigate(`dept-${dept.id}`)} 
                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-sky-400 dark:hover:text-sky-450 truncate max-w-[120px] text-left block"
                  >
                    {dept.name.replace(' Department', '')}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => onNavigate('departments')} 
                  className="text-xs text-sky-400 dark:text-sky-450 hover:underline font-semibold flex items-center"
                >
                  All 13 Nodes
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Connect With Us</h3>
            
            <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>BGI Plaza, Level 4, Academic Hub</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+880 1712-345678</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-200 dark:bg-zinc-900 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} BGI Community. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <button className="hover:text-sky-400">Privacy Policy</button>
            <button className="hover:text-sky-400">Terms &amp; Conditions</button>
            <a href="https://bgi-community.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center font-semibold">
              Official Console
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}