import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ScrollReveal = ({ children, delay = 0, duration = 0.8, yOffset = 30, className = "" }) => {
  const { reducedMotion } = useTheme();

  // If user prefers reduced motion, bypass standard transitions
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.215, 0.61, 0.355, 1] // Out-cubic bezier for premium snap feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
