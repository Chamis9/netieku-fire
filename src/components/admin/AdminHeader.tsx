
import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, UserCircle, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/features/language";
import { useToast } from "@/components/ui/use-toast";

export const AdminHeader = memo(function AdminHeader() {
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth();
  const { translations } = useLanguage();
  const { toast } = useToast();
  
  // Get current user email from localStorage or session
  const getUserEmail = useCallback(() => {
    try {
      // Check for email in localStorage (simpler approach)
      const emailFromStorage = localStorage.getItem('admin_email');
      if (emailFromStorage) {
        return emailFromStorage;
      }
      
      return translations.admin?.defaultUser || "Administrator";
    } catch (error) {
      console.error("Error getting user email:", error);
      return translations.admin?.defaultUser || "Administrator";
    }
  }, [translations]);
  
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast({
        description: translations.admin?.logoutSuccess || "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        description: translations.admin?.logoutError || "Error during logout process",
      });
    }
  }, [logout, toast, translations]);
  
  const userEmail = getUserEmail();
  
  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-black/40 backdrop-blur-sm h-16">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold text-white">netieku.es</span>
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium px-2 py-0.5 rounded">
              Admin
            </span>
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-white" />
          </Button>
        </div>
      </header>
    );
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-black/40 backdrop-blur-sm h-16">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold text-white">netieku.es</span>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium px-2 py-0.5 rounded">
            Admin
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <span className="text-white text-sm hidden md:inline-block truncate max-w-[150px]">
                {userEmail}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                title={translations.admin?.logout || "Logout"}
              >
                <LogOut className="h-5 w-5 text-white" />
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
});
