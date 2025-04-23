import React, { memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/features/language";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

// Lazy load admin components for better performance
const AdminDashboard = lazy(() => import("@/components/admin/AdminDashboard"));
const RegisteredUsers = lazy(() => import("@/components/admin/RegisteredUsers"));
const AdminSubscribers = lazy(() => import("@/components/admin/AdminSubscribers"));
const AdminSettings = lazy(() => import("@/components/admin/AdminSettings"));

interface AdminContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminContent = memo(function AdminContent({ activeTab, onTabChange }: AdminContentProps) {
  const { translations } = useLanguage();

  const renderContent = () => {
    return (
      <Suspense fallback={<div className="animate-pulse p-4 rounded-md bg-gray-100 dark:bg-gray-800 h-64"></div>}>
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "users" && <RegisteredUsers />}
        {activeTab === "subscribers" && <AdminSubscribers />}
        {activeTab === "settings" && <AdminSettings />}
      </Suspense>
    );
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="container mx-auto">
        {/* Mobile view - tabs */}
        <AdminMobileNav activeTab={activeTab} onTabChange={onTabChange} />
        
        {/* Dynamic content */}
        {renderContent()}
        
        {/* Navigation back to home page */}
        <div className="mt-8 flex justify-end">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> 
              {translations.admin?.returnToHome || 'Return to Home Page'}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
});
