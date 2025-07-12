import { supabase } from './client';

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: { full_name: string; user_type: 'teen' | 'university' }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }
};