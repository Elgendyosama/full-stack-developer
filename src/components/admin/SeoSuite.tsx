'use client';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  Card,
  message,
  Tag,
  Divider,
} from 'antd';
import {
  Search,
  Globe,
  ExternalLink,
  ShieldCheck,
  Code2,
  Save,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { SeoConfig } from '@/lib/types';

export const SeoSuite: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<SeoConfig | null>(null);

  // Live SERP Preview states
  const [liveTitle, setLiveTitle] = useState('');
  const [liveDesc, setLiveDesc] = useState('');
  const [liveCanonical, setLiveCanonical] = useState('');
  const [serpView, setSerpView] = useState<'desktop' | 'mobile'>('desktop');

  const fetchSeoSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const json = await res.json();
      if (json.success && json.data.seoConfig) {
        const config = json.data.seoConfig;
        setCurrentConfig(config);
        form.setFieldsValue({
          ...config,
          keywords: config.keywords?.join(', '),
        });
        setLiveTitle(config.siteTitle);
        setLiveDesc(config.metaDescription);
        setLiveCanonical(config.canonicalBaseUrl);
      }
    } catch (err) {
      message.error('Failed to load SEO configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const handleFinish = async (values: Record<string, unknown>) => {
    setSaving(true);
    try {
      const keywordsList = typeof values.keywords === 'string'
        ? values.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : currentConfig?.keywords || [];

      const payload: SeoConfig = {
        siteTitle: values.siteTitle as string,
        titleTemplate: values.titleTemplate as string,
        metaDescription: values.metaDescription as string,
        canonicalBaseUrl: values.canonicalBaseUrl as string,
        keywords: keywordsList,
        ogImage: values.ogImage as string,
        twitterHandle: values.twitterHandle as string,
        gscVerificationId: values.gscVerificationId as string,
        bingVerificationId: values.bingVerificationId as string,
        gtmContainerId: values.gtmContainerId as string,
        robotsIndex: Boolean(values.robotsIndex),
        robotsFollow: Boolean(values.robotsFollow),
      };

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'seoConfig', payload }),
      });

      const json = await res.json();
      if (json.success) {
        message.success('SEO configuration and metadata saved successfully!');
        setCurrentConfig(payload);
      } else {
        message.error(json.error || 'Failed to save SEO configuration');
      }
    } catch (err) {
      message.error('Error saving SEO settings');
    } finally {
      setSaving(false);
    }
  };

  const getTitleStatus = (len: number) => {
    if (len >= 45 && len <= 65) return { color: 'green', text: 'Optimal length (45-65 chars)' };
    if (len < 45) return { color: 'gold', text: 'A bit short (< 45 chars)' };
    return { color: 'red', text: 'Truncation risk (> 65 chars)' };
  };

  const getDescStatus = (len: number) => {
    if (len >= 130 && len <= 165) return { color: 'green', text: 'Optimal length (130-165 chars)' };
    if (len < 130) return { color: 'gold', text: 'Short description (< 130 chars)' };
    return { color: 'red', text: 'Truncation risk (> 165 chars)' };
  };

  const titleStatus = getTitleStatus(liveTitle.length);
  const descStatus = getDescStatus(liveDesc.length);

  return (
    <div className="space-y-6">
      {/* Top Banner (Light Modern Card) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Globe className="text-emerald-600" size={20} />
            Global Technical SEO Suite &amp; Verification Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time Google SERP simulator, character counters, schema injection, and search engine verification tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            <span>Inspect Sitemap</span>
            <ExternalLink size={13} />
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            <span>Inspect Robots.txt</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7">
          <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              requiredMark={false}
              onValuesChange={(_, all: Record<string, unknown>) => {
                if (typeof all.siteTitle === 'string') setLiveTitle(all.siteTitle);
                if (typeof all.metaDescription === 'string') setLiveDesc(all.metaDescription);
                if (typeof all.canonicalBaseUrl === 'string') setLiveCanonical(all.canonicalBaseUrl);
              }}
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-4 flex items-center gap-1.5">
                <Search size={15} />
                Meta Tags &amp; SERP Snippet
              </h3>

              {/* Title & Character Counter */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Site Title (SERP Display)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      {liveTitle.length} chars
                    </span>
                    <Tag color={titleStatus.color} className="m-0 text-[10px]">
                      {titleStatus.text}
                    </Tag>
                  </div>
                </div>
                <Form.Item
                  name="siteTitle"
                  rules={[{ required: true, message: 'Site title is required' }]}
                  className="mb-0"
                >
                  <Input placeholder="e.g. Osama Elgendy | Principal Full-Stack Engineer" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              {/* Meta Description & Character Counter */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Meta Description
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      {liveDesc.length} chars
                    </span>
                    <Tag color={descStatus.color} className="m-0 text-[10px]">
                      {descStatus.text}
                    </Tag>
                  </div>
                </div>
                <Form.Item
                  name="metaDescription"
                  rules={[{ required: true, message: 'Meta description is required' }]}
                  className="mb-0"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="High-converting Web Design & Full-Stack Development agency portfolio..."
                    className="bg-slate-50 border-slate-300"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Canonical Base URL</span>}
                  name="canonicalBaseUrl"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="https://osamaelgendy.dev" className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Open Graph Social Image URL</span>}
                  name="ogImage"
                >
                  <Input placeholder="/logo.png" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-xs font-bold text-slate-700">Keywords (Comma-separated)</span>}
                name="keywords"
              >
                <Input placeholder="Next.js, Ant Design, Laravel, Full Stack, Agency" className="bg-slate-50 border-slate-300" />
              </Form.Item>

              <Divider className="my-6 border-slate-200" />

              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-4 flex items-center gap-1.5">
                <ShieldCheck size={16} />
                Search Engine Verification &amp; Tag Manager
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Google Search Console Verification Token</span>}
                  name="gscVerificationId"
                >
                  <Input placeholder="google-site-verification=xxxx" className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Bing Webmaster Token</span>}
                  name="bingVerificationId"
                >
                  <Input placeholder="BING_WEBMASTER_TOKEN" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Google Tag Manager (GTM) Container ID</span>}
                  name="gtmContainerId"
                >
                  <Input placeholder="GTM-XXXXXX" className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Twitter / X Handle</span>}
                  name="twitterHandle"
                >
                  <Input placeholder="@osamaelgendy" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              <div className="flex items-center gap-8 py-3">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Allow Search Engines to Index</span>}
                  name="robotsIndex"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch className="bg-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Allow Link Following</span>}
                  name="robotsFollow"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch className="bg-slate-300" />
                </Form.Item>
              </div>

              <Divider className="my-6 border-slate-200" />

              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                icon={<Save size={16} />}
                size="large"
                className="bg-emerald-600 hover:bg-emerald-700 font-bold h-11 px-8 shadow-sm"
              >
                Save SEO Configuration
              </Button>
            </Form>
          </Card>
        </div>

        {/* Right Column: Interactive Google SERP Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm p-0 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Search size={14} className="text-emerald-600" />
                Live Google SERP Simulator
              </span>

              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSerpView('desktop')}
                  className={`p-1 rounded text-xs ${
                    serpView === 'desktop'
                      ? 'bg-slate-100 text-emerald-700 font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  <Laptop size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setSerpView('mobile')}
                  className={`p-1 rounded text-xs ${
                    serpView === 'mobile'
                      ? 'bg-slate-100 text-emerald-700 font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            <div className="p-5 bg-white text-slate-900 font-sans">
              <div
                className={`transition-all ${
                  serpView === 'mobile' ? 'max-w-[340px] mx-auto' : 'w-full'
                }`}
              >
                {/* Google Snippet URL & Favicon */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                    O
                  </div>
                  <div className="leading-tight">
                    <div className="text-[12px] text-[#202124] font-medium">
                      Osama Elgendy
                    </div>
                    <div className="text-[11px] text-[#5f6368] truncate max-w-[280px]">
                      {liveCanonical || 'https://osamaelgendy.dev'}
                    </div>
                  </div>
                </div>

                {/* Snippet Title */}
                <h4 className="text-[19px] text-[#1a0dab] hover:underline cursor-pointer font-normal leading-snug mb-1">
                  {liveTitle || 'Osama Elgendy | Principal Full-Stack Engineer'}
                </h4>

                {/* Snippet Description */}
                <p className="text-[13px] text-[#4d5156] leading-relaxed line-clamp-3">
                  {liveDesc || 'Add meta description to see how your site appears in Google search results.'}
                </p>

                {/* Google Sitelinks Sample */}
                <div className="mt-3 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[12px] text-[#1a0dab]">
                  <span className="hover:underline">Portfolio Showcase</span>
                  <span className="hover:underline">Instant Estimate</span>
                  <span className="hover:underline">Tech Arsenal</span>
                  <span className="hover:underline">Client Reviews</span>
                </div>
              </div>
            </div>
          </Card>

          {/* JSON-LD Schemas Live Status */}
          <Card className="bg-white border-slate-200/90 rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Code2 size={15} className="text-emerald-600" />
              Automated JSON-LD Schema Pipeline
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono text-emerald-800 font-semibold">schema.org/WebSite</span>
                <Tag color="success">Injected</Tag>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono text-emerald-800 font-semibold">schema.org/Organization</span>
                <Tag color="success">Injected</Tag>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono text-emerald-800 font-semibold">schema.org/Service (6 Items)</span>
                <Tag color="success">Injected</Tag>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono text-emerald-800 font-semibold">schema.org/BreadcrumbList</span>
                <Tag color="success">Injected</Tag>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
