
import { useState, useEffect } from "react";
import { validatePhoneNumber, countryCodes } from "@/utils/phoneUtils";

interface UsePhoneInputProps {
  initialCountryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  getTranslation: (lvText: string, enText: string) => string;
}

export const usePhoneInput = ({ 
  initialCountryCode, 
  phoneNumber, 
  onCountryCodeChange,
  getTranslation 
}: UsePhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [localError, setLocalError] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState(initialCountryCode);

  // Update internal state when props change
  useEffect(() => {
    setSelectedCode(initialCountryCode);
  }, [initialCountryCode]);

  const selectedCountry = countryCodes.find(c => c.code === selectedCode);

  const filteredCountries = countryCodes.filter(country => 
    country.code.toLowerCase().includes(searchValue.toLowerCase()) ||
    country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    country.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (!phoneNumber.trim()) {
      setLocalError("");
      return;
    }
    
    const digits = phoneNumber.replace(/\s/g, '');
    
    if (!validatePhoneNumber(digits)) {
      const country = countryCodes.find(c => c.code === selectedCode);
      const expectedLength = country?.digits.join(getTranslation(' vai ', ' or '));
      setLocalError(getTranslation(
        `Telefona numuram jāsatur ${expectedLength} cipari`,
        `Phone number must contain ${expectedLength} digits`
      ));
    } else {
      setLocalError("");
    }
  }, [phoneNumber, selectedCode, getTranslation]);

  const handleManualCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+')) {
      value = '+' + value;
    }
    value = value.replace(/[^\d+]/g, '');
    
    setSelectedCode(value);
    onCountryCodeChange(value);
  };

  const handleCountrySelect = (code: string) => {
    setSelectedCode(code);
    onCountryCodeChange(code);
    setOpen(false);
    setSearchValue("");
  };

  return {
    open,
    setOpen,
    searchValue,
    setSearchValue,
    localError,
    selectedCode,
    selectedCountry,
    filteredCountries,
    handleManualCodeInput,
    handleCountrySelect
  };
};
