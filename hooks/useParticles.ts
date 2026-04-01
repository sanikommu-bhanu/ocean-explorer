'use client';
import { useEffect, useRef } from 'react';

interface P { x:number;y:number;r:number;vx:number;vy:number;op:number;wb:number;ws:number; }

export function useParticles(ref: React.RefObject<HTMLCanvasElement>, active: boolean, density=1) {
  const alphaRef  = useRef(0);
  const targetRef = useRef(0);
  const frameRef  = useRef(0);
  const parts     = useRef<P[]>([]);

  useEffect(() => { targetRef.current = active ? density : 0; }, [active, density]);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d')!;

    function resize() { cvs.width=innerWidth; cvs.height=innerHeight; }
    resize();
    addEventListener('resize', resize);

    function mkP(spread=false): P {
      return {
        x:  Math.random()*cvs.width,
        y:  spread ? Math.random()*cvs.height : cvs.height+60,
        r:  Math.random()*3.2+.3,
        vx: (Math.random()-.5)*.42,
        vy: -(Math.random()*1.1+.25),
        op: Math.random()*.7+.08,
        wb: Math.random()*Math.PI*2,
        ws: Math.random()*.034+.007,
      };
    }

    const COUNT = 150;
    parts.current = Array.from({length:COUNT},(_,i)=>mkP(i<COUNT*.6));

    function draw() {
      ctx.clearRect(0,0,cvs.width,cvs.height);
      alphaRef.current += (Math.min(targetRef.current,1.6)-alphaRef.current)*.04;

      if (alphaRef.current>.005) {
        for (const p of parts.current) {
          p.wb+=p.ws; p.x+=p.vx+Math.sin(p.wb)*.42; p.y+=p.vy;
          if (p.y<-20) Object.assign(p,mkP(false));
          ctx.save();
          ctx.globalAlpha = p.op*Math.min(alphaRef.current,1);
          const g = ctx.createRadialGradient(p.x-p.r*.3,p.y-p.r*.3,0,p.x,p.y,p.r);
          g.addColorStop(0,  'rgba(210,242,250,.95)');
          g.addColorStop(.55,'rgba(0,245,212,.5)');
          g.addColorStop(1,  'rgba(0,245,212,.03)');
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle=g; ctx.shadowBlur=14; ctx.shadowColor='#00f5d4'; ctx.fill();
          ctx.restore();
        }
      }
      frameRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(frameRef.current); removeEventListener('resize',resize); };
  }, [ref]);
}
