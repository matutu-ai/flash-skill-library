# TikTok Shop · 海外电商视频

这个 Skill 覆盖海外电商短视频从产品和市场分析到 Seedance 2.5 提示词的完整生产链。它能按产品、参考视频、趋势、评论或批量生产请求自动路由，提炼可迁移的爆款机制，生成 UGC 脚本、分镜、摄影、声音与一致性检查。

## 需要输入

- 产品图片、链接、信息与主要卖点
- 目标国家、目标平台、时长与语言
- TikTok、Reels 等参考视频，或趋势、评论、批量生产请求（如有）

## 输出

- 产品、受众、市场本地化与趋势分析
- UGC 脚本、分镜、摄影和声音方案
- Seedance 2.5 提示词及产品、人物、商业和模型兼容性 QA

## 使用方法

1. 复制 [prompt.md](./prompt.md) 中的调用提示词。
2. 加载 [SKILL.md](./SKILL.md)，让 Router 根据输入选择一条工作流。
3. 按需提供真实实时数据；没有实时数据时只使用静态 Pattern，并明确标注状态。
4. 依次确认产品、参考结构、脚本分镜与最终提示词，或明确要求跳过确认。

## 文件说明

- `skill.yaml`：一仓库一卡的标准化网站元数据。
- `README.md`：用途、输入、输出与使用入口。
- `prompt.md`：最小可复制调用提示词。
- `SKILL.md`：逐字节保存的远端 `main/overseas-ecommerce-seedance/SKILL.md` 正式入口。

源仓库：[matutu-ai/TikTok-Shop-Seedance-2.5-skill](https://github.com/matutu-ai/TikTok-Shop-Seedance-2.5-skill)

许可证：仓库未声明。
