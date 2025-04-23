
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw } from "lucide-react";
import { useLanguage } from "@/features/language";

const notificationFormSchema = z.object({
  enableEmailNotifications: z.boolean(),
  adminNotifications: z.boolean(),
  userSignupNotifications: z.boolean(),
  newsletterNotifications: z.boolean(),
});

export function NotificationSettings() {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      enableEmailNotifications: true,
      adminNotifications: true,
      userSignupNotifications: true,
      newsletterNotifications: false,
    },
  });
  
  const onNotificationSubmit = (values: z.infer<typeof notificationFormSchema>) => {
    console.log(values);
    toast({
      description: t("Paziņojumu iestatījumi ir veiksmīgi saglabāti", "Notification settings saved successfully"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Paziņojumu iestatījumi", "Notification Settings")}</CardTitle>
        <CardDescription>
          {t("Pārvaldiet, kādus paziņojumus saņemat", "Manage what notifications you receive")}
        </CardDescription>
      </CardHeader>
      <Form {...notificationForm}>
        <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={notificationForm.control}
              name="enableEmailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("E-pasta paziņojumi", "Email Notifications")}</FormLabel>
                    <FormDescription>
                      {t("Ieslēgt vai izslēgt visus e-pasta paziņojumus.", "Enable or disable all email notifications.")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={notificationForm.control}
              name="adminNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("Administratora paziņojumi", "Administrator Notifications")}</FormLabel>
                    <FormDescription>
                      {t("Saņemt paziņojumus par administratora darbībām.", "Receive notifications about administrator actions.")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!notificationForm.watch("enableEmailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={notificationForm.control}
              name="userSignupNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("Lietotāju reģistrācijas", "User Registrations")}</FormLabel>
                    <FormDescription>
                      {t("Saņemt paziņojumus, kad reģistrējas jauni lietotāji.", "Receive notifications when new users register.")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!notificationForm.watch("enableEmailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={notificationForm.control}
              name="newsletterNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("Jaunumu abonementi", "Newsletter Subscriptions")}</FormLabel>
                    <FormDescription>
                      {t("Saņemt paziņojumus par jauniem jaunumu abonentiem.", "Receive notifications about new newsletter subscribers.")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!notificationForm.watch("enableEmailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => notificationForm.reset()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("Atiestatīt", "Reset")}
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {t("Saglabāt izmaiņas", "Save changes")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
