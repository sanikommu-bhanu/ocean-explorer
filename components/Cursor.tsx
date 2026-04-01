'use client';
import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={dotRef} className="fixed z-[9999] pointer-events-none rounded-full"
        style={{width:8,height:8,background:'#00f5d4',transform:'translate(-50%,-50%)',
          boxShadow:'0 0 12px #00f5d4,0 0 24px rgba(0,245,212,.5)',mixBlendMode:'screen',
          transition:'width .2s,height .2s',willChange:'left,top'}} />
      <div ref={ringRef} className="fixed z-[9998] pointer-events-none rounded-full"
        style={{width:36,height:36,border:'1px solid rgba(0,245,212,.3)',
          transform:'translate(-50%,-50%)',willChange:'left,top'}} />
    </>
  );
}
