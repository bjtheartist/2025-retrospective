import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SectorData } from '../types';

interface ChartVisualizerProps {
  activeSection: SectorData | null;
}

const ChartVisualizer: React.FC<ChartVisualizerProps> = ({ activeSection }) => {
  const { scrollYProgress } = useScroll();

  // Parallax: background moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-ink">
      {/* Background Image with Parallax */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSection?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ y, scale }}
          className="absolute inset-[-20%]"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${activeSection?.image})`,
              filter: 'grayscale(100%) brightness(0.4)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/50" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(18,18,18,0.8) 100%)',
        }}
      />
    </div>
  );
};

export default ChartVisualizer;
