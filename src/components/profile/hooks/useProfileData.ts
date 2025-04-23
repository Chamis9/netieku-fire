
import { useState, useEffect } from "react";
import { User } from "@/types/users";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { createMockUser } from "../utils/mockUserUtils";

export function useProfileData() {
  const { isAuthenticated, isAuthLoading, userEmail } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only try to fetch user data if authenticated
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        if (isAuthenticated && userEmail) {
          // Real user fetching logic for authenticated users
          const { data, error } = await supabase
            .from('registered_users')
            .select('*')
            .eq('email', userEmail)
            .single();
            
          if (error) {
            console.error("Error fetching user data:", error);
            setUser(createMockUser()); // Fallback to mock data
            return;
          }
          
          if (data) {
            setUser({
              id: data.id,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              phone: data.phone,
              created_at: data.created_at,
              updated_at: data.updated_at,
              last_sign_in_at: data.last_sign_in_at,
              role: 'user',
              status: data.status as 'active' | 'inactive',
              avatar_url: data.avatar_url
            });
          } else {
            // Fallback to mock user if no data found
            setUser(createMockUser());
          }
        } else {
          // No need to set mock user here, we'll show login screen instead
          setUser(null);
        }
      } catch (error) {
        console.error("Error in profile data fetch:", error);
        if (isAuthenticated) {
          setUser(createMockUser()); // Only set mock user for authenticated users
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, isAuthLoading, userEmail]);

  return { user, setUser, isLoading };
}
