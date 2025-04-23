
import React from "react";
import { Mail, Users, Ticket, AlertCircle, Settings, LogIn, LogOut } from "lucide-react";

type ActivityIconProps = {
  type: string;
  className?: string;
};

export function ActivityIcon({ type, className = "h-4 w-4" }: ActivityIconProps) {
  switch (type) {
    case 'subscriber':
      return <Mail className={`${className} text-green-600 dark:text-green-400`} />;
    case 'user':
      return <Users className={`${className} text-blue-600 dark:text-blue-400`} />;
    case 'ticket':
      return <Ticket className={`${className} text-purple-600 dark:text-purple-400`} />;
    case 'system':
      return <AlertCircle className={`${className} text-orange-600 dark:text-orange-400`} />;
    case 'login':
      return <LogIn className={`${className} text-blue-600 dark:text-blue-400`} />;
    case 'logout':
      return <LogOut className={`${className} text-red-600 dark:text-red-400`} />;
    case 'settings':
      return <Settings className={`${className} text-gray-600 dark:text-gray-400`} />;
    default:
      return <AlertCircle className={`${className} text-orange-600 dark:text-orange-400`} />;
  }
}
