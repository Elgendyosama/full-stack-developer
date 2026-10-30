import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Admin Dashboard | Osama Elgendy Agency',
  description: 'Enterprise administrative portal for portfolio showcase management, technical SEO suite, and content CMS.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#f8fafc] text-slate-900">{children}</div>;
}
