
import { useState, useEffect } from "react";
import { validatePhoneNumber } from "@/utils/phoneUtils";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/features/language";
import type { User } from "@/types/users";

interface EditUserFormState {
  first_name: string | null;
  last_name: string | null;
  phoneNumber: string;
}

interface EditUserFormErrors {
  phone?: string;
}

export const useEditUserForm = (user: User | null) => {
  const [formData, setFormData] = useState<EditUserFormState>({
    first_name: user?.first_name || null,
    last_name: user?.last_name || null,
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<EditUserFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  // Set initial phone number when user data is available
  useEffect(() => {
    if (user?.phone) {
      const phoneWithoutCode = user.phone.startsWith("+371") 
        ? user.phone.substring(5) 
        : user.phone;
      
      setFormData(prev => ({
        ...prev,
        phoneNumber: phoneWithoutCode
      }));
    }
  }, [user]);
  
  const checkPhoneExists = async (fullPhone: string, userId: string): Promise<boolean> => {
    if (!fullPhone) return false;
    
    try {
      const { data, error } = await supabase
        .from('registered_users')
        .select('phone')
        .eq('phone', fullPhone)
        .neq('id', userId)
        .limit(1);
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      console.error("Error checking phone:", err);
      return false;
    }
  };
  
  const validateForm = async () => {
    const newErrors: EditUserFormErrors = {};
    let isValid = true;
    
    // Phone validation if provided
    if (formData.phoneNumber.trim()) {
      if (!validatePhoneNumber(formData.phoneNumber)) {
        newErrors.phone = t('Ievadiet derīgu 8 ciparu telefona numuru', 'Enter a valid 8-digit phone number');
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    checkPhoneExists,
    t
  };
};
