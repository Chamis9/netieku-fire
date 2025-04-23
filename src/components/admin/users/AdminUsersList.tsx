
import React from "react";
import { useLanguage } from "@/features/language";
import { UserListHeader } from "@/components/admin/users/UserListHeader";
import { UserListTable } from "@/components/admin/users/UserListTable";
import { EmptyOrErrorState } from "@/components/admin/users/EmptyOrErrorState";
import { User } from "@/types/users";
import { downloadUsersCSV, downloadBlob } from "@/utils/user";
import { useToast } from "@/hooks/use-toast";
import { UserFilterStatus } from "./components/UserFilterStatus";
import { UserPagination } from "./components/UserPagination";
import { useUserSorting } from "./hooks/useUserSorting";
import { UserErrorState } from "./components/UserErrorState";
import { UserEmptyContent } from "./components/UserEmptyContent";

interface AdminUsersListProps {
  users: User[];
  searchTerm: string;
  isLoading: boolean;
  error: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserUpdated: (updatedUser: User) => void;
  handleUserDeleted: (userId: string) => void;
  handleRetry: () => void;
}

export function AdminUsersList({
  users,
  searchTerm,
  isLoading,
  error,
  handleSearch,
  handleUserUpdated,
  handleUserDeleted,
  handleRetry
}: AdminUsersListProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const {
    page,
    setPage,
    totalPages,
    sortedUsers,
    currentUsers,
    sortField,
    sortDirection,
    handleSort
  } = useUserSorting(users, searchTerm);
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const handleDownloadCSV = () => {
    if (!users || users.length === 0) {
      toast({
        description: t('Nav administratoru, ko lejupielādēt', 'No administrators to download'),
      });
      return;
    }

    try {
      const { blob, filename } = downloadUsersCSV(users, currentLanguage);
      downloadBlob(blob, filename);
      
      toast({
        description: t('CSV fails veiksmīgi lejupielādēts', 'CSV file downloaded successfully'),
      });
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast({
        variant: "destructive",
        description: t('Kļūda lejupielādējot failu', 'Error downloading file'),
      });
    }
  };

  if (isLoading) {
    return <EmptyOrErrorState isLoading={true} error="" />;
  }
  
  if (error) {
    return <UserErrorState error={error} onRetry={handleRetry} />;
  }
  
  if (sortedUsers.length === 0 && searchTerm) {
    return <EmptyOrErrorState isLoading={false} error="" searchTerm={searchTerm} />;
  }
  
  if (users.length === 0) {
    return <UserEmptyContent onRetry={handleRetry} isAdmin={true} />;
  }
  
  return (
    <>
      <UserListHeader 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onDownloadCSV={handleDownloadCSV}
        isAdmin={true}
      />
      
      <UserListTable 
        users={currentUsers} 
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserDeleted}
        onToggleStatus={() => {}} // Not applicable for admins
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <UserPagination 
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}
