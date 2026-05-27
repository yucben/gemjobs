import Link from 'next/link';
import { MapPin, Clock, Building2 } from 'lucide-react';
import type { JobWithCompany } from '@/lib/types';
import TagBadge from './TagBadge';
import { formatDate, getRemoteLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function JobCard({ job }: { job: JobWithCompany }) {
  return (
    <Card className="p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold shrink-0">
          {job.company.name[0]}
        </div>
        <div className="min-w-0">
          <Link
            href={`/companies/${job.company.slug}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {job.title}
          </Link>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <Building2 className="w-3 h-3" />
            <Link
              href={`/companies/${job.company.slug}`}
              className="hover:text-primary transition-colors"
            >
              {job.company.name}
            </Link>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{job.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.techStack.slice(0, 4).map((tech) => (
          <TagBadge key={tech}>{tech}</TagBadge>
        ))}
        {job.techStack.length > 4 && <TagBadge>+{job.techStack.length - 4}</TagBadge>}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDate(job.postedAt)}
        </span>
        <span className="ml-auto">
          <TagBadge variant="success">{getRemoteLabel(job.remotePolicy)}</TagBadge>
        </span>
        {job.salary && (
          <span className="text-emerald-600 font-medium">{job.salary}</span>
        )}
      </div>
    </Card>
  );
}
