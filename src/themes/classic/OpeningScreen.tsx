'use client';

import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import GoldParticles from '@/components/ui/gold/GoldParticles';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-champagne-gradient overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <GoldParticles />
      
      {/* Elegant thin gold frame */}
      <motion.div 
        className="absolute inset-4 md:inset-8 border border-luxury-gold/30 rounded-sm pointer-events-none"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-gold-gradient mb-4">
            {wedding.bride_name} <br className="md:hidden" />
            <span className="text-3xl md:text-5xl italic mx-4 font-light">&amp;</span> <br className="md:hidden" />
            {wedding.groom_name}
          </h1>
          
          {wedding.wedding_date && (
            <p className="font-sans tracking-[0.3em] text-sm md:text-base uppercase mt-6 text-luxury-gold">
              {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).replace(/ /g, ' · ')}
            </p>
          )}

          <p className="mt-12 text-dark-text max-w-sm font-serif italic text-lg opacity-80">
            &quot;Together with their families, they invite you to celebrate their special day.&quot;
          </p>
          
          <div className="mt-16">
            <GoldButton onClick={onOpen}>
              Open Invitation
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
