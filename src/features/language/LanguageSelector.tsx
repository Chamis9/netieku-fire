
import { memo } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { languages } from "./languages";
import { useIsMobile } from "@/hooks/use-mobile";
import { FlagIcon } from "./FlagIcon";
import { LanguageDropdownItem } from "./LanguageDropdownItem";

export const LanguageSelector = memo(function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`language-selector ${isMobile ? 'pr-0' : ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-full bg-white/10 backdrop-blur-sm text-white dark:text-foreground dark:bg-secondary/20 border-white/20 hover:bg-white/20 dark:hover:bg-secondary/30"
          >
            <FlagIcon countryCode={currentLanguage.flag} />
            <span>{currentLanguage.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-white/90 dark:bg-background/90 backdrop-blur-sm border-white/20 dark:border-border"
        >
          {languages.map((language) => (
            <LanguageDropdownItem
              key={language.code}
              language={language}
              onClick={() => setLanguage(language)}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
