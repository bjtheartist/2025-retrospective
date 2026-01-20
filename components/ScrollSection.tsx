import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SectorData } from '../types';

interface ScrollSectionProps {
  data: SectorData;
  index: number;
  onInView: (id: string) => void;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ data, index, onInView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(data.id);
    }
  }, [isInView, data.id, onInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  const isEditorial = data.type === 'editorial';

  // --- EDITORIAL SECTION (Full-screen quote/insight style) ---
  if (isEditorial) {
    return (
      <section
        ref={containerRef}
        id={data.id}
        className="relative min-h-screen flex items-center justify-center py-24 px-6"
      >
        <motion.div
          style={{ opacity, y }}
          className="max-w-4xl mx-auto"
        >
          {/* Card with subtle background */}
          <div className="bg-paper/95 backdrop-blur-xl rounded-lg shadow-2xl p-10 md:p-16 border border-white/10">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-10">
              <span className="font-sans text-xs uppercase tracking-widest text-accent">
                Analysis
              </span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            {/* Headline */}
            <h2 className="font-headline text-headline text-ink mb-10 text-balance">
              {data.title}
            </h2>

            {/* Body with drop cap effect */}
            <div
              className="font-body text-xl md:text-2xl leading-relaxed text-ink-light [&>strong]:text-ink [&>strong]:font-semibold [&>br]:block [&>br]:h-4"
              style={{
                columnCount: 1,
              }}
              dangerouslySetInnerHTML={{ __html: data.overview }}
            />
          </div>
        </motion.div>
      </section>
    );
  }

  // --- ANALYSIS SECTION (Data-rich layout) ---
  return (
    <section
      ref={containerRef}
      id={data.id}
      className="relative min-h-screen py-20 md:py-32 px-4 md:px-6"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto"
      >
        {/* Main Card */}
        <div className="bg-paper/95 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/10">

          {/* Header */}
          <div className="p-8 md:p-12 border-b border-ink/10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-accent mb-2 block">
                  Section {String(index).padStart(2, '0')}
                </span>
                <h2 className="font-headline text-headline text-ink">
                  {data.title}
                </h2>
              </div>
              {/* Key Stats Pills */}
              <div className="flex flex-wrap gap-3">
                {data.stats?.slice(0, 2).map((stat, i) => (
                  <div
                    key={i}
                    className="bg-ink/5 rounded-full px-4 py-2 flex items-center gap-2"
                  >
                    <span className="font-headline text-2xl text-ink">{stat.value}</span>
                    <span className="font-sans text-xs uppercase tracking-wider text-ink/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* Left Column - Narrative */}
            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-ink/10">
              <p className="font-body text-lg leading-relaxed text-ink-light mb-8">
                {data.overview}
              </p>

              {/* Insight Quote */}
              {data.insights && (
                <div className="border-l-4 border-accent pl-6 py-2">
                  <p className="font-headline italic text-xl text-ink">
                    "{data.insights}"
                  </p>
                </div>
              )}

              {/* Future Trend */}
              {data.futureTrend && (
                <div className="mt-8 p-6 bg-accent/5 rounded-lg">
                  <span className="font-sans text-xs uppercase tracking-widest text-accent mb-2 block">
                    2026 Outlook
                  </span>
                  <p className="font-body text-base text-ink-light">
                    {data.futureTrend}
                  </p>
                </div>
              )}
            </div>

            {/* Middle Column - Chart */}
            <div className="lg:col-span-4 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-ink/10 bg-paper-dark/50">
              <div className="mb-4">
                <span className="font-sans text-xs uppercase tracking-widest text-ink/40">
                  {data.chartLabel || 'Funding Distribution'}
                </span>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#666' }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFDF8',
                        border: '1px solid #E8D5B5',
                        borderRadius: '8px',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                      }}
                      formatter={(value: number, name: string, props: any) => {
                        const label = props.payload?.label || `$${value}M`;
                        return [label, ''];
                      }}
                      cursor={{ fill: 'rgba(200, 85, 61, 0.1)' }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {data.chartData?.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={idx === 0 ? '#C8553D' : '#E8D5B5'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column - Startups List */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <span className="font-sans text-xs uppercase tracking-widest text-ink/40 mb-6 block">
                Notable Deals
              </span>

              <ul className="space-y-6">
                {data.startups?.slice(0, 5).map((startup, i) => (
                  <li key={i} className="group">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent font-sans text-xs flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-headline text-lg text-ink group-hover:text-accent transition-colors">
                          {startup.name}
                        </h4>
                        <p className="font-sans text-xs text-accent mb-1">
                          {startup.funding}
                        </p>
                        <p className="font-body text-sm text-ink/60 leading-relaxed">
                          {startup.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ScrollSection;
