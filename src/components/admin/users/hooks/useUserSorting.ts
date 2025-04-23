
import { useState, useMemo, useEffect } from "react";
import { User } from "@/types/users";
import { SortField, SortDirection } from "../UserTableHeader";

export function useUserSorting(users: User[], searchTerm: string) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  // Sort users if sorting is applied
  const sortedUsers = useMemo(() => {
    if (!sortField || !sortDirection) return users;
    
    return [...users].sort((a, b) => {
      const valueA = a[sortField as keyof User];
      const valueB = b[sortField as keyof User];
      
      // Handle null values
      if (valueA === null) return sortDirection === 'asc' ? -1 : 1;
      if (valueB === null) return sortDirection === 'asc' ? 1 : -1;
      
      // Special case for dates
      if (sortField === 'created_at' || sortField === 'last_sign_in_at') {
        const dateA = valueA ? new Date(valueA as string).getTime() : 0;
        const dateB = valueB ? new Date(valueB as string).getTime() : 0;
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // Default string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return 0;
    });
  }, [users, sortField, sortDirection]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  
  // Get current page of users
  const currentUsers = useMemo(() => {
    return sortedUsers.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedUsers, page, pageSize]);
  
  // Reset to first page when search or sort changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortField, sortDirection]);

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    sortedUsers,
    currentUsers,
    sortField,
    sortDirection,
    handleSort
  };
}
