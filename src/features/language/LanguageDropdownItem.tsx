
import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FlagIcon } from "./FlagIcon";
import { Language } from "./types";

interface LanguageDropdownItemProps {
  language: Language;
  onClick: () => void;
}

export const LanguageDropdownItem: React.FC<LanguageDropdownItemProps> = ({ language, onClick }) => (
  <DropdownMenuItem
    key={language.code}
    onClick={onClick}
    className="cursor-pointer hover:bg-orange-100 dark:hover:bg-secondary/20 dark:text-foreground"
  >
    <FlagIcon countryCode={language.flag} />
    {language.name}
  </DropdownMenuItem>
);
