import { WeddingEvent } from '@/types/database';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';

export default function EventsTimeline({ events }: { events: WeddingEvent[] }) {
  return (
    <section className="py-20 mobile-padding relative bg-soft-gold-bg overflow-hidden">
      <div className="w-full max-w-[360px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif heading-mobile text-gold-gradient mb-4 uppercase tracking-widest">
            The Celebration
          </h2>
          <div className="flex justify-center">
            <GoldOrnament className="w-6 h-6 opacity-60" />
          </div>
        </motion.div>

        <div className="space-y-8">
          {events.map((event, index) => {
            const startDate = new Date(event.event_date);
            const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent('Wedding Celebration')}&location=${encodeURIComponent(event.venue_name + ', ' + event.address)}`;
            const mapLink = event.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue_name + ' ' + event.address)}`;

            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-pure-white p-6 md:p-8 rounded-xl border border-luxury-gold/40 shadow-lg shadow-luxury-gold/10 relative overflow-hidden text-center"
              >
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-luxury-gold/40 opacity-50 m-3 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-luxury-gold/40 opacity-50 m-3 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-luxury-gold/40 opacity-50 m-3 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-luxury-gold/40 opacity-50 m-3 rounded-br-sm" />
                
                <h3 className="font-serif text-2xl text-luxury-gold mb-8 uppercase tracking-widest leading-tight">
                  {event.title}
                </h3>
                
                <div className="space-y-6 flex flex-col items-center">
                  <div className="flex flex-col items-center gap-2 text-dark-text">
                    <Calendar className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                    <span className="font-sans uppercase tracking-widest text-mobile-small font-semibold">
                      {startDate.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 text-dark-text">
                    <Clock className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                    <span className="font-sans uppercase tracking-widest text-mobile-small font-semibold">
                      {event.start_time.substring(0,5)} — {event.end_time?.substring(0,5)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 text-dark-text">
                    <MapPin className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                    <span className="font-sans uppercase tracking-widest text-mobile-small font-semibold text-center leading-relaxed">
                      {event.venue_name}
                      <br />
                      <span className="text-[11px] opacity-70 mt-1 block">{event.address}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a 
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target w-full bg-pure-white border border-luxury-gold text-luxury-gold rounded font-sans uppercase tracking-widest text-xs font-semibold active:bg-soft-gold-bg transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 mr-2" /> Add to Calendar
                  </a>
                  <a 
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target w-full bg-gold-gradient text-white rounded font-sans uppercase tracking-widest text-xs font-semibold active:opacity-80 transition-opacity"
                  >
                    <Navigation className="w-4 h-4 mr-2" /> Get Directions
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
