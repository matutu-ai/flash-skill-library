# Flash Skill Archive — Phase 8 GitHub Pages 部署报告

- 执行日期：2026-09-09
- 阶段状态：完成
- 本阶段边界：建立 GitHub Pages 自动生成与部署工作流
- 部署产物：`public/`

## 1. 修改文件

- `.github/workflows/deploy.yml`
- `qa/phase-8-deploy-results.json`
- `PHASE-8-REPORT.md`

执行 CI 等价测试时重新运行了现有生成器，`data/` 与 `public/` 中的生成内容保持确定结果。本阶段没有修改 Skill YAML、Prompt、首页交互、详情页样式、`final/`、`backup-original/` 或历史阶段报告。

## 2. 完成结果

### 自动触发

工作流会在以下情况启动：

- 推送到 `main` 分支；
- 在 GitHub Actions 中手动运行 `workflow_dispatch`。

### 构建任务

`build` 任务依次执行：

1. 检出仓库；
2. 配置 Node.js 22 和 npm 缓存；
3. 读取 GitHub Pages 实际站点配置；
4. 使用 `npm ci` 安装锁定依赖；
5. 运行 `npm run generate` 生成 Skill 数据、详情页和 SEO 文件；
6. 将完整 `public/` 目录上传为 Pages Artifact。

生成步骤的 `SITE_URL` 来自 `actions/configure-pages` 的 `base_url` 输出。因此 Canonical、Sitemap 和 Robots 会使用当前 GitHub Pages 的真实地址，无需在工作流中重复维护仓库路径。

### 部署任务

`deploy` 任务仅在 `build` 成功后执行：

- 使用 `github-pages` Environment；
- 通过 GitHub OIDC 将 Pages Artifact 部署到 GitHub Pages；
- 将最终页面地址写入 Environment URL。

### 权限与并发

工作流只声明 Pages 部署所需权限：

- `contents: read`
- `pages: write`
- `id-token: write`

同一时间只运行一个 `pages` 部署组，正在运行的生产部署不会被后续推送强制取消。

## 3. 测试情况

| 检查项 | 结果 |
|---|---|
| Workflow YAML 解析 | 通过 |
| `main` 推送触发 | 通过 |
| 手动触发 | 通过 |
| 权限与并发配置 | 通过 |
| `build` → `deploy` 依赖 | 通过 |
| GitHub Pages Environment URL | 通过 |
| 动态 `SITE_URL` | 通过 |
| 5 个官方 Action 主版本标签 | 均存在 |
| Action 输入与输出接口 | `base_url`、`path`、`page_url` 均确认存在 |
| `npm ci` | 成功安装 2 个依赖 |
| `npm audit --omit=dev` | 0 个漏洞 |
| `npm run generate` | 生成 8 个唯一仓库条目 |
| JavaScript 语法 | 生成器、首页和详情页脚本通过 |
| Pages Artifact | `public/` 共 28 个文件，831,999 bytes |
| Artifact 内部引用 | 检查 70 个，缺失 0 个 |
| HTML 页面 | 9 个 |
| 本地 HTTP | 9 / 9 返回 200 |
| 下架内容检查 | 两个下架标识均为 0 |
| 原始文件哈希 | 15 / 15 通过 |
| `backup-original/` 哈希 | 15 / 15 通过 |

完整机器验收结果保存在 `qa/phase-8-deploy-results.json`。

当前项目目录没有 `.git` 元数据和 GitHub 远程仓库，因此本地无法触发 GitHub 托管端的 Actions Run。项目上传到 GitHub 后，需要在仓库 Pages 设置中选择 GitHub Actions 作为部署来源；之后推送 `main` 即会执行该工作流。

## 4. 下一阶段计划

Phase 9 将处理 Cloudflare Pages 兼容：

1. 增加 `wrangler.toml`；
2. 配置生成命令和 `public/` 输出目录；
3. 验证 Cloudflare Pages 的静态资源路径；
4. 记录 CDN、HTTPS 和自定义域名的部署入口；
5. 保持 GitHub Pages 与 Cloudflare Pages 共用同一套生成结果。

Phase 9 尚未执行。
