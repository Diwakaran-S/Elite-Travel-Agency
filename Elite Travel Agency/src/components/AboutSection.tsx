import React from 'react';
import { Target, Heart, Award, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const fleet = [
    {
      name: 'AURA ION SHUTTLE',
      type: 'Sub-Orbital Craft',
      propulsion: 'Helicon Plasma Ion Thruster',
      capacity: '8 Passengers (First Deck)',
      description: 'Main shuttle for terrestrial to sub-orbital orbital transits, offering zero-G drift capsules, luxury carbon fiber stabilizers, and active gravity-matching decks.'
    },
    {
      name: 'TRITON SUB-CARRIER',
      type: 'Hydro-Pressure Craft',
      propulsion: 'Superdynamic Hydro-compressor',
      capacity: '6 Passengers (Depth pods)',
      description: 'Deep trench pressure craft configured with double-layered crystal arches, bio-metric safety dampening systems, and high-intensity bio-luminescence spotlights.'
    }
  ];

  const values = [
    { title: 'Sovereign Seclusion', desc: 'Every path and lodging is vetted to guarantee absolute privacy, away from standard network footprints.', icon: Shield },
    { title: 'Organic Cohesion', desc: 'Our complexes merge with local topographies—from glaciers to red desert dunes—preserving the native ecological balance.', icon: Target },
    { title: 'Uncompromising Comfort', desc: 'No matter the severity of the planetary zone, enjoy climate-controlled thermal beds, personal butler drones, and 5-star cuisine.', icon: Heart }
  ];

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-blue tracking-tight uppercase">About Us</h1>
          <p className="font-sans text-sm text-neutral-400">
            Founded with a vision to redefine luxury. We engineer exclusive corridors where nature, physics, and architecture join in complete harmony.
          </p>
        </div>

        {/* CORE STATS BENTO MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <h2 className="font-display font-medium text-3xl uppercase tracking-tight text-neutral-200">
              Challenging the Boundaries of Transit
            </h2>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed">
              At Elite Travel Agency, we believe that travel is not merely about transportation—it is about crossing into alternate states of comfort. We do not use standard commercial frameworks.
            </p>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed">
              Every client profile is treated as a separate micro-quantum coordinate block. Our team of transit engineers, orbital pilots, and marine biologists work collectively to ensure every moment is safely guided.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900 font-mono">
              <div>
                <span className="text-2xl font-bold font-display text-neon-blue block">5</span>
                <span className="text-[10px] text-neutral-500 uppercase">Active Sectors</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-neon-pink block">100%</span>
                <span className="text-[10px] text-neutral-500 uppercase">Transit Security</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-neon-green block">24/7</span>
                <span className="text-[10px] text-neutral-500 uppercase">Drone Support</span>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-900 to-transparent">
            <div className="rounded-xl bg-[#0e0e16] p-8 space-y-6">
              <span className="font-mono text-[10px] text-neon-blue uppercase tracking-widest block">Core Principles</span>
              <div className="space-y-5">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded bg-black border border-neutral-800 flex items-center justify-center text-neon-blue">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-neutral-200">{v.title}</h4>
                        <p className="font-sans text-xs text-neutral-400 leading-relaxed pt-0.5">{v.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* FLEET CAPABILITIES */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="font-display font-medium text-3xl uppercase tracking-tight text-white">The Luxury Fleet</h2>
            <p className="font-sans text-sm text-neutral-400 max-w-lg mx-auto pt-2">
              Our vessels are constructed with carbon-epoxy composite armor and configured with super-magnetic anti-friction seals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fleet.map((craft, i) => (
              <div key={i} className="rounded-lg bg-cyber-card border border-neutral-900/80 p-8 space-y-4 hover:border-neutral-800 transition-colors">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                  <h3 className="font-display font-medium text-lg text-white font-bold">{craft.name}</h3>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black border border-neutral-800 text-neon-blue tracking-wider uppercase">
                    {craft.type}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-neutral-400">
                  <div>
                    <span className="text-neutral-500 uppercase block">Propulsion Array</span>
                    <span className="text-neutral-200">{craft.propulsion}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase block">Payload Space</span>
                    <span className="text-neutral-200">{craft.capacity}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-neutral-400 leading-relaxed pt-2">
                  {craft.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
