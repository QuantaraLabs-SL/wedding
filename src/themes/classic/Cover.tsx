import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GoldDivider from '@/components/ui/gold/GoldDivider';

export default function Cover({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
      {wedding.cover_image_url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={wedding.cover_image_url}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold-gradient mb-8 leading-tight drop-shadow-lg">
          {wedding.bride_name} <br className="md:hidden" />
          <span className="text-4xl md:text-6xl italic mx-6 text-luxury-gold font-light drop-shadow-md">&amp;</span> <br className="md:hidden" />
          {wedding.groom_name}
        </h1>
        
        {wedding.wedding_date && (
          <p className="font-sans tracking-[0.3em] text-sm md:text-lg uppercase text-luxury-gold mb-12 drop-shadow-md">
            {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        )}

        <GoldDivider />
      </motion.div>
    </section>
  );
}
