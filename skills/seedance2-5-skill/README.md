# Seedance 2.5 · 商业视频导演

这个 Skill 将产品图、人物图、广告 Brief、参考视频、分镜或已有提示词整理为 Seedance 2.5 可执行提示词。它负责导演方案、人物身份与真实感、镜头可行性、声音、连续性和生成前风险检查；海外市场和 TikTok 趋势研究不在其范围内。

## 需要输入

- 产品、人物或场景图片及产品资料
- 参考视频、完整分镜、广告 Brief 或已有提示词
- 视频目标、时长、画幅与希望的输出模式

## 输出

- 默认 `MODE A ONE-SHOT PROMPT`
- `MODE B SHOT-BY-SHOT PROMPT`
- `MODE C DIRECTOR PACKAGE`

## 使用方法

1. 复制 [prompt.md](./prompt.md) 中的调用提示词。
2. 加载 [SKILL.md](./SKILL.md)，再按入口给出的速度优先顺序读取源仓库文件。
3. 提供真实存在的参考素材及各自职责。
4. 让 Skill 完成导演编排、提示词编译和 QA。

## 文件说明

- `skill.yaml`：一仓库一卡的标准化网站元数据。
- `README.md`：用途、输入、输出与使用入口。
- `prompt.md`：最小可复制调用提示词。
- `SKILL.md`：逐字节保存的远端 `main/seedance-2-5-prompt/SKILL.md` 正式入口。

源仓库：[matutu-ai/seedance2.5-skill](https://github.com/matutu-ai/seedance2.5-skill)

许可证：MIT。

## 如何在豆包中使用

1. 切换模式：点豆包输入框左下角的「云电脑」，选「工作任务 · 云电脑」。
2. 打开豆包，新建对话，上传或粘贴本技能的 `SKILL.md`。
3. 再上传产品/人物/场景图、资料、参考视频或广告 Brief。
4. 明确说要 ONE-SHOT、分镜版或导演包，并要求锁定产品与人物、做检查。
5. 缺时长、授权等信息就回「没有 / 待补」，不要让它编造。
6. 复制或下载提示词；要改就说「只改第 X 镜」。
7. 把定稿提示词贴到具备 Seedance 能力的入口生成；换项目请新开对话。
