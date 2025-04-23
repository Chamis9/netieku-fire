
import { supabase } from "@/integrations/supabase/client";

// Check if the user is an admin by querying the admin_user table
export const checkAdminCredentials = async (email: string, password: string) => {
  try {
    console.log("Checking admin credentials for:", email);
    
    // Attempt to sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Authentication error:', authError);
      return false;
    }

    if (!authData.user) {
      console.error('No user found');
      return false;
    }

    // Check if the user is in the admin_user table
    const { data: adminData, error: adminError } = await supabase
      .from('admin_user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (adminError) {
      console.error('Error checking admin status:', adminError);
      await supabase.auth.signOut();
      return false;
    }

    if (!adminData) {
      console.error('User is not an admin');
      await supabase.auth.signOut();
      return false;
    }

    // If we get here, the user is authenticated and is an admin
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_email', email);
    return true;
  } catch (error) {
    console.error('Error in checkAdminCredentials:', error);
    return false;
  }
};

// This function is no longer needed since we're only using Supabase Auth
export const createAdminUser = async () => {
  console.log("Creating admin users is handled through Supabase Auth directly");
  return true;
};

// Check if admin setup is complete by checking if any admin users exist
export const setupAdminAccount = async () => {
  try {
    // Check if any admin users exist in the admin_user table
    const { data: adminUsers, error: checkError } = await supabase
      .from('admin_user')
      .select('*')
      .limit(1);

    if (checkError) {
      console.error('Error checking for admin users:', checkError);
      return false;
    }

    // If we have any admin users, setup is complete
    return adminUsers && adminUsers.length > 0;
  } catch (error) {
    console.error('Error in setupAdminAccount:', error);
    return false;
  }
};
