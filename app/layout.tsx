import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'GemJobs - 发现值得你加入的好公司',
  description: '不只找工作，更发现你不知道的好公司。减少求职信息差，从公司发现开始。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
