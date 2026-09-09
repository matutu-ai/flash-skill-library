# Flash Skill Archive — Phase 4 仓库级去重与自动索引报告

- 执行日期：2026-09-09
- 阶段状态：完成
- 本阶段规则：一个公开 GitHub 仓库只生成一张卡片
- 当前活动结果：8 张卡片、8 个唯一仓库

## 1. GitHub 总库分析

GitHub API 返回 `matutu-ai` 当前 8 个 public 仓库，默认分支均为 `main`，且都未归档。

| 仓库 | Skill 入口 | 处理结果 | 许可 |
|---|---|---|---|
| `matutu-ai/GEO` | 根目录 `SKILL.md` | 收录 1 张卡片 | MIT |
| `matutu-ai/GEO-BD` | `geo-account-precheck/SKILL.md` | 收录 1 张卡片 | 未声明 |
| `matutu-ai/danyuange` | 根目录 `SKILL.md` | 收录 1 张卡片 | 未声明 |
| `matutu-ai/seedance2.5-skill` | `seedance-2-5-prompt/SKILL.md` | 收录 1 张卡片 | MIT |
| `matutu-ai/TikTok-Shop-Seedance-2.5-skill` | `overseas-ecommerce-seedance/SKILL.md` | 收录 1 张卡片 | 未声明 |
| `matutu-ai/https-github.com-2998980-hue-surreal-pop-collage` | 根目录 `SKILL.md` | 收录 1 张卡片 | MIT |
| `matutu-ai/https-github.com-Zeejay0-gathered-scenes-zine-skill` | 3 个 `skills/*/SKILL.md` | 合并为 1 张集合卡片 | 个人非商业许可 |
| `matutu-ai/GEO-Production-System` | 无独立完整 Skill 入口 | 排除；这是前后端应用系统 | 未声明 |

“public 仓库”和“具备开放源代码许可证”不是同一件事。当前 `matutu-ai` 的 7 个公开 Skill 仓库中，3 个明确采用 MIT，3 个没有声明许可证，拾景 Zine 仅允许个人非商业使用。因此前台统一使用“公开技能仓库”，并在详情中逐项显示实际许可。

现有 `oil-oil/oil-motion` 是已经确认的独立公开 Skill 仓库，采用 MIT，与上述仓库不重复，继续保留。

## 2. 去重与下架结果

旧版 7 张卡片只对应 4 个仓库，其中 Seedance 仓库重复 3 次、GEO 仓库重复 2 次。现已改为仓库级入口：

| 原卡片 | 当前处理 |
|---|---|
| Seedance 提示词工程师 | 由 `seedance2.5-skill` 官方入口替代 |
| Seedance 2.5 提示词描述 | 合并退出公开索引 |
| 珠宝品牌制作包 | 未在对应公开仓库找到同名入口，退出公开索引 |
| GEO 画像选词 | 由 `GEO V3` 官方入口替代 |
| AI 推广总结 | 合并退出公开索引 |
| 代理商工作日报 | 按要求下架 |
| Oil Motion | 保留 |

以上 6 个退出活动目录的旧 Skill 已移动到 `archive/pre-repository-catalog/`，没有删除历史内容；旧公开副本也已移出 `public/`。

当前网站卡片：

1. Oil Motion
2. Seedance 2.5 · 商业视频导演
3. TikTok Shop · 海外电商视频
4. GEO V3 · 企业增长闭环
5. GEO-BD · 企业 GEO 诊断
6. 国际版 GEO · 九大单元
7. 超现实波普拼贴
8. 拾景 Zine · 影像创作集合

## 3. 修改文件

### 活动 Skill 数据

- 保留并更新 `skills/oil-motion/skill.yaml`
- 新增 7 个仓库级目录：
  - `skills/seedance2-5-skill/`
  - `skills/tiktok-shop-seedance-2-5-skill/`
  - `skills/geo/`
  - `skills/geo-bd/`
  - `skills/danyuange/`
  - `skills/surreal-pop-collage/`
  - `skills/gathered-scenes-zine-skill/`

每个目录包含 `skill.yaml`、`README.md`、`prompt.md` 和 `SKILL.md`。拾景 Zine 的仓库级 `SKILL.md` 是明确标注的集合索引，三个上游 Skill 原文保存在 `upstream/skills/`。

### 自动索引

- `scripts/generate-skills.js`
- `package.json`
- `package-lock.json`
- `data/skills.json`
- `data/categories.json`
- `public/assets/catalog.js`
- `public/skills/{8 个活动仓库}/SKILL.md`

生成器会跳过非活动目录，校验 ID、必填字段、GitHub 根 URL、Skill 入口归属、公开状态与仓库唯一性，再从同一数据源生成 JSON、分类、前台 catalog 和下载说明。

### 前台

- `public/index.html`
- `public/assets/app.js`
- `public/assets/style.css`

前台已更新为 8 个公开仓库和 5 个分类。卡片编号改为 `REPO`，搜索覆盖仓库名、标签、模型和仓库内 Skill；详情显示仓库内入口及许可证；每张卡片直接跳转唯一 GitHub 仓库。

### 归档与项目说明

- `archive/pre-repository-catalog/README.md`
- `README.md`
- `.gitignore`
- `PHASE-4-REPORT.md`

`final/`、`backup-original/` 和历史阶段报告未修改。

## 4. 测试结果

| 检查项 | 结果 |
|---|---|
| GitHub 公开仓库盘点 | `matutu-ai` 8 个，7 个 Skill 仓库收录，1 个应用排除 |
| 活动卡片与唯一 GitHub 仓库 | 8 / 8 |
| 重复 GitHub 根 URL | 0 |
| 代理商工作日报出现在 public | 0 |
| 活动 YAML | 8 / 8 可解析 |
| 前台公开 Skill 文件 | 8 / 8 返回 HTTP 200 |
| 外部 Git 仓库连通性 | 8 / 8 通过 `git ls-remote` |
| 单 Skill 上游原文 | 7 / 7 与远端逐字节一致 |
| 拾景 Zine 子 Skill | 3 / 3 与远端逐字节一致 |
| JavaScript 语法 | 生成器、catalog、前台脚本全部通过 |
| 分类统计 | 1 网页设计、2 视频创作、2 营销增长、2 图像设计、1 效率办公 |
| 连续生成确定性 | 两次输出 SHA-256 完全一致 |
| 浏览器实际渲染 | 8 张卡片、5 个分类、8 个唯一 GitHub 链接 |
| npm 安装与审计 | 1 个依赖，0 个漏洞 |
| 原始 `final/` 哈希 | 15 / 15 通过 |
| `backup-original/` 哈希 | 15 / 15 通过 |

## 5. 下一阶段计划

Phase 5 将在当前仓库级数据上完成首页升级：

1. 接入 Fuse.js 模糊搜索；
2. 在卡片直接展示分类、标签、模型和版本；
3. 让分类按钮由 `categories.json` 生成，减少硬编码；
4. 完善空状态、键盘操作和移动端筛选布局；
5. 保持“一仓库一卡”和 GitHub 根 URL 唯一校验。

Phase 5 尚未执行。
