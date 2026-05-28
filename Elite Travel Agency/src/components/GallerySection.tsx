import React, { useState } from 'react';
import { GalleryItem, TravelPackage, ActiveTab } from '../types';
import { GALLERY_ITEMS } from '../data';
import { Filter, Eye, X, Copy, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  onSelectVibeTab: (vibe: string) => void;
  onTabChange: (tab: ActiveTab) => void;
}

type VibeFilter = 'All' | 'Cybercity' | 'Abyss' | 'Celestial' | 'Sovereign' | 'Eco-Dome';

export default function GallerySection({ onSelectVibeTab, onTabChange }: GallerySectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<VibeFilter>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const filterOptions: VibeFilter[] = [
    'All', 'Cybercity', 'Abyss', 'Celestial', 'Sovereign', 'Eco-Dome'
  ];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.vibe === selectedFilter);

  const handleCopyLink = (coords: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedIndex(coords);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleBookWithVibe = (vibe: string) => {
    onSelectVibeTab(vibe);
    setSelectedItem(null);
  };

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-blue tracking-tight uppercase">choose your destination</h1>
          <p className="font-sans text-sm text-neutral-400">
            A hand-picked collection of actual moments captured across our exclusive, elite global estates, secluded beaches, and historic retreats.
          </p>
        </div>

        {/* CONTROLS & FILTER GRID */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto pt-4 border-b border-neutral-900 pb-8">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            const activeStyle = filter === 'Cybercity' ? 'border-neon-pink text-neon-pink shadow-neon-pink/20'
              : filter === 'Abyss' ? 'border-neon-blue text-neon-blue shadow-neon-blue/20'
              : filter === 'Celestial' ? 'border-neon-purple text-neon-purple shadow-neon-purple/20'
              : filter === 'Eco-Dome' ? 'border-neon-green text-neon-green shadow-neon-green/20'
              : 'border-white text-white';

            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded font-mono text-[11px] tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer border
                  ${isActive 
                    ? `bg-black/80 ${activeStyle}` 
                    : 'bg-neutral-950/20 text-neutral-400 border-transparent hover:border-neutral-800 hover:text-white'
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* GALLERIES INTERACTIVE Bento GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const borderOnVibe = item.vibe === 'Abyss' ? 'hover:border-neon-blue'
                : item.vibe === 'Cybercity' ? 'hover:border-neon-pink'
                : item.vibe === 'Eco-Dome' ? 'hover:border-neon-green'
                : 'hover:border-neon-purple';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative h-96 rounded-lg bg-cyber-card border border-neutral-900/60 overflow-hidden cursor-pointer ${borderOnVibe} transition-all duration-300`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Neon vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-10" />

                  {/* Visual metadata overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 space-y-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/80 border border-neutral-800 text-neutral-400 uppercase tracking-widest">
                      {item.vibe}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight pt-1">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[9px] text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-neutral-600" />
                      <span>{item.location}</span>
                    </p>
                    <p className="font-sans text-[11px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Absolute visual hover icon overlay */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded bg-black/80 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Eye className="w-4 h-4 text-neon-blue" />
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 rounded-lg bg-cyber-card border border-neutral-900">
            <span className="text-glow-pink text-neon-pink">No assets match your search coordinates.</span>
          </div>
        )}

        {/* MODAL VIEW SYSTEM */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.92, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 10 }}
                transition={{ type: 'spring', damping: 25 }}
                className={`relative w-full max-w-4xl bg-cyber-dark border rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row
                  ${selectedItem.vibe === 'Abyss' ? 'border-neon-blue/40 shadow-neon-blue/10'
                    : selectedItem.vibe === 'Cybercity' ? 'border-neon-pink/40 shadow-neon-pink/10'
                    : selectedItem.vibe === 'Eco-Dome' ? 'border-neon-green/40 shadow-neon-green/10'
                    : 'border-neon-purple/40 shadow-neon-purple/10'
                  }
                `}
              >
                
                {/* Visual side */}
                <div className="md:w-3/5 h-64 md:h-auto max-h-[500px] relative bg-neutral-950">
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/85 border border-white/10 text-white uppercase tracking-widest">
                      Exclusive Estate View
                    </span>
                  </div>
                </div>

                {/* Content description side */}
                <div className="md:w-2/5 p-8 flex flex-col justify-between space-y-6">
                  
                  {/* Close link */}
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black border border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
                      <Sparkles className="w-3 h-3 text-neon-blue" />
                      <span className="text-neutral-300">{selectedItem.vibe}</span>
                    </div>

                    <h2 className="font-display font-bold text-2.5xl tracking-tight text-white uppercase">
                      {selectedItem.title}
                    </h2>

                    <p className="font-mono text-[10px] text-neutral-500 leading-none">
                      {selectedItem.location}
                    </p>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed pt-2">
                      {selectedItem.description}
                    </p>

                    {/* Coordinates box */}
                    <div className="p-3.5 rounded bg-neutral-950 border border-neutral-900 space-y-1 pb-4">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">DESTINATION TELEMETRY</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-neon-blue truncate">{selectedItem.coordinates}</span>
                        <button
                          onClick={() => handleCopyLink(selectedItem.coordinates)}
                          className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                          title="Copy reference coordinates"
                        >
                          <Copy className="w-3.1 h-3.1" />
                        </button>
                      </div>
                      {copiedIndex && (
                        <span className="font-mono text-[9px] text-neon-green block">Coordinates copied to clipboard.</span>
                      )}
                    </div>
                  </div>

                  {/* Actions leading with vibe criteria */}
                  <button
                    onClick={() => handleBookWithVibe(selectedItem.vibe)}
                    className="w-full py-3 rounded bg-white text-black font-display font-bold text-xs tracking-widest uppercase hover:bg-neon-blue hover:text-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Inspect {selectedItem.vibe} Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
