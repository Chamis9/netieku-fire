
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFormProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: (lvText: string, enText: string) => string;
}

export function PersonalInfoForm({ formData, onChange, t }: PersonalInfoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="first_name">{t("Vārds", "First Name")}</Label>
        <Input
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={onChange}
          placeholder={t("Ievadiet vārdu", "Enter your first name")}
        />
      </div>
      
      <div>
        <Label htmlFor="last_name">{t("Uzvārds", "Last Name")}</Label>
        <Input
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={onChange}
          placeholder={t("Ievadiet uzvārdu", "Enter your last name")}
        />
      </div>
      
      <div>
        <Label htmlFor="email">{t("E-pasts", "Email")}</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder={t("Ievadiet e-pastu", "Enter your email")}
          type="email"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">{t("Tālrunis", "Phone")}</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder={t("Ievadiet tālruni", "Enter your phone")}
        />
      </div>
    </div>
  );
}
