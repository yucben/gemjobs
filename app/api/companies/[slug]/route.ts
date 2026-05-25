import { NextRequest, NextResponse } from 'next/server';
import { getCompanyBySlug, getSimilarCompanies } from '@/lib/data';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  const similar = getSimilarCompanies(slug);

  return NextResponse.json({ company, similarCompanies: similar });
}
