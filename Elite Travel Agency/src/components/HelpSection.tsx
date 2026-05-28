import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { FAQItem } from '../types';
import { Search, ChevronDown, ChevronUp, Cpu, MessagesSquare, Check, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HelpSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'technology' | 'logistics'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Assistance ticket builder
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  const toggleFaq = (id: string) => {
    setExpandedFaqId(prev => (prev === id ? null : id));
  };

  const categories = [
    { id: 'all', label: 'All Queries' },
    { id: 'booking', label: 'Booking Matrix' },
    { id: 'technology', label: 'Technology Core' },
    { id: 'logistics', label: 'Transits & Logistics' },
  ] as const;

  // Search & category filtration
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    // Generate random luxury ticket hash
    const id = `TK-${Math.floor(10000 + Math.random() * 90000)}-ORB`;
    setGeneratedTicketId(id);
    setTicketSuccess(true);
  };

  const resetTicket = () => {
    setTicketSubject('');
    setTicketSuccess(false);
  };

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-green tracking-tight uppercase">Help</h1>
          <p className="font-sans text-sm text-neutral-400">
            Access secure diagnostic FAQs, run full-text search parameters on galactic protocols, or dispatch automated priority assist tickets.
          </p>
        </div>

        {/* DOUBLE PART COMPARTMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* FAQ panel Left */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Search and control filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute top-3.5 left-4 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Query knowledge block parameters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-neutral-800 focus:border-neon-green rounded px-4 py-3 pl-11 outline-none text-xs font-sans tracking-wide transition-colors text-white"
                />
              </div>

              {/* Categorization triggers */}
              <div className="flex flex-wrap gap-2 pt-1 border-b border-neutral-900 pb-4">
                {categories.map((c) => {
                  const isAct = activeCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer border
                        ${isAct 
                          ? 'bg-black text-neon-green border-neon-green shadow-neon-green/10' 
                          : 'bg-neutral-950/20 text-neutral-400 border-transparent hover:border-neutral-800'
                        }
                      `}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion render */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isExp = expandedFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className={`rounded bg-cyber-card border transition-all duration-300 overflow-hidden
                      ${isExp ? 'border-neon-green/60' : 'border-neutral-900/60 hover:border-neutral-800'}
                    `}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 cursor-pointer outline-none focus:outline-none"
                    >
                      <h3 className="font-display font-medium text-xs sm:text-sm text-neutral-200 tracking-wide select-none">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 mt-0.5 text-neutral-500">
                        {isExp ? <ChevronUp className="w-4 h-4 text-neon-green" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Expandable answer */}
                    <AnimatePresence>
                      {isExp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-5 border-t border-neutral-900/40"
                        >
                          <p className="font-sans text-xs text-neutral-400 leading-relaxed pt-3 select-text">
                            {faq.answer}
                          </p>
                          <div className="flex gap-2 pt-4 font-mono text-[9px] uppercase text-neutral-500 select-none">
                            <span>CATEGORY: {faq.category}</span>
                            <span>•</span>
                            <span>DEFI: SECURE</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-10 rounded bg-cyber-card border border-neutral-900 text-neutral-500 font-mono text-xs">
                  No matching protocol entries found. Try running wider search terms.
                </div>
              )}
            </div>

          </div>

          {/* Ticket dispenser Right panel */}
          <div className="rounded-xl border border-white/5 bg-cyber-card p-6 sm:p-8 relative">
            <div className="absolute top-0 right-0 w-60 h-60 bg-neon-green/5 rounded-full blur-[70px] pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                <MessagesSquare className="w-4 h-4 text-neon-green animate-pulse" />
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-neutral-300">
                  ASSISTANCE DESK
                </h3>
              </div>

              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Need immediate orbital flight rerouting or diving pressure intervention? Launch a prioritized assistance ticket on standard ledger networks.
              </p>

              <AnimatePresence mode="wait">
                {ticketSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-5 rounded bg-black/60 border border-neon-green/30 text-center space-y-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/45 flex items-center justify-center text-neon-green mx-auto">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    
                    <div>
                      <span className="font-mono text-[9px] text-neon-green uppercase block">SECURE DISPATCH SUCCESSFUL</span>
                      <span className="font-display font-bold text-sm text-neutral-200">Ticket Authorized ID:</span>
                      <p className="font-mono text-base text-white tracking-widest pt-1 font-bold">{generatedTicketId}</p>
                    </div>

                    <p className="font-sans text-[11px] text-neutral-500 leading-relaxed">
                      Your query coordinate was compiled. A coordinator is allocated on dedicated channel loops immediately.
                    </p>

                    <button
                      onClick={resetTicket}
                      className="px-4 py-2 border border-neutral-800 hover:border-neon-green rounded bg-neutral-950 text-neutral-400 hover:text-white font-mono text-[9px] uppercase tracking-widest cursor-pointer w-full transition-colors"
                    >
                      Clear ticket desk
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="ticket-form"
                    onSubmit={handleTicketSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label htmlFor="ticketSubject" className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">DESCRIBE UBLINK CRISIS</label>
                      <input
                        type="text"
                        id="ticketSubject"
                        required
                        placeholder="e.g. Flight delay on Tokyo corridor..."
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        className="w-full bg-black border border-neutral-800 focus:border-neon-green rounded px-3 py-2.5 outline-none font-sans text-xs transition-colors text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!ticketSubject.trim()}
                      className={`w-full py-3 rounded font-display font-medium text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5
                        ${!ticketSubject.trim()
                          ? 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-neon-green text-black hover:bg-white hover:shadow-neon-green'
                        }
                      `}
                    >
                      <span>Authorize Assist Pass</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
