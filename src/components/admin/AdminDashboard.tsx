
import React, { memo } from "react";
import { AdminDashboardContent } from "./dashboard/AdminDashboardContent";

export const AdminDashboard = memo(function AdminDashboard() {
  return <AdminDashboardContent />;
});

// For compatibility with lazy loading
export default AdminDashboard;
