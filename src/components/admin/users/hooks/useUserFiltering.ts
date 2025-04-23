
import { useState, useCallback, useMemo, useEffect } from "react";
import { User } from "@/types/users";

export interface UserFilters {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  lastLogin: string;
}

const initialFilters: UserFilters = {
  name: "",
  email: "",
  phone: "",
  role: "",
  status: "",
  joinDate: "",
  lastLogin: ""
};

export function useUserFiltering(users: User[], searchTerm: string) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<UserFilters>(initialFilters);
  // Add state to track updated users to prevent status flickering
  const [updatedUsers, setUpdatedUsers] = useState<Record<string, User>>({});

  const handleOpenFilter = useCallback(() => {
    setIsFilterDialogOpen(true);
  }, []);

  const handleApplyFilter = useCallback((filters: UserFilters) => {
    setActiveFilters(filters);
    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback((key: keyof UserFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: ""
    }));
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters(initialFilters);
    setPage(1);
  }, []);

  // Add a function to track updated users
  const trackUserUpdate = useCallback((updatedUser: User) => {
    setUpdatedUsers(prev => ({
      ...prev,
      [updatedUser.id]: updatedUser
    }));
  }, []);

  const filteredUsers = useMemo(() => {
    // Apply updates to user list first
    const mergedUsers = users.map(user => 
      updatedUsers[user.id] ? { ...user, ...updatedUsers[user.id] } : user
    );
    
    return mergedUsers.filter(user => {
      const fullName = [user.first_name, user.last_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      
      if (activeFilters.name && !fullName.includes(activeFilters.name.toLowerCase())) {
        return false;
      }
      if (activeFilters.email && !user.email?.toLowerCase().includes(activeFilters.email.toLowerCase())) {
        return false;
      }
      if (activeFilters.phone && !user.phone?.toLowerCase().includes(activeFilters.phone.toLowerCase())) {
        return false;
      }
      if (activeFilters.role && user.role !== activeFilters.role) {
        return false;
      }
      if (activeFilters.status && user.status !== activeFilters.status) {
        return false;
      }
      
      return true;
    });
  }, [users, activeFilters, updatedUsers]);
  
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  
  const currentUsers = useMemo(() => {
    return filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredUsers, page, pageSize]);
  
  useEffect(() => {
    setPage(1);
  }, [searchTerm, activeFilters]);

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    isFilterDialogOpen,
    setIsFilterDialogOpen,
    activeFilters,
    filteredUsers,
    currentUsers,
    handleOpenFilter,
    handleApplyFilter,
    handleRemoveFilter,
    handleClearFilters,
    trackUserUpdate
  };
}
