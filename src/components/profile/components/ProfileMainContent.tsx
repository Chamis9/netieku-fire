
import React from "react";
import { User } from "@/types/users";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileContent } from "../ProfileContent";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProfileMainContentProps {
  activeTab: string;
  user: User | null;
  onUserUpdate: (user: User) => void;
  isLoading: boolean;
}

export function ProfileMainContent({ 
  activeTab, 
  user, 
  onUserUpdate, 
  isLoading 
}: ProfileMainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <ProfileHeader activeTab={activeTab} user={user} />
      
      {isLoading ? (
        <LoadingSpinner />
      ) : user ? (
        <ProfileContent 
          activeTab={activeTab} 
          user={user} 
          onUserUpdate={onUserUpdate}
          isLoading={isLoading}
        />
      ) : (
        <div className="text-center p-12 bg-slate-50 rounded-lg">
          <p className="text-lg text-muted-foreground">
            Lietotāja dati nav pieejami
          </p>
        </div>
      )}
    </main>
  );
}
