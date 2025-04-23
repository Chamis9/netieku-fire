
import { useState, useEffect, useRef } from "react";
import { UserCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/forms/LoginForm";
import { RegistrationForm } from "@/components/auth/forms/RegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme/ThemeProvider";

interface AuthHoverCardProps {
  translations: any;
  currentLanguage: { code: string };
}

export function AuthHoverCard({ translations, currentLanguage }: AuthHoverCardProps) {
  const [isAuthCardOpen, setIsAuthCardOpen] = useState(false);
  const { theme } = useTheme();
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleAutoFill = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.closest('.hover-card-content')) {
          input.addEventListener('animationstart', (e) => {
            if (e.animationName.includes('onAutoFill')) {
              setIsAuthCardOpen(true);
              input.classList.add('using-autofill');
              setTimeout(() => {
                input.classList.remove('using-autofill');
              }, 1000);
            }
          });
        }
      });
    };

    if (isAuthCardOpen) {
      const timer = setTimeout(() => {
        handleAutoFill();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthCardOpen]);

  // "onClick" atvērs kartīti arī pēc klikšķa uz ikonas
  const handleIconClick = () => {
    setIsAuthCardOpen(true);
  };

  return (
    <HoverCard 
      open={isAuthCardOpen} 
      onOpenChange={(open) => {
        if (open) {
          setIsAuthCardOpen(true);
        } else {
          const activeElement = document.activeElement;
          const isInteractingWithForm = activeElement && 
            (activeElement.tagName === 'INPUT' || 
             activeElement.closest('form'));
          
          if (!isInteractingWithForm) {
            setIsAuthCardOpen(false);
          }
        }
      }}
    >
      <HoverCardTrigger asChild>
        <Button
          ref={triggerButtonRef}
          variant="ghost"
          size="icon"
          className="text-white hover:text-orange-400 transition-colors duration-300 hover:bg-transparent"
          onClick={handleIconClick}
        >
          <UserCircle size={20} className="hover:text-orange-400" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent 
        className={`w-[400px] p-4 hover-card-content 
          ${theme === 'dark' ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}
        onPointerDownOutside={(e) => {
          if (e.target && (
            (e.target as HTMLElement).tagName === 'INPUT' || 
            (e.target as HTMLElement).closest('form')
          )) {
            e.preventDefault();
          }
        }}
        onFocusOutside={(e) => {
          if (e.target && (
            (e.target as HTMLElement).tagName === 'INPUT' || 
            (e.target as HTMLElement).closest('form')
          )) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (e.target && (
            (e.target as HTMLElement).tagName === 'INPUT' || 
            (e.target as HTMLElement).closest('form') ||
            document.querySelector('.autofill')
          )) {
            e.preventDefault();
          }
        }}
      >
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{translations.login}</TabsTrigger>
            <TabsTrigger value="register">{translations.register}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-4">
            <LoginForm 
              onClose={() => setIsAuthCardOpen(false)} 
              translations={translations} 
            />
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4 mt-4">
            <RegistrationForm 
              translations={translations} 
              languageCode={currentLanguage.code}
              onClose={() => setIsAuthCardOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
}
