
import React from "react";
import { AppearanceAndLanguage } from "@/components/shared/AppearanceAndLanguage";
import { useLanguage } from "@/features/language";

export function AppearanceSettings() {
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };

  return (
    <AppearanceAndLanguage 
      cardTitle={t("Izskats un valoda", "Appearance and Language", "Внешний вид и язык")}
      cardDescription={t(
        "Pārvaldiet lietotāja saskarnes izskatu un valodu", 
        "Manage the user interface appearance and language",
        "Управляйте внешним видом и языком пользовательского интерфейса"
      )}
      formDescriptionText={t(
        "Izvēlieties administrācijas paneļa valodu", 
        "Choose the admin panel language",
        "Выберите язык панели администратора"
      )}
    />
  );
}
