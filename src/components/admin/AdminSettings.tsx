
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/features/language";
import { AppearanceSettings } from "./settings/AppearanceSettings";
import { NotificationSettings } from "./settings/NotificationSettings";
import { PlaceholderSettings } from "./settings/PlaceholderSettings";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("Platformas iestatījumi", "Platform Settings", "Настройки платформы")}
        </h1>
        <p className="text-muted-foreground">
          {t("Pārvaldiet platformas globālos iestatījumus", "Manage platform global settings", "Управляйте глобальными настройками платформы")}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">
            {t("Izskats un valoda", "Appearance and Language", "Внешний вид и язык")}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {t("Paziņojumi", "Notifications", "Уведомления")}
          </TabsTrigger>
          <TabsTrigger value="security">
            {t("Drošība", "Security", "Безопасность")}
          </TabsTrigger>
          <TabsTrigger value="integrations">
            {t("Integrācijas", "Integrations", "Интеграции")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security">
          <PlaceholderSettings type="security" />
        </TabsContent>
        
        <TabsContent value="integrations">
          <PlaceholderSettings type="integrations" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Make sure to add a default export for lazy loading
export default AdminSettings;
