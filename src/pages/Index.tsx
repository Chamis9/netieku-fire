
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { SEO } from "@/components/SEO";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" disableToggle={true}>
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <SEO />
        <Header />
        <main className="flex-grow">
          <Hero />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
