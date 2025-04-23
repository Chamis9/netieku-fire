
import type { User } from '@/types/users';

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) {
    return users;
  }
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return users.filter(user => {
    // Create full name from first_name and last_name
    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    
    return user.email?.toLowerCase().includes(lowerSearchTerm) ||
      user.id.toLowerCase().includes(lowerSearchTerm) ||
      fullName.includes(lowerSearchTerm) ||
      user.phone?.toLowerCase().includes(lowerSearchTerm);
  });
};
