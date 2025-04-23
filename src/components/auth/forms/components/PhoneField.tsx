
import React from "react";
import PhoneInputWithCountry from "@/components/admin/users/PhoneInputWithCountry";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/components/auth/schema";

interface PhoneFieldProps {
  form: UseFormReturn<RegistrationFormData>;
  translations: any;
  countryCodeName?: keyof RegistrationFormData;
  phoneNumberName?: keyof RegistrationFormData;
}

export function PhoneField({ 
  form, 
  translations,
  countryCodeName = 'countryCode',
  phoneNumberName = 'phoneNumber'
}: PhoneFieldProps) {
  return (
    <PhoneInputWithCountry
      label={translations.phoneNumber}
      countryCode={form.watch(countryCodeName)}
      phoneNumber={form.watch(phoneNumberName) || ""}
      onCountryCodeChange={(code) => form.setValue(countryCodeName, code)}
      onPhoneNumberChange={(number) => form.setValue(phoneNumberName, number)}
      placeholder={translations.phoneNumberPlaceholder}
    />
  );
}
