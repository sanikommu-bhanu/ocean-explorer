'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const enabled = pathname !== '/';

  const dotRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const x = useRef(0);
  const y = useRef(0);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      x.current += (mx.current - x.current) * 0.22;
      y.current += (my.current - y.current) * 0.22;
      dot.style.left = `${x.current}px`;
      dot.style.top = `${y.current}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none rounded-full z-[9999]"
      style={{
        width: 8,
        height: 8,
        background: '#00eaff',
        boxShadow: '0 0 10px #00eaff, 0 0 20px #00eaff',
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'screen',
        willChange: 'left,top',
      }}
    />
  );
}

