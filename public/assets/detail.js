(() => {
  'use strict';

  const prompt = document.querySelector('#prompt-text code');
  const toast = document.querySelector('#skill-detail-toast');
  let toastTimer;

  async function copyPrompt() {
    const text = prompt?.textContent || '';
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(field);
      field.select();
      try { return document.execCommand('copy'); }
      catch { return false; }
      finally { field.remove(); }
    }
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy-prompt]');
    if (!button) return;
    const label = button.innerHTML;
    const copied = await copyPrompt();
    button.textContent = copied ? '已复制 ✓' : '复制失败';
    button.disabled = true;
    showToast(copied ? 'Prompt 已复制' : '复制失败，请手动选择 Prompt');
    setTimeout(() => {
      if (!button.isConnected) return;
      button.innerHTML = label;
      button.disabled = false;
    }, 1600);
  });
})();
