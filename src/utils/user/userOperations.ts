
import type { User } from '@/types/users';
import { updateUserBase, deleteUserBase } from '../operations/baseOperations';
import { supabase } from '@/integrations/supabase/client';

export async function updateUser(user: User) {
  return updateUserBase(user, 'registered_users', {
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    status: user.status,
    email: user.email,
    updated_at: new Date().toISOString()
  });
}

export async function deleteUser(userId: string) {
  return deleteUserBase(userId, 'registered_users');
}

export async function toggleUserStatus(user: User) {
  const newStatus = user.status === 'active' ? 'inactive' : 'active';
  
  return updateUserBase(user, 'registered_users', {
    status: newStatus
  });
}

interface CreateUserParams {
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string | null;
  status?: 'active' | 'inactive';
}

export async function createUser(userData: CreateUserParams) {
  try {
    console.log(`Creating new user:`, userData);
    
    // Check if email already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('registered_users')
      .select('id')
      .eq('email', userData.email)
      .limit(1);
      
    if (checkError) {
      console.error(`Error checking existing user:`, checkError);
      return { 
        success: false, 
        error: checkError.message,
        data: null
      };
    }
    
    if (existingUsers && existingUsers.length > 0) {
      return {
        success: false,
        error: 'E-pasta adrese jau ir reģistrēta',
        data: null
      };
    }
    
    // Check if phone already exists (if provided)
    if (userData.phone) {
      const { data: existingPhones, error: phoneCheckError } = await supabase
        .from('registered_users')
        .select('id')
        .eq('phone', userData.phone)
        .limit(1);
        
      if (phoneCheckError) {
        console.error(`Error checking existing phone:`, phoneCheckError);
      } else if (existingPhones && existingPhones.length > 0) {
        return {
          success: false,
          error: 'Telefona numurs jau ir reģistrēts',
          data: null
        };
      }
    }
    
    const newUser = {
      first_name: userData.first_name || null,
      last_name: userData.last_name || null,
      email: userData.email,
      phone: userData.phone || null,
      status: userData.status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('registered_users')
      .insert(newUser)
      .select('*')
      .single();
    
    if (error) {
      console.error(`Error creating user:`, error);
      return { 
        success: false, 
        error: error.message,
        data: null
      };
    }
    
    // Transform the response to match our User type
    const createdUser: User = {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      updated_at: data.updated_at,
      last_sign_in_at: null,
      role: 'user'
    };
    
    return { 
      success: true, 
      data: createdUser,
      error: null
    };
  } catch (err) {
    console.error(`Unexpected error creating user:`, err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Unknown error occurred',
      data: null
    };
  }
}
