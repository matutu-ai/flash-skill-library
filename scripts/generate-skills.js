#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');

const root = path.resolve(__dirname, '..');
const skillsRoot = path.join(root, 'skills');
const defaultSiteUrl = 'https://matutu-ai.github.io/flash-skill-library/';
const siteUrl = new URL(process.env.SITE_URL || process.env.CF_PAGES_URL || defaultSiteUrl);
if (!['http:', 'https:'].includes(siteUrl.protocol)) fail('SITE_URL 或 CF_PAGES_URL 必须使用 http 或 https');
siteUrl.pathname = `${siteUrl.pathname.replace(/\/+$/, '')}/`;
siteUrl.search = '';
siteUrl.hash = '';
const categoryDefinitions = [
  { key: 'video', name: 'AI视频' },
  { key: 'image', name: 'AI图片' },
  { key: 'geo', name: 'GEO' },
  { key: 'agent', name: 'Agent' },
  { key: 'automation', name: '自动化' },
  { key: 'prompt', name: 'Prompt' }
];
const categoryKeys = new Set(categoryDefinitions.map(category => category.key));
const legacyCategoryKeys = new Map([
  ['web', 'automation'],
  ['marketing', 'geo'],
  ['office', 'automation']
]);
const requiredFields = [
  'id',
  'name',
  'subtitle',
  'description',
  'category',
  'category_label',
  'category_key',
  'tags',
  'model',
  'version',
  'author',
  'created',
  'updated',
  'prompt',
  'workflow',
  'use_cases',
  'github',
  'included_skills',
  'input',
  'output',
  'requirements',
  'platform_usage',
  'example',
  'icon',
  'source_label',
  'entry_url',
  'entry_type',
  'file_name',
  'license',
  'license_note',
  'visibility'
];
const listFields = ['tags', 'model', 'workflow', 'use_cases', 'included_skills', 'output', 'requirements'];

function fail(message) {
  throw new Error(message);
}

function compareStrings(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizeGithubRepoUrl(value, id) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${id}: github 不是有效 URL`);
  }
  const parts = url.pathname.split('/').filter(Boolean);
  if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'github.com' || parts.length !== 2) {
    fail(`${id}: github 必须是 https://github.com/{owner}/{repo} 仓库根地址`);
  }
  const owner = parts[0].toLowerCase();
  const repo = parts[1].replace(/\.git$/i, '').toLowerCase();
  return `https://github.com/${owner}/${repo}`;
}

function validateEntryUrl(value, normalizedRepo, id) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${id}: entry_url 不是有效 URL`);
  }
  const parts = url.pathname.split('/').filter(Boolean);
  const entryRepo = parts.length >= 2
    ? `https://github.com/${parts[0].toLowerCase()}/${parts[1].replace(/\.git$/i, '').toLowerCase()}`
    : '';
  if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'github.com' || entryRepo !== normalizedRepo) {
    fail(`${id}: entry_url 必须属于对应的 GitHub 仓库`);
  }
}

function normalizeCategoryKey(value, id) {
  const categoryKey = legacyCategoryKeys.get(value) || value;
  if (!categoryKeys.has(categoryKey)) fail(`${id}: category_key 无法映射到固定分类`);
  return categoryKey;
}

function extractPromptText(filePath, id) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^[ \t]{0,3}(`{3,}|~{3,})[^\r\n]*\r?\n([\s\S]*?)\r?\n[ \t]{0,3}\1[ \t]*$/m);
  if (!match) fail(`${id}: prompt.md 缺少 fenced code block`);
  const promptText = match[2].trim();
  if (!promptText) fail(`${id}: prompt.md 的首个 fenced code block 不得为空`);
  return promptText;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  })[character]);
}

function publicUrl(relativePath = '') {
  return new URL(relativePath, siteUrl).toString();
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function seoDescription(skill) {
  return `${skill.name} AI 工作流和提示词库：${skill.subtitle}。查看 Prompt、Workflow、使用方法与 GitHub 仓库。`;
}

function skillSchema(skill) {
  const canonicalUrl = publicUrl(skill.url);
  const author = skill.author === '未署名'
    ? null
    : {
        '@type': skill.author === 'matutu-ai' ? 'Organization' : 'Person',
        name: skill.author
      };
  const hasDeclaredVersion = !['未声明', '未统一声明'].includes(skill.version);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#creative-work`,
        name: skill.name,
        description: skill.description,
        url: canonicalUrl,
        dateCreated: skill.created,
        dateModified: skill.updated,
        keywords: skill.tags.join(', '),
        ...(author ? { author } : {}),
        isPartOf: {
          '@type': 'CollectionPage',
          name: 'TUTU',
          url: publicUrl()
        }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#software-application`,
        name: skill.name,
        description: skill.description,
        url: canonicalUrl,
        applicationCategory: 'AI Skill',
        applicationSubCategory: skill.category,
        operatingSystem: 'Cross-platform',
        codeRepository: skill.sourceUrl,
        featureList: skill.workflow,
        ...(hasDeclaredVersion ? { softwareVersion: skill.version } : {})
      }
    ]
  };
}

function renderHomepageSeo(skills) {
  const title = 'TUTU | AI Skill Archive';
  const description = 'TUTU 是一个 GitHub 驱动的 AI Skill 全球知识库，收录公开 AI Skills、Prompts、Agents 与 Workflows。';
  const canonicalUrl = publicUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TUTU',
    description,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: skills.length,
      itemListElement: skills.map((skill, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: skill.name,
        url: publicUrl(skill.url)
      }))
    }
  };
  return `<!-- SEO:START -->
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="TUTU">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <script type="application/ld+json">${serializeJsonLd(schema)}</script>
  <!-- SEO:END -->`;
}

function updateHomepageSeo(skills) {
  const indexPath = path.join(root, 'public', 'index.html');
  const source = fs.readFileSync(indexPath, 'utf8');
  const marker = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
  if (!marker.test(source)) fail('public/index.html 缺少 SEO 生成标记');
  fs.writeFileSync(indexPath, source.replace(marker, renderHomepageSeo(skills)));
}

function renderSitemap(skills) {
  const latestUpdate = skills.map(skill => skill.updated).sort(compareStrings).at(-1);
  const entries = [
    { url: publicUrl(), updated: latestUpdate },
    ...skills.map(skill => ({ url: publicUrl(skill.url), updated: skill.updated }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url><loc>${escapeXml(entry.url)}</loc><lastmod>${escapeXml(entry.updated)}</lastmod></url>`).join('\n')}
</urlset>
`;
}

function toApiSkill(skill) {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    tags: skill.tags,
    prompt: skill.promptText,
    workflow: skill.workflow,
    embedding: null,
    downloads: 0,
    stars: null,
    version: skill.version,
    created_time: `${skill.created}T00:00:00.000Z`
  };
}

function renderList(items, className = '') {
  const classAttribute = className ? ` class="${className}"` : '';
  return `<ul${classAttribute}>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderPlatformUsage(guides) {
  return guides.map(guide => `
          <article class="skill-detail-platform-card">
            <p class="skill-detail-platform-name">${escapeHtml(guide.name)}</p>
            <p class="skill-detail-platform-summary">${escapeHtml(guide.summary)}</p>
            <ol class="skill-detail-platform-steps">${guide.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
            ${guide.notes?.length ? `<ul class="skill-detail-platform-notes">${guide.notes.map(note => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : ''}
          </article>`).join('');
}

function renderDetailPage(skill) {
  const model = skill.model.length ? skill.model.join(' · ') : '通用';
  const canonicalUrl = publicUrl(skill.url);
  const detailTitle = `${skill.name} AI Skill | TUTU`;
  const detailDescription = seoDescription(skill);
  const tags = skill.tags.map(tag => `<li>${escapeHtml(tag)}</li>`).join('');
  const workflow = skill.workflow.map((step, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(step)}</p></li>`).join('');
  const useSteps = [
    `<strong>准备输入</strong><p>${escapeHtml(skill.input)}</p>`,
    `<strong>打开正式入口</strong><p>进入对应 GitHub 仓库，先阅读正式 Skill 入口和仓库内的配套文件。</p>`,
    `<strong>复制并填写 Prompt</strong><p>复制本页 Prompt，将其中的目标、资料和限制替换为当前任务的真实信息。</p>`,
    `<strong>按 Workflow 执行</strong><p>依次完成各步骤，并根据运行要求检查结果后再交付。</p>`
  ].map((step, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div>${step}</div></li>`).join('');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f4f2ea">
  <title>${escapeHtml(detailTitle)}</title>
  <meta name="description" content="${escapeHtml(detailDescription)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TUTU">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:title" content="${escapeHtml(detailTitle)}">
  <meta property="og:description" content="${escapeHtml(detailDescription)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="article:published_time" content="${escapeHtml(skill.created)}">
  <meta property="article:modified_time" content="${escapeHtml(skill.updated)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(detailTitle)}">
  <meta name="twitter:description" content="${escapeHtml(detailDescription)}">
  <script type="application/ld+json">${serializeJsonLd(skillSchema(skill))}</script>
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/style.css">
  <script defer src="../../assets/detail.js"></script>
</head>
<body class="skill-detail-body">
  <a class="skip-link" href="#detail-content">直接阅读 Skill</a>
  <header class="site-header skill-detail-header">
    <a class="brand" href="../../index.html" aria-label="TUTU 首页"><span class="brand-mark" aria-hidden="true">T<span>•</span></span><span class="brand-name">TUTU<small>AI SKILL ARCHIVE</small></span></a>
    <nav aria-label="详情页导航"><a class="nav-link" href="../../index.html#library">全部 Skill</a><a class="nav-cta" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer">GitHub 仓库 <span aria-hidden="true">↗</span></a></nav>
  </header>

  <main class="skill-detail-page" id="detail-content">
    <section class="skill-detail-hero page-width">
      <a class="skill-detail-back" href="../../index.html#library">← 返回技能库</a>
      <p class="skill-detail-kicker">PUBLIC REPOSITORY / ${escapeHtml(skill.category)}</p>
      <div class="skill-detail-hero-grid">
        <div>
          <h1>${escapeHtml(skill.name)}</h1>
          <p class="skill-detail-subtitle">${escapeHtml(skill.subtitle)}</p>
          <p class="skill-detail-lede">${escapeHtml(skill.description)}</p>
          <ul class="skill-detail-tags" aria-label="技能标签">${tags}</ul>
          <div class="skill-detail-actions">
            <button class="button button-dark" data-copy-prompt>复制 Prompt <span aria-hidden="true">↗</span></button>
            <a class="button button-github" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer">查看 GitHub 仓库 <span aria-hidden="true">↗</span></a>
            <a class="button button-light" href="${escapeHtml(skill.entryUrl)}" target="_blank" rel="noopener noreferrer">打开正式入口 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <dl class="skill-detail-meta">
          <div><dt>分类</dt><dd>${escapeHtml(skill.category)}</dd></div>
          <div><dt>支持模型</dt><dd>${escapeHtml(model)}</dd></div>
          <div><dt>版本</dt><dd>${escapeHtml(skill.version)}</dd></div>
          <div><dt>作者</dt><dd>${escapeHtml(skill.author)}</dd></div>
          <div><dt>最近更新</dt><dd>${escapeHtml(skill.updated)}</dd></div>
        </dl>
      </div>
    </section>

    <div class="skill-detail-layout page-width">
      <article class="skill-detail-content">
        <section class="skill-detail-section" id="use-cases">
          <p class="skill-detail-section-label">01 / USE CASES</p>
          <h2>适合用来做什么</h2>
          ${renderList(skill.useCases, 'skill-detail-list')}
        </section>

        <section class="skill-detail-section" id="prompt">
          <div class="skill-detail-section-heading"><div><p class="skill-detail-section-label">02 / PROMPT</p><h2>Prompt 内容</h2></div><button class="skill-detail-copy-small" data-copy-prompt>复制 Prompt</button></div>
          <pre class="skill-detail-prompt" id="prompt-text" tabindex="0"><code>${escapeHtml(skill.promptText)}</code></pre>
        </section>

        <section class="skill-detail-section" id="workflow">
          <p class="skill-detail-section-label">03 / WORKFLOW</p>
          <h2>执行流程</h2>
          <ol class="skill-detail-workflow">${workflow}</ol>
        </section>

        <section class="skill-detail-section" id="usage">
          <p class="skill-detail-section-label">04 / HOW TO USE</p>
          <h2>使用方法</h2>
          <ol class="skill-detail-use-steps">${useSteps}</ol>
        </section>

        <section class="skill-detail-section" id="platform-usage">
          <p class="skill-detail-section-label">05 / PLATFORM USE</p>
          <h2>豆包、千问怎么使用</h2>
          <div class="skill-detail-platform-grid">${renderPlatformUsage(skill.platformUsage)}</div>
        </section>

        <section class="skill-detail-section skill-detail-two-column" id="delivery">
          <div><p class="skill-detail-section-label">06 / OUTPUT</p><h2>你会得到</h2>${renderList(skill.output, 'skill-detail-list')}</div>
          <div><p class="skill-detail-section-label">07 / REQUIREMENTS</p><h2>使用前确认</h2>${renderList(skill.requirements, 'skill-detail-list')}</div>
        </section>

        <section class="skill-detail-section" id="updates">
          <p class="skill-detail-section-label">08 / UPDATE LOG</p>
          <h2>更新记录</h2>
          <div class="skill-detail-update"><span>${escapeHtml(skill.updated)}</span><div><strong>${escapeHtml(skill.version)}</strong><p>当前公开仓库版本；本档案首次记录于 ${escapeHtml(skill.created)}。</p></div></div>
        </section>
      </article>

      <aside class="skill-detail-aside">
        <nav class="skill-detail-toc" aria-label="页内目录">
          <span>ON THIS PAGE</span>
          <a href="#use-cases">使用场景</a>
          <a href="#prompt">Prompt</a>
          <a href="#workflow">Workflow</a>
          <a href="#usage">使用方法</a>
          <a href="#platform-usage">平台使用</a>
          <a href="#delivery">输出与要求</a>
          <a href="#updates">更新记录</a>
        </nav>
        <section class="skill-detail-source">
          <span>REPOSITORY</span>
          <strong>${escapeHtml(skill.sourceLabel)}</strong>
          <p>一张档案对应一个公开 GitHub 仓库。</p>
          <a href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer">GitHub 仓库 ↗</a>
          <a href="${escapeHtml(skill.entryUrl)}" target="_blank" rel="noopener noreferrer">正式 Skill 入口 ↗</a>
          <a href="SKILL.md" download="${escapeHtml(skill.id)}-SKILL.md">下载入口说明 ↓</a>
        </section>
        <section class="skill-detail-source">
          <span>INCLUDED SKILLS</span>
          ${renderList(skill.includedSkills)}
        </section>
        <section class="skill-detail-source">
          <span>LICENSE</span>
          <strong>${escapeHtml(skill.license)}</strong>
          <p>${escapeHtml(skill.licenseNote)}</p>
        </section>
      </aside>
    </div>
  </main>

  <footer class="page-width footer skill-detail-footer"><a class="brand" href="../../index.html"><span class="brand-mark" aria-hidden="true">T<span>•</span></span><span class="brand-name">TUTU<small>AI SKILL ARCHIVE</small></span></a><p>${escapeHtml(skill.sourceLabel)}</p><a href="#detail-content">回到顶部 ↑</a></footer>
  <div class="skill-detail-toast" id="skill-detail-toast" role="status" hidden></div>
</body>
</html>
`;
}

function readActiveSkills() {
  const entries = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort((a, b) => compareStrings(a.name, b.name));

  const seenIds = new Set();
  const seenRepos = new Map();
  const active = [];

  for (const entry of entries) {
    const yamlPath = path.join(skillsRoot, entry.name, 'skill.yaml');
    if (!fs.existsSync(yamlPath)) continue;
    const data = YAML.parse(fs.readFileSync(yamlPath, 'utf8'));
    if (data?.catalog_status !== 'active') continue;

    for (const field of requiredFields) {
      if (!(field in data) || data[field] === null || data[field] === '') {
        fail(`${entry.name}: 缺少必填字段 ${field}`);
      }
    }
    for (const field of listFields) {
      if (!Array.isArray(data[field])) fail(`${entry.name}: ${field} 必须是数组`);
    }
    if (!data.tags.length || !data.workflow.length || !data.use_cases.length || !data.included_skills.length) {
      fail(`${entry.name}: tags、workflow、use_cases 和 included_skills 不得为空`);
    }
    if (!Array.isArray(data.platform_usage) || !data.platform_usage.length) {
      fail(`${entry.name}: platform_usage 必须是非空数组`);
    }
    data.platform_usage.forEach((guide, index) => {
      if (!guide || typeof guide.name !== 'string' || !guide.name.trim()) {
        fail(`${entry.name}: platform_usage[${index}].name 必须是非空字符串`);
      }
      if (typeof guide.summary !== 'string' || !guide.summary.trim()) {
        fail(`${entry.name}: platform_usage[${index}].summary 必须是非空字符串`);
      }
      if (!Array.isArray(guide.steps) || !guide.steps.length || guide.steps.some(step => typeof step !== 'string' || !step.trim())) {
        fail(`${entry.name}: platform_usage[${index}].steps 必须是非空字符串数组`);
      }
      if (guide.notes !== undefined && (!Array.isArray(guide.notes) || guide.notes.some(note => typeof note !== 'string' || !note.trim()))) {
        fail(`${entry.name}: platform_usage[${index}].notes 必须是字符串数组`);
      }
    });
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) fail(`${entry.name}: id 格式无效`);
    if (data.id !== entry.name) fail(`${entry.name}: 目录名必须与 id 一致`);
    if (seenIds.has(data.id)) fail(`${entry.name}: id 重复`);
    seenIds.add(data.id);

    const normalizedRepo = normalizeGithubRepoUrl(data.github, data.id);
    if (seenRepos.has(normalizedRepo)) {
      fail(`${data.id}: GitHub 仓库与 ${seenRepos.get(normalizedRepo)} 重复`);
    }
    seenRepos.set(normalizedRepo, data.id);
    validateEntryUrl(data.entry_url, normalizedRepo, data.id);

    const localSource = path.join(skillsRoot, data.id, 'SKILL.md');
    if (!fs.existsSync(localSource)) fail(`${data.id}: 缺少本地 SKILL.md 或仓库集合说明`);
    const promptPath = path.join(skillsRoot, data.id, data.prompt);
    if (!fs.existsSync(promptPath)) fail(`${data.id}: prompt 指向的文件不存在`);
    const categoryKey = normalizeCategoryKey(data.category_key, data.id);
    const category = categoryDefinitions.find(item => item.key === categoryKey);
    if (data.file_name !== `skills/${data.id}/SKILL.md`) {
      fail(`${data.id}: file_name 必须指向当前仓库卡片的公开说明`);
    }
    if (data.visibility !== 'public') fail(`${data.id}: 只有 public 仓库可以进入前台`);

    active.push({
      order: Number.isFinite(data.order) ? data.order : Number.MAX_SAFE_INTEGER,
      id: data.id,
      name: data.name,
      subtitle: data.subtitle,
      category: category.name,
      categoryKey,
      description: data.description,
      promptText: extractPromptText(promptPath, data.id),
      input: data.input,
      output: data.output,
      requirements: data.requirements,
      platformUsage: data.platform_usage,
      workflow: data.workflow,
      useCases: data.use_cases,
      example: data.example,
      tags: data.tags,
      model: data.model,
      includedSkills: data.included_skills,
      version: data.version,
      author: data.author,
      created: data.created,
      updated: data.updated,
      license: data.license,
      licenseNote: data.license_note,
      icon: data.icon,
      sourceLabel: data.source_label,
      sourceUrl: data.github,
      entryUrl: data.entry_url,
      fileName: data.file_name,
      url: `skills/${data.id}/`
    });
  }

  active.sort((a, b) => a.order - b.order || compareStrings(a.id, b.id));
  if (active.length !== seenRepos.size) fail('活动卡片数与唯一 GitHub 仓库数不一致');
  if (active.some(skill => skill.id === 'agent-work-log' || /macos-obsidian/i.test(skill.sourceUrl))) {
    fail('代理商工作日报或 macos-obsidian 不得进入公开索引');
  }
  return active;
}

function writeGeneratedFiles(skills) {
  const fuseSource = path.join(path.dirname(require.resolve('fuse.js')), 'fuse.min.js');
  if (!fs.existsSync(fuseSource)) fail('fuse.js 缺少 dist/fuse.min.js 浏览器构建');

  const publicSkills = skills.map(({ order, ...skill }) => skill);
  const categoryCounts = new Map(categoryDefinitions.map(category => [category.key, 0]));
  for (const skill of publicSkills) {
    categoryCounts.set(skill.categoryKey, categoryCounts.get(skill.categoryKey) + 1);
  }
  const categories = categoryDefinitions.map(category => ({
    ...category,
    count: categoryCounts.get(category.key)
  }));
  const apiSkills = publicSkills.map(toApiSkill);

  fs.writeFileSync(path.join(root, 'data', 'skills.json'), `${JSON.stringify(publicSkills, null, 2)}\n`);
  fs.writeFileSync(path.join(root, 'data', 'categories.json'), `${JSON.stringify(categories, null, 2)}\n`);
  fs.writeFileSync(
    path.join(root, 'public', 'assets', 'catalog.js'),
    `window.SKILL_CATALOG = ${JSON.stringify(publicSkills, null, 2)};\n`
  );
  const apiDir = path.join(root, 'public', 'api');
  fs.mkdirSync(apiDir, { recursive: true });
  fs.writeFileSync(path.join(apiDir, 'skills.json'), `${JSON.stringify(apiSkills, null, 2)}\n`);
  fs.copyFileSync(fuseSource, path.join(root, 'public', 'assets', 'fuse.min.js'));

  for (const skill of publicSkills) {
    const source = path.join(skillsRoot, skill.id, 'SKILL.md');
    const destinationDir = path.join(root, 'public', 'skills', skill.id);
    fs.mkdirSync(destinationDir, { recursive: true });
    fs.copyFileSync(source, path.join(destinationDir, 'SKILL.md'));
    fs.writeFileSync(path.join(destinationDir, 'index.html'), renderDetailPage(skill));
  }

  updateHomepageSeo(publicSkills);
  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), renderSitemap(publicSkills));
  fs.writeFileSync(
    path.join(root, 'public', 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${publicUrl('sitemap.xml')}\n`
  );
}

const skills = readActiveSkills();
writeGeneratedFiles(skills);
console.log(`Generated ${skills.length} repository cards from ${skills.length} unique GitHub repositories.`);
