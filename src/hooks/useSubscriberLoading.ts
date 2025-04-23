
import { useState, useCallback } from 'react';
import { fetchSubscribers } from '@/utils/subscriberUtils';
import { useSubscriberAuth } from '@/hooks/useSubscriberAuth';
import { useLanguage } from '@/features/language';
import type { Subscriber } from '@/types/subscribers';

export function useSubscriberLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuth } = useSubscriberAuth();
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const loadSubscribers = useCallback(async () => {
    console.log("Starting to fetch subscribers...");
    if (!isAuth) {
      console.log("Not authenticated, skipping fetch");
      setError(t('Nepieciešama autorizācija, lai piekļūtu abonentiem.', 
                 'Authentication required to access subscribers.'));
      setIsLoading(false);
      return { data: [], error: new Error('Authentication required') };
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await fetchSubscribers();
      
      if (error) {
        console.error("Error fetching subscribers:", error);
        setError(t('Neizdevās ielādēt abonentus. Lūdzu, mēģiniet vēlreiz.', 
                   'Failed to load subscribers. Please try again.'));
        return { data: [], error };
      } else {
        console.log("Received subscriber data:", data);
        return { data: data || [], error: null };
      }
    } catch (err) {
      console.error("Unexpected error in loadSubscribers:", err);
      setError(t('Neizdevās ielādēt abonentus. Lūdzu, mēģiniet vēlreiz.', 
                 'Failed to load subscribers. Please try again.'));
      return { data: [], error: err instanceof Error ? err : new Error('Unknown error') };
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage.code, t, isAuth]);

  return {
    isLoading,
    error,
    isAuth,
    loadSubscribers
  };
}
