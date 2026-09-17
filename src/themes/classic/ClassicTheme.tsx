'use client';

import { useState } from 'react';
import { WeddingConfig } from '@/types/database';
import { AnimatePresence, motion } from 'framer-motion';
import OpeningScreen from './OpeningScreen';
import Cover from './Cover';
import InvitationMessage from './InvitationMessage';
import CoupleSection from './CoupleSection';
import Countdown from './Countdown';
import EventsTimeline from './EventsTimeline';
import VenueSection from './VenueSection';
import Gallery from './Gallery';
import RSVPForm from './RSVPForm';
import ShareSection from './ShareSection';
import QRCodeSection from './QRCodeSection';
import Footer from './Footer';

interface ClassicThemeProps {
  wedding: WeddingConfig;
}

export default function ClassicTheme({ wedding }: ClassicThemeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg text-dark-text font-sans selection:bg-luxury-gold selection:text-white">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <OpeningScreen 
            key="opening" 
            wedding={wedding} 
            onOpen={() => setIsOpen(true)} 
          />
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-0"
        >
          {/* SECTION A: White */}
          <div className="bg-pure-white">
            <Cover wedding={wedding} />
          </div>
          
          <div className="bg-pure-white">
            <CoupleSection wedding={wedding} />
          </div>

          {/* SECTION B: Soft champagne/gold gradient */}
          <div className="bg-champagne-gradient">
            {wedding.wedding_date && (
              <Countdown targetDate={wedding.wedding_date} />
            )}
          </div>

          {/* SECTION C: White */}
          <div className="bg-pure-white">
            <InvitationMessage wedding={wedding} />
          </div>

          {/* SECTION D: Very light warm gold */}
          <div className="bg-soft-gold-bg">
            {wedding.events && wedding.events.length > 0 && (
              <EventsTimeline events={wedding.events} />
            )}
          </div>

          {/* SECTION E: White */}
          <div className="bg-pure-white">
            {wedding.gallery_images && (
              <Gallery images={wedding.gallery_images} />
            )}
          </div>
          
          {/* SECTION F: Gold/champagne */}
          <div className="bg-champagne-gradient">
            {wedding.events && wedding.events.length > 0 && (
              <VenueSection event={wedding.events[0]} />
            )}
          </div>

          {/* SECTION G: White */}
          <div className="bg-pure-white">
            <RSVPForm wedding={wedding} />
          </div>
          
          <ShareSection wedding={wedding} />
          
          <QRCodeSection />

          <Footer wedding={wedding} />
        </motion.main>
      )}
    </div>
  );
}
