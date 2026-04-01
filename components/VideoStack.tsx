'use client';

import { useEffect, useRef } from 'react';
import { VIDEOS } from '../lib/videos';
interface Props {
  current: number;
  mouseX: number;
  mouseY: number;
}

export default function VideoStack({ current, mouseX, mouseY }: Props) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevRef = useRef<number>(-1);
  const pmxRef = useRef<number>(0);
  const pmyRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // ✅ Autoplay fix (retry on user interaction)
  useEffect(() => {
    const retryAll = () => {
      videoRefs.current.forEach((v) => {
        if (v && v.paused) {
          v.play().catch(() => {});
        }
      });
    };

    document.addEventListener('click', retryAll, { once: true });
    document.addEventListener('touchend', retryAll, { once: true });

    return () => {
      document.removeEventListener('click', retryAll);
      document.removeEventListener('touchend', retryAll);
    };
  }, []);

  // ✅ ONLY play current video (performance fix)
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current]);

  // ✅ Fade transition (no re-render)
  useEffect(() => {
    const prev = prevRef.current;

    if (prev >= 0 && prev !== current) {
      const el = wrapperRefs.current[prev];
      if (el) {
        el.style.opacity = '0';
        el.style.zIndex = '0';
      }
    }

    const cur = wrapperRefs.current[current];
    if (cur) {
      cur.style.opacity = '1';
      cur.style.zIndex = '1';
    }

    prevRef.current = current;
  }, [current]);

  // ✅ Mouse parallax (smooth RAF loop)
  useEffect(() => {
    const tick = () => {
      pmxRef.current += (mouseX - pmxRef.current) * 0.04;
      pmyRef.current += (mouseY - pmyRef.current) * 0.04;

      const xp = (pmxRef.current / (window.innerWidth || 1) - 0.5) * 7;
      const yp = (pmyRef.current / (window.innerHeight || 1) - 0.5) * 7;

      const v = videoRefs.current[current];
if (v) {
  const isSeventh = current === 6;

  v.style.transform = isSeventh
    ? `rotate(90deg) scale(1.2) translate(${xp}px, ${yp}px) translateZ(0)`
    : `scale(1.08) translate(${xp}px, ${yp}px) translateZ(0)`;
}
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0" style={{ isolation: 'isolate' }}>
      {VIDEOS.map((src, i) => (
        <div
          key={i}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          style={{
             position: "absolute",
  top: "50%",
  left: "50%",

  // 🔥 KEY FIX FOR 7TH VIDEO
  width: i === 6 ? "160vh" : "100%",
  height: i === 6 ? "160vw" : "100%",

  objectFit: "cover",

  opacity: i === 0 ? 1 : 0,
  zIndex: i === 0 ? 1 : 0,
  transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1)',

  transform:
    i === 6
      ? "translate(-50%, -50%) rotate(90deg) scale(1.3)"
      : "translate(-50%, -50%) scale(1.08)",
       pointerEvents:"none",
  filter: "saturate(1.1) brightness(0.85) contrast(1.05)",
  willChange: "transform, opacity",
          }}
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',

              // ✅ 7th video fix
              objectFit: i === 6 ? 'contain' : 'cover',

              transform:
                i === 6
                  ? 'rotate(90deg) scale(1.2)'
                  : 'scale(1.08)',

              filter: 'saturate(1.1) brightness(0.85) contrast(1.05)',
              willChange: 'transform, filter',
            }}
          />
        </div>
      ))}
    </div>
  );
}