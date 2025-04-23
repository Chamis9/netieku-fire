
import { useState, useCallback } from 'react';
import { fetchUsers } from '@/utils/user';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useLanguage } from '@/features/language';
import type { User } from '@/types/users';

export function useUserLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuth } = useUserAuth();
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const loadUsers = useCallback(async () => {
    console.log("Starting to fetch users...");
    if (!isAuth) {
      console.log("Not authenticated, skipping fetch");
      setError(t('Nepieciešama autorizācija, lai piekļūtu lietotājiem.', 
                 'Authentication required to access users.'));
      setIsLoading(false);
      return { data: [], error: new Error('Authentication required') };
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await fetchUsers();
      
      if (error) {
        console.error("Error fetching users:", error);
        setError(t('Neizdevās ielādēt lietotājus. Lūdzu, mēģiniet vēlreiz.', 
                   'Failed to load users. Please try again.'));
        return { data: [], error };
      } else {
        console.log("Received user data:", data);
        return { data: data || [], error: null };
      }
    } catch (err) {
      console.error("Unexpected error in loadUsers:", err);
      setError(t('Neizdevās ielādēt lietotājus. Lūdzu, mēģiniet vēlreiz.', 
                 'Failed to load users. Please try again.'));
      return { data: [], error: err instanceof Error ? err : new Error('Unknown error') };
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage.code, t, isAuth]);

  return {
    isLoading,
    error,
    isAuth,
    loadUsers
  };
}
