
/**
 * Utility functions for managing cookies in the application
 */

import { CookiePreferences } from "@/components/CookieConsent";

// Get a specific cookie by name
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Set a cookie with options
export const setCookie = (
  name: string, 
  value: string, 
  options: { maxAge?: number; path?: string; sameSite?: 'Strict' | 'Lax' | 'None' } = {}
): void => {
  const { maxAge = 31536000, path = '/', sameSite = 'Lax' } = options;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=${path}; SameSite=${sameSite}`;
};

// Delete a specific cookie by name
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; max-age=0; path=/`;
};

// Clear all cookies set by the application
export const clearAllCookies = (): void => {
  // Delete known application cookies
  deleteCookie('essential_cookies');
  deleteCookie('analytics_cookies');
  deleteCookie('marketing_cookies');
  
  // Additional cookies to be cleared can be added here
  
  // Log that cookies have been cleared
  console.log('All application cookies cleared');
};

// Set cookies based on user preferences
export const setCookiesByPreferences = (preferences: CookiePreferences): void => {
  // Set essential cookies - these are always enabled
  setCookie('essential_cookies', 'true');
  
  // Set analytics cookies if allowed
  if (preferences.analytics) {
    setCookie('analytics_cookies', 'true');
  } else {
    // Delete analytics cookies if they exist
    deleteCookie('analytics_cookies');
  }
  
  // Set marketing cookies if allowed
  if (preferences.marketing) {
    setCookie('marketing_cookies', 'true');
  } else {
    // Delete marketing cookies if they exist
    deleteCookie('marketing_cookies');
  }
};

// Check if a specific cookie type is enabled
export const isCookieEnabled = (type: keyof CookiePreferences): boolean => {
  const cookie = getCookie(`${type}_cookies`);
  return cookie === 'true';
};

