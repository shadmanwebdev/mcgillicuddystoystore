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
        // Sale-of-data can be populated by GPC before a banner choice.
        // Require explicit decisions for all three cookie categories.
        const saved = ['analytics', 'marketing', 'preferences'].every(
          category => consent?.[category] === 'yes' || consent?.[category] === 'no',
        );
        if (saved) root.setAttribute('data-arcadia-consent', 'saved');
        else root.removeAttribute('data-arcadia-consent');
      } catch (_) {
        // Leave Shopify's normal banner visible when its API is unavailable.
      }
    };
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
      document.removeEventListener('visitorConsentCollected', sync);
      window.removeEventListener('pageshow', sync);
    };
  });
})();
