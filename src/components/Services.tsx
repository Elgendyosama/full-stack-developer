'use client';

import React from 'react';
import {
  CodeXml,
  Server,
  ShoppingCart,
  TrendingUp,
  LayoutDashboard,
  Sparkles,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Button } from 'antd';
import Link from 'next/link';
import { ServiceOffering } from '@/lib/types';

interface ServicesProps {
  services: ServiceOffering[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'CodeXml':
        return <CodeXml className="text-emerald-600" size={24} />;
      case 'Server':
        return <Server className="text-emerald-600" size={24} />;
      case 'ShoppingCart':
        return <ShoppingCart className="text-emerald-600" size={24} />;
      case 'TrendingUp':
        return <TrendingUp className="text-emerald-600" size={24} />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="text-emerald-600" size={24} />;
      case 'Sparkles':
      default:
        return <Sparkles className="text-emerald-600" size={24} />;
    }
  };

  return (
    <section id="services-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Sparkles size={14} className="text-emerald-600" />
          Full-Lifecycle Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Precision Engineering for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Ambitious Digital Products
          </span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          From high-speed Next.js frontends to enterprise Laravel APIs and technical SEO systems, we architect software that converts visitors into customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
              srv.popular
                ? 'bg-white border-2 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md'
            }`}
          >
            {srv.popular && (
              <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                Most In-Demand
              </div>
            )}

            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {getIcon(srv.iconName)}
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                  {srv.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                {srv.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {srv.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 mb-6">
                {srv.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-emerald-600 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Badge & CTA */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Investment</div>
                <div className="text-base font-black text-emerald-700 font-mono">{srv.startingPrice}</div>
              </div>

              <Link href="#estimate-section">
                <Button
                  type={srv.popular ? 'primary' : 'default'}
                  icon={<ArrowRight size={14} />}
                  className={
                    srv.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9 px-4 flex items-center gap-1.5 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 text-xs font-semibold h-9 px-4 flex items-center gap-1.5 shadow-xs'
                  }
                >
                  Configure
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
