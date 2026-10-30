'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Globe, RefreshCw, Eye, ExternalLink } from 'lucide-react';
import { getScreenshotSources, normalizeLiveUrl } from '@/lib/url-helper';

interface ProjectMockupProps {
  screenshotUrl?: string;
  liveUrl?: string;
  title: string;
  height?: number; // e.g. 220 for showcase cards, 80 for admin table
  compact?: boolean;
  onLivePreview?: () => void;
  interactiveButtons?: boolean;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({
  screenshotUrl,
  liveUrl,
  title,
  height = 220,
  compact = false,
  onLivePreview,
  interactiveButtons = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute prioritized list of screenshot sources (Microlink -> WordPress mShots -> Vector SVG)
  const candidateSources = useMemo(() => {
    return getScreenshotSources(screenshotUrl, liveUrl, title);
  }, [screenshotUrl, liveUrl, title]);

  // Reset index when inputs change
  useEffect(() => {
    setSourceIndex(0);
    setIsLoaded(false);
  }, [screenshotUrl, liveUrl, title]);

  const currentSrc = candidateSources[sourceIndex] || candidateSources[candidateSources.length - 1];
  const effectiveLiveUrl = normalizeLiveUrl(liveUrl);

  const handleImageError = () => {
    if (sourceIndex < candidateSources.length - 1) {
      // Advance to next fallback source (e.g. Microlink -> mShots -> SVG)
      setSourceIndex((prev) => prev + 1);
      setIsLoaded(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`group/mockup w-full rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-xs transition-all duration-300 hover:shadow-md hover:border-emerald-400 select-none ${
        compact ? 'max-w-full' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser Chrome Header (Light Modern Aesthetic) */}
      <div
        className={`bg-slate-100/95 border-b border-slate-200/90 flex items-center justify-between gap-2 select-none ${
          compact ? 'px-2 py-1' : 'px-3.5 py-1.5'
        }`}
      >
        {/* Three Window Controls (macOS style: red, yellow, green) */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
        </div>

        {/* Address Bar */}
        {!compact ? (
          <div className="flex-1 max-w-[240px] sm:max-w-xs mx-auto bg-white border border-slate-200/90 rounded-md py-0.5 px-2.5 flex items-center justify-between text-[11px] text-slate-500 font-mono shadow-xs">
            <div className="flex items-center gap-1.5 truncate">
              <Globe size={11} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate">{effectiveLiveUrl.replace(/^https?:\/\//, '')}</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider ml-1">
              SSL
            </span>
          </div>
        ) : (
          <div className="text-[10px] text-slate-500 font-mono truncate px-1 font-semibold">
            {effectiveLiveUrl.replace(/^https?:\/\//, '').split('/')[0]}
          </div>
        )}

        {/* Status dot */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${isLoaded ? 'bg-emerald-500' : 'bg-amber-400 animate-ping'}`} />
        </div>
      </div>

      {/* Viewport Frame with Smooth CSS Auto-Scroll */}
      <div
        className="relative w-full overflow-hidden bg-slate-50 cursor-pointer"
        style={{ height: `${height}px` }}
      >
        {/* Loading Skeleton / Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 text-slate-400">
            <RefreshCw size={compact ? 14 : 20} className="animate-spin text-emerald-600 mb-1.5" />
            {!compact && <span className="text-[11px] font-mono text-slate-500">Capturing live page...</span>}
          </div>
        )}

        {/* Smooth Scrolling Container */}
        <div
          className="w-full transition-transform will-change-transform"
          style={{
            transform: isHovered
              ? `translateY(calc(-100% + ${height}px))`
              : 'translateY(0%)',
            transitionDuration: isHovered ? '4.8s' : '0.9s',
            transitionTimingFunction: isHovered
              ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt={title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-auto block select-none pointer-events-none transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        </div>

        {/* Hover Scroll Prompt Badge (fades out on hover for completely unhindered view) */}
        {!compact && (
          <div
            className={`absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-slate-900/80 text-white backdrop-blur-md border border-slate-700/50 transition-opacity duration-300 pointer-events-none flex items-center gap-1 ${
              isHovered ? 'opacity-0' : 'opacity-90'
            }`}
          >
            <span>↕ Hover to scroll</span>
          </div>
        )}

        {/* Compact Hover prompt for table */}
        {compact && (
          <div
            className={`absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-900/80 text-white transition-opacity ${
              isHovered ? 'opacity-0' : 'opacity-85'
            }`}
          >
            ↕ Scroll
          </div>
        )}

        {/* Subtle quick action floating overlay (only if explicitly enabled, placed discretely without obscuring the screenshot) */}
        {interactiveButtons && !compact && onLivePreview && (
          <div
            className={`absolute top-2.5 right-2.5 z-20 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLivePreview();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-md flex items-center gap-1 transition-colors"
            >
              <Eye size={12} />
              <span>Preview</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
