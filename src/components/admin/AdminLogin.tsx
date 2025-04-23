
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/features/language";
import { LoginForm } from "@/components/admin/auth/LoginForm";
import { AdminLoginStatus } from "@/components/admin/auth/AdminLoginStatus";
import { useAdminSetup } from "@/components/admin/auth/useAdminSetup";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function AdminLogin({ isOpen, onClose, onLoginSuccess }: AdminLoginProps) {
  const { currentLanguage } = useLanguage();
  const { setupComplete } = useAdminSetup();
  
  // Translation helper function
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Administratora pieslēgšanās', 'Administrator Login')}</DialogTitle>
          <DialogDescription>
            {t('Lūdzu, ievadiet savus administratora pieslēgšanās datus.', 'Please enter your administrator credentials.')}
            <AdminLoginStatus setupComplete={setupComplete} />
          </DialogDescription>
        </DialogHeader>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </DialogContent>
    </Dialog>
  );
}
