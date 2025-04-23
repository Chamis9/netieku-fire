
import { useState, useCallback } from 'react';
import { filterUsers } from '@/utils/user';
import type { User } from '@/types/users';

export function useUserSearch(users: User[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = filterUsers(users, term);
    setFilteredUsers(filtered);
  }, [users]);

  // Update filtered users when the main user list changes
  const updateFilteredUsers = useCallback((newUsers: User[]) => {
    if (searchTerm) {
      setFilteredUsers(filterUsers(newUsers, searchTerm));
    } else {
      setFilteredUsers(newUsers);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    filteredUsers,
    handleSearch,
    updateFilteredUsers
  };
}
