(() => {
  const A = window.Arcadia;
  A.modules.register('search-drawer', root => {
    const input = root.querySelector('[data-arcadia-search-input]');
    const full = root.querySelector('[data-search-full]');
    const suggestions = root.querySelector('.arcadia-search-drawer__suggestions');
    const searchUrl = new URL(root.dataset.searchUrl, location.origin);
    const update = () => {
      const url = new URL(searchUrl);
      const query = input.value.trim();
      if (query) { url.searchParams.set('q', query); url.searchParams.set('options[prefix]', 'last'); }
      full.href = url.href;
      suggestions.hidden = query.length >= 2;
    };
    const open = event => {
      const trigger = event.target.closest('a');
      if (!trigger || trigger === full || root.contains(trigger) || event.defaultPrevented || event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || trigger.hasAttribute('download') || (trigger.target && trigger.target !== '_self')) return;
      const url = new URL(trigger.href, location.origin);
      if (!trigger.hasAttribute('data-arcadia-search-open') && (url.origin !== searchUrl.origin || url.pathname !== searchUrl.pathname || url.search || url.hash)) return;
      event.preventDefault();
      document.querySelectorAll('.arcadia-header details[open]').forEach(panel => { panel.open = false; });
      A.modal.open(root, trigger);
      input.focus();
      update();
    };
    input.addEventListener('input', update);
    document.addEventListener('click', open);
    return () => { input.removeEventListener('input', update); document.removeEventListener('click', open); };
  });
})();
