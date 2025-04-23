
export type AdminSettingsTranslations = {
  security?: {
    title?: string;
    description?: string;
    comingSoon?: string;
  };
  integrations?: {
    title?: string;
    description?: string;
    comingSoon?: string;
  };
};

export const adminSettingsTranslations = {
  lv: {
    security: {
      title: "Drošības iestatījumi",
      description: "Pārvaldiet platformas drošības iestatījumus",
      comingSoon: "Drošības iestatījumi tiks pievienoti drīzumā..."
    },
    integrations: {
      title: "Integrācijas",
      description: "Pārvaldiet trešo pušu integrācijas",
      comingSoon: "Integrāciju iestatījumi tiks pievienoti drīzumā..."
    }
  },
  en: {
    security: {
      title: "Security Settings",
      description: "Manage platform security settings",
      comingSoon: "Security settings will be added soon..."
    },
    integrations: {
      title: "Integrations",
      description: "Manage third-party integrations",
      comingSoon: "Integration settings will be added soon..."
    }
  },
  ru: {
    security: {
      title: "Настройки безопасности",
      description: "Управление настройками безопасности платформы",
      comingSoon: "Настройки безопасности будут добавлены в ближайшее время..."
    },
    integrations: {
      title: "Интеграции",
      description: "Управление интеграциями с третьими сторонами",
      comingSoon: "Настройки интеграции будут добавлены в ближайшее время..."
    }
  }
};
