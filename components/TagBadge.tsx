import { Badge } from '@/components/ui/badge';

export default function TagBadge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}) {
  return <Badge variant={variant}>{children}</Badge>;
}
