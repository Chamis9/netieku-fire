
import { LanguageSelector } from "@/features/language";
import { Logo } from "./header/Logo";
import { Navigation } from "./header/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./theme/ThemeToggle";

export function Header() {
  const isMobile = useIsMobile();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-6 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {isMobile ? (
          <>
            <Logo />
            <div className="flex-1 flex justify-center">
              <Navigation />
            </div>
            <div className="flex items-center gap-2 text-white">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center space-x-4 text-white">
              <Navigation />
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
