# Flash Skill Archive — Phase 3 Skill 数据标准化报告

- 执行日期：2026-09-09
- 阶段状态：完成
- 本阶段范围：标准化 7 个现有 Skill 的元数据、说明与可复制 Prompt；未执行 Phase 4 索引生成

## 1. 修改文件

以下 7 个真实 Skill 目录各修改 3 个文件：

- `skills/oil-motion/{skill.yaml,README.md,prompt.md}`
- `skills/seedance-prompt-engineer/{skill.yaml,README.md,prompt.md}`
- `skills/seedance-prompt-description/{skill.yaml,README.md,prompt.md}`
- `skills/jewelry-luxury-brand-kit/{skill.yaml,README.md,prompt.md}`
- `skills/geo-keyword-persona/{skill.yaml,README.md,prompt.md}`
- `skills/ai-promotion-summary/{skill.yaml,README.md,prompt.md}`
- `skills/agent-work-log/{skill.yaml,README.md,prompt.md}`

新增本报告：

- `PHASE-3-REPORT.md`

原始 `SKILL.md`、`final/`、`public/` 和 `backup-original/` 均未修改。

## 2. 完成内容

### YAML 标准化

7 个真实 Skill 均采用同一组 27 个顶层字段。任务要求的字段已全部覆盖：

- `name`
- `description`
- `category`
- `tags`
- `model`
- `version`
- `author`
- `prompt`
- `workflow`
- `use_cases`
- `github`
- `created`
- `updated`

其中 `tags`、`model`、`workflow`、`use_cases`、`output` 和 `requirements` 统一使用数组；`prompt` 统一指向同目录的 `prompt.md`；版本统一为 `v1.0.0`；日期使用 `YYYY-MM-DD`。

为了保留现有页面数据，YAML 同时保留或明确映射了 `id`、副标题、旧分类、输入、输出、前置条件、调用示例、图标、来源标签和下载文件路径。原 `catalog.js` 的 14 个字段没有丢失。

### 分类映射

| Skill | 标准分类 | 保留的旧分类 |
|---|---|---|
| Oil Motion | Automation | 网页设计 |
| Seedance 提示词工程师 | AI Video | 视频创作 |
| Seedance 2.5 提示词描述 | AI Video | 视频创作 |
| 珠宝品牌制作包 | AI Video | 网页设计 |
| GEO 画像选词 | GEO | 营销增长 |
| AI 推广总结 | GEO | 营销增长 |
| 代理商工作日报 | Agent | 效率办公 |

### README 与 Prompt

- 每份 `README.md` 已补齐用途、输入、输出、工作流、使用方法和原始说明入口。
- 每份 `prompt.md` 至少保留现有目录中的调用示例，可直接复制。
- 四个需要较多上下文的 Skill 另提供可填写模板。
- 复杂规则、完整工作流和引用关系继续保存在原始 `SKILL.md`，没有把长篇正文重复塞入 YAML。

### GitHub 字段

每个 Skill 都保留了当前档案指定的 GitHub 跳转，同时新增 `github_relation`，避免把相关仓库误写成该本地文件的源码来源。

| Skill | GitHub 关系 |
|---|---|
| Oil Motion | `upstream_source`，已确认远端 `SKILL.md` 与本地原文一致 |
| 两个 Seedance Skill | `related_repository` |
| 珠宝品牌制作包 | `related_repository` |
| 两个 GEO Skill | `related_repository` |
| 代理商工作日报 | `collection_repository_restricted` |

除 Oil Motion 外，当前公开仓库中没有找到与本地 Skill 同名且内容一致的入口，因此没有虚构深层源码链接。`matutu-ai/macos-obsidian` 在匿名访问下返回 404，可能是私有仓库或当前不可公开访问。

### Midjourney 预留目录

`skills/midjourney/` 继续保持 `reserved-no-source`。Phase 1 没有发现对应 `SKILL.md`，本阶段没有生成虚构的 Skill 数据。

## 3. 测试结果

| 检查项 | 结果 |
|---|---|
| 真实 Skill 数量 | 7 / 7 |
| YAML 解析 | 7 / 7 通过 |
| 任务要求字段完整性 | 7 / 7 通过 |
| 数组字段类型 | 7 / 7 通过 |
| Skill ID 与目录名一致 | 7 / 7 通过 |
| Skill ID 唯一 | 7 / 7 通过 |
| 分类值有效 | 7 / 7 通过 |
| 日期与版本格式 | 7 / 7 通过 |
| GitHub URL 结构 | 7 / 7 通过 |
| README、Prompt、SKILL 文件存在 | 21 / 21 通过 |
| 原 `catalog.js` 字段对照 | 14 个字段 × 7 个 Skill 全部一致 |
| Prompt 保留原调用示例 | 7 / 7 通过 |
| 本地 Markdown 相对链接 | 14 / 14 通过 |
| `skills/`、`final/`、`public/` 的原始 SKILL 比较 | 7 / 7 字节一致 |
| 原始 `final/` Phase 1 哈希复核 | 15 / 15 通过 |
| `backup-original/` Phase 1 哈希复核 | 15 / 15 通过 |
| Midjourney 预留状态 | 通过，没有 `SKILL.md` |

GitHub 网络复核中，`oil-oil/oil-motion`、`matutu-ai/seedance2.5-skill` 和 `matutu-ai/GEO` 可访问；`matutu-ai/macos-obsidian` 匿名访问返回 404。

## 4. Phase 4 计划

下一阶段只实现 Skill 数据库索引生成：

1. 在 `scripts/generate-skills.js` 中扫描 `skills/*/skill.yaml`；
2. 跳过 `reserved-no-source` 等没有真实 Skill 的目录；
3. 校验必填字段并生成稳定排序的 `data/skills.json`；
4. 为每条记录输出名称、分类、标签、描述和详情 URL，并保留首页与详情页后续需要的标准字段；
5. 在 `package.json` 中增加生成命令；
6. 连续执行两次生成，验证输出一致且 7 个 Skill 无遗漏。

Phase 4 尚未执行。
