
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/features/language";
import { UserFilters } from "../hooks/useUserFiltering";

interface UserFilterStatusProps {
  activeFilters: UserFilters;
  onRemoveFilter: (key: keyof UserFilters) => void;
  onClearFilters: () => void;
}

export function UserFilterStatus({ 
  activeFilters, 
  onRemoveFilter,
  onClearFilters
}: UserFilterStatusProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  // Check if any filter is active
  const hasActiveFilters = Object.values(activeFilters).some(val => val !== "");
  
  if (!hasActiveFilters) {
    return null;
  }
  
  const getFilterLabel = (key: keyof UserFilters, value: string) => {
    switch (key) {
      case 'name':
        return `${t('Vārds', 'Name')}: ${value}`;
      case 'email':
        return `${t('E-pasts', 'Email')}: ${value}`;
      case 'phone':
        return `${t('Telefons', 'Phone')}: ${value}`;
      case 'role':
        return `${t('Loma', 'Role')}: ${value === 'admin' ? t('Administrators', 'Administrator') : t('Lietotājs', 'User')}`;
      case 'status':
        return `${t('Statuss', 'Status')}: ${value === 'active' ? t('Aktīvs', 'Active') : t('Neaktīvs', 'Inactive')}`;
      case 'joinDate':
        return `${t('Pievienošanās datums', 'Join Date')}: ${value}`;
      case 'lastLogin':
        return `${t('Pēdējā pieslēgšanās', 'Last Login')}: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2 items-center mt-4">
      <span className="text-sm text-muted-foreground mr-1">
        {t('Aktīvie filtri:', 'Active filters:')}
      </span>
      
      {Object.entries(activeFilters).map(([key, value]) => {
        if (!value) return null;
        return (
          <Badge key={key} variant="outline" className="flex items-center gap-1">
            {getFilterLabel(key as keyof UserFilters, value)}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveFilter(key as keyof UserFilters)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">{t('Noņemt filtru', 'Remove filter')}</span>
            </Button>
          </Badge>
        );
      })}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-sm font-normal h-7 px-2"
        onClick={onClearFilters}
      >
        {t('Notīrīt visus', 'Clear all')}
      </Button>
    </div>
  );
}
