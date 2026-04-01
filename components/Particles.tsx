'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParticles } from '../hooks/useParticles';

interface Props { active: boolean; density?: number; }

export default function Particles({ active, density=1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useParticles(ref, active, density);
  return (
    <motion.canvas ref={ref}
      className="absolute inset-0 z-[6] pointer-events-none gpu"
      animate={{opacity:active?1:0}}
      transition={{duration:3,ease:'easeInOut'}}/>
  );
}
