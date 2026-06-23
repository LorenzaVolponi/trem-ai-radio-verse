import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type ProfileRole = string | null;

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  userLabel: string | null;
  role: ProfileRole;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const ADMIN_ROLES = new Set(['admin', 'administrator', 'super_admin', 'admin_master']);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getMetadataRole = (user: User | null): ProfileRole => {
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role;
  return typeof role === 'string' ? role : null;
};

const hasAdminRole = (role: ProfileRole) => (role ? ADMIN_ROLES.has(role.toLowerCase()) : false);

const loadProfileRole = async (user: User | null): Promise<ProfileRole> => {
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Erro ao carregar perfil administrativo:', error.message);
    return getMetadataRole(user);
  }

  return data?.role ?? getMetadataRole(user);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<ProfileRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setRole(await loadProfileRole(session?.user ?? null));
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(true);

      setTimeout(async () => {
        const nextRole = await loadProfileRole(session?.user ?? null);

        if (!isMounted) return;

        setRole(nextRole);
        setLoading(false);
      }, 0);
    });

    restoreSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setLoading(false);
      return false;
    }

    const nextRole = await loadProfileRole(data.user);
    const isAuthorized = hasAdminRole(nextRole);

    if (!isAuthorized) {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setRole(null);
      setLoading(false);
      return false;
    }

    setSession(data.session);
    setUser(data.user);
    setRole(nextRole);
    setLoading(false);
    return true;
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  const value = useMemo<AuthContextType>(() => ({
    isAuthenticated: Boolean(session),
    isAdmin: Boolean(session) && hasAdminRole(role),
    loading,
    session,
    user,
    userLabel: user?.email ?? user?.user_metadata?.username ?? null,
    role,
    login,
    logout,
  }), [loading, role, session, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
