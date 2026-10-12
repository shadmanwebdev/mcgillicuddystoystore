(() => {
  const A = window.Arcadia;
  A.modules.register('navigation', (root) => {
    const panels = [...root.querySelectorAll('.arcadia-desktop-nav details')];
    const removers = [];
    let timer;
    const listen = (node, event, handler) => {
      node.addEventListener(event, handler);
      removers.push(() => node.removeEventListener(event, handler));
    };
    const clearTimer = () => { clearTimeout(timer); timer = undefined; };
    const closeAll = () => root.querySelectorAll('details[open]').forEach(d => { d.open = false; });
    listen(root, 'keydown', event => {
      if (event.key !== 'Escape') return;
      const active = event.target.closest('details[open]');
      closeAll();
      active?.querySelector('summary')?.focus();
      clearTimer();
    });
    listen(document, 'click', event => { if (!root.contains(event.target)) { closeAll(); clearTimer(); } });
    panels.forEach(panel => {
      listen(panel, 'toggle', () => {
        if (panel.open) panels.forEach(other => { if (other !== panel) other.open = false; });
      });
      listen(panel, 'pointerenter', event => {
        if (root.dataset.hoverMenu !== 'true' || event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 1101px) and (hover: hover)').matches) return;
        clearTimer();
        panels.forEach(other => { other.open = other === panel; });
      });
      listen(panel, 'pointerleave', () => {
        clearTimer();
        timer = setTimeout(() => { if (!panel.contains(document.activeElement)) panel.open = false; }, 180);
      });
      listen(panel, 'focusout', event => {
        if (!panel.contains(event.relatedTarget)) panel.open = false;
      });
    });
    return () => { clearTimer(); removers.forEach(remove => remove()); };
  });
})();