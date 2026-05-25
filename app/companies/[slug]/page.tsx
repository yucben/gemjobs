import { notFound } from 'next/navigation';
import { getCompanyBySlug, getSimilarCompanies, getAllCompanies } from '@/lib/data';
import CompanyDetail from '@/components/CompanyDetail';

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({ slug: c.slug }));
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
