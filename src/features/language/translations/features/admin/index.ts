
import { AdminTranslations } from './types';
import { adminHeaderTranslations } from './header';
import { adminDashboardTranslations } from './dashboard';
import { adminSettingsTranslations } from './settings';
import { adminSubscribersTranslations } from './subscribers';
import { adminActivityLogTranslations } from './activity-log';

export const adminTranslations: Record<string, AdminTranslations> = {
  lv: {
    title: "Administratora panelis",
    defaultUser: "Administrators",
    logout: "Iziet", // Changed from "Izrakstīties"
    returnToHome: "Atgriezties uz sākumlapu",
    logoutSuccess: "Jūs esat veiksmīgi izrakstījies",
    logoutError: "Kļūda izrakstīšanās laikā",
    tabs: {
      dashboard: "Pārskats",
      users: "Lietotāji",
      admins: "Administratori",
      subscribers: "Abonenti",
      settings: "Iestatījumi"
    },
    auth: {
      supabaseAuthAvailable: "Supabase autentifikācija ir pieejama. Lūdzu, izmantojiet administratora kontu, lai pieslēgtos."
    },
    settings: adminSettingsTranslations.lv,
    subscribers: adminSubscribersTranslations.lv,
    activityLog: adminActivityLogTranslations.lv,
    dashboard: adminDashboardTranslations.lv,
    header: adminHeaderTranslations.lv
  },
  en: {
    title: "Administrator Panel",
    defaultUser: "Administrator",
    logout: "Logout",
    returnToHome: "Return to Home Page",
    logoutSuccess: "You have been successfully logged out",
    logoutError: "Error during logout process",
    tabs: {
      dashboard: "Dashboard",
      users: "Users",
      admins: "Administrators",
      subscribers: "Subscribers",
      settings: "Settings"
    },
    auth: {
      supabaseAuthAvailable: "Supabase authentication is available. Please use an admin account to log in."
    },
    settings: adminSettingsTranslations.en,
    subscribers: adminSubscribersTranslations.en,
    activityLog: adminActivityLogTranslations.en,
    dashboard: adminDashboardTranslations.en,
    header: adminHeaderTranslations.en
  },
  ru: {
    title: "Панель администратора",
    defaultUser: "Администратор",
    logout: "Выйти",
    returnToHome: "Вернуться на главную страницу",
    logoutSuccess: "Вы успешно вышли из системы",
    logoutError: "Ошибка при выходе из системы",
    tabs: {
      dashboard: "Панель управления",
      users: "Пользователи",
      admins: "Администраторы",
      subscribers: "Подписчики",
      settings: "Настройки"
    },
    auth: {
      supabaseAuthAvailable: "Аутентификация Supabase доступна. Пожалуйста, используйте учетную запись администратора для входа."
    },
    settings: adminSettingsTranslations.ru,
    subscribers: adminSubscribersTranslations.ru,
    activityLog: adminActivityLogTranslations.ru,
    dashboard: adminDashboardTranslations.ru,
    header: adminHeaderTranslations.ru
  }
};

export type { AdminTranslations } from './types';
export type { AdminHeaderTranslations } from './header';
export type { AdminDashboardTranslations } from './dashboard';
export type { AdminSettingsTranslations } from './settings';
export type { AdminSubscribersTranslations } from './subscribers';
export type { AdminActivityLogTranslations } from './activity-log';
