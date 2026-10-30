'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Button, Avatar, message } from 'antd';
import {
  LayoutDashboard,
  Layers,
  Globe,
  FileEdit,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { SeoSuite } from '@/components/admin/SeoSuite';
import { ContentManager } from '@/components/admin/ContentManager';
import { AnalyticsOverview } from '@/components/admin/AnalyticsOverview';
import { Project } from '@/lib/types';

const { Content } = Layout;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [projects, setProjects] = useState<Project[]>([]);

  // Check auth session on mount
  useEffect(() => {
    const session = localStorage.getItem('agency_admin_logged_in');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.warn('Failed to fetch projects', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('agency_admin_logged_in');
    setIsAuthenticated(false);
    message.info('Logged out from executive session');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Validating administrative session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
        }}
      />
    );
  }

  const menuItems = [
    {
      key: 'overview',
      icon: <LayoutDashboard size={16} />,
      label: 'Executive Overview',
    },
    {
      key: 'projects',
      icon: <Layers size={16} />,
      label: 'Showcase Projects',
    },
    {
      key: 'seo',
      icon: <Globe size={16} />,
      label: 'Technical SEO Suite',
    },
    {
      key: 'cms',
      icon: <FileEdit size={16} />,
      label: 'Site Content & CMS',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      {/* Executive Top Navigation Header (Semantic Header to avoid AntD Layout CSS conflicts) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 h-16 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3 sm:gap-4 leading-normal">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs group-hover:border-emerald-500 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight hidden sm:inline">
              OSAMA ELGENDY
            </span>
          </Link>

          <span className="text-slate-300 hidden sm:inline">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Admin Control Console</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap inline-flex items-center leading-none">
              Live Production
            </span>
          </div>
        </div>

        {/* Center: Tabs Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 leading-normal">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-3 leading-normal">
          <Link href="/" target="_blank">
            <Button
              size="small"
              icon={<ExternalLink size={13} />}
              className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 text-xs hidden sm:flex items-center gap-1.5 shadow-xs"
            >
              Public Website
            </Button>
          </Link>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <Avatar
              size={32}
              className="bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs"
            >
              OE
            </Avatar>
            <div className="hidden md:block leading-tight text-left">
              <div className="text-xs font-bold text-slate-900">Osama Elgendy</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">Super Admin</div>
            </div>

            <Button
              size="small"
              icon={<LogOut size={13} />}
              onClick={handleLogout}
              className="bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border-slate-200 ml-1"
              title="Logout"
            />
          </div>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex items-center justify-around bg-white border-b border-slate-200 p-2 overflow-x-auto shadow-xs">
        {menuItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === item.key
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <AnalyticsOverview
            projects={projects}
            onNavigateTab={(tabKey) => setActiveTab(tabKey)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager onProjectsUpdated={fetchProjects} />
        )}

        {activeTab === 'seo' && <SeoSuite />}

        {activeTab === 'cms' && <ContentManager />}
      </main>
    </div>
  );
}
