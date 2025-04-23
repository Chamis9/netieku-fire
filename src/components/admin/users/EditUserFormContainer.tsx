
import React from "react";
import { EditUserForm } from "./EditUserForm";
import { useEditUserForm } from "@/hooks/user/useEditUserForm";
import { User } from "@/types/users";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/utils/user/userOperations";
import { formatPhoneNumber } from "@/utils/phoneUtils";

interface EditUserFormContainerProps {
  user: User;
  onUserUpdated: (user: User) => void;
  onClose: () => void;
}

export function EditUserFormContainer({ 
  user, 
  onUserUpdated, 
  onClose 
}: EditUserFormContainerProps) {
  const { toast } = useToast();
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    checkPhoneExists,
    t
  } = useEditUserForm(user);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setErrors({});
    
    const isValid = await validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    try {
      let formattedPhone = null;
      if (formData.phoneNumber.trim()) {
        formattedPhone = formatPhoneNumber(formData.phoneNumber);
        
        if (formattedPhone !== user.phone) {
          const phoneExists = await checkPhoneExists(formattedPhone, user.id);
          if (phoneExists) {
            setErrors({phone: t('Šis telefons jau ir reģistrēts', 'This phone is already registered')});
            setIsSubmitting(false);
            return;
          }
        }
      }
      
      const updatedUser = {
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formattedPhone,
        updated_at: new Date().toISOString()
      };
      
      const { success, error } = await updateUser(updatedUser);
      
      if (success) {
        onUserUpdated(updatedUser);
        toast({
          description: t('Lietotājs veiksmīgi atjaunināts', 'User successfully updated')
        });
        onClose();
      } else {
        console.error("Error updating user:", error);
        toast({
          variant: "destructive",
          title: t('Kļūda', 'Error'),
          description: error || t('Neizdevās atjaunināt lietotāju', 'Failed to update user')
        });
      }
    } catch (err) {
      console.error("Unexpected error updating user:", err);
      toast({
        variant: "destructive",
        title: t('Kļūda', 'Error'),
        description: t('Neizdevās atjaunināt lietotāju', 'Failed to update user')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditUserForm 
      user={user}
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onClose={onClose}
      onInputChange={handleInputChange}
      t={t}
    />
  );
}
