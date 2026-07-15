import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const GlowCursor = () => {
  const { isLightsOn } = useTheme();
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable glow cursor on touch-based devices
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches) {
      setIsVisible(false);
      return;
    }

    if (!isLightsOn) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        // Align center of the glow circle to cursor tip
        cursorRef.current.style.transform = `translate3d(${x - 128}px, ${y - 128}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLightsOn]);

  if (!isLightsOn || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-45 mix-blend-screen opacity-60 transition-opacity duration-300 pointer:coarse:hidden"
      style={{
        background: 'radial-gradient(circle, rgba(246, 177, 0, 0.12) 0%, rgba(246, 177, 0, 0) 70%)',
        willChange: 'transform',
      }}
    />
  );
};
