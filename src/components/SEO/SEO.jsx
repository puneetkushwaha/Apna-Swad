import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, article, productSchema }) => {
  const defaultTitle = 'Apna Swad - Authentic Indian Snacks & Delicacies';
  const defaultDescription = 'Experience the real shuddh swad of Bihar and beyond. Premium, homemade, and preservative-free snacks delivered to your doorstep.';
  const defaultImage = '/logo.png';
  const defaultUrl = 'https://apna-swad-self.vercel.app/';
  
  const seo = {
    title: title ? `${title} | Apna Swad` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${defaultUrl}${url || ''}`,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      {/* Structured Data */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
