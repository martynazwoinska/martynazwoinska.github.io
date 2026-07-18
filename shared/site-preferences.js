(function (window, document) {
  'use strict';

  var root = document.documentElement;
  var storageKeys = Object.freeze({
    language: 'language',
    theme: 'theme'
  });
  var validLanguages = Object.freeze(['en', 'sv', 'pl']);
  var validThemes = Object.freeze(['light', 'dark']);

  function hasValue(list, value) {
    return list.indexOf(value) >= 0;
  }

  function options() {
    return (root.getAttribute('data-site-preferences') || '')
      .split(/\s+/)
      .filter(Boolean);
  }

  function isEnabled(name) {
    return options().indexOf(name) >= 0;
  }

  function read(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getLanguage() {
    var stored = read(storageKeys.language);
    return hasValue(validLanguages, stored) ? stored : 'en';
  }

  function getTheme() {
    var stored = read(storageKeys.theme);
    return hasValue(validThemes, stored) ? stored : null;
  }

  function applyLanguage(language) {
    var next = hasValue(validLanguages, language) ? language : 'en';
    if (isEnabled('language')) root.lang = next;
    return next;
  }

  function syncThemeColor(theme) {
    var explicitTheme = hasValue(validThemes, theme) ? theme : null;
    document.querySelectorAll('meta[name="theme-color"][data-site-theme-color]').forEach(function (meta) {
      var targetTheme = meta.getAttribute('data-site-theme-color');
      if (!hasValue(validThemes, targetTheme)) return;
      meta.setAttribute(
        'media',
        explicitTheme ? (targetTheme === explicitTheme ? 'all' : 'not all') : '(prefers-color-scheme: ' + targetTheme + ')'
      );
    });
  }

  function applyTheme(theme) {
    if (!isEnabled('theme')) return theme;
    if (hasValue(validThemes, theme)) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    syncThemeColor(theme);
    return theme;
  }

  function announce(detail) {
    window.dispatchEvent(new CustomEvent('site:preferenceschange', { detail: detail }));
  }

  function setLanguage(language) {
    var next = applyLanguage(language);
    write(storageKeys.language, next);
    announce({ language: next, theme: getTheme() });
    return next;
  }

  function setTheme(theme) {
    if (!hasValue(validThemes, theme)) return getTheme();
    write(storageKeys.theme, theme);
    applyTheme(theme);
    announce({ language: getLanguage(), theme: theme });
    return theme;
  }

  window.SitePreferences = Object.freeze({
    keys: storageKeys,
    languages: validLanguages,
    themes: validThemes,
    getLanguage: getLanguage,
    getTheme: getTheme,
    setLanguage: setLanguage,
    setTheme: setTheme
  });

  applyTheme(getTheme());
  applyLanguage(getLanguage());
})(window, document);
