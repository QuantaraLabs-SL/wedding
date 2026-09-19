'use client';

import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import RosePetals from '@/components/ui/RosePetals';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function Footer({ wedding }: { wedding: WeddingConfig }) {
  const mainEvent = wedding.events && wedding.events.length > 0 ? wedding.events[0] : null;

  return (
    <footer className="relative bg-dark-luxury-gradient text-dark-text py-24 mobile-padding overflow-hidden flex flex-col items-center text-center pb-[env(safe-area-inset-bottom)]">
      <RosePetals />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-[360px] flex flex-col items-center"
      >
        <p className="font-serif italic text-2xl md:text-3xl text-luxury-gold mb-6 px-4">
          With Love
        </p>

        <h2 className="font-serif text-couple-names text-gold-gradient mb-8 leading-tight tracking-tight uppercase flex flex-col items-center">
          <span>{wedding.bride_name}</span>
          <span className="text-[0.6em] text-luxury-gold my-2 italic font-light lowercase">&amp;</span>
          <span>{wedding.groom_name}</span>
        </h2>
        
        {wedding.wedding_date && (
          <p className="font-sans text-mobile-small tracking-[0.2em] uppercase text-luxury-gold mb-4 font-semibold">
            {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).replace(/\//g, ' • ')}
          </p>
        )}

        {mainEvent && (
          <div className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-dark-text/70 leading-relaxed mb-12">
            <p>{mainEvent.venue_name}</p>
            <p>{mainEvent.address}</p>
          </div>
        )}

        <GoldOrnament className="w-6 h-6 opacity-40 mb-12" />

        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-dark-text/30">
          Made with &hearts;
        </p>
      </motion.div>
    </footer>
  );
}
