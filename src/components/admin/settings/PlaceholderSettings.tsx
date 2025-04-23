
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useLanguage } from "@/features/language";

interface PlaceholderSettingsProps {
  type: "security" | "integrations";
}

export function PlaceholderSettings({ type }: PlaceholderSettingsProps) {
  const { translations } = useLanguage();
  
  const titles = {
    security: translations.admin?.settings?.security?.title || "Security Settings",
    integrations: translations.admin?.settings?.integrations?.title || "Integrations"
  };
  
  const descriptions = {
    security: translations.admin?.settings?.security?.description || "Manage platform security settings",
    integrations: translations.admin?.settings?.integrations?.description || "Manage third-party integrations"
  };
  
  const messages = {
    security: translations.admin?.settings?.security?.comingSoon || "Security settings will be added soon...",
    integrations: translations.admin?.settings?.integrations?.comingSoon || "Integration settings will be added soon..."
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titles[type]}</CardTitle>
        <CardDescription>
          {descriptions[type]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {messages[type]}
        </p>
      </CardContent>
    </Card>
  );
}
