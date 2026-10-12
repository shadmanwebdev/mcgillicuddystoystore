/* Optional page dots for any Arcadia scroll track; independent of arrow controls. */
(() => {
  window.Arcadia.modules.register('carousel-pagination', root => {
    const track = root.querySelector('[data-carousel-track]');
    const pager = root.querySelector('[data-carousel-pagination]');
    if (!track || !pager) return;
    let count = 0;
    const update = () => {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      const nextCount = max <= 2 ? 0 : Math.ceil(max / Math.max(1, track.clientWidth)) + 1;
      if (nextCount !== count) {
        count = nextCount;
        pager.replaceChildren();
        for (let index = 0; index < count; index++) {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.carouselPage = index;
          button.setAttribute('aria-label', `Product page ${index + 1} of ${count}`);
          button.setAttribute('aria-controls', track.id);
          pager.append(button);
        }
      }
      pager.hidden = count === 0;
      const position = Math.abs(track.scrollLeft);
      const current = position >= max - 2 ? count - 1 : Math.round(position / Math.max(1,track.clientWidth));
      [...pager.children].forEach((button,index) => button.setAttribute('aria-current', String(index === current)));
    };
    const click = event => {
      const button = event.target.closest('[data-carousel-page]');
      if (!button || !pager.contains(button)) return;
      const direction = getComputedStyle(track).direction === 'rtl' ? -1 : 1;
      track.scrollTo({left: Math.min(Number(button.dataset.carouselPage) * track.clientWidth, track.scrollWidth - track.clientWidth) * direction, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, {passive: true});
    pager.addEventListener('click', click);
    update();
    return () => { observer.disconnect(); track.removeEventListener('scroll', update); pager.removeEventListener('click', click); pager.replaceChildren(); };
  });
})();
