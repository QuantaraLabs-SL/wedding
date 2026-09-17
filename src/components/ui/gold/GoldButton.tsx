'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function GoldButton({ children, className = "", ...props }: GoldButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden bg-gold-gradient text-pure-white px-8 py-4 rounded-md font-sans tracking-widest uppercase text-sm font-medium transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
