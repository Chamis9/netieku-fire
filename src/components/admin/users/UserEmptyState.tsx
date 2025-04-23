
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/features/language";

interface UserEmptyStateProps {
  onRefresh: () => void;
}

export function UserEmptyState({ onRefresh }: UserEmptyStateProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  return (
    <div className="flex justify-center items-center h-64 text-center">
      <div>
        <p className="text-muted-foreground">
          {t('Nav neviena lietotāja. Lietotāji tiks pievienoti, kad tie reģistrēsies platformā.', 
            'No users yet. Users will be added when they register on the platform.')}
        </p>
        <Button className="mt-4" variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('Atsvaidzināt datus', 'Refresh Data')}
        </Button>
      </div>
    </div>
  );
}
