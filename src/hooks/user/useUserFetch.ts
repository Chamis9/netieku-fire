import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/features/language";
import { User } from "@/types/users";

export function useUserFetch(tableName: 'registered_users' | 'admin_user') {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  const { currentLanguage } = useLanguage();
  const abortControllerRef = useRef<AbortController | null>(null);
  const cachedUsersRef = useRef<User[]>([]);
  const hasLoadedRef = useRef(false); // Track if we've already loaded data

  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    // Skip fetching if we've already loaded and this isn't a forced refresh
    if (hasLoadedRef.current && !forceRefresh && cachedUsersRef.current.length > 0) {
      console.log(`Using cached ${tableName} data`);
      return { data: cachedUsersRef.current, error: null };
    }
    
    // Cancel any in-progress request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log(`Fetching users from ${tableName}...`);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        const errorMessage = tableName === 'registered_users'
          ? t('Neizdevās ielādēt lietotājus. Lūdzu, mēģiniet vēlreiz.', 'Failed to load users. Please try again.')
          : t('Neizdevās ielādēt administratorus. Lūdzu, mēģiniet vēlreiz.', 'Failed to load administrators. Please try again.');
        
        setError(errorMessage);
        
        if (tableName === 'admin_user') {
          setIsAuth(false);
        }
        
        // Keep showing cached data if available
        if (cachedUsersRef.current.length > 0) {
          setUsers(cachedUsersRef.current);
        } else {
          setUsers([]);
        }

        return { data: [], error };
      } else {
        console.log(`Received ${tableName} data:`, data);
        
        if (tableName === 'admin_user') {
          setIsAuth(true);
        }
        
        const formattedUsers: User[] = data.map((user: any) => ({
          id: user.id,
          email: user.email,
          first_name: tableName === 'registered_users' ? user.first_name : null,
          last_name: tableName === 'registered_users' ? user.last_name : null,
          phone: tableName === 'registered_users' ? user.phone : null,
          created_at: user.created_at,
          last_sign_in_at: tableName === 'registered_users' ? user.last_sign_in_at : null,
          updated_at: tableName === 'registered_users' ? user.updated_at : null,
          role: tableName === 'registered_users' ? 'user' : 'admin',
          status: (tableName === 'registered_users' && user.status) ? user.status : 'active' as 'active' | 'inactive'
        }));
        
        // Cache the users for future use
        cachedUsersRef.current = formattedUsers;
        setUsers(formattedUsers);
        hasLoadedRef.current = true; // Mark that we've successfully loaded data
        
        const eventName = tableName === 'registered_users' ? 'userCountUpdated' : 'adminCountUpdated';
        const event = new CustomEvent(eventName, { 
          detail: { count: formattedUsers.length } 
        });
        window.dispatchEvent(event);

        return { data: formattedUsers, error: null };
      }
    } catch (err) {
      // Only set error if this wasn't an abort error
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error(`Unexpected error in fetch${tableName === 'registered_users' ? 'Registered' : 'Admin'}Users:`, err);
        const errorMessage = tableName === 'registered_users'
          ? t('Neizdevās ielādēt lietotājus. Lūdzu, mēģiniet vēlreiz.', 'Failed to load users. Please try again.')
          : t('Neizdevās ielādēt administratorus. Lūdzu, mēģiniet vēlreiz.', 'Failed to load administrators. Please try again.');
        
        setError(errorMessage);
        
        if (tableName === 'admin_user') {
          setIsAuth(false);
        }

        return { data: [], error: err };
      }
      return { data: [], error: err };
    } finally {
      // Only update loading state if this wasn't aborted
      if (abortControllerRef.current?.signal.aborted === false) {
        setIsLoading(false);
      }
    }
  }, [currentLanguage.code, t, tableName]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    users,
    isLoading,
    error,
    isAuth,
    fetchUsers,
    setUsers,
    cachedUsersRef
  };
}
