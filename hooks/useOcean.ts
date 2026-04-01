'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTION_CFG } from '../lib/data';
const TOTAL = SECTION_CFG.length;
export function useOcean() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const curRef   = useRef(0);
  const velRef   = useRef(0);
  const accRef   = useRef(0);
  const transRef = useRef(false);
  const goTo = useCallback((idx: number) => {
    if (idx === curRef.current || transRef.current) return;
    transRef.current = true;
    curRef.current = idx;
    setCurrent(idx);
    setProgress(idx / (TOTAL - 1));
    setTimeout(() => { transRef.current = false; }, 2600);
  }, []);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const resistance = 1 + curRef.current * 0.15;
      velRef.current += (e.deltaY / 120) * 0.4 / resistance;
      velRef.current = Math.max(-0.5, Math.min(0.5, velRef.current));
    };
    const onKey = (e: KeyboardEvent) => {
      const dn = ['ArrowDown','ArrowRight',' ','PageDown'];
      const up = ['ArrowUp','ArrowLeft','PageUp'];
      if (!dn.includes(e.key) && !up.includes(e.key)) return;
      e.preventDefault();
      if (dn.includes(e.key)) goTo(Math.min(curRef.current+1,TOTAL-1));
      else goTo(Math.max(curRef.current-1,0));
    };
    let ty0=0,ty1=0;
    const onTS=(e:TouchEvent)=>{ty0=ty1=e.touches[0].clientY;};
    const onTM=(e:TouchEvent)=>{ty1=e.touches[0].clientY;};
    const onTE=()=>{const d=ty0-ty1;if(Math.abs(d)>38)goTo(d>0?Math.min(curRef.current+1,TOTAL-1):Math.max(curRef.current-1,0));};
    window.addEventListener('wheel',onWheel,{passive:false});
    window.addEventListener('keydown',onKey);
    window.addEventListener('touchstart',onTS,{passive:true});
    window.addEventListener('touchmove',onTM,{passive:true});
    window.addEventListener('touchend',onTE,{passive:true});
    let raf: number;
    const loop = () => {
      accRef.current += velRef.current;
      velRef.current *= 0.86;
      if (Math.abs(accRef.current) >= 1) {
        const dir = Math.sign(accRef.current);
        accRef.current -= dir;
        goTo(Math.max(0,Math.min(TOTAL-1,curRef.current+dir)));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('wheel',onWheel);
      window.removeEventListener('keydown',onKey);
      window.removeEventListener('touchstart',onTS);
      window.removeEventListener('touchmove',onTM);
      window.removeEventListener('touchend',onTE);
      cancelAnimationFrame(raf);
    };
  }, [goTo]);
  return { current, progress, goTo, cfg: SECTION_CFG[current] };
}
