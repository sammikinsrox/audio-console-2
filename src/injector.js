// Runs in the page's main world (world: "MAIN") so it can intercept
// Document.prototype.createElement before any page script runs. This avoids
// the inline-script CSP violation that the content-script injection approach
// triggers on strict pages like YouTube.
// Flag lets content.js (isolated world) detect that this already ran so it
// can skip its own fallback injection attempt.
document.documentElement.setAttribute('data-ffac', '1');
(function () {
  const orig = Document.prototype.createElement;
  Document.prototype.createElement = function (tag, opts) {
    const el = orig.call(this, tag, opts);
    if (typeof tag === 'string' && /^(audio|video)$/i.test(tag)) {
      try { el.crossOrigin = 'anonymous'; } catch (_) {}
      window.dispatchEvent(new CustomEvent('__ffac_el'));
    }
    return el;
  };
})();
