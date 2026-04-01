'use client';

import { motion } from 'framer-motion';
import type { OceanUser } from './JoinFlow';

const actions = [
  { title: 'Beach Cleanup', body: 'Find a spot, grab a bag, and log 15 minutes. Momentum beats perfection.' },
  { title: 'Awareness Campaigns', body: 'Share one fact, one week. Create ripple effects that compound.' },
  { title: 'Donations', body: 'Back verified projects. Small recurring support is powerful.' },
];

export default function UserDashboard({ user, onReset }: { user: OceanUser; onReset: () => void }) {
  const initials = (user.name || 'OG')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <section className="px-5 md:px-10 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-lg p-6 md:p-8"
          style={{
            background: 'rgba(2, 12, 24, 0.55)',
            border: '1px solid rgba(200,238,247,0.16)',
            backdropFilter: 'blur(22px)',
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-mono"
                style={{
                  color: '#00f5d4',
                  border: '1px solid rgba(0,245,212,0.28)',
                  background: 'rgba(0,245,212,0.06)',
                  boxShadow: '0 0 22px rgba(0,245,212,0.10)',
                }}
              >
                {initials || '∿'}
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[.28em] uppercase text-biolum/80 mb-2">
                  Welcome, {user.name} 🌊
                </div>
                <div className="font-serif text-white leading-[1.1]" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', fontWeight: 300 }}>
                  {user.name}
                </div>
                <div className="mt-2 font-mono text-[9px] tracking-[.2em] uppercase text-foam/40">
                  {user.email}
                </div>
                <div className="mt-3 font-mono text-[9px] tracking-[.2em] uppercase text-foam/35">
                  Focus: <span className="text-foam/60">{user.interests.join(' • ')}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="self-start px-5 py-3 rounded-sm font-mono text-[10px] tracking-[.24em] uppercase transition-colors"
              style={{
                color: 'rgba(200,238,247,0.65)',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              Reset
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((a) => (
              <motion.div
                key={a.title}
                className="rounded-md p-5"
                style={{
                  background: 'rgba(4,30,58,.44)',
                  border: '1px solid rgba(0,245,212,.08)',
                  backdropFilter: 'blur(16px)',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(0,245,212,0.28)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-mono text-[10px] tracking-[.22em] uppercase text-biolum mb-3">{a.title}</div>
                <p className="text-foam/65 leading-[1.75]" style={{ fontSize: '.98rem', fontWeight: 300 }}>
                  {a.body}
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-sm font-mono text-[10px] tracking-[.22em] uppercase transition-all duration-300"
                    style={{
                      color: '#00f5d4',
                      border: '1px solid rgba(0,245,212,0.35)',
                      background: 'rgba(0,245,212,0.08)',
                    }}
                  >
                    Start
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-md p-5"
            style={{
              background: 'rgba(2,13,26,.55)',
              border: '1px solid rgba(200,238,247,0.12)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/45 mb-3">
              Your next 7 days
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <PlanItem day="Day 1" text="Choose one mission. Keep it small." />
              <PlanItem day="Day 3" text="Repeat the mission once. Log the win." />
              <PlanItem day="Day 7" text="Expand to a second focus area." />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PlanItem({ day, text }: { day: string; text: string }) {
  return (
    <div
      className="rounded-md p-4"
      style={{
        background: 'rgba(4,30,58,.38)',
        border: '1px solid rgba(0,245,212,.06)',
      }}
    >
      <div className="font-mono text-[9px] tracking-[.22em] uppercase text-biolum/80">{day}</div>
      <div className="mt-2 text-foam/60 leading-[1.7]" style={{ fontSize: '.95rem' }}>
        {text}
      </div>
    </div>
  );
}

