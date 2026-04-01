'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentSection } from '../lib/data';

const WORD = {
  hidden:  { y: 70, opacity: 0, skewY: 3 },
  visible: (i: number) => ({
    y: 0, opacity: 1, skewY: 0,
    transition: { delay: 0.1 + i * 0.13, duration: 0.9, ease: [0.16,1,0.3,1] },
  }),
};

const FADE = (delay: number) => ({
  hidden:  { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay, duration: 1.1, ease: [0.16,1,0.3,1] } },
});

interface Props {
  section: ContentSection;
  active: boolean;
  onTakeAction: () => void;
}

export default function ContentPanel({ section, active, onTakeAction }: Props) {
  const alignCls = {
    left:   'items-start text-left   px-5 sm:px-[8vw] md:pl-[11vw] md:pr-[22vw]',
    center: 'items-center text-center px-5 sm:px-[6vw] md:px-[8vw]',
    right:  'items-end   text-right   px-5 sm:px-[8vw] md:pr-[11vw] md:pl-[25vw]',
  }[section.align];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={section.id}
          className={`absolute inset-0 flex flex-col justify-center ${alignCls}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Label */}
            {section.label && (
              <motion.div
                className="font-mono text-[10px] tracking-[.36em] uppercase text-biolum mb-5"
                variants={FADE(0.2)} initial="hidden" animate="visible"
              >
                {section.num} — {section.label}
              </motion.div>
            )}

            {/* Title */}
            {(section.title.length > 0 || section.italic) && (
              <h2 className="font-serif text-white leading-[.97] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.2rem,7.8vw,7.6rem)', fontWeight: 300,
                  textShadow: '0 8px 60px rgba(0,0,0,.5)' }}>
                {section.title.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
                    <motion.span className="inline-block"
                      custom={i} variants={WORD} initial="hidden" animate="visible">
                      {word}
                    </motion.span>
                  </span>
                ))}
                {section.italic && (
                  <>
                    <br />
                    <span className="inline-block overflow-hidden align-bottom">
                      <motion.em className="inline-block font-serif italic text-foam/90"
                        style={{ fontWeight: 300 }}
                        custom={section.title.length} variants={WORD}
                        initial="hidden" animate="visible">
                        {section.italic}
                      </motion.em>
                    </span>
                  </>
                )}
              </h2>
            )}

            {/* Divider */}
            <motion.div
              style={{ height: 1,
                background: 'linear-gradient(90deg,transparent,#00f5d4,transparent)',
                ...(section.align === 'right'  ? { marginLeft: 'auto' } : {}),
                ...(section.align === 'center' ? { margin: '22px auto' } : { margin: '22px 0' }),
              }}
              initial={{ width: 0 }} animate={{ width: 130 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16,1,0.3,1] }}
            />

            {/* Body */}
            {section.body && (
              <motion.p className="font-serif text-foam/68 leading-[1.82] w-full max-w-full md:max-w-[400px]"
                style={{ fontSize: '1rem', fontWeight: 300, letterSpacing: '.02em' }}
                variants={FADE(0.65)} initial="hidden" animate="visible">
                {section.body}
              </motion.p>
            )}

            {/* Stats */}
            {section.stats && (
              <motion.div className="flex gap-6 md:gap-11 mt-6 md:mt-8 flex-wrap"
                variants={FADE(0.85)} initial="hidden" animate="visible">
                {section.stats.map(s => (
                  <div key={s.k}>
                    <div className="font-mono text-biolum leading-none"
                      style={{ fontSize: 'clamp(1.4rem,5vw,2.1rem)', fontWeight: 700 }}>{s.v}</div>
                    <div className="font-mono text-[8px] tracking-[.22em] uppercase text-foam/38 mt-1">{s.k}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Pills */}
            {section.pills && (
              <motion.div className="flex flex-col gap-2.5 mt-7"
                variants={FADE(0.7)} initial="hidden" animate="visible">
                {section.pills.map(p => (
                  <div key={p} className="flex items-center gap-2.5 px-4 py-1.5 w-fit rounded-full font-mono text-[9px] tracking-[.14em] text-foam/62"
                    style={{ background: 'rgba(2,13,26,.62)', backdropFilter: 'blur(18px)',
                      border: '1px solid rgba(0,245,212,.14)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-biolum dot-pulse flex-shrink-0"/>
                    {p}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Strips */}
            {section.strips && (
              <motion.div className="grid grid-cols-2 md:flex gap-0.5 w-full max-w-full md:max-w-[640px] mt-7 md:mt-9"
                variants={FADE(0.9)} initial="hidden" animate="visible">
                {section.strips.map(s => (
                  <div key={s.k}
                    className="flex-1 h-[78px] flex flex-col items-center justify-center gap-1.5 font-mono text-[8px] tracking-[.14em] uppercase text-foam/4 cursor-pointer transition-all duration-300 hover:text-biolum"
                    style={{ background: 'rgba(4,30,58,.52)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,245,212,.07)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,245,212,.08)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,212,.22)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(4,30,58,.52)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,212,.07)';
                    }}>
                    <span className="font-mono font-bold text-biolum leading-none"
                      style={{ fontSize: '1.3rem' }}>{s.v}</span>
                    {s.k}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Cards */}
            {section.cards && (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 w-full max-w-full md:max-w-[840px] mt-6 md:mt-8"
                variants={FADE(0.7)} initial="hidden" animate="visible">
                {section.cards.map((c, i) => (
                  <motion.div key={c.title}
                    className="p-5 text-left rounded-sm transition-all duration-300"
                    style={{ background: 'rgba(4,30,58,.42)', backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(200,238,247,.08)' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.12 }}
                    whileHover={{ borderColor: 'rgba(0,245,212,.2)', background: 'rgba(4,30,58,.6)' }}>
                    <span className="text-2xl mb-2.5 block">{c.icon}</span>
                    <div className="font-mono text-[9px] tracking-[.2em] uppercase text-biolum mb-2">{c.title}</div>
                    <p className="text-foam/5 leading-[1.68]" style={{ fontSize: '.82rem', fontWeight: 300 }}>{c.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            {section.cta && (
              <motion.a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (section.id === 6) onTakeAction();
                }}
                className="inline-flex pointer-events-auto items-center gap-3 md:gap-3.5 mt-8 md:mt-10 px-5 py-3 md:px-8 md:py-3.5 rounded-sm font-mono text-[9px] md:text-[10px] tracking-[.22em] md:tracking-[.26em] uppercase no-underline transition-all duration-300"
                style={{
                  border: `1px solid ${section.cta.gold ? 'rgba(212,168,71,.38)' : 'rgba(0,245,212,.35)'}`,
                  background: section.cta.gold ? 'rgba(212,168,71,.055)' : 'rgba(0,245,212,.055)',
                  color: section.cta.gold ? '#d4a847' : '#00f5d4',
                  backdropFilter: 'blur(16px)',
                }}
                variants={FADE(1.05)} initial="hidden" animate="visible"
                whileHover={{
                  background: section.cta.gold ? 'rgba(212,168,71,.14)' : 'rgba(0,245,212,.13)',
                  boxShadow: section.cta.gold ? '0 0 36px rgba(212,168,71,.22)' : '0 0 36px rgba(0,245,212,.22)',
                }}
                whileTap={{ scale: 0.98 }}>
                {section.cta.text}
                <motion.span className="inline-block h-px relative align-middle"
                  style={{ width: 24, background: 'currentColor' }}
                  whileHover={{ width: 36 }}>
                  <span style={{ position:'absolute', right:0, top:-3,
                    borderTop:'3px solid transparent', borderBottom:'3px solid transparent',
                    borderLeft:'5px solid currentColor' }}/>
                </motion.span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}