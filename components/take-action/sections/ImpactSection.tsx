'use client';

import { motion } from 'framer-motion';

const stats = [
  { v: '80%', k: 'Ocean Unexplored' },
  { v: '11M', k: 'Tons Plastic / Year' },
  { v: '50%', k: 'O₂ From Ocean' },
];

export default function ImpactSection() {
  return (
    <section className="min-h-screen flex items-center px-5 md:px-10 pt-28 pb-14">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            className="font-mono text-[10px] tracking-[.32em] uppercase text-biolum/80 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Take Action
          </motion.div>

          <motion.h1
            className="font-serif text-white leading-[0.98] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(3rem, 6.2vw, 5.2rem)',
              fontWeight: 300,
              textShadow: '0 12px 80px rgba(0,0,0,0.55), 0 0 90px rgba(0,245,212,0.10)',
            }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            The ocean keeps us alive.
            <br />
            <em className="italic text-foam/90">Now it needs us.</em>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-foam/70 leading-[1.9]"
            style={{ fontSize: '1.06rem', fontWeight: 300, letterSpacing: '.02em' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            This is a guided entry into a real movement: small actions, consistent habits, and community momentum.
            Join as an Ocean Guardian and unlock a personal action dashboard—no accounts, no friction.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#join"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-sm font-mono text-[10px] tracking-[.26em] uppercase text-biolum no-underline transition-all duration-300"
              style={{
                border: '1px solid rgba(0,245,212,.40)',
                background: 'rgba(0,245,212,.08)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 28px rgba(0,245,212,0.10)',
              }}
            >
              Enter the Movement <span className="inline-block w-7 h-px" style={{ background: 'currentColor' }} />
            </a>
            <a
              href="#achievements"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-sm font-mono text-[10px] tracking-[.26em] uppercase text-foam/65 no-underline transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,.14)',
                background: 'rgba(255,255,255,.04)',
                backdropFilter: 'blur(16px)',
              }}
            >
              See our proof <span className="inline-block w-7 h-px" style={{ background: 'currentColor' }} />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            className="rounded-lg p-6 md:p-7"
            style={{
              background: 'rgba(2, 12, 24, 0.55)',
              border: '1px solid rgba(200,238,247,0.16)',
              backdropFilter: 'blur(22px)',
              boxShadow: '0 0 60px rgba(0,0,0,0.35)',
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[10px] tracking-[.28em] uppercase text-foam/60 mb-5">
              Impact Snapshot
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="rounded-md p-4"
                  style={{
                    background: 'rgba(4,30,58,.42)',
                    border: '1px solid rgba(0,245,212,.08)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <div className="font-mono text-biolum leading-none" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                    {s.v}
                  </div>
                  <div className="mt-2 font-mono text-[8px] tracking-[.22em] uppercase text-foam/40">{s.k}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-foam/60 leading-[1.8]" style={{ fontSize: '.98rem' }}>
              Every action here maps to a simple habit loop: choose a focus, commit to one task, then expand your impact.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

