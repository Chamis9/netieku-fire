
import React, { useState, memo, useCallback } from "react";
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import { User as UserType } from "@/types/users";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { UserTableHeader, SortField, SortDirection } from "./UserTableHeader";
import { UserTableRow } from "./UserTableRow";
import { UserTableEmptyRow } from "./UserTableEmptyRow";

interface UserListTableProps {
  users: UserType[];
  onUserUpdated: (updatedUser: UserType) => void;
  onUserDeleted: (userId: string) => void;
  onToggleStatus: (user: UserType) => void;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

// Memoize the entire table component
export const UserListTable = memo(function UserListTable({ 
  users, 
  onUserUpdated, 
  onUserDeleted, 
  onToggleStatus,
  sortField,
  sortDirection,
  onSort
}: UserListTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Use useCallback to memoize the event handlers
  const handleEditClick = useCallback((user: UserType) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user: UserType) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  }, []);

  const handleStatusToggle = useCallback((user: UserType) => {
    onToggleStatus(user);
  }, [onToggleStatus]);

  const handleCloseEdit = useCallback(() => {
    setIsEditOpen(false);
    setSelectedUser(null);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setIsDeleteOpen(false);
    setSelectedUser(null);
  }, []);

  // Only render users if there are any
  const hasUsers = users && users.length > 0;

  return (
    <>
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <UserTableHeader 
            onSort={onSort} 
            sortField={sortField} 
            sortDirection={sortDirection} 
          />
          <TableBody>
            {hasUsers ? (
              users.map(user => (
                <UserTableRow 
                  key={user.id}
                  user={user}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onToggleStatus={handleStatusToggle}
                />
              ))
            ) : (
              <UserTableEmptyRow colSpan={8} />
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Only render dialogs when they're needed */}
      {isEditOpen && selectedUser && (
        <EditUserDialog 
          user={selectedUser}
          open={isEditOpen}
          onClose={handleCloseEdit}
          onUserUpdated={onUserUpdated}
        />
      )}
      
      {isDeleteOpen && selectedUser && (
        <DeleteUserDialog 
          user={selectedUser}
          open={isDeleteOpen}
          onClose={handleCloseDelete}
          onUserDeleted={onUserDeleted}
        />
      )}
    </>
  );
});
