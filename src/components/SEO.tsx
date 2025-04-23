
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEO({
  title = "netieku.es - biļešu apmaiņas platforma",
  description = "Pirmā Latvijas biļešu apmaiņas platforma - droši pērc un pārdod biļetes uz koncertiem, teātri, sporta pasākumiem un citiem notikumiem.",
  canonicalUrl = "https://netieku.es",
  ogImage = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14"
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
