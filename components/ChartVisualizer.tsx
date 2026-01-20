import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SectorData } from '../types';

interface ChartVisualizerProps {
  activeSection: SectorData | null;
}

const ChartVisualizer: React.FC<ChartVisualizerProps> = ({ activeSection }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effect: The background moves slower than the foreground
  // y: [0, '20%'] means as we scroll down, the background moves down slightly, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0a]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSection?.id}
          initial={{ opacity: 0, filter: 'blur(10px) grayscale(100%)' }}
          animate={{ opacity: 0.6, filter: 'blur(0px) grayscale(80%)' }} // Increased opacity for better visibility behind glass
          exit={{ opacity: 0, filter: 'blur(20px) grayscale(100%)' }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          style={{ y, scale }}
          className="absolute inset-[-10%] bg-cover bg-center" // Negative inset to allow movement without cutting off
        >
            <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${activeSection?.image})` }}
            />
        </motion.div>
      </AnimatePresence>
      
      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-[#0a0a0a] opacity-50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
      
      {/* Halftone Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '3px 3px'
        }} 
      />
    </div>
  );
};

export default ChartVisualizer;