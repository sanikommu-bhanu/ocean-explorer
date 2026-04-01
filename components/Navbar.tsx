'use client';

import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';

interface NavbarProps {
  showBack?: boolean;
}

export default function Navbar({ showBack = false }: NavbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 flex items-center justify-between">
      <Link
        href="/"
        className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[.24em] uppercase text-foam/70 hover:text-foam/90 transition-colors"
      >
        <span
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
          style={{ border: '1px solid rgba(0,245,212,0.25)', color: '#00f5d4', boxShadow: '0 0 12px rgba(0,245,212,.12)' }}
        >
          ∿
        </span>
        Ocean Explorer
      </Link>
      <div className="flex items-center gap-3">
        {showBack && (
          <Link
            href="/"
            className="px-4 py-2 rounded-full font-mono text-[10px] tracking-[.2em] uppercase text-foam/70 hover:text-biolum transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)' }}
          >
            Back
          </Link>
        )}
        <ProfileDropdown />
      </div>
    </div>
  );
}

