
import React from "react";
import { useLanguage } from "@/features/language";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ActivityTable } from "./ActivityTable";
import { ActivityPagination } from "./ActivityPagination";
import { ActivityLogModalProps } from "./types";
import { useActivityLog } from "@/hooks/useActivityLog";

export function ActivityLogModal({ open, onOpenChange }: ActivityLogModalProps) {
  const { currentLanguage } = useLanguage();
  const itemsPerPage = 10;
  
  const {
    activities,
    isLoading,
    error,
    totalPages,
    currentPage,
    handlePageChange
  } = useActivityLog(itemsPerPage, open);
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {t('Aktivitāšu žurnāls', 'Activity Log', 'Журнал активности')}
          </DialogTitle>
          <DialogDescription>
            {t('Platformas lietotāju aktivitātes', 'User activities on the platform', 'Действия пользователей на платформе')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-auto flex-grow">
          <ActivityTable 
            activities={activities} 
            isLoading={isLoading} 
            error={error}
          />
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4">
            <ActivityPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
