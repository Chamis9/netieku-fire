
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/features/language";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortField = 'first_name' | 'last_name' | 'phone' | 'email' | 'status' | 'created_at' | 'last_sign_in_at';
export type SortDirection = 'asc' | 'desc' | null;

interface UserTableHeaderProps {
  onSort: (field: SortField) => void;
  sortField: SortField | null;
  sortDirection: SortDirection;
}

export function UserTableHeader({ onSort, sortField, sortDirection }: UserTableHeaderProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };
  
  const SortableHeader = ({ field, label }: { field: SortField, label: string }) => (
    <TableHead>
      <Button 
        variant="ghost" 
        onClick={() => onSort(field)} 
        className="p-0 h-auto font-medium text-muted-foreground hover:text-foreground flex items-center"
      >
        {label}
        {renderSortIcon(field)}
      </Button>
    </TableHead>
  );
  
  return (
    <TableHeader>
      <TableRow>
        <SortableHeader field="first_name" label={t('Vārds', 'First Name')} />
        <SortableHeader field="last_name" label={t('Uzvārds', 'Last Name')} />
        <SortableHeader field="phone" label={t('Telefons', 'Phone')} />
        <SortableHeader field="email" label={t('E-pasts', 'Email')} />
        <SortableHeader field="status" label={t('Statuss', 'Status')} />
        <SortableHeader field="created_at" label={t('Pievienošanās datums', 'Join Date')} />
        <SortableHeader field="last_sign_in_at" label={t('Pēdējā pieslēgšanās', 'Last Login')} />
        <TableHead className="text-right">{t('Darbības', 'Actions')}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
