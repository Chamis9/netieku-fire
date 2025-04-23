
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/features/language";
import { cn } from "@/lib/utils";
import CountrySelector from "./components/CountrySelector";
import { usePhoneInput } from "./hooks/usePhoneInput";

interface PhoneInputWithCountryProps {
  label: string;
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function PhoneInputWithCountry({
  label,
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  error,
  required = false,
  placeholder
}: PhoneInputWithCountryProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  const {
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
  } = usePhoneInput({
    initialCountryCode: countryCode,
    phoneNumber,
    onCountryCodeChange,
    getTranslation: t
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s]/g, '');
    onPhoneNumberChange(value);
  };

  return (
    <div className="space-y-2">
      <Label>{label}{required && " *"}</Label>
      
      <div className="flex space-x-2">
        <CountrySelector
          open={open}
          setOpen={setOpen}
          selectedCode={selectedCode}
          selectedCountry={selectedCountry}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filteredCountries={filteredCountries}
          handleManualCodeInput={handleManualCodeInput}
          handleCountrySelect={handleCountrySelect}
          getTranslation={t}
        />
        
        <Input
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder || selectedCountry?.format || ""}
          className={cn(
            "flex-1",
            (error || localError) ? "border-red-500" : ""
          )}
        />
      </div>
      
      {(error || localError) && (
        <p className="text-red-500 text-sm">{error || localError}</p>
      )}
    </div>
  );
}

export default PhoneInputWithCountry;
