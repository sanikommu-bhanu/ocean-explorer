'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function useCounter(target: number, durationMs = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const from = 0;
    const step = (t: number) => {
      const p = Math.min((t - t0) / durationMs, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return val;
}

const metrics = [
  { k: 'Volunteers', target: 4821, suffix: '' },
  { k: 'Beach Cleanups', target: 317, suffix: '' },
  { k: 'Kg Waste Removed', target: 189420, suffix: '' },
  { k: 'Coastal Partners', target: 64, suffix: '' },
];

export default function AchievementsSection() {
  const animated = useMemo(() => metrics, []);

  return (
    <section id="achievements" className="px-5 md:px-10 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-lg p-6 md:p-8"
          style={{
            background: 'rgba(2, 12, 24, 0.52)',
            border: '1px solid rgba(200,238,247,0.14)',
            backdropFilter: 'blur(22px)',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="font-mono text-[10px] tracking-[.28em] uppercase text-biolum/80 mb-4">
                Achievements
              </div>
              <h2
                className="font-serif text-white leading-[1.02]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 300 }}
              >
                Credibility you can feel.
              </h2>
              <p className="mt-3 max-w-xl text-foam/65 leading-[1.85]" style={{ fontSize: '1.02rem', fontWeight: 300 }}>
                A lightweight, transparent dashboard—built for momentum. No claims without metrics.
              </p>
            </div>

            <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/35">
              Updated quarterly • Mock data (for now)
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {animated.map((m) => (
              <MetricCard key={m.k} label={m.k} target={m.target} suffix={m.suffix} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  const v = useCounter(target, 1200);
  return (
    <motion.div
      className="rounded-md p-4 md:p-5"
      style={{
        background: 'rgba(4,30,58,.44)',
        border: '1px solid rgba(0,245,212,.08)',
        backdropFilter: 'blur(16px)',
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: 'rgba(0,245,212,0.28)', y: -3 }}
    >
      <div className="font-mono text-biolum leading-none" style={{ fontSize: '1.7rem', fontWeight: 800 }}>
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[8px] tracking-[.22em] uppercase text-foam/40">{label}</div>
    </motion.div>
  );
}

