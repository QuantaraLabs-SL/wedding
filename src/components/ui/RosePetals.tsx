'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RosePetals() {
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number }[]>([]);

  useEffect(() => {
    // Generate petals only on the client to avoid hydration mismatch
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 7, // 7 to 15 seconds to fall slowly
      size: Math.random() * 12 + 10, // 10px to 22px
      rotation: Math.random() * 360,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `-10%`,
            width: p.size,
            height: p.size,
            borderRadius: '50% 0 50% 0', // Petal shape
            backgroundColor: '#F9A8D4', // Soft pink petal color
            opacity: 0.6,
            boxShadow: '0 2px 4px rgba(249, 168, 212, 0.4)',
          }}
          animate={{
            y: ['0vh', '120vh'], // Fall down through the container
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50], // Drift left/right
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [p.rotation, p.rotation + 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
