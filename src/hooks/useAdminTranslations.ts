
import { useLanguage } from "@/features/language";
import { formatDistanceToNow } from "date-fns";
import { lv, enUS, ru } from "date-fns/locale";

export function useAdminTranslations() {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string, ruText?: string) => {
    if (currentLanguage.code === 'lv') return lvText;
    if (currentLanguage.code === 'ru') return ruText || enText;
    return enText;
  };

  const getLocale = () => {
    switch (currentLanguage.code) {
      case 'lv': return lv;
      case 'ru': return ru;
      default: return enUS;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: getLocale()
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return t('Pirms brīža', 'Recently', 'Недавно');
    }
  };
  
  return {
    t,
    formatRelativeTime,
    currentLanguage
  };
}
