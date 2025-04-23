
import React, { useState, useCallback } from "react";
import { useLanguage } from "@/features/language";
import { useToast } from "@/hooks/use-toast";
import { EmptyOrErrorState } from "@/components/admin/users/EmptyOrErrorState";
import { UserListHeader } from "@/components/admin/users/UserListHeader";
import { UserListTable } from "@/components/admin/users/UserListTable";
import { UserDataError } from "@/components/admin/users/UserDataError";
import { UserEmptyState } from "@/components/admin/users/UserEmptyState";
import { RefreshDataButton } from "@/components/admin/users/RefreshDataButton";
import { useRegisteredUsers } from "@/hooks/useRegisteredUsers";
import { AddUserDialog } from "@/components/admin/users/AddUserDialog";
import { SortField, SortDirection } from "@/components/admin/users/UserTableHeader";
import { Pagination } from "@/components/ui/pagination";
import { User } from "@/types/users";
import { useUserFiltering } from "./users/hooks/useUserFiltering";

export function RegisteredUsers() {
  const { 
    users, 
    searchTerm, 
    isLoading, 
    error, 
    fetchRegisteredUsers, 
    handleSearch, 
    handleUserUpdated, 
    handleUserDeleted,
    handleToggleStatus,
    handleDownloadCSV 
  } = useRegisteredUsers();
  
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  
  // Use our enhanced useUserFiltering hook
  const {
    page,
    setPage,
    pageSize,
    totalPages,
    filteredUsers,
    currentUsers,
    trackUserUpdate
  } = useUserFiltering(users, searchTerm);
  
  // Sort users based on sort field and direction
  const sortedUsers = React.useMemo(() => {
    if (!sortField || !sortDirection) return filteredUsers;
    
    return [...filteredUsers].sort((a, b) => {
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
  }, [filteredUsers, sortField, sortDirection]);
  
  // Apply pagination to sorted users
  const currentSortedUsers = React.useMemo(() => {
    return sortedUsers.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedUsers, page, pageSize]);

  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  // Reset to first page when search or sort changes
  React.useEffect(() => {
    setPage(1);
  }, [searchTerm, sortField, sortDirection, setPage]);

  const handleAddUser = () => {
    setIsAddDialogOpen(true);
  };
  
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
  };

  // Enhanced handle toggle status to update local state immediately
  const enhancedToggleStatus = useCallback(async (user: User) => {
    // Immediately update local state for responsive UI
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const updatedUser = {
      ...user,
      status: newStatus as 'active' | 'inactive',
      updated_at: new Date().toISOString()
    };
    
    // Track the updated user to maintain consistent state
    trackUserUpdate(updatedUser);
    
    // Call the actual API update function
    await handleToggleStatus(user);
  }, [handleToggleStatus, trackUserUpdate]);

  // Handle user added event with immediate refresh
  const handleUserAdded = useCallback((newUser: User) => {
    // Update the user in the local state
    handleUserUpdated(newUser);
    // Refresh the data to ensure we have the latest from the server
    fetchRegisteredUsers();
  }, [handleUserUpdated, fetchRegisteredUsers]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Lietotāju pārvaldība', 'User Management')}</h1>
        <p className="text-muted-foreground">{t('Pārvaldiet platformas lietotājus', 'Manage platform users')}</p>
      </div>
      
      <RefreshDataButton onRefresh={fetchRegisteredUsers} isLoading={isLoading} />
      
      {isLoading ? (
        <EmptyOrErrorState 
          isLoading={true} 
          error=""
        />
      ) : error ? (
        <UserDataError error={error} onRetry={fetchRegisteredUsers} />
      ) : (
        <>
          <UserListHeader 
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            onDownloadCSV={handleDownloadCSV}
            onAddUser={handleAddUser}
          />
          
          {sortedUsers.length === 0 && searchTerm ? (
            <EmptyOrErrorState 
              isLoading={false} 
              error=""
              searchTerm={searchTerm} 
            />
          ) : sortedUsers.length === 0 ? (
            <UserEmptyState onRefresh={fetchRegisteredUsers} />
          ) : (
            <>
              <UserListTable 
                users={currentSortedUsers} 
                onUserUpdated={handleUserUpdated}
                onUserDeleted={handleUserDeleted}
                onToggleStatus={enhancedToggleStatus}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination>
                    <Pagination.PrevButton
                      onClick={() => setPage(p => Math.max(p - 1, 1))}
                      disabled={page === 1}
                    />
                    <div className="flex items-center mx-4">
                      {t('Lapa', 'Page')} {page} {t('no', 'of')} {totalPages}
                    </div>
                    <Pagination.NextButton
                      onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
          
          {isAddDialogOpen && (
            <AddUserDialog 
              open={isAddDialogOpen}
              onClose={() => setIsAddDialogOpen(false)}
              onUserAdded={handleUserAdded}
            />
          )}
        </>
      )}
    </div>
  );
}

// Add default export for lazy loading compatibility
export default RegisteredUsers;
