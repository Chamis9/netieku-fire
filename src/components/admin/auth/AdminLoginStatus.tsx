
import React, { memo } from "react";
import { useLanguage } from "@/features/language";

interface AdminLoginStatusProps {
  setupComplete: boolean;
}

export const AdminLoginStatus = memo(function AdminLoginStatus({ setupComplete }: AdminLoginStatusProps) {
  const { translations } = useLanguage();
  
  if (setupComplete) {
    return null;
  }

  return (
    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
      {translations.admin?.auth?.supabaseAuthAvailable || 
       'Supabase authentication is available. Please use an admin account to log in.'}
    </div>
  );
});
