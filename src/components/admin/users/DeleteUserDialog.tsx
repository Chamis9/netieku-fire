import React, { useState, useCallback } from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/features/language";
import { User } from "@/types/users";
import { deleteUser } from "@/utils/user/userOperations";
import { useToast } from "@/hooks/use-toast";

interface DeleteUserDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onUserDeleted: (userId: string) => void;
}

export function DeleteUserDialog({ user, open, onClose, onUserDeleted }: DeleteUserDialogProps) {
  const { currentLanguage } = useLanguage();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const getUserFullName = () => {
    if (!user) return '';
    const firstName = user.first_name || t('Nav norādīts', 'Not specified');
    const lastName = user.last_name || t('Nav norādīts', 'Not specified');
    return `${firstName} ${lastName}`;
  };

  const handleDelete = useCallback(async () => {
    if (!user) return;
    
    setIsDeleting(true);
    
    try {
      const { success, error } = await deleteUser(user.id);
        
      if (!success) {
        console.error("Error deleting user:", error);
        toast({
          variant: "destructive",
          title: t('Kļūda', 'Error'),
          description: error || t('Neizdevās dzēst lietotāju', 'Failed to delete user')
        });
      } else {
        onUserDeleted(user.id);
        toast({
          description: t('Lietotājs veiksmīgi dzēsts', 'User successfully deleted')
        });
      }
    } catch (err) {
      console.error("Unexpected error in deleteUser:", err);
      toast({
        variant: "destructive",
        title: t('Kļūda', 'Error'),
        description: t('Neizdevās dzēst lietotāju', 'Failed to delete user')
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  }, [user, onUserDeleted, onClose, toast, t]);
  
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Dzēst lietotāju', 'Delete User')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              `Vai tiešām vēlaties dzēst ${getUserFullName()}? Šī darbība ir neatgriezeniska.`,
              `Are you sure you want to delete ${getUserFullName()}? This action is irreversible.`
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('Atcelt', 'Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? 
              t('Dzēš...', 'Deleting...') : 
              t('Dzēst', 'Delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
