
import { useState, useEffect } from 'react';
import { Subscriber } from '@/types/subscribers';

export function useSubscriberCache() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);

  // Load cached subscribers on mount
  useEffect(() => {
    try {
      const cachedSubscribersStr = localStorage.getItem('cachedSubscribers');
      if (cachedSubscribersStr) {
        const cachedSubscribers = JSON.parse(cachedSubscribersStr);
        setSubscribers(cachedSubscribers);
        setFilteredSubscribers(cachedSubscribers);
      }
    } catch (err) {
      console.error("Error loading cached subscribers:", err);
      // If loading fails, we'll just start with an empty array
    }
  }, []);

  // Update the cache
  const updateCache = (newSubscribers: Subscriber[]) => {
    setSubscribers(newSubscribers);
    setFilteredSubscribers(newSubscribers);
    
    // Cache the subscribers in localStorage
    try {
      localStorage.setItem('cachedSubscribers', JSON.stringify(newSubscribers));
    } catch (err) {
      console.error("Error caching subscribers:", err);
    }
  };

  return {
    subscribers,
    filteredSubscribers,
    setFilteredSubscribers,
    updateCache
  };
}
