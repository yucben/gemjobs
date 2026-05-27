import Link from 'next/link';
import type { Collection, Company } from '@/lib/types';
import { Card } from '@/components/ui/card';

export default function CollectionCard({
  collection,
  companies,
}: {
  collection: Collection;
  companies: Company[];
}) {
  return (
    <Link href={`/collections?slug=${collection.slug}`} className="block group">
      <Card className="p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
          {collection.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
        <div className="flex -space-x-2">
          {companies.slice(0, 5).map((c) => (
            <div
              key={c.slug}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-card flex items-center justify-center text-xs font-bold text-primary"
              title={c.name}
            >
              {c.name[0]}
            </div>
          ))}
          {companies.length > 5 && (
            <div className="w-8 h-8 rounded-lg bg-secondary border-2 border-card flex items-center justify-center text-xs text-muted-foreground font-medium">
              +{companies.length - 5}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
