import companies from '@/data/companies.json';
import collections from '@/data/collections.json';
import type { Company, Collection, FilterState } from '@/lib/types';

export function getAllCompanies(): Company[] {
  return companies as Company[];
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return (companies as Company[]).find((c) => c.slug === slug);
}

export function getFilteredCompanies(filters: Partial<FilterState>): Company[] {
  let result = companies as Company[];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.techStack.some((t) => t.toLowerCase().includes(q)) ||
        c.culture.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.industries && filters.industries.length > 0) {
    result = result.filter((c) => filters.industries!.includes(c.industry));
  }

  if (filters.sizes && filters.sizes.length > 0) {
    result = result.filter((c) => filters.sizes!.includes(c.size));
  }

  if (filters.fundingStages && filters.fundingStages.length > 0) {
    result = result.filter((c) => filters.fundingStages!.includes(c.fundingStage));
  }

  if (filters.techStack && filters.techStack.length > 0) {
    result = result.filter((c) =>
      filters.techStack!.some((t) =>
        c.techStack.some((ct) => ct.toLowerCase().includes(t.toLowerCase()))
      )
    );
  }

  if (filters.remotePolicy && filters.remotePolicy.length > 0) {
    result = result.filter((c) => filters.remotePolicy!.includes(c.remotePolicy));
  }

  if (filters.culture && filters.culture.length > 0) {
    result = result.filter((c) =>
      filters.culture!.some((t) =>
        c.culture.some((ct) => ct.toLowerCase().includes(t.toLowerCase()))
      )
    );
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'gemScore':
        result.sort((a, b) => b.gemScore - a.gemScore);
        break;
      case 'newest':
        result.sort((a, b) => b.founded - a.founded);
        break;
      case 'size':
        result.sort((a, b) => {
          const sizeOrder: Record<string, number> = {
            '1000+': 5,
            '200-1000': 4,
            '50-200': 3,
            '1-50': 2,
          };
          return (sizeOrder[b.size] || 0) - (sizeOrder[a.size] || 0);
        });
        break;
      case 'recommended':
      default:
        result.sort((a, b) => b.gemScore - a.gemScore);
        break;
    }
  }

  return result;
}

export function getAllJobs() {
  const allJobs = (companies as Company[]).flatMap((c) =>
    c.jobs.map((j) => ({ ...j, company: { name: c.name, slug: c.slug, logo: c.logo } }))
  );
  allJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  return allJobs;
}

export function getFilteredJobs(filters: { search?: string; techStack?: string[]; remotePolicy?: string[] }) {
  let jobs = getAllJobs();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.name.toLowerCase().includes(q) ||
        j.techStack.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.techStack && filters.techStack.length > 0) {
    jobs = jobs.filter((j) =>
      filters.techStack!.some((t) =>
        j.techStack.some((jt) => jt.toLowerCase().includes(t.toLowerCase()))
      )
    );
  }

  if (filters.remotePolicy && filters.remotePolicy.length > 0) {
    jobs = jobs.filter((j) => filters.remotePolicy!.includes(j.remotePolicy));
  }

  return jobs;
}

export function getAllCollections(): Collection[] {
  return collections as Collection[];
}

export function getCollectionBySlug(slug: string): { collection: Collection; companies: Company[] } | undefined {
  const collection = (collections as Collection[]).find((c) => c.slug === slug);
  if (!collection) return undefined;
  return {
    collection,
    companies: (companies as Company[]).filter((c) => collection.companySlugs.includes(c.slug)),
  };
}

export function getSimilarCompanies(slug: string, limit = 4): Company[] {
  const company = getCompanyBySlug(slug);
  if (!company) return [];
  return (companies as Company[])
    .filter((c) => c.slug !== slug && c.industry === company.industry)
    .sort((a, b) => b.gemScore - a.gemScore)
    .slice(0, limit);
}

export function getFilterOptions() {
  const allCompanies = companies as Company[];

  const industries = [...new Set(allCompanies.map((c) => c.industry))].sort();
  const sizes = [...new Set(allCompanies.map((c) => c.size))];
  const fundingStages = [...new Set(allCompanies.map((c) => c.fundingStage))];
  const allTechStacks = [...new Set(allCompanies.flatMap((c) => c.techStack))].sort();
  const allCulture = [...new Set(allCompanies.flatMap((c) => c.culture))].sort();

  return { industries, sizes, fundingStages, techStacks: allTechStacks, cultures: allCulture };
}
