'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getAllCollections, getCollectionBySlug, getAllCompanies } from '@/lib/data';
import CompanyCard from '@/components/CompanyCard';
import CollectionCard from '@/components/CollectionCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('slug');

  const allCollections = getAllCollections();
  const allCompanies = getAllCompanies();

  const activeCollection = activeSlug ? getCollectionBySlug(activeSlug) : null;

  if (activeCollection) {
    return (
      <div>
        <Link
          href="/collections"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回所有合集
        </Link>
        <h1 className="text-2xl font-bold text-text mb-2">{activeCollection.collection.title}</h1>
        <p className="text-text-muted mb-8">{activeCollection.collection.description}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCollection.companies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
        {activeCollection.companies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">此合集暂不包含公司</p>
          </div>
        )}
      </div>
    );
  }

  const collectionsWithCompanies = allCollections.map((c) => {
    const data = getCollectionBySlug(c.slug);
    return { collection: c, companies: data?.companies || [] };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">精选合集</h1>
      <p className="text-text-muted mb-8">按主题发现公司——从 AI 新星到全员远程，每个合集都有独特的视角</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collectionsWithCompanies.map(({ collection, companies }) => (
          <CollectionCard key={collection.slug} collection={collection} companies={companies} />
        ))}
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<div className="text-center py-20 text-text-muted">加载中...</div>}>
        <CollectionsContent />
      </Suspense>
    </div>
  );
}
