---
name: overseas-ecommerce-seedance
description: >-
  Build overseas ecommerce short-video production packages for TikTok, TikTok Shop,
  Reels, and Shorts: product analysis, audience and market localization, competitor
  or viral video reverse-engineering, UGC scripts, storyboards, camera and audio
  direction, Seedance 2.5 prompts, consistency QA, video editing, and batch production.
  Use when the user provides a product image, product link, TikTok reference video,
  target country, target platform, video duration, or asks for UGC ads, product ads,
  video prompts, storyboards, or viral replication for cross-border ecommerce.
metadata:
  version: 1.0.0
  compatibility: Seedance 2.5
---

# Overseas Ecommerce Seedance

这是一个统一 Skill，不要求用户选择流程。先分析真实产品和目标市场，再决定内容结构、分镜、摄影、声音和 Seedance 2.5 提示词。

## Router

根据输入自动选择 workflow，不要让用户手动选：

| 用户输入 | 路由 |
|---|---|
| 只有产品图 / 产品链接 / 产品信息 | [product-to-video](workflows/product-to-video.md) |
| 只有 TikTok / Reels 链接 | [tiktok-to-video](workflows/tiktok-to-video.md) |
| 产品图 + TikTok 参考视频 | [competitor-to-video](workflows/competitor-to-video.md) |
| 用户说“复刻这个爆款” | [viral-replication](workflows/viral-replication.md) |
| “最近有什么爆款” / “最近7天” / “找爆款” | [trend-intelligence](workflows/trend-intelligence.md) |
| “分析这个视频为什么爆” | [tiktok-to-video](workflows/tiktok-to-video.md) 的 reverse-video 分支 |
| “根据这个爆款给我创意” | [outlier-to-creative](workflows/outlier-to-creative.md) |
| “从评论里找卖点” | [comment-to-creative](workflows/comment-to-creative.md) |
| “趋势匹配我的产品” | [trend-to-product](workflows/trend-to-product.md) |
| “每周趋势报告” | [weekly-trend-report](workflows/weekly-trend-report.md) |
| “这个视频跑得怎么样” | [performance-feedback](workflows/performance-feedback.md) |
| 只有 Seedance Prompt 需求 | [image-to-video](workflows/image-to-video.md) 的 Seedance compiler 流程 |
| 已有视频 + 修改要求 | [tiktok-to-video](workflows/tiktok-to-video.md) 的 video edit / extension 分支 |
| 多个产品 / 批量生产 | [batch-production](workflows/batch-production.md) |
| 产品图 + 人物图 + 场景图 | [image-to-video](workflows/image-to-video.md) 的 multi-reference 分支 |

## AI Read Budget

每次任务只走一条读取链，禁止开始就扫 `references/`、`intelligence/` 或 `templates/` 目录：

1. 先用 Router 选择 1 个 workflow，只读该 workflow。
2. 需要示例结构时读 [examples/README.md](examples/README.md)，从中选 1 个最接近的 example，不要一次打开全部 example。
3. 只有当前 workflow 点名时才读 reference；单次最多 2 个，仍不够再扩大。
4. 不按文件名相似横向读多个 reference，不递归读 reference 内的整套链接。
5. 用户输入已可执行时直接输出；不解释流程、不罗列文件、不要求用户先读文档。

## 硬性优先级

```text
真实产品 > 产品卖点 > 视觉证明 > 转化 > 视觉风格
```

不得为了“电影感”把 UGC 变成棚拍 TVC，不得为了画面好看改变产品颜色、形态、Logo、材质、配件或功能。产品图无法确认的属性写 `Unknown / Not Provided`，禁止虚构。

## Seedance 2.5 Compatibility Layer

所有 Seedance 输出必须经过这一层：

1. 明确模式：Text-to-Video、Image-to-Video、Multi-reference、Video Reference、Video Extension、Video Edit。不要让用户判断。
2. 按 2.5 能力写：原生 4-30 秒、超长 30-180 秒、视频延长、时间戳控制、多参考素材、原生音频、编辑模式。不要把 2.0 的“所有长视频拆 15 秒”当默认。
3. 素材只用实际存在的 `@图片N`、`@视频N`、`@音频N`，每个素材声明“负责什么 + 不继承什么”。
4. 时间戳必须连续覆盖总时长，无重叠无缺口。
5. 最终 prompt 必须包含：Task、Reference Assets、Product Consistency、Timeline、Audio、Dialogue、Negative Constraints、Ending State。
6. 平台参数可能变化。生产前若用户使用即梦、火山方舟或第三方入口，以当前界面为准；未核实时标为平台快照。
7. 最终可投喂格式参考 `matutu-ai/seedance2.5-skill` 的模板和质检清单；该库只作 Prompt 编译参考，不替代本 Skill 的海外电商主框架。

详细规则见 [references/seedance-2.5.md](references/seedance-2.5.md)、[references/seedance-compatibility.md](references/seedance-compatibility.md)、[references/seedance-reference.md](references/seedance-reference.md)、[references/seedance-edit.md](references/seedance-edit.md)、[references/seedance2.5-skill.md](references/seedance2.5-skill.md)。

## Core Workflow

默认完整流程：

1. Input Intake：产品、参考视频、目标市场、平台、时长、卖点、字幕政策、是否跳过确认。
2. Product Analysis：Product Identity、Target Customer、Feature → Benefit → Visual Proof。
3. Market Localization：语言、人物、场景、消费习惯、CTA、文化差异。默认 US。
4. TikTok Strategy：视频类型、Hook、Conversion Structure、UGC style。
5. Script + Storyboard：逐秒口播、产品动作、Close-up、Wow Factor、CTA。
6. Camera + Audio + Continuity：景别、运镜、光线、声音、人物与产品锁。
7. Seedance Prompt Compiler：输出 2.5 可执行 prompt。
8. QA：Product QA、Video QA、Commercial QA、Seedance QA。

## Intelligence Engine

涉及“近期、最近、本周、爆款、趋势、评论、为什么火”的任务必须进入情报闭环：

```text
TREND -> OUTLIER -> REVERSE -> COMMENT -> MECHANISM -> CREATIVE
-> PRODUCT -> UGC -> STORYBOARD -> SEEDANCE 2.5 -> QA
-> PERFORMANCE -> PATTERN LIBRARY -> TREND
```

- 趋势发现：读取 [intelligence/trend-engine.md](intelligence/trend-engine.md)。
- 异常检测：读取 [intelligence/outlier-engine.md](intelligence/outlier-engine.md)。
- Transcript 情报：读取 [intelligence/transcript-engine.md](intelligence/transcript-engine.md)。
- 评论挖掘：读取 [intelligence/comment-mining.md](intelligence/comment-mining.md)。
- 竞品情报：读取 [intelligence/competitor-intelligence.md](intelligence/competitor-intelligence.md)。
- 创意 / Hook / Pattern：读取 [intelligence/creative-mining.md](intelligence/creative-mining.md)、[intelligence/hook-mining.md](intelligence/hook-mining.md)、[intelligence/pattern-library.md](intelligence/pattern-library.md)。
- 评分：使用 `scripts/score-trend.py`，不要凭印象编造 Outlier Score。

实时数据约束：

- GitHub 只提供方法、Prompt Pattern、工作流、Schema 和脚本，不提供实时 TikTok 数据。
- 没有实时数据时输出 `LIVE DATA UNAVAILABLE`，只使用 `REFERENCE PATTERNS ONLY`。
- 不允许把旧爆款、静态案例或没有日期证据的内容称为“近期趋势”。

## Intelligence Router

| 用户输入 | 加载 |
|---|---|
| 最近 7 天 | [workflows/trend-intelligence.md](workflows/trend-intelligence.md) + [intelligence/trend-engine.md](intelligence/trend-engine.md) |
| 找爆款 / 异常高表现 | [intelligence/outlier-engine.md](intelligence/outlier-engine.md) |
| 视频 Transcript | [intelligence/transcript-engine.md](intelligence/transcript-engine.md) |
| 评论区 | [intelligence/comment-mining.md](intelligence/comment-mining.md) |
| 竞品账号 / 广告 | [intelligence/competitor-intelligence.md](intelligence/competitor-intelligence.md) |
| 爆款机制提炼 | [intelligence/creative-mining.md](intelligence/creative-mining.md) + [intelligence/hook-mining.md](intelligence/hook-mining.md) |
| 历史模式回填 | [intelligence/pattern-library.md](intelligence/pattern-library.md) |

## Confirmation Gates

默认有 4 个确认点：

- Gate 1：产品分析与卖点确认。
- Gate 2：爆款 / 对标视频结构确认。
- Gate 3：UGC 脚本与分镜确认。
- Gate 4：Seedance 2.5 Prompt 确认。

用户说“直接生成，不需要确认”时跳过所有 Gate，但输出仍按 Gate 1-4 分段。不要用 Gate 阻塞本来就缺失的输入，缺失且影响产出的字段使用保守默认并显式标注。

## Output Contract

用户要求完整方案时，按以下顺序输出：

1. Product Analysis
2. Audience
3. Market Localization
4. Trend Intelligence
5. TikTok Strategy
6. Viral Hook
7. UGC Script
8. Storyboard
9. Camera Direction
10. Lighting Direction
11. Audio Direction
12. Seedance 2.5 Mode
13. Reference Map
14. Seedance 2.5 Prompt
15. Negative Prompt
16. Product Consistency QA
17. Character Consistency QA
18. Commercial QA
19. Final Recommendation

用户只要其中一项时只输出该项。默认中文分析、英文口播和英文 Seedance prompt，除非目标市场明确需要其他语言。

## Reference Loading

以下只是按需候选，不是每次全读；先遵守 `AI Read Budget`：

- 产品与卖点：[product-analysis.md](references/product-analysis.md)、[audience.md](references/audience.md)
- TikTok 与平台：[tiktok-shop.md](references/tiktok-shop.md)、[tiktok-viral.md](references/tiktok-viral.md)、[viral-hook.md](references/viral-hook.md)
- 对标与反向拆解：[competitor-analysis.md](references/competitor-analysis.md)、[reverse-video.md](references/reverse-video.md)
- 内容模板：[ugc.md](references/ugc.md)、[ecommerce-video.md](references/ecommerce-video.md)、[ecommerce-copywriting.md](references/ecommerce-copywriting.md)
- 制作：[storyboard.md](references/storyboard.md)、[camera.md](references/camera.md)、[lighting.md](references/lighting.md)、[audio.md](references/audio.md)、[continuity.md](references/continuity.md)
- Seedance：[seedance-2.5.md](references/seedance-2.5.md)、[seedance-reference.md](references/seedance-reference.md)、[seedance-edit.md](references/seedance-edit.md)
- Seedance 参考模板：[seedance2.5-skill.md](references/seedance2.5-skill.md)
- 质检：[quality-control.md](references/quality-control.md)
- 情报：[intelligence/trend-engine.md](intelligence/trend-engine.md)、[intelligence/outlier-engine.md](intelligence/outlier-engine.md)、[intelligence/transcript-engine.md](intelligence/transcript-engine.md)、[intelligence/comment-mining.md](intelligence/comment-mining.md)
- 模式库：[intelligence/pattern-library.md](intelligence/pattern-library.md)

## Scripts

- `python scripts/analyze-video.py <video_or_url> --out-dir <dir>`：获取视频元数据、时长、参考信息；需要 `yt-dlp` / `ffprobe` 时给出缺失提示。
- `python scripts/extract-frames.py <video> --out-dir <dir>`：抽帧或 contact sheet；需要 `ffmpeg`。
- `python scripts/extract-audio.py <video> --out-dir <dir>`：提取音频；需要 `ffmpeg`。
- `python scripts/score-trend.py <research.json>`：计算 Outlier / Trend / Freshness / Fit Score。
- `python scripts/validate-prompt.py <prompt_file>`：验证 Seedance 2.5 prompt 结构、时间轴、参考素材和产品一致性。
- `python scripts/validate-schema.py <data.json> <schema.json>`：验证 JSON 数据与 Schema。

## Boundaries

本 Skill 产出策划、脚本、分镜、提示词和质检，不代替用户提交视频生成任务，不消耗积分，不声称一定生成成功。未授权不得使用真人肖像、竞品素材或未提供的内容。涉及 Seller Center、第三方 TikTok Shop 分析平台或受版权保护素材时，先单独说明授权边界；用户未授权不登录、不抓取、不复制也不转存。
