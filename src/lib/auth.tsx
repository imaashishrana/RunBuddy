import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import { createOrUpdateProfile } from "./profile";
import type { AuthError, Session, User } from "@supabase/supabase-js";

type SignInPayload = {
  email: string;
  password: string;
};

type SignUpPayload = SignInPayload & {
  fullName?: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (payload: SignInPayload) => Promise<{ data: { session: Session | null; user: User | null } | null; error: AuthError | null }>;
  signUp: (payload: SignUpPayload) => Promise<{ data: { session: Session | null; user: User | null } | null; error: AuthError | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      authListener.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: SignInPayload) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    return { data, error };
  };

  const signUp = async ({ email, password, fullName }: SignUpPayload) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName ?? undefined,
        },
      },
    });

    if (data.user?.id) {
      await createOrUpdateProfile({
        id: data.user.id,
        full_name: fullName ?? data.user.email?.split("@")[0] ?? null,
      });
    }

    setLoading(false);
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({ user, session, loading, signIn, signUp, signOut }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
