'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldButton from '@/components/ui/gold/GoldButton';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';
import { WeddingConfig } from '@/types/database';
import { submitRSVP } from '@/lib/api/rsvp';
import { sendRsvpNotification } from '@/lib/emailjs';
import { CheckCircle2 } from 'lucide-react';

export default function RSVPForm({ wedding }: { wedding: WeddingConfig }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [attending, setAttending] = useState<boolean | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (attending === null) {
      setError('Please indicate your attendance.');
      return;
    }

    if (!fullName || !email) {
      setError('Name and email are required.');
      return;
    }

    setIsSubmitting(true);
    
    // Save to Supabase
    const rsvpResult = await submitRSVP({
      wedding_id: wedding.id,
      guest_name: fullName,
      email: email,
      attendance: attending ? 'attending' : 'not_attending',
      guest_count: attending ? guestCount : 0,
      message: message || null
    });

    if (!rsvpResult.success) {
      setError(rsvpResult.error || 'Failed to submit RSVP. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    // Try sending email, but don't fail the RSVP if it fails
    const mainEvent = wedding.events && wedding.events.length > 0 ? wedding.events[0] : null;
    
    const emailData = {
      guest_name: fullName,
      guest_email: email,
      attendance: attending ? 'Joyfully Attending' : 'Unable to Attend',
      guest_count: attending ? guestCount : 0,
      message: message || 'No message provided.',
      wedding_date: wedding.wedding_date ? new Date(wedding.wedding_date).toLocaleDateString() : 'TBD',
      wedding_time: mainEvent?.start_time || 'TBD',
      venue_name: mainEvent?.venue_name || 'TBD',
      venue_location: mainEvent?.address || 'TBD',
      invitation_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toLocaleString()
    };

    await sendRsvpNotification(emailData);

    // Show success state
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="py-20 mobile-padding relative bg-pure-white" id="rsvp">
      <div className="w-full max-w-[360px] mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 w-full"
        >
          <GoldOrnament className="w-6 h-6 mb-4 mx-auto" />
          <h2 className="font-serif heading-mobile text-luxury-gold mb-2 leading-tight uppercase tracking-widest">
            RSVP
          </h2>
          <p className="text-dark-text/70 text-mobile-small mt-2 font-sans">
            Please let us know if you can make it.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-soft-gold-bg border border-luxury-gold/30 p-8 rounded-xl flex flex-col items-center justify-center space-y-6 w-full"
            >
              <CheckCircle2 className="w-16 h-16 text-luxury-gold mb-2" />
              <h3 className="font-serif text-3xl text-luxury-gold uppercase tracking-widest text-center leading-tight">
                Thank You! &hearts;
              </h3>
              <p className="font-sans text-dark-text/90 leading-relaxed text-center text-mobile-body font-medium">
                Your RSVP has been received.
              </p>
              <p className="font-sans text-dark-text/80 leading-relaxed text-center text-mobile-small">
                {attending ? "We look forward to celebrating with you!" : "Thank you for letting us know."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 text-left w-full"
            >
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-md text-sm font-sans text-center shadow-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/80 font-semibold block ml-1 mb-2">
                  Attendance
                </label>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`touch-target w-full rounded-md border font-sans text-sm tracking-widest uppercase transition-all duration-300 font-semibold ${
                      attending === true 
                        ? 'bg-luxury-gold border-luxury-gold text-pure-white shadow-lg shadow-luxury-gold/20' 
                        : 'bg-pure-white border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-soft-gold-bg'
                    }`}
                  >
                    &#10003; Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`touch-target w-full rounded-md border font-sans text-sm tracking-widest uppercase transition-all duration-300 font-semibold ${
                      attending === false 
                        ? 'bg-luxury-gold border-luxury-gold text-pure-white shadow-lg shadow-luxury-gold/20' 
                        : 'bg-pure-white border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-soft-gold-bg'
                    }`}
                  >
                    &#10005; Unable to Attend
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/80 font-semibold ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="E.g. Mr. & Mrs. Perera" 
                  className="touch-target w-full bg-pure-white border border-luxury-gold/40 rounded-md px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all placeholder:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/80 font-semibold ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For confirmation" 
                  className="touch-target w-full bg-pure-white border border-luxury-gold/40 rounded-md px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all placeholder:opacity-50"
                />
              </div>

              {attending === true && (
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-dark-text/80 font-semibold ml-1">Number of Guests</label>
                  <div className="relative">
                    <select 
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="touch-target w-full bg-pure-white border border-luxury-gold/40 rounded-md px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-luxury-gold">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/80 font-semibold ml-1">Message <span className="opacity-60">(Optional)</span></label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message..." 
                  className="w-full bg-pure-white border border-luxury-gold/40 rounded-md px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all placeholder:opacity-50 resize-none min-h-[100px]"
                />
              </div>

              <div className="mt-6 w-full">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="touch-target w-full bg-gold-gradient text-white rounded font-sans uppercase tracking-widest text-sm font-semibold active:opacity-80 transition-opacity shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'CONFIRM RSVP'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
