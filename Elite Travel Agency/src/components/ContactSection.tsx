import React, { useState } from 'react';
import { Send, MapPin, Radio, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    sector: 'general',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSending(true);
    setTerminalLogs([]);

    // Sequential fake terminal printing
    const logs = [
      'Establishing connection with sub-orbital quantum relay...',
      'Binding signature certificates with 512-bit token key...',
      'Compiling telemetry parameters in raw package blocks...',
      'Compressing message structure to safe buffer...',
      'Dispatched successful! Channel closed cleanly.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, `[system] ${log}`]);
        if (index === logs.length - 1) {
          setIsSending(false);
          setIsSuccess(true);
        }
      }, (index + 1) * 650);
    });
  };

  const handleCreateNewMsg = () => {
    setForm({
      name: '',
      email: '',
      sector: 'general',
      message: ''
    });
    setTerminalLogs([]);
    setIsSuccess(false);
  };

  return (
    <div className="relative py-24 min-h-screen text-white">
      
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-neon-pink/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-10">
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-glow-pink tracking-tight uppercase">Contact</h1>
          <p className="font-sans text-sm text-neutral-400">
            Send raw telemetry packets directly to our coordination officers. Transmissions are routed via quantum tunnels.
          </p>
        </div>

        {/* CONTAINER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* Metadata info left */}
          <div className="lg:col-span-2 rounded-xl bg-cyber-card border border-white/5 p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <span className="font-mono text-xs text-neon-blue uppercase tracking-widest block">Frequencies & Sectors</span>
              <h3 className="font-display font-medium text-2xl uppercase tracking-tight text-neutral-200">
                Uplink Nodes
              </h3>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Connect with our coordination officers on dedicated sub-carrier layers. We maintain permanent nodes across earth and low orbit zones.
              </p>
            </div>

            {/* Visual list */}
            <div className="space-y-5 font-mono text-xs text-neutral-400">
              <div className="flex items-start gap-3">
                <Radio className="w-4 h-4 text-neon-blue mt-0.5 flex-shrink-0 animate-pulse" />
                <div>
                  <span className="text-neutral-500 uppercase block-[9px]">SOLAR FREQUENCY</span>
                  <span className="text-neutral-200">UPLINK_NODE: 732.148 MHz</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neon-pink mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-neutral-500 uppercase block-[9px]">PHYSICAL EMBASSY</span>
                  <span className="text-neutral-200">Neo-Tokyo Skybridge, Suite 120A, Shibuya District</span>
                </div>
              </div>
            </div>

            {/* Ambient terminal decoration */}
            <div className="p-4 rounded bg-black border border-neutral-900 font-mono text-[9px] text-neutral-600 space-y-1">
              <span className="text-neon-blue block">SENSORS ONLINE</span>
              <span>- SECURE PORT: 3000 [COMPLIANT]</span>
              <span>- RETRY COEFFICIENT: MULTIPLEX</span>
              <span>- GEOIP: UNLINKED</span>
            </div>

          </div>

          {/* Form System right */}
          <div className="lg:col-span-3 rounded-xl bg-cyber-card border border-white/5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {/* SUCCESS LOG */}
              {isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10"
                >
                  <div className="w-14 h-14 rounded-full bg-neon-green/10 border border-neon-green/50 flex items-center justify-center text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.15)] animate-bounce">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-neon-green uppercase tracking-widest block">TRANSMISSION RECIPIENT NOTIFIED</span>
                    <h3 className="font-display font-bold text-2.5xl uppercase">PACKET DELIVERED!</h3>
                    <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed">
                      Your transit inquiry was securely bundled and dispatched to Elite's flight operations block. Expect an encrypted response in your frequency channel shortly.
                    </p>
                  </div>

                  <button
                    onClick={handleCreateNewMsg}
                    className="px-6 py-2.5 rounded bg-neutral-950 border border-neutral-850 hover:border-neon-blue font-mono text-[10px] text-neutral-400 hover:text-neon-blue uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Send another signal
                  </button>
                </motion.div>
              )}

              {/* ACTIVE LOADING LOGS */}
              {isSending && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full rounded-lg bg-black border border-neutral-900 p-6 flex flex-col gap-4 font-mono text-xs text-neutral-400 py-12"
                >
                  <div className="flex items-center gap-2 text-neon-blue border-b border-neutral-900 pb-3">
                    <Terminal className="w-4 h-4 animate-pulse" />
                    <span className="uppercase tracking-widest text-[9px]">UPLINK DISPATCH TERMINAL LOGS</span>
                  </div>

                  <div className="flex-1 space-y-2 select-none">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-neutral-600 font-bold">{`>`}</span>
                        <span className={i === terminalLogs.length - 1 ? 'text-white' : 'text-neutral-400'}>{log}</span>
                      </div>
                    ))}
                    {terminalLogs.length < 5 && (
                      <div className="flex gap-2 animate-pulse">
                        <span className="text-neutral-600 font-bold">{`>`}</span>
                        <span className="bg-neutral-800 w-16 h-4 rounded"></span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* RAW INPUT SHEET */}
              {!isSuccess && !isSending && (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSendSubmit}
                  className="space-y-5 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">INDENTIFICATION SIGNATURE</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g. CAPT. VANCE"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-neutral-800 focus:border-neon-pink rounded px-3 py-2.5 outline-none font-sans text-sm transition-colors text-white"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TELEMETRY SECURE COMPILING EMAIL</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="e.g. vance@aurora.org"
                          value={form.email}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-neutral-800 focus:border-neon-pink rounded px-3 py-2.5 outline-none font-sans text-sm transition-colors text-white"
                        />
                      </div>

                    </div>

                    {/* Sector selection */}
                    <div className="space-y-1.5">
                      <label htmlFor="sector" className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">TARGET ASSISTANCE SECTOR</label>
                      <select
                        id="sector"
                        name="sector"
                        value={form.sector}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-neutral-800 focus:border-neon-pink rounded px-3 py-2.5 outline-none font-display text-sm transition-colors text-white"
                      >
                        <option value="general">Global Fleet Coordination</option>
                        <option value="press">Oceanic Abyss Operations</option>
                        <option value="orbit">Celestial Orbital Flight Control</option>
                        <option value="sovereign">Sovereign High-Altitude Estates</option>
                      </select>
                    </div>

                    {/* Message body */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">MESSAGE PACKET CONTENTS</label>
                      <textarea
                        type="edit"
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="State your technical inquiries or elite coordination requests safely here..."
                        value={form.message}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-neutral-800 focus:border-neon-pink rounded px-3 py-2.5 outline-none font-sans text-sm transition-colors text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission dispatch */}
                  <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[9px] text-neutral-500 uppercase max-w-xs leading-relaxed text-center sm:text-left">
                      Payload encrypts via client side nodes before compiling block values.
                    </p>

                    <button
                      type="submit"
                      disabled={!form.name || !form.email || !form.message}
                      className={`px-6 py-3 rounded font-display font-medium text-[11px] uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto
                        ${(!form.name || !form.email || !form.message)
                          ? 'bg-neutral-900 text-neutral-500 border border-neutral-800 cursor-not-allowed'
                          : 'bg-neon-pink text-black hover:bg-white hover:shadow-neon-pink'
                        }
                      `}
                    >
                      <span>Uplink Secure Transmission</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.form>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
