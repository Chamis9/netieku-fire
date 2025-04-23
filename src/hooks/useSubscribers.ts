
import { useState, useEffect, useCallback } from 'react';
import { useSubscriberCache } from '@/hooks/useSubscriberCache';
import { useSubscriberActions } from '@/hooks/useSubscriberActions';
import { useSubscriberSearch } from '@/hooks/useSubscriberSearch';
import { useSubscriberLoading } from '@/hooks/useSubscriberLoading';
import { useLanguage } from '@/features/language';
import type { Subscriber } from '@/types/subscribers';

export type { Subscriber };

export function useSubscribers() {
  const { subscribers, updateCache } = useSubscriberCache();
  const { isLoading, error, isAuth, loadSubscribers } = useSubscriberLoading();
  const { handleDeleteSubscriber, handleUpdateSubscriber, handleDownloadCSV } = useSubscriberActions();
  const { searchTerm, filteredSubscribers, handleSearch, updateFilteredSubscribers } = useSubscriberSearch(subscribers);
  const { currentLanguage } = useLanguage();

  const getSubscribers = useCallback(async () => {
    const { data, error } = await loadSubscribers();
    
    if (!error && data) {
      updateCache(data);
    } else {
      updateCache([]);
    }
  }, [loadSubscribers, updateCache]);

  // When the subscribers list is updated, we need to update the filtered list as well
  useEffect(() => {
    updateFilteredSubscribers(subscribers);
  }, [subscribers, updateFilteredSubscribers]);

  const wrappedHandleDeleteSubscriber = async (id: number) => {
    await handleDeleteSubscriber(
      id, 
      subscribers, 
      searchTerm, 
      updateCache, 
      updateFilteredSubscribers
    );
  };

  const wrappedHandleUpdateSubscriber = async (id: number, email: string) => {
    await handleUpdateSubscriber(
      id, 
      email, 
      subscribers, 
      searchTerm, 
      updateCache, 
      updateFilteredSubscribers
    );
  };

  const wrappedHandleDownloadCSV = () => {
    handleDownloadCSV(subscribers, currentLanguage);
  };

  return {
    subscribers: filteredSubscribers,
    searchTerm,
    isLoading,
    error,
    isAuth,
    handleSearch,
    handleDeleteSubscriber: wrappedHandleDeleteSubscriber,
    handleUpdateSubscriber: wrappedHandleUpdateSubscriber,
    handleDownloadCSV: wrappedHandleDownloadCSV,
    refreshSubscribers: getSubscribers,
    totalSubscribers: subscribers.length
  };
}
