
import React from "react";
import { RegisteredUsers } from "./RegisteredUsers";

export function AdminUsers() {
  // Simply render RegisteredUsers component since we removed AdminUsersContainer
  return <RegisteredUsers />;
}

// Add default export for lazy loading compatibility
export default AdminUsers;
