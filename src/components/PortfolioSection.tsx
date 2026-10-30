'use client';

import React, { useState, useMemo } from 'react';
import { Input, Button, Empty, Switch } from 'antd';
import {
  Search,
  Sparkles,
  ExternalLink,
  Eye,
  SlidersHorizontal,
  Layers,
  Code2,
} from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectMockup } from './ProjectMockup';
import { ProjectModal } from './ProjectModal';

interface PortfolioSectionProps {
  initialProjects: Project[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  initialProjects,
}) => {
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const techOptions = [
    'All',
    'React / Next.js',
    'Laravel / PHP',
    'WordPress / WooCommerce',
    'Custom HTML/CSS',
  ];

  const industryOptions = [
    'All',
    'E-Commerce',
    'Corporate Portals',
    'Landing Pages',
    'SaaS / Web Apps',
  ];

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Tech filter
      if (selectedTech !== 'All') {
        const matchesTech =
          project.technology === selectedTech ||
          project.technologies.some((t) =>
            t.toLowerCase().includes(selectedTech.toLowerCase())
          );
        if (!matchesTech) return false;
      }

      // Industry filter
      if (selectedIndustry !== 'All' && project.projectType !== selectedIndustry) {
        return false;
      }

      // Featured only
      if (featuredOnly && !project.featured) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesClient = project.clientName.toLowerCase().includes(query);
        const matchesSummary = project.summary.toLowerCase().includes(query);
        const matchesTags = project.technologies.some((t) =>
          t.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesClient && !matchesSummary && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedTech, selectedIndustry, featuredOnly, searchQuery]);

  const handleResetFilters = () => {
    setSelectedTech('All');
    setSelectedIndustry('All');
    setSearchQuery('');
    setFeaturedOnly(false);
  };

  return (
    <section id="portfolio-showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Code2 size={14} className="text-emerald-600" />
          Interactive Portfolio Showcase
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Handcrafted Engineering &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Conversion Systems
          </span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Hover over any device frame to test smooth full-page auto-scroll animations. Click live preview for an interactive responsive viewport emulator.
        </p>
      </div>

      {/* Control Panel: Search & Multi-Dimensional Filters (Light Crisp Card) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-12 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          {/* Ant Design Search Input */}
          <div className="w-full lg:max-w-md">
            <Input
              size="large"
              placeholder="Search by title, client, or tag (e.g. Next.js, Stripe)..."
              prefix={<Search size={18} className="text-slate-400 mr-2" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
              className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl"
            />
          </div>

          {/* Quick Controls: Featured Toggle & Result Counter */}
          <div className="flex items-center justify-between lg:justify-end gap-5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={15} className="text-amber-500" />
                Featured Only
              </span>
              <Switch
                checked={featuredOnly}
                onChange={setFeaturedOnly}
                className={featuredOnly ? 'bg-emerald-600' : 'bg-slate-300'}
              />
            </div>

            <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'} Found
            </div>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="pt-5 space-y-4">
          {/* Row 1: Technology Stack Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[90px] flex items-center gap-1.5">
              <Layers size={13} className="text-emerald-600" />
              Technology:
            </span>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => {
                const isActive = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setSelectedTech(tech)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200/90'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Industry / Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[90px] flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-emerald-600" />
              Industry:
            </span>
            <div className="flex flex-wrap gap-2">
              {industryOptions.map((ind) => {
                const isActive = selectedIndustry === ind;
                return (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200/90'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Showcase Grid (Clean Light Cards with Auto-Scroll Mockups) */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <Empty
            description={
              <div className="space-y-2">
                <p className="text-slate-800 text-base font-bold">
                  No projects match your current filter parameters.
                </p>
                <p className="text-slate-500 text-xs">
                  Try adjusting the technology stack, industry type, or search terms.
                </p>
              </div>
            }
          >
            <Button
              type="primary"
              onClick={handleResetFilters}
              className="bg-emerald-600 hover:bg-emerald-700 mt-2 font-semibold"
            >
              Reset All Filters
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-slate-200/90 hover:border-emerald-400 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl shadow-xs flex flex-col justify-between"
            >
              {/* Card Top: Mockup Presentation Frame */}
              <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100">
                {/* Meta Badges Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {project.projectType}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      <Sparkles size={11} className="text-amber-500" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Mockup with Smooth 4.5s Hover Auto-Scroll & Automated Microlink Screenshot */}
                <ProjectMockup
                  screenshotUrl={project.fullScreenshotUrl}
                  liveUrl={project.liveUrl}
                  title={project.title}
                  height={220}
                  onLivePreview={() => setActiveModalProject(project)}
                  interactiveButtons={true}
                />
              </div>

              {/* Card Body: Project Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-mono">
                    <span className="truncate font-semibold text-slate-700">{project.clientName}</span>
                    <span>{project.completionDate.slice(0, 7)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Pills */}
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<Eye size={14} />}
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    Live Preview
                  </Button>
                  <Button
                    icon={<ExternalLink size={14} />}
                    onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                    className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 text-xs font-semibold h-9 px-3 flex items-center justify-center shadow-xs"
                    title="Open Live Website"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Responsive Iframe / Live Preview Ant Design Modal */}
      <ProjectModal
        project={activeModalProject}
        open={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
