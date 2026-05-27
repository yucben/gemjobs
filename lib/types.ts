export interface Job {
  id: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  remotePolicy: 'remote' | 'hybrid' | 'onsite';
  salary?: string;
  techStack: string[];
  postedAt: string;
  description: string;
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  description: string;
  longDescription: string;
  highlights: string[];
  industry: string;
  size: string;
  fundingStage: string;
  founded: number;
  location: string;
  remotePolicy: 'remote' | 'hybrid' | 'onsite';
  techStack: string[];
  culture: string[];
  salaryTransparency: boolean;
  benefits: string[];
  gemScore: number;
  jobs: Job[];
  website?: string;
}

export interface JobWithCompany extends Job {
  company: {
    name: string;
    slug: string;
    logo: string;
  };
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  companySlugs: string[];
}

export type SortOption = 'recommended' | 'gemScore' | 'newest' | 'size';

export interface CompanyFilters {
  search: string;
  industries: string[];
  sizes: string[];
  fundingStages: string[];
  techStack: string[];
  remotePolicy: string[];
  culture: string[];
  sort: SortOption;
}

export interface JobFilters {
  search: string;
  techStack: string[];
  remotePolicy: string[];
}

export const DEFAULT_COMPANY_FILTERS: CompanyFilters = {
  search: '',
  industries: [],
  sizes: [],
  fundingStages: [],
  techStack: [],
  remotePolicy: [],
  culture: [],
  sort: 'recommended',
};
