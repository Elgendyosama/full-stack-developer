'use client';

import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

interface AntdProviderProps {
  children: React.ReactNode;
}

export const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm, // Light modern theme
          token: {
            colorPrimary: '#22a344',
            colorInfo: '#22a344',
            colorSuccess: '#16a34a',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            borderRadius: 12,
            wireframe: false,
            fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
            colorBgBase: '#ffffff',
            colorBgContainer: '#ffffff',
            colorBgLayout: '#f8fafc',
            colorBgElevated: '#ffffff',
            colorBorder: '#e2e8f0',
            colorBorderSecondary: '#f1f5f9',
            colorText: '#0f172a',
            colorTextSecondary: '#475569',
            colorTextDescription: '#64748b',
          },
          components: {
            Layout: {
              headerBg: '#ffffff',
              headerColor: '#0f172a',
              bodyBg: '#f8fafc',
            },
            Button: {
              controlHeight: 42,
              borderRadius: 10,
              fontWeight: 600,
              primaryShadow: '0 2px 4px rgba(34, 163, 68, 0.2)',
            },
            Input: {
              controlHeight: 42,
              borderRadius: 10,
              colorBgContainer: '#ffffff',
              colorBorder: '#cbd5e1',
            },
            Select: {
              controlHeight: 42,
              borderRadius: 10,
              colorBgContainer: '#ffffff',
              colorBorder: '#cbd5e1',
            },
            Modal: {
              contentBg: '#ffffff',
              headerBg: '#ffffff',
              borderRadiusLG: 16,
            },
            Table: {
              colorBgContainer: '#ffffff',
              headerBg: '#f8fafc',
              rowHoverBg: '#f1f5f9',
              borderColor: '#e2e8f0',
            },
            Card: {
              colorBgContainer: '#ffffff',
              colorBorderSecondary: '#e2e8f0',
              borderRadiusLG: 16,
            },
            Tabs: {
              itemSelectedColor: '#22a344',
              inkBarColor: '#22a344',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};
