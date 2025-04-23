
import { Language } from '../../types';

export type CookieConsentTranslations = {
  message: string;
  learnMore: string;
  accept: string;
  decline: string;
  dialogTitle: string;
  dialogDescription: string;
  whatAreCookies: string;
  whyWeUseCookies: string;
  typesOfCookies: string;
  essentialCookiesTitle: string;
  essentialCookiesDescription: string;
  analyticsCookiesTitle: string;
  analyticsCookiesDescription: string;
  privacyPolicy: string;
  required?: string;
  savePreferences?: string;
  cookieSettings?: string;
  marketingCookies?: string;
  marketingCookiesDescription?: string;
};

export const cookieConsentTranslations: Record<string, CookieConsentTranslations> = {
  lv: {
    message: "Mēs izmantojam sīkdatnes. Turpinot lietot šo mājas lapu, Jūs piekrītat sīkdatņu lietošanas noteikumiem.",
    learnMore: "Uzzināt vairāk",
    accept: "Piekrītu",
    decline: "Atteikties",
    dialogTitle: "Sīkdatņu lietošanas noteikumi",
    dialogDescription: "Informācija par sīkdatnēm un to lietošanu mūsu platformā.",
    whatAreCookies: "Sīkdatnes ir nelieli teksta faili, kas tiek saglabāti jūsu ierīcē, kad apmeklējat mūsu vietni. Tās palīdz mums nodrošināt labāku lietotāja pieredzi.",
    whyWeUseCookies: "Mēs izmantojam sīkdatnes, lai uzlabotu vietnes funkcionalitāti, analizētu lietotāju plūsmu un personalizētu jūsu pieredzi.",
    typesOfCookies: "Mēs izmantojam šādus sīkdatņu veidus:",
    essentialCookiesTitle: "Nepieciešamās sīkdatnes",
    essentialCookiesDescription: "Šīs sīkdatnes ir nepieciešamas vietnes pamatfunkciju darbībai. Tās ļauj jums pārvietoties pa vietni un izmantot tās funkcijas.",
    analyticsCookiesTitle: "Analītiskās sīkdatnes",
    analyticsCookiesDescription: "Šīs sīkdatnes palīdz mums saprast, kā lietotāji mijiedarbojas ar vietni, vācot un ziņojot informāciju anonīmi.",
    privacyPolicy: "Plašāku informāciju par to, kā mēs izmantojam jūsu datus, varat skatīt mūsu privātuma politikā.",
    required: "Obligāti",
    savePreferences: "Saglabāt iestatījumus",
    cookieSettings: "Sīkdatņu iestatījumi",
    marketingCookies: "Mārketinga sīkdatnes",
    marketingCookiesDescription: "Šīs sīkdatnes tiek izmantotas, lai izsekotu lietotājus dažādās vietnēs un parādītu attiecīgas reklāmas, kas ir aktuālas un saistošas konkrētajam lietotājam."
  },
  en: {
    message: "We use cookies on our website. By continuing to use this site, you agree to our cookie policy.",
    learnMore: "Learn more",
    accept: "Accept",
    decline: "Decline",
    dialogTitle: "Cookie Policy",
    dialogDescription: "Information about cookies and their usage on our platform.",
    whatAreCookies: "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better user experience.",
    whyWeUseCookies: "We use cookies to improve site functionality, analyze user traffic, and personalize your experience.",
    typesOfCookies: "We use the following types of cookies:",
    essentialCookiesTitle: "Essential Cookies",
    essentialCookiesDescription: "These cookies are necessary for the basic functions of the website. They allow you to navigate around the site and use its features.",
    analyticsCookiesTitle: "Analytics Cookies",
    analyticsCookiesDescription: "These cookies help us understand how users interact with the website by collecting and reporting information anonymously.",
    privacyPolicy: "For more information about how we use your data, please see our privacy policy.",
    required: "Required",
    savePreferences: "Save preferences",
    cookieSettings: "Cookie Settings",
    marketingCookies: "Marketing cookies",
    marketingCookiesDescription: "These cookies are used to track users across websites and display relevant advertisements that are relevant and engaging to the individual user."
  },
  ru: {
    message: "Мы используем файлы cookie. Продолжая использовать этот сайт, вы соглашаетесь с нашей политикой в отношении файлов cookie.",
    learnMore: "Узнать больше",
    accept: "Принять",
    decline: "Отклонить",
    dialogTitle: "Политика использования файлов cookie",
    dialogDescription: "Информация о файлах cookie и их использовании на нашей платформе.",
    whatAreCookies: "Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта. Они помогают нам обеспечить вам лучший пользовательский опыт.",
    whyWeUseCookies: "Мы используем файлы cookie для улучшения функциональности сайта, анализа пользовательского трафика и персонализации вашего опыта.",
    typesOfCookies: "Мы используем следующие типы файлов cookie:",
    essentialCookiesTitle: "Необходимые файлы cookie",
    essentialCookiesDescription: "Эти файлы cookie необходимы для основных функций сайта. Они позволяют перемещаться по сайту и использовать его функции.",
    analyticsCookiesTitle: "Аналитические файлы cookie",
    analyticsCookiesDescription: "Эти файлы cookie помогают нам понять, как пользователи взаимодействуют с сайтом, собирая и сообщая информацию анонимно.",
    privacyPolicy: "Для получения дополнительной информации о том, как мы используем ваши данные, пожалуйста, ознакомьтесь с нашей политикой конфиденциальности.",
    required: "Обязательно",
    savePreferences: "Сохранить настройки",
    cookieSettings: "Настройки файлов cookie",
    marketingCookies: "Маркетинговые файлы cookie",
    marketingCookiesDescription: "Эти файлы cookie используются для отслеживания пользователей на разных веб-сайтах и отображения соответствующей рекламы, которая актуальна и привлекательна для конкретного пользователя."
  }
};
