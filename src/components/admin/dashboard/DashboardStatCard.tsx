
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useAdminTranslations } from "@/hooks/useAdminTranslations";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    text: string;
    positive?: boolean;
  };
  isLoading?: boolean;
}

export function DashboardStatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  isLoading 
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{isLoading ? '...' : value}</div>
        {trend ? (
          <div className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">{trend.value}</span> {trend.text}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{isLoading ? '' : title}</p>
        )}
      </CardContent>
    </Card>
  );
}
