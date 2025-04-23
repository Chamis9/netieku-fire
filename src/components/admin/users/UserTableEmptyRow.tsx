
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/features/language";

interface UserTableEmptyRowProps {
  colSpan: number;
}

export function UserTableEmptyRow({ colSpan }: UserTableEmptyRowProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-6">
        {t('Nav atrasts neviens lietotājs, kas atbilst meklēšanas kritērijiem.', 
          'No users found matching search criteria.')}
      </TableCell>
    </TableRow>
  );
}
