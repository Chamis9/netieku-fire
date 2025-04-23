
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/features/language";

const NotFound = () => {
  const location = useLocation();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const translations = {
    lv: {
      title: "404",
      message: "Diemžēl šāda lapa nav atrasta",
      returnHome: "Atgriezties uz sākumlapu"
    },
    en: {
      title: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home"
    },
    ru: {
      title: "404",
      message: "Упс! Страница не найдена",
      returnHome: "Вернуться на главную"
    }
  };

  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold mb-4"><span className="text-orange-500">{t.title}</span></h1>
        <p className="text-xl text-gray-300 mb-8">{t.message}</p>
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors mx-auto w-fit"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowLeft size={18} />
          {t.returnHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
