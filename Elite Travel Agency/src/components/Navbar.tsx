import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, Home, Image, Calendar, Package, Cpu, Landmark, Mail, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'ai-agent', label: 'AI Travel Agent', icon: Cpu },
    { id: 'about', label: 'About', icon: Landmark },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ] as const;

  const handleNavClick = (tabId: ActiveTab) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex flex-col cursor-pointer"
          >
            <span className="font-display font-medium tracking-wide text-lg text-white">
              Elite Travel Agency
            </span>
            <p className="text-[9px] text-neutral-500 tracking-[0.25em] font-mono leading-none uppercase">Future Transits</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-md font-display text-sm tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer outline-none select-none
                    ${isActive 
                      ? 'text-white' 
                      : 'text-neutral-400 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-3.5 h-3.5 transition-all duration-200 ${isActive ? 'text-neon-blue' : 'text-neutral-500'}`} />
                  <span>{item.label}</span>
                  
                  {/* Subtle hover neon bar */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-300 rounded-full bg-neon-blue ${isActive ? 'w-2/3 shadow-[0_0_8px_#00f0ff]' : 'group-hover:w-1/3'}`}></div>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neon-blue"
            >
              <span className="sr-only">Open Menu</span>
              {isOpen ? <X className="w-6 h-6 text-neon-blue" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-cyber-dark border-b border-neutral-900"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-display text-base transition-all duration-200 outline-none
                      ${isActive 
                        ? 'bg-neutral-950 text-white border-l-2 border-neon-blue shadow-neon-blue/10' 
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                      }
                    `}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-neon-blue' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_6px_#00f0ff]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
