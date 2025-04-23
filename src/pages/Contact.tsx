
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/features/language";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactTranslations } from "@/features/language/translations";
import { GlobalThemeToggle } from "@/components/theme/GlobalThemeToggle";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const Contact = () => {
  const { currentLanguage } = useLanguage();
  const t = contactTranslations[currentLanguage.code] || contactTranslations.en;

  return (
    <>
      <SEO 
        title={`${t.title} | netieku.es`}
        description="Sazinieties ar netieku.es komandu ar jautājumiem par biļešu apmaiņu vai citiem jautājumiem."
      />
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
          <Header />
          
          <main className="flex-grow pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-orange-500">{t.title}</span>
                </h1>
                <p className="text-xl mb-12 text-gray-600 dark:text-gray-300">{t.subtitle}</p>

                <div className="grid md:grid-cols-2 gap-12">
                  <ContactInfo translations={t} />
                  <ContactForm translations={t} />
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
          <GlobalThemeToggle />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Contact;
