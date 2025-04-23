
import React from "react";
import { DashboardStatCard } from "./DashboardStatCard";
import { Users, Mail, Ticket, Clock } from "lucide-react";
import { useAdminTranslations } from "@/hooks/useAdminTranslations";

interface DashboardStatsGridProps {
  totalSubscribers: number;
  isLoading: boolean;
}

export function DashboardStatsGrid({ totalSubscribers, isLoading }: DashboardStatsGridProps) {
  const { t } = useAdminTranslations();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardStatCard
        title={t('Kopējie lietotāji', 'Total Users')}
        value="23"
        icon={Users}
        trend={{
          value: "+5%",
          text: t('kopš pagājušā mēneša', 'since last month')
        }}
      />
      
      <DashboardStatCard
        title={t('Jauni e-pasta abonenti', 'New Email Subscribers')}
        value={totalSubscribers}
        icon={Mail}
        trend={{
          value: "+12%",
          text: t('kopš pagājušās nedēļas', 'since last week')
        }}
        isLoading={isLoading}
      />
      
      <DashboardStatCard
        title={t('Aktīvās biļetes', 'Active Tickets')}
        value="0"
        icon={Ticket}
      />
      
      <DashboardStatCard
        title={t('Lietotāju aktivitāte', 'User Activity')}
        value="86%"
        icon={Clock}
        trend={{
          value: "+2%",
          text: t('kopš pagājušā mēneša', 'since last month')
        }}
      />
    </div>
  );
}
