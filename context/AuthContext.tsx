'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const KEY = 'oceanAuthUser';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthUser;
      if (parsed?.name && parsed?.email) setUser(parsed);
    } catch {
      localStorage.removeItem(KEY);
    }
  }, []);

  const signIn = (name: string, email: string) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;
    const next: AuthUser = { name: cleanName, email: cleanEmail };
    setUser(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

