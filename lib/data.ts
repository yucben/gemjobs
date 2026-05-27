import Fuse from 'fuse.js';
import { cache } from 'react';
import companies from '@/data/companies.json';
import collections from '@/data/collections.json';
import type { Company, Collection, CompanyFilters, JobFilters, JobWithCompany } from '@/lib/types';

const allCompanies = companies as Company[];
const allCollections = collections as Collection[];

// ── Fuse.js instances (lazy) ────────────────────────────────

const companyFuse = new Fuse(allCompanies, {
  keys: [
    { name: 'name', weight: 4 },
    { name: 'description', weight: 2 },
    { name: 'industry', weight: 2 },
    { name: 'techStack', weight: 3 },
    { name: 'culture', weight: 1 },
    { name: 'location', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

function getAllJobs(): JobWithCompany[] {
  const jobs = allCompanies.flatMap((c) =>
    c.jobs.map((j) => ({
      ...j,
      company: { name: c.name, slug: c.slug, logo: c.logo },
    })),
  );
  jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  return jobs;
}

const allJobsList = getAllJobs();

const jobFuse = new Fuse(allJobsList, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'company.name', weight: 2 },
    { name: 'techStack', weight: 3 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.4,
});

// ── Company data ────────────────────────────────────────────

export const getFilteredCompanies = cache((filters: Partial<CompanyFilters> = {}): Company[] => {
  const f = { ...filters };

  // Fuzzy search
  if (f.search && f.search.trim()) {
    const results = companyFuse.search(f.search.trim());
    return applyFilters(
      results.map((r) => r.item),
      f,
    );
  }

  return applyFilters(allCompanies, f);
});

function applyFilters(rows: Company[], f: Partial<CompanyFilters>): Company[] {
  let result = rows;

  if (f.industries?.length) {
    result = result.filter((c) => f.industries!.includes(c.industry));
  }
  if (f.sizes?.length) {
    result = result.filter((c) => f.sizes!.includes(c.size));
  }
  if (f.fundingStages?.length) {
    result = result.filter((c) => f.fundingStages!.includes(c.fundingStage));
  }
  if (f.techStack?.length) {
    result = result.filter((c) =>
      f.techStack!.some((t) =>
        c.techStack.some((ct) => ct.toLowerCase().includes(t.toLowerCase())),
      ),
    );
  }
  if (f.remotePolicy?.length) {
    result = result.filter((c) => f.remotePolicy!.includes(c.remotePolicy));
  }
  if (f.culture?.length) {
    result = result.filter((c) =>
      f.culture!.some((t) => c.culture.some((ct) => ct.toLowerCase().includes(t.toLowerCase()))),
    );
  }

  // Sort
  const sort = f.sort || 'recommended';
  switch (sort) {
    case 'gemScore':
      result.sort((a, b) => b.gemScore - a.gemScore);
      break;
    case 'newest':
      result.sort((a, b) => b.founded - a.founded);
      break;
    case 'size': {
      const order: Record<string, number> = { '1000+': 5, '200-1000': 4, '51-200': 3, '11-50': 2, '1-10': 1 };
      result.sort((a, b) => (order[b.size] || 0) - (order[a.size] || 0));
      break;
    }
    default:
      result.sort((a, b) => b.gemScore - a.gemScore);
  }

  return result;
}

export const getCompanyBySlug = cache((slug: string): Company | undefined => {
  return allCompanies.find((c) => c.slug === slug);
});

export const getAllCompaniesList = cache((): Company[] => allCompanies);

export const getSimilarCompanies = cache((slug: string, limit = 4): Company[] => {
  const company = getCompanyBySlug(slug);
  if (!company) return [];
  return allCompanies
    .filter((c) => c.slug !== slug && c.industry === company.industry)
    .sort((a, b) => b.gemScore - a.gemScore)
    .slice(0, limit);
});

// ── Job data ────────────────────────────────────────────────

export const getAllJobsList = cache((): JobWithCompany[] => allJobsList);

export const getFilteredJobs = cache((filters: Partial<JobFilters> = {}): JobWithCompany[] => {
  let jobs = allJobsList;

  if (filters.search?.trim()) {
    const results = jobFuse.search(filters.search.trim());
    jobs = results.map((r) => r.item);
  }

  if (filters.techStack?.length) {
    jobs = jobs.filter((j) =>
      filters.techStack!.some((t) =>
        j.techStack.some((jt) => jt.toLowerCase().includes(t.toLowerCase())),
      ),
    );
  }

  if (filters.remotePolicy?.length) {
    jobs = jobs.filter((j) => filters.remotePolicy!.includes(j.remotePolicy));
  }

  return jobs;
});

// ── Collections ─────────────────────────────────────────────

export const getAllCollections = cache((): Collection[] => allCollections);

export const getCollectionBySlug = cache(
  (slug: string): { collection: Collection; companies: Company[] } | undefined => {
    const collection = allCollections.find((c) => c.slug === slug);
    if (!collection) return undefined;
    return {
      collection,
      companies: allCompanies.filter((c) => collection.companySlugs.includes(c.slug)),
    };
  },
);

// ── Filter options ──────────────────────────────────────────

export const getFilterOptions = cache(() => {
  const industries = [...new Set(allCompanies.map((c) => c.industry))].sort();
  const sizes = [...new Set(allCompanies.map((c) => c.size))];
  const fundingStages = [...new Set(allCompanies.map((c) => c.fundingStage))];
  const techStacks = [...new Set(allCompanies.flatMap((c) => c.techStack))].sort();
  const cultures = [...new Set(allCompanies.flatMap((c) => c.culture))].sort();

  return { industries, sizes, fundingStages, techStacks, cultures };
});
