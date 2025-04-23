
import React from "react";
import { User } from "@/types/users";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { SecurityCard } from "./SecurityCard";

interface AccountTabProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export function AccountTab({ user, onUserUpdate }: AccountTabProps) {
  return (
    <div className="space-y-6">
      <PersonalInfoCard user={user} onUserUpdate={onUserUpdate} />
      <SecurityCard />
    </div>
  );
}
