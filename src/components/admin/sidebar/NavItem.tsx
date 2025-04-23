
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const NavItem = ({ id, icon, label, badge, isActive, onClick }: NavItemProps) => {
  return (
    <Button 
      variant={isActive ? "default" : "ghost"} 
      className="w-full justify-start"
      onClick={() => onClick(id)}
    >
      {icon} {label}
      {badge !== undefined && (
        <Badge className="ml-auto" variant="outline">{badge}</Badge>
      )}
    </Button>
  );
};
