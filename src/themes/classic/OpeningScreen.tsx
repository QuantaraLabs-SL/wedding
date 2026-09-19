'use client';

import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import RosePetals from '@/components/ui/RosePetals';
import GoldButton from '@/components/ui/gold/GoldButton';

export default function OpeningScreen({ 
  wedding, 
  onOpen 
}: { 
  wedding: WeddingConfig;
  onOpen: () => void;
}) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-champagne-gradient overflow-hidden min-h-[100svh]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <RosePetals />
      
      {/* Elegant thin gold frame, adjusted for mobile */}
      <motion.div 
        className="absolute inset-[16px] md:inset-[32px] border border-luxury-gold/30 rounded-sm pointer-events-none"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="relative z-10 text-center mobile-padding flex flex-col items-center justify-center h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center justify-center w-full max-w-[360px] mx-auto"
        >
          <h1 className="font-serif text-couple-names text-gold-gradient mb-8 leading-tight tracking-tight uppercase flex flex-col items-center">
            <span>{wedding.bride_name}</span>
            <span className="text-[0.6em] text-luxury-gold my-2 italic font-light lowercase">&amp;</span>
            <span>{wedding.groom_name}</span>
          </h1>
          
          {wedding.wedding_date && (
            <p className="font-sans tracking-[0.2em] text-mobile-small md:text-base uppercase text-luxury-gold font-medium">
              {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}

          {wedding.events && wedding.events.length > 0 && (
            <div className="mt-4 font-sans text-mobile-small text-dark-text opacity-80 uppercase tracking-widest leading-relaxed">
              <p>{wedding.events[0].venue_name}</p>
              <p>{wedding.events[0].address}</p>
            </div>
          )}
          
          <div className="mt-16 pb-8">
            <GoldButton onClick={onOpen}>
              Open Invitation
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
