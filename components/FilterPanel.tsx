'use client';

import { X } from 'lucide-react';
import type { FilterState } from '@/lib/types';
import { getFilterOptions } from '@/lib/data';
import { getSizeLabel, getFundingLabel, getRemoteLabel } from '@/lib/utils';

interface FilterPanelProps {
  filters: Partial<FilterState>;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const filterOptions = getFilterOptions();

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    if (key === 'search' || key === 'sort') return;
    const current = (filters[key] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: next });
  };

  const clearAll = () => {
    onFilterChange({
      search: filters.search,
      sort: filters.sort,
      industries: [],
      sizes: [],
      fundingStages: [],
      techStack: [],
      remotePolicy: [],
      culture: [],
    });
  };

  const hasFilters =
    (filters.industries?.length ?? 0) > 0 ||
    (filters.sizes?.length ?? 0) > 0 ||
    (filters.fundingStages?.length ?? 0) > 0 ||
    (filters.techStack?.length ?? 0) > 0 ||
    (filters.remotePolicy?.length ?? 0) > 0 ||
    (filters.culture?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-text">筛选条件</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            清除全部
          </button>
        )}
      </div>

      <FilterGroup
        title="排序方式"
        isSingle
        selected={filters.sort ? [filters.sort] : ['recommended']}
        options={[
          { value: 'recommended', label: '综合推荐' },
          { value: 'gemScore', label: '隐藏宝石分数' },
          { value: 'newest', label: '最新成立' },
          { value: 'size', label: '公司规模' },
        ]}
        onToggle={(value) =>
          onFilterChange({ ...filters, sort: value as FilterState['sort'] })
        }
      />

      <FilterGroup
        title="行业"
        selected={filters.industries || []}
        options={filterOptions.industries.map((v) => ({ value: v, label: v }))}
        onToggle={(v) => toggleFilter('industries', v)}
      />

      <FilterGroup
        title="规模"
        selected={filters.sizes || []}
        options={filterOptions.sizes.map((v) => ({ value: v, label: getSizeLabel(v) }))}
        onToggle={(v) => toggleFilter('sizes', v)}
      />

      <FilterGroup
        title="融资阶段"
        selected={filters.fundingStages || []}
        options={filterOptions.fundingStages.map((v) => ({ value: v, label: getFundingLabel(v) }))}
        onToggle={(v) => toggleFilter('fundingStages', v)}
      />

      <FilterGroup
        title="办公模式"
        selected={filters.remotePolicy || []}
        options={[
          { value: 'remote', label: '远程办公' },
          { value: 'hybrid', label: '混合办公' },
          { value: 'onsite', label: '办公室' },
        ]}
        onToggle={(v) => toggleFilter('remotePolicy', v)}
      />

      <FilterGroup
        title="技术栈"
        selected={filters.techStack || []}
        options={filterOptions.techStacks.map((v) => ({ value: v, label: v }))}
        onToggle={(v) => toggleFilter('techStack', v)}
        limit={10}
      />

      <FilterGroup
        title="文化标签"
        selected={filters.culture || []}
        options={filterOptions.cultures.map((v) => ({ value: v, label: v }))}
        onToggle={(v) => toggleFilter('culture', v)}
        limit={8}
      />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  isSingle,
  limit,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  isSingle?: boolean;
  limit?: number;
}) {
  const displayed = limit ? options.slice(0, limit) : options;

  return (
    <div>
      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
        {title}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {displayed.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => {
                if (isSingle) {
                  onToggle(opt.value);
                } else {
                  onToggle(opt.value);
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                active
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
