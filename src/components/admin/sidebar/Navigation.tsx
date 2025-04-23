
import React from "react";
import { NavItem } from "./NavItem";
import { getNavItems } from "./getNavItems";
import { TranslationObject } from "@/features/language/types";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userCount: number;
  subscriberCount: number;
  adminCount?: number;
  translations: TranslationObject;
}

export const Navigation = ({ 
  activeTab, 
  onTabChange, 
  userCount, 
  subscriberCount, 
  adminCount = 0,
  translations 
}: NavigationProps) => {
  const navItems = getNavItems(translations, userCount, subscriberCount);
  
  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => (
        <NavItem 
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          isActive={activeTab === item.id}
          onClick={onTabChange}
        />
      ))}
    </nav>
  );
};
