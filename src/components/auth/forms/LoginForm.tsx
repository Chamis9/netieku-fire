
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailInput } from "../EmailInput";
import { PasswordInput } from "../PasswordInput";
import { loginFormSchema, type LoginFormData } from "../schema";

interface LoginFormProps {
  translations: any;
  onClose: () => void;
}

export function LoginForm({ translations, onClose }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleResetPassword = async () => {
    const email = form.getValues("email");
    if (!email) {
      form.setFocus("email");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setIsLoading(false);

    if (!error) {
      toast({
        description: translations.resetPasswordSent,
      });
    }
  };

  const onSubmit = async (values: LoginFormData) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast({
        variant: "destructive",
        description: translations.invalidCredentials,
      });
    } else {
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailInput form={form} label={translations.email} />
        <PasswordInput form={form} label={translations.password} />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            {translations.forgotPassword}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? translations.loginLoading : translations.login}
          </Button>
        </div>
      </form>
    </Form>
  );
}
