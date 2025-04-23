
export interface User {
  id: string;
  email: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string | null;
  role?: string;
  status?: 'active' | 'inactive';
  avatar_url?: string | null;
}

export interface UserProfile {
  userId: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatarUrl: string | null;
  status: 'active' | 'inactive';
  role: string;
  created: string;
  lastLogin: string | null;
}
