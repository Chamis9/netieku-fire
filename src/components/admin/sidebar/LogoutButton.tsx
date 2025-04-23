
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  logoutText: string;
  onLogout: () => void;
}

export const LogoutButton = ({ logoutText, onLogout }: LogoutButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-red-500 hover:text-red-600"
      onClick={onLogout}
    >
      <LogOut className="mr-2 h-4 w-4" /> {logoutText}
    </Button>
  );
};
