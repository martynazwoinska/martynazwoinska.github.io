(function (window, document) {
  'use strict';

    // Client-side English, Swedish, and Polish localization.
    var homeI18n = window.HomeI18n;
    var localizedElementMap = homeI18n.localizedElementMap;
    var localizedAttributeMap = homeI18n.localizedAttributeMap;
    var englishInterfaceCopy = homeI18n.englishInterfaceCopy;
    var translatedCopy = homeI18n.translatedCopy;
    var englishPageCopy = {};

    Object.keys(localizedElementMap).forEach(function (key) {
      var element = document.querySelector(localizedElementMap[key]);
      if (element) englishPageCopy[key] = element.innerHTML;
    });

    function languageCopy(language) {
      return Object.assign({}, englishInterfaceCopy, englishPageCopy, translatedCopy[language] || {});
    }

    var currentLanguage = window.SitePreferences.getLanguage();

    function applyLanguage(language) {
      if (['en', 'sv', 'pl'].indexOf(language) < 0) language = 'en';
      currentLanguage = language;
      var copy = languageCopy(language);

      Object.keys(localizedElementMap).forEach(function (key) {
        document.querySelectorAll(localizedElementMap[key]).forEach(function (element) {
          if (copy[key] !== undefined) element.innerHTML = copy[key];
        });
      });

      Object.keys(localizedAttributeMap).forEach(function (key) {
        var target = localizedAttributeMap[key];
        var element = document.querySelector(target[0]);
        if (element && copy[key] !== undefined) element.setAttribute(target[1], copy[key]);
      });

      document.documentElement.lang = language;
      document.title = copy.page_title;
      document.querySelector('meta[name="description"]').setAttribute('content', copy.meta_description);
      document.querySelectorAll('.lang-btn').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-language') === language));
      });
      document.querySelectorAll('#homeWormStatus, #homeWheelStatus, #contactCopyStatus').forEach(function (status) {
        status.textContent = '';
      });
      if (contactCopyFallback) {
        contactCopyFallback.textContent = '';
        contactCopyFallback.hidden = true;
      }
      document.querySelectorAll('.contact-copy').forEach(function (button) {
        button.classList.remove('is-copied');
      });
      window.SitePreferences.setLanguage(language);
      syncPrimaryNavLayout();
      syncThemeButton();
    }

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle (remembers choice)
    var root = document.documentElement;
    var themeToggle = document.getElementById('themeToggle');
    var saved = window.SitePreferences.getTheme();
    if (saved) root.setAttribute('data-theme', saved);

    function syncThemeButton() {
      var isDark = root.getAttribute('data-theme') === 'dark'
        || (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      themeToggle.setAttribute('aria-pressed', String(isDark));
      var copy = languageCopy(currentLanguage);
      themeToggle.setAttribute('title', isDark ? copy.theme_light : copy.theme_dark);
      themeToggle.setAttribute('aria-label', isDark ? copy.theme_light : copy.theme_dark);
    }

    syncThemeButton();
    themeToggle.addEventListener('click', function () {
      var next = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
      window.SitePreferences.setTheme(next);
      syncThemeButton();
    });

    // Compact, accessible navigation on narrow screens.
    var navMenuToggle = document.getElementById('navMenuToggle');
    var primaryNav = document.getElementById('primaryNav');
    var navBreakpoints = { en: 900, sv: 950, pl: 880 };

    function closePrimaryNav(restoreFocus) {
      navMenuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.setAttribute('data-open', 'false');
      if (restoreFocus) navMenuToggle.focus();
    }

    function syncPrimaryNavLayout() {
      var breakpoint = navBreakpoints[currentLanguage] || navBreakpoints.en;
      var layout = window.innerWidth <= breakpoint ? 'compact' : 'full';
      root.setAttribute('data-nav-layout', layout);
      if (layout === 'full') closePrimaryNav(false);
    }

    window.addEventListener('resize', syncPrimaryNavLayout);

    navMenuToggle.addEventListener('click', function (event) {
      var isOpen = navMenuToggle.getAttribute('aria-expanded') === 'true';
      navMenuToggle.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.setAttribute('data-open', String(!isOpen));
      if (!isOpen && event.detail === 0) {
        var firstNavLink = primaryNav.querySelector('a');
        if (firstNavLink) firstNavLink.focus();
      }
    });

    primaryNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closePrimaryNav(false);
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenuToggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closePrimaryNav(true);
      }
    });
    document.querySelectorAll('.lang-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        applyLanguage(button.getAttribute('data-language'));
      });
    });

    // Copy-only email controls avoid relying on a configured desktop mail application.
    var contactCopyButtons = document.querySelectorAll('.contact-copy');
    var contactCopyStatus = document.getElementById('contactCopyStatus');
    var contactCopyFallback = document.getElementById('contactCopyFallback');
    var contactEmailParts = {
      general: ['zwoinska', 'gmail', 'com']
    };

    function contactEmailAddress(kind) {
      var parts = contactEmailParts[kind];
      return parts ? parts[0] + '@' + parts[1] + '.' + parts[2] : '';
    }

    function fallbackCopyText(text) {
      var input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }
      document.body.removeChild(input);
      return copied;
    }

    function copyContactEmail(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(function () {
          return true;
        }).catch(function () {
          return fallbackCopyText(text);
        });
      }
      return Promise.resolve(fallbackCopyText(text));
    }

    contactCopyButtons.forEach(function (button) {
      var resetTimer;
      button.addEventListener('click', function () {
        var address = contactEmailAddress(button.getAttribute('data-email-kind'));
        var label = button.querySelector('.contact-copy-label');
        var copy = languageCopy(currentLanguage);
        if (!address || !label) return;

        copyContactEmail(address).then(function (copied) {
          window.clearTimeout(resetTimer);
          contactCopyFallback.hidden = true;
          contactCopyFallback.textContent = '';
          if (copied) {
            label.textContent = copy.contact_email_copied;
            button.classList.add('is-copied');
            contactCopyStatus.textContent = copy.contact_email_copied + ': ' + address;
            resetTimer = window.setTimeout(function () {
              label.textContent = languageCopy(currentLanguage)[button.getAttribute('data-copy-label-key')];
              button.classList.remove('is-copied');
            }, 1800);
            return;
          }

          contactCopyStatus.textContent = copy.contact_email_copy_failed + ' ' + address;
          contactCopyFallback.textContent = copy.contact_email_copy_failed + ' ' + address;
          contactCopyFallback.hidden = false;
        });
      });
    });

    // Small, independent flavour-wheel interaction on the Cabinet card.
    var homeWheel = document.getElementById('homeWheel');
    var homeWheelImage = homeWheel.querySelector('img');
    var homeWheelStatus = document.getElementById('homeWheelStatus');
    var homeWheelRotation = 0;
    var homeWheelTimer;

    homeWheel.addEventListener('click', function () {
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var increment = reducedMotion
        ? 30 + Math.round(Math.random() * 300)
        : 720 + Math.round(Math.random() * 720);
      homeWheelRotation += increment;
      homeWheelImage.style.transform = 'rotate(' + homeWheelRotation + 'deg)';
      homeWheelStatus.textContent = languageCopy(currentLanguage).wheel_spinning;
      window.clearTimeout(homeWheelTimer);
      homeWheelTimer = window.setTimeout(function () {
        homeWheelStatus.textContent = languageCopy(currentLanguage).wheel_stopped;
      }, reducedMotion ? 80 : 1100);
    });

    // The N2 preview is independently interactive, like the flavour wheel.
    var n2Card = document.querySelector('.beyond-card--game');
    var n2Preview = n2Card ? n2Card.querySelector('.n2-preview') : null;
    var homeWorms = document.getElementById('homeWorms');
    var homeWormStatus = document.getElementById('homeWormStatus');
    var homeWormTimer;
    var homeWormStatusTimer;
    if (homeWorms && n2Preview && homeWormStatus) {
      homeWorms.addEventListener('click', function () {
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.clearTimeout(homeWormTimer);
        window.clearTimeout(homeWormStatusTimer);
        n2Preview.classList.remove('is-wriggling');
        homeWormStatus.textContent = '';
        if (!reducedMotion) {
          void n2Preview.offsetWidth;
          n2Preview.classList.add('is-wriggling');
        }
        homeWormStatusTimer = window.setTimeout(function () {
          homeWormStatus.textContent = languageCopy(currentLanguage).worms_wriggling;
        }, 20);
        homeWormTimer = window.setTimeout(function () {
          n2Preview.classList.remove('is-wriggling');
        }, reducedMotion ? 40 : 900);
      });

      homeWorms.addEventListener('pointermove', function (event) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var bounds = homeWorms.getBoundingClientRect();
        var horizontal = (event.clientX - bounds.left) / bounds.width - .5;
        var vertical = (event.clientY - bounds.top) / bounds.height - .5;
        n2Preview.style.setProperty('--tilt-x', (-vertical * 4).toFixed(2) + 'deg');
        n2Preview.style.setProperty('--tilt-y', (horizontal * 4).toFixed(2) + 'deg');
      });
      homeWorms.addEventListener('pointerleave', function () {
        n2Preview.style.setProperty('--tilt-x', '0deg');
        n2Preview.style.setProperty('--tilt-y', '0deg');
      });
    }

    applyLanguage(currentLanguage);
})(window, document);
