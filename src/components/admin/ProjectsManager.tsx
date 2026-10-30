'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Tag,
  Popconfirm,
  message,
  Space,
  Card,
  Divider,
} from 'antd';
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Layers,
  Laptop,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Project, Technology, IndustryType, DeviceFrameType } from '@/lib/types';
import { ProjectMockup } from '../ProjectMockup';
import { resolveScreenshotUrl, normalizeLiveUrl, getAutoScreenshot } from '@/lib/url-helper';

const { Option } = Select;

interface ProjectsManagerProps {
  onProjectsUpdated?: () => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({
  onProjectsUpdated,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form] = Form.useForm();

  // Live preview watch states
  const [watchScreenshot, setWatchScreenshot] = useState<string>('/mockups/nova-store.svg');
  const [watchTitle, setWatchTitle] = useState<string>('New Showcase Project');
  const [watchFrameType, setWatchFrameType] = useState<DeviceFrameType>('laptop');
  const [watchLiveUrl, setWatchLiveUrl] = useState<string>('https://example.com');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      message.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    form.resetFields();
    form.setFieldsValue({
      frameType: 'browser',
      featured: false,
      order: projects.length + 1,
      technology: 'React / Next.js',
      projectType: 'E-Commerce',
      fullScreenshotUrl: '',
      thumbnailUrl: '',
      liveUrl: 'https://',
      technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
      keyFeatures: 'Sub-100ms TTFB\nReal-time checkout\nAnt Design architecture',
    });
    setWatchScreenshot('');
    setWatchTitle('New Showcase Project');
    setWatchFrameType('browser');
    setWatchLiveUrl('https://');
    setModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    form.setFieldsValue({
      ...proj,
      technologies: proj.technologies,
      keyFeatures: proj.keyFeatures.join('\n'),
    });
    setWatchScreenshot(proj.fullScreenshotUrl || '');
    setWatchTitle(proj.title);
    setWatchFrameType(proj.frameType || 'laptop');
    setWatchLiveUrl(proj.liveUrl);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        message.success('Project removed successfully');
        fetchProjects();
        onProjectsUpdated?.();
      } else {
        message.error(json.error || 'Failed to delete');
      }
    } catch (err) {
      message.error('Error deleting project');
    }
  };

  const handleToggleFeatured = async (proj: Project, featured: boolean) => {
    try {
      const updated = { ...proj, featured };
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const json = await res.json();
      if (json.success) {
        message.success(`Project ${featured ? 'featured' : 'unfeatured'}`);
        fetchProjects();
        onProjectsUpdated?.();
      }
    } catch (err) {
      message.error('Failed to update featured state');
    }
  };

  // 1-Click Auto-Generate Screenshot from current live URL
  const handleAutoGenerateScreenshot = () => {
    const currentLive = form.getFieldValue('liveUrl');
    if (!currentLive || !currentLive.trim()) {
      message.warning('Please enter a Live Website URL first');
      return;
    }
    const currentTitle = form.getFieldValue('title') || 'showcase';
    const autoUrl = getAutoScreenshot(currentLive, currentTitle);
    form.setFieldsValue({
      fullScreenshotUrl: autoUrl,
      thumbnailUrl: autoUrl,
    });
    setWatchScreenshot(autoUrl);
    message.success('Auto-generated full-page screenshot endpoint!');
  };

  const handleFormFinish = async (values: Record<string, unknown>) => {
    try {
      const rawFeatures = (values.keyFeatures as string) || '';
      const keyFeaturesList = rawFeatures
        .split('\n')
        .map((f: string) => f.trim())
        .filter(Boolean);

      const targetLiveUrl = normalizeLiveUrl(values.liveUrl as string);
      const rawScreenshot = (values.fullScreenshotUrl as string) || '';
      const resolvedScreenshot = rawScreenshot.trim()
        ? resolveScreenshotUrl(rawScreenshot, targetLiveUrl, values.title as string)
        : getAutoScreenshot(targetLiveUrl, values.title as string);

      const payload: Project = {
        id: editingProject ? editingProject.id : 'proj-' + Date.now(),
        title: values.title as string,
        slug: values.slug as string,
        clientName: values.clientName as string,
        completionDate: values.completionDate as string,
        technology: values.technology as Technology,
        technologies: values.technologies as string[],
        projectType: values.projectType as IndustryType,
        liveUrl: targetLiveUrl,
        thumbnailUrl: (values.thumbnailUrl as string) || resolvedScreenshot,
        fullScreenshotUrl: resolvedScreenshot,
        summary: values.summary as string,
        keyFeatures: keyFeaturesList,
        featured: Boolean(values.featured),
        order: Number(values.order) || 1,
        frameType: (values.frameType as DeviceFrameType) || 'laptop',
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        message.success(
          editingProject
            ? 'Project updated successfully!'
            : 'New project published to showcase!'
        );
        setModalOpen(false);
        fetchProjects();
        onProjectsUpdated?.();
      } else {
        message.error(json.error || 'Save failed');
      }
    } catch (err) {
      message.error('Network error saving project');
    }
  };

  // Columns calibrated to Screenshot 1 with Light Modern Styling
  const columns = [
    {
      title: 'Mockup',
      dataIndex: 'fullScreenshotUrl',
      key: 'mockup',
      width: 150,
      render: (url: string, record: Project) => (
        <div className="w-32 py-1">
          {/* Smooth auto-scroll preview in table matching Screenshot 1 */}
          <ProjectMockup
            screenshotUrl={url}
            liveUrl={record.liveUrl}
            title={record.title}
            height={85}
            compact={true}
            interactiveButtons={false}
          />
        </div>
      ),
    },
    {
      title: 'Project Title & Client',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Project) => (
        <div>
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <span>{title}</span>
            {record.featured && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Featured
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 font-mono mt-0.5">
            Client: {record.clientName} • Slug: /{record.slug}
          </div>
          <a
            href={record.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-emerald-600 hover:text-emerald-700 font-mono truncate max-w-xs mt-0.5 flex items-center gap-1"
          >
            <span>{record.liveUrl}</span>
            <ExternalLink size={10} />
          </a>
        </div>
      ),
    },
    {
      title: 'Technology & Type',
      key: 'tech',
      width: 220,
      render: (_: unknown, record: Project) => (
        <div>
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            {record.technology}
          </span>
          <div className="text-[11px] text-slate-500">
            {record.projectType}
          </div>
        </div>
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      width: 90,
      render: (featured: boolean, record: Project) => (
        <Switch
          checked={featured}
          onChange={(val) => handleToggleFeatured(record, val)}
          size="small"
          className={featured ? 'bg-emerald-600' : 'bg-slate-300'}
        />
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 70,
      render: (order: number) => <span className="font-mono text-xs font-bold text-slate-700">{order}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_: unknown, record: Project) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<Edit size={13} />}
            onClick={() => handleOpenEditModal(record)}
            className="bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-xs"
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this project?"
            description="Are you sure you want to remove this project from the showcase?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              danger
              icon={<Trash2 size={13} />}
              className="border-red-200"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top action header (Light Modern Card) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="text-emerald-600" size={20} />
            Portfolio &amp; Showcase Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage showcase mockups, live links, and features. All project cards and preview thumbnails now render smooth hover auto-scroll animations with automated screenshot fallback!
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            icon={<RefreshCw size={14} />}
            onClick={fetchProjects}
            className="bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-xs"
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={handleOpenAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
          >
            Add New Project
          </Button>
        </div>
      </div>

      {/* Projects Table (Crisp Light Background) */}
      <Card className="bg-white border-slate-200/90 rounded-2xl shadow-sm overflow-hidden p-0">
        <Table
          dataSource={projects}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          className="agency-admin-table"
        />
      </Card>

      {/* Add / Edit Project Modal with Live Smooth Scrolling Mockup Preview */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1200}
        centered
        destroyOnClose
        title={
          <div className="flex items-center gap-2 text-lg font-black text-slate-900">
            <Laptop className="text-emerald-600" size={20} />
            <span>{editingProject ? 'Edit Showcase Project' : 'Create New Showcase Project'}</span>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 max-h-[74vh] overflow-y-auto pr-3">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormFinish}
              requiredMark={false}
              onValuesChange={(_, all: Record<string, unknown>) => {
                if (typeof all.title === 'string') setWatchTitle(all.title);
                if (all.frameType) setWatchFrameType(all.frameType as DeviceFrameType);
                if (typeof all.liveUrl === 'string') {
                  setWatchLiveUrl(all.liveUrl);
                  if (!all.fullScreenshotUrl || !(all.fullScreenshotUrl as string).trim()) {
                    setWatchScreenshot(getAutoScreenshot(all.liveUrl, (all.title as string) || 'preview'));
                  }
                }
                if (typeof all.fullScreenshotUrl === 'string' && (all.fullScreenshotUrl as string).trim()) {
                  setWatchScreenshot(all.fullScreenshotUrl);
                }
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Project Title</span>}
                  name="title"
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Input placeholder="e.g. ApexCloud Observability" className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">URL Slug</span>}
                  name="slug"
                  rules={[{ required: true, message: 'Slug is required' }]}
                >
                  <Input placeholder="e.g. apexcloud-saas" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Client Name</span>}
                  name="clientName"
                  rules={[{ required: true, message: 'Client name is required' }]}
                >
                  <Input placeholder="e.g. Apex Systems Ltd." className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Completion Date</span>}
                  name="completionDate"
                  rules={[{ required: true, message: 'Date is required' }]}
                >
                  <Input placeholder="YYYY-MM-DD (e.g. 2025-11-20)" className="bg-slate-50 border-slate-300" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Primary Technology Stack</span>}
                  name="technology"
                  rules={[{ required: true }]}
                >
                  <Select className="bg-slate-50">
                    <Option value="React / Next.js">React / Next.js</Option>
                    <Option value="Laravel / PHP">Laravel / PHP</Option>
                    <Option value="WordPress / WooCommerce">WordPress / WooCommerce</Option>
                    <Option value="Custom HTML/CSS">Custom HTML/CSS</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Industry / Category</span>}
                  name="projectType"
                  rules={[{ required: true }]}
                >
                  <Select className="bg-slate-50">
                    <Option value="E-Commerce">E-Commerce</Option>
                    <Option value="Corporate Portals">Corporate Portals</Option>
                    <Option value="Landing Pages">Landing Pages</Option>
                    <Option value="SaaS / Web Apps">SaaS / Web Apps</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Live Website URL</span>}
                  name="liveUrl"
                  rules={[{ required: true, message: 'Live URL is required' }]}
                >
                  <Input placeholder="https://example.com" className="bg-slate-50 border-slate-300" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Device Frame Mockup Type</span>}
                  name="frameType"
                  rules={[{ required: true }]}
                >
                  <Select className="bg-slate-50">
                    <Option value="laptop">MacBook Laptop Frame</Option>
                    <Option value="browser">Browser Window Chrome</Option>
                    <Option value="mobile">Modern Smartphone Frame</Option>
                  </Select>
                </Form.Item>
              </div>

              {/* Full Screenshot URL with 1-Click Auto Generate Button */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Full Screenshot Asset URL
                  </label>
                  <Button
                    type="link"
                    size="small"
                    icon={<Zap size={13} className="text-emerald-600" />}
                    onClick={handleAutoGenerateScreenshot}
                    className="text-xs text-emerald-600 font-bold p-0 h-auto"
                  >
                    Auto-Generate Full Screenshot
                  </Button>
                </div>
                <Form.Item
                  name="fullScreenshotUrl"
                  rules={[]}
                  className="mb-1"
                >
                  <Input placeholder="Optional: Auto-generated from Live URL if empty" className="bg-slate-50 border-slate-300" />
                </Form.Item>
                <div className="text-[11px] text-slate-400">
                  ⚡ Auto-Generated: Leaving this blank will automatically capture a full-page scrollable screenshot using the Live URL.
                </div>
              </div>

              <Form.Item
                label={<span className="text-xs font-bold text-slate-700">Technology Tags (Multi-Select)</span>}
                name="technologies"
                rules={[{ required: true, message: 'Please add at least 1 tag' }]}
              >
                <Select
                  mode="tags"
                  placeholder="Type technology and press enter (e.g. Next.js 14, Algolia, Stripe)"
                  tokenSeparators={[',']}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs font-bold text-slate-700">Executive Summary</span>}
                name="summary"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} placeholder="Brief description of the delivered solution..." className="bg-slate-50 border-slate-300" />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs font-bold text-slate-700">Architectural Highlights (1 per line)</span>}
                name="keyFeatures"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Sub-second TTFB&#10;Stripe checkout&#10;Ant Design layout" className="bg-slate-50 border-slate-300" />
              </Form.Item>

              <div className="flex items-center gap-8 py-2">
                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Display Order</span>}
                  name="order"
                  className="mb-0"
                >
                  <InputNumber min={1} max={99} />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold text-slate-700">Featured On Homepage</span>}
                  name="featured"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch className="bg-slate-300" />
                </Form.Item>
              </div>

              <Divider className="my-5 border-slate-200" />

              <div className="flex items-center justify-end gap-3">
                <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                  {editingProject ? 'Save Changes' : 'Publish Project'}
                </Button>
              </div>
            </Form>
          </div>

          {/* Right Column: Live Interactive Mockup Preview */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs text-slate-600 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Eye size={14} />
                  Live Mockup Preview
                </span>
                <span className="text-slate-500 font-semibold">Hover to Auto-Scroll</span>
              </div>

              <div className="mt-4">
                <ProjectMockup
                  screenshotUrl={watchScreenshot || '/mockups/nova-store.svg'}
                  title={watchTitle || 'Preview Title'}
                  liveUrl={watchLiveUrl}
                  height={280}
                  interactiveButtons={false}
                />
              </div>

              <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1 font-mono shadow-xs">
                <div>↕ <strong>Hover test:</strong> Move mouse over frame to test full-page 4.5s smooth scrolling.</div>
                <div>Live URL: <span className="text-emerald-700 font-bold">{watchLiveUrl}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              Changes reflect immediately on `/` once published.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
