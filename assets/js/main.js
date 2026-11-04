/* Crítica inmanente — interacciones */
(function () {
  var root = document.documentElement;
  function $(id) { return document.getElementById(id); }

  /* ---------- Tema ---------- */
  function setMeta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', root.classList.contains('dark') ? '#0d1117' : '#f6f2ea');
  }
  setMeta();
  document.querySelectorAll('.themeToggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dark = root.classList.toggle('dark');
      try { localStorage.setItem('ci-theme', dark ? 'dark' : 'light'); } catch (e) {}
      setMeta();
    });
  });

  /* ---------- Cabecera ---------- */
  var header = $('siteHeader');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var burger = $('burger'), menu = $('mobileMenu');
  if (burger && menu) {
    var closeMenu = function () {
      menu.classList.add('closed'); burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
      onScroll();
    };
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('closed') === false;
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) header.classList.add('scrolled'); else onScroll();
    });
    menu.querySelectorAll('.m-link').forEach(function (a) { a.addEventListener('click', closeMenu); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 768) closeMenu(); });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Filtros por etiqueta ---------- */
  document.querySelectorAll('[data-filtrable]').forEach(function (sec) {
    var buttons = sec.querySelectorAll('.filter');
    var items = sec.querySelectorAll('article[data-tags]');
    var empty = sec.querySelector('.sin-resultados');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var tag = b.getAttribute('data-filter');
        buttons.forEach(function (x) { x.classList.toggle('is-active', x === b); });
        var visibles = 0;
        items.forEach(function (a) {
          var tags = (a.getAttribute('data-tags') || '').split('|');
          var show = tag === 'all' || tags.indexOf(tag) !== -1;
          a.style.display = show ? '' : 'none';
          if (show) { visibles++; a.classList.add('in'); }
        });
        if (empty) empty.classList.toggle('hidden', visibles > 0);
      });
    });
  });

  /* ---------- Reproductor del podcast ---------- */
  var player = $('player');
  if (player) {
    var playBtn = $('playBtn'), iPlay = $('iPlay'), iPause = $('iPause');
    var bar = $('progressBar'), prog = $('progress'), tCur = $('tCur'), tDur = $('tDur');
    var eps = document.querySelectorAll('.ep');
    var audio = new Audio(); audio.preload = 'none';
    var real = false, duration = 3600, current = 0, timer = null, playing = false;

    var fmt = function (s) {
      s = Math.max(0, Math.floor(s || 0));
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
      var mm = (m < 10 ? '0' : '') + m, rr = (r < 10 ? '0' : '') + r;
      return h ? h + ':' + mm + ':' + rr : mm + ':' + rr;
    };
    var render = function () {
      bar.style.width = (duration ? current / duration * 100 : 0) + '%';
      tCur.textContent = fmt(current); tDur.textContent = fmt(duration);
    };
    var setUI = function (on) {
      playing = on;
      player.classList.toggle('playing', on);
      iPlay.classList.toggle('hidden', on); iPause.classList.toggle('hidden', !on);
      playBtn.setAttribute('aria-label', on ? 'Pausar' : 'Reproducir');
    };
    var pause = function () {
      if (real) audio.pause();
      clearInterval(timer); timer = null; setUI(false);
    };
    var play = function () {
      if (real) {
        var p = audio.play(); if (p && p.catch) p.catch(function () { setUI(false); });
      } else if (!timer) {
        timer = setInterval(function () {
          current += 1; if (current >= duration) { current = duration; pause(); }
          render();
        }, 1000);
      }
      setUI(true);
    };
    var seek = function (t) {
      current = Math.min(Math.max(0, t), duration);
      if (real) { try { audio.currentTime = current; } catch (e) {} }
      render();
    };
    var load = function (b) {
      pause();
      $('pEp').textContent = b.dataset.ep;
      $('pTitle').textContent = b.dataset.title;
      $('pGuests').textContent = b.dataset.guests;
      duration = parseInt(b.dataset.dur, 10) || 3600; current = 0;
      real = !!b.dataset.audio;
      if (real) { audio.src = b.dataset.audio; } else { audio.removeAttribute('src'); }
      eps.forEach(function (x) { x.classList.toggle('is-current', x === b); });
      render();
    };

    audio.addEventListener('loadedmetadata', function () { if (isFinite(audio.duration)) duration = audio.duration; render(); });
    audio.addEventListener('timeupdate', function () { current = audio.currentTime; render(); });
    audio.addEventListener('ended', function () { setUI(false); });

    playBtn.addEventListener('click', function () { playing ? pause() : play(); });
    $('back').addEventListener('click', function () { seek(current - 15); });
    $('fwd').addEventListener('click', function () { seek(current + 30); });
    prog.addEventListener('click', function (e) {
      var r = prog.getBoundingClientRect();
      seek((e.clientX - r.left) / r.width * duration);
    });
    eps.forEach(function (b) {
      b.addEventListener('click', function () {
        load(b); play();
        if (window.innerWidth < 1024) player.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    if (eps.length) load(eps[0]); else render();
  }


  /* ---------- Notas al pie automáticas ----------
     En el texto basta escribir [1], [2]… y, al final, un párrafo
     que empiece con [1], otro con [2]… El sitio los enlaza solo. */
  document.querySelectorAll('.prosa').forEach(function (prosa) {
    var notas = {};
    prosa.querySelectorAll('p, li').forEach(function (p) {
      var m = (p.textContent || '').trim().match(/^\[(\d+)\]/);
      if (m && !notas[m[1]]) { notas[m[1]] = p; }
    });
    if (!Object.keys(notas).length) return;
    var esNota = function (node) {
      for (var n = node; n && n !== prosa; n = n.parentNode) {
        for (var k in notas) if (notas[k] === n) return true;
      }
      return false;
    };
    var walker = document.createTreeWalker(prosa, NodeFilter.SHOW_TEXT, null);
    var textos = [], t;
    while ((t = walker.nextNode())) if (/\[\d+\]/.test(t.nodeValue)) textos.push(t);
    var vistos = {};
    textos.forEach(function (tn) {
      var enNota = esNota(tn);
      var partes = tn.nodeValue.split(/(\[\d+\])/);
      if (partes.length < 2) return;
      var frag = document.createDocumentFragment();
      partes.forEach(function (parte) {
        var m = parte.match(/^\[(\d+)\]$/);
        if (m && notas[m[1]]) {
          var n = m[1], a = document.createElement('a');
          if (enNota && (notas[n].textContent || '').trim().indexOf(parte) === 0 && !notas[n].id) {
            notas[n].id = 'nota-' + n; notas[n].classList.add('nota');
            a.href = '#ref-' + n; a.textContent = parte; a.className = 'nota-num';
            a.setAttribute('aria-label', 'Volver al texto');
            frag.appendChild(a);
          } else if (!enNota) {
            var sup = document.createElement('sup');
            a.href = '#nota-' + n; a.textContent = n; a.className = 'nota-ref';
            if (!vistos[n]) { a.id = 'ref-' + n; vistos[n] = true; }
            sup.appendChild(a); frag.appendChild(sup);
          } else { frag.appendChild(document.createTextNode(parte)); }
        } else if (parte) { frag.appendChild(document.createTextNode(parte)); }
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    var primera = notas[Object.keys(notas).sort(function (a, b) { return a - b; })[0]];
    if (primera) {
      var antes = primera, previo = primera.previousElementSibling;
      // si las notas llevan un rótulo breve ("Notas"), la línea va antes del rótulo
      if (previo && /^(H\d|P)$/.test(previo.tagName) && previo.textContent.trim().length < 40) { antes = previo; previo = previo.previousElementSibling; }
      if (!previo || previo.tagName !== 'HR') {
        var hr = document.createElement('hr'); hr.className = 'notas-sep';
        antes.parentNode.insertBefore(hr, antes);
      }
    }
  });

  /* ---------- Boletín (demostración) ---------- */
  var form = $('newsletter'), msg = $('nlMsg');
  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('email');
      msg.classList.remove('hidden');
      if (!email.value || !email.checkValidity()) {
        msg.textContent = 'Escribe un correo válido.'; msg.style.color = 'var(--accent)'; return;
      }
      msg.style.color = ''; msg.textContent = 'Gracias. Te escribiremos pronto.'; form.reset();
    });
  }
})();
