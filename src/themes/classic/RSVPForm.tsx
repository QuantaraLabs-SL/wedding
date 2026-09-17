'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldButton from '@/components/ui/gold/GoldButton';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';
import { WeddingConfig } from '@/types/database';
import { submitRSVP } from '@/lib/api/rsvp';
import { sendRsvpNotification } from '@/lib/emailjs';

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
    <section className="py-24 px-6 relative bg-pure-white" id="rsvp">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GoldOrnament className="w-8 h-8 mb-6 mx-auto" />
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-gold mb-4 leading-tight">
            We&apos;d Love To <br /> Celebrate With You
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-soft-gold-bg border border-luxury-gold/30 p-12 rounded-xl flex flex-col items-center justify-center space-y-6"
            >
              <h3 className="font-serif text-4xl text-luxury-gold uppercase tracking-widest mb-4">
                Thank You
              </h3>
              <p className="font-sans text-dark-text/80 leading-relaxed max-w-md mx-auto">
                Your RSVP has been received. We look forward to celebrating this special day with you.
              </p>
              
              <div className="pt-8 border-t border-luxury-gold/20 w-full mt-4">
                <p className="font-serif text-luxury-gold italic text-xl">
                  {wedding.bride_name} & {wedding.groom_name}
                </p>
                {wedding.wedding_date && (
                  <p className="font-sans text-xs tracking-[0.2em] uppercase mt-2 text-dark-text/60">
                    {new Date(wedding.wedding_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 text-left"
            >
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-md text-sm font-sans text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-4 px-4 rounded-md border font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                    attending === true 
                      ? 'bg-luxury-gold border-luxury-gold text-pure-white shadow-lg shadow-luxury-gold/20' 
                      : 'bg-pure-white border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-soft-gold-bg'
                  }`}
                >
                  Joyfully Attending
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-4 px-4 rounded-md border font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                    attending === false 
                      ? 'bg-luxury-gold border-luxury-gold text-pure-white shadow-lg shadow-luxury-gold/20' 
                      : 'bg-pure-white border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-soft-gold-bg'
                  }`}
                >
                  Unable to Attend
                </button>
              </div>

              <div className="space-y-2 mt-4">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/70 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="E.g. Mr. & Mrs. Perera" 
                  className="w-full bg-pure-white border border-luxury-gold/40 rounded-md p-4 text-dark-text focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/70 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For confirmation and updates" 
                  className="w-full bg-pure-white border border-luxury-gold/40 rounded-md p-4 text-dark-text focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-all"
                />
              </div>

              {attending === true && (
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-dark-text/70 ml-1">Number of Guests</label>
                  <select 
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-pure-white border border-luxury-gold/40 rounded-md p-4 text-dark-text focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-all appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-dark-text/70 ml-1">Message (Optional)</label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message for the couple..." 
                  className="w-full bg-pure-white border border-luxury-gold/40 rounded-md p-4 text-dark-text focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-all"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <GoldButton type="submit" disabled={isSubmitting || attending === null} className="w-full md:w-auto px-12">
                  {isSubmitting ? 'Sending...' : 'Send RSVP'}
                </GoldButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
