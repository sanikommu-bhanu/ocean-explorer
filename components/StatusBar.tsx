'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionCfg } from '../lib/data';

function useAnimNum(target: number, float = false) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    const from = val, dur = 1100, t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * e;
      setVal(float ? parseFloat(v.toFixed(1)) : Math.round(v));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]); // eslint-disable-line
  return val;
}

interface Props { cfg: SectionCfg & { psi?: number }; progress: number; }

export default function StatusBar({ cfg, progress }: Props) {
  const depth = useAnimNum(cfg.depth);
  const temp  = useAnimNum(cfg.temp, true);
  const psi   = useAnimNum((cfg as any).psi || 14.7, true);

  return (
    <motion.div
      className="fixed bottom-4 left-3 right-3 z-50 flex justify-between items-end md:bottom-6 md:left-12 md:right-12"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 1 }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[7.5px] md:text-[8.5px] tracking-[.18em] uppercase text-foam/36">
          <div className="hidden sm:block w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full border border-foam/14 relative overflow-hidden flex-shrink-0">
            <div className="absolute w-px h-full bg-foam/12 left-1/2" />
            <div className="absolute w-full h-px bg-foam/12 top-1/2" />
          </div>
          Atlantic Ocean
        </div>
        <div className="font-mono text-[7.5px] md:text-[8.5px] tracking-[.14em] text-foam/26">
          DEPTH: <span className="text-biolum" style={{ fontSize: 12 }}>{depth}</span>m
          &nbsp;|&nbsp;TEMP: <span className="text-biolum" style={{ fontSize: 12 }}>{typeof temp === 'number' ? temp.toFixed(1) : temp}</span>°C
          <span className="hidden sm:inline">
            &nbsp;|&nbsp;PSI: <span className="text-biolum" style={{ fontSize: 12 }}>{typeof psi === 'number' ? psi.toFixed(1) : psi}</span>
          </span>
        </div>
      </div>
      <div className="font-mono text-[7.5px] md:text-[8.5px] tracking-[.18em] uppercase text-right text-foam/26">
        <div>Discovery <span style={{ color: 'rgba(200,238,247,.55)' }}>{Math.round(progress * 100)}%</span></div>
        <div className="hidden sm:block mt-1 opacity-50">Ocean Explorer © 2026</div>
      </div>
    </motion.div>
  );
}