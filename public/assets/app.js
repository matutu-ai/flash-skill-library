(() => {
  'use strict';
  const categoryLabels = {video:'AI视频', image:'AI图片', geo:'GEO', agent:'Agent', automation:'自动化', prompt:'Prompt'};
  const legacyCategoryKeys = {web:'automation', marketing:'geo', office:'automation'};
  const catalog = (window.SKILL_CATALOG || []).map(skill => {
    const categoryKey = legacyCategoryKeys[skill.categoryKey] || skill.categoryKey;
    return {...skill, categoryKey, category:categoryLabels[categoryKey] || skill.category};
  });
  const $ = (selector) => document.querySelector(selector);
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const stage = (progress, start, end) => clamp((progress - start) / (end - start));
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icons = {
    spark: '<path d="M12 2v5m0 10v5M2 12h5m10 0h5M5 5l3.5 3.5m7 7L19 19M5 19l3.5-3.5m7-7L19 5"/><circle cx="12" cy="12" r="3"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4m-4 6h4m10-6h4m-4 6h4m-11-6 5 3-5 3Z"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M9 8v13m5-9 3 3-3 3"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 18 5-5 3 3 3-4 5 6"/>',
    file: '<path d="M6 3h8l4 4v14H6ZM14 3v5h4M9 12h6m-6 4h6"/>'
  };
  const icon = (type) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.file}</svg>`;
  document.querySelectorAll('[data-total]').forEach(el => { el.textContent = String(catalog.length).padStart(2, '0'); });

  const story = $('#story');
  const root = document.documentElement;
  const siteHeader = $('.site-header');
  const lithosHero = $('#lithos-hero-root');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = ['01 / 等待开启', '02 / 拉开抽屉', '03 / 分类展开', '04 / 进入档案', '05 / 灵感归位'];
  const sticky = $('.story-sticky');
  const heroCopy = $('.hero-copy');
  const chapterLabel = $('#chapter-label');
  const progressValue = $('#progress-value');
  let animationFrame = 0;
  let lastProgress = -1;
  let lastChapter = -1;
  let lastPercent = -1;
  let lastHeroInert = false;
  let storyNearViewport = true;
  let layoutDirty = true;
  let headerHeight = 0;
  let storyDistance = 1;
  let darkHeaderBoundary = 0;

  function measureLayout() {
    headerHeight = siteHeader.getBoundingClientRect().height;
    storyDistance = Math.max(1, story.offsetHeight - sticky.offsetHeight);
    darkHeaderBoundary = lithosHero.offsetTop + lithosHero.offsetHeight - headerHeight * .65;
    layoutDirty = false;
  }

  function renderStory() {
    const rect = story.getBoundingClientRect();
    const progress = motionQuery.matches ? 0 : clamp((headerHeight - rect.top) / storyDistance);
    if (progress === lastProgress) return;
    lastProgress = progress;
    const pull = stage(progress, 0, .35);
    const unfold = stage(progress, .35, .60);
    const zoom = stage(progress, .60, .85);
    const reveal = stage(progress, .85, 1);
    root.style.cssText = `--p:${progress};--pull:${pull};--unfold:${unfold};--zoom:${zoom};--reveal:${reveal};--hero-visibility:${pull > .68 ? 'hidden' : 'visible'};--ending-visibility:${reveal > 0 ? 'visible' : 'hidden'}`;
    const heroInert = pull > .68;
    if (heroInert !== lastHeroInert) {
      heroCopy.inert = heroInert;
      lastHeroInert = heroInert;
    }
    const chapter = progress === 0 ? 0 : progress < .35 ? 1 : progress < .60 ? 2 : progress < .85 ? 3 : 4;
    if (chapter !== lastChapter) {
      chapterLabel.textContent = chapters[chapter];
      lastChapter = chapter;
    }
    const percent = Math.round(progress * 100);
    if (percent !== lastPercent) {
      progressValue.textContent = `${String(percent).padStart(2, '0')}%`;
      lastPercent = percent;
    }
  }
  function renderHeaderTone() {
    siteHeader.classList.toggle('on-dark', window.scrollY < darkHeaderBoundary);
  }
  function renderViewport() {
    animationFrame = 0;
    if (layoutDirty) measureLayout();
    renderHeaderTone();
    if (storyNearViewport) renderStory();
  }
  function scheduleViewport() {
    if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(renderViewport);
  }
  window.addEventListener('scroll', scheduleViewport, {passive:true});
  window.addEventListener('resize', () => { layoutDirty = true; lastProgress = -1; scheduleViewport(); }, {passive:true});
  motionQuery.addEventListener('change', () => { lastProgress = -1; scheduleViewport(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
    else scheduleViewport();
  });
  new ResizeObserver(() => { layoutDirty = true; lastProgress = -1; scheduleViewport(); }).observe(story);
  new IntersectionObserver(([entry]) => {
    storyNearViewport = entry.isIntersecting;
    if (storyNearViewport) {
      lastProgress = -1;
      scheduleViewport();
    }
  }, {rootMargin:'100% 0px'}).observe(story);
  $('.hero-actions .button').addEventListener('click', event => {
    if (motionQuery.matches) { event.preventDefault(); $('#library').scrollIntoView({behavior:'instant'}); }
  });
  renderViewport();

  let category = 'all';
  const search = $('#skill-search');
  const grid = $('#skill-grid');
  const dialog = $('#skill-dialog');
  const emptyState = $('#empty-state');
  const searchableFields = ['name', 'subtitle', 'description', 'sourceLabel', 'tags', 'model', 'includedSkills', 'category'];
  const fuse = typeof window.Fuse === 'function'
    ? new window.Fuse(catalog, {keys:searchableFields, threshold:.22, ignoreLocation:true})
    : null;
  let opener = null;
  let activeSkill = null;
  const listValues = value => Array.isArray(value) ? value : value ? [value] : [];
  const searchable = skill => searchableFields.flatMap(field => listValues(skill[field])).join(' ').toLocaleLowerCase();
  const modelLabel = skill => listValues(skill.model).join(' · ') || '通用';
  const hasPrompt = skill => typeof skill.promptText === 'string' && skill.promptText.trim().length > 0;
  const categoryLabel = key => key === 'all' ? '全部' : categoryLabels[key] || key;

  document.querySelectorAll('[data-category-count]').forEach(element => {
    const key = element.dataset.categoryCount;
    const count = key === 'all' ? catalog.length : catalog.filter(skill => skill.categoryKey === key).length;
    element.textContent = String(count).padStart(2, '0');
  });

  function findSkills(query) {
    if (!query) return catalog;
    const normalizedQuery = query.toLocaleLowerCase();
    const exactMatches = catalog.filter(skill => searchable(skill).includes(normalizedQuery));
    if (exactMatches.length || !fuse) return exactMatches;
    return fuse.search(query).map(result => result.item);
  }

  function renderCatalog() {
    const query = search.value.trim();
    const filtered = findSkills(query).filter(skill => category === 'all' || skill.categoryKey === category);
    grid.innerHTML = filtered.map(skill => {
      const tags = listValues(skill.tags).slice(0, 3).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
      const promptDisabled = hasPrompt(skill) ? '' : ' disabled title="Prompt 暂不可用"';
      return `<article class="skill-card"><button class="card-open" data-action="detail" data-skill="${escapeHTML(skill.id)}" aria-label="快速查看 ${escapeHTML(skill.name)}"><div class="card-top"><span class="skill-icon ${escapeHTML(skill.categoryKey)}">${icon(skill.icon)}</span><span class="card-index">REPO / ${String(catalog.indexOf(skill) + 1).padStart(3, '0')}</span></div><h3>${escapeHTML(skill.name)}</h3><p>${escapeHTML(skill.subtitle)}</p><div class="card-tags" aria-label="技能标签">${tags}</div><div class="card-facts"><span><small>分类</small>${escapeHTML(skill.category)}</span><span><small>模型</small>${escapeHTML(modelLabel(skill))}</span><span><small>版本</small>${escapeHTML(skill.version || '未声明')}</span></div></button><div class="card-bottom"><span>${escapeHTML(skill.sourceLabel)}</span><span class="card-actions"><a href="${encodeURI(skill.url)}">查看详情 <span aria-hidden="true">↗</span></a><button data-action="copy" data-skill="${escapeHTML(skill.id)}"${promptDisabled}>复制 Prompt</button><a href="${escapeHTML(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看 ${escapeHTML(skill.sourceLabel)} 仓库">GitHub <span aria-hidden="true">↗</span></a></span></div></article>`;
    }).join('');

    if (query && category !== 'all') $('#result-summary').textContent = `“${query}”在${categoryLabel(category)}分类中找到 ${filtered.length} 个公开技能仓库`;
    else if (query) $('#result-summary').textContent = `“${query}”找到 ${filtered.length} 个公开技能仓库`;
    else if (category !== 'all') $('#result-summary').textContent = `${categoryLabel(category)}分类收录 ${filtered.length} 个公开技能仓库`;
    else $('#result-summary').textContent = `${catalog.length} 个公开技能仓库，一库一档。`;

    emptyState.hidden = filtered.length > 0;
    if (!filtered.length) {
      emptyState.querySelector('h3').textContent = query ? '这个抽屉里，还没找到。' : `${categoryLabel(category)}分类正在等待首个公开仓库。`;
      emptyState.querySelector('p').textContent = query ? '换个关键词，或看看全部档案。' : '你仍可以继续浏览其他分类。';
    }
  }
  $('.filters').addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderCatalog();
  });
  search.addEventListener('input', renderCatalog);
  $('#reset-search').addEventListener('click', () => {
    search.value = '';
    category = 'all';
    document.querySelectorAll('[data-category]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.category === 'all')));
    renderCatalog();
    search.focus();
  });
  function showDetail(skill) {
    activeSkill = skill;
    const list = values => `<ul>${values.map(value => `<li>${escapeHTML(value)}</li>`).join('')}</ul>`;
    const included = skill.includedSkills?.length
      ? `<section class="detail-section"><h3>仓库包含</h3>${list(skill.includedSkills)}</section>`
      : '';
    const license = skill.license
      ? `<section class="detail-section"><h3>许可方式</h3><p>${escapeHTML(skill.license)}${skill.licenseNote ? ` · ${escapeHTML(skill.licenseNote)}` : ''}</p></section>`
      : '';
    const prompt = hasPrompt(skill) ? skill.promptText : '当前仓库尚未提供可复制的 Prompt。';
    const promptDisabled = hasPrompt(skill) ? '' : ' disabled';
    $('#detail-content').innerHTML = `<p class="detail-kicker">${escapeHTML(skill.category)} / ${escapeHTML(skill.sourceLabel)}</p><h2 class="detail-title" id="detail-title">${escapeHTML(skill.name)}</h2><p class="detail-description">${escapeHTML(skill.description)}</p>${included}<section class="detail-section"><h3>Prompt</h3><p class="example-text">${escapeHTML(prompt)}</p></section><section class="detail-section"><h3>你需要准备</h3><p>${escapeHTML(skill.input)}</p></section><section class="detail-section"><h3>你会得到</h3>${list(skill.output)}</section><section class="detail-section"><h3>使用前，了解这些</h3>${list(skill.requirements)}</section>${license}<div class="detail-actions"><button class="button button-dark" id="copy-prompt"${promptDisabled}>复制 Prompt <span aria-hidden="true">↗</span></button><a class="button button-light" href="${encodeURI(skill.url)}">打开完整详情页 →</a><a class="button button-light" href="${encodeURI(skill.fileName)}" download="${escapeHTML(skill.id)}-SKILL.md">下载入口说明 ↓</a><a class="button button-github" href="${escapeHTML(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer">查看 GitHub 仓库 <span aria-hidden="true">↗</span></a></div><p class="detail-footnote">一张档案对应一个 GitHub 仓库。仓库内有多个 Skill 时合并展示；完整脚本、模板和素材请进入仓库获取。</p>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  grid.addEventListener('click', async event => {
    const button = event.target.closest('button[data-skill]');
    if (!button) return;
    const skill = catalog.find(item => item.id === button.dataset.skill);
    if (!skill) return;
    if (button.dataset.action === 'copy') {
      if (await copyPrompt(skill)) showButtonFeedback(button, '已复制 ✓');
      else showButtonFeedback(button, '复制失败');
      return;
    }
    opener = button;
    showDetail(skill);
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (opener?.isConnected) opener.focus({preventScroll:true});
    activeSkill = null;
  });
  let toastTimer;
  function toast(message) {
    const element = $('#toast');
    clearTimeout(toastTimer);
    element.textContent = message;
    element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 2200);
  }
  async function copyPrompt(skill) {
    if (!hasPrompt(skill)) return false;
    try {
      await navigator.clipboard.writeText(skill.promptText);
      return true;
    } catch {
      const field = document.createElement('textarea');
      field.value = skill.promptText;
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(field);
      field.select();
      try { return document.execCommand('copy'); }
      catch { return false; }
      finally { field.remove(); }
    }
  }
  function showButtonFeedback(button, message) {
    const label = button.innerHTML;
    button.textContent = message;
    button.disabled = true;
    setTimeout(() => {
      if (!button.isConnected) return;
      button.innerHTML = label;
      button.disabled = false;
    }, 1600);
  }
  dialog.addEventListener('click', async event => {
    if (!event.target.closest('#copy-prompt') || !activeSkill) return;
    toast(await copyPrompt(activeSkill) ? 'Prompt 已复制' : '复制失败，请手动选择 Prompt');
  });
  renderCatalog();
})();
