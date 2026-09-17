'use client';

import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import { Share2, Link, MessageCircle } from 'lucide-react';
import GoldParticles from '@/components/ui/gold/GoldParticles';

export default function Footer({ wedding }: { wedding: WeddingConfig }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <footer className="relative bg-dark-luxury-gradient text-pure-white py-32 px-6 overflow-hidden flex flex-col items-center text-center">
      <GoldParticles />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-xl flex flex-col items-center"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-gold-gradient mb-6">
          {wedding.bride_name} <br className="md:hidden"/>
          <span className="text-3xl md:text-5xl italic font-light mx-4 text-luxury-gold">&amp;</span> <br className="md:hidden"/>
          {wedding.groom_name}
        </h2>
        
        {wedding.wedding_date && (
          <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-luxury-gold mb-12">
            {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }).replace(/ /g, ' · ')}
          </p>
        )}

        <p className="font-serif italic text-xl md:text-2xl text-pure-white/90 mb-20 px-4">
          &quot;With love, we invite you to celebrate with us.&quot;
        </p>

        {/* Sharing */}
        <div className="w-full pt-16 border-t border-luxury-gold/20 flex flex-col items-center">
          <p className="font-sans uppercase tracking-widest text-xs text-luxury-gold mb-6">
            Share Our Joy
          </p>
          <div className="flex gap-4">
            <button 
              className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-dark-text transition-all duration-300"
              onClick={() => window.open(`https://wa.me/?text=You're invited! ${shareUrl}`)}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button 
              className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-dark-text transition-all duration-300"
              onClick={() => navigator.clipboard.writeText(shareUrl)}
            >
              <Link className="w-5 h-5" />
            </button>
            <button 
              className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-dark-text transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="mt-16 text-[10px] uppercase tracking-widest text-pure-white/30">
          Powered by Digital Invitations
        </p>
      </motion.div>
    </footer>
  );
}
