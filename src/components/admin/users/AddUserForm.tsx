
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface AddUserFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  errors: {
    email?: string;
    phone?: string;
  };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onInputChange: (field: string, value: string) => void;
  t: (lvText: string, enText: string) => string;
}

export function AddUserForm({
  formData,
  errors,
  isSubmitting,
  onSubmit,
  onClose,
  onInputChange,
  t
}: AddUserFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="firstName">{t('Vārds', 'First Name')}</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onInputChange('firstName', e.target.value)}
          placeholder={t('Ievadiet lietotāja vārdu', 'Enter first name')}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="lastName">{t('Uzvārds', 'Last Name')}</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onInputChange('lastName', e.target.value)}
          placeholder={t('Ievadiet lietotāja uzvārdu', 'Enter last name')}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">{t('E-pasts', 'Email')} *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder={t('Ievadiet e-pasta adresi', 'Enter email address')}
          required
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="phone">{t('Tālrunis', 'Phone')}</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">+371</span>
          <Input
            id="phone"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
            placeholder={t('XXXXXXXX', 'XXXXXXXX')}
            maxLength={8}
            className={errors.phone ? "border-red-500" : ""}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
      </div>
      
      <DialogFooter className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          {t('Atcelt', 'Cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('Pievieno...', 'Adding...') : t('Pievienot', 'Add')}
        </Button>
      </DialogFooter>
    </form>
  );
}
