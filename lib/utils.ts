export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  return `${Math.floor(days / 30)} 个月前`;
}

export function getGemScoreColor(score: number): string {
  if (score >= 90) return 'text-amber-500';
  if (score >= 75) return 'text-emerald-500';
  if (score >= 60) return 'text-blue-500';
  return 'text-gray-500';
}

export function getGemScoreBg(score: number): string {
  if (score >= 90) return 'bg-amber-100 text-amber-800';
  if (score >= 75) return 'bg-emerald-100 text-emerald-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  return 'bg-gray-100 text-gray-800';
}

export function getSizeLabel(size: string): string {
  const map: Record<string, string> = {
    '1-50': '1-50 人',
    '50-200': '50-200 人',
    '200-1000': '200-1000 人',
    '1000+': '1000+ 人',
  };
  return map[size] || size;
}

export function getFundingLabel(stage: string): string {
  const map: Record<string, string> = {
    Seed: '种子轮',
    'Series A': 'A 轮',
    'Series B': 'B 轮',
    'Series C': 'C 轮',
    'Series D': 'D 轮',
    'Series E': 'E 轮',
    'Series I': '成熟期',
    Public: '已上市',
    Bootstrapped: '自举',
    'N/A': '不适用',
  };
  return map[stage] || stage;
}

export function getRemoteLabel(policy: string): string {
  const map: Record<string, string> = {
    remote: '远程办公',
    hybrid: '混合办公',
    onsite: '办公室',
  };
  return map[policy] || policy;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
