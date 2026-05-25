import { NextRequest, NextResponse } from 'next/server';
import { getFilteredCompanies, getFilterOptions } from '@/lib/data';
import type { FilterState } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters: Partial<FilterState> = {
    search: searchParams.get('search') || undefined,
    industries: searchParams.getAll('industry'),
    sizes: searchParams.getAll('size'),
    fundingStages: searchParams.getAll('fundingStage'),
    techStack: searchParams.getAll('techStack'),
    remotePolicy: searchParams.getAll('remotePolicy'),
    culture: searchParams.getAll('culture'),
    sort: (searchParams.get('sort') as FilterState['sort']) || 'recommended',
  };

  const companies = getFilteredCompanies(filters);
  const filterOptions = getFilterOptions();

  return NextResponse.json({ companies, filterOptions });
}
