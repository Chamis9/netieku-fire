
import React from 'react';
import { 
  Home, 
  Users, 
  Inbox, 
  Settings, 
  LogOut
} from 'lucide-react';
import { TranslationObject } from '@/features/language/types';

export const getNavItems = (
  translations: TranslationObject, 
  userCount: number, 
  subscriberCount: number
) => {
  const items = [
    {
      id: 'dashboard',
      icon: <Home />,
      label: translations.admin?.tabs?.dashboard || 'Dashboard',
      badge: undefined  // Remove badge for dashboard
    },
    {
      id: 'users',
      icon: <Users />,
      label: translations.admin?.tabs?.users || 'Users',
      badge: userCount
    },
    {
      id: 'subscribers',
      icon: <Inbox />,
      label: translations.admin?.tabs?.subscribers || 'Subscribers',
      badge: subscriberCount
    },
    {
      id: 'settings',
      icon: <Settings />,
      label: translations.admin?.tabs?.settings || 'Settings',
      badge: undefined  // Remove badge for settings
    },
    {
      id: 'logout',
      icon: <LogOut />,
      label: translations.admin?.logout || 'Logout',
      badge: undefined  // Remove the badge for logout
    }
  ];

  return items;
};
