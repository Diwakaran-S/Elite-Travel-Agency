import React from 'react';
import { ActiveTab } from '../types';
import { Globe, Github, Twitter, Youtube, Send, ShieldAlert, Cpu, Heart } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/5 py-12 overflow-hidden">
      
      {/* Background grid accents */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Brand Info */}
        <div className="space-y-4 max-w-xl flex flex-col items-center">
          <div className="cursor-pointer" onClick={() => onTabChange('home')}>
            <span className="font-display font-medium tracking-widest text-lg text-white uppercase">
              Elite Travel Agency
            </span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed font-sans">
            Elite Travel Agency coordinates hyper-luxury transits across oceanic depths, metropolitan cyber-kingdoms, pristine bio-domes, and celestial sectors. Powered by quantum scheduling.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <a href="#twitter" aria-label="Twitter Uplink" className="w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neon-pink hover:border-neon-pink transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#youtube" aria-label="YouTube Stream" className="w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neon-blue hover:border-neon-blue transition-all duration-300">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#github" aria-label="GitHub Source" className="w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neon-green hover:border-neon-green transition-all duration-300">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="w-full pt-8 border-t border-neutral-900 flex justify-center font-mono text-[10px] text-neutral-500">
          <div>
            <span>© {currentYear} ELITE TRAVEL AGENCY. NO RIGHTS RESERVED.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
