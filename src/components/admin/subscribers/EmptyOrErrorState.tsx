
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader, Search } from "lucide-react";
import { useLanguage } from "@/features/language";

interface EmptyOrErrorStateProps {
  isLoading: boolean;
  error: string;
  searchTerm?: string;
  onRetry?: () => void;
}

export function EmptyOrErrorState({ isLoading, error, searchTerm, onRetry }: EmptyOrErrorStateProps) {
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">{t('Ielādē...', 'Loading...')}</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <div>
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
          <p className="text-muted-foreground">{error}</p>
          <Button 
            className="mt-4" 
            variant="outline" 
            onClick={onRetry || (() => window.location.reload())}
          >
            {t('Mēģināt vēlreiz', 'Try Again')}
          </Button>
        </div>
      </div>
    );
  }
  
  if (searchTerm) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <div>
          <Search className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            {t('Nav atrasts neviens abonents, kas atbilst meklēšanas kritērijiem.', 
              'No subscribers found matching your search criteria.')}
          </p>
        </div>
      </div>
    );
  }
  
  return null;
}
