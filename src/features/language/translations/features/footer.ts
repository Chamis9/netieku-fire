
import { Language } from '../../types';

export type FooterTranslations = {
  allRightsReserved: string;
  madeWith: string;
  location: string;
  cookieSettings: string;
  privacyPolicy: string;
  contactLink: string;
};

export const footerTranslations: Record<Language['code'], FooterTranslations> = {
  lv: {
    allRightsReserved: "© 2025 netieku.es",
    madeWith: "Radīts ar",
    location: "Latvijā",
    cookieSettings: "Sīkdatņu iestatījumi",
    privacyPolicy: "Privātuma politika",
    contactLink: "Kontakti"
  },
  en: {
    allRightsReserved: "© 2025 netieku.es",
    madeWith: "Made with",
    location: "in Latvia",
    cookieSettings: "Cookie Settings",
    privacyPolicy: "Privacy Policy",
    contactLink: "Contact"
  },
  ru: {
    allRightsReserved: "© 2025 netieku.es",
    madeWith: "Создано с",
    location: "в Латвии",
    cookieSettings: "Настройки файлов cookie",
    privacyPolicy: "Политика конфиденциальности",
    contactLink: "Контакты"
  }
};
