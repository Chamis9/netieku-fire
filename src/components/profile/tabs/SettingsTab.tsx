
import React from "react";
import { User } from "@/types/users";
import { AppearanceAndLanguage } from "@/components/shared/AppearanceAndLanguage";
import { useLanguage } from "@/features/language";

interface SettingsTabProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export function SettingsTab({ user, onUserUpdate }: SettingsTabProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  return (
    <div className="space-y-6">
      <AppearanceAndLanguage 
        cardTitle={t("Izskata iestatījumi", "Appearance Settings", "Настройки внешнего вида")}
        cardDescription={t(
          "Pielāgojiet aplikācijas izskatu", 
          "Customize how the application looks", 
          "Настройте внешний вид приложения"
        )}
        formDescriptionText={t(
          "Izvēlieties profila valodu", 
          "Choose your profile language",
          "Выберите язык профиля"
        )}
      />
    </div>
  );
}
