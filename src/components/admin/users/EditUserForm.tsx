
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { User } from "@/types/users";

interface EditUserFormProps {
  user: User;
  formData: {
    first_name: string | null;
    last_name: string | null;
    phoneNumber: string;
  };
  errors: {
    phone?: string;
  };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onInputChange: (field: string, value: string) => void;
  t: (lvText: string, enText: string) => string;
}

export function EditUserForm({
  user,
  formData,
  errors,
  isSubmitting,
  onSubmit,
  onClose,
  onInputChange,
  t
}: EditUserFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            {t('E-pasts', 'Email')}
          </Label>
          <Input
            id="email"
            value={user.email || ''}
            className="col-span-3"
            disabled
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="first_name" className="text-right">
            {t('Vārds', 'First Name')}
          </Label>
          <Input
            id="first_name"
            value={formData.first_name || ''}
            onChange={(e) => onInputChange('first_name', e.target.value)}
            className="col-span-3"
            placeholder={t('Ievadiet vārdu', 'Enter first name')}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last_name" className="text-right">
            {t('Uzvārds', 'Last Name')}
          </Label>
          <Input
            id="last_name"
            value={formData.last_name || ''}
            onChange={(e) => onInputChange('last_name', e.target.value)}
            className="col-span-3"
            placeholder={t('Ievadiet uzvārdu', 'Enter last name')}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            {t('Tālrunis', 'Phone')}
          </Label>
          <div className="col-span-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">+371</span>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => onInputChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                className="flex-1"
                placeholder={t('XXXXXXXX', 'XXXXXXXX')}
                maxLength={8}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onClose}>
          {t('Atcelt', 'Cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 
            t('Saglabā...', 'Saving...') : 
            t('Saglabāt izmaiņas', 'Save changes')}
        </Button>
      </DialogFooter>
    </form>
  );
}
