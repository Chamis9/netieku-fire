
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/features/language";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function SecurityCard() {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("Kļūda!", "Error!"),
        description: t(
          "Jaunā parole un apstiprinājuma parole nesakrīt",
          "New password and confirmation password do not match"
        )
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      toast({
        title: t("Veiksmīgi!", "Success!"),
        description: t(
          "Jūsu parole ir veiksmīgi atjaunināta",
          "Your password has been successfully updated"
        )
      });
      
      setIsChangingPassword(false);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        variant: "destructive",
        title: t("Kļūda!", "Error!"),
        description: t(
          "Neizdevās atjaunināt paroli. Lūdzu, mēģiniet vēlreiz",
          "Failed to update password. Please try again"
        )
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Konta drošība", "Account Security")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isChangingPassword ? (
          <div className="space-y-2">
            <Label>{t("Parole", "Password")}</Label>
            <div className="flex items-center">
              <p className="flex-1">••••••••</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsChangingPassword(true)}
              >
                {t("Mainīt paroli", "Change Password")}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t("Pašreizējā parole", "Current Password")}
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {t("Jaunā parole", "New Password")}
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("Apstiprināt jauno paroli", "Confirm New Password")}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {t("Saglabāt", "Save")}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                disabled={isLoading}
              >
                {t("Atcelt", "Cancel")}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
