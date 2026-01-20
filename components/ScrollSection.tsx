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
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(data.id);
    }
  }, [isInView, data.id, onInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fade in as section enters, stay visible while sticky, fade out as it exits
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const isEditorial = data.type === 'editorial';

  // --- EDITORIAL SECTION (Pudding-style: text floats on subtle background) ---
  if (isEditorial) {
    return (
      <section
        ref={containerRef}
        id={data.id}
        className="relative min-h-[200vh]"
      >
        {/* Subtle solid background */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

        {/* Sticky container - text floats directly */}
        <div
          ref={stickyRef}
          className="sticky top-0 min-h-screen flex items-center justify-center py-20 px-6 md:px-12"
        >
          <motion.div
            style={{ opacity }}
            className="w-full max-w-3xl mx-auto text-center"
          >
            {/* Section label - subtle */}
            <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
              {data.shortTitle || 'Note'}
            </span>

            {/* Headline - confident, large */}
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-12 text-balance leading-[1.1]">
              {data.title}
            </h2>

            {/* Body - readable width, generous line height */}
            <div
              className="font-body text-lg md:text-xl leading-[1.8] text-white/70 max-w-2xl mx-auto text-left [&>strong]:text-white [&>strong]:font-medium [&>br]:block [&>br]:h-6 [&>em]:text-white/50"
              dangerouslySetInnerHTML={{ __html: data.overview }}
            />
          </motion.div>
        </div>
      </section>
    );
  }

  // --- ANALYSIS SECTION (Cleaner, less boxy) ---
  return (
    <section
      ref={containerRef}
      id={data.id}
      className="relative min-h-[200vh]"
    >
      {/* Subtle paper background */}
      <div className="absolute inset-0 bg-paper" />

      <div className="sticky top-0 min-h-screen flex items-center py-16 md:py-20 px-6 md:px-12">
        <motion.div
          style={{ opacity }}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Header - Clean and simple */}
          <div className="text-center mb-16">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Section {String(index).padStart(2, '0')}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-ink mb-6">
              {data.title}
            </h2>
            {/* Key Stats - inline */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {data.stats?.slice(0, 3).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-headline text-3xl md:text-4xl text-ink">{stat.value}</div>
                  <div className="font-sans text-xs uppercase tracking-wider text-ink/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left - Narrative */}
            <div>
              <p className="font-body text-lg md:text-xl leading-[1.8] text-ink-light mb-10">
                {data.overview}
              </p>

              {/* Insight Quote */}
              {data.insights && (
                <blockquote className="border-l-2 border-accent pl-6 my-10">
                  <p className="font-headline italic text-2xl text-ink leading-snug">
                    "{data.insights}"
                  </p>
                </blockquote>
              )}

              {/* Future Trend */}
              {data.futureTrend && (
                <div className="mt-10 pt-8 border-t border-ink/10">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-3 block">
                    Looking Ahead
                  </span>
                  <p className="font-body text-base text-ink-light leading-relaxed">
                    {data.futureTrend}
                  </p>
                </div>
              )}
            </div>

            {/* Right - Chart + Deals */}
            <div>
              {/* Chart */}
              <div className="mb-12">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink/40 mb-4 block">
                  {data.chartLabel || 'Funding Distribution'}
                </span>
                <div className="h-64">
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
                        tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#666' }}
                        width={90}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFDF8',
                          border: '1px solid #E8D5B5',
                          borderRadius: '4px',
                          fontFamily: 'Inter',
                          fontSize: '12px',
                        }}
                        formatter={(value: number, name: string, props: any) => {
                          const label = props.payload?.label || `$${value}M`;
                          return [label, ''];
                        }}
                        cursor={{ fill: 'rgba(30, 58, 95, 0.08)' }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[0, 2, 2, 0]}
                        animationDuration={1200}
                        animationEasing="ease-out"
                      >
                        {data.chartData?.map((entry, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={idx === 0 ? '#1E3A5F' : '#CBD5E1'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Notable Deals */}
              <div>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink/40 mb-6 block">
                  Notable Deals
                </span>
                <ul className="space-y-5">
                  {data.startups?.slice(0, 4).map((startup, i) => (
                    <li key={i} className="flex items-baseline gap-4">
                      <span className="font-sans text-xs text-accent font-medium">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-headline text-lg text-ink">
                          {startup.name}
                          <span className="font-sans text-sm text-accent ml-2">{startup.funding}</span>
                        </h4>
                        <p className="font-body text-sm text-ink/50 mt-1">
                          {startup.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollSection;
