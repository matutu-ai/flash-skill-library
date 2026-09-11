window.SKILL_CATALOG = [
  {
    "id": "seedance2-5-skill",
    "name": "Seedance 2.5 · 商业视频导演",
    "subtitle": "把创意编译成可拍的 Seedance 提示词",
    "category": "AI视频",
    "categoryKey": "video",
    "description": "把产品、人物、广告需求和参考素材编排为分镜，结合人物真实感与连续性检查，输出可直接投喂的视频提示词。",
    "promptText": "使用 seedance-2-5-prompt，把我提供的产品、人物、场景素材和广告 Brief 编排为可直接投喂 Seedance 2.5 的提示词。锁定产品与人物身份，按素材职责设计时间轴、镜头与声音，并完成 Human Realism、连续性、Prompt Readiness 和生成前风险检查。",
    "input": "产品、人物或场景图片，产品资料，参考视频，完整分镜，广告 Brief，已有提示词或混合视频创意。",
    "output": [
      "ONE-SHOT PROMPT",
      "SHOT-BY-SHOT PROMPT",
      "DIRECTOR PACKAGE"
    ],
    "requirements": [
      "实际视频生成需要 Seedance 2.5、即梦或豆包的相应能力。",
      "完整流程需要源仓库中的 QUICK-START、workflow、template、schema 与 Human Realism 资源。",
      "本 Skill 不承担海外市场研究、TikTok 趋势研究或广告投放策略。"
    ],
    "workflow": [
      "识别并规范产品、人物、场景、参考素材与广告目标",
      "分析主体并建立产品锁与人物身份锁",
      "设计创意结构、Hook、分镜、镜头语言与声音",
      "编译 Seedance 2.5 可执行提示词",
      "检查人物真实感、连续性、可拍性与生成前风险"
    ],
    "useCases": [
      "产品与人物商业视频提示词",
      "广告 Brief 或分镜导演化",
      "参考视频结构拆解与原创方案",
      "已有 Seedance 提示词诊断优化"
    ],
    "example": "使用 seedance-2-5-prompt，把这组产品图、人物图和 15 秒广告 Brief 编译为 ONE-SHOT PROMPT，锁定产品与人物，并完成 Human Realism、连续性和风险检查。",
    "tags": [
      "Seedance 2.5",
      "商业视频",
      "分镜",
      "人物真实感",
      "提示词编译"
    ],
    "model": [
      "Seedance 2.5"
    ],
    "includedSkills": [
      "seedance-2-5-prompt"
    ],
    "version": "未声明",
    "author": "matutu-ai",
    "created": "2026-08-19",
    "updated": "2026-09-07",
    "license": "MIT",
    "licenseNote": "按仓库 LICENSE 条款使用。",
    "icon": "film",
    "sourceLabel": "matutu-ai/seedance2.5-skill",
    "sourceUrl": "https://github.com/matutu-ai/seedance2.5-skill",
    "entryUrl": "https://github.com/matutu-ai/seedance2.5-skill/blob/main/seedance-2-5-prompt/SKILL.md",
    "fileName": "skills/seedance2-5-skill/SKILL.md",
    "url": "skills/seedance2-5-skill/"
  },
  {
    "id": "tiktok-shop-seedance-2-5-skill",
    "name": "TikTok Shop · 海外电商视频",
    "subtitle": "从市场信号到电商视频成片方案",
    "category": "AI视频",
    "categoryKey": "video",
    "description": "围绕产品与目标市场完成趋势研究、爆款拆解、UGC 脚本、分镜和 Seedance 2.5 提示词，支持一致性检查与批量生产。",
    "promptText": "使用 overseas-ecommerce-seedance，为我提供的产品制作面向目标国家与平台的海外电商短视频方案。请完成产品和受众分析、市场本地化、UGC 脚本、分镜、摄影、声音与 Seedance 2.5 提示词，并做一致性 QA；涉及近期趋势时只使用有日期和来源的真实数据。",
    "input": "产品图片、产品链接、TikTok 或 Reels 参考视频、目标国家与平台、时长、卖点，或趋势与批量生产请求。",
    "output": [
      "产品、受众、市场与趋势分析",
      "UGC 脚本、分镜、摄影与声音方案",
      "Seedance 2.5 提示词及一致性 QA"
    ],
    "requirements": [
      "近期趋势判断需要真实实时数据；不可用时必须标记 LIVE DATA UNAVAILABLE。",
      "实际视频生成需要 Seedance 2.5；视频和音频分析可能依赖 ffmpeg、ffprobe、yt-dlp 与转写工具。",
      "真人肖像、竞品素材和受版权保护内容必须具有相应授权。"
    ],
    "workflow": [
      "根据产品、链接、参考视频或趋势请求自动选择工作流",
      "分析产品、受众与目标市场本地化",
      "研究趋势或拆解爆款机制，区分实时数据与静态 Pattern",
      "生成 UGC 脚本、分镜、摄影、声音与 Seedance 2.5 提示词",
      "完成产品、人物、商业和 Seedance 一致性检查"
    ],
    "useCases": [
      "TikTok Shop 海外电商短视频",
      "UGC 广告与产品视频",
      "趋势、爆款与评论洞察",
      "Seedance 2.5 批量视频生产"
    ],
    "example": "使用 overseas-ecommerce-seedance，为我提供的产品制作面向美国 TikTok Shop 的 15 秒 UGC 视频方案，输出产品分析、英文口播、分镜和 Seedance 2.5 提示词；没有实时趋势数据时明确标注。",
    "tags": [
      "TikTok Shop",
      "UGC",
      "海外电商",
      "趋势研究",
      "Seedance 2.5"
    ],
    "model": [
      "Seedance 2.5"
    ],
    "includedSkills": [
      "overseas-ecommerce-seedance"
    ],
    "version": "1.0.0",
    "author": "matutu-ai",
    "created": "2026-08-26",
    "updated": "2026-09-06",
    "license": "未声明",
    "licenseNote": "公开可见不等于授权商用，使用前请核对仓库说明。",
    "icon": "film",
    "sourceLabel": "matutu-ai/TikTok-Shop-Seedance-2.5-skill",
    "sourceUrl": "https://github.com/matutu-ai/TikTok-Shop-Seedance-2.5-skill",
    "entryUrl": "https://github.com/matutu-ai/TikTok-Shop-Seedance-2.5-skill/blob/main/overseas-ecommerce-seedance/SKILL.md",
    "fileName": "skills/tiktok-shop-seedance-2-5-skill/SKILL.md",
    "url": "skills/tiktok-shop-seedance-2-5-skill/"
  },
  {
    "id": "geo",
    "name": "GEO V3 · 关键词&九大画像",
    "subtitle": "从企业资料到验证闭环",
    "category": "GEO",
    "categoryKey": "geo",
    "description": "将企业资料转化为可追溯的证据、关键词、九大画像、内容矩阵与发布策略，并通过验证和缺口分析持续优化。",
    "promptText": "使用 geo-keyword-profile-template 分析我提供的企业资料。先说明 GEO V3 框架、已有事实与资料缺口，再按正式流程生成简约版关键词和九大画像；不要虚构企业、案例、资质、数据或验证结果。",
    "input": "企业介绍、产品或服务资料、案例、图片、docx、xlsx、文本或网页链接，以及用户的生成、调整、批量或验证指令。",
    "output": [
      "企业 GEO Profile 与证据记录",
      "关键词矩阵、九大画像与垂直画像",
      "内容矩阵、发布策略、验证结果与缺口队列"
    ],
    "requirements": [
      "企业事实与结论需要可验证来源；缺失信息必须明确标注。",
      "完整执行需要按 INDEX.md 路由读取仓库中的 schemas、workflows、templates 与 references。",
      "任何客户语料库读取、创建或更新均需遵守正式入口中的确认规则。"
    ],
    "workflow": [
      "清洗企业资料并区分事实、证据与缺失项",
      "建立企业 GEO Profile、行业研究与竞争研究",
      "生成搜索意图、关键词矩阵、九大画像与垂直画像",
      "规划内容矩阵与动态发布策略",
      "执行 GEO 验证、缺口分析、内容补强与再次验证"
    ],
    "useCases": [
      "企业 GEO 关键词规划",
      "企业与垂直业务画像生成",
      "内容矩阵与发布策略制定",
      "GEO 验证与缺口分析"
    ],
    "example": "使用 GEO V3 · 关键词&九大画像，分析我提供的企业资料，先给出仓库框架摘要和资料缺口，再生成简约版关键词与九大画像。",
    "tags": [
      "GEO",
      "关键词策略",
      "企业画像",
      "内容规划",
      "证据管理"
    ],
    "model": [],
    "includedSkills": [
      "geo-keyword-profile-template"
    ],
    "version": "3.0.6",
    "author": "matutu-ai",
    "created": "2026-08-24",
    "updated": "2026-09-07",
    "license": "MIT",
    "licenseNote": "按仓库 LICENSE 条款使用。",
    "icon": "search",
    "sourceLabel": "matutu-ai/GEO",
    "sourceUrl": "https://github.com/matutu-ai/GEO",
    "entryUrl": "https://github.com/matutu-ai/GEO/blob/main/SKILL.md",
    "fileName": "skills/geo/SKILL.md",
    "url": "skills/geo/"
  },
  {
    "id": "geo-bd",
    "name": "GEO-BD · 企业初次诊断",
    "subtitle": "看清 AI 知道什么，也看清下一步",
    "category": "GEO",
    "categoryKey": "geo",
    "description": "根据企业事实、AI 认知记录、竞争情况和证据，输出 GEO 诊断、机会评分、行动计划与复测报告。",
    "promptText": "使用 geo-diagnostic-engine，根据我提供的企业事实、证据、真实 AI 观察和已确认竞品生成 Executive GEO 诊断。所有分数都要可追溯；缺失数据保持 UNKNOWN、NOT_RUN 或 INSUFFICIENT_DATA，并给出机会排序、P0 至 P3 行动计划和复测方法。",
    "input": "企业资料 JSON，包括公司事实、材料、真实 AI observations、已确认竞品、证据、问题、关键词方向、当前指标与验证约束。",
    "output": [
      "Executive、Operational 或 Technical 分层诊断报告",
      "diagnostic.json 与可选 report.json",
      "GEO 缺口、机会排序、行动计划与复测方案"
    ],
    "requirements": [
      "完整 AI 表现判断需要真实 observed 或 provided AI 记录；模拟记录不参与评分。",
      "竞品与 Evidence 需要来源和状态，缺失数据必须保持 UNKNOWN、NOT_RUN 或 INSUFFICIENT_DATA。",
      "运行仓库诊断脚本需要 Python 3；默认可使用 ManualProvider 或 OfflineProvider。"
    ],
    "workflow": [
      "读取客户资料并确认已有与缺失内容",
      "建立企业实体、Evidence Graph 与 AI 认知记录",
      "生成 Query Matrix 并分析竞品差距、EEAAP 与 EEAT",
      "计算 GEO Gap、Opportunity Score 与分级行动计划",
      "生成分层报告、验证计划与 Before/After 复测"
    ],
    "useCases": [
      "企业 GEO 全链路诊断",
      "AI 认知与推荐缺席排查",
      "竞品、证据和机会分析",
      "讯灵账户前置背调与复测"
    ],
    "example": "使用 GEO Diagnostic Engine V3，根据这份企业资料和真实 AI 观察生成 Executive GEO 诊断；缺失数据保持 UNKNOWN，并给出 P0 至 P3 行动与复测计划。",
    "tags": [
      "GEO 诊断",
      "AI 认知",
      "竞品分析",
      "证据图谱",
      "复测报告"
    ],
    "model": [],
    "includedSkills": [
      "geo-diagnostic-engine"
    ],
    "version": "V3",
    "author": "matutu-ai",
    "created": "2026-08-27",
    "updated": "2026-09-08",
    "license": "未声明",
    "licenseNote": "公开可见不等于授权商用，使用前请核对仓库说明。",
    "icon": "search",
    "sourceLabel": "matutu-ai/GEO-BD",
    "sourceUrl": "https://github.com/matutu-ai/GEO-BD",
    "entryUrl": "https://github.com/matutu-ai/GEO-BD/blob/main/geo-account-precheck/SKILL.md",
    "fileName": "skills/geo-bd/SKILL.md",
    "url": "skills/geo-bd/"
  },
  {
    "id": "danyuange",
    "name": "国际版 GEO · 九大单元",
    "subtitle": "一套资料，两份一致的九大单元工作簿",
    "category": "自动化",
    "categoryKey": "automation",
    "description": "先根据客户真实资料判定制造商或服务商，再按对应官方模板导出结构一致的英文原版、纯中文分析版与独立缺失资料清单。",
    "promptText": "使用 danyuange，读取我提供的客户资料。先根据真实填写字段判断客户是制造商还是服务商，再严格使用对应官方模板输出英文原版、纯中文分析版两份九大单元工作簿，并单独输出补充资料清单。不要使用模板示例补全客户事实。",
    "input": "国际版 GEO 下单表、制造行业或服务行业九大单元资料，以及仓库提供的两份官方模板。",
    "output": [
      "英文原版九大单元工作簿",
      "纯中文分析版九大单元工作簿",
      "独立补充资料清单"
    ],
    "requirements": [
      "需要配套的制造商或服务商官方 xlsx 模板及 references 文件。",
      "所有内容必须来自客户真实填写资料，缺失字段保持空白并列入独立清单。",
      "执行环境需要能够读取和写入 xlsx 文件。"
    ],
    "workflow": [
      "依据客户真实填写字段判定制造商或服务商",
      "选择对应官方模板并清空示例数据",
      "把客户内容映射到官方字段",
      "导出结构一致的英文原版与纯中文分析版工作簿",
      "单独整理缺失资料清单并完成交付自查"
    ],
    "useCases": [
      "国际版 GEO 九大单元交付",
      "制造商资料标准化",
      "服务商资料标准化",
      "中英文工作簿同步整理"
    ],
    "example": "使用国际版 GEO · 九大单元，先判断这份客户资料属于制造商还是服务商，再按官方模板输出英文原版、纯中文分析版和独立补充资料清单。",
    "tags": [
      "GEO",
      "九大单元",
      "双语交付",
      "Excel",
      "制造商与服务商"
    ],
    "model": [],
    "includedSkills": [
      "danyuange"
    ],
    "version": "未声明",
    "author": "matutu-ai",
    "created": "2026-08-26",
    "updated": "2026-09-03",
    "license": "未声明",
    "licenseNote": "公开可见不等于授权商用，使用前请核对仓库说明。",
    "icon": "file",
    "sourceLabel": "matutu-ai/danyuange",
    "sourceUrl": "https://github.com/matutu-ai/danyuange",
    "entryUrl": "https://github.com/matutu-ai/danyuange/blob/main/SKILL.md",
    "fileName": "skills/danyuange/SKILL.md",
    "url": "skills/danyuange/"
  }
];
