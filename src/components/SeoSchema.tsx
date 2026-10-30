import React from 'react';
import { SiteContent, SeoConfig, Project } from '@/lib/types';

interface SeoSchemaProps {
  siteContent: SiteContent;
  seoConfig: SeoConfig;
  projects?: Project[];
}

export const SeoSchema: React.FC<SeoSchemaProps> = ({
  siteContent,
  seoConfig,
  projects = [],
}) => {
  const baseUrl = seoConfig.canonicalBaseUrl.replace(/\/$/, '');

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteTitle,
    url: baseUrl,
    description: seoConfig.metaDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteContent.agencyName,
    alternateName: 'Osama Elgendy Full Stack Developer',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: siteContent.tagline,
    founder: {
      '@type': 'Person',
      name: 'Osama Elgendy',
      jobTitle: 'Principal Full-Stack Engineer & Agency Director',
      sameAs: [
        siteContent.contact.socials.github,
        siteContent.contact.socials.linkedin,
        siteContent.contact.socials.twitter,
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteContent.contact.phone,
      contactType: 'customer service',
      email: siteContent.contact.email,
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      siteContent.contact.socials.github,
      siteContent.contact.socials.linkedin,
      siteContent.contact.socials.twitter,
      siteContent.contact.socials.behance,
    ],
  };

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: siteContent.services.map((service, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: siteContent.agencyName,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          name: service.startingPrice,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio Showcase',
        item: `${baseUrl}/#portfolio-showcase`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Agency Capabilities',
        item: `${baseUrl}/#services-section`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Project Estimate',
        item: `${baseUrl}/#estimate-section`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

