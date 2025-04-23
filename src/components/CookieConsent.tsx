
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/features/language';
import { CookieBanner } from './cookies/CookieBanner';
import { CookiePreferencesDialog } from './cookies/CookiePreferencesDialog';
import { setCookiesByPreferences, clearAllCookies } from '@/utils/cookieManager';

const COOKIE_CONSENT_KEY = 'cookie-consent-v2';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false
  });

  const { translations } = useLanguage();
  const { cookieConsent } = translations;

  // Check for existing consent when component mounts
  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      setShowBanner(true);
    } else {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setCookiePreferences(parsedConsent);
        // Apply stored preferences to actual cookies
        setCookiesByPreferences(parsedConsent);
      } catch (error) {
        console.error('Error parsing cookie consent', error);
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = (preferences?: Partial<CookiePreferences>) => {
    const finalPreferences = {
      ...cookiePreferences,
      ...preferences
    };

    // Save preferences to localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalPreferences));
    
    // Set actual cookies based on preferences
    setCookiesByPreferences(finalPreferences);
    
    // Update state
    setCookiePreferences(finalPreferences);
    setShowBanner(false);
    setShowDialog(false);
  };

  const handleLearnMore = () => {
    setShowDialog(true);
  };

  // Expose functions globally for other components to use
  useEffect(() => {
    window.openCookieSettings = () => setShowDialog(true);
    window.manageCookieConsent = () => setShowBanner(true);
    window.clearAllCookiesOnLogout = clearAllCookies;
    
    // Cleanup
    return () => {
      delete window.openCookieSettings;
      delete window.manageCookieConsent;
      delete window.clearAllCookiesOnLogout;
    }
  }, []);

  if (!showBanner && !showDialog) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <CookieBanner 
          cookieConsent={cookieConsent}
          onLearnMore={handleLearnMore}
          onAccept={handleAccept}
        />
      )}

      <CookiePreferencesDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        cookiePreferences={cookiePreferences}
        setCookiePreferences={setCookiePreferences}
        onSave={handleAccept}
        cookieConsent={cookieConsent}
      />
    </>
  );
}

// Declare global window interface for TypeScript
declare global {
  interface Window {
    openCookieSettings?: () => void;
    manageCookieConsent?: () => void;
    clearAllCookiesOnLogout?: () => void;
  }
}
