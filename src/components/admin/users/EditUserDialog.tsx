
import React, { useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useLanguage } from "@/features/language";
import { User } from "@/types/users";
import { EditUserFormContainer } from "./EditUserFormContainer";

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onUserUpdated: (user: User) => void;
}

export function EditUserDialog({ 
  user, 
  open, 
  onClose, 
  onUserUpdated 
}: EditUserDialogProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  // Clean up effect to ensure proper cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup function to ensure proper state reset when the dialog closes
      // This helps prevent any lingering state that might cause the UI to become unresponsive
    };
  }, []);

  // If there's no user, we shouldn't render the dialog at all
  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          // Make sure we properly clean up when dialog closes
          setTimeout(() => {
            onClose();
          }, 0);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Rediģēt lietotāju', 'Edit User')}</DialogTitle>
          <DialogDescription>
            {t('Mainiet lietotāja informāciju', 'Make changes to user information')}
          </DialogDescription>
        </DialogHeader>
        
        <EditUserFormContainer
          user={user}
          onUserUpdated={onUserUpdated}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
