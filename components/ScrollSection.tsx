import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectorData } from '../types';

interface ScrollSectionProps {
  data: SectorData;
  index: number;
  onInView: (id: string) => void;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ data, index, onInView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(data.id);
    }
  }, [isInView, data.id, onInView]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother Parallax for the content card
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const isEditorial = data.type === 'editorial';

  // --- Broadsheet Editorial Layout (Full Screen Center) ---
  if (isEditorial) {
    return (
      <section ref={containerRef} className="relative min-h-screen py-24 px-4 md:px-12 flex items-center justify-center z-10 pointer-events-none">
        <motion.div 
          style={{ opacity, y }}
          className="w-full max-w-5xl bg-paper-base/95 backdrop-blur-sm shadow-2xl p-8 md:p-20 relative paper-texture border-y-4 border-black pointer-events-auto"
        >
          <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-12 font-sans text-xs uppercase tracking-widest text-gray-500">
            <span>Special Report</span>
            <span>Est. 1847</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-8">
              <h1 className="font-serif text-6xl md:text-8xl mb-12 leading-[0.85] text-ink-black multiply-text tracking-tighter">
                {data.title}
              </h1>
              <div 
                className="font-body text-2xl leading-relaxed text-justify multiply-text text-ink-black/90 first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:font-serif first-letter:leading-none"
                dangerouslySetInnerHTML={{ __html: data.overview }}
              />
            </div>
            <div className="md:col-span-4 flex flex-col justify-center border-l border-black/10 pl-10">
              <div className="font-serif italic text-3xl leading-tight text-ft-salmon mb-8">
                "{data.insights || 'The future is unwritten.'}"
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --- Broadsheet Analysis Layout (Stretched) ---
  return (
    <section ref={containerRef} className="relative min-h-screen py-12 px-2 md:px-6 flex items-center justify-center z-10 pointer-events-none">
      <motion.div 
        style={{ opacity, y }}
        className="w-full max-w-[95vw] bg-paper-base/95 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.6)] p-6 md:p-16 relative paper-texture pointer-events-auto"
      >
        {/* Header Row */}
        <div className="border-b-2 border-black mb-10 pb-4 flex flex-col md:flex-row justify-between items-end gap-4">
          <h2 className="font-serif text-5xl md:text-7xl text-ink-black multiply-text leading-none">
            {data.title}
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] mb-1 text-ft-salmon whitespace-nowrap">
               Sector Report 0{index}
            </span>
            <div className="w-24 h-[1px] bg-black mb-1 hidden md:block"></div>
          </div>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT: Narrative (4 cols) */}
          <div className="lg:col-span-4 flex flex-col border-r border-black/10 pr-0 lg:pr-12">
            <h3 className="font-sans font-bold text-sm uppercase mb-6 text-gray-400 tracking-widest">Market Overview</h3>
            <p className="font-body text-xl leading-relaxed text-justify text-ink-black mb-12 multiply-text">
              {data.overview}
            </p>
            
            <div className="mt-auto bg-black/5 p-8 border-l-4 border-ft-salmon">
              <h4 className="font-serif font-bold italic text-2xl mb-4 text-ft-salmon">"Analysis"</h4>
              <p className="font-body italic text-lg text-ink-black/80 leading-relaxed">{data.insights}</p>
            </div>
          </div>

          {/* CENTER: Data Viz (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex justify-between items-baseline mb-6">
                 <h3 className="font-sans font-bold text-sm uppercase text-gray-400 tracking-widest">Growth Index</h3>
                 <span className="font-mono text-xs text-ft-salmon">2020 — 2025</span>
            </div>
            
            {/* Enhanced Chart */}
            <div className="h-80 w-full mb-8 bg-[#F0EEE6] border border-black/10 p-6 relative shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C19A6B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#C19A6B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    tick={{fontFamily: 'Lora', fontSize: 11, fill: '#666'}} 
                    axisLine={{stroke: '#999'}} 
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    tick={{fontFamily: 'Lora', fontSize: 11, fill: '#666'}} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                        backgroundColor: '#F4F1EA', 
                        borderColor: '#C19A6B', 
                        fontFamily: 'Lora', 
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ color: '#1a1a1a' }}
                    cursor={{ stroke: '#C19A6B', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#C19A6B" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorVal)"
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute bottom-2 right-4 text-[9px] font-sans uppercase text-gray-400 tracking-widest">
                Fig 1.1 — {data.chartLabel}
              </div>
            </div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 gap-px bg-black/10 border border-black/10">
              {data.stats?.map((stat, i) => (
                <div key={i} className="bg-paper-base p-6 hover:bg-[#efede6] transition-colors">
                  <div className="font-sans text-[10px] uppercase text-gray-500 tracking-wider mb-2">{stat.label}</div>
                  <div className="font-serif text-4xl font-bold text-ink-black mb-2">{stat.value}</div>
                  <div className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wide border ${
                      stat.trend === 'up' 
                      ? 'border-green-800 text-green-800 bg-green-50' 
                      : 'border-gray-400 text-gray-600 bg-gray-50'
                  }`}>
                    {stat.trend === 'up' ? '▲' : '■'} {stat.trendValue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Startups / Sidebar (3 cols) */}
          <div className="lg:col-span-3 border-l border-black/10 pl-0 lg:pl-12 pt-8 lg:pt-0">
             <h3 className="font-sans font-bold text-sm uppercase mb-6 text-gray-400 tracking-widest">Notable Ventures</h3>
             <ul className="space-y-8">
               {data.startups?.map((startup, i) => (
                 <li key={i} className="group cursor-pointer">
                   <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-ft-salmon rounded-full group-hover:scale-125 transition-transform" />
                        <div className="font-serif font-bold text-xl leading-none group-hover:text-ft-salmon transition-colors">
                            {startup.name}
                        </div>
                   </div>
                   <div className="font-sans text-xs text-gray-500 mb-2 pl-4 border-l border-gray-200 uppercase tracking-wide">{startup.funding}</div>
                   <p className="font-body text-sm leading-relaxed text-gray-700 pl-4 border-l border-gray-200">
                     {startup.description}
                   </p>
                 </li>
               ))}
             </ul>

             <div className="mt-12 pt-6 border-t border-black/20">
               <h3 className="font-sans font-bold text-xs uppercase mb-3 text-gray-400 tracking-widest">2026 Forecast</h3>
               <p className="font-serif italic text-base leading-relaxed text-ink-black">
                 "{data.futureTrend}"
               </p>
             </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default ScrollSection;