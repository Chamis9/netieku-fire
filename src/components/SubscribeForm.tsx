
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/features/language";
import { useSubscribeForm } from "@/hooks/useSubscribeForm";
import { usePreviousEmails } from "@/hooks/usePreviousEmails";
import { EmailDropdown } from "@/components/subscribe/EmailDropdown";

export function SubscribeForm() {
  const { currentLanguage } = useLanguage();
  const { 
    email, 
    setEmail, 
    isLoading, 
    formError, 
    setFormError, 
    handleSubmit 
  } = useSubscribeForm();
  
  const { 
    previousEmails, 
    showDropdown, 
    setShowDropdown 
  } = usePreviousEmails();

  const texts = getTranslations(currentLanguage.code);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setShowDropdown(e.target.value.length > 0);
    if (formError) setFormError("");
  };

  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setShowDropdown(false);
  };

  const checkForAutofill = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.classList.contains('using-autofill')) {
      setShowDropdown(false);
      return;
    }
    
    if (previousEmails.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md bg-transparent p-0 subscribe-form"
    >
      <div className="relative flex-grow">
        <Input
          type="email"
          placeholder={texts.placeholder}
          value={email}
          onChange={handleEmailChange}
          onFocus={checkForAutofill}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          required
          aria-invalid={formError ? "true" : "false"}
          className="flex-grow h-12 text-base font-playfair placeholder-orange-500/70 bg-white border-orange-300/50" 
        />
        
        {formError && (
          <div className="text-red-500 text-sm mt-1">{formError}</div>
        )}
        
        <EmailDropdown 
          showDropdown={showDropdown}
          previousEmails={previousEmails}
          onEmailSelect={handleEmailSelect}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg px-6 font-semibold font-playfair" 
        aria-busy={isLoading}
      >
        {isLoading ? texts.sending : texts.button}
      </Button>
    </form>
  );
}

const getTranslations = (langCode: string) => {
  const translations = {
    lv: {
      placeholder: "E-pasta adrese",
      button: "Pieteikties",
      sending: "Sūta..."
    },
    en: {
      placeholder: "Email address",
      button: "Subscribe",
      sending: "Sending..."
    },
    ru: {
      placeholder: "Электронная почта",
      button: "Подписаться",
      sending: "Отправка..."
    }
  };

  return translations[langCode as keyof typeof translations] || translations.en;
};
