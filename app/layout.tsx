import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: "Atilla's Website",
  description: "Personal website of AtillaColak - took 25 minutes",
  keywords: ["AtillaColak", "Atilla Colak", "personal website", "book summaries", "Atilla Colak personal website", "portfolio", "software engineer"],
  authors: [{name: "Atilla Colak"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "AtillaColak",
    "url": "https://atillas.co",
    "sameAs": [
      "https://www.linkedin.com/in/atilla-colak/"
    ],
    "jobTitle": "Software Engineer",
    "description": "Personal website of AtillaColak - Maximus",
  };

  return (
    <html lang="en">
      <head>
        <meta name="title" content="AtillaColak - Personal Website" />
        <meta name="description" content="The personal website of AtillaColak - a creative portfolio" />
        <meta name="keywords" content="AtillaColak, personal website, portfolio, web developer, creative portfolio" />
        <meta name="author" content="AtillaColak" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags for social media previews */}
        <meta property="og:title" content="AtillaColak - Personal Website" />
        <meta property="og:description" content="Explore AtillaColak's personal projects and creative works" />
        <meta property="og:url" content="https://atillas.co" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AtillaColak - Personal Website" />
        <meta name="twitter:description" content="My personal websites and book notes" />
        
        {/* Structured Data for SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}