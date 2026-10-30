'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Eye,
  ExternalLink,
  Globe,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import { Button } from 'antd';
import { DeviceFrameType } from '@/lib/types';
import { getScreenshotSources, normalizeLiveUrl } from '@/lib/url-helper';

interface DeviceMockupProps {
  screenshotUrl?: string;
  title: string;
  frameType?: DeviceFrameType;
  liveUrl?: string;
  onLivePreview?: () => void;
  height?: number;
  interactiveButtons?: boolean;
  defaultMode?: 'screenshot' | 'iframe';
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  screenshotUrl,
  title,
  frameType = 'laptop',
  liveUrl,
  onLivePreview,
  height = 240,
  interactiveButtons = true,
  defaultMode = 'screenshot',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'screenshot' | 'iframe'>(defaultMode);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const effectiveLiveUrl = normalizeLiveUrl(liveUrl);

  const candidateSources = useMemo(() => {
    return getScreenshotSources(screenshotUrl, liveUrl, title);
  }, [screenshotUrl, liveUrl, title]);

  useEffect(() => {
    setSourceIndex(0);
    setIsLoaded(false);
  }, [screenshotUrl, liveUrl, title]);

  const currentSrc = candidateSources[sourceIndex] || candidateSources[candidateSources.length - 1];

  const handleImgError = () => {
    if (sourceIndex < candidateSources.length - 1) {
      setSourceIndex((prev) => prev + 1);
      setIsLoaded(false);
    }
  };

  const handleImgLoad = () => {
    setIsLoaded(true);
  };

  const renderFrameContent = () => {
    return (
      <div
        className="relative w-full overflow-hidden bg-slate-50 group/viewport"
        style={{ height: `${height}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {viewMode === 'screenshot' ? (
          <>
            {/* Loading Indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                <RefreshCw size={20} className="animate-spin text-emerald-600 mb-1.5" />
                <span className="text-[11px] font-mono text-slate-500">Capturing live page...</span>
              </div>
            )}

            {/* Full-Page Screenshot with Smooth CSS Hover Scroll */}
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
                alt={`${title} showcase preview`}
                onLoad={handleImgLoad}
                onError={handleImgError}
                className={`w-full h-auto block select-none pointer-events-none transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            </div>

            {/* Hover scroll badge (fades out on hover for clear visibility) */}
            <div
              className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-slate-900/80 text-white backdrop-blur-md border border-slate-700/50 transition-opacity duration-300 pointer-events-none flex items-center gap-1 ${
                isHovered ? 'opacity-0' : 'opacity-90'
              }`}
            >
              <span>↕ Hover to scroll</span>
            </div>

            {/* Subtle floating actions (placed in top-right without blocking viewport) */}
            {interactiveButtons && (
              <div
                className={`absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                {onLivePreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLivePreview();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-md flex items-center gap-1 transition-colors"
                  >
                    <Eye size={12} />
                    <span>Live Preview</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode('iframe');
                  }}
                  className="bg-white/95 hover:bg-white text-slate-800 border border-slate-200 text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-md flex items-center gap-1 transition-colors backdrop-blur-sm"
                >
                  <Globe size={12} className="text-emerald-600" />
                  <span>Iframe</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Live Interactive Iframe */
          <div className="relative w-full h-full bg-white">
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 text-white text-xs">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
                <span>Loading live preview...</span>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={effectiveLiveUrl}
              title={`${title} live preview`}
              onLoad={() => setIframeLoading(false)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 px-2 py-1 rounded-lg shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('screenshot')}
                className="text-[11px] text-slate-600 hover:text-emerald-600 font-semibold px-1.5 py-0.5 rounded hover:bg-slate-100 flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Mockup</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 1. Mobile Phone Chassis
  if (frameType === 'mobile') {
    return (
      <div className="relative mx-auto w-full max-w-[270px] p-2 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-[38px] shadow-xl border border-slate-300 select-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-end px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
        <div className="rounded-[30px] overflow-hidden border border-slate-200 bg-white pt-5 shadow-inner">
          {renderFrameContent()}
        </div>
        <div className="w-24 h-1 bg-slate-400 rounded-full mx-auto mt-2" />
      </div>
    );
  }

  // 2. Laptop Frame Chassis
  if (frameType === 'laptop') {
    return (
      <div className="w-full flex flex-col items-center select-none">
        <div className="w-full rounded-t-xl bg-slate-100 p-2.5 pb-0 shadow-lg border border-b-0 border-slate-200/90">
          <div className="h-6 flex items-center justify-between px-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            <div className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/60" />
            </div>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'screenshot' ? 'iframe' : 'screenshot')}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                viewMode === 'iframe'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe size={10} className={viewMode === 'iframe' ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{viewMode === 'iframe' ? 'Live Web' : 'Mockup'}</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-t-sm border border-slate-200">
            {renderFrameContent()}
          </div>
        </div>

        <div className="w-[104%] h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-xl border-t border-slate-300 shadow-md relative flex justify-center">
          <div className="w-16 h-1.5 bg-slate-300 rounded-b-md border-b border-slate-400" />
        </div>
      </div>
    );
  }

  // 3. Browser Window Chassis (Default)
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-md select-none">
      <div className="bg-slate-100/90 px-3.5 py-2 border-b border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex-1 max-w-sm mx-auto bg-white border border-slate-200/80 rounded-md py-0.5 px-3 flex items-center justify-between gap-1.5 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5 truncate">
            <Globe size={11} className="text-emerald-600 flex-shrink-0" />
            <span className="truncate">{effectiveLiveUrl.replace(/^https?:\/\//, '')}</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-emerald-600">SSL</span>
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'screenshot' ? 'iframe' : 'screenshot')}
          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
            viewMode === 'iframe'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe size={10} className={viewMode === 'iframe' ? 'text-emerald-600' : 'text-slate-400'} />
          <span>{viewMode === 'iframe' ? 'Live Web' : 'Mockup'}</span>
        </button>
      </div>

      {renderFrameContent()}
    </div>
  );
};
