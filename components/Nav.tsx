'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

interface Props {
  onJourney: () => void;
  onDiscover: () => void;
  onProject: () => void;
  onAbout: () => void;
  onTakeAction: () => void;
}

const LINKS = ['Journey', 'Discover', 'Project', 'About', 'Take Action'] as const;

export default function Nav({ onJourney, onDiscover, onProject, onAbout, onTakeAction }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlers = {
    Journey: onJourney,
    Discover: onDiscover,
    Project: onProject,
    About: onAbout,
    'Take Action': onTakeAction,
  } as const;

  const handleLink = (l: typeof LINKS[number]) => {
    handlers[l]();
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-5 md:px-12 md:py-7"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[.28em] uppercase text-foam/85">
          <div
            className="w-[30px] h-[30px] rounded-full border border-biolum/40 flex items-center justify-center text-biolum flex-shrink-0"
            style={{ boxShadow: '0 0 12px rgba(0,245,212,.15)' }}
          >∿</div>
          <span className="hidden sm:inline">Ocean Explorer</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-7 list-none">
            {LINKS.map((l, i) => (
              <motion.li key={l}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.7 + i * 0.08, duration: 0.8 }}
              >
                <a href="#" onClick={e => { e.preventDefault(); handleLink(l); }}
                  className="relative font-mono text-[10px] tracking-[.22em] uppercase text-foam/45 hover:text-foam/88 no-underline transition-colors duration-300 group">
                  {l}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-biolum group-hover:w-full transition-all duration-[400ms]" />
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2, duration: 0.8 }}>
            <ProfileDropdown />
          </motion.div>
        </div>

        {/* Mobile: profile + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ProfileDropdown />
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="flex flex-col gap-[5px] p-1.5 rounded border border-foam/15"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-foam/60 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-foam/60 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-foam/60 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-40 pt-20 pb-8 px-6 flex flex-col gap-4 md:hidden"
            style={{ background: 'rgba(1,8,16,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(200,238,247,0.08)' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map(l => (
              <a key={l} href="#"
                onClick={e => { e.preventDefault(); handleLink(l); }}
                className="font-mono text-[11px] tracking-[.28em] uppercase text-foam/55 hover:text-biolum transition-colors duration-200 no-underline py-2 border-b border-foam/6 last:border-0"
              >
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}