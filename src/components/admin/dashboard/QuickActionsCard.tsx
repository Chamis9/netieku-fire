
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Ticket } from "lucide-react";
import { useAdminTranslations } from "@/hooks/useAdminTranslations";

export function QuickActionsCard() {
  const { t } = useAdminTranslations();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Ātrās darbības', 'Quick Actions')}</CardTitle>
        <CardDescription>{t('Biežāk izmantotās administratora funkcijas', 'Frequently used administrator functions')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          {t('Pārvaldīt lietotājus', 'Manage Users')}
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Mail className="mr-2 h-4 w-4" />
          {t('Sūtīt ziņojumu abonentiem', 'Send Message to Subscribers')}
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Ticket className="mr-2 h-4 w-4" />
          {t('Pārvaldīt biļetes', 'Manage Tickets')}
        </Button>
      </CardContent>
    </Card>
  );
}
