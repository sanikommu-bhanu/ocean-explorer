'use client';
import { motion } from 'framer-motion';
import { SectionCfg } from '../lib/data';
interface Props { cfg: SectionCfg; idx: number; }
export default function DepthFX({ cfg, idx }: Props) {
  const speed = 1 + idx * 0.35;
  return (
    <>
      <motion.div className="absolute inset-0 z-[2] pointer-events-none"
        animate={{background:`linear-gradient(180deg,${cfg.depthBg} 0%,transparent 45%,${cfg.depthBg} 100%)`}}
        transition={{duration:2.2*speed,ease:[0.16,1,0.3,1]}}/>
      <motion.div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"
        animate={{opacity:cfg.rays?1:0}} transition={{duration:cfg.rays?3.5:2.5,ease:'easeInOut'}}>
        <div style={{position:'absolute',inset:'-20%',animation:'raysDrift 14s ease-in-out infinite',transformOrigin:'50% -10%'}}>
          {[{l:'18%',rot:'-6deg',w:3,op:.7,bl:2},{l:'29%',rot:'-3deg',w:2,op:.9,bl:0},{l:'41%',rot:'2deg',w:4,op:.6,bl:1.5},{l:'53%',rot:'-1deg',w:2,op:.8,bl:0},{l:'64%',rot:'4deg',w:3,op:.7,bl:0},{l:'75%',rot:'-2deg',w:2,op:.5,bl:2},{l:'84%',rot:'3deg',w:2,op:.65,bl:0}].map((r,i)=>(
            <div key={i} style={{position:'absolute',top:0,left:r.l,width:r.w,height:'130%',transformOrigin:'top center',transform:`rotate(${r.rot})`,background:'linear-gradient(180deg,rgba(255,255,255,0.11) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)',filter:`blur(${r.bl}px)`,opacity:r.op}}/>
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 z-[4] pointer-events-none"
        style={{background:'linear-gradient(0deg,rgba(0,4,12,0.85) 0%,rgba(0,4,12,0.1) 30%,transparent 55%),linear-gradient(180deg,rgba(0,4,12,0.4) 0%,transparent 25%)'}}
        animate={{opacity:cfg.fog?1:0}} transition={{duration:3,ease:'easeInOut'}}/>
      <motion.div className="absolute inset-0 z-[5] pointer-events-none"
        style={{background:'radial-gradient(ellipse 60% 30% at 30% 20%,rgba(0,245,212,0.04) 0%,transparent 70%),radial-gradient(ellipse 40% 20% at 70% 40%,rgba(0,200,220,0.03) 0%,transparent 60%)',animation:'shimmerA 6s ease-in-out infinite'}}
        animate={{opacity:cfg.particles?0.8:0}} transition={{duration:3,ease:'easeInOut'}}/>
      <motion.div className="absolute inset-0 z-[7] pointer-events-none"
        style={{background:'radial-gradient(ellipse 70% 70% at 50% 50%,transparent 0%,rgba(0,3,8,0.3) 40%,rgba(0,2,6,0.82) 100%)'}}
        animate={{opacity:cfg.abyss?1:0,scale:cfg.abyss?1.04:1}} transition={{duration:4,ease:'easeInOut'}}/>
      <div className="fixed inset-0 z-[8] pointer-events-none"
        style={{background:`radial-gradient(ellipse 120% 100% at 50% 50%,transparent 30%,rgba(0,5,14,${cfg.abyss?0.6:0.45}) 65%,rgba(0,3,10,${cfg.abyss?0.92:0.78}) 100%)`,
          transition:'background 3s ease'}}/>
    </>
  );
}
