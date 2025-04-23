
import React, { useState } from "react";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save, X as Cancel } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AvatarUpload } from "../../AvatarUpload";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { PersonalInfoDisplay } from "./PersonalInfoDisplay";

interface PersonalInfoCardProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export function PersonalInfoCard({ user, onUserUpdate }: PersonalInfoCardProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    phone: user.phone || ""
  });
  
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Create updated user object
    const updatedUser: User = {
      ...user,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      updated_at: new Date().toISOString()
    };
    
    // Update user data
    onUserUpdate(updatedUser);
    setIsEditing(false);
    
    // Show success notification
    toast({
      description: t("Konta informācija veiksmīgi atjaunināta", "Account information successfully updated"),
    });
  };
  
  const handleCancel = () => {
    // Reset to original data
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || ""
    });
    setIsEditing(false);
  };
  
  const handleAvatarUpdate = (url: string) => {
    const updatedUser: User = {
      ...user,
      avatar_url: url,
      updated_at: new Date().toISOString()
    };
    onUserUpdate(updatedUser);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("Personīgā informācija", "Personal Information")}</CardTitle>
        
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <Cancel className="h-4 w-4 mr-2" />
              {t("Atcelt", "Cancel")}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {t("Saglabāt", "Save")}
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            {t("Rediģēt", "Edit")}
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <AvatarUpload 
              user={user} 
              onAvatarUpdate={handleAvatarUpdate} 
              size="lg" 
            />
          </div>
          
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <PersonalInfoForm 
                formData={formData} 
                onChange={handleChange} 
                t={t}
              />
            ) : (
              <PersonalInfoDisplay user={user} t={t} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
