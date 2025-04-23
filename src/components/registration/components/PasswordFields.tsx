
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "../hooks/useRegistrationForm";

interface PasswordFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
  t: (lvText: string, enText: string) => string;
  passwordValidation: any;
  validatePassword: (value: string) => true | string;
}

export const PasswordFields = ({ 
  form, 
  t, 
  passwordValidation, 
  validatePassword 
}: PasswordFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="password">{t('Parole', 'Password')}</Label>
        <Input
          id="password"
          type="password"
          {...register("password", passwordValidation)}
          placeholder={t('Ievadiet paroli', 'Enter your password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {t('Apstiprināt paroli', 'Confirm Password')}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: t('Lauks ir obligāts', 'This field is required'),
            validate: validatePassword
          })}
          placeholder={t('Ievadiet paroli vēlreiz', 'Re-enter your password')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
    </>
  );
};

