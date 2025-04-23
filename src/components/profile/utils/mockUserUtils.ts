
import { User } from "@/types/users";

/**
 * Creates a mock user for demonstration purposes
 */
export function createMockUser(): User {
  // Get any stored avatar URL
  const storedAvatarUrl = localStorage.getItem('demo_user_avatar');
  
  return {
    id: "mock-user-id-123",
    email: "demo@example.com",
    first_name: "Demo",
    last_name: "Lietotājs",
    phone: "+371 12345678",
    created_at: new Date(2023, 0, 15).toISOString(),
    updated_at: new Date(2023, 5, 20).toISOString(),
    last_sign_in_at: new Date(2023, 11, 25).toISOString(),
    role: 'user',
    status: 'active',
    avatar_url: storedAvatarUrl || null
  };
}
