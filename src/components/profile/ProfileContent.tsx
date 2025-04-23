
import React from "react";
import { User } from "@/types/users";
import { AccountTab } from "./tabs/account";
import { TicketsTab } from "./tabs/TicketsTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { SettingsTab } from "./tabs/SettingsTab";

interface ProfileContentProps {
  activeTab: string;
  user: User;
  onUserUpdate: (user: User) => void;
  isLoading: boolean;
}

export function ProfileContent({ activeTab, user, onUserUpdate, isLoading }: ProfileContentProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Renderējam atbilstošo sadaļu atkarībā no aktīvā taba
  switch (activeTab) {
    case "account":
      return <AccountTab user={user} onUserUpdate={onUserUpdate} />;
    case "tickets":
      return <TicketsTab user={user} />;
    case "payments":
      return <PaymentsTab user={user} />;
    case "settings":
      return <SettingsTab user={user} onUserUpdate={onUserUpdate} />;
    default:
      return <AccountTab user={user} onUserUpdate={onUserUpdate} />;
  }
}
