import { WeddingConfig } from '@/types/database';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import GoldDivider from '@/components/ui/gold/GoldDivider';
import { useRef } from 'react';

export default function Cover({ wedding }: { wedding: WeddingConfig }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect: moves the image down slightly as we scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
      {wedding.cover_image_url && (
        <motion.div style={{ y }} className="absolute inset-0 z-0 scale-[1.2] origin-top">
          <Image
            src={wedding.cover_image_url}
            alt="Cover"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-900/60" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[15%] text-center z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-4"
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/40 [-webkit-text-stroke:1px_black] mb-6 leading-tight drop-shadow-xl flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <span>{wedding.bride_name}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl italic text-pink-200/90 font-light drop-shadow-md [-webkit-text-stroke:1px_black]">&amp;</span>
          <span>{wedding.groom_name}</span>
        </h1>
        
        {wedding.wedding_date && (
          <p className="font-sans tracking-[0.3em] text-xs sm:text-sm md:text-lg uppercase text-white mb-12 drop-shadow-md">
            {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        )}
      </motion.div>
    </section>
  );
}
