
import React from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CountryCodeDisplay } from "./CountryCodeDisplay";
import { CountryCode } from "@/utils/phoneUtils";

interface CountrySelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCode: string;
  selectedCountry: CountryCode | undefined;
  searchValue: string;
  setSearchValue: (value: string) => void;
  filteredCountries: CountryCode[];
  handleManualCodeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountrySelect: (code: string) => void;
  getTranslation: (lvText: string, enText: string) => string;
}

export const CountrySelector = ({
  open,
  setOpen,
  selectedCode,
  selectedCountry,
  searchValue,
  setSearchValue,
  filteredCountries,
  handleManualCodeInput,
  handleCountrySelect,
  getTranslation
}: CountrySelectorProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between"
        >
          {selectedCountry ? (
            <CountryCodeDisplay 
              countryCode={selectedCountry.code} 
              countryAbbr={selectedCountry.country} 
            />
          ) : (
            <span>{selectedCode}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput 
            placeholder={getTranslation("Meklēt valsti vai kodu...", "Search country or code...")}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              {getTranslation("Nekas nav atrasts", "No results found")}
              <Input
                type="text"
                placeholder={getTranslation("Ievadīt kodu manuāli", "Enter code manually")}
                value={selectedCode}
                onChange={handleManualCodeInput}
                className="mt-2"
              />
            </CommandEmpty>
            <ScrollArea className="h-[300px]">
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleCountrySelect(country.code)}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mr-2">
                        {country.country.toUpperCase()}
                      </span>
                      <span>{country.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500">{country.code}</span>
                      {country.code === selectedCode && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelector;
