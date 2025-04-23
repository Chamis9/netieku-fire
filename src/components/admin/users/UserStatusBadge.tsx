
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/features/language";

interface UserStatusBadgeProps {
  status: 'active' | 'inactive';
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  return (
    status === "active" ? (
      <div className="flex items-center">
        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-sm text-green-500">{t('Aktīvs', 'Active')}</span>
      </div>
    ) : (
      <div className="flex items-center">
        <XCircle className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-sm text-gray-400">{t('Neaktīvs', 'Inactive')}</span>
      </div>
    )
  );
}
