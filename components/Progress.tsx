'use client';
import { motion } from 'framer-motion';

interface Props { total: number; current: number; progress: number; onGo: (i: number) => void; }

export default function Progress({ total, current, progress, onGo }: Props) {
  return (
    <motion.div
      className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 4, duration: 1 }}>

      {/* Depth track */}
      <div className="w-px h-16 bg-white/10 relative overflow-hidden mb-1">
        <motion.div className="absolute top-0 left-0 w-full"
          style={{ background: 'linear-gradient(180deg,#00f5d4,#1a8fa8)', boxShadow: '0 0 8px #00f5d4' }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}/>
      </div>

      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)}
          aria-label={`Section ${i + 1}`}
          className="rounded-full border border-white/15 transition-all duration-500 hover:border-biolum/6 cursor-pointer"
          style={{
            width: 5, height: 5,
            background: i === current ? '#00f5d4' : 'rgba(255,255,255,.2)',
            boxShadow:  i === current ? '0 0 10px #00f5d4' : 'none',
            transform:  i === current ? 'scale(1.7)' : 'scale(1)',
          }}/>
      ))}

      <p className="font-mono text-[7px] tracking-[.15em] text-foam/25 uppercase mt-1.5"
        style={{ writingMode: 'vertical-rl' }}>
        Depth
      </p>
    </motion.div>
  );
}
