
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/features/language";

interface UserEmptyContentProps {
  onRetry: () => void;
  isAdmin?: boolean;
}

export function UserEmptyContent({ onRetry, isAdmin = false }: UserEmptyContentProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const message = isAdmin 
    ? t('Nav neviena administratora. Pievienojiet pirmo administratoru, izmantojot reģistrācijas formu vai manuāli izveidojiet ierakstu Supabase.', 
        'No administrators yet. Add your first administrator using the registration form or manually create a record in Supabase.')
    : t('Nav neviena lietotāja. Lietotāji tiks pievienoti, kad tie reģistrēsies platformā.', 
        'No users yet. Users will be added when they register on the platform.');
  
  return (
    <div className="flex justify-center items-center h-64 text-center">
      <div>
        <p className="text-muted-foreground">{message}</p>
        <Button className="mt-4" variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('Atsvaidzināt datus', 'Refresh Data')}
        </Button>
      </div>
    </div>
  );
}
