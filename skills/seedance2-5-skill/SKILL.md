---
name: seedance-2-5-prompt
description: Seedance 2.5 Commercial Video Director + Human Realism Engine + Prompt Compiler. Turn product images, product data, ad briefs, storyboards, reference videos, or existing prompts into ready-to-feed Seedance 2.5 / 即梦 / 豆包 prompts. Uses a Human Realism Engine for identity, minimum-sufficient human dynamics, shot-distance routing, temporal consistency, and pre-generation risk scoring. Use when the user provides video creative inputs and asks to generate, optimize, rewrite, analyze, storyboard, or compile a Seedance prompt. Does not do overseas market research or TikTok trend research.
---

# Seedance 2.5 Commercial Video Director + Human Realism Engine + Prompt Compiler

## 定位

Strategy 决定“拍什么”；本 Skill 决定“怎么拍”与“人怎么像真人一样活”，并把导演决策编译成 Seedance 2.5 可执行 Prompt。

Identity 回答“这个人是谁”；Human Realism 回答“这个人如何像真人一样活着”；两者分层控制，不合并成一个笼统段落。

## 适用场景

- 产品图 / 产品资料 / 卖点 → 产品视频 Prompt
- 人物 / 场景 / 产品参考 → 人物视频 Prompt
- 广告 Brief / 分镜 → 导演方案 + Prompt
- 参考视频 → 结构拆解 + 原创方案
- 已有 Prompt → 诊断 + 优化 + QA

## 用户学习模式

出现下列意图时不进入 24 步生成流程，直接读取 `references/learning-path.md`，按轮次只做一项练习：

```text
继续学习本 Skill
本轮练习：第 X 轮 / <轮次名>
学完之后下一步学什么
我已跑满学习轮次表
```

学习会话一次只输出：当前轮次、本轮目标、本轮锁、可观察变化、练习口令。不要一次教学 8 轮，也不要让用户重读本文件剩余部分。

## 输入

产品图片、人物图片、场景图片、产品资料、参考视频、完整分镜、广告 Brief、已有 Prompt、视频创意、混合输入。

## 输出

- MODE A ONE-SHOT PROMPT（默认）
- MODE B SHOT-BY-SHOT PROMPT
- MODE C DIRECTOR PACKAGE

## 核心 Pipeline

```text
01 INPUT DETECTION
02 INPUT NORMALIZATION
03 REFERENCE ANALYSIS
04 PRODUCT / SUBJECT ANALYSIS
05 CHARACTER IDENTITY LOCK
06 HUMAN REALISM ROUTING
07 HUMAN MOTION ENGINE
08 VIDEO OBJECTIVE
09 CREATIVE STRUCTURE
10 HOOK DESIGN
11 STORYBOARD
12 SHOT DISTANCE ROUTING
13 SHOT FEASIBILITY
14 SHOT HUMAN REALISM COMPILE
15 CAMERA LANGUAGE
16 TEMPORAL CONSISTENCY
17 CONTINUITY LOCK
18 SOUND DESIGN
19 SEEDANCE COMPILER
20 HUMAN REALISM QA
21 PROMPT READINESS QA
22 PRE-GENERATION RISK SCORE
23 REPAIR ROUTING
24 FINAL OUTPUT
```

## 阅读顺序（速度优先）

```text
每次必读（最多 4 个）
  1. SKILL.md（本文件）
  2. QUICK-START.md
  3. workflows/main-pipeline.md
  4. references/template.md 或 templates/<类型>.md

写作用途再读
  references/quick-reference.md   常用速查，大多数项目查这里就够

故障或进阶才读
  其余 workflows / human-realism / references 细节
```

不要在生成第一条 Prompt 时读完整个库；先按下面输入类型命中一行，再读取该行文件。

## 按需路由

- 输入识别 / 参考素材缺失：`workflows/input-analysis.md`、`references/reference-asset-prompts.md`
- 产品分析：`workflows/product-analysis.md`
- Human Realism Engine：`workflows/human-realism.md`、`human-realism/HUMAN-REALISM.md`
- 人物身份锁：`human-realism/identity.md`
- 人物动态模块：`human-realism/face-dynamics.md`、`eye-dynamics.md`、`skin-dynamics.md`、`hair-dynamics.md`、`body-biomechanics.md`、`hand-dynamics.md`、`clothing-dynamics.md`、`micro-expression.md`
- 摄影机/环境/时间真实感：`human-realism/camera-realism.md`、`environmental-realism.md`、`temporal-consistency.md`
- Human Realism QA / Repair：`human-realism/realism-qa.md`、`repair-routing.md`
- 视频目的：`workflows/video-objective.md`
- 创意 + Hook：`workflows/creative-structure.md`、`workflows/hook-engine.md`
- 分镜 + 可行性：`workflows/storyboard.md`、`workflows/shot-feasibility.md`
- 摄影 / 光线：`workflows/camera.md`
- 声音 / 对白：`workflows/sound-design.md`
- 连续性 / 多视角 / 参考视频：`workflows/continuity.md`、`workflows/product-multi-view.md`、`workflows/reference-video-analysis.md`
- 编译 + QA：`workflows/prompt-compiler.md`、`workflows/prompt-qa.md`
- 常用速查：`references/quick-reference.md`

## 数据结构

- 项目接口：`schemas/video-project.schema.json`
- 锁系统：`schemas/subject-lock.schema.json`
- Human Realism Engine：`schemas/human-realism.schema.json`
- 分镜：`schemas/storyboard.schema.json`
- 对白：`schemas/dialogue.schema.json`

## 模板与规则

- 编译顺序：`references/template.md` 或 `templates/` 类型模板。
- Human Realism 分层模板：`templates/human-realism-template.md`。
- 质检：`references/checklist.md`。
- 产品锁：`references/product-lock-rules.md`。
- 连续性：`references/continuity-rules.md`。
- 商业 TVC / 30秒节奏 / 旁白真源 / 群像 / 产品受力：`references/commercial-directing-rules.md`。
- Prompt 规则：`references/prompt-rules.md`。
- 示例：`assets/existing-examples/`。

## 关键限制

- 不做海外市场研究、TikTok 爆款研究、用户画像、竞品营销分析、广告投放策略或 TikTok Shop 运营。
- 用户已指定创意时不重复生成 3 个概念。
- 不机械复制参考视频，只学结构、节奏、镜头语言、内容机制。
- 产品默认禁止改设计，除非 `PRODUCT_TRANSFORMATION_ALLOWED`。
- 人物 Identity Lock 与 Human Realism 分层；Human Realism 不得改写用户台词。
- 无人物项目 `human_realism.enabled=false` 并写明 `skip_reason=NO_CHARACTER`，不输出【人物真实感】。
- Human Realism 是动态、惯性、物理响应与时间连续性；`photorealistic / 8K / masterpiece` 不是替代品。
- 每个项目只选一种 Camera Language；无理由不默认 handheld；镜头语言与人物运动冲突时输出 `SHOT FEASIBILITY WARNING`。
- 保留既有能力：4-30秒、9:16默认、无字幕、无BGM、时间码、锁系统、连续性、负面约束、结尾状态、10/15/30常用结构。

## 质量检查

- QA 缺关键模块标记 `INCOMPLETE`，不假装完整。
- `Prompt Readiness Score` 只是提示词就绪度，不是实际生成质量评分。
- `PRE-GENERATION RISK SCORE` 是生成前风险评分，不是实际视频画质成绩。
