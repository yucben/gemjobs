'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilteredCompanies } from '@/lib/data';
import type { FilterState } from '@/lib/types';
import CompanyCard from '@/components/CompanyCard';
import FilterPanel from '@/components/FilterPanel';
import { Search, SlidersHorizontal, X } from 'lucide-react';

function CompaniesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<Partial<FilterState>>({
    search: initialSearch,
    industries: [],
    sizes: [],
    fundingStages: [],
    techStack: [],
    remotePolicy: [],
    culture: [],
    sort: 'recommended',
  });
  const [showFilters, setShowFilters] = useState(false);

  const companies = useMemo(() => getFilteredCompanies(filters), [filters]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text mb-2">发现好公司</h1>
        <p className="text-text-muted text-sm">按行业、规模、技术栈等维度筛选，找到最适合你的公司</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="搜索公司、技术栈、文化..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            showFilters
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-text hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">筛选</span>
        </button>
        {(filters.search || companies.length !== getFilteredCompanies({}).length) && (
          <span className="text-xs text-text-muted">
            找到 {companies.length} 家公司
          </span>
        )}
      </div>

      <div className="flex gap-8">
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 shrink-0`}
        >
          <div className="lg:sticky lg:top-24 bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <span className="font-semibold text-sm">筛选条件</span>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel filters={filters} onFilterChange={setFilters} />
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
            <div className="text-center py-20">
              <p className="text-lg font-medium text-text-muted mb-2">没有找到匹配的公司</p>
              <p className="text-sm text-text-muted">试试调整筛选条件</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function CompaniesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<div className="text-center py-20 text-text-muted">加载中...</div>}>
        <CompaniesContent />
      </Suspense>
    </div>
  );
}
