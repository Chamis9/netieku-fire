
import type { User } from '@/types/users';

export const downloadUsersCSV = (users: User[], language: { code: string }) => {
  // Generate CSV headers
  const headers = ['ID', 'Email', 'First Name', 'Last Name', 'Phone', 'Role', 'Status', 'Created At', 'Last Sign In'];
  
  // Generate CSV rows
  const rows = users.map(user => [
    user.id,
    user.email || '',
    user.first_name || '',
    user.last_name || '',
    user.phone || '',
    user.role || '',
    user.status || '',
    new Date(user.created_at).toLocaleDateString(language.code === 'lv' ? 'lv-LV' : 'en-US'),
    user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString(language.code === 'lv' ? 'lv-LV' : 'en-US') : ''
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `users-${new Date().toISOString().split('T')[0]}.csv`;
  
  return { blob, filename };
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
