import { WeddingEvent } from '@/types/database';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function VenueSection({ event }: { event: WeddingEvent }) {
  if (!event) return null;

  return (
    <section className="py-20 mobile-padding relative overflow-hidden bg-pure-white border-y border-luxury-gold/10">
      {/* Subtle map-inspired background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 90, 90 10' stroke='%23D4AF37' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10 90 Q 50 10, 90 90' stroke='%23D4AF37' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="w-full max-w-[360px] mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <GoldOrnament className="w-6 h-6 mb-6 mx-auto" />
          
          <h2 className="font-serif heading-mobile text-luxury-gold mb-8 uppercase tracking-widest leading-none">
            Join Us
          </h2>

          <div className="font-sans mb-10 flex flex-col items-center">
            <h3 className="text-lg text-dark-text mb-2 uppercase tracking-widest font-semibold leading-tight">
              {event.venue_name}
            </h3>
            <p className="text-dark-text/80 text-mobile-small tracking-widest uppercase leading-relaxed max-w-[280px]">
              {event.address}
            </p>
          </div>

          {event.maps_url && (
            <a 
              href={event.maps_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="touch-target w-full bg-gold-gradient text-white rounded font-sans uppercase tracking-widest text-sm font-semibold active:opacity-80 transition-opacity shadow-lg"
            >
              <MapPin className="w-5 h-5 mr-2" /> Get Directions
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
