// Mobile nav toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Restrained scroll reveal — fades content in once, respects reduced motion
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Publications page: simple client-side filter by category
(function () {
  var filterRow = document.querySelector('[data-pub-filters]');
  if (!filterRow) return;
  var buttons = filterRow.querySelectorAll('.filter-btn');
  var pubs = document.querySelectorAll('[data-pub-category]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      pubs.forEach(function (pub) {
        var cats = pub.getAttribute('data-pub-category').split(' ');
        pub.style.display = (filter === 'all' || cats.indexOf(filter) !== -1) ? '' : 'none';
      });
    });
  });
})();
