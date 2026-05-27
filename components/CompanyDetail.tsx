import type { Company } from '@/lib/types';
import GemScore from './GemScore';
import TagBadge from './TagBadge';
import JobCard from './JobCard';
import CompanyCard from './CompanyCard';
import { getSizeLabel, getFundingLabel, getRemoteLabel } from '@/lib/utils';
import { MapPin, Users, Calendar, Globe, Sparkles, Code, Heart, Star, ThumbsUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function CompanyDetail({
  company,
  similarCompanies,
}: {
  company: Company;
  similarCompanies: Company[];
}) {
  const jobsWithCompany = company.jobs.map((j) => ({
    ...j,
    company: { name: company.name, slug: company.slug, logo: company.logo },
  }));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
            {company.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
                <p className="text-muted-foreground mt-1">{company.description}</p>
              </div>
              <GemScore score={company.gemScore} size="lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <TagBadge variant="primary">{company.industry}</TagBadge>
          <TagBadge>{getSizeLabel(company.size)}</TagBadge>
          <TagBadge variant="success">{getRemoteLabel(company.remotePolicy)}</TagBadge>
          <TagBadge variant="warning">{getFundingLabel(company.fundingStage)}</TagBadge>
          {company.salaryTransparency && <TagBadge>薪资透明</TagBadge>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {company.location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            {getSizeLabel(company.size)}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {company.founded} 年成立
          </div>
          {company.website && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                官网
              </a>
            </div>
          )}
        </div>
      </Card>

      {/* Highlights */}
      <Card className="p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-amber-500" />
          为什么值得加入
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {company.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              {h}
            </li>
          ))}
        </ul>
      </Card>

      {/* Tech Stack & Culture */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            技术栈
          </h2>
          <div className="flex flex-wrap gap-2">
            {company.techStack.map((tech) => (
              <TagBadge key={tech} variant="primary">
                {tech}
              </TagBadge>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            文化 & 福利
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {company.culture.map((c) => (
              <TagBadge key={c}>{c}</TagBadge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {company.benefits.map((b) => (
              <TagBadge key={b} variant="success">
                {b}
              </TagBadge>
            ))}
          </div>
        </Card>
      </div>

      {/* Long description */}
      <Card className="p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          公司介绍
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{company.longDescription}</p>
      </Card>

      {/* Open Jobs */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          在招岗位 ({jobsWithCompany.length})
        </h2>
        {jobsWithCompany.length > 0 ? (
          <div className="space-y-3">
            {jobsWithCompany.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-muted-foreground">暂无公开岗位</p>
          </Card>
        )}
      </div>

      {/* Similar Companies */}
      {similarCompanies.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">相似公司</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {similarCompanies.map((c) => (
              <CompanyCard key={c.slug} company={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
