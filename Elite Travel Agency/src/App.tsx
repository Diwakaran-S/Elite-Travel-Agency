import React, { useState, useEffect } from 'react';
import { ActiveTab, TravelPackage } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import GallerySection from './components/GallerySection';
import BookingsSection from './components/BookingsSection';
import PackagesSection from './components/PackagesSection';
import AiAgentSection from './components/AiAgentSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import HelpSection from './components/HelpSection';
import { RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedVibeFilter, setSelectedVibeFilter] = useState<string>('');

  // Tab change handler (loads instantly without page loading overlay)
  const handleTabChange = (targetTab: ActiveTab) => {
    if (targetTab === activeTab) return;
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Helper when clicking quick checklist filters from Gallery section
  const handleSelectVibeFromGallery = (vibe: string) => {
    setSelectedVibeFilter(vibe);
    handleTabChange('packages');
  };

  // Helper when clicking "Select Transit" in Home or Packages page
  const handleSelectPackageForBooking = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    handleTabChange('bookings');
  };

  const handleClearPackageSelection = () => {
    setSelectedPackage(null);
  };

  const handleClearVibeFilter = () => {
    setSelectedVibeFilter('');
  };

  return (
    <div id="app-root" className="min-h-screen bg-cyber-dark text-white font-sans flex flex-col justify-between overflow-x-hidden antialiased">
      
      {/* Sleek fixed header */}
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main page content container */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* Main sections selector */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <HomeSection 
                onTabChange={handleTabChange} 
                onSelectPackage={handleSelectPackageForBooking} 
              />
            )}
            {activeTab === 'gallery' && (
              <GallerySection 
                onSelectVibeTab={handleSelectVibeFromGallery} 
                onTabChange={handleTabChange} 
              />
            )}
            {activeTab === 'bookings' && (
              <BookingsSection 
                selectedPackage={selectedPackage} 
                onClearPackage={handleClearPackageSelection} 
              />
            )}
            {activeTab === 'packages' && (
              <PackagesSection 
                onSelectPackage={handleSelectPackageForBooking} 
                selectedVibeFilter={selectedVibeFilter}
                onClearVibeFilter={handleClearVibeFilter}
              />
            )}
            {activeTab === 'ai-agent' && (
              <AiAgentSection />
            )}
            {activeTab === 'about' && (
              <AboutSection />
            )}
            {activeTab === 'contact' && (
              <ContactSection />
            )}
            {activeTab === 'help' && (
              <HelpSection />
            )}
          </motion.div>

        </AnimatePresence>
      </main>

      {/* Persistent global footer with social connects */}
      <Footer onTabChange={handleTabChange} />

    </div>
  );
}

