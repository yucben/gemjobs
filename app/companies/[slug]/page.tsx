import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCompanyBySlug, getSimilarCompanies, getAllCompaniesList } from '@/lib/data';
import CompanyDetail from '@/components/CompanyDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCompaniesList().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: '公司未找到' };
  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const similarCompanies = getSimilarCompanies(slug);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <CompanyDetail company={company} similarCompanies={similarCompanies} />
    </div>
  );
}
