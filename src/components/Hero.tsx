'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Star,
} from 'lucide-react';
import { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const portraitUrl = content.portraitImage || '/osama-portrait.jpg';

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-[#f8fafc]">
      {/* Light Mesh Radial Gradients */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-emerald-100/60 via-teal-50/40 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-100/40 blur-[130px] rounded-full pointer-events-none" />

      {/* Decorative Grid Pattern for Light Theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01f_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{content.eyebrow}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              {content.titlePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
                {content.titleHighlight}
              </span>{' '}
              {content.titleSuffix}
            </h1>

            {/* Value Prop Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {content.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href={content.primaryCtaLink} className="w-full sm:w-auto">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRight size={18} />}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-8 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  {content.primaryCtaText}
                </Button>
              </Link>

              <Link href={content.secondaryCtaLink} className="w-full sm:w-auto">
                <Button
                  size="large"
                  icon={<Sparkles size={16} className="text-emerald-600" />}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-slate-200 h-12 px-7 rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  {content.secondaryCtaText}
                </Button>
              </Link>
            </div>

            {/* Live Metrics & Counters Grid (Crisp Light Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
              {content.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all text-center lg:text-left"
                >
                  <div className="text-2xl font-black text-slate-900 flex items-baseline justify-center lg:justify-start gap-1 font-mono">
                    <span className="text-emerald-600">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-xs font-sans font-bold text-slate-500">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5 truncate">
                    {stat.label}
                  </div>
                  {stat.subtext && (
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {stat.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Core Capabilities Ribbon */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-semibold text-slate-500">
              <span className="text-slate-400 uppercase tracking-widest text-[10px] font-mono">
                Tech Stack:
              </span>
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Next.js 14 App Router
              </span>
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Ant Design v5 Systems
              </span>
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Tailwind &amp; Framer Motion
              </span>
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Core Web Vitals 98+
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Portrait Photo & Floating Badges (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] group">
              {/* Glowing Background Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent rounded-[32px] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Portrait Frame Container (Light Crisp Glass) */}
              <div className="relative rounded-[28px] p-2.5 sm:p-3 bg-white border border-slate-200/90 shadow-xl overflow-hidden">
                {/* Photo Element */}
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] w-full rounded-[22px] overflow-hidden bg-slate-100 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portraitUrl}
                    alt="Osama Elgendy - Full Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient shadow overlay at the bottom for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>OSAMA ELGENDY</span>
                        <CheckCircle2 size={14} className="text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-emerald-700 font-mono font-bold">
                        Principal Full-Stack Engineer
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                      <span>5.0 ★</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 (Top-Right): Experience Pill */}
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Code2 size={13} />
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase font-bold">Experience</div>
                    <div className="text-xs font-black text-slate-900 font-mono">10+ Years</div>
                  </div>
                </div>

                {/* Floating Badge 2 (Top-Left): Active Status Indicator */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold text-slate-800">
                    Available for Work
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
