
import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  disableToggle?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isToggleDisabled: boolean;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isToggleDisabled: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  disableToggle = false,
  ...props
}: ThemeProviderProps) {
  // If toggle is disabled, always use the defaultTheme
  const initialTheme = disableToggle 
    ? defaultTheme 
    : (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = useCallback((theme: Theme) => {
    // Only allow theme changes if toggle is not disabled
    if (!disableToggle) {
      localStorage.setItem(storageKey, theme);
      setThemeState(theme);
    }
  }, [storageKey, disableToggle]);

  // Force theme to defaultTheme if disableToggle becomes true
  useEffect(() => {
    if (disableToggle) {
      setThemeState(defaultTheme);
    }
  }, [disableToggle, defaultTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      isToggleDisabled: disableToggle,
    }),
    [theme, setTheme, disableToggle]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
