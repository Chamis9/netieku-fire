
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/components/auth/schema";

interface NameFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
  translations: any;
}

export function NameFields({ form, translations }: NameFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.firstName}</FormLabel>
            <FormControl>
              <Input placeholder={translations.firstName} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.lastName}</FormLabel>
            <FormControl>
              <Input placeholder={translations.lastName} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
