import React, { useState, useRef } from 'react';
import { SECTORS } from './constants';
import ScrollSection from './components/ScrollSection';
import ChartVisualizer from './components/ChartVisualizer';
import AIChat from './components/AIChat';
import { motion, useScroll, useTransform } from 'framer-motion';

const App: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTORS[0].id);
  const activeSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[0];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Parallax for hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 100]);

  return (
    <div ref={targetRef} className="relative bg-ink min-h-screen text-ink font-body">

      {/* Progress Bar - Fixed at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section Indicator - Fixed left side */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => document.getElementById(sector.id)?.scrollIntoView({ behavior: 'smooth' })}
            className={`group flex items-center gap-3 transition-all duration-300`}
          >
            <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${
              activeSectorId === sector.id
                ? 'bg-accent scale-150'
                : 'bg-white/30 group-hover:bg-white/60'
            }`} />
            <span className={`font-sans text-xs uppercase tracking-wider transition-all duration-300 ${
              activeSectorId === sector.id
                ? 'text-white opacity-100 translate-x-0'
                : 'text-white/0 opacity-0 -translate-x-2 group-hover:text-white/60 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              {sector.shortTitle}
            </span>
          </button>
        ))}
      </nav>

      {/* Background Visualizer */}
      <ChartVisualizer activeSection={activeSector} />

      {/* Content Layer */}
      <main className="relative z-10 w-full">

        {/* HERO SECTION - Full viewport, dramatic */}
        <section id="intro" className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-20 text-center px-6 max-w-5xl mx-auto"
          >
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-white/60">
                Capital Access 2025
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-headline text-display text-white mb-8 text-balance"
            >
              The Real Numbers Behind{' '}
              <span className="italic text-accent">Chicago Venture</span>
            </motion.h1>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
            >
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">$2.99B</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Disclosed</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">64</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Verified Deals</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">3</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Unicorns</div>
              </div>
            </motion.div>

            {/* Byline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              We verified every deal. Removed 11 that couldn't pass scrutiny.
              This is what actually happened.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-white/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="relative">
          {SECTORS.slice(1).map((sector, index) => (
            <ScrollSection
              key={sector.id}
              data={sector}
              index={index + 1}
              onInView={setActiveSectorId}
            />
          ))}
        </div>

        {/* FOOTER */}
        <footer className="relative z-20 bg-paper text-ink">
          <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <h2 className="font-headline text-headline mb-8">The Bottom Line</h2>
            <p className="font-body text-xl leading-relaxed text-ink-light mb-12 max-w-2xl mx-auto">
              64 verified deals. $2.99 billion disclosed. 79.7% verification rate.
              The question isn't whether Chicago can produce startups—it's whether they'll stay and scale here.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <span className="px-4 py-2 bg-accent/10 text-accent font-sans text-sm rounded-full">HealthTech: 28%</span>
              <span className="px-4 py-2 bg-accent/10 text-accent font-sans text-sm rounded-full">FinTech: 17%</span>
              <span className="px-4 py-2 bg-accent/10 text-accent font-sans text-sm rounded-full">Enterprise: 16%</span>
              <span className="px-4 py-2 bg-accent/10 text-accent font-sans text-sm rounded-full">Deep Tech: 9%</span>
            </div>

            <div className="border-t border-ink/10 pt-12">
              <p className="font-sans text-xs uppercase tracking-wider text-ink/40 mb-4">
                Capital Access Data Project
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-headline italic text-xl text-ink hover:text-accent transition-colors"
              >
                Return to top
              </button>
            </div>
          </div>
        </footer>

      </main>

      {/* AI Chat */}
      <AIChat currentSectorId={activeSectorId} />
    </div>
  );
};

export default App;
