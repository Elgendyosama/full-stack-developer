import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent, getSeoConfig, updateSeoConfig } from '@/lib/store';
import { SiteContent, SeoConfig } from '@/lib/types';

export async function GET() {
  try {
    const siteContent = getSiteContent();
    const seoConfig = getSeoConfig();
    return NextResponse.json({
      success: true,
      data: { siteContent, seoConfig },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve settings';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, payload } = body;

    if (type === 'siteContent') {
      const updated = updateSiteContent(payload as SiteContent);
      return NextResponse.json({ success: true, data: updated, message: 'Site content updated successfully' });
    }

    if (type === 'seoConfig') {
      const updated = updateSeoConfig(payload as SeoConfig);
      return NextResponse.json({ success: true, data: updated, message: 'SEO configuration updated successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid settings type provided.' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save settings';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

