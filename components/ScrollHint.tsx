'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { visible: boolean; }

export default function ScrollHint({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}>
          <p className="font-mono text-[9px] tracking-[.32em] uppercase text-foam/35">Scroll to Dive</p>
          <motion.div className="w-px h-9 sh-pulse"
            style={{ background: 'linear-gradient(180deg,rgba(0,245,212,.8),transparent)' }}/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
