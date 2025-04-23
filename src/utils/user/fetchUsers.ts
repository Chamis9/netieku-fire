
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@/types/users';

export const fetchUsers = async () => {
  try {
    console.log("Fetching users from Supabase...");
    
    // First, fetch from registered_users table
    const { data: registeredUsersData, error: registeredUsersError } = await supabase
      .from('registered_users')
      .select('*');
      
    if (registeredUsersError) {
      console.error("Error fetching registered users:", registeredUsersError);
      throw registeredUsersError;
    }
    
    // Additionally, try to get user data from the auth API if available
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.warn("Could not fetch auth users (may require admin rights):", authError);
      
      // If we can't get auth users, just return the registered_users data
      return { 
        data: registeredUsersData?.map(user => ({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          updated_at: user.updated_at,
          role: 'user',
          status: (user.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive'
        })) || [], 
        error: null 
      };
    }
    
    // Combine data from both sources if available
    const users = authData?.users || [];
    
    return { 
      data: registeredUsersData.map(registeredUser => {
        const authUser = users.find(u => u.email === registeredUser.email);
        
        // Check if user is banned or has a banned property in the metadata
        const isBanned = 
          authUser && 
          ((authUser.user_metadata && typeof authUser.user_metadata.banned === 'boolean') ? 
            authUser.user_metadata.banned : false);
            
        return {
          id: registeredUser.id,
          email: registeredUser.email,
          first_name: registeredUser.first_name,
          last_name: registeredUser.last_name,
          phone: registeredUser.phone,
          created_at: registeredUser.created_at,
          last_sign_in_at: authUser?.last_sign_in_at,
          updated_at: registeredUser.updated_at,
          role: 'user',
          status: (isBanned || registeredUser.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive'
        };
      }), 
      error: null 
    };
  } catch (err) {
    console.error("Unexpected error in fetchUsers:", err);
    return { data: [], error: err instanceof Error ? err : new Error('Unknown error') };
  }
};
