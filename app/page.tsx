import Link from 'next/link';
import { ArrowRight, Gem, Sparkles, Zap } from 'lucide-react';
import { getFilteredCompanies, getAllCollections, getAllJobsList, getCollectionBySlug } from '@/lib/data';
import CompanyCard from '@/components/CompanyCard';
import JobCard from '@/components/JobCard';
import CollectionCard from '@/components/CollectionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const allCompanies = getFilteredCompanies({ sort: 'gemScore' });
  const gemCompanies = allCompanies.slice(0, 6);
  const recentJobs = getAllJobsList().slice(0, 6);
  const allCollections = getAllCollections().slice(0, 3);
  const collectionsWithCompanies = allCollections.map((c) => {
    const data = getCollectionBySlug(c.slug);
    return { collection: c, companies: data?.companies || [] };
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2czYtMi42ODYgNi02em0tNiAyMGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnptMC01YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="max-w-2xl">
            <Badge className="mb-6 px-3 py-1.5 bg-white/15 text-white border-0 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-1.5" />
              不只找工作，发现你不知道的好公司
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              发现值得你加入的
              <br />
              <span className="text-amber-300">好公司</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              传统求职平台让你海投简历，我们帮你先发现那些被忽视的优质公司。
              30 家精心筛选的公司，覆盖 AI、SaaS、开源、Web3 —— 从公司开始，找到真正适合你的位置。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-amber-50 shadow-lg shadow-black/10">
                <Link href="/companies">
                  探索公司
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Link href="/jobs">
                  浏览岗位
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Gem, value: '30+', label: '精选公司' },
            { icon: Zap, value: '80+', label: '在招岗位' },
            { icon: Sparkles, value: '7', label: '精选合集' },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-card rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-foreground/5 border border-border"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden Gems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Gem className="w-6 h-6 text-amber-500" />
              本周隐藏宝石
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              高隐藏宝石分数，知名度不高但值得加入的公司
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/companies?sort=gemScore">
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gemCompanies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">精选合集</h2>
            <p className="text-muted-foreground text-sm mt-1">按主题发现公司，总能找到适合你的</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/collections">
              全部合集
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collectionsWithCompanies.map(({ collection, companies }) => (
            <CollectionCard key={collection.slug} collection={collection} companies={companies} />
          ))}
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">最新岗位</h2>
            <p className="text-muted-foreground text-sm mt-1">最近更新的职位机会</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/jobs">
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
