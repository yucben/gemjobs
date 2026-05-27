'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllCollections, getCollectionBySlug, getAllCompaniesList } from '@/lib/data';
import CompanyCard from '@/components/CompanyCard';
import CollectionCard from '@/components/CollectionCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('slug');

  const allCollections = getAllCollections();

  if (activeSlug) {
    const activeCollection = getCollectionBySlug(activeSlug);
    if (!activeCollection) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-20">
            <p className="text-muted-foreground">合集未找到</p>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/collections">
            <ArrowLeft className="w-4 h-4" />
            返回所有合集
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {activeCollection.collection.title}
        </h1>
        <p className="text-muted-foreground mb-8">{activeCollection.collection.description}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCollection.companies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
        {activeCollection.companies.length === 0 && (
          <Card className="text-center py-20">
            <p className="text-muted-foreground">此合集暂不包含公司</p>
          </Card>
        )}
      </div>
    );
  }

  const collectionsWithCompanies = allCollections.map((c) => {
    const data = getCollectionBySlug(c.slug);
    return { collection: c, companies: data?.companies || [] };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">精选合集</h1>
      <p className="text-muted-foreground mb-8">
        按主题发现公司——从 AI 新星到全员远程，每个合集都有独特的视角
      </p>
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
    <Suspense fallback={<LoadingSkeleton />}>
      <CollectionsContent />
    </Suspense>
  );
}
