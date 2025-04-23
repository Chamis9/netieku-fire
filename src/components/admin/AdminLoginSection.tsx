
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/features/language";
import { Helmet } from "react-helmet-async";

interface AdminLoginSectionProps {
  onLoginClick: () => void;
}

export function AdminLoginSection({ onLoginClick }: AdminLoginSectionProps) {
  const { currentLanguage } = useLanguage();
  
  // Translation helper
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>{t('Administratora panelis - netieku.es', 'Administrator Panel - netieku.es')}</title>
      </Helmet>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold">{t('Administratora panelis', 'Administrator Panel')}</h1>
          <p className="text-muted-foreground">
            {t('Lai piekļūtu administratora panelim, jums ir jāpierakstās.', 'To access the administrator panel, you need to log in.')}
          </p>
          <Button onClick={onLoginClick} className="w-full">
            {t('Pieslēgties', 'Login')}
          </Button>
          <div className="pt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                {t('Atgriezties uz mājas lapu', 'Return to Home Page')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
