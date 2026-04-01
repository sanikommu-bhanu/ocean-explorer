'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export type JoinInterests = 'cleanup' | 'awareness' | 'donation';
export type OceanUser = { name: string; email: string; interests: JoinInterests[] };

export default function JoinFlow({ onComplete }: { onComplete: (u: OceanUser) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<JoinInterests[]>([]);

  const canNext = useMemo(() => {
    if (step === 1) return name.trim().length >= 2;
    if (step === 2) return /\S+@\S+\.\S+/.test(email.trim());
    if (step === 3) return interests.length > 0;
    return false;
  }, [step, name, email, interests.length]);

  const next = () => {
    if (!canNext) return;
    if (step < 3) setStep(step + 1);
    else onComplete({ name: name.trim(), email: email.trim(), interests });
  };

  const back = () => setStep(Math.max(1, step - 1));

  return (
    <section id="join" className="px-5 md:px-10 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-lg p-6 md:p-8"
          style={{
            background: 'rgba(2, 12, 24, 0.55)',
            border: '1px solid rgba(200,238,247,0.16)',
            backdropFilter: 'blur(22px)',
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="font-mono text-[10px] tracking-[.28em] uppercase text-biolum/80 mb-4">
                Join Flow
              </div>
              <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 300 }}>
                Become an Ocean Guardian
              </h2>
              <p className="mt-3 text-foam/65 leading-[1.85]" style={{ fontSize: '1.02rem', fontWeight: 300 }}>
                Three steps. No account. Your dashboard unlocks instantly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: i <= step ? 'rgba(0,245,212,0.9)' : 'rgba(255,255,255,0.18)',
                    boxShadow: i <= step ? '0 0 12px rgba(0,245,212,0.35)' : 'none',
                    transition: 'all 240ms ease',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div
                className="rounded-md p-5 md:p-6"
                style={{
                  background: 'rgba(4,30,58,.40)',
                  border: '1px solid rgba(0,245,212,.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/45 mb-3">
                        Step 1 • Your name
                      </div>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                      />
                      <p className="mt-3 text-foam/55 leading-[1.7]" style={{ fontSize: '.96rem' }}>
                        We’ll use this to personalize your dashboard.
                      </p>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/45 mb-3">
                        Step 2 • Your email
                      </div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                      />
                      <p className="mt-3 text-foam/55 leading-[1.7]" style={{ fontSize: '.96rem' }}>
                        No spam. This is a placeholder for future community updates.
                      </p>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/45 mb-3">
                        Step 3 • Choose your focus
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Pick
                          active={interests.includes('cleanup')}
                          onClick={() => toggle(interests, setInterests, 'cleanup')}
                          title="Cleanup"
                          body="Hands-on local action."
                        />
                        <Pick
                          active={interests.includes('awareness')}
                          onClick={() => toggle(interests, setInterests, 'awareness')}
                          title="Awareness"
                          body="Share, educate, amplify."
                        />
                        <Pick
                          active={interests.includes('donation')}
                          onClick={() => toggle(interests, setInterests, 'donation')}
                          title="Donation"
                          body="Fund measurable impact."
                        />
                      </div>
                      <p className="mt-4 text-foam/55 leading-[1.7]" style={{ fontSize: '.96rem' }}>
                        Pick at least one. You can add more later.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="px-5 py-3 rounded-sm font-mono text-[10px] tracking-[.24em] uppercase transition-colors"
                  style={{
                    color: step === 1 ? 'rgba(200,238,247,0.28)' : 'rgba(200,238,247,0.65)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.03)',
                    cursor: step === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className="px-6 py-3 rounded-sm font-mono text-[10px] tracking-[.26em] uppercase transition-all duration-300"
                  style={{
                    color: !canNext ? 'rgba(0,245,212,0.35)' : '#00f5d4',
                    border: `1px solid ${!canNext ? 'rgba(0,245,212,0.18)' : 'rgba(0,245,212,0.40)'}`,
                    background: !canNext ? 'rgba(0,245,212,0.04)' : 'rgba(0,245,212,0.10)',
                    boxShadow: !canNext ? 'none' : '0 0 26px rgba(0,245,212,0.12)',
                    cursor: !canNext ? 'not-allowed' : 'pointer',
                  }}
                >
                  {step < 3 ? 'Continue' : 'Join the Movement'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="rounded-md p-5 md:p-6"
                style={{
                  background: 'rgba(2,13,26,.55)',
                  border: '1px solid rgba(200,238,247,0.12)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/45 mb-4">
                  What you unlock
                </div>
                <ul className="space-y-3 text-foam/65 leading-[1.75]" style={{ fontSize: '.98rem' }}>
                  <li>• A personal action dashboard tailored to your focus.</li>
                  <li>• Lightweight missions you can complete in minutes.</li>
                  <li>• Visible progress loops that turn intent into habit.</li>
                </ul>
                <div className="mt-5 text-foam/45 font-mono text-[9px] tracking-[.22em] uppercase">
                  Stored locally as your profile (mock)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pick({
  active,
  onClick,
  title,
  body,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-md p-4 transition-all duration-300"
      style={{
        background: active ? 'rgba(0,245,212,0.10)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? 'rgba(0,245,212,0.42)' : 'rgba(255,255,255,0.12)'}`,
        boxShadow: active ? '0 0 24px rgba(0,245,212,0.12)' : 'none',
      }}
    >
      <div className="font-mono text-[10px] tracking-[.22em] uppercase" style={{ color: active ? '#00f5d4' : 'rgba(200,238,247,0.65)' }}>
        {title}
      </div>
      <div className="mt-2 text-foam/60 leading-[1.6]" style={{ fontSize: '.95rem' }}>
        {body}
      </div>
    </button>
  );
}

function toggle<T>(arr: T[], setArr: (v: T[]) => void, v: T) {
  if (arr.includes(v)) setArr(arr.filter((x) => x !== v));
  else setArr([...arr, v]);
}

