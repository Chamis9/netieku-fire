import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/features/language";
import { UserFilters } from "./hooks/useUserFiltering";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApplyFilter: (filters: UserFilters) => void;
  isAdmin: boolean;
}

export function FilterDialog({ open, onClose, onApplyFilter, isAdmin }: FilterDialogProps) {
  const [filters, setFilters] = useState<UserFilters>({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    joinDate: "",
    lastLogin: ""
  });
  
  const { currentLanguage } = useLanguage();
  
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const handleChange = (field: keyof UserFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      joinDate: "",
      lastLogin: ""
    });
    
    onApplyFilter({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      joinDate: "",
      lastLogin: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('Filtrēt lietotājus', 'Filter Users')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t('Vārds', 'Name')}</Label>
              <Input
                id="name"
                value={filters.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={t('Meklēt pēc vārda', 'Search by name')}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">{t('E-pasts', 'Email')}</Label>
              <Input
                id="email"
                value={filters.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={t('Meklēt pēc e-pasta', 'Search by email')}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">{t('Telefons', 'Phone')}</Label>
              <Input
                id="phone"
                value={filters.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder={t('Meklēt pēc telefona', 'Search by phone')}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">{t('Statuss', 'Status')}</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder={t('Izvēlieties statusu', 'Select status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t('Visi', 'All')}</SelectItem>
                  <SelectItem value="active">{t('Aktīvs', 'Active')}</SelectItem>
                  <SelectItem value="inactive">{t('Neaktīvs', 'Inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!isAdmin && (
            <div className="grid gap-2">
              <Label htmlFor="role">{t('Loma', 'Role')}</Label>
              <Select
                value={filters.role}
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={t('Izvēlieties lomu', 'Select role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t('Visas', 'All')}</SelectItem>
                  <SelectItem value="admin">{t('Administrators', 'Administrator')}</SelectItem>
                  <SelectItem value="user">{t('Lietotājs', 'User')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              {t('Atiestatīt', 'Reset')}
            </Button>
            <Button type="submit">
              {t('Piemērot filtrus', 'Apply Filters')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
