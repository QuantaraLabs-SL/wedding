'use client';

import { motion } from 'framer-motion';
import { Copy, Share2 } from 'lucide-react';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';
import { WeddingConfig } from '@/types/database';
import { useState, useEffect } from 'react';

export default function ShareSection({ wedding }: { wedding: WeddingConfig }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const shareText = `You are invited to celebrate the wedding of ${wedding.bride_name} & ${wedding.groom_name} ❤️`;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${wedding.bride_name} & ${wedding.groom_name}'s Wedding`,
          text: shareText,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    }
  };

  return (
    <section className="py-20 mobile-padding relative bg-soft-gold-bg overflow-hidden border-t border-luxury-gold/10">
      <div className="w-full max-w-[360px] mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <GoldOrnament className="w-6 h-6 mb-6 mx-auto opacity-60" />
          
          <h2 className="font-serif heading-mobile text-luxury-gold mb-8 uppercase tracking-widest leading-none">
            Share Our Invitation
          </h2>

          <div className="flex flex-col gap-4 mt-8 w-full">
            <button
              onClick={handleWhatsAppShare}
              className="touch-target w-full bg-[#25D366] text-white rounded font-sans uppercase tracking-widest text-sm font-semibold active:opacity-80 transition-opacity shadow-lg flex items-center justify-center gap-2"
            >
              WhatsApp
            </button>
            
            <button
              onClick={handleCopyLink}
              className="touch-target w-full bg-pure-white border-2 border-luxury-gold text-luxury-gold rounded font-sans uppercase tracking-widest text-sm font-semibold active:bg-soft-gold-bg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="mt-2 text-dark-text/70 text-xs font-sans uppercase tracking-widest underline underline-offset-4 p-2 active:text-luxury-gold"
              >
                More Share Options
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
