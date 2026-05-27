import Link from 'next/link';
import { MapPin, Users, Briefcase } from 'lucide-react';
import type { Company } from '@/lib/types';
import GemScore from './GemScore';
import TagBadge from './TagBadge';
import { getSizeLabel, getFundingLabel, getRemoteLabel } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/companies/${company.slug}`} className="block group">
      <Card className="p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
              {company.name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3" />
                {company.location}
              </div>
            </div>
          </div>
          <GemScore score={company.gemScore} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{company.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <TagBadge variant="primary">{company.industry}</TagBadge>
          <TagBadge>{getSizeLabel(company.size)}</TagBadge>
          <TagBadge variant="success">{getRemoteLabel(company.remotePolicy)}</TagBadge>
          {company.fundingStage === 'Bootstrapped' && (
            <TagBadge variant="warning">{getFundingLabel(company.fundingStage)}</TagBadge>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {getSizeLabel(company.size)}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {company.jobs.length} 个在招岗位
          </span>
        </div>
      </Card>
    </Link>
  );
}
