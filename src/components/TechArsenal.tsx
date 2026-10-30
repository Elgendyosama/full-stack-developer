'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, Filter, ExternalLink, Code2 } from 'lucide-react';

export interface TechItem {
  name: string;
  category: 'frontend' | 'state' | 'animation' | 'backend' | 'tooling' | 'productivity';
  icon: string; // SVG data or clean SVG representation
  docUrl?: string;
}

export const techArsenalList: TechItem[] = [
  // Row 1
  {
    name: 'HTML',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'Javascript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React.JS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'React Query',
    category: 'state',
    icon: 'https://raw.githubusercontent.com/TanStack/query/main/media/repo-header.png',
  },

  // Row 2
  {
    name: 'React Hook Form',
    category: 'state',
    icon: 'https://react-hook-form.com/images/logo/react-hook-form-logo-only.png',
  },
  {
    name: 'Next JS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Next Auth',
    category: 'state',
    icon: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  {
    name: 'Redux',
    category: 'state',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },
  {
    name: 'Redux Toolkit',
    category: 'state',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },

  // Row 3
  {
    name: 'RTK Query',
    category: 'state',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },
  {
    name: 'Typescript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Node.JS',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'SCSS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  },
  {
    name: 'Tailwind',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },

  // Row 4
  {
    name: 'Ant Design',
    category: 'frontend',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  {
    name: 'Framer Motion',
    category: 'animation',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg',
  },
  {
    name: 'Chart JS',
    category: 'animation',
    icon: 'https://www.chartjs.org/img/chartjs-logo.svg',
  },
  {
    name: 'Github',
    category: 'tooling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    name: 'APIs',
    category: 'backend',
    icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
  },

  // Row 5
  {
    name: 'Postman',
    category: 'tooling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  },
  {
    name: 'Axios',
    category: 'state',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg',
  },
  {
    name: 'Figma',
    category: 'productivity',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Bootstrap',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'Material UI',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
  },

  // Row 6
  {
    name: 'EcmaScript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'JQuery',
    category: 'animation',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  },
  {
    name: 'JSON',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
  },
  {
    name: 'Jest',
    category: 'tooling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  },
  {
    name: 'AJAX',
    category: 'state',
    icon: 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png',
  },

  // Row 7
  {
    name: 'Canvas',
    category: 'animation',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'Command Line',
    category: 'tooling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  },
  {
    name: 'SQL',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },

  // Row 8
  {
    name: 'Pug JS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pug/pug-original.svg',
  },
  {
    name: 'Gulp JS',
    category: 'tooling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gulp/gulp-plain.svg',
  },
  {
    name: 'Prisma',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Click Up',
    category: 'productivity',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    name: 'Trello',
    category: 'productivity',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
  },

  // Row 9
  {
    name: 'Notion',
    category: 'productivity',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
  },
  {
    name: 'Slack',
    category: 'productivity',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
  },
];

interface TechArsenalProps {
  onSelectTool?: (toolName: string) => void;
}

export const TechArsenal: React.FC<TechArsenalProps> = ({ onSelectTool }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Technologies', count: techArsenalList.length },
    { id: 'frontend', label: 'Frontend & Core', count: 12 },
    { id: 'state', label: 'State & Data Fetching', count: 8 },
    { id: 'animation', label: 'Animation & Graphics', count: 4 },
    { id: 'backend', label: 'Backend & Databases', count: 7 },
    { id: 'tooling', label: 'Tooling & Testing', count: 5 },
    { id: 'productivity', label: 'Productivity & Collab', count: 6 },
  ];

  const filteredTools = techArsenalList.filter((tool) => {
    if (activeCategory !== 'all' && tool.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      return tool.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    }
    return true;
  });

  return (
    <section id="tech-arsenal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Code2 size={14} className="text-emerald-600" />
          Technical Proficiency &amp; Arsenal
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Tools, Frameworks &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Full-Stack Ecosystem
          </span>
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          The verified suite of modern programming languages, libraries, databases, and DevOps tools we leverage to engineer robust digital solutions.
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border shadow-xs ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200/90'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tools Grid matching Screenshot 2 exactly */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            onClick={() => {
              if (onSelectTool) onSelectTool(tool.name);
            }}
            className="group relative bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-emerald-400 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2.5 shadow-xs hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer"
            title={`View ${tool.name} projects`}
          >
            {/* Left: Tool Icon / Logo */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200"
                onError={(e) => {
                  // Fallback for image loading error
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Right: Blue Capsule Pill matching Screenshot 2 */}
            <div className="flex-1 max-w-[140px] bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-md py-1 px-2.5 flex items-center justify-center shadow-xs transition-colors">
              <span className="text-[11px] sm:text-xs font-bold tracking-tight text-white truncate text-center">
                {tool.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Arsenal Bottom Stat Bar */}
      <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900">
            42+ Core Technologies Mastered &amp; Deployed
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Click any badge above to filter corresponding projects in the showcase below
        </div>
      </div>
    </section>
  );
};

