
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/types/users";
import { useLanguage } from "@/features/language";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface ProfileInfoProps {
  user: User;
  onEdit: () => void;
}

export function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t("Nav pieejams", "Not available");
    try {
      return format(new Date(dateString), "dd.MM.yyyy HH:mm");
    } catch (e) {
      return t("Nederīgs datums", "Invalid date");
    }
  };
  
  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ") || t("Nav norādīts", "Not specified");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("Profila informācija", "Profile Information")}</CardTitle>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          {t("Rediģēt", "Edit")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-2">
            <UserAvatar user={user} size="lg" />
            <h3 className="font-medium text-lg mt-2">{fullName}</h3>
            <span className="text-sm text-muted-foreground">{user.role || "user"}</span>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("E-pasts", "Email")}:</span>
                <span className="text-sm">{user.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("Tālrunis", "Phone")}:</span>
                <span className="text-sm">{user.phone || t("Nav norādīts", "Not specified")}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("Reģistrēts", "Registered")}:</span>
                <span className="text-sm">{formatDate(user.created_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("Pēdējā pieslēgšanās", "Last login")}:</span>
                <span className="text-sm">{formatDate(user.last_sign_in_at)}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/5 rounded-md">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {t("Statuss", "Status")}: {user.status === 'active' ? 
                    t("Aktīvs", "Active") : 
                    t("Neaktīvs", "Inactive")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
