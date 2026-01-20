import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for common interactive elements
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.tagName === 'INPUT'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't render on touch devices (simple check)
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-ft-salmon rounded-full pointer-events-none z-[60] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 800, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[60] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "spring", mass: 0.5, stiffness: 200, damping: 25 }}
      >
        {isHovering && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="w-full h-full flex items-center justify-center"
           >
             {/* Optional icon or text when hovering could go here */}
           </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;