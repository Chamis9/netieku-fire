
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Activity } from "./types";
import { ActivityIcon } from "./ActivityIcon";
import { useLanguage } from "@/features/language";
import { formatDistanceToNow } from "date-fns";
import { lv, enUS, ru } from "date-fns/locale";

type ActivityTableProps = {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
};

export function ActivityTable({ activities, isLoading, error }: ActivityTableProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };
  
  const getLocale = () => {
    switch (currentLanguage.code) {
      case 'lv': return lv;
      case 'ru': return ru;
      default: return enUS;
    }
  };
  
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: getLocale()
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return t('Pirms brīža', 'Recently', 'Недавно');
    }
  };
  
  const translateActivityType = (type: string) => {
    switch (type) {
      case 'subscriber':
        return t('Jauns e-pasta abonents', 'New email subscriber');
      case 'user':
        return t('Jauns lietotājs', 'New user registered');
      case 'ticket':
        return t('Jauna biļete', 'New support ticket created');
      case 'system':
        return t('Sistēmas atjauninājums', 'System update completed');
      case 'login':
        return t('Pieteikšanās', 'Login', 'Вход в систему');
      case 'logout':
        return t('Izrakstīšanās', 'Logout', 'Выход из системы');
      case 'settings':
        return t('Iestatījumu izmaiņas', 'Settings changed', 'Изменение настроек');
      default:
        return type;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }
  
  if (activities.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        {t('Nav aktivitāšu', 'No activities', 'Нет активностей')}
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>
            {t('Darbība', 'Activity', 'Действие')}
          </TableHead>
          <TableHead>
            {t('Detaļas', 'Details', 'Детали')}
          </TableHead>
          <TableHead>
            {t('Laiks', 'Time', 'Время')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                <ActivityIcon type={activity.activity_type} />
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {translateActivityType(activity.activity_type)}
            </TableCell>
            <TableCell>
              {activity.description}
              {activity.email && (
                <div className="text-sm text-muted-foreground">{activity.email}</div>
              )}
            </TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {formatRelativeTime(activity.created_at)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
