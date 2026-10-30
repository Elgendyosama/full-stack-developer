'use client';

import React, { useState, useRef } from 'react';
import { Modal, Tag, Button, Tooltip, Divider } from 'antd';
import {
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle2,
  Calendar,
  Building,
  Layers,
  Sparkles,
  ArrowUpRight,
  Globe,
  RotateCcw,
  Image as ImageIcon,
} from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectMockup } from './ProjectMockup';
import { normalizeLiveUrl } from '@/lib/url-helper';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type ModalViewMode = 'iframe' | 'mockup';

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  open,
  onClose,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [viewMode, setViewMode] = useState<ModalViewMode>('iframe');
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!project) return null;

  const effectiveLiveUrl = normalizeLiveUrl(project.liveUrl);

  const getWidthByMode = () => {
    switch (deviceMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '720px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const handleReloadIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      destroyOnClose
      className="agency-project-modal"
      title={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8 pt-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {project.projectType}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {project.technology}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {project.title}
            </h2>
          </div>

          {/* Mode Switcher & Device Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switcher: Iframe vs Mockup */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode('iframe')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'iframe'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe size={13} />
                <span>Live Interactive Web</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mockup')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'mockup'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon size={13} />
                <span>Full-Page Mockup</span>
              </button>
            </div>

            {/* Device Viewport Selector */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1 gap-1">
              <Tooltip title="Desktop View (100%)">
                <button
                  type="button"
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    deviceMode === 'desktop'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Laptop size={14} />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
              </Tooltip>

              <Tooltip title="Tablet View (720px)">
                <button
                  type="button"
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    deviceMode === 'tablet'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Tablet size={14} />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
              </Tooltip>

              <Tooltip title="Mobile View (375px)">
                <button
                  type="button"
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    deviceMode === 'mobile'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone size={14} />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      }
    >
      <div className="mt-4 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Responsive Interactive Viewport Frame */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-start min-h-[500px] overflow-hidden">
          
          {/* Chrome Address Bar */}
          <div className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 mb-3 flex items-center justify-between gap-3 text-xs text-slate-500 shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            <div className="flex-1 max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 flex items-center justify-between text-[11px] font-mono text-slate-700">
              <div className="flex items-center gap-1.5 truncate">
                <Globe size={11} className="text-emerald-600 flex-shrink-0" />
                <span className="truncate">{effectiveLiveUrl}</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">SSL Verified</span>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip title="Reload Preview">
                <button
                  type="button"
                  onClick={handleReloadIframe}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <RotateCcw size={13} />
                </button>
              </Tooltip>
              <Tooltip title="Open Live Site in New Window">
                <button
                  type="button"
                  onClick={() => window.open(effectiveLiveUrl, '_blank', 'noopener,noreferrer')}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <ExternalLink size={13} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Viewport Display Area */}
          <div
            className="w-full transition-all duration-300 flex justify-center h-[460px] relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
            style={{ maxWidth: getWidthByMode() }}
          >
            {viewMode === 'iframe' ? (
              <div className="relative w-full h-full bg-white">
                {iframeLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 text-slate-700 text-xs gap-2">
                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono">Connecting to live website stream...</span>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  ref={iframeRef}
                  src={effectiveLiveUrl}
                  title={`${project.title} live interactive stream`}
                  onLoad={() => setIframeLoading(false)}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              <div className="w-full h-full overflow-hidden p-2">
                <ProjectMockup
                  screenshotUrl={project.fullScreenshotUrl}
                  liveUrl={project.liveUrl}
                  title={project.title}
                  height={430}
                  interactiveButtons={false}
                />
              </div>
            )}
          </div>

          <div className="w-full mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>
              {viewMode === 'iframe'
                ? '💡 Interactive mode: scroll and click directly inside the preview above.'
                : '↕ Mockup mode: hover over the frame to smoothly scroll the entire full-page design.'}
            </span>
            <span className="text-emerald-700 font-bold">
              Viewport: {deviceMode.toUpperCase()} ({getWidthByMode()})
            </span>
          </div>
        </div>

        {/* Right Column: Project Details & Technical Specifications */}
        <div className="w-full lg:w-[360px] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Project Summary */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                Executive Overview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Client & Date Meta */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-2">
                <Building size={16} className="text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold">Client</div>
                  <div className="text-xs text-slate-800 font-semibold truncate">{project.clientName}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold">Delivered</div>
                  <div className="text-xs text-slate-800 font-semibold">{project.completionDate}</div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                Architectural Highlights
              </h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers size={14} className="text-emerald-600" />
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Tag
                    key={tech}
                    color="green"
                    className="m-0 text-xs py-0.5 px-2 bg-emerald-50 border-emerald-200 text-emerald-800 font-medium rounded-md"
                  >
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          <Divider className="my-2 border-slate-200" />

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Button
              type="primary"
              size="large"
              icon={<ArrowUpRight size={18} />}
              onClick={() => window.open(effectiveLiveUrl, '_blank', 'noopener,noreferrer')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 flex items-center justify-center gap-2 shadow-sm"
            >
              Launch Live Website
            </Button>
            <Button
              size="large"
              onClick={onClose}
              className="bg-white text-slate-700 hover:text-slate-900 border-slate-200 h-11 px-5"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
