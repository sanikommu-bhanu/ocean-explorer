'use client';
import { motion, AnimatePresence } from 'framer-motion';
interface Props { show: boolean; }
export default function SignatureMoment({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[170] flex flex-col items-center justify-center pointer-events-none"
          initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1.03}} exit={{opacity:0,scale:1.06}}
          transition={{duration:5,ease:[0.16,1,0.3,1]}}>
          <motion.p
            className="font-serif italic text-center"
            style={{fontSize:'clamp(1.8rem,4.2vw,4.2rem)',fontWeight:300,letterSpacing:'.05em',
              lineHeight:1.35,maxWidth:820,padding:'0 48px',
              textShadow:'0 0 120px rgba(0,245,212,0.4),0 0 240px rgba(0,0,0,0.6)',
              color:'rgba(200,238,247,0.92)'}}
            initial={{opacity:0,y:28,scale:0.95}}
            animate={{opacity:0.92,y:0,scale:1}}
            transition={{delay:1,duration:2.8,ease:[0.16,1,0.3,1]}}>
            &ldquo;You are no longer above the ocean.&rdquo;
          </motion.p>
          <motion.div style={{height:1,marginTop:28,
            background:'linear-gradient(90deg,transparent,rgba(0,245,212,0.65),transparent)',
            boxShadow:'0 0 18px rgba(0,245,212,0.25)'}}
            initial={{width:0}} animate={{width:320}}
            transition={{delay:2.2,duration:4,ease:[0.16,1,0.3,1]}}/>
          <motion.p className="font-mono text-[9px] tracking-[0.32em] uppercase"
            style={{color:'rgba(200,238,247,0.32)',marginTop:22}}
            initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            transition={{delay:3,duration:2.4}}>
            200m below the surface
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
