
import React, { useState } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { LoadingSpinner } from "./components/LoadingSpinner";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

export function ProfileAuthGuard({ children, isAuthenticated, isLoading = false }: ProfileAuthGuardProps) {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Pieeja liegta</h2>
        <p className="text-muted-foreground mb-6">
          Lai piekļūtu šai lapai, lūdzu, piesakieties savā kontā
        </p>
        <Button
          onClick={() => setShowLoginModal(true)}
          variant="default"
          className="gap-2"
        >
          <UserCircle className="h-5 w-5" />
          Pieslēgties
        </Button>
        <LoginDialog 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    );
  }

  return <>{children}</>;
}
