
export type AdminActivityLogTranslations = {
  title?: string;
  description?: string;
  activity?: string;
  details?: string;
  time?: string;
  newSubscriber?: string;
  newUser?: string;
  newTicket?: string;
  systemUpdate?: string;
  noActivities?: string;
  viewAll?: string;
};

export const adminActivityLogTranslations = {
  lv: {
    title: "Aktivitāšu žurnāls",
    description: "Platformas lietotāju aktivitātes",
    activity: "Darbība",
    details: "Detaļas",
    time: "Laiks",
    newSubscriber: "Jauns e-pasta abonents",
    newUser: "Jauns lietotājs",
    newTicket: "Jauna biļete",
    systemUpdate: "Sistēmas atjauninājums",
    noActivities: "Nav aktivitāšu",
    viewAll: "Skatīt visas aktivitātes"
  },
  en: {
    title: "Activity Log",
    description: "User activities on the platform",
    activity: "Activity",
    details: "Details",
    time: "Time",
    newSubscriber: "New email subscriber",
    newUser: "New user registered",
    newTicket: "New support ticket created",
    systemUpdate: "System update completed",
    noActivities: "No activities",
    viewAll: "View all activities"
  },
  ru: {
    title: "Журнал активности",
    description: "Действия пользователей на платформе",
    activity: "Действие",
    details: "Детали",
    time: "Время",
    newSubscriber: "Новый подписчик на рассылку",
    newUser: "Новый пользователь зарегистрирован",
    newTicket: "Создан новый тикет поддержки",
    systemUpdate: "Обновление системы завершено",
    noActivities: "Нет активностей",
    viewAll: "Просмотреть все активности"
  }
};
