'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro() {
  const [show, setShow] = useState(true);
  useEffect(()=>{ const t=setTimeout(()=>setShow(false),3500); return()=>clearTimeout(t); },[]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[1000] bg-ink flex flex-col items-center justify-center gap-3"
          exit={{opacity:0}} transition={{duration:1.8,ease:[.16,1,.3,1]}}>
          <motion.h1 className="font-serif text-center text-white"
            style={{fontSize:'clamp(2.8rem,5.5vw,5rem)',fontWeight:300,letterSpacing:'.08em'}}
            initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
            transition={{delay:.5,duration:1.2,ease:[.16,1,.3,1]}}>
            Ocean <em className="italic" style={{color:'#00f5d4'}}>Explorer</em>
          </motion.h1>
          <motion.p className="font-mono text-[10px] tracking-[.42em] uppercase text-foam/35"
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
            transition={{delay:1,duration:1}}>
            Journey Into The Deep
          </motion.p>
          <motion.div className="w-52 h-px bg-white/8 mt-10 relative overflow-hidden"
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.8}}>
            <motion.div className="absolute inset-y-0 left-0 w-full"
              style={{background:'linear-gradient(90deg,transparent,#00f5d4,transparent)'}}
              initial={{x:'-100%'}} animate={{x:'100%'}}
              transition={{delay:1.2,duration:2.6,ease:[.16,1,.3,1]}}/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
