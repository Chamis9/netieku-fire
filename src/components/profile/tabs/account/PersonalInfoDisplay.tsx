
import React from "react";
import { User } from "@/types/users";
import { Label } from "@/components/ui/label";

interface PersonalInfoDisplayProps {
  user: User;
  t: (lvText: string, enText: string) => string;
}

export function PersonalInfoDisplay({ user, t }: PersonalInfoDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-muted-foreground">{t("Vārds", "First Name")}</Label>
          <p>{user.first_name || t("Nav norādīts", "Not specified")}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">{t("Uzvārds", "Last Name")}</Label>
          <p>{user.last_name || t("Nav norādīts", "Not specified")}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">{t("E-pasts", "Email")}</Label>
          <p>{user.email}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">{t("Tālrunis", "Phone")}</Label>
          <p>{user.phone || t("Nav norādīts", "Not specified")}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">{t("Statuss", "Status")}</Label>
          <p className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {user.status === 'active' ? t("Aktīvs", "Active") : t("Neaktīvs", "Inactive")}
          </p>
        </div>
      </div>
    </div>
  );
}
