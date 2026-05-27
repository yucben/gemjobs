import { Gem } from 'lucide-react';
import { cn, getGemScoreBg } from '@/lib/utils';

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
  lg: 'px-3 py-1.5 text-base gap-2',
};

const iconSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

export default function GemScore({
  score,
  size = 'sm',
}: {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        getGemScoreBg(score),
        sizeStyles[size],
      )}
    >
      <Gem className={cn(iconSizes[size], 'fill-current')} />
      {score}
    </span>
  );
}
