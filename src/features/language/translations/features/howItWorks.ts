
import { Language } from '../../types';

export type HowItWorksTranslations = {
  title: string;
  subtitle: string;
  steps: {
    title: string;
    description: string;
  }[];
};

export const howItWorksTranslations: Record<string, HowItWorksTranslations> = {
  lv: {
    title: "Kā tas strādā",
    subtitle: "Vienkāršs un drošs veids, kā pārdot vai iegādāties biļeti uz pasākumiem",
    steps: [
      {
        title: "Ievieto biļeti",
        description: "Ievietojiet pasākuma biļeti platformā ātri un vienkārši"
      },
      {
        title: "Sazinies ar pircēju",
        description: "Izmantojiet platformas saziņas iespējas"
      },
      {
        title: "Droša apmaiņa",
        description: "Vienkāršs un drošs apmaiņas process"
      },
      {
        title: "Apmeklē pasākumu",
        description: "Pasākuma apmeklējums un emocijas ir garantētas"
      }
    ]
  },
  en: {
    title: "How it works",
    subtitle: "A simple and secure way to sell or purchase event tickets",
    steps: [
      {
        title: "List your ticket",
        description: "List your event ticket on the platform quickly and easily"
      },
      {
        title: "Connect with buyers",
        description: "Use the platform's communication features"
      },
      {
        title: "Secure exchange",
        description: "Simple and secure exchange process"
      },
      {
        title: "Attend the event",
        description: "Event attendance and emotions are guaranteed"
      }
    ]
  },
  ru: {
    title: "Как это работает",
    subtitle: "Простой и безопасный способ продать или купить билеты на мероприятия",
    steps: [
      {
        title: "Разместите билет",
        description: "Разместите билет на мероприятие на платформе быстро и легко"
      },
      {
        title: "Свяжитесь с покупателем",
        description: "Используйте возможности общения платформы"
      },
      {
        title: "Безопасный обмен",
        description: "Простой и безопасный процесс обмена"
      },
      {
        title: "Посетите мероприятие",
        description: "Посещение мероприятия и эмоции гарантированы"
      }
    ]
  }
};
