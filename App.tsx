import React, { useState, useRef } from 'react';
import { SECTORS } from './constants';
import ScrollSection from './components/ScrollSection';
import ChartVisualizer from './components/ChartVisualizer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

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
      {(() => {
        const isDarkSection = activeSector?.type === 'editorial' || activeSector?.id === 'intro';
        return (
          <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                onClick={() => document.getElementById(sector.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`group flex items-center gap-3 transition-all duration-500`}
              >
                <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSectorId === sector.id
                    ? 'bg-accent scale-150'
                    : isDarkSection
                      ? 'bg-white/30 group-hover:bg-white/60'
                      : 'bg-ink/30 group-hover:bg-ink/60'
                }`} />
                <span className={`font-sans text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeSectorId === sector.id
                    ? isDarkSection ? 'text-white opacity-100 translate-x-0' : 'text-ink opacity-100 translate-x-0'
                    : isDarkSection
                      ? 'text-white/0 opacity-0 -translate-x-2 group-hover:text-white/60 group-hover:opacity-100 group-hover:translate-x-0'
                      : 'text-ink/0 opacity-0 -translate-x-2 group-hover:text-ink/60 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                  {sector.shortTitle}
                </span>
              </button>
            ))}
          </nav>
        );
      })()}

      {/* Background Visualizer */}
      <ChartVisualizer activeSection={activeSector} />

      {/* Content Layer */}
      <main className="relative z-10 w-full">

        {/* HERO SECTION - Full viewport, dramatic */}
        <section id="intro" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Chicago skyline background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop)',
                filter: 'grayscale(100%) brightness(0.3)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
          </div>

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
                Chicago Growth Capital · 2025
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-headline text-display text-white mb-8 text-balance"
            >
              The Year in{' '}
              <span className="italic text-accent">Review</span>
            </motion.h1>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
            >
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">64</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Deals Tracked</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">$2.99B</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Capital Deployed</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-4xl md:text-5xl text-white">6</div>
                <div className="font-sans text-xs uppercase tracking-wider text-white/50 mt-2">Sectors</div>
              </div>
            </motion.div>

            {/* Byline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Equity, debt, and strategic investment flowing into Chicago's startup ecosystem.
              A look at where capital went—and what it tells us.
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

        {/* FOOTER - Interactive Options */}
        <footer className="relative z-20 bg-paper text-ink">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">

            {/* Summary Stats */}
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl mb-6">The Record</h2>
              <p className="font-body text-lg text-ink-light max-w-2xl mx-auto mb-8">
                64 verified deals. $2.99 billion in disclosed capital. Six sectors that define Chicago's startup ecosystem in 2025.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-ink/5 text-ink/70 font-sans text-sm rounded-full">HealthTech: 28%</span>
                <span className="px-4 py-2 bg-ink/5 text-ink/70 font-sans text-sm rounded-full">FinTech: 17%</span>
                <span className="px-4 py-2 bg-ink/5 text-ink/70 font-sans text-sm rounded-full">Enterprise: 16%</span>
                <span className="px-4 py-2 bg-ink/5 text-ink/70 font-sans text-sm rounded-full">Deep Tech: 9%</span>
              </div>
            </div>

            {/* Download Options */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a
                href="/chicago-2025-funding.csv"
                download="chicago-2025-funding.csv"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-sans text-sm font-medium rounded-lg hover:bg-accent-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download the Dataset (CSV)
              </a>
            </div>

            {/* Methodology Note */}
            <div className="border-t border-ink/10 pt-12 mb-16">
              <h4 className="font-headline text-lg text-ink mb-4 text-center">Methodology</h4>
              <p className="font-body text-sm text-ink/60 leading-relaxed max-w-2xl mx-auto text-center">
                This dataset includes equity, debt, and strategic capital deployed to Chicago-headquartered startups in 2025. Each deal was verified against primary sources: SEC filings, press releases, and credible reporting. Where deal amounts were undisclosed, we note the gap. The full methodology is documented alongside the data.
              </p>
            </div>

            {/* Sources */}
            <div className="text-center border-t border-ink/10 pt-12">
              <p className="font-sans text-xs uppercase tracking-wider text-ink/40 mb-4">
                Sources & References
              </p>
              <p className="font-body text-sm text-ink/50 mb-8 max-w-xl mx-auto">
                PitchBook-NVCA Venture Monitor • Crain's Chicago Business (John Pletz) • Start Midwest • TechCrunch • Company press releases • SEC filings
              </p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-headline italic text-lg text-ink/60 hover:text-accent transition-colors"
              >
                ↑ Return to top
              </button>

              <p className="font-sans text-xs text-ink/30 mt-8">
                Capital Access Data Project · January 2026
              </p>
            </div>
          </div>
        </footer>

      </main>

      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default App;
