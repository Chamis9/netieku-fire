
import { useState, useContext, createContext, ReactNode, useEffect } from "react";
import { Language, Translations } from './types';
import translationsData, { languages } from './translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  translations: translationsData.lv,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get the language from localStorage or use Latvian as default
  const getSavedLanguage = (): Language => {
    const savedLanguageCode = localStorage.getItem('language');
    if (savedLanguageCode) {
      const found = languages.find(lang => lang.code === savedLanguageCode);
      return found || languages[0];
    }
    return languages[0]; // Default to Latvian
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getSavedLanguage());

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
  };

  // Make sure language state is synchronized on all pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        const langObject = languages.find(lang => lang.code === e.newValue);
        if (langObject && langObject.code !== currentLanguage.code) {
          setCurrentLanguage(langObject);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        translations: translationsData[currentLanguage.code] 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
