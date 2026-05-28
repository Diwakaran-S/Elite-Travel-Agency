import React, { useState } from 'react';
import { TravelPackage } from '../types';
import { TRAVEL_PACKAGES } from '../data';
import { Calendar, Tag, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  selectedVibeFilter: string;
  onClearVibeFilter: () => void;
}

export default function PackagesSection({ onSelectPackage, selectedVibeFilter, onClearVibeFilter }: PackagesSectionProps) {
  const [filter, setFilter] = useState<string>('All');

  // Handle passed filter from the gallery section
  const activeFilter = selectedVibeFilter !== '' ? selectedVibeFilter : filter;

  const filters = ['All', 'Abyss', 'Cybercity', 'Celestial', 'Sovereign', 'Eco-Dome'];

  const handleFilterClick = (f: string) => {
    onClearVibeFilter();
    setFilter(f);
  };

  const filteredPackages = activeFilter === 'All'
    ? TRAVEL_PACKAGES
    : TRAVEL_PACKAGES.filter(pkg => pkg.vibe.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-pink tracking-tight uppercase">premium packages</h1>
          <p className="font-sans text-sm text-neutral-400">
            Secure high-end packages engineered for absolute novelty, pristine seclusion, and maximum comfort across our active sectors.
          </p>
        </div>

        {/* FEED FILTERS */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto pt-4 border-b border-neutral-900 pb-8">
          {filters.map((f) => {
            const isActive = activeFilter.toLowerCase() === f.toLowerCase();
            const glowText = f === 'Abyss' ? 'border-neon-blue text-neon-blue shadow-neon-blue/15'
              : f === 'Cybercity' ? 'border-neon-pink text-neon-pink shadow-neon-pink/15'
              : f === 'Celestial' ? 'border-neon-purple text-neon-purple shadow-[0_0_15px_rgba(146,0,230,0.15)]'
              : f === 'Eco-Dome' ? 'border-neon-green text-neon-green shadow-neon-green/15'
              : 'border-white text-white';

            return (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className={`px-4 py-2 rounded font-mono text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer border
                  ${isActive 
                    ? `bg-black/95 ${glowText}` 
                    : 'bg-neutral-950/20 text-neutral-400 border-transparent hover:border-neutral-800 hover:text-white'
                  }
                `}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* ACTIVE PASSED FILTER ALERT */}
        {selectedVibeFilter && (
          <div className="max-w-xl mx-auto bg-neon-blue/10 border border-neon-blue/30 rounded p-3 flex items-center justify-between font-mono text-xs">
            <span className="text-neon-blue">FILTER CORNER DELEGATED VIA GALLERY: {selectedVibeFilter.toUpperCase()}</span>
            <button 
              onClick={onClearVibeFilter}
              className="text-neutral-400 hover:text-white underline cursor-pointer"
            >
              Reset view
            </button>
          </div>
        )}

        {/* PACKAGES CONTAINER */}
        <div className="space-y-16">
          {filteredPackages.map((pkg, index) => {
            const isEven = index % 2 === 0;
            
            // Assign neon themes
            const glowBorder = pkg.neonColor === 'blue' ? 'border-neon-blue/20 hover:border-neon-blue/70 shadow-neon-blue/5'
              : pkg.neonColor === 'pink' ? 'border-neon-pink/20 hover:border-neon-pink/70 shadow-neon-pink/5'
              : pkg.neonColor === 'green' ? 'border-neon-green/20 hover:border-neon-green/70 shadow-neon-green/5'
              : 'border-neon-purple/20 hover:border-neon-purple/70 shadow-neon-purple/5';

            const bgGlowTheme = pkg.neonColor === 'blue' ? 'text-neon-blue bg-neon-blue/10 border-neon-blue/30'
              : pkg.neonColor === 'pink' ? 'text-neon-pink bg-neon-pink/10 border-neon-pink/30'
              : pkg.neonColor === 'green' ? 'text-neon-green bg-neon-green/10 border-neon-green/30'
              : 'text-neon-purple bg-neon-purple/10 border-neon-purple/30';

            const ctaBorder = pkg.neonColor === 'blue' ? 'bg-neon-blue text-black hover:bg-white hover:shadow-neon-blue'
              : pkg.neonColor === 'pink' ? 'bg-neon-pink text-black hover:bg-white hover:shadow-neon-pink'
              : pkg.neonColor === 'green' ? 'bg-neon-green text-black hover:bg-white hover:shadow-neon-green'
              : 'bg-neon-purple text-black hover:bg-white hover:shadow-neon-purple';

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`rounded-xl bg-cyber-card border ${glowBorder} overflow-hidden p-6 sm:p-10 flex flex-col lg:flex-row gap-10 transition-all duration-500`}
              >
                
                {/* Visual Cover image */}
                <div className={`lg:w-1/2 aspect-video lg:aspect-auto h-72 sm:h-96 rounded-lg overflow-hidden relative bg-neutral-900 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-80 hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
                    <span className="font-mono text-[9px] text-neutral-400">SECTOR ARCHITECTURAL GRID</span>
                    <span className="font-mono text-xs text-white tracking-widest">{pkg.duration.toUpperCase()}</span>
                  </div>
                </div>

                {/* Bundle stats info */}
                <div className="lg:w-1/2 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded font-mono text-[9px] tracking-widest uppercase border ${bgGlowTheme}`}>
                        {pkg.vibe}
                      </span>
                      <span className="font-mono text-xs text-neutral-400">★ {pkg.rating.toFixed(2)} Rank</span>
                    </div>

                    <h2 className="font-display font-medium text-3xl text-neutral-100 tracking-tight uppercase">
                      {pkg.title}
                    </h2>

                    <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Highlights bullet grid */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">EXCLUSIONS & HIGHLIGHTS</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-neutral-300">
                        {pkg.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-neon-pink mt-0.5">•</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Standard Perks */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">SECURED PRIVILEGES</span>
                      <div className="flex flex-wrap gap-2">
                        {pkg.perks.map((p, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-sm bg-neutral-950 border border-neutral-900 text-[10px] font-mono text-neutral-400">
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing footer block */}
                  <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">COMMERCIAL VALUATION</span>
                      <span className="font-display font-bold text-3xl text-white">
                        ${pkg.price.toLocaleString()}
                        <span className="text-xs text-neutral-400 font-normal"> / transit base (USD)</span>
                      </span>
                    </div>
                    
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className={`px-6 py-3 rounded font-display font-bold text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${ctaBorder}`}
                    >
                      <span>Load into Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
