/* Shopify owns consent storage; only suppress the banner after a saved choice. */
(() => {
  const A = window.Arcadia;
  A.modules.register('cookie-consent', root => {
    let disposed = false;
    const sync = () => {
      if (disposed) return;
      const privacy = window.Shopify?.customerPrivacy;
      if (typeof privacy?.currentVisitorConsent !== 'function') return;
      try {
        const consent = privacy.currentVisitorConsent();
        // A saved decision can contain only the categories used by this store.
        // Ignore sale-of-data-only GPC signals, which aren't a banner choice.
        const saved = ['analytics', 'marketing', 'preferences'].some(
          category => consent?.[category] === 'yes' || consent?.[category] === 'no',
        );
        if (saved) root.setAttribute('data-arcadia-consent', 'saved');
        else root.removeAttribute('data-arcadia-consent');
      } catch (_) {
        // Leave Shopify's normal banner visible when its API is unavailable.
      }
    };
    const choose = event => {
      const button = event.target.closest?.('#shopify-pc__banner__btn-accept, #shopify-pc__banner__btn-decline');
      const privacy = window.Shopify?.customerPrivacy;
      if (!button || typeof privacy?.setTrackingConsent !== 'function') return;
      // Handle these two actions directly so dismissal follows the API save.
      // The preferences button/dialog retains Shopify's existing handlers.
      event.preventDefault();
      event.stopImmediatePropagation();
      const accepted = button.id === 'shopify-pc__banner__btn-accept';
      button.disabled = true;
      try {
        privacy.setTrackingConsent({analytics: accepted, marketing: accepted, preferences: accepted}, error => {
          button.disabled = false;
          if (disposed || error) return;
          root.setAttribute('data-arcadia-consent', 'saved');
        });
      } catch (_) {
        button.disabled = false;
      }
    };
    document.addEventListener('click', choose, true);
    document.addEventListener('visitorConsentCollected', sync);
    window.addEventListener('pageshow', sync);
    sync();
    if (!window.Shopify?.customerPrivacy && window.Shopify?.loadFeatures) {
      window.Shopify.loadFeatures([{name: 'consent-tracking-api', version: '0.1'}], error => {
        if (!error) sync();
      });
    }
    return () => {
      disposed = true;
      document.removeEventListener('click', choose, true);
      document.removeEventListener('visitorConsentCollected', sync);
      window.removeEventListener('pageshow', sync);
    };
  });
})();
