(function () {
  var header = document.querySelector('.site-nav');
  if (!header) return;
  var toggle = header.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = isOpen ? null : a.scrollHeight + 'px';
    });
  });
})();

(function () {
  var video = document.getElementById('heroVideo');
  var toggle = document.getElementById('heroVideoToggle');
  if (!video || !toggle) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setPlayingUI(playing) {
    toggle.classList.toggle('playing', playing);
    toggle.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
    toggle.setAttribute('aria-pressed', String(!playing));
  }

  if (reduceMotion) {
    video.pause();
    video.removeAttribute('autoplay');
    setPlayingUI(false);
  }

  toggle.addEventListener('click', function () {
    if (video.paused) { video.play(); setPlayingUI(true); }
    else { video.pause(); setPlayingUI(false); }
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!toggle.classList.contains('playing')) return;
        if (entry.isIntersecting) { video.play().catch(function () {}); }
        else { video.pause(); }
      });
    }, { threshold: 0.15 });
    io.observe(video);
  }
})();
