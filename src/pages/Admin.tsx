import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminContent } from "@/components/admin/AdminContent";
import { AdminLoginSection } from "@/components/admin/AdminLoginSection";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { RegisteredUsers } from "@/components/admin/RegisteredUsers";
import { AdminSubscribers } from "@/components/admin/AdminSubscribers";
import { AdminSettings } from "@/components/admin/AdminSettings";

function AdminPage() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [adminCount, setAdminCount] = useState(0);
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the active tab from the current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    return path;
  };
  
  // Handle tab change by navigating to the appropriate route
  const handleTabChange = (tab: string) => {
    navigate(`/admin/${tab}`);
  };

  // Listen for admin count updates
  useEffect(() => {
    const handleAdminCountUpdate = (event: any) => {
      if (event.detail && typeof event.detail.count === 'number') {
        setAdminCount(event.detail.count);
      }
    };

    window.addEventListener('adminCountUpdated', handleAdminCountUpdate);
    return () => {
      window.removeEventListener('adminCountUpdated', handleAdminCountUpdate);
    };
  }, []);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AdminLoginSection onLoginClick={() => setShowLoginModal(true)} />
        <AdminLogin 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={() => setShowLoginModal(false)} 
        />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Administrator Panel - netieku.es</title>
        <meta name="description" content="Administrator panel for platform management" />
      </Helmet>

      <AdminHeader />
      
      <div className="flex flex-1 overflow-hidden pt-16">
        <AdminSidebar 
          activeTab={getActiveTabFromRoute()} 
          onTabChange={handleTabChange}
        />
        
        <div className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<RegisteredUsers />} />
            <Route path="/subscribers" element={<AdminSubscribers />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}
