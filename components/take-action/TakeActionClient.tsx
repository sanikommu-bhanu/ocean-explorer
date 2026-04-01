'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthContext';
import ImpactSection from './sections/ImpactSection';
import AchievementsSection from './sections/AchievementsSection';

export default function TakeActionClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#010810', color: '#c8eef7' }}>
      <Navbar showBack={false} />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 10%, rgba(0,245,212,0.09) 0%, transparent 60%), radial-gradient(ellipse 90% 80% at 50% 50%, rgba(10,60,90,0.18) 0%, rgba(1,8,16,0.85) 60%, rgba(1,8,16,0.95) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10">
        <ImpactSection />
        <AchievementsSection />
        <section className="px-5 md:px-10 pb-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              style={{
                background: 'rgba(2, 12, 24, 0.55)',
                border: '1px solid rgba(200,238,247,0.16)',
                backdropFilter: 'blur(22px)',
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-[.28em] uppercase text-biolum/80 mb-3">Join Now</div>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300 }}>
                  Join the Movement
                </h2>
                <p className="mt-3 text-foam/65 leading-[1.8]" style={{ fontSize: '1rem' }}>
                  Enter your personal ocean dashboard and start acting today.
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-7 py-3.5 rounded-sm font-mono text-[10px] tracking-[.26em] uppercase transition-all duration-300"
                style={{
                  color: '#00f5d4',
                  border: '1px solid rgba(0,245,212,.40)',
                  background: 'rgba(0,245,212,.10)',
                  boxShadow: '0 0 24px rgba(0,245,212,0.12)',
                }}
              >
                Join the Movement
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-5 md:px-10 pb-6 pt-10 pointer-events-none">
        <div
          className="pointer-events-auto max-w-6xl mx-auto flex items-center justify-between gap-3"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(1,8,16,0.75) 55%, rgba(1,8,16,0.92) 100%)',
          }}
        >
          <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/35">
            AquaVerse Take Action • Lightweight • No backend yet
          </div>
          <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/25">
            {isAuthenticated ? 'Profile ready' : 'Sign in to personalize'}
          </div>
        </div>
      </div>
    </div>
  );
}

