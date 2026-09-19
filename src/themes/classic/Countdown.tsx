'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsPassed(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-16 mobile-padding relative">
      <div className="w-full max-w-[480px] mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-mobile-small text-luxury-gold mb-10 uppercase tracking-[0.2em] font-medium"
        >
          Counting Down
        </motion.h2>

        {isPassed ? (
          <p className="text-2xl font-serif text-luxury-gold italic">The big day is here!</p>
        ) : (
          <div className="flex flex-row justify-between items-center gap-3">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex-1 flex flex-col items-center bg-pure-white py-6 md:py-8 px-2 rounded-lg border border-luxury-gold/40 shadow-md"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold-gradient mb-2">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-luxury-gold font-medium">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
