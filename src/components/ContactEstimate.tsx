'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  Send,
  Calculator,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { ContactInfo } from '@/lib/types';

interface ContactEstimateProps {
  contactInfo: ContactInfo;
}

const SERVICE_OPTIONS = [
  { id: 'nextjs', name: 'Next.js 14 App Router & Ant Design', basePrice: 2800 },
  { id: 'laravel', name: 'Laravel 11 Enterprise API Backend', basePrice: 2400 },
  { id: 'ecommerce', name: 'High-Converting E-Commerce Store', basePrice: 3200 },
  { id: 'admin', name: 'Custom Operational Admin Dashboard', basePrice: 2500 },
  { id: 'seo', name: 'Technical SEO & Performance Audit', basePrice: 1200 },
  { id: 'design', name: 'UI/UX Prototyping & Design System', basePrice: 1500 },
];

const TIMELINE_OPTIONS = [
  { id: 'fast', label: '2-4 Weeks (Express Sprint)', multiplier: 1.2 },
  { id: 'normal', label: '1-2 Months (Recommended)', multiplier: 1.0 },
  { id: 'enterprise', label: '3+ Months (Phase Rollout)', multiplier: 0.95 },
];

export const ContactEstimate: React.FC<ContactEstimateProps> = ({ contactInfo }) => {
  const [form] = Form.useForm();
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'nextjs',
    'admin',
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('normal');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Calculate live dynamic estimate
  const calculatedEstimate = React.useMemo(() => {
    const baseTotal = selectedServices.reduce((sum, srvId) => {
      const match = SERVICE_OPTIONS.find((s) => s.id === srvId);
      return sum + (match ? match.basePrice : 0);
    }, 0);

    const timeline = TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline);
    const multiplier = timeline ? timeline.multiplier : 1.0;
    const finalCalculated = Math.round(baseTotal * multiplier);
    const lowerBound = Math.round(finalCalculated * 0.9);
    const upperBound = Math.round(finalCalculated * 1.15);

    return {
      lower: lowerBound,
      upper: upperBound,
      itemsCount: selectedServices.length,
    };
  }, [selectedServices, selectedTimeline]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    message.success('Thank you! Osama will review your specifications and reply within 24 hours.');
  };

  return (
    <section id="estimate-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Calculator size={14} className="text-emerald-600" />
          Interactive Project Estimator
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Calculate Your Project Scope &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Book a Consultation
          </span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Select deliverables and target timeline to generate an instant estimate, or message Osama directly for immediate booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Estimator Form (Crisp White Card) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Project Brief Received!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We have logged your architecture requirements and estimated ballpark. Osama Elgendy will reach out via email or WhatsApp within 24 hours.
              </p>
              <Button
                type="primary"
                onClick={() => {
                  setSubmitted(false);
                  form.resetFields();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 mt-4"
              >
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              requiredMark={false}
              className="space-y-6"
            >
              {/* Step 1: Select Deliverables */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  1. Select Target Deliverables &amp; Modules
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold leading-tight">{srv.name}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 size={12} className="stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Target Timeline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  2. Preferred Delivery Timeline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TIMELINE_OPTIONS.map((tl) => (
                    <button
                      key={tl.id}
                      type="button"
                      onClick={() => setSelectedTimeline(tl.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedTimeline === tl.id
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 text-xs'
                      }`}
                    >
                      <div className="text-xs">{tl.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Estimate Metric Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-900">
                      Estimated Investment Ballpark
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                      {calculatedEstimate.itemsCount === 0
                        ? '$0 (Select at least 1 module)'
                        : `$${calculatedEstimate.lower.toLocaleString()} – $${calculatedEstimate.upper.toLocaleString()} USD`}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Includes full QA &amp; 30-day warranty
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs text-slate-700 font-bold">Your Name</span>}
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="e.g. John Doe" className="bg-slate-50 border-slate-300 text-slate-900" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs text-slate-700 font-bold">Work Email</span>}
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}
                >
                  <Input placeholder="john@company.com" className="bg-slate-50 border-slate-300 text-slate-900" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs text-slate-700 font-bold">Company / Brand (Optional)</span>}
                  name="company"
                >
                  <Input placeholder="Acme Inc." className="bg-slate-50 border-slate-300 text-slate-900" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs text-slate-700 font-bold">WhatsApp / Phone (Optional)</span>}
                  name="phone"
                >
                  <Input placeholder="+1 555 000 1234" className="bg-slate-50 border-slate-300 text-slate-900" />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-xs text-slate-700 font-bold">Project Overview &amp; Specifications</span>}
                name="message"
                rules={[{ required: true, message: 'Please provide a brief description of your project' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Tell us about your target launch date, existing codebase (if any), and core goals..."
                  className="bg-slate-50 border-slate-300 text-slate-900"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                size="large"
                icon={<Send size={16} />}
                block
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                Submit Project Estimate Request
              </Button>
            </Form>
          )}
        </div>

        {/* Right Column: Direct Channels & Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-600" />
              Direct Communication Channels
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Prefer instant communication? Reach out directly via WhatsApp or email for rapid project scoping and NDAs.
            </p>

            <div className="space-y-3.5">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Direct Email</div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {contactInfo.email}
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Osama,%20I%20would%20like%20to%20discuss%20a%20new%20web%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-bold">WhatsApp Business</div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {contactInfo.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Working Hours</div>
                  <div className="text-xs font-medium text-slate-700">
                    {contactInfo.workingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-7 shadow-xs">
            <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-700" />
              The Agency Quality Guarantee
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span><strong>95+ Lighthouse Score:</strong> Guaranteed Core Web Vitals optimization on production deployments.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span><strong>100% Code Ownership:</strong> Clean GitHub repositories, documentation, and zero vendor lock-in.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span><strong>Post-Launch Warranty:</strong> 30 days of complimentary priority bug fixing included.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
