
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CookiePreferences } from '../CookieConsent';
import { Translations } from '@/features/language';
import { Link } from 'react-router-dom';

interface CookieBannerProps {
  cookieConsent: Translations['cookieConsent'];
  onLearnMore: () => void;
  onAccept: (preferences?: Partial<CookiePreferences>) => void;
}

export function CookieBanner({ cookieConsent, onLearnMore, onAccept }: CookieBannerProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,  // Always enabled
    analytics: true,  // Default checked
    marketing: false  // Default unchecked
  });

  const handleToggleAnalytics = (checked: boolean) => {
    setPreferences(prev => ({ ...prev, analytics: checked }));
  };

  const handleToggleMarketing = (checked: boolean) => {
    setPreferences(prev => ({ ...prev, marketing: checked }));
  };

  const handleAcceptSelected = () => {
    onAccept(preferences);
  };

  const handleAcceptAll = () => {
    onAccept({ essential: true, analytics: true, marketing: true });
  };
  
  const handleDeclineAll = () => {
    onAccept({ essential: true, analytics: false, marketing: false });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-center">
        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 rounded-lg p-6 border border-white/10 max-w-xl w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-between gap-4 text-center">
              <p className="text-sm text-gray-300">
                {cookieConsent.message}{' '}
                <button 
                  onClick={onLearnMore} 
                  className="text-orange-500 hover:underline font-medium"
                >
                  {cookieConsent.learnMore}
                </button>
              </p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-2 justify-center">
                <Checkbox 
                  id="essential-cookies-banner" 
                  checked={preferences.essential} 
                  disabled
                  className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="essential-cookies-banner" className="text-white">
                  {cookieConsent.essentialCookiesTitle} ({cookieConsent.required || "Required"})
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 justify-center">
                <Checkbox 
                  id="analytics-cookies-banner"
                  checked={preferences.analytics}
                  onCheckedChange={handleToggleAnalytics}
                  className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="analytics-cookies-banner" className="text-white">
                  {cookieConsent.analyticsCookiesTitle}
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 justify-center">
                <Checkbox 
                  id="marketing-cookies-banner"
                  checked={preferences.marketing}
                  onCheckedChange={handleToggleMarketing}
                  className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="marketing-cookies-banner" className="text-white">
                  {cookieConsent.marketingCookies || "Marketing cookies"}
                </Label>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeclineAll}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {cookieConsent.decline}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAcceptSelected}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {cookieConsent.savePreferences || "Save preferences"}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAcceptAll}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {cookieConsent.accept}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

