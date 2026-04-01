'use client';
import { useEffect, useRef } from 'react';

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx=useRef(0), my=useRef(0), rx=useRef(0), ry=useRef(0);

  useEffect(()=>{
    const dot=dotRef.current, ring=ringRef.current;
    if (!dot||!ring) return;

    const mv=(e:MouseEvent)=>{
      mx.current=e.clientX; my.current=e.clientY;
      dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px';
    };
    document.addEventListener('mousemove',mv);

    let raf:number;
    const lerp=()=>{
      rx.current+=(mx.current-rx.current)*.12;
      ry.current+=(my.current-ry.current)*.12;
      ring.style.left=rx.current+'px'; ring.style.top=ry.current+'px';
      raf=requestAnimationFrame(lerp);
    };
    raf=requestAnimationFrame(lerp);

    return ()=>{ document.removeEventListener('mousemove',mv); cancelAnimationFrame(raf); };
  },[]);

  return { dotRef, ringRef };
}
