'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, signIn, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const canSubmit = useMemo(() => {
    if (isAuthenticated) return false;
    const n = name.trim();
    const e = email.trim();
    if (n.length < 2) return false;
    return /\S+@\S+\.\S+/.test(e);
  }, [email, isAuthenticated, name]);

  const initials = useMemo(() => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join('');
  }, [user?.name]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          border: '1px solid rgba(200,238,247,0.22)',
          background: 'rgba(2,13,26,0.55)',
          backdropFilter: 'blur(10px)',
          color: isAuthenticated ? '#00f5d4' : 'rgba(200,238,247,0.72)',
        }}
        aria-label="Open profile menu"
      >
        {isAuthenticated ? initials : '○'}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md p-2 z-[320]"
          style={{
            background: 'rgba(2,12,24,0.9)',
            border: '1px solid rgba(200,238,247,0.18)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          }}
        >
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2 border-b border-white/10">
                <div className="font-mono text-[10px] tracking-[.16em] uppercase text-biolum">{user?.name}</div>
                <div className="mt-1 text-foam/55" style={{ fontSize: '.82rem' }}>{user?.email}</div>
              </div>
              <MenuLink href="/profile" label="My Profile" onClick={() => setOpen(false)} />
              <MenuLink href="/profile#activities" label="My Activities" onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full mt-1 text-left px-3 py-2 rounded text-foam/72 hover:text-biolum hover:bg-biolum/10 transition-colors font-mono text-[10px] tracking-[.16em] uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (!canSubmit) return;
                signIn(name, email);
                setOpen(false);
              }}
              className="px-3 py-2"
            >
              <div className="font-mono text-[10px] tracking-[.16em] uppercase text-biolum/85 mb-2">
                Sign In
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 mb-2 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full px-3 py-2 mb-2 rounded-md bg-white/5 border border-white/20 text-foam placeholder:text-foam/45 outline-none focus:border-biolum/70"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full text-left px-3 py-2 rounded text-biolum bg-biolum/10 hover:bg-biolum/18 transition-colors font-mono text-[10px] tracking-[.16em] uppercase"
                style={{ border: '1px solid rgba(0,245,212,0.35)' }}
              >
                Enter
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block mt-1 px-3 py-2 rounded text-foam/72 hover:text-biolum hover:bg-biolum/10 transition-colors font-mono text-[10px] tracking-[.16em] uppercase"
    >
      {label}
    </Link>
  );
}

