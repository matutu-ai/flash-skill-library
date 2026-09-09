# Seedance 提示词工程师

这个 Skill 根据 Seedance 版本、素材职责和叙事目标选择合适的生成或编辑模式，输出能直接用于即梦或 Seedance 的中文提示词、分镜与素材映射。

## 需要输入

- 视频主题和叙事目标
- Seedance 版本
- 时长、画幅和分辨率
- 图片、视频、音频等参考素材及其用途

## 输出

- 视频制作方案
- 素材用途与作用范围
- 可复制的中文提示词或编辑指令

## 使用方法

1. 复制 [prompt.md](./prompt.md) 中的调用提示词。
2. 替换产品、时长、画幅和素材说明。
3. 提交真实素材，让 Skill 选择模式并建立素材映射。
4. 按 [SKILL.md](./SKILL.md) 的格式输出最终提示词并完成校验。

## 文件说明

- `skill.yaml`：供网站索引与详情页读取的标准化元数据。
- `README.md`：用途、输入、输出和使用入口。
- `prompt.md`：最小可复制调用提示词。
- `SKILL.md`：原始完整 Skill 说明，是模式路由与质量规则依据。

相关仓库：[matutu-ai/seedance2.5-skill](https://github.com/matutu-ai/seedance2.5-skill)。本地 Skill 的完整原文仍以本目录的 SKILL.md 为准。
