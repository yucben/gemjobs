import Link from 'next/link';
import type { Collection, Company } from '@/lib/types';

export default function CollectionCard({
  collection,
  companies,
}: {
  collection: Collection;
  companies: Company[];
}) {
  return (
    <Link
      href={`/collections?slug=${collection.slug}`}
      className="block p-5 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group"
    >
      <h3 className="font-semibold text-text group-hover:text-primary transition-colors mb-1">
        {collection.title}
      </h3>
      <p className="text-sm text-text-muted mb-4">{collection.description}</p>
      <div className="flex -space-x-2">
        {companies.slice(0, 5).map((c) => (
          <div
            key={c.slug}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-white flex items-center justify-center text-xs font-bold text-primary"
            title={c.name}
          >
            {c.name[0]}
          </div>
        ))}
        {companies.length > 5 && (
          <div className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-text-muted font-medium">
            +{companies.length - 5}
          </div>
        )}
      </div>
    </Link>
  );
}
