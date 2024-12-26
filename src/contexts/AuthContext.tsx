import React, { createContext, useContext, useEffect, useState } from 'react';
    import { Session } from '@supabase/supabase-js';
    import { supabase } from '../lib/supabase';

    interface AuthContextType {
      session: Session | null;
      signIn: (email: string, password: string) => Promise<void>;
      signOut: () => Promise<void>;
      loading: boolean;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    async function createUserRecord(userId: string, email: string) {
      try {
        const { error } = await supabase
          .from('users')
          .upsert(
            {
              id: userId,
              email: email,
            },
            {
              onConflict: 'id',
              ignoreDuplicates: true
            }
          );

        if (error && error.code !== '23505') { // Ignore unique constraint violations
          console.error('Error creating user record:', error);
        }
      } catch (err) {
        console.error('Unexpected error creating user record:', err);
      }
    }

    export function AuthProvider({ children }: { children: React.ReactNode }) {
      const [session, setSession] = useState<Session | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        console.log('AuthContext: useEffect - Initial check for session');
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log('AuthContext: supabase.auth.getSession() - Session:', session);
          setSession(session);
          if (session?.user) {
            createUserRecord(session.user.id, session.user.email!);
          }
          setLoading(false);
        }).catch(error => {
          console.error('AuthContext: supabase.auth.getSession() - Error:', error);
          setLoading(false);
        });

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log('AuthContext: supabase.auth.onAuthStateChange() - Event:', _event, 'Session:', session);
          setSession(session);
          if (session?.user) {
            createUserRecord(session.user.id, session.user.email!);
          }
        });

        return () => {
          console.log('AuthContext: useEffect - Unsubscribing from auth state changes');
          subscription.unsubscribe();
        };
      }, []);

      const signIn = async (email: string, password: string) => {
        console.log('AuthContext: signIn - Attempting sign in with email:', email);
        setLoading(true);
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          console.error('AuthContext: signIn - Error:', error);
          setLoading(false);
          throw error;
        }
        
        if (data.user) {
          console.log('AuthContext: signIn - User signed in:', data.user);
          await createUserRecord(data.user.id, data.user.email!);
        }
        setLoading(false);
      };

      const signOut = async () => {
        console.log('AuthContext: signOut - Attempting sign out');
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('AuthContext: signOut - Error:', error);
          setLoading(false);
          throw error;
        }
        console.log('AuthContext: signOut - User signed out');
        setLoading(false);
      };

      return (
        <AuthContext.Provider value={{ session, signIn, signOut, loading }}>
          {children}
        </AuthContext.Provider>
      );
    }

    export function useAuth() {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    }
