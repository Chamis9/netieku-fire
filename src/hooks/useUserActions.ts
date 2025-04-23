
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import type { User } from '@/types/users';
import { useLanguage } from '@/features/language';
import { filterUsers, downloadUsersCSV, downloadBlob } from '@/utils/user';
import { logActivity } from '@/utils/activityLogger';

export function useUserActions() {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();

  const t = (lvText: string, enText: string) => {
    return currentLanguage.code === 'lv' ? lvText : enText;
  };

  const handleDownloadCSV = (users: User[], currentLanguage: { code: string }) => {
    if (!users || users.length === 0) {
      toast({
        description: t('Nav lietotāju, ko lejupielādēt', 'No users to download'),
      });
      return;
    }

    try {
      const { blob, filename } = downloadUsersCSV(users, currentLanguage);
      downloadBlob(blob, filename);
      
      toast({
        description: t('CSV fails veiksmīgi lejupielādēts', 'CSV file downloaded successfully'),
      });
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast({
        variant: "destructive",
        description: t('Kļūda lejupielādējot failu', 'Error downloading file'),
      });
    }
  };
  
  return { 
    handleDownloadCSV
  };
}
