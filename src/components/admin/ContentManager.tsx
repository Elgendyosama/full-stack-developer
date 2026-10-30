'use client';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Tabs,
  InputNumber,
  message,
  Divider,
  Tag,
} from 'antd';
import {
  Save,
  Layout,
} from 'lucide-react';
import { SiteContent } from '@/lib/types';

export const ContentManager: React.FC = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/settings');
      const json = await res.json();
      if (json.success && json.data.siteContent) {
        setSiteContent(json.data.siteContent);
        form.setFieldsValue(json.data.siteContent);
      }
    } catch (err) {
      message.error('Failed to load site content');
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleFinish = async (values: SiteContent) => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'siteContent', payload: values }),
      });

      const json = await res.json();
      if (json.success) {
        message.success('Site content and CMS data updated successfully!');
        setSiteContent(values);
      } else {
        message.error(json.error || 'Failed to update CMS');
      }
    } catch (err) {
      message.error('Error saving site content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Layout className="text-emerald-600" size={20} />
            Site Content &amp; Visual Branding CMS
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit live hero headlines, client testimonials, service catalogs, and agency contact details.
          </p>
        </div>

        <Button
          type="primary"
          onClick={() => form.submit()}
          loading={saving}
          icon={<Save size={16} />}
          className="bg-emerald-600 hover:bg-emerald-700 font-bold h-10 px-6 shadow-sm"
        >
          Save All CMS Changes
        </Button>
      </div>

      <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Tabs
            defaultActiveKey="hero"
            items={[
              {
                key: 'hero',
                label: 'Hero & Agency Copy',
                children: (
                  <div className="space-y-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Agency Brand Name</span>}
                        name="agencyName"
                        rules={[{ required: true }]}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Brand Tagline</span>}
                        name="tagline"
                        rules={[{ required: true }]}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Founder Portrait Image</span>}
                        name={['hero', 'portraitImage']}
                        extra="Default: /osama-portrait.jpg"
                      >
                        <Input placeholder="/osama-portrait.jpg" className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Portrait Badge Title</span>}
                        name={['hero', 'portraitBadgeTitle']}
                      >
                        <Input placeholder="Principal Full Stack Architect" className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Portrait Badge Subtitle</span>}
                        name={['hero', 'portraitBadgeSub']}
                      >
                        <Input placeholder="10+ Years Enterprise Delivery" className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={<span className="text-xs font-bold text-slate-700">Hero Eyebrow Pill</span>}
                      name={['hero', 'eyebrow']}
                    >
                      <Input className="bg-slate-50 border-slate-300" />
                    </Form.Item>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Title Prefix</span>}
                        name={['hero', 'titlePrefix']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Title Highlight (Gradient)</span>}
                        name={['hero', 'titleHighlight']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Title Suffix</span>}
                        name={['hero', 'titleSuffix']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={<span className="text-xs font-bold text-slate-700">Hero Subtitle / Value Proposition</span>}
                      name={['hero', 'description']}
                    >
                      <Input.TextArea rows={3} className="bg-slate-50 border-slate-300" />
                    </Form.Item>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Primary CTA Text</span>}
                        name={['hero', 'primaryCtaText']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Primary CTA Anchor/Link</span>}
                        name={['hero', 'primaryCtaLink']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <Divider className="my-4 border-slate-200" />
                    <h4 className="text-xs uppercase font-bold text-slate-700 mb-3">Live Project Metrics / Stats</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <Form.Item
                            label={<span className="text-[11px] text-slate-500 font-semibold">Stat #{index + 1} Label</span>}
                            name={['hero', 'stats', index, 'label']}
                            className="mb-1"
                          >
                            <Input size="small" className="bg-white" />
                          </Form.Item>
                          <Form.Item
                            label={<span className="text-[11px] text-slate-500 font-semibold">Value</span>}
                            name={['hero', 'stats', index, 'value']}
                            className="mb-0"
                          >
                            <Input size="small" className="bg-white" />
                          </Form.Item>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                key: 'services',
                label: 'Services & Pricing Offerings',
                children: (
                  <div className="space-y-6 pt-2">
                    <p className="text-xs text-slate-500">
                      Edit current agency service packages, features, and starting price points shown in the grid.
                    </p>
                    {siteContent?.services.map((srv, idx) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-slate-900 text-sm">
                            Package #{idx + 1}: {srv.title}
                          </div>
                          <Tag color="green">{srv.badge}</Tag>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Title</span>}
                            name={['services', idx, 'title']}
                            className="mb-1 sm:col-span-2"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Starting Price</span>}
                            name={['services', idx, 'startingPrice']}
                            className="mb-1"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                        </div>
                        <Form.Item
                          label={<span className="text-xs text-slate-600 font-semibold">Description</span>}
                          name={['services', idx, 'description']}
                          className="mb-0"
                        >
                          <Input.TextArea rows={2} className="bg-white" />
                        </Form.Item>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: 'testimonials',
                label: 'Client Testimonials',
                children: (
                  <div className="space-y-6 pt-2">
                    <p className="text-xs text-slate-500">
                      Manage client quotes, company names, and star ratings displayed in the testimonial slider.
                    </p>
                    {siteContent?.testimonials.map((test, idx) => (
                      <div key={test.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Client Name</span>}
                            name={['testimonials', idx, 'clientName']}
                            className="mb-1"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Company</span>}
                            name={['testimonials', idx, 'company']}
                            className="mb-1"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Role / Position</span>}
                            name={['testimonials', idx, 'role']}
                            className="mb-1"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                        </div>
                        <Form.Item
                          label={<span className="text-xs text-slate-600 font-semibold">Client Review Quote</span>}
                          name={['testimonials', idx, 'content']}
                          className="mb-1"
                        >
                          <Input.TextArea rows={2} className="bg-white" />
                        </Form.Item>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Avatar Image URL</span>}
                            name={['testimonials', idx, 'avatarUrl']}
                            className="mb-0"
                          >
                            <Input className="bg-white" />
                          </Form.Item>
                          <Form.Item
                            label={<span className="text-xs text-slate-600 font-semibold">Star Rating (1-5)</span>}
                            name={['testimonials', idx, 'rating']}
                            className="mb-0"
                          >
                            <InputNumber min={1} max={5} className="bg-white" />
                          </Form.Item>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: 'contact',
                label: 'Contact Info & Socials',
                children: (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Public Contact Email</span>}
                        name={['contact', 'email']}
                        rules={[{ required: true }]}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Phone Number</span>}
                        name={['contact', 'phone']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">WhatsApp Link / Number</span>}
                        name={['contact', 'whatsapp']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-bold text-slate-700">Office / Location</span>}
                        name={['contact', 'address']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={<span className="text-xs font-bold text-slate-700">Working Hours SLA</span>}
                      name={['contact', 'workingHours']}
                    >
                      <Input className="bg-slate-50 border-slate-300" />
                    </Form.Item>

                    <Divider className="my-4 border-slate-200" />
                    <h4 className="text-xs uppercase font-bold text-slate-700 mb-3">Social Profiles</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs text-slate-600 font-semibold">GitHub Profile URL</span>}
                        name={['contact', 'socials', 'github']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs text-slate-600 font-semibold">LinkedIn Profile URL</span>}
                        name={['contact', 'socials', 'linkedin']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label={<span className="text-xs text-slate-600 font-semibold">Twitter / X URL</span>}
                        name={['contact', 'socials', 'twitter']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs text-slate-600 font-semibold">Behance / Dribbble Portfolio</span>}
                        name={['contact', 'socials', 'behance']}
                      >
                        <Input className="bg-slate-50 border-slate-300" />
                      </Form.Item>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <Divider className="my-6 border-slate-200" />

          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            icon={<Save size={16} />}
            size="large"
            className="bg-emerald-600 hover:bg-emerald-700 font-bold h-11 px-8 shadow-sm"
          >
            Save All Content Updates
          </Button>
        </Form>
      </Card>
    </div>
  );
};
