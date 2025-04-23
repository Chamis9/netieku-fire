
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { memo } from "react";

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme, isToggleDisabled } = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  if (isToggleDisabled) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      tabIndex={-1}
      className="rounded-full text-white hover:text-orange-400 hover:bg-transparent transition-colors duration-300"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-orange-400" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-orange-400" />
    </Button>
  );
});
