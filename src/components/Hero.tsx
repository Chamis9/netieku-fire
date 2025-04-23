
import { memo, useState, useEffect } from "react";
import { SubscribeForm } from "@/components/SubscribeForm";
import { useLanguage } from "@/features/language";
import { FallingTickets } from "@/components/FallingTickets";
import { Helmet } from "react-helmet-async";

export const Hero = memo(function Hero() {
  const { translations } = useLanguage();
  const { hero } = translations;
  const [imageLoaded, setImageLoaded] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "netieku.es - biļešu apmaiņas platforma",
    "description": "Pirmā Latvijas C2C biļešu apmaiņas platforma",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/ComingSoon"
    }
  };

  // Corrected Supabase URL (removed double slash)
  const primaryImage = "url('https://bljjkzgswgeqswuuryvm.supabase.co/storage/v1/object/public/backgrounds/netieku_bilesu_pardosana_fons_1.jpeg')";
  
  // Fallback image in case Supabase storage is not accessible
  const fallbackImage = "url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')";
  
  const [backgroundImage, setBackgroundImage] = useState(fallbackImage);

  // Check if the Supabase image exists and can be loaded
  useEffect(() => {
    const img = new Image();
    img.src = "https://bljjkzgswgeqswuuryvm.supabase.co/storage/v1/object/public/backgrounds/netieku_bilesu_pardosana_fons_1.jpeg";
    
    img.onload = () => {
      setBackgroundImage(primaryImage);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Supabase image failed to load, using fallback");
      setBackgroundImage(fallbackImage);
      setImageLoaded(true);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Vienmēr tumšais pārklājums — Hero fons vienmēr viens attēls */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <FallingTickets />

      {/* Fona attēls ar ielādes pārbaudi */}
      {imageLoaded && (
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: backgroundImage }}
          aria-hidden="true"
        ></div>
      )}

      <div className="container mx-auto px-4 z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {hero.title} <span className="text-gradient">{hero.titleHighlight}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col items-center space-y-6">
            <p className="text-white text-lg">
              {hero.subscribeText}
            </p>
            <div className="w-full max-w-md mx-auto">
              <SubscribeForm />
            </div>
          </div>
          
          <div className="pt-12">
            <a
              href="#how-it-works"
              className="inline-flex items-center text-white hover:text-orange-300 transition-colors"
              aria-label="Learn more about how it works"
            >
              <span className="mr-2">{hero.learnMoreBtn}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
