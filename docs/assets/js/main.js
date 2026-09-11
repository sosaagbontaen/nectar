/* Nectar Sweet Marketing — site interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header: solidify on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    var setNav = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Card glow follows the cursor ---- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---- Contact form ----------------------------------------------------
     No backend is wired up yet. The form composes a pre-filled email and
     hands it to the visitor's mail client, so it works the moment the site
     goes live. To switch to a real endpoint (Formspree, Netlify Forms, or
     the Nectar Sweet CRM webhook), set data-endpoint on the <form> and this
     handler will POST the fields as JSON instead.
     -------------------------------------------------------------------- */
  var form = document.querySelector('.form[data-contact]');
  if (form) {
    var status = form.querySelector('.form__status');

    var say = function (msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form__status ' + (ok ? 'is-ok' : 'is-err');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = Object.fromEntries(new FormData(form).entries());
      var endpoint = form.dataset.endpoint;

      if (endpoint) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Request failed');
            form.reset();
            say('Thank you — your message is in. Expect a reply within one business day.', true);
          })
          .catch(function () {
            say('Something went wrong. Please email righteous@nectarsweetmarketing.com directly.', false);
          })
          .finally(function () {
            if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
          });
        return;
      }

      var lines = [
        'Name: ' + (data.name || ''),
        'Email: ' + (data.email || ''),
        'Phone: ' + (data.phone || ''),
        'Organization: ' + (data.organization || ''),
        'Interested in: ' + (data.interest || ''),
        '',
        data.message || ''
      ].join('\n');

      var to = form.dataset.email || 'righteous@nectarsweetmarketing.com';
      window.location.href =
        'mailto:' + to +
        '?subject=' + encodeURIComponent('New inquiry from ' + (data.name || 'the website')) +
        '&body=' + encodeURIComponent(lines);

      say('Opening your email app with the message ready to send.', true);
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
