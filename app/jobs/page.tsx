'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getFilteredJobs } from '@/lib/data';
import type { JobFilters } from '@/lib/types';
import JobCard from '@/components/JobCard';
import { getRemoteLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const popularTech = ['TypeScript', 'React', 'Python', 'Go', 'Rust', 'PostgreSQL'];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [remoteFilters, setRemoteFilters] = useState<string[]>([]);

  const filters: Partial<JobFilters> = { search, techStack: techFilters, remotePolicy: remoteFilters };
  const jobs = useMemo(() => getFilteredJobs(filters), [search, techFilters, remoteFilters]);

  const toggleTech = (tech: string) => {
    setTechFilters((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const toggleRemote = (policy: string) => {
    setRemoteFilters((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy],
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">所有岗位</h1>
        <p className="text-muted-foreground text-sm">
          跨公司浏览所有在招岗位，按技术栈和办公模式筛选
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索岗位、公司或技术..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Quick filters */}
      <div className="mb-6 space-y-3">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-3">
            技术栈:
          </span>
          <span className="inline-flex flex-wrap gap-1.5">
            {popularTech.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 ${
                  techFilters.includes(tech)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {tech}
              </button>
            ))}
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-3">
            办公模式:
          </span>
          <span className="inline-flex flex-wrap gap-1.5">
            {['remote', 'hybrid', 'onsite'].map((p) => (
              <button
                key={p}
                onClick={() => toggleRemote(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 ${
                  remoteFilters.includes(p)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {getRemoteLabel(p)}
              </button>
            ))}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">共 {jobs.length} 个岗位</span>
      </div>

      {jobs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-20">
          <p className="text-lg font-medium text-muted-foreground mb-2">没有找到匹配的岗位</p>
          <p className="text-sm text-muted-foreground">试试调整搜索条件或筛选器</p>
        </Card>
      )}
    </div>
  );
}
