
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "../hooks/useRegistrationForm";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
  t: (lvText: string, enText: string) => string;
}

export const PersonalInfoFields = ({ form, t }: PersonalInfoFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">{t('Vārds', 'First Name')}</Label>
        <Input
          id="firstName"
          {...register("firstName", { required: t('Lauks ir obligāts', 'This field is required') })}
        />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">{t('Uzvārds', 'Last Name')}</Label>
        <Input
          id="lastName"
          {...register("lastName", { required: t('Lauks ir obligāts', 'This field is required') })}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>
    </div>
  );
};
