import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getSizeLabel(size: string): string {
  const map: Record<string, string> = {
    '1-10': '1-10 人',
    '11-50': '11-50 人',
    '51-200': '51-200 人',
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
    IPO: '已上市',
    Bootstrapped: '自举',
    Public: '已上市',
    Acquired: '已被收购',
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

export function getGemScoreBg(score: number): string {
  if (score >= 90) return 'bg-amber-50 text-amber-700';
  if (score >= 75) return 'bg-emerald-50 text-emerald-700';
  if (score >= 60) return 'bg-blue-50 text-blue-700';
  return 'bg-gray-100 text-gray-500';
}
