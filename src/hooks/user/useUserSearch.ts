
import { useState, useEffect } from "react";
import { User } from "@/types/users";
import { filterUsers } from "@/utils/user";

export function useUserSearch(users: User[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (users.length > 0) {
        if (searchTerm.trim() === '') {
          setFilteredUsers(users);
        } else {
          setFilteredUsers(filterUsers(users, searchTerm));
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return {
    searchTerm,
    filteredUsers,
    handleSearch,
    setFilteredUsers
  };
}
