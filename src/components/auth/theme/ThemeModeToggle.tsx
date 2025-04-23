
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "@/features/language";

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const { currentLanguage } = useLanguage();
  
  const translations = {
    lv: {
      darkMode: "Tumšais režīms",
      lightMode: "Gaišais režīms"
    },
    en: {
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    },
    ru: {
      darkMode: "Темный режим",
      lightMode: "Светлый режим"
    }
  };

  const texts = translations[currentLanguage.code as keyof typeof translations] || translations.en;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? (
        <>
          <Sun size={16} className="mr-1" />
          {texts.lightMode}
        </>
      ) : (
        <>
          <Moon size={16} className="mr-1" />
          {texts.darkMode}
        </>
      )}
    </Button>
  );
}
