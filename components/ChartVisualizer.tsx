import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectorData } from '../types';

interface ChartVisualizerProps {
  activeSection: SectorData | null;
}

const ChartVisualizer: React.FC<ChartVisualizerProps> = ({ activeSection }) => {
  // Determine if we're on an editorial (dark) or analysis (light) section
  const isDarkSection = activeSection?.type === 'editorial' || activeSection?.id === 'intro';

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* Base background that transitions between dark/light */}
      <AnimatePresence mode="sync">
        <motion.div
          key={isDarkSection ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 ${isDarkSection ? 'bg-ink' : 'bg-paper'}`}
        />
      </AnimatePresence>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default ChartVisualizer;
