import React, { useState, useEffect } from 'react';
import { ActiveTab, TravelPackage } from '../types';
import { TRAVEL_PACKAGES } from '../data';
import { ArrowUpRight, ShieldCheck, Activity, Compass, Users, Sparkles, AlertCircle, Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  onTabChange: (tab: ActiveTab) => void;
  onSelectPackage: (pkg: TravelPackage) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'bg-neon-blue/40 shadow-[0_0_10px_rgba(0,240,255,0.5)]',
      'bg-neon-pink/40 shadow-[0_0_10px_rgba(255,0,127,0.5)]',
      'bg-neon-purple/40 shadow-[0_0_10px_rgba(180,0,255,0.5)]',
      'bg-neon-green/30 shadow-[0_0_10px_rgba(0,255,100,0.4)]',
    ];
    const generated = Array.from({ length: 135 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3.5 + 1.5, // 1.5px to 5px for varied depth
      duration: Math.random() * 15 + 15, // 15 to 30s
      delay: Math.random() * -30, // negative delay so they are pre-spread on load
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[750px] sm:h-[950px] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -220, 0],
            x: [0, Math.sin(p.id) * 80, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.4, 0.7, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HomeSection({ onTabChange, onSelectPackage }: HomeSectionProps) {
  const featured = TRAVEL_PACKAGES.slice(0, 3);
  const [activeVibeId, setActiveVibeId] = useState<string>(TRAVEL_PACKAGES[0].id);
  const activePackage = TRAVEL_PACKAGES.find(p => p.id === activeVibeId) || TRAVEL_PACKAGES[0];

  const keyValues = [
    {
      title: 'Private Aviation Access',
      description: 'Step directly from limousine to a fully chartered, ultra-quiet jet arranged exclusively for your itinerary.',
      icon: Compass,
      colorClass: 'text-neon-blue border-neon-blue/30 bg-cyber-card shadow-neon-blue/5'
    },
    {
      title: 'Bespoke Personal Butler',
      description: 'Your single point of contact coordinates private reservations, dietary requirements, and exact room temperatures.',
      icon: Sparkles,
      colorClass: 'text-neon-pink border-neon-pink/30 bg-cyber-card shadow-neon-pink/5'
    },
    {
      title: 'Absolute Discretion & Safety',
      description: 'Fully randomized transport manifests, private estate gates, and highly trained personnel guarantee peace of mind.',
      icon: ShieldCheck,
      colorClass: 'text-neon-green border-neon-green/30 bg-cyber-card shadow-neon-green/5'
    }
  ];

  return (
    <div className="relative py-24 min-h-screen overflow-hidden text-white">
      
      {/* Absolute backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      
      {/* Decorative blurred backdrops */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-[450px] h-[450px] bg-neon-pink/5 rounded-full blur-[160px] pointer-events-none"></div>
      
      {/* Floating Particle Background */}
      <HeroParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center space-y-8 mt-10">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl text-glow-blue leading-tight"
          >
            From Dream Destinations <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-pink text-glow-pink">
              to Elite Experiences
            </span>
          </motion.h1>

          {/* Aesthetic elegant divider lines */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-neutral-400 font-sans text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            Elite Travel Agency coordinates exceptional, high-end travel journeys to the world’s most breathtaking and exclusive retreats. Discover your next unforgettable escape with unmatched service and care.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
          >
            <button
              onClick={() => onTabChange('packages')}
              className="px-8 py-3.5 rounded bg-neon-blue text-black font-display font-bold text-sm tracking-widest uppercase hover:bg-white hover:shadow-neon-blue hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Explore Packages</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button
              onClick={() => onTabChange('bookings')}
              className="px-8 py-3.5 rounded bg-black border border-white/10 hover:border-neon-pink hover:text-neon-pink hover:shadow-neon-pink text-white font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch Booking Console</span>
            </button>
          </motion.div>

          {/* INTERACTIVE SECTOR PREVIEW PORTAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl mx-auto pt-10"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-1">
                <span className="font-mono text-[10px] text-neon-blue uppercase tracking-[0.25em] block">Interactive Exploration</span>
                <h3 className="font-display font-medium text-lg text-white uppercase tracking-wider">Preview Active Sectors</h3>
              </div>
              
              {/* Active Sector selection tabs */}
              <div className="flex flex-wrap justify-center gap-2 p-1 rounded-lg bg-neutral-950/80 border border-white/5 backdrop-blur-md max-w-full">
                {TRAVEL_PACKAGES.map((pkg) => {
                  const isActive = activeVibeId === pkg.id;
                  const activeStyle = pkg.neonColor === 'blue' 
                    ? 'border-neon-blue/40 text-neon-blue bg-neon-blue/5 shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                    : pkg.neonColor === 'pink'
                    ? 'border-neon-pink/40 text-neon-pink bg-neon-pink/5 shadow-[0_0_15px_rgba(255,0,127,0.05)]'
                    : pkg.neonColor === 'green'
                    ? 'border-neon-green/40 text-neon-green bg-neon-green/5 shadow-[0_0_15px_rgba(0,255,100,0.05)]'
                    : 'border-neon-purple/40 text-neon-purple bg-neon-purple/5 shadow-[0_0_15px_rgba(180,0,255,0.05)]';
                    
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setActiveVibeId(pkg.id)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer hover:border-white/25 ${
                        isActive 
                          ? `${activeStyle} border-current font-bold`
                          : 'border-transparent text-neutral-400 hover:text-white'
                      }`}
                    >
                      {pkg.vibe}
                    </button>
                  );
                })}
              </div>

              {/* Live interactive preview portal */}
              <div className="w-full rounded-xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 border border-white/5 p-5 sm:p-7 flex flex-col md:flex-row gap-6 items-center text-left relative overflow-hidden group/portal shadow-2xl">
                <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
                
                {/* Decorative spotlight based on package neon color */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-25 transition-all duration-700 ${
                  activePackage.neonColor === 'blue' ? 'bg-neon-blue'
                  : activePackage.neonColor === 'pink' ? 'bg-neon-pink'
                  : activePackage.neonColor === 'green' ? 'bg-neon-green'
                  : 'bg-neon-purple'
                }`}></div>

                {/* Left image */}
                <div className="w-full md:w-2/5 aspect-[4/3] rounded-lg overflow-hidden border border-white/10 relative bg-neutral-900 shadow-md">
                  <img 
                    src={activePackage.image} 
                    alt={activePackage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/portal:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 font-mono text-[9px] text-white tracking-widest uppercase">
                    <MapPin className="w-3 h-3 text-neon-blue" />
                    <span>{activePackage.vibe} Target</span>
                  </div>
                </div>

                {/* Right content */}
                <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                        Sector Protocol &bull; {activePackage.duration}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                        <Star className="w-3 h-3 fill-neon-pink text-neon-pink animate-pulse" />
                        <span>{activePackage.rating.toFixed(2)} Rating</span>
                      </div>
                    </div>
                    
                    <h4 className="font-display font-medium text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight">
                      {activePackage.title}
                    </h4>
                    
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed min-h-[3.5rem]">
                      {activePackage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[9px] text-neutral-500 uppercase tracking-widest">All-Inclusive Pass</span>
                      <span className="font-display font-bold text-lg sm:text-xl text-white">
                        ${activePackage.price.toLocaleString()} <span className="font-sans text-xs font-normal text-neutral-400">/ traveler</span>
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectPackage(activePackage)}
                        className={`px-4 py-2.5 rounded font-mono text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 border flex items-center gap-1.5 ${
                          activePackage.neonColor === 'blue' ? 'border-neon-blue/30 text-neon-blue bg-neon-blue/5 hover:bg-neon-blue hover:text-black'
                          : activePackage.neonColor === 'pink' ? 'border-neon-pink/30 text-neon-pink bg-neon-pink/5 hover:bg-neon-pink hover:text-black'
                          : activePackage.neonColor === 'green' ? 'border-neon-green/30 text-neon-green bg-neon-green/5 hover:bg-neon-green hover:text-black'
                          : 'border-neon-purple/30 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple hover:text-black'
                        }`}
                      >
                        <span>Select Package</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* FEATURED DESTINATIONS */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">Active Elite Portals</h2>
            </div>
            <button 
              onClick={() => onTabChange('packages')}
              className="font-mono text-xs text-neon-blue hover:text-white uppercase tracking-widest cursor-pointer flex items-center gap-1 group self-start transition-colors"
            >
              <span>View all 5 premium sectors</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((pkg, index) => {
              const pulseColor = pkg.neonColor === 'blue' ? 'border-neon-blue/20 hover:border-neon-blue shadow-neon-blue/5' 
                : pkg.neonColor === 'pink' ? 'border-neon-pink/20 hover:border-neon-pink shadow-neon-pink/5'
                : 'border-neon-green/20 hover:border-neon-green shadow-neon-green/5';

              const btnColor = pkg.neonColor === 'blue' ? 'group-hover:text-neon-blue'
                : pkg.neonColor === 'pink' ? 'group-hover:text-neon-pink'
                : 'group-hover:text-neon-green';

              return (
                <div
                  key={pkg.id}
                  className={`group rounded-lg bg-cyber-card border ${pulseColor} overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col`}
                >
                  {/* Image banner */}
                  <div className="relative h-64 overflow-hidden bg-neutral-900">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-90"></div>
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white tracking-widest uppercase">
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Body content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500">
                        <span>{pkg.vibe.toUpperCase()} TRANSIT</span>
                        <span className="text-white">★ {pkg.rating.toFixed(2)}</span>
                      </div>
                      <h3 className="font-display font-medium text-xl text-neutral-100 transition-colors group-hover:text-white uppercase tracking-tight">
                        {pkg.title}
                      </h3>
                      <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pricing Core</p>
                        <p className="font-display font-bold text-lg text-white">
                          ${pkg.price.toLocaleString()}<span className="text-xs text-neutral-400 font-normal">/pp</span>
                        </p>
                      </div>
                      
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer text-neutral-400 ${btnColor} flex items-center gap-1`}
                      >
                        <span>Select Transit</span>
                        <span className="text-sm font-sans">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LUXURY AMENITIES GRID */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">An Uncompromising Standard of Care</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyValues.map((kv, index) => {
              const Icon = kv.icon;
              return (
                <div key={index} className={`rounded-xl border p-8 space-y-4 transition-all duration-300 bg-neutral-950/20 hover:bg-neutral-950/50 hover:scale-[1.02] ${kv.colorClass}`}>
                  <div className="flex items-center justify-center w-12 h-12 rounded bg-black/60 border border-neutral-800">
                    <Icon className="w-6 h-6 text-inherit" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-neutral-200">{kv.title}</h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">{kv.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PHILOSOPHY & STATS SUMMARY */}
        <div className="p-8 sm:p-10 rounded-xl bg-cyber-card border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="space-y-4 max-w-xl">
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-white uppercase tracking-tight">The Art of the Journey</h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                At Elite Travel Agency, we believe travel is a deeply personal dialogue between you and the destination. We reject standard packages and mass templates, designing every itinerary from scratch with complete attention to detail, luxury, and security.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto text-center">
              <div className="p-5 rounded bg-black/60 border border-neutral-900/60 min-w-[140px] space-y-1">
                <span className="font-display font-bold text-2xl text-neon-blue block">120+</span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Global Estates</span>
              </div>
              <div className="p-5 rounded bg-black/60 border border-neutral-900/60 min-w-[140px] space-y-1">
                <span className="font-display font-bold text-2xl text-neon-pink block">100%</span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Bespoke Design</span>
              </div>
              <div className="p-5 rounded bg-black/60 border border-neutral-900/60 min-w-[140px] space-y-1">
                <span className="font-display font-bold text-2xl text-neon-green block">4.97★</span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Satisfaction Score</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
