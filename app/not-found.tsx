import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold text-foreground mb-2">页面未找到</h1>
      <p className="text-muted-foreground mb-8">你访问的页面不存在或已被移除</p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </Button>
    </div>
  );
}
