
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInputWithCountry from "@/components/admin/users/PhoneInputWithCountry";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { PasswordFields } from "./components/PasswordFields";
import { useRegistrationForm } from "./hooks/useRegistrationForm";

const RegistrationForm = () => {
  const { form, passwordValidation, validatePassword, onSubmit, t } = useRegistrationForm();
  const { handleSubmit, watch, setValue, formState: { errors } } = form;

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{t('Pieteikuma forma', 'Registration Form')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoFields form={form} t={t} />

          <div className="space-y-2">
            <Label htmlFor="email">{t('E-pasts', 'Email')}</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email", {
                required: t('Lauks ir obligāts', 'This field is required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('Ievadiet derīgu e-pasta adresi', 'Enter a valid email address')
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <PasswordFields 
            form={form} 
            t={t} 
            passwordValidation={passwordValidation}
            validatePassword={validatePassword}
          />

          <PhoneInputWithCountry
            label={t('Telefona numurs', 'Phone Number')}
            countryCode={watch('countryCode')}
            phoneNumber={watch('phoneNumber') || ""}
            onCountryCodeChange={(code) => setValue('countryCode', code)}
            onPhoneNumberChange={(number) => setValue('phoneNumber', number)}
            error={errors.phoneNumber?.message}
            required={false}
          />

          <Button type="submit" className="w-full">
            {t('Reģistrēties', 'Register')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
