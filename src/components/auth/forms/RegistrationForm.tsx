
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailInput } from "../EmailInput";
import { NameFields } from "./components/NameFields";
import { PhoneField } from "./components/PhoneField";
import { PasswordFields } from "./components/PasswordFields";
import { getRegistrationFormSchema, type RegistrationFormData } from "../schema";

interface RegistrationFormProps {
  translations: any;
  languageCode: string;
  onClose: () => void;
}

export function RegistrationForm({ translations, languageCode, onClose }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(getRegistrationFormSchema(languageCode)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      countryCode: "+371",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: RegistrationFormData) => {
    setIsLoading(true);
    const phoneNumber = values.phoneNumber 
      ? `${values.countryCode || '+371'}${values.phoneNumber}` 
      : null;

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          phone: phoneNumber,
        }
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        description: translations.registrationError,
      });
    } else {
      toast({
        description: translations.registrationSuccess,
      });
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameFields form={form} translations={translations} />
        <EmailInput form={form} label={translations.email} />
        <PhoneField form={form} translations={translations} />
        <PasswordFields form={form} translations={translations} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? translations.registrationLoading : translations.register}
        </Button>
      </form>
    </Form>
  );
}
