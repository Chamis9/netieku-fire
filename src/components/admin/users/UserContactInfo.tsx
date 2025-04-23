
import React from "react";
import { User as UserIcon, Phone } from "lucide-react";
import { useLanguage } from "@/features/language";

interface UserContactInfoProps {
  name?: string | null;
  phone?: string | null;
}

export function UserContactInfo({ name, phone }: UserContactInfoProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  return (
    <>
      <div className="flex items-center">
        <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
        {name || t('Nav norādīts', 'Not specified')}
      </div>
      <div className="flex items-center mt-1">
        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
        {phone || t('Nav tālruņa', 'No phone')}
      </div>
    </>
  );
}
