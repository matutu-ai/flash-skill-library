# Flash Skill Archive — Phase 10 数据库接口预留报告

- 执行日期：2026-09-09
- 阶段状态：完成
- 本阶段边界：建立只读 Skills API、静态数据快照与未来数据库字段契约
- 当前接口：`GET /api/skills`
- 当前记录：8 个唯一公开仓库级 Skill

## 1. 修改文件

### API 与数据契约

- `functions/api/skills.js`（新增）
- `app/api/skills.schema.json`（新增）
- `app/api/README.md`（新增）
- `app/README.md`

### 生成器与生成结果

- `scripts/generate-skills.js`
- `public/api/skills.json`（新增，自动生成）

### Phase 10 验收记录

- `qa/phase-10-api-results.json`
- `PHASE-10-REPORT.md`

执行生成器时，原有 `data/`、首页、详情页、Sitemap、Robots 和前端资源也按既有流程重新生成或复制，内容保持确定结果。本阶段没有修改 Skill YAML、Prompt、页面交互、页面样式、`final/`、`backup-original/` 或历史阶段报告。

## 2. 完成结果

### `GET /api/skills`

Cloudflare Pages Function 现在提供精确路径：

```text
GET /api/skills
```

接口返回 JSON 数组，每个公开仓库对应一条记录。非 GET 请求返回 `405 Method Not Allowed`，并声明 `Allow: GET`。

### 静态快照

生成器会同步生成：

```text
public/api/skills.json
```

Cloudflare Function 从该文件读取当前数据，因此 API 与网站卡片使用同一个 YAML 数据源。GitHub Pages 等纯静态平台也可以直接访问 `/api/skills.json`。

### 稳定字段

每条记录严格包含以下 11 个字段：

| 字段 | 当前规则 |
|---|---|
| `id` | 使用现有稳定 Skill id |
| `name` | 公开 Skill 名称 |
| `category` | 当前分类名称 |
| `tags` | 搜索标签数组 |
| `prompt` | 从 `prompt.md` 提取的实际 Prompt |
| `workflow` | 有序工作流步骤 |
| `embedding` | 当前为 `null`，等待向量生成流程 |
| `downloads` | 从 `0` 开始 |
| `stars` | 当前为 `null`，等待 GitHub 同步 |
| `version` | 仓库声明版本 |
| `created_time` | 创建日期规范化为 UTC 时间 |

`embedding` 和 `stars` 使用 `null` 表示尚未采集，不写入虚构数值。

### 数据契约

`app/api/skills.schema.json` 使用 JSON Schema Draft 2020-12，约束：

- 必须包含全部 11 个字段；
- 禁止未声明字段；
- id、数组、计数和时间格式均有类型限制；
- `embedding` 支持 `null` 或数值向量；
- `stars` 支持 `null` 或非负整数。

### 未来数据库映射

`app/api/README.md` 已记录 PostgreSQL 字段建议：

- `id` 使用主键文本；
- `tags` 使用 `text[]`；
- `workflow` 使用 `jsonb` 或 `text[]`；
- `downloads` 使用非负计数；
- `created_time` 使用 `timestamptz`；
- `embedding` 使用 pgvector 的 `vector(n)`。

Supabase 可以直接沿用 PostgreSQL 与 pgvector 结构。当前没有添加数据库 SDK、凭据、迁移脚本或网络依赖。

## 3. 测试情况

| 检查项 | 结果 |
|---|---|
| 生成器与 Function 语法 | 通过 |
| `npm run generate` | 生成 8 条 API 记录 |
| 唯一 id | 8 / 8 |
| 唯一 GitHub 仓库 | 8 / 8 |
| 字段集合 | 11 / 11，且无额外字段 |
| 数据来源映射 | 8 / 8 与 `data/skills.json` 一致 |
| JSON Schema | Draft 2020-12 验证通过 |
| `created_time` | 8 / 8 为带时区 ISO 时间 |
| `GET /api/skills` | 200、`application/json`、8 条记录 |
| `GET /api/skills.json` | 200，内容与接口一致 |
| `POST /api/skills` | 405，`Allow: GET` |
| Wrangler 页面回归 | 首页与 8 个详情页，9 / 9 返回 200 |
| 生成确定性 | 24 个生成文件 SHA-256 完全一致 |
| 下架内容检查 | 两个下架标识均为 0 |
| 原始文件哈希 | 15 / 15 通过 |
| `backup-original/` 哈希 | 15 / 15 通过 |

完整机器验收结果保存在 `qa/phase-10-api-results.json`。

## 4. 下一阶段计划

Phase 11 将完成项目 README：

1. 更新项目介绍与最终目录结构；
2. 说明新增 Skill 的标准流程；
3. 记录本地生成与预览命令；
4. 记录 GitHub Pages 与 Cloudflare Pages 部署方式；
5. 说明 YAML、生成数据和 Skills API 字段格式。

Phase 11 尚未执行。
