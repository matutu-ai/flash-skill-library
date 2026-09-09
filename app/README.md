# App source

Phase 2 已建立应用源码入口。当前可运行版本完整迁移至 `public/`；后续生成器与页面组件将在相应阶段迁入本目录。

Phase 10 已在 `app/api/` 中增加 Skills API 数据契约。Cloudflare Pages 的 `GET /api/skills` 入口由仓库根目录下的 `functions/api/skills.js` 提供，静态数据由现有生成器写入 `public/api/skills.json`。
