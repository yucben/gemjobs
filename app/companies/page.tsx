'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { getFilteredCompanies } from '@/lib/data';
import type { CompanyFilters } from '@/lib/types';
import { DEFAULT_COMPANY_FILTERS } from '@/lib/types';
import CompanyCard from '@/components/CompanyCard';
import FilterPanel from '@/components/FilterPanel';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-6" />
      <Skeleton className="h-10 w-full max-w-md mb-6" />
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function CompaniesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<Partial<CompanyFilters>>({
    ...DEFAULT_COMPANY_FILTERS,
    search: initialSearch,
  });
  const [showFilters, setShowFilters] = useState(false);

  const companies = useMemo(() => getFilteredCompanies(filters), [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">发现好公司</h1>
        <p className="text-muted-foreground text-sm">
          按行业、规模、技术栈等维度筛选，找到最适合你的公司
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="搜索公司、技术栈、文化..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            showFilters
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-foreground hover:bg-secondary'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">筛选</span>
        </button>
        {companies.length > 0 && (
          <span className="text-xs text-muted-foreground">找到 {companies.length} 家公司</span>
        )}
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
          <div className="lg:sticky lg:top-24">
            <Card className="p-5">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <span className="font-semibold text-sm">筛选条件</span>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel filters={filters} onFilterChange={setFilters} />
            </Card>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {companies.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {companies.map((company) => (
                <CompanyCard key={company.slug} company={company} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-20">
              <p className="text-lg font-medium text-muted-foreground mb-2">没有找到匹配的公司</p>
              <p className="text-sm text-muted-foreground">试试调整筛选条件或搜索关键词</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CompaniesContent />
    </Suspense>
  );
}
