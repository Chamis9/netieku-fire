
import { useState, useEffect } from 'react';

export const useUserCount = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const handleUserCountUpdate = (event: CustomEvent<{count: number}>) => {
      setUserCount(event.detail.count);
    };

    window.addEventListener('userCountUpdated', handleUserCountUpdate as EventListener);

    return () => {
      window.removeEventListener('userCountUpdated', handleUserCountUpdate as EventListener);
    };
  }, []);

  return userCount;
};
