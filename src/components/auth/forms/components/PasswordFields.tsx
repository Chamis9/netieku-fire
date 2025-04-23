
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/components/auth/schema";

interface PasswordFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
  translations: any;
}

export function PasswordFields({ form, translations }: PasswordFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.password}</FormLabel>
            <FormControl>
              <Input 
                type="password"
                placeholder={translations.password}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.confirmPassword}</FormLabel>
            <FormControl>
              <Input 
                type="password"
                placeholder={translations.confirmPassword}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

