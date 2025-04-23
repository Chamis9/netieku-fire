
import { useState } from "react";
import { validateEmail, validatePhoneNumber } from "@/utils/phoneUtils";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/features/language";
import { formatPhoneNumber } from "@/utils/phoneUtils";

interface AddUserFormState {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

interface AddUserFormErrors {
  email?: string;
  phone?: string;
}

export const useAddUserForm = () => {
  const [formData, setFormData] = useState<AddUserFormState>({
    name: "",
    email: "",
    countryCode: "+371",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<AddUserFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      countryCode: "+371",
      phoneNumber: "",
    });
    setErrors({});
  };
  
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('registered_users')
        .select('email')
        .eq('email', email)
        .limit(1);
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };
  
  const checkPhoneExists = async (fullPhone: string): Promise<boolean> => {
    if (!fullPhone) return false;
    
    try {
      const { data, error } = await supabase
        .from('registered_users')
        .select('phone')
        .eq('phone', fullPhone)
        .limit(1);
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      console.error("Error checking phone:", err);
      return false;
    }
  };
  
  const validateForm = async () => {
    const newErrors: AddUserFormErrors = {};
    let isValid = true;
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('E-pasta adrese ir obligāta', 'Email address is required');
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('Ievadiet derīgu e-pasta adresi', 'Enter a valid email address');
      isValid = false;
    }
    
    // Phone validation if provided
    if (formData.phoneNumber.trim()) {
      const cleanPhone = formData.phoneNumber.replace(/\s/g, '');
      if (!validatePhoneNumber(cleanPhone)) {
        newErrors.phone = t('Ievadiet derīgu telefona numuru', 'Enter a valid phone number');
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
    resetForm,
    validateForm,
    checkEmailExists,
    checkPhoneExists,
    t
  };
};
