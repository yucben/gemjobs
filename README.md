# GemJobs — 发现值得你加入的好公司

> 求职最大的信息差不是"找不到工作"，而是不知道有哪些好公司。

GemJobs 是一个以**公司发现**为核心的求职平台。传统求职网站让你搜岗位、海投简历——GemJobs 反过来，先帮你发现那些被忽视的优质公司，再看到它们的在招岗位。

## 核心功能

- **隐藏宝石分数** — 每家公司的"知名度 vs 质量"综合评分，分数越高意味着越被低估
- **多维度筛选** — 按行业、规模、融资阶段、技术栈、办公模式、文化标签精准发现公司
- **公司详情页** — 深度了解技术栈、文化、福利、融资背景
- **精选合集** — "AI 创业新星"、"全员远程"、"开源商业化"等主题合集
- **岗位浏览** — 跨公司浏览所有在招岗位

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (Turbopack) |
| 语言 | TypeScript 5.8 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 图标 | Lucide React |
| 搜索 | Fuse.js 模糊搜索 |
| 工具 | Biome (lint + format) |
| 数据 | 内置 JSON（30 家公司，80+ 岗位） |

## 在线访问

🌐 **https://yucben.github.io/gemjobs**

## 本地开发

```bash
npm install
npm run dev     # 开发服务器 → http://localhost:3000
npm run build   # 静态导出 → out/
```

## 部署

push 到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。
配置见 `.github/workflows/deploy.yml`。

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── page.tsx            # 首页 — Server Component
│   ├── loading.tsx         # 骨架屏
│   ├── not-found.tsx       # 404 页面
│   ├── companies/          # 公司列表 & 详情
│   ├── jobs/               # 岗位列表
│   └── collections/        # 精选合集
├── components/
│   ├── ui/                 # shadcn/ui 组件 (Button, Badge, Card, Input, Skeleton)
│   └── *.tsx               # 业务组件
├── data/                   # Mock 数据（30家公司）
└── lib/                    # 类型、数据访问层、工具函数
```

## 隐藏宝石分数

GemScore 是一个 0-100 的评分，反映公司的"知名度 vs 质量"比：

- **90+** 🟡 — 极度被低估（如 Carrd、Midjourney、Astral）
- **75-89** 🟢 — 优质冷门公司
- **60-74** 🔵 — 行业内有口碑
- **<60** ⚪ — 知名公司或信息不充分

分数越高的公司，知道的人越少，但质量越好。

## 数据来源

当前使用精选的 mock 数据集（30 家公司），涵盖：
- AI/ML、Developer Tools、Cloud、SaaS、Web3、Productivity 等行业
- 种子轮到上市公司的不同阶段
- 远程优先、混合、办公室等多种工作模式

后续可接入真实数据源（Crunchbase、LinkedIn、Glassdoor 等）。

## License

MIT
