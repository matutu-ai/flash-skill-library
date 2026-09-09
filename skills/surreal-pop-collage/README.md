# 超现实波普拼贴

这个 Skill 把用户提供的照片转成明亮的超现实波普拼贴。照片主体保留为可识别的黑白“现实锚”，背景由源自原图的两至三个平涂色形重新构成，整张作品只允许一个能从场景或典故解释来源的“不可能巨物”。

## 需要输入

- 一张风景、城市、人物或文化地标照片
- 可选的目标画幅与表达方向

## 输出

- 超现实波普拼贴图像
- 一至三句色形推导与巨物来源说明
- 用户明确要求时提供完整生成提示词

## 使用方法

1. 复制 [prompt.md](./prompt.md) 中的调用提示词并上传照片。
2. 加载 [SKILL.md](./SKILL.md)，让 Skill 先建立场景卡。
3. 从原图主色、边界与典故推导色形和唯一巨物。
4. 生成后按入口中的质量门检查主体、平涂纪律和画面明亮度。

## 文件说明

- `skill.yaml`：一仓库一卡的标准化网站元数据。
- `README.md`：用途、输入、输出与使用入口。
- `prompt.md`：最小可复制调用提示词。
- `SKILL.md`：逐字节保存的远端 `main/SKILL.md` 正式入口。

源仓库：[matutu-ai/https-github.com-2998980-hue-surreal-pop-collage](https://github.com/matutu-ai/https-github.com-2998980-hue-surreal-pop-collage)

许可证：MIT。
