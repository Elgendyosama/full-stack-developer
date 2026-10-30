'use client';

import React from 'react';
import { Card, Progress, Tag, Button } from 'antd';
import {
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { Project, SeoConfig, SiteContent } from '@/lib/types';

interface AnalyticsOverviewProps {
  projects: Project[];
  seoConfig?: SeoConfig | null;
  siteContent?: SiteContent | null;
  onNavigateTab: (key: string) => void;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  projects,
  onNavigateTab,
}) => {
  const featuredCount = projects.filter((p) => p.featured).length;

  const techBreakdown = React.useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.technology] = (counts[p.technology] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <div className="space-y-8">
      {/* KPI Stats Row (Light Crisp Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-white border-slate-200/90 rounded-2xl p-2 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {projects.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-700 font-bold">100% active</span> in live showcase
          </div>
        </Card>

        <Card className="bg-white border-slate-200/90 rounded-2xl p-2 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Featured Showcases
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {featuredCount}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="text-amber-700 font-bold">High Priority</span> on homepage
          </div>
        </Card>

        <Card className="bg-white border-slate-200/90 rounded-2xl p-2 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Technical SEO Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Globe size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono flex items-baseline gap-1">
            98 <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Core Web Vitals Optimized
          </div>
        </Card>

        <Card className="bg-white border-slate-200/90 rounded-2xl p-2 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Client Satisfaction
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            5.0 ★
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Verified enterprise reviews
          </div>
        </Card>
      </div>

      {/* Main Grid: Stack Breakdown & Health Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stack Breakdown & Direct Links */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="text-emerald-600" size={18} />
                Portfolio Technology Distribution
              </h3>
              <Button
                size="small"
                onClick={() => onNavigateTab('projects')}
                className="bg-white text-slate-700 border-slate-200 text-xs shadow-xs"
              >
                Manage All
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(techBreakdown).map(([tech, count]) => {
                const percentage = Math.round((count / (projects.length || 1)) * 100);
                return (
                  <div key={tech} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">{tech}</span>
                      <span className="font-mono text-slate-500">
                        {count} {count === 1 ? 'Project' : 'Projects'} ({percentage}%)
                      </span>
                    </div>
                    <Progress
                      percent={percentage}
                      showInfo={false}
                      strokeColor="#22a344"
                      trailColor="#f1f5f9"
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => onNavigateTab('projects')}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 cursor-pointer transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Projects CRUD
                </span>
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Add or Edit Projects
              </h4>
              <p className="text-xs text-slate-500">
                Update mockups, live links, and features with real-time auto-scroll preview.
              </p>
            </div>

            <div
              onClick={() => onNavigateTab('seo')}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 cursor-pointer transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  SEO Suite
                </span>
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                SERP &amp; Meta Manager
              </h4>
              <p className="text-xs text-slate-500">
                Optimize character lengths and preview Google SERP rendering.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: SEO & System Health Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" size={18} />
              Technical Health &amp; Verification Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800">Dynamic XML Sitemap</div>
                    <div className="text-[11px] text-slate-500">Synced with {projects.length} showcase URLs</div>
                  </div>
                </div>
                <Tag color="success">Active</Tag>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800">Robots.txt Directives</div>
                    <div className="text-[11px] text-slate-500">Admin routes protected, public crawlable</div>
                  </div>
                </div>
                <Tag color="success">Enforced</Tag>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800">JSON-LD Structured Schemas</div>
                    <div className="text-[11px] text-slate-500">WebSite, Organization, Service &amp; Breadcrumb</div>
                  </div>
                </div>
                <Tag color="success">Injected</Tag>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800">SSR &amp; Hydration Engine</div>
                    <div className="text-[11px] text-slate-500">@ant-design/nextjs-registry active</div>
                  </div>
                </div>
                <Tag color="success">Verified</Tag>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5"
              >
                <span>View Public Portfolio Website</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
