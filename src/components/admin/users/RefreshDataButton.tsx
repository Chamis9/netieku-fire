
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/features/language";

interface RefreshDataButtonProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function RefreshDataButton({ onRefresh, isLoading }: RefreshDataButtonProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  return (
    <div className="flex justify-end">
      <Button 
        onClick={onRefresh}
        variant="outline"
        disabled={isLoading}
        className="flex items-center"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        {t('Atjaunot datus no datubāzes', 'Refresh Data from Database')}
      </Button>
    </div>
  );
}
