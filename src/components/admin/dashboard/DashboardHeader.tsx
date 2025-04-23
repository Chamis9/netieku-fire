
import React from "react";
import { useAdminTranslations } from "@/hooks/useAdminTranslations";

export function DashboardHeader() {
  const { t } = useAdminTranslations();
  
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{t('Administratora panelis', 'Administrator Dashboard')}</h1>
      <p className="text-muted-foreground">{t('Sistēmas statuss un pārskats', 'System status and overview')}</p>
    </div>
  );
}
