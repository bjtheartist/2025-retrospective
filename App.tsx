import React, { useState, useRef } from 'react';
import { SECTORS } from './constants';
import ScrollSection from './components/ScrollSection';
import ChartVisualizer from './components/ChartVisualizer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useTransform } from 'framer-motion';

const App: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTORS[0].id);
  const activeSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[0];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Parallax Values for the Header title
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={targetRef} className="relative bg-[#0a0a0a] min-h-screen text-slate-200 selection:bg-ft-salmon selection:text-white font-body cursor-none">
      
      {/* 0. UTILITIES */}
      <CustomCursor />
      
      {/* 1. ATMOSPHERIC LAYER (Fixed) */}
      <ChartVisualizer activeSection={activeSector} />

      {/* 2. SCROLLING CONTENT LAYER (Z-10) */}
      <main className="relative z-10 w-full">
        
        {/* MASTHEAD / INTRO - Reverted to Glassmorphism */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative mb-0">
          <motion.div 
            style={{ y: titleY, opacity: titleOpacity }} 
            className="relative z-20 max-w-5xl mx-auto"
          >
             <div className="backdrop-blur-xl bg-black/30 p-12 md:p-24 rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <span className="text-ft-salmon font-body italic tracking-[0.5em] text-sm md:text-base mb-8 block uppercase">
                  The Annual Venture Review
                </span>
                <h1 className="font-serif text-7xl md:text-9xl text-white mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl">
                  Chicago <span className="font-light italic text-white/80">2025</span>
                </h1>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-ft-salmon to-transparent mx-auto mb-10" />
                <p className="font-body text-white/70 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed italic antialiased">
                  "The city of big shoulders has become the city of big data."
                </p>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-white/40 text-xs tracking-[0.4em] uppercase font-sans mix-blend-overlay"
          >
            Scroll to Begin
          </motion.div>
        </section>

        {/* NEWSPAPER SECTIONS */}
        <div className="pb-0">
          {SECTORS.slice(1).map((sector, index) => (
            <ScrollSection 
              key={sector.id} 
              data={sector} 
              index={index}
              onInView={setActiveSectorId} 
            />
          ))}
        </div>
        
        {/* FOOTER */}
        <footer className="min-h-[70vh] flex flex-col items-center justify-center bg-paper-base text-ink-black relative z-20 paper-texture border-t-8 border-black">
          <div className="text-center p-8 max-w-2xl">
            <div className="font-masthead text-4xl mb-6">The End</div>
            <p className="font-body text-sm tracking-widest uppercase opacity-50 mb-12">Chicago Venture Data Systems © 2025</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-serif italic text-xl border-b border-black pb-1 hover:text-ft-salmon transition-colors"
            >
              Return to Top
            </button>
          </div>
        </footer>

      </main>

      <AIChat currentSectorId={activeSectorId} />
    </div>
  );
};

export default App;