'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Briefcase, Building2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: '发现', icon: Sparkles },
  { href: '/companies', label: '公司', icon: Building2 },
  { href: '/jobs', label: '岗位', icon: Briefcase },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/companies?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <Sparkles className="w-6 h-6" />
            <span className="hidden sm:inline">GemJobs</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索公司、技术栈..."
                className="pl-9 pr-4 py-2 w-44 lg:w-64 rounded-xl border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
              />
            </div>
          </form>
        </div>

        <div className="flex md:hidden items-center gap-1 pb-3 overflow-x-auto">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
