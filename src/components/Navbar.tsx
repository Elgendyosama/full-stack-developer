'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import {
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  agencyName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ agencyName = 'OSAMA ELGENDY' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Showcase', href: '#portfolio-showcase' },
    { label: 'Tech Arsenal', href: '#tech-arsenal' },
    { label: 'Capabilities', href: '#services-section' },
    { label: 'Reviews', href: '#testimonials-section' },
    { label: 'Estimate', href: '#estimate-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-xs p-1 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Osama Elgendy Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>OSAMA ELGENDY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
              Full Stack Engineer &amp; Agency
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin">
            <Button
              icon={<ShieldCheck size={14} className="text-emerald-600" />}
              className="bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 text-xs font-semibold h-9 px-3 flex items-center gap-1.5 shadow-xs"
            >
              Admin Portal
            </Button>
          </Link>

          <Link href="#estimate-section">
            <Button
              type="primary"
              icon={<Sparkles size={14} />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 flex items-center gap-1.5 shadow-sm"
            >
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/admin">
            <button
              aria-label="Admin Portal"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs"
            >
              <ShieldCheck size={18} className="text-emerald-600" />
            </button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-emerald-600 py-2 border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link href="#estimate-section" onClick={() => setMobileMenuOpen(false)}>
              <Button
                type="primary"
                block
                size="large"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 shadow-sm"
              >
                Request Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
