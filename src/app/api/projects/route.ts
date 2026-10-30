import { NextRequest, NextResponse } from 'next/server';
import { getProjects, saveProject, deleteProject } from '@/lib/store';
import { Project } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tech = searchParams.get('technology');
    const industry = searchParams.get('industry');
    const search = searchParams.get('search')?.toLowerCase();

    let list = getProjects();

    if (tech && tech !== 'All') {
      list = list.filter((p) => p.technology === tech || p.technologies.some((t) => t.toLowerCase().includes(tech.toLowerCase())));
    }

    if (industry && industry !== 'All') {
      list = list.filter((p) => p.projectType === industry);
    }

    if (search) {
      list = list.filter((p) => 
        p.title.toLowerCase().includes(search) ||
        p.clientName.toLowerCase().includes(search) ||
        p.summary.toLowerCase().includes(search) ||
        p.technologies.some((t) => t.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Project;

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required fields.' },
        { status: 400 }
      );
    }

    if (!body.id) {
      body.id = 'proj-' + Date.now();
    }

    const saved = saveProject(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save project';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required.' }, { status: 400 });
    }

    const removed = deleteProject(id);
    if (!removed) {
      return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete project';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

