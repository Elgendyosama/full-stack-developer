import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdProvider } from '@/components/AntdProvider';
import { getSeoConfig } from '@/lib/store';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoConfig();
  const baseUrl = seo.canonicalBaseUrl.replace(/\/$/, '');

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seo.siteTitle,
      template: seo.titleTemplate,
    },
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: '/logo.png',
      apple: '/logo.png',
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.metaDescription,
      url: baseUrl,
      siteName: 'Osama Elgendy Agency',
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 800,
          height: 800,
          alt: 'Osama Elgendy Full Stack Agency',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.siteTitle,
      description: seo.metaDescription,
      creator: seo.twitterHandle,
      images: [`${baseUrl}/logo.png`],
    },
    verification: {
      google: seo.gscVerificationId,
      other: {
        'msvalidate.01': seo.bingVerificationId,
      },
    },
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-[#f8fafc] text-slate-900 min-h-screen selection:bg-emerald-500/20 selection:text-emerald-800">
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
