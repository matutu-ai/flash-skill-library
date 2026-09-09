(() => {
  'use strict';
  const catalog = window.SKILL_CATALOG || [];
  const $ = (selector) => document.querySelector(selector);
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const stage = (progress, start, end) => clamp((progress - start) / (end - start));
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icons = {
    spark: '<path d="M12 2v5m0 10v5M2 12h5m10 0h5M5 5l3.5 3.5m7 7L19 19M5 19l3.5-3.5m7-7L19 5"/><circle cx="12" cy="12" r="3"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4m-4 6h4m10-6h4m-4 6h4m-11-6 5 3-5 3Z"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M9 8v13m5-9 3 3-3 3"/>',
    file: '<path d="M6 3h8l4 4v14H6ZM14 3v5h4M9 12h6m-6 4h6"/>'
  };
  const icon = (type) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.file}</svg>`;
  document.querySelectorAll('[data-total]').forEach(el => { el.textContent = String(catalog.length).padStart(2, '0'); });

  const story = $('#story');
  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = ['01 / 等待开启', '02 / 拉开抽屉', '03 / 分类展开', '04 / 进入档案', '05 / 灵感归位'];
  let animationFrame = 0;
  let lastProgress = -1;
  function renderStory() {
    animationFrame = 0;
    const rect = story.getBoundingClientRect();
    const sticky = $('.story-sticky');
    const headerHeight = $('.site-header').getBoundingClientRect().height;
    const distance = Math.max(1, story.offsetHeight - sticky.offsetHeight);
    const progress = motionQuery.matches ? 0 : clamp((headerHeight - rect.top) / distance);
    if (progress === lastProgress) return;
    lastProgress = progress;
    const pull = stage(progress, 0, .35);
    const unfold = stage(progress, .35, .60);
    const zoom = stage(progress, .60, .85);
    const reveal = stage(progress, .85, 1);
    root.style.cssText = `--p:${progress};--pull:${pull};--unfold:${unfold};--zoom:${zoom};--reveal:${reveal};--hero-visibility:${pull > .68 ? 'hidden' : 'visible'};--ending-visibility:${reveal > 0 ? 'visible' : 'hidden'}`;
    $('.hero-copy').inert = pull > .68;
    const chapter = progress === 0 ? 0 : progress < .35 ? 1 : progress < .60 ? 2 : progress < .85 ? 3 : 4;
    $('#chapter-label').textContent = chapters[chapter];
    $('#progress-value').textContent = `${String(Math.round(progress * 100)).padStart(2, '0')}%`;
  }
  function scheduleStory() {
    if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(renderStory);
  }
  window.addEventListener('scroll', scheduleStory, {passive:true});
  window.addEventListener('resize', () => { lastProgress = -1; scheduleStory(); }, {passive:true});
  motionQuery.addEventListener('change', () => { lastProgress = -1; scheduleStory(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
    else scheduleStory();
  });
  new ResizeObserver(() => { lastProgress = -1; scheduleStory(); }).observe(story);
  $('.hero-actions .button').addEventListener('click', event => {
    if (motionQuery.matches) { event.preventDefault(); $('#library').scrollIntoView({behavior:'instant'}); }
  });
  renderStory();

  let category = 'all';
  const search = $('#skill-search');
  const grid = $('#skill-grid');
  const dialog = $('#skill-dialog');
  let opener = null;
  let activeSkill = null;
  const searchable = skill => [skill.name, skill.id, skill.subtitle, skill.description, skill.category, ...skill.output].join(' ').toLocaleLowerCase();
  function renderCatalog() {
    const query = search.value.trim().toLocaleLowerCase();
    const filtered = catalog.filter(skill => (category === 'all' || skill.categoryKey === category) && searchable(skill).includes(query));
    grid.innerHTML = filtered.map(skill => `<article class="skill-card"><button class="card-open" data-skill="${escapeHTML(skill.id)}" aria-label="查看 ${escapeHTML(skill.name)} 的详情"><div class="card-top"><span class="skill-icon ${escapeHTML(skill.categoryKey)}">${icon(skill.icon)}</span><span class="card-index">FILE / ${String(catalog.indexOf(skill) + 1).padStart(3, '0')}</span></div><h3>${escapeHTML(skill.name)}</h3><p>${escapeHTML(skill.subtitle)}</p></button><div class="card-bottom"><span>${escapeHTML(skill.category)}</span><span class="card-actions"><button data-skill="${escapeHTML(skill.id)}">打开档案 <span aria-hidden="true">↗</span></button><a href="${escapeHTML(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看 ${escapeHTML(skill.sourceLabel)} 技能库">技能库 <span aria-hidden="true">↗</span></a></span></div></article>`).join('');
    $('#result-summary').textContent = query || category !== 'all' ? `找到 ${filtered.length} 份技能档案` : `${catalog.length} 份技能，各有用处。`;
    $('#empty-state').hidden = filtered.length > 0;
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
    $('#detail-content').innerHTML = `<p class="detail-kicker">${escapeHTML(skill.category)} / ${escapeHTML(skill.id)}</p><h2 class="detail-title" id="detail-title">${escapeHTML(skill.name)}</h2><p class="detail-description">${escapeHTML(skill.description)}</p><section class="detail-section"><h3>你需要准备</h3><p>${escapeHTML(skill.input)}</p></section><section class="detail-section"><h3>你会得到</h3>${list(skill.output)}</section><section class="detail-section"><h3>使用前，了解这些</h3>${list(skill.requirements)}</section><section class="detail-section"><h3>这样开始第一次使用</h3><p class="example-text">${escapeHTML(skill.example)}</p></section><div class="detail-actions"><button class="button button-dark" id="copy-example">复制调用示例 <span aria-hidden="true">↗</span></button><a class="button button-light" href="${encodeURI(skill.fileName)}" download="${escapeHTML(skill.id)}-SKILL.md">下载技能说明 ↓</a><a class="button button-github" href="${escapeHTML(skill.sourceUrl)}" target="_blank" rel="noopener noreferrer">查看对应技能库 <span aria-hidden="true">↗</span></a></div><p class="detail-footnote">对应 GitHub 技能库：${escapeHTML(skill.sourceLabel)}。当前网页中的说明来自本地安装版本；下载内容为 SKILL.md 说明文件，涉及脚本与素材的技能需要完整配套文件。</p>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-skill]');
    if (!button) return;
    const skill = catalog.find(item => item.id === button.dataset.skill);
    if (!skill) return;
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
  dialog.addEventListener('click', async event => {
    if (!event.target.closest('#copy-example') || !activeSkill) return;
    try { await navigator.clipboard.writeText(activeSkill.example); toast('调用示例已复制'); }
    catch {
      const text = $('.example-text');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
      toast('已选中示例，请手动复制');
    }
  });
  renderCatalog();
})();
