'use client';
import { motion } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';
interface Props {
  onJourney: () => void;
  onDiscover: () => void;
  onProject: () => void;
  onAbout: () => void;
  onTakeAction: () => void;
}
const LINKS = ['Journey', 'Discover', 'Project', 'About', 'Take Action'] as const;
export default function Nav({ onJourney, onDiscover, onProject, onAbout, onTakeAction }: Props) {
  const handlers = {
    Journey: onJourney,
    Discover: onDiscover,
    Project: onProject,
    About: onAbout,
    'Take Action': onTakeAction,
  } as const;
  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-7"
      initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}
      transition={{delay:3.6,duration:1.2,ease:[.16,1,.3,1]}}>
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[.28em] uppercase text-foam/85">
        <div className="w-[30px] h-[30px] rounded-full border border-biolum/4 flex items-center justify-center text-biolum"
          style={{boxShadow:'0 0 12px rgba(0,245,212,.15)'}}>∿</div>
        Ocean Explorer
      </div>
      <div className="flex items-center gap-6">
        <ul className="flex gap-7 list-none">
          {LINKS.map((l,i)=>(
            <motion.li key={l} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
              transition={{delay:3.7+i*.08,duration:.8}}>
              <a href="#" onClick={e=>{ e.preventDefault(); handlers[l](); }}
                className="relative font-mono text-[10px] tracking-[.22em] uppercase text-foam/45 hover:text-foam/88 no-underline transition-colors duration-300 group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-biolum group-hover:w-full transition-all duration-[400ms]"/>
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:4.2,duration:.8}}>
          <ProfileDropdown />
        </motion.div>
      </div>
    </motion.nav>
  );
}
