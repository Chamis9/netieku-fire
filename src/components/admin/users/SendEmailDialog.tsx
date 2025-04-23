
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/features/language";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@/types/users";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

interface SendEmailDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export function SendEmailDialog({ user, open, onClose }: SendEmailDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isSending, setIsSending] = React.useState(false);

  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user.email) {
      toast({
        variant: "destructive",
        description: t(
          "Lietotājam nav e-pasta adreses",
          "User has no email address"
        ),
      });
      return;
    }

    setIsSending(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('send-user-email', {
        body: {
          to: user.email,
          subject: values.subject,
          message: values.message,
        },
      });

      if (error) throw error;

      toast({
        description: t(
          "E-pasts veiksmīgi nosūtīts",
          "Email sent successfully"
        ),
      });
      
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        variant: "destructive",
        description: t(
          "Kļūda sūtot e-pastu",
          "Error sending email"
        ),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => !isSending && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("Sūtīt e-pastu", "Send Email")} - {user.email}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Tēma", "Subject")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Ziņojums", "Message")}</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSending}
              >
                {t("Atcelt", "Cancel")}
              </Button>
              <Button type="submit" disabled={isSending}>
                {isSending ? t("Sūta...", "Sending...") : t("Sūtīt", "Send")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
