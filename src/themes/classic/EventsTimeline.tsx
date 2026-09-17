import { EventConfig } from '@/types/database';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function EventsTimeline({ events }: { events: EventConfig[] }) {
  return (
    <section className="py-24 px-6 relative bg-soft-gold-bg overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl text-gold-gradient mb-4">
            The Celebration
          </h2>
          <div className="flex justify-center">
            <GoldOrnament className="w-8 h-8 opacity-50" />
          </div>
        </motion.div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-pure-white p-8 md:p-12 rounded-xl border border-luxury-gold/40 shadow-lg shadow-luxury-gold/10 relative overflow-hidden text-center"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-luxury-gold/40 opacity-50 m-4 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-luxury-gold/40 opacity-50 m-4 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-luxury-gold/40 opacity-50 m-4 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-luxury-gold/40 opacity-50 m-4 rounded-br-sm" />
              
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-gold mb-8 uppercase tracking-widest">
                {event.title}
              </h3>
              
              <div className="space-y-6 flex flex-col items-center">
                <div className="flex items-center gap-4 text-dark-text">
                  <Calendar className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                  <span className="font-sans uppercase tracking-widest text-sm font-medium">
                    {new Date(event.event_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-dark-text">
                  <Clock className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                  <span className="font-sans uppercase tracking-widest text-sm font-medium">
                    {event.start_time.substring(0,5)} — {event.end_time?.substring(0,5)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-dark-text">
                  <MapPin className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                  <span className="font-sans uppercase tracking-widest text-sm font-medium text-center">
                    {event.venue_name}
                    <br />
                    <span className="text-xs opacity-70 mt-1 block">{event.address}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
