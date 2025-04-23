
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/features/language";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePhoneNumber, formatPhoneNumber, checkEmailExists, checkPhoneExists } from "@/utils/phoneUtils";
import type { User } from "@/types/users";
import { createUser } from "@/utils/user/userOperations";
import { AddUserForm } from "./AddUserForm";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
}

export function AddUserDialog({ open, onClose, onUserAdded }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (open) {
      setErrors({});
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
      });
    }
  }, [open]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: typeof errors = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = t('Ievadiet derīgu e-pasta adresi', 'Enter a valid email address');
    }
    
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phone = t('Ievadiet derīgu 8 ciparu telefona numuru', 'Enter a valid 8-digit phone number');
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrors({
          ...errors,
          email: t('Šis e-pasts jau ir reģistrēts', 'This email is already registered')
        });
        setIsSubmitting(false);
        return;
      }
      
      // Format and check phone if provided
      let formattedPhone = null;
      if (formData.phoneNumber.trim()) {
        formattedPhone = formatPhoneNumber(formData.phoneNumber);
        
        // Check if phone already exists
        const phoneExists = await checkPhoneExists(formattedPhone);
        if (phoneExists) {
          setErrors({
            ...errors,
            phone: t('Šis telefona numurs jau ir reģistrēts', 'This phone number is already registered')
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      const { success, data, error } = await createUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formattedPhone,
        status: 'active'
      });
      
      if (success && data) {
        onUserAdded(data);
        toast({
          description: t('Lietotājs veiksmīgi pievienots', 'User successfully added')
        });
        onClose();
      } else {
        console.error("Error creating user:", error);
        toast({
          variant: "destructive",
          title: t('Kļūda', 'Error'),
          description: error || t('Neizdevās pievienot lietotāju', 'Failed to add user')
        });
      }
    } catch (err) {
      console.error("Unexpected error creating user:", err);
      toast({
        variant: "destructive",
        title: t('Kļūda', 'Error'),
        description: t('Neizdevās pievienot lietotāju', 'Failed to add user')
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Pievienot jaunu lietotāju', 'Add New User')}</DialogTitle>
        </DialogHeader>
        
        <AddUserForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onClose={onClose}
          onInputChange={handleInputChange}
          t={t}
        />
      </DialogContent>
    </Dialog>
  );
}
