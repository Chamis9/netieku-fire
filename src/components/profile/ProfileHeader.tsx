
import React from "react";
import { useLanguage } from "@/features/language";
import { User } from "@/types/users";

interface ProfileHeaderProps {
  activeTab: string;
  user: User | null;
}

export function ProfileHeader({ activeTab, user }: ProfileHeaderProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "account":
        return t("Mans konts", "My Account", "Мой аккаунт");
      case "tickets":
        return t("Manas biļetes", "My Tickets", "Мои билеты");
      case "payments":
        return t("Mani maksājumi", "My Payments", "Мои платежи");
      case "settings":
        return t("Iestatījumi", "Settings", "Настройки");
      default:
        return t("Mans profils", "My Profile", "Мой профиль");
    }
  };
  
  const getHeaderDescription = () => {
    switch (activeTab) {
      case "account":
        return t("Pārvaldiet savu konta informāciju", "Manage your account information", "Управление информацией вашего аккаунта");
      case "tickets":
        return t("Apskatiet savas biļetes", "View your tickets", "Просмотр ваших билетов");
      case "payments":
        return t("Apskatiet savus maksājumus", "View your payment history", "Просмотр истории ваших платежей");
      case "settings":
        return t("Pielāgojiet savas preferences", "Customize your preferences", "Настройка ваших предпочтений");
      default:
        return t("Pārvaldiet savu lietotāja profilu", "Manage your user profile", "Управление вашим профилем пользователя");
    }
  };
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {getHeaderTitle()}
      </h1>
      <p className="text-muted-foreground">
        {getHeaderDescription()}
      </p>
    </div>
  );
}
