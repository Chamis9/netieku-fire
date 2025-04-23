import React, { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "./features/language";
import { CookieConsent } from "./components/CookieConsent";
import { clearAllCookies } from "./utils/cookieManager";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";

// Import directly instead of lazy loading to fix dynamic import issues
import Index from "./pages/Index";
import Contact from "./pages/Contact";

// Lazy load other pages for better performance
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));

// Create a loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create the query client only once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Global logout function - updated for local auth
const handleLogout = () => {
  clearAllCookies();
  localStorage.removeItem('admin_authenticated');
  console.log("User logged out and cookies cleared");
};

// Make the logout function globally available
window.logout = handleLogout;

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Simplified initialization
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <CookieConsent />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/profile/*" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </LanguageProvider>
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

// Update TypeScript declaration
declare global {
  interface Window {
    logout?: () => void;
    openCookieSettings?: () => void;
    manageCookieConsent?: () => void;
    clearAllCookiesOnLogout?: () => void;
  }
}

export default App;
