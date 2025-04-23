
import { Language } from '../../types';

export type HeroTranslations = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  subscribeText: string;
  learnMoreBtn: string;
};

export const heroTranslations: Record<string, HeroTranslations> = {
  lv: {
    title: "Pārdodiet un pērciet biļetes",
    titleHighlight: "vienkārši un droši",
    subtitle: "Pirmā platforma biļešu apmaiņai Latvijā",
    subscribeText: "Piesakies, lai jau laicīgi uzzinātu par platformas atklāšanu!",
    learnMoreBtn: "Uzzināt vairāk",
  },
  en: {
    title: "Buy and sell tickets",
    titleHighlight: "simply and securely",
    subtitle: "The first platform for ticket exchange in Latvia",
    subscribeText: "Subscribe to learn about platform launch",
    learnMoreBtn: "Learn more",
  },
  ru: {
    title: "Продавайте и покупайте билеты",
    titleHighlight: "просто и безопасно",
    subtitle: "Первая платформа для обмена билетами в Латвии",
    subscribeText: "Подпишитесь, чтобы узнать о запуске платформы",
    learnMoreBtn: "Узнать больше",
  }
};
