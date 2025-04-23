import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PolicyContent } from "@/components/privacy/PolicyContent";
import { usePrivacyPolicy } from "@/hooks/use-privacy-policy";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { GlobalThemeToggle } from "@/components/theme/GlobalThemeToggle";

const PrivacyPolicy = () => {
  const content = usePrivacyPolicy();

  return (
    <>
      <SEO 
        title={`${content.title} | netieku.es`}
        description={content.intro}
      />
      <ThemeProvider>
        <div className="min-h-screen flex flex-col dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-gray-800 bg-white text-gray-900 dark:text-white">
          <Header />
          
          <main className="flex-grow pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6">
              <PolicyContent content={content} />
            </div>
          </main>
          
          <Footer />
          <GlobalThemeToggle />
        </div>
      </ThemeProvider>
    </>
  );
};

export default PrivacyPolicy;
