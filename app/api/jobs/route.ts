import { NextRequest, NextResponse } from 'next/server';
import { getFilteredJobs } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    search: searchParams.get('search') || undefined,
    techStack: searchParams.getAll('techStack'),
    remotePolicy: searchParams.getAll('remotePolicy'),
  };

  const jobs = getFilteredJobs(filters);

  return NextResponse.json({ jobs });
}
