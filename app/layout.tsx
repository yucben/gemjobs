import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'GemJobs — 发现值得你加入的好公司',
    template: '%s | GemJobs',
  },
  description:
    '不只找工作，更发现你不知道的好公司。减少求职信息差，从公司发现开始。',
  keywords: ['找工作', '公司评价', '求职', '远程工作', '科技公司'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
