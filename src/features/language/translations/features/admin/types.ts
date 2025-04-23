
import { AdminHeaderTranslations } from './header';
import { AdminDashboardTranslations } from './dashboard';
import { AdminSubscribersTranslations } from './subscribers';
import { AdminSettingsTranslations } from './settings';
import { AdminActivityLogTranslations } from './activity-log';

export type AdminTranslations = {
  title?: string;
  defaultUser?: string;
  logout?: string;
  returnToHome?: string;
  logoutSuccess?: string;
  logoutError?: string;
  tabs?: {
    dashboard?: string;
    users?: string;
    admins?: string; // Added the admins property
    subscribers?: string;
    settings?: string;
  };
  auth?: {
    supabaseAuthAvailable?: string;
  };
  settings?: AdminSettingsTranslations;
  subscribers?: AdminSubscribersTranslations;
  activityLog?: AdminActivityLogTranslations;
  dashboard?: AdminDashboardTranslations;
  header?: AdminHeaderTranslations;
};
