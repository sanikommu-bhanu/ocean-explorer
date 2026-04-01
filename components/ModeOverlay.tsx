'use client';
import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export type OverlayMode = 'none' | 'discover' | 'project' | 'about' | 'join';

interface ModeOverlayProps {
  mode: OverlayMode;
  onClose: () => void;
  onJoinSuccess: () => void;
}

const discoverFacts = [
  { title: 'Oxygen Engine', body: 'Marine phytoplankton produce roughly half of Earth oxygen output.' },
  { title: 'Heat Shield', body: 'The ocean absorbs more than 90% of excess heat from climate change.' },
  { title: 'Blue Carbon', body: 'Mangroves and seagrass lock away carbon up to 10x faster than forests.' },
  { title: 'Unknown Depths', body: 'Most of the seafloor remains unmapped at high resolution today.' },
];

const projectActions = [
  { title: 'Reduce Plastic', body: 'Replace single-use plastic with reusable systems in your daily routine.' },
  { title: 'Support Reefs', body: 'Fund coral restoration and local reef monitoring organizations.' },
  { title: 'Protect Coasts', body: 'Champion mangrove and wetland protection in coastal communities.' },
  { title: 'Smarter Seafood', body: 'Choose traceable, sustainable seafood to reduce ecosystem stress.' },
  { title: 'Citizen Science', body: 'Join coastal cleanups and marine biodiversity data initiatives.' },
  { title: 'Climate Action', body: 'Lower emissions and support policies that protect marine habitats.' },
];

function Card({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: 'rgba(0,245,212,0.35)' }}
      transition={{ duration: 0.45 }}
      className="rounded-md p-5"
      style={{
        background: 'rgba(4, 20, 40, 0.5)',
        border: '1px solid rgba(200,238,247,0.12)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <h3 className="font-mono text-[11px] tracking-[.18em] uppercase text-biolum mb-3">{title}</h3>
      <p className="text-foam/70 leading-[1.7]" style={{ fontSize: '1rem' }}>{body}</p>
    </motion.div>
  );
}

export default function ModeOverlay({ mode, onClose, onJoinSuccess }: ModeOverlayProps) {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (mode !== 'join') {
      setName('');
      setEmail('');
    }
  }, [mode]);

  const submitJoin = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;
    signIn(cleanName, cleanEmail);
    onJoinSuccess();
  };

  return (
    <AnimatePresence>
      {mode !== 'none' && (
        <motion.div
          className="absolute inset-0 z-[300] flex items-center justify-center p-6 md:p-10"
          style={{ background: 'rgba(1, 8, 16, 0.62)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl max-h-[85vh] overflow-auto rounded-lg p-6 md:p-8"
            style={{
              background: 'rgba(2, 12, 24, 0.7)',
              border: '1px solid rgba(200,238,247,0.2)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="font-mono text-[10px] tracking-[.24em] uppercase text-foam/65">
                {mode === 'discover' && 'Discover'}
                {mode === 'project' && 'Project'}
                {mode === 'about' && 'About'}
                {mode === 'join' && 'Join'}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[16px] leading-none text-foam/75 hover:text-biolum transition-colors"
                aria-label="Close overlay"
              >
                x
              </button>
            </div>

            {mode === 'discover' && (
              <div>
                <h2 className="font-serif text-white mb-6" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 300 }}>
                  Explore the Living Ocean
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discoverFacts.map((fact) => <Card key={fact.title} title={fact.title} body={fact.body} />)}
                </div>
              </div>
            )}

            {mode === 'project' && (
              <div>
                <h2 className="font-serif text-white mb-6" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 300 }}>
                  Ocean Protection Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectActions.map((item) => <Card key={item.title} title={item.title} body={item.body} />)}
                </div>
              </div>
            )}

            {mode === 'about' && (
              <div className="max-w-3xl">
                <h2 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 300 }}>
                  Why AquaVerse Exists
                </h2>
                <p className="text-foam/78 leading-[1.8] mb-4">
                  AquaVerse exists to transform ocean awareness into everyday action through immersive storytelling.
                </p>
                <p className="text-foam/72 leading-[1.8] mb-4">
                  The ocean regulates climate, supports biodiversity, and sustains life on Earth. Protecting it is a human priority, not an optional cause.
                </p>
                <p className="text-foam/68 leading-[1.8]">
                  Built with Next.js, React, Framer Motion, and Tailwind CSS to deliver cinematic performance with meaningful interaction.
                </p>
              </div>
            )}

            {mode === 'join' && (
              <div className="max-w-xl">
                <h2 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 300 }}>
                  Become an Ocean Guardian
                </h2>
                <form onSubmit={submitJoin} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-sm font-mono text-[10px] tracking-[.24em] uppercase text-biolum border border-biolum/45 bg-biolum/10 hover:bg-biolum/18 transition-colors"
                  >
                    Join the Movement
                  </button>
                </form>
                    <p className="mt-5 text-biolum/70 font-mono text-[12px] tracking-[.12em]">
                      Joining updates your profile experience across the site.
                    </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
