
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/features/language";
import { User } from "@/types/users";
import { MutableRefObject } from "react";

interface UseUserModificationsProps {
  users: User[];
  filteredUsers: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
  cachedUsersRef: MutableRefObject<User[]>;
  tableName: 'registered_users' | 'admin_user';
}

export function useUserModifications({
  users,
  filteredUsers,
  setUsers,
  setFilteredUsers,
  cachedUsersRef,
  tableName
}: UseUserModificationsProps) {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const handleUserUpdated = useCallback((updatedUser: User) => {
    const updatedUsers = users.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    );
    
    // Update the cache
    cachedUsersRef.current = updatedUsers;
    setUsers(updatedUsers);
    
    // Only update filtered users if the updated user is in the filtered list
    if (filteredUsers.some(u => u.id === updatedUser.id)) {
      const updatedFilteredUsers = filteredUsers.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );
      setFilteredUsers(updatedFilteredUsers);
    }
  }, [users, filteredUsers, setUsers, setFilteredUsers, cachedUsersRef]);

  const handleUserDeleted = useCallback((userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    
    // Update the cache
    cachedUsersRef.current = updatedUsers;
    setUsers(updatedUsers);
    
    const updatedFilteredUsers = filteredUsers.filter(u => u.id !== userId);
    setFilteredUsers(updatedFilteredUsers);
    
    const eventName = tableName === 'registered_users' ? 'userCountUpdated' : 'adminCountUpdated';
    const event = new CustomEvent(eventName, { 
      detail: { count: updatedUsers.length } 
    });
    window.dispatchEvent(event);
  }, [users, filteredUsers, setUsers, setFilteredUsers, cachedUsersRef, tableName]);

  const handleToggleStatus = useCallback((user: User) => {
    if (tableName !== 'registered_users') return;
    
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const updatedUser = {
      ...user,
      status: newStatus as 'active' | 'inactive',
      updated_at: new Date().toISOString()
    };
    
    handleUserUpdated(updatedUser);
    
    supabase
      .from('registered_users')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .then(({ error }) => {
        if (error) {
          console.error("Error toggling user status:", error);
          toast({
            variant: "destructive",
            title: t('Kļūda', 'Error'),
            description: t('Neizdevās mainīt lietotāja statusu', 'Failed to change user status')
          });
          
          // Revert the change in UI if DB update failed
          const revertedUser = {
            ...user,
            updated_at: new Date().toISOString()
          };
          handleUserUpdated(revertedUser);
        } else {
          toast({
            description: user.status === 'active' 
              ? t('Lietotājs deaktivizēts', 'User deactivated') 
              : t('Lietotājs aktivizēts', 'User activated')
          });
        }
      });
  }, [handleUserUpdated, t, toast, tableName]);

  return {
    handleUserUpdated,
    handleUserDeleted,
    handleToggleStatus
  };
}
