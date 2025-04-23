
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { SystemStatusCard } from "./SystemStatusCard";
import { ActivityLogModal } from "@/components/admin/activity";
import { useAdminTranslations } from "@/hooks/useAdminTranslations";

// Memoize entire component to prevent unnecessary rerenders
export const AdminDashboardContent = memo(function AdminDashboardContent() {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const { formatRelativeTime } = useAdminTranslations();
  
  // Use ref to track component mounted state
  const mountedRef = useRef(true);
  
  // Cleanup function for when component unmounts
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="grid gap-4 md:grid-cols-2">
        <SystemStatusCard />
      </div>

      {showActivityModal && (
        <ActivityLogModal 
          open={showActivityModal} 
          onOpenChange={setShowActivityModal} 
        />
      )}
    </div>
  );
});
