import { WeddingConfig } from '@/types/database';
import { motion } from 'framer-motion';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function InvitationMessage({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <GoldOrnament className="w-10 h-10 mb-8" />
        
        <h2 className="font-serif text-3xl md:text-4xl text-luxury-gold mb-12 italic">
          Our Special Day
        </h2>

        <p className="font-sans text-lg md:text-2xl leading-relaxed text-dark-text font-light px-4">
          {wedding.invitation_message || "With joyful hearts, we invite you to join us as we celebrate the beginning of our journey together."}
        </p>

        <GoldOrnament className="w-10 h-10 mt-12 rotate-180" />
      </motion.div>
    </section>
  );
}
