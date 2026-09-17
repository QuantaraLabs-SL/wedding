import { EventConfig } from '@/types/database';
import { motion } from 'framer-motion';
import GoldButton from '@/components/ui/gold/GoldButton';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function VenueSection({ event }: { event: EventConfig }) {
  if (!event) return null;

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-pure-white border-y border-luxury-gold/10">
      {/* Subtle map-inspired background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 90, 90 10' stroke='%23D4AF37' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10 90 Q 50 10, 90 90' stroke='%23D4AF37' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GoldOrnament className="w-8 h-8 mb-6 mx-auto" />
          
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-gold mb-10">
            Join Us
          </h2>

          <div className="font-sans mb-12">
            <h3 className="text-xl md:text-2xl text-dark-text mb-4 uppercase tracking-widest font-medium">
              {event.venue_name}
            </h3>
            <p className="text-dark-text/80 text-sm md:text-base tracking-widest uppercase">
              {event.address}
            </p>
          </div>

          {event.maps_url && (
            <a href={event.maps_url} target="_blank" rel="noopener noreferrer">
              <GoldButton>
                Get Directions
              </GoldButton>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
