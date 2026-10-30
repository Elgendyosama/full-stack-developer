import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TechArsenal } from '@/components/TechArsenal';
import { PortfolioSection } from '@/components/PortfolioSection';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { ContactEstimate } from '@/components/ContactEstimate';
import { Footer } from '@/components/Footer';
import { SeoSchema } from '@/components/SeoSchema';
import { getProjects, getSiteContent, getSeoConfig } from '@/lib/store';

export const revalidate = 0; // Dynamic SSR to reflect admin updates immediately

export default function HomePage() {
  const projects = getProjects();
  const siteContent = getSiteContent();
  const seoConfig = getSeoConfig();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-800">
      {/* Dynamic JSON-LD Structured Data */}
      <SeoSchema
        siteContent={siteContent}
        seoConfig={seoConfig}
        projects={projects}
      />

      {/* Sticky Header Navigation */}
      <Navbar agencyName={siteContent.agencyName} />

      {/* Hero Section with Live Counters & Founder Portrait */}
      <Hero content={siteContent.hero} />

      {/* Interactive Tech Stack & Tools Arsenal (matching Reference Screenshot 2) */}
      <TechArsenal />

      {/* Filterable Portfolio Showcase with Realistic Mockups & Smooth 4.5s Scroll */}
      <PortfolioSection initialProjects={projects} />

      {/* Agency Capabilities & Services Grid */}
      <Services services={siteContent.services} />

      {/* Client Testimonials Slider */}
      <Testimonials testimonials={siteContent.testimonials} />

      {/* Interactive Project Estimator & Consultation Form */}
      <ContactEstimate contactInfo={siteContent.contact} />

      {/* Rich Agency Footer with SEO & Legal Links */}
      <Footer contactInfo={siteContent.contact} />
    </main>
  );
}
