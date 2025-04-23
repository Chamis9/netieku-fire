
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Logo() {
  const isMobile = useIsMobile();
  
  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link 
      to="/" 
      onClick={handleLogoClick}
      className={`text-2xl font-bold text-white dark:text-white hover:opacity-90 transition-opacity relative z-10 ${isMobile ? 'pl-0' : ''}`}
    >
      <span className="text-orange-500">netieku</span>.es
    </Link>
  );
}
