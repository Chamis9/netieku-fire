
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useUserAuth() {
  const [isAuth, setIsAuth] = useState(false);

  // Check for authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuth(!!data.session);
      
      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setIsAuth(!!session);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);

  return { isAuth };
}
