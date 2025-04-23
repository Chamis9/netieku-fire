
import { useState, useCallback } from 'react';
import { filterSubscribers } from '@/utils/subscriberUtils';
import type { Subscriber } from '@/types/subscribers';

export function useSubscriberSearch(subscribers: Subscriber[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>(subscribers);
  
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = filterSubscribers(subscribers, term);
    setFilteredSubscribers(filtered);
  }, [subscribers]);

  // Update filtered subscribers when the main subscriber list changes
  const updateFilteredSubscribers = useCallback((newSubscribers: Subscriber[]) => {
    if (searchTerm) {
      setFilteredSubscribers(filterSubscribers(newSubscribers, searchTerm));
    } else {
      setFilteredSubscribers(newSubscribers);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    filteredSubscribers,
    handleSearch,
    updateFilteredSubscribers
  };
}
