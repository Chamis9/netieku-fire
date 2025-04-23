
import React, { memo, useCallback } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/features/language";
import type { User } from "@/types/users";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionsMenu } from "./UserActionsMenu";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

export const UserTableRow = memo(function UserTableRow({ 
  user, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: UserTableRowProps) {
  const { currentLanguage } = useLanguage();
  
  const t = useCallback((lvText: string, enText: string) => 
    currentLanguage.code === 'lv' ? lvText : enText, 
  [currentLanguage.code]);
  
  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(
        currentLanguage.code === 'lv' ? "lv-LV" : "en-US"
      );
    } catch (e) {
      return t('Nezināms datums', 'Unknown date');
    }
  }, [currentLanguage.code, t]);
  
  const handleEdit = useCallback(() => onEdit(user), [user, onEdit]);
  const handleDelete = useCallback(() => onDelete(user), [user, onDelete]);
  const handleToggleStatus = useCallback(() => {
    // Use the current user object from props to ensure latest state
    onToggleStatus(user);
  }, [user, onToggleStatus]);
  
  return (
    <TableRow>
      <TableCell>{user.first_name || t('Nav norādīts', 'Not specified')}</TableCell>
      <TableCell>{user.last_name || t('Nav norādīts', 'Not specified')}</TableCell>
      <TableCell>{user.phone || t('Nav norādīts', 'Not specified')}</TableCell>
      <TableCell className="font-medium">{user.email || t('Nav e-pasta', 'No email')}</TableCell>
      <TableCell>
        <UserStatusBadge status={user.status || 'active'} />
      </TableCell>
      <TableCell>{user.created_at ? formatDate(user.created_at) : t('Nav datuma', 'No date')}</TableCell>
      <TableCell>
        {user.last_sign_in_at 
          ? formatDate(user.last_sign_in_at) 
          : t('Nav pieslēdzies', 'Never logged in')}
      </TableCell>
      <TableCell className="text-right">
        <UserActionsMenu
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </TableCell>
    </TableRow>
  );
}, (prevProps, nextProps) => {
  // Enhanced memo logic to better detect status changes
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.status === nextProps.user.status &&
    prevProps.user.updated_at === nextProps.user.updated_at &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.user.first_name === nextProps.user.first_name &&
    prevProps.user.last_name === nextProps.user.last_name &&
    prevProps.user.phone === nextProps.user.phone
  );
});
