
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/features/language";
import { supabase } from "@/integrations/supabase/client";

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const useSubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();

  const validateEmail = (emailToValidate: string): boolean => {
    if (!emailToValidate || !EMAIL_REGEX.test(emailToValidate)) {
      setFormError(getTranslations(currentLanguage.code).invalidEmail);
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    try {
      const now = Date.now();
      const lastSubmit = sessionStorage.getItem('lastEmailSubmit');
      
      if (lastSubmit && now - parseInt(lastSubmit) < 1000 * 60) {
        setFormError(getTranslations(currentLanguage.code).rateLimit);
        return;
      }
      
      sessionStorage.setItem('lastEmailSubmit', now.toString());
    } catch (error) {
      console.error("Error with session storage:", error);
    }
    
    if (!validateEmail(email)) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.toLowerCase().trim() }]);
      
      if (error) throw error;
      
      saveEmailToLocalStorage(email);
      setEmail("");

      const texts = getTranslations(currentLanguage.code);
      toast({
        title: texts.successTitle,
        description: texts.successMessage,
      });
    } catch (error) {
      console.error("Failed to subscribe:", error);
      const texts = getTranslations(currentLanguage.code);
      toast({
        title: texts.errorTitle,
        description: texts.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    formError,
    setFormError,
    handleSubmit
  };
};

const saveEmailToLocalStorage = (emailToSave: string) => {
  if (!emailToSave || emailToSave.trim() === '') return;
  
  try {
    if (!EMAIL_REGEX.test(emailToSave)) return;
    
    const existingEmails = localStorage.getItem('globalPreviousEmails');
    const emailList = existingEmails ? JSON.parse(existingEmails) : [];
    
    const updatedEmails = [...new Set([emailToSave, ...emailList])].slice(0, 10);
    
    localStorage.setItem('globalPreviousEmails', JSON.stringify(updatedEmails));
  } catch (error) {
    console.error("Error saving email to localStorage:", error);
  }
};

const getTranslations = (langCode: string) => {
  const translations = {
    lv: {
      placeholder: "E-pasta adrese",
      button: "Pieteikties",
      sending: "Sūta...",
      successTitle: "Paldies par pieteikšanos!",
      successMessage: "Mēs jūs informēsim par visiem jaunumiem.",
      errorTitle: "Kļūda!",
      errorMessage: "Neizdevās saglabāt e-pasta adresi. Lūdzu, mēģiniet vēlreiz.",
      previousEmails: "Iepriekš izmantotie e-pasti",
      selectEmail: "Izvēlies e-pastu...",
      invalidEmail: "Lūdzu, ievadiet derīgu e-pasta adresi",
      rateLimit: "Pārāk daudz mēģinājumu. Lūdzu, mēģiniet vēlāk."
    },
    en: {
      placeholder: "Email address",
      button: "Subscribe",
      sending: "Sending...",
      successTitle: "Thank you for subscribing!",
      successMessage: "We will keep you updated with all the news.",
      errorTitle: "Error!",
      errorMessage: "Failed to save email address. Please try again.",
      previousEmails: "Previously used emails",
      selectEmail: "Select email...",
      invalidEmail: "Please enter a valid email address",
      rateLimit: "Too many attempts. Please try again later."
    },
    ru: {
      placeholder: "Электронная почта",
      button: "Подписаться",
      sending: "Отправка...",
      successTitle: "Спасибо за подписку!",
      successMessage: "Мы будем держать вас в курсе всех новостей.",
      errorTitle: "Ошибка!",
      errorMessage: "Не удалось сохранить адрес электронной почты. Пожалуйста, попробуйте еще раз.",
      previousEmails: "Ранее использованные адреса",
      selectEmail: "Выберите адрес...",
      invalidEmail: "Пожалуйста, введите действительный адрес электронной почты",
      rateLimit: "Слишком много попыток. Пожалуйста, попробуйте позже."
    }
  };

  return translations[langCode as keyof typeof translations] || translations.en;
};

