
import { useState, useEffect } from 'react';
import { User } from '@/types/users';

export function useUserCache() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Load cached users on mount
  useEffect(() => {
    try {
      const cachedUsersStr = localStorage.getItem('cachedUsers');
      if (cachedUsersStr) {
        const cachedUsers = JSON.parse(cachedUsersStr);
        setUsers(cachedUsers);
        setFilteredUsers(cachedUsers);
      }
    } catch (err) {
      console.error("Error loading cached users:", err);
      // If loading fails, we'll just start with an empty array
    }
  }, []);

  // Update the cache
  const updateCache = (newUsers: User[]) => {
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    
    // Cache the users in localStorage
    try {
      localStorage.setItem('cachedUsers', JSON.stringify(newUsers));
    } catch (err) {
      console.error("Error caching users:", err);
    }
  };

  return {
    users,
    filteredUsers,
    setFilteredUsers,
    updateCache
  };
}
