# GEO-BD · 企业初次诊断

这个 Skill 是一套结构化 GEO Diagnostic Engine。它把企业事实、证据、真实 AI 认知、Query Matrix 和已确认竞品转化为可追溯的 GEO 评分、缺口、机会与行动计划，并支持 Executive、Operational、Technical 三层报告和前后轮复测。

## 需要输入

- 企业名称、业务、产品、服务、客户、案例和地域等真实资料
- 带来源的 Evidence 与真实 `observed` 或 `provided` AI 观察
- 已确认竞品、关键词方向、当前指标及验证约束（如有）

## 输出

- Executive、Operational 或 Technical 分层诊断报告
- 原始 `diagnostic.json` 与可选 `report.json`
- GEO Gap、机会排序、P0 至 P3 行动计划和复测方案

## 使用方法

1. 复制 [prompt.md](./prompt.md) 中的调用提示词。
2. 加载 [SKILL.md](./SKILL.md) 并按其输入结构提供资料。
3. 没有真实 AI Observation 时，先运行基础实体诊断，保留未知指标。
4. 需要执行代码时，从源仓库的 `geo-account-precheck/` 目录运行对应脚本。

## 文件说明

- `skill.yaml`：一仓库一卡的标准化网站元数据。
- `README.md`：用途、输入、输出与使用入口。
- `prompt.md`：最小可复制调用提示词。
- `SKILL.md`：逐字节保存的远端 `main/geo-account-precheck/SKILL.md` 正式入口。

源仓库：[matutu-ai/GEO-BD](https://github.com/matutu-ai/GEO-BD)

许可证：仓库未声明。
