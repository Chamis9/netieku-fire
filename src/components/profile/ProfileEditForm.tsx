
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";
import { useToast } from "@/components/ui/use-toast";
import { UserAvatar } from "./UserAvatar";
import { useForm } from "react-hook-form";

interface ProfileEditFormProps {
  user: User;
  onCancel: () => void;
  onSave: (updatedUser: User) => Promise<boolean>;
}

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export function ProfileEditForm({ user, onCancel, onSave }: ProfileEditFormProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.phone || "",
      email: user.email || ""
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const updatedUser: User = {
        ...user,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        updated_at: new Date().toISOString()
      };
      
      const success = await onSave(updatedUser);
      
      if (success) {
        toast({
          description: t("Profils veiksmīgi atjaunināts!", "Profile successfully updated!"),
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: t("Kļūda", "Error"),
        description: t("Neizdevās atjaunināt profilu", "Failed to update profile"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Rediģēt profilu", "Edit Profile")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-4">
            <UserAvatar user={user} size="lg" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="first_name">{t("Vārds", "First Name")}</Label>
            <Input 
              id="first_name"
              placeholder={t("Ievadiet savu vārdu", "Enter your first name")}
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-sm text-destructive">{errors.first_name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name">{t("Uzvārds", "Last Name")}</Label>
            <Input 
              id="last_name"
              placeholder={t("Ievadiet savu uzvārdu", "Enter your last name")}
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-sm text-destructive">{errors.last_name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t("E-pasts", "Email")}</Label>
            <Input 
              id="email"
              type="email"
              placeholder={t("Ievadiet savu e-pastu", "Enter your email")}
              {...register("email", { 
                required: t("E-pasts ir obligāts", "Email is required"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("Nederīgs e-pasta formāts", "Invalid email format")
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t("Tālrunis", "Phone")}</Label>
            <Input 
              id="phone"
              placeholder={t("Ievadiet savu tālruni", "Enter your phone")}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("Atcelt", "Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 
              t("Saglabā...", "Saving...") : 
              t("Saglabāt izmaiņas", "Save changes")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
