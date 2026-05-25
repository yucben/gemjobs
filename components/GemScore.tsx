import { Gem } from 'lucide-react';
import { getGemScoreBg } from '@/lib/utils';

export default function GemScore({ score, size = 'sm' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const bg = getGemScoreBg(score);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  const iconSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${bg} ${sizeClasses[size]}`}>
      <Gem className={`${iconSizes[size]} fill-current`} />
      {score}
    </span>
  );
}
