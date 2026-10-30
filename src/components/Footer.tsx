'use client';

import React from 'react';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ContactInfo } from '@/lib/types';

interface FooterProps {
  contactInfo: ContactInfo;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Osama Elgendy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                OSAMA ELGENDY
              </span>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Principal Full-Stack Web Engineering and UI/UX consultancy specializing in high-speed Next.js applications, enterprise Laravel architectures, Ant Design systems, and Technical SEO.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={contactInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </a>
              <a
                href={contactInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={contactInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#portfolio-showcase" className="hover:text-emerald-600 transition-colors">
                  Portfolio Showcase
                </Link>
              </li>
              <li>
                <Link href="#tech-arsenal" className="hover:text-emerald-600 transition-colors">
                  Tech Arsenal
                </Link>
              </li>
              <li>
                <Link href="#services-section" className="hover:text-emerald-600 transition-colors">
                  Agency Capabilities
                </Link>
              </li>
              <li>
                <Link href="#testimonials-section" className="hover:text-emerald-600 transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck size={13} />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical Focus */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Core Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Next.js 14 (App Router)</li>
              <li>Ant Design v5 Systems</li>
              <li>Tailwind CSS &amp; Framer Motion</li>
              <li>Laravel 11 &amp; Inertia.js</li>
              <li>PostgreSQL &amp; Redis Queues</li>
              <li>Headless WooCommerce</li>
            </ul>
          </div>

          {/* Col 5: Technical SEO & Feeds */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Technical SEO
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sitemap.xml" target="_blank" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>XML Sitemap</span>
                  <ExternalLink size={11} />
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" target="_blank" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>Robots.txt Directives</span>
                  <ExternalLink size={11} />
                </Link>
              </li>
              <li className="text-slate-500">JSON-LD Schemas: WebSite</li>
              <li className="text-slate-500">JSON-LD Schemas: Organization</li>
              <li className="text-slate-500">JSON-LD Schemas: Service</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Osama Elgendy. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js App Router, Ant Design v5, Tailwind &amp; TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
