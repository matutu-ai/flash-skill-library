# Flash Skill Archive

Flash Skill Archive 是一个 GitHub 驱动的 AI Skill Marketplace，也是面向 AI Skills、Prompts、Agents 与 Workflows 的公开知识库。

项目将每个公开 GitHub Skill 仓库整理为一张唯一档案卡，通过 YAML 管理内容，并自动生成搜索索引、分类、详情页、SEO 文件和只读 API。目前收录 8 个唯一公开仓库，遵循“一仓库一卡”的规则。

当前可运行站点位于 `public/`。升级前的原始版本保存在 `final/` 和 `backup-original/`，对应哈希记录在 `PHASE-1-ORIGINAL-SHA256.txt`。

## 功能

- GitHub 仓库级 Skill 收录与去重
- Fuse.js 中文和英文实时搜索
- AI 视频、AI 图片、GEO、Agent、自动化和 Prompt 分类
- 自动生成 Skill 详情页
- Prompt 一键复制
- 每个 Skill 直接进入对应 GitHub 仓库和正式入口
- Canonical、Open Graph、Twitter Card 和 Schema.org 结构化数据
- 自动生成 Sitemap 与 Robots
- GitHub Pages 自动部署
- Cloudflare Pages、CDN、HTTPS 和自定义域名兼容
- `GET /api/skills` 只读接口与静态 JSON 快照
- Supabase、PostgreSQL 和向量数据库字段预留

## 项目结构

```text
flash-skill-library/
├── app/
│   └── api/
│       ├── README.md             # API 与未来数据库映射
│       └── skills.schema.json    # API JSON Schema
├── functions/
│   └── api/
│       └── skills.js             # Cloudflare Pages /api/skills
├── public/
│   ├── api/
│   │   └── skills.json           # 公开 API 静态快照
│   ├── assets/                   # CSS、JS、Fuse.js、图标和预览图
│   ├── skills/{skill-id}/        # 自动生成的详情页和 SKILL.md
│   ├── index.html                # 首页
│   ├── sitemap.xml
│   └── robots.txt
├── skills/
│   └── {skill-id}/
│       ├── skill.yaml            # 唯一结构化数据源
│       ├── README.md             # 仓库整理说明
│       ├── prompt.md             # Prompt 来源
│       └── SKILL.md              # 公开入口或仓库集合说明
├── data/
│   ├── skills.json               # 前端完整 Skill 索引
│   └── categories.json           # 分类及数量
├── scripts/
│   └── generate-skills.js        # 数据与页面生成器
├── .github/workflows/
│   └── deploy.yml                # GitHub Pages 自动部署
├── backup-original/              # Phase 1 原始项目备份
├── final/                        # 升级前原始站点
├── qa/                           # 各阶段机器验收结果
├── package.json
├── package-lock.json
├── wrangler.toml                 # Cloudflare Pages 配置
└── README.md
```

## 本地运行

环境要求：

- Node.js 22
- npm
- Python 3，用于本地静态服务器

安装依赖并生成站点：

```bash
npm ci
npm run generate
```

启动本地预览：

```bash
npm start
```

访问：

```text
http://127.0.0.1:8000/
```

如果没有 `package-lock.json`，首次开发安装可以使用 `npm install`；仓库已经包含锁文件，日常开发和 CI 推荐使用 `npm ci`。

## 添加一个 Skill

### 1. 确认仓库唯一

每个前台条目必须对应一个公开 GitHub 仓库。添加前先检查 `skills/` 和 `data/skills.json`，不要为同一个仓库创建多张卡片。

`github` 必须是仓库根地址：

```text
https://github.com/{owner}/{repo}
```

`entry_url` 必须属于同一个仓库，可以指向仓库内正式的 `SKILL.md` 或集合入口。

### 2. 创建目录和文件

```text
skills/{skill-id}/
├── skill.yaml
├── README.md
├── prompt.md
└── SKILL.md
```

`skill-id` 只使用小写字母、数字和连字符，并且必须与目录名一致。

### 3. 编写 `skill.yaml`

下面的示例包含当前生成器要求的字段：

```yaml
id: example-skill
order: 9
catalog_status: active

name: Example Skill
subtitle: 一句话说明核心价值
description: 说明这个 Skill 解决的问题和主要能力。

category: Agent
category_label: Agent
category_key: agent

tags:
  - Agent
  - Workflow

model:
  - 通用

version: v1.0.0
author: example-author
prompt: prompt.md

workflow:
  - 读取真实输入
  - 按步骤完成任务
  - 检查并交付结果

use_cases:
  - 适用场景一
  - 适用场景二

included_skills:
  - example-skill

github: https://github.com/example-author/example-skill
created: "2026-09-09"
updated: "2026-09-09"

input: 用户需要提供的真实资料。

output:
  - 输出内容一
  - 输出内容二

requirements:
  - 使用前需要满足的条件。

platform_usage:
  - name: 豆包 / 通义千问
    summary: 根据正式 Skill 入口提供资料并执行工作流。
    steps:
      - 上传或粘贴正式 Skill 入口和任务资料。
      - 按页面给出的执行口令运行。
    notes:
      - 以正式 Skill 入口中的平台限制为准。

example: 一个简短、具体的使用示例。
icon: spark
source_label: example-author/example-skill
entry_url: https://github.com/example-author/example-skill/blob/main/SKILL.md
entry_type: single_skill
file_name: skills/example-skill/SKILL.md
license: MIT
license_note: 按仓库 LICENSE 条款使用。
visibility: public
```

推荐使用以下标准 `category_key`：

| `category_key` | 前台分类 |
|---|---|
| `video` | AI视频 |
| `image` | AI图片 |
| `geo` | GEO |
| `agent` | Agent |
| `automation` | 自动化 |
| `prompt` | Prompt |

只有同时满足 `catalog_status: active` 和 `visibility: public` 的条目会进入前台。

### 4. 编写 Prompt 和入口说明

`prompt.md` 的第一个 fenced code block 是前台和 API 使用的 Prompt 内容：

````markdown
# Prompt

```text
在这里填写可直接使用的 Prompt。
```
````

`SKILL.md` 保存该仓库的正式 Skill 入口或集合说明。`README.md` 可以记录来源、整理规则和维护说明。

### 5. 生成并检查

```bash
npm run generate
npm start
```

生成器会检查：

- id 格式和目录名是否一致
- 必填字段与数组字段
- GitHub 仓库是否重复
- `entry_url` 是否属于对应仓库
- Prompt 是否存在并包含 fenced code block
- 分类是否可以映射
- `file_name` 是否指向当前 Skill
- 条目是否公开

校验失败时生成器会停止，不会静默加入无效卡片。

## 自动生成内容

`npm run generate` 会更新：

- `data/skills.json`
- `data/categories.json`
- `public/assets/catalog.js`
- `public/assets/fuse.min.js`
- `public/skills/{skill-id}/index.html`
- `public/skills/{skill-id}/SKILL.md`
- `public/api/skills.json`
- `public/index.html` 中的 SEO 区块
- `public/sitemap.xml`
- `public/robots.txt`

这些文件来自 `skills/*/skill.yaml`、`prompt.md` 和 `SKILL.md`。更新 Skill 时应修改源文件并重新运行生成器，不要直接维护生成结果。

## 站点地址与 SEO

生成器按以下优先级确定公开地址：

1. `SITE_URL`
2. `CF_PAGES_URL`
3. `https://matutu-ai.github.io/flash-skill-library/`

指定正式域名：

```bash
SITE_URL=https://skills.example.com/ npm run generate
```

该地址会用于 Canonical、Open Graph、JSON-LD、Sitemap 和 Robots。部署到自定义域名时应设置 `SITE_URL`，避免搜索引擎收录临时预览地址。

## GitHub Pages 部署

项目已经包含 `.github/workflows/deploy.yml`。

首次部署：

1. 将项目上传到 GitHub，并使用 `main` 作为生产分支。
2. 打开仓库 `Settings → Pages`。
3. 将 Build and deployment Source 设为 `GitHub Actions`。
4. 推送到 `main`，或在 Actions 页面手动运行部署工作流。

工作流会自动：

1. 安装 Node.js 22；
2. 执行 `npm ci`；
3. 从 GitHub Pages 配置读取真实 `SITE_URL`；
4. 执行 `npm run generate`；
5. 上传 `public/`；
6. 部署到 `github-pages` Environment。

## Cloudflare Pages 部署

### Git 仓库方式

在 Cloudflare Pages 中连接仓库，并使用：

| 设置 | 值 |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run generate` |
| Build output directory | `public` |
| Node.js | 22 |

生成器支持 Cloudflare 的 `CF_PAGES_URL`。绑定正式自定义域名后，在 Production 环境设置：

```text
SITE_URL=https://你的正式域名/
```

### Wrangler 方式

```bash
npm ci
npx wrangler login
npx wrangler pages project create flash-skill-archive --production-branch main
SITE_URL=https://你的正式域名/ npm run generate
npx wrangler pages deploy public --project-name flash-skill-archive --branch main
```

项目配置位于 `wrangler.toml`。Cloudflare Pages 部署后自动提供 CDN 和 HTTPS；自定义域名在 Pages 项目中绑定。

## 数据格式

### YAML 源数据

`skills/{skill-id}/skill.yaml` 是内容维护入口。生成器读取所有目录，只发布活动且公开的唯一仓库条目。

### 前端索引

`data/skills.json` 保存页面展示所需的完整字段，包括描述、模型、使用场景、许可证、GitHub 地址、Prompt 和 Workflow。`data/categories.json` 保存六个固定分类及当前数量。

### Skills API

Cloudflare Pages 提供：

```text
GET /api/skills
```

GitHub Pages 或其他纯静态平台可以读取：

```text
GET /api/skills.json
```

API 返回数组，每条记录包含：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 稳定 Skill id |
| `name` | string | Skill 名称 |
| `category` | string | 分类 |
| `tags` | string[] | 搜索标签 |
| `prompt` | string | 实际 Prompt |
| `workflow` | string[] | 有序步骤 |
| `embedding` | number[] \| null | 未来向量字段 |
| `downloads` | integer | 下载计数，当前从 0 开始 |
| `stars` | integer \| null | GitHub Stars，未同步时为 null |
| `version` | string | 当前版本 |
| `created_time` | ISO 8601 string | UTC 创建时间 |

完整约束见 `app/api/skills.schema.json`，数据库字段建议见 `app/api/README.md`。

## 内容与许可证

每张卡片都直接指向对应的公开 GitHub 仓库。Skill 的作者、版本和许可证以各自仓库及 `skill.yaml` 中的声明为准；Flash Skill Archive 不统一替换上游许可证。

## 验收记录

阶段报告保存在根目录的 `PHASE-*-REPORT.md`，机器验收数据和截图保存在 `qa/`。Phase 1 的原始文件哈希可通过以下命令复核：

```bash
shasum -a 256 -c PHASE-1-ORIGINAL-SHA256.txt
```
