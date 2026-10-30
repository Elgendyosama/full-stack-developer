'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { Lock, User, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: { name: string; role: string }) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        message.success('Welcome back, Admin Osama!');
        localStorage.setItem('agency_admin_logged_in', 'true');
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/60 blur-[130px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md bg-white border-slate-200/90 shadow-xl rounded-2xl relative z-10 p-2">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1.5 flex items-center justify-center mx-auto mb-4 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Agency Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Executive Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage portfolio projects, technical SEO, and site content.
          </p>
        </div>

        {errorMsg && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            closable
            className="mb-4 bg-red-50 border-red-200 text-red-700 text-xs"
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ username: 'admin', password: 'admin2026' }}
          requiredMark={false}
        >
          <Form.Item
            label={<span className="text-xs font-bold text-slate-700">Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input
              prefix={<User size={16} className="text-slate-400 mr-2" />}
              placeholder="e.g. admin"
              className="bg-slate-50 border-slate-300 text-slate-900 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-xs font-bold text-slate-700">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input.Password
              prefix={<Lock size={16} className="text-slate-400 mr-2" />}
              placeholder="••••••••"
              className="bg-slate-50 border-slate-300 text-slate-900 rounded-lg"
            />
          </Form.Item>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 mb-5 text-[11px] text-emerald-900 flex items-center justify-between">
            <span>Default Demo: <strong>admin</strong> / <strong>admin2026</strong></span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">Pre-filled</span>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            icon={<ShieldCheck size={18} />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg shadow-sm"
          >
            Authenticate &amp; Enter Dashboard
          </Button>
        </Form>
      </Card>
    </div>
  );
};
