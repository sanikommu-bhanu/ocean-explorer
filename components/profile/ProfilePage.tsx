'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthContext';

const actions = [
  { title: 'Join Beach Cleanup', description: 'Connect with local cleanup missions near your coastline.' },
  { title: 'Participate in Awareness Campaign', description: 'Share educational content and drive collective visibility.' },
  { title: 'View Events', description: 'Discover ocean events, volunteer opportunities, and workshops.' },
];

type Activity = {
  email: string;
  action: string;
  ts: number;
};

const ACTIVITIES_KEY = 'oceanActivities';

export default function ProfilePage() {
  const { user, isAuthenticated, signIn, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [toast, setToast] = useState<string>('');

  const canSubmit = useMemo(() => {
    if (isAuthenticated) return false;
    if (!name.trim()) return false;
    if (!/\S+@\S+\.\S+/.test(email.trim())) return false;
    return true;
  }, [email, isAuthenticated, name]);

  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      setActivities([]);
      return;
    }
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    if (!raw) {
      setActivities([]);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Activity[];
      if (!Array.isArray(parsed)) {
        setActivities([]);
        return;
      }
      const filtered = parsed
        .filter((a) => a?.email === user.email && typeof a?.action === 'string' && typeof a?.ts === 'number')
        .sort((a, b) => b.ts - a.ts);
      setActivities(filtered);
    } catch {
      setActivities([]);
    }
  }, [isAuthenticated, user?.email]);

  const onJoinAction = (actionTitle: string) => {
    if (!user?.email) return;
    const nextItem: Activity = { email: user.email, action: actionTitle, ts: Date.now() };
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    let all: Activity[] = [];
    try {
      all = raw ? (JSON.parse(raw) as Activity[]) : [];
    } catch {
      all = [];
    }
    all.push(nextItem);
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(all));
    setActivities((prev) => [nextItem, ...prev].slice(0, 12));
    setToast(`${actionTitle} added to your activities.`);
    window.setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="min-h-screen" style={{ background: '#010810', color: '#c8eef7' }}>
      <Navbar showBack={false} />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 10%, rgba(0,245,212,0.09) 0%, transparent 60%), radial-gradient(ellipse 90% 80% at 50% 50%, rgba(10,60,90,0.18) 0%, rgba(1,8,16,0.85) 60%, rgba(1,8,16,0.95) 100%)',
        }}
      />

      <main className="relative z-10 px-5 md:px-10 pt-28 pb-20">
        {toast && (
          <div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[340] px-4 py-2 rounded-full font-mono text-[10px] tracking-[.16em] uppercase text-biolum"
            style={{ background: 'rgba(2,13,26,0.65)', border: '1px solid rgba(0,245,212,0.24)', backdropFilter: 'blur(10px)' }}
          >
            {toast}
          </div>
        )}
        <div className="max-w-6xl mx-auto">
          <motion.section
            className="rounded-lg p-6 md:p-8"
            style={{
              background: 'rgba(2, 12, 24, 0.56)',
              border: '1px solid rgba(200,238,247,0.16)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {!isAuthenticated ? (
              <div className="max-w-xl">
                <div className="font-mono text-[10px] tracking-[.24em] uppercase text-biolum/80 mb-3">Profile</div>
                <h1 className="font-serif text-white" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300 }}>
                  Join your ocean dashboard 🌊
                </h1>
                <p className="mt-4 text-foam/68 leading-[1.85]">
                  Sign in to unlock your personal profile and action dashboard.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    signIn(name, email);
                  }}
                  className="mt-6 space-y-4"
                >
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    type="email"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
                  />
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full px-6 py-3 rounded-sm font-mono text-[10px] tracking-[.24em] uppercase transition-all duration-300"
                    style={{
                      color: canSubmit ? '#00f5d4' : 'rgba(0,245,212,0.35)',
                      border: `1px solid ${canSubmit ? 'rgba(0,245,212,.4)' : 'rgba(0,245,212,0.18)'}`,
                      background: canSubmit ? 'rgba(0,245,212,.10)' : 'rgba(0,245,212,.04)',
                      boxShadow: canSubmit ? '0 0 24px rgba(0,245,212,.12)' : 'none',
                      cursor: canSubmit ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Sign In
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="font-mono text-[10px] tracking-[.24em] uppercase text-biolum/80 mb-3">My Profile</div>
                <h1 className="font-serif text-white" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300 }}>
                  Welcome, {user?.name}
                </h1>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <InfoCard label="Name" value={user?.name || ''} />
                  <InfoCard label="Email" value={user?.email || ''} />
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={logout}
                    className="px-6 py-3 rounded-sm font-mono text-[10px] tracking-[.24em] uppercase transition-colors"
                    style={{
                      color: 'rgba(200,238,247,0.70)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </motion.section>

          {isAuthenticated && (
            <motion.section
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {actions.map((action) => (
                <div
                  key={action.title}
                  className="rounded-md p-5"
                  style={{
                    background: 'rgba(4,30,58,.44)',
                    border: '1px solid rgba(0,245,212,.08)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <h3 className="font-mono text-[10px] tracking-[.22em] uppercase text-biolum mb-3">{action.title}</h3>
                  <p className="text-foam/65 leading-[1.75]" style={{ fontSize: '.96rem' }}>{action.description}</p>
                  <button
                    type="button"
                    onClick={() => onJoinAction(action.title)}
                    className="mt-5 px-5 py-2.5 rounded-sm font-mono text-[10px] tracking-[.22em] uppercase text-biolum transition-all"
                    style={{
                      border: '1px solid rgba(0,245,212,.35)',
                      background: 'rgba(0,245,212,.08)',
                    }}
                  >
                    Join Now
                  </button>
                </div>
              ))}
            </motion.section>
          )}

          {isAuthenticated && (
            <motion.section
              id="activities"
              className="mt-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.02 }}
            >
              <div className="font-mono text-[10px] tracking-[.28em] uppercase text-foam/45 mb-4">Your Activities</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.length === 0 ? (
                  <div
                    className="rounded-md p-5"
                    style={{ background: 'rgba(2, 12, 24, 0.35)', border: '1px solid rgba(200,238,247,0.14)', backdropFilter: 'blur(16px)' }}
                  >
                    <div className="font-mono text-[9px] tracking-[.22em] uppercase text-foam/40">No activities yet</div>
                    <div className="mt-2 text-foam/65 leading-[1.7]" style={{ fontSize: '.98rem' }}>
                      Join any action above to create your feed.
                    </div>
                  </div>
                ) : (
                  activities.slice(0, 6).map((a) => (
                    <div
                      key={`${a.action}-${a.ts}`}
                      className="rounded-md p-5"
                      style={{ background: 'rgba(4,30,58,.44)', border: '1px solid rgba(0,245,212,.08)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="font-mono text-[10px] tracking-[.22em] uppercase text-biolum mb-3">{a.action}</div>
                      <div className="text-foam/60 leading-[1.7]" style={{ fontSize: '.95rem' }}>
                        {new Date(a.ts).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-md p-4"
      style={{
        background: 'rgba(4,30,58,.4)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div className="font-mono text-[8px] tracking-[.2em] uppercase text-foam/45">{label}</div>
      <div className="mt-2 text-foam/78">{value}</div>
    </div>
  );
}

