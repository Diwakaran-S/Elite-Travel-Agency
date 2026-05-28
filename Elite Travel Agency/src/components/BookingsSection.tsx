import React, { useState, useEffect } from 'react';
import { BookingFormState, TravelPackage } from '../types';
import { TRAVEL_PACKAGES } from '../data';
import { Calendar, Users, Shield, Cpu, Sparkles, Check, ChevronRight, RefreshCw, Barcode, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingsSectionProps {
  selectedPackage: TravelPackage | null;
  onClearPackage: () => void;
}

export default function BookingsSection({ selectedPackage, onClearPackage }: BookingsSectionProps) {
  // Setup state pre-filled if a package was selected from Home/Packages
  const [formData, setFormData] = useState<BookingFormState>({
    destinationId: selectedPackage ? selectedPackage.id : TRAVEL_PACKAGES[0].id,
    fullName: '',
    email: '',
    departureDate: '2026-06-15',
    durationDays: selectedPackage ? 6 : 5,
    classTier: 'standard',
    quantumShielding: false,
    neuralTranslation: false,
    companionCount: 0,
  });

  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketHash, setTicketHash] = useState('');

  // Sync state if selected package changes in parent
  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        destinationId: selectedPackage.id,
        durationDays: parseInt(selectedPackage.duration.split(' ')[0], 10) || 6,
      }));
    }
  }, [selectedPackage]);

  const activePackage = TRAVEL_PACKAGES.find(pkg => pkg.id === formData.destinationId) || TRAVEL_PACKAGES[0];

  // Price calculations
  const calculateInvoice = () => {
    const basePrice = activePackage.price;
    const travelerMultiplier = formData.companionCount + 1;
    let tierMarkup = 0;
    if (formData.classTier === 'orbital') tierMarkup = 8500;
    if (formData.classTier === 'quantum') tierMarkup = 24000;

    let extrasPrice = 0;
    if (formData.quantumShielding) extrasPrice += 1200;
    if (formData.neuralTranslation) extrasPrice += 800;

    const pricePerPersonWithTier = basePrice + tierMarkup;
    const totalWithExtras = (pricePerPersonWithTier * travelerMultiplier) + extrasPrice;

    return {
      basePrice,
      tierMarkup,
      travelerMultiplier,
      extrasPrice,
      total: totalWithExtras
    };
  };

  const invoice = calculateInvoice();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'quantumShielding' | 'neuralTranslation') => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCompanionChange = (amount: number) => {
    const count = Math.max(0, Math.min(10, formData.companionCount + amount));
    setFormData(prev => ({ ...prev, companionCount: count }));
  };

  // Simulated Launch system
  const handleLaunchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      return;
    }

    setIsLaunching(true);
    setLaunchStep(1);

    // Sequence timer step 1
    setTimeout(() => {
      setLaunchStep(2);
    }, 1200);

    // Sequence timer step 2
    setTimeout(() => {
      setLaunchStep(3);
    }, 2400);

    // Sequence timer step 3 (Show Ticket)
    setTimeout(() => {
      const generatedHash = `ELT-${Math.random().toString(36).substr(2, 9).toUpperCase()}-${new Date().getFullYear()}`;
      setTicketHash(generatedHash);
      setIsLaunching(false);
      setShowTicket(true);
    }, 3800);
  };

  const resetConsole = () => {
    setFormData({
      destinationId: TRAVEL_PACKAGES[0].id,
      fullName: '',
      email: '',
      departureDate: '2026-06-15',
      durationDays: 5,
      classTier: 'standard',
      quantumShielding: false,
      neuralTranslation: false,
      companionCount: 0,
    });
    setLaunchStep(0);
    setShowTicket(false);
    onClearPackage();
  };

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-blue tracking-tight uppercase">Booking Console</h1>
          <p className="font-sans text-sm text-neutral-400">
            Design your custom voyage profile, calibrate structural margins, and generate secure passage vectors.
          </p>
        </div>

        {/* ACTIVE SEQUENCING VIEWS */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. LAUNCH LOADING PHASE */}
            {isLaunching && (
              <motion.div
                key="launching"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-16 text-center space-y-8 rounded-xl bg-cyber-card border border-neon-blue/30 p-10 shadow-neon-blue"
              >
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-neutral-900 border-t-neon-blue animate-spin"></div>
                  <Cpu className="w-8 h-8 text-neon-blue animate-pulse" />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs text-neon-blue uppercase tracking-widest block">UPLINKING VECTOR DATA</span>
                  <h3 className="font-display font-bold text-2xl uppercase">
                    {launchStep === 1 && 'Calibrating Sub-Orbit Coordinates...'}
                    {launchStep === 2 && 'Decompressing Suite Pressure Locks...'}
                    {launchStep === 3 && 'Authorizing Quantum Security Gaskets...'}
                  </h3>
                  <div className="max-w-xs mx-auto bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                    <motion.div 
                      className="bg-neon-blue h-full"
                      initial={{ width: '0%' }}
                      animate={{ width: launchStep === 1 ? '35%' : launchStep === 2 ? '70%' : '100%' }}
                      transition={{ duration: 1.1 }}
                    />
                  </div>
                </div>

                <p className="font-mono text-[10px] text-neutral-500 max-w-sm mx-auto">
                  Transmission established via Cloud Run secure node. Encrypting ticket details on local sovereign ledger stack.
                </p>
              </motion.div>
            )}

            {/* 2. SUCCESS TICKET PASS */}
            {showTicket && (
              <motion.div
                key="ticket"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto rounded-xl bg-neutral-950 border border-neon-green/40 shadow-neon-green/10 overflow-hidden relative"
              >
                {/* Border line */}
                <div className="h-1.5 w-full bg-neon-green"></div>

                <div className="p-8 sm:p-10 space-y-8">
                  
                  {/* Top stamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
                    <div>
                      <span className="font-mono text-[9px] text-neon-green uppercase tracking-widest block">BOARDING VOYAGE AUTH</span>
                      <h4 className="font-display font-bold text-xl text-neutral-200 uppercase">ELITE TRANSIT PASS</h4>
                    </div>
                    <div className="font-mono text-right text-xs">
                      <span className="text-neutral-500 block">TRANSACTION HASH</span>
                      <span className="text-neon-green font-bold text-sm tracking-widest">{ticketHash}</span>
                    </div>
                  </div>

                  {/* Body values */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">PASSENGER NAME</span>
                      <span className="font-display font-medium text-sm text-white uppercase">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neon-green uppercase tracking-widest block">DESTINATION PORTAL</span>
                      <span className="font-display font-medium text-sm text-white uppercase">{activePackage.title}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TRANSIT SECTOR</span>
                      <span className="font-mono text-xs text-white">{activePackage.vibe.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">DEPARTURE CYCLE</span>
                      <span className="font-mono text-xs text-white">{formData.departureDate}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">SUITE CLASS TIER</span>
                      <span className="font-mono text-xs text-white uppercase">{formData.classTier} CLASS</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TRAVEL COMPANIONS</span>
                      <span className="font-mono text-xs text-white">{formData.companionCount} ADDITIONAL</span>
                    </div>
                  </div>

                  {/* Extras log */}
                  <div className="p-4 rounded bg-neutral-900/50 border border-neutral-900 space-y-2">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase">INTEGRATED STRUCTURAL SHIELDS</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-mono text-neutral-400">Atmosphere regulators [OK]</span>
                      {formData.quantumShielding && <span className="text-[10px] font-mono text-neon-blue">Quantum-deflect shield [MOUNTED]</span>}
                      {formData.neuralTranslation && <span className="text-[10px] font-mono text-neon-pink">Neural translation array [LINKED]</span>}
                    </div>
                  </div>

                  {/* Fake Barcode spacer */}
                  <div className="border-t border-dashed border-neutral-800 pt-8 flex flex-col items-center justify-center gap-2">
                    <Barcode className="w-full max-w-xs h-12 text-neutral-400" />
                    <span className="font-mono text-[9px] text-neutral-600 tracking-[0.2em]">ELITE-SECURE SYSTEM TRANSIT LOG</span>
                  </div>

                  <button
                    onClick={resetConsole}
                    className="w-full py-3.5 rounded bg-neon-green text-black font-display font-bold text-xs tracking-widest uppercase hover:bg-white hover:shadow-neon-green transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Plan Another Expedition</span>
                  </button>

                </div>

              </motion.div>
            )}

            {/* 3. CORE DESIGN FORM */}
            {!isLaunching && !showTicket && (
              <motion.form
                key="booking-form"
                onSubmit={handleLaunchSubmit}
                className="flex flex-col lg:flex-row gap-8 items-stretch"
              >
                
                {/* Form fields left */}
                <div className="lg:w-3/5 rounded-xl bg-cyber-card border border-white/5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  
                  {/* Prefilled alert reset */}
                  {selectedPackage && (
                    <div className="p-3 rounded bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-neon-pink uppercase">STATION SELECTOR FORWARDED: {selectedPackage.title.toUpperCase()}</span>
                      <button 
                        type="button" 
                        onClick={onClearPackage} 
                        className="text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Default Packages
                      </button>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Destination dropdown selector */}
                    <div className="space-y-1.5">
                      <label htmlFor="destinationId" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">DELEGATE ENTRUSTED SECTOR</label>
                      <select
                        id="destinationId"
                        name="destinationId"
                        value={formData.destinationId}
                        onChange={handleSelectChange}
                        className="w-full bg-black border border-neutral-800 focus:border-neon-blue rounded px-3 py-2.5 outline-none font-display text-sm tracking-wide transition-colors"
                      >
                        {TRAVEL_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} (${pkg.price.toLocaleString()} Base)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Standard details fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="fullName" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">SOVEREIGN PATRON NAME</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          placeholder="e.g. MARCUS CORTEZ"
                          value={formData.fullName}
                          onChange={handleTextChange}
                          className="w-full bg-black border border-neutral-800 focus:border-neon-blue rounded px-3 py-2.5 outline-none font-sans text-sm transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">UPLINK SECURE EMAIL</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="e.g. marcus@orbital.net"
                          value={formData.email}
                          onChange={handleTextChange}
                          className="w-full bg-black border border-neutral-800 focus:border-neon-blue rounded px-3 py-2.5 outline-none font-sans text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Departure cycles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="departureDate" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">DEPARTURE CYCLE (DATE)</label>
                        <div className="relative">
                          <input
                            type="date"
                            id="departureDate"
                            name="departureDate"
                            required
                            value={formData.departureDate}
                            onChange={handleTextChange}
                            className="w-full bg-black border border-neutral-800 focus:border-neon-blue rounded px-3 py-2.5 outline-none font-mono text-xs transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">ACCOMPANYING PATRONS</label>
                        <div className="flex items-center justify-between border border-neutral-800 rounded px-3 py-1.5 bg-black">
                          <span className="font-sans text-xs text-neutral-400">Companion count:</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleCompanionChange(-1)}
                              className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-sm font-bold w-4 text-center">{formData.companionCount}</span>
                            <button
                              type="button"
                              onClick={() => handleCompanionChange(1)}
                              className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cabin Suite tier choice */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">CRAFT SUITE PREMIUM CLASS</span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { id: 'standard', name: 'Standard core', price: 'Included', desc: 'Pre-fitted baseline luxury deck' },
                          { id: 'orbital', name: 'Orbital suite', price: '+$8,500/pp', desc: 'Zero-G lounge dome attachment' },
                          { id: 'quantum', name: 'Quantum charter', price: '+$24,000/pp', desc: 'Private supersonic stealth craft' }
                        ].map((tier) => {
                          const isSel = formData.classTier === tier.id;
                          return (
                            <button
                              type="button"
                              key={tier.id}
                              onClick={() => setFormData(prev => ({ ...prev, classTier: tier.id as any }))}
                              className={`p-3 rounded border text-left flex flex-col justify-between h-28 cursor-pointer transition-all duration-300
                                ${isSel 
                                  ? 'border-neon-blue bg-neon-blue/10' 
                                  : 'border-neutral-850 bg-black hover:border-neutral-850'
                                }
                              `}
                            >
                              <div>
                                <span className="font-display font-bold text-[11px] uppercase tracking-wide block">{tier.name}</span>
                                <span className={`text-[9px] font-mono leading-none ${isSel ? 'text-neon-blue font-bold' : 'text-neutral-500'}`}>{tier.price}</span>
                              </div>
                              <span className="text-[9px] font-sans text-neutral-400 leading-none">{tier.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantum auxiliary protections checkboxes */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">AUXILIARY UPGRADES</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleCheckboxChange('quantumShielding')}
                          className={`flex items-center gap-3 p-3.5 rounded border text-left cursor-pointer transition-all duration-300
                            ${formData.quantumShielding ? 'border-neon-pink bg-neon-pink/5' : 'border-neutral-850 bg-black'}
                          `}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                            ${formData.quantumShielding ? 'border-neon-pink bg-neon-pink text-black' : 'border-neutral-800 bg-neutral-950'}
                          `}>
                            {formData.quantumShielding && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-display font-medium uppercase tracking-wide block">Quantum-Force Shielding</span>
                            <span className="text-[10px] font-mono text-neutral-500">+$1,200 (Total immunity matrix)</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCheckboxChange('neuralTranslation')}
                          className={`flex items-center gap-3 p-3.5 rounded border text-left cursor-pointer transition-all duration-300
                            ${formData.neuralTranslation ? 'border-neon-green bg-neon-green/5' : 'border-neutral-850 bg-black'}
                          `}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                            ${formData.neuralTranslation ? 'border-neon-green bg-neon-green text-black' : 'border-neutral-800 bg-neutral-950'}
                          `}>
                            {formData.neuralTranslation && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-display font-medium uppercase tracking-wide block">Bi-lingual Neural Link</span>
                            <span className="text-[10px] font-mono text-neutral-500">+$800 (Hyper-low latency audio)</span>
                          </div>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Invoice Pricing Calculator right side */}
                <div className="lg:w-2/5 p-[1px] rounded-xl bg-gradient-to-b from-neutral-800 to-transparent">
                  <div className="h-full rounded-xl bg-[#0d0d15] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-neutral-900 pb-4">
                        <Sparkles className="w-4 h-4 text-neon-blue" />
                        <h4 className="font-display font-bold text-xs uppercase tracking-widest text-neutral-300">ESTIMATED EXPENDITURE</h4>
                      </div>

                      <div className="space-y-4 text-xs font-mono">
                        
                        {/* Summary lines */}
                        <div className="flex justify-between">
                          <span className="text-neutral-500 uppercase">Destination Base</span>
                          <span className="text-neutral-300">${invoice.basePrice.toLocaleString()}</span>
                        </div>

                        {formData.classTier !== 'standard' && (
                          <div className="flex justify-between">
                            <span className="text-neutral-500 uppercase">Suite class markup</span>
                            <span className="text-neon-blue">+${invoice.tierMarkup.toLocaleString()} / pp</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-neutral-500 uppercase">Voyagers multiplier</span>
                          <span className="text-neutral-300">x{invoice.travelerMultiplier}</span>
                        </div>

                        {(formData.quantumShielding || formData.neuralTranslation) && (
                          <div className="space-y-1 pt-2 border-t border-neutral-900">
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Auxiliary extras:</span>
                            {formData.quantumShielding && (
                              <div className="flex justify-between pl-2 text-[11px]">
                                <span className="text-neutral-500">+ Quantum Deflect-shielding</span>
                                <span className="text-neon-pink">$1,200</span>
                              </div>
                            )}
                            {formData.neuralTranslation && (
                              <div className="flex justify-between pl-2 text-[11px]">
                                <span className="text-neutral-500">+ Neural Link Array</span>
                                <span className="text-neon-green">$800</span>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-neutral-900">
                      <div>
                        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TOTAL VECTOR VALUATION</span>
                        <span className="font-display font-bold text-3xl text-neon-blue text-glow-blue block">
                          ${invoice.total.toLocaleString()}
                          <span className="text-xs font-mono text-neutral-500 font-normal ml-1">USD</span>
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={!formData.fullName || !formData.email}
                        className={`w-full py-3.5 rounded font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5
                          ${(!formData.fullName || !formData.email) 
                            ? 'bg-neutral-900 text-neutral-500 border border-neutral-800 cursor-not-allowed' 
                            : 'bg-neon-blue text-black hover:bg-white hover:shadow-neon-blue'
                          }
                        `}
                      >
                        <span>Initiate Hyper-Transit</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>

                      <p className="font-mono text-[9px] text-neutral-500 text-center uppercase tracking-wide leading-relaxed px-2">
                        Authorization complies with planetary standard travel frameworks. All entries encrypted immediately.
                      </p>
                    </div>

                  </div>
                </div>

              </motion.form>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
