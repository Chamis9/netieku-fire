
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/features/language";

interface UserDataErrorProps {
  error: string;
  onRetry: () => void;
}

export function UserDataError({ error, onRetry }: UserDataErrorProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-800 dark:bg-red-900/20 dark:text-red-200">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <h3 className="font-medium">{t('Datu ielādes kļūda', 'Data Loading Error')}</h3>
      </div>
      <p className="mt-2 text-sm">{error}</p>
      <div className="mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('Mēģināt vēlreiz', 'Try Again')}
        </Button>
      </div>
    </div>
  );
}
