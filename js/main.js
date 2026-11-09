(() => {
  "use strict";

  // Релиз: 19 ноября 2026, полночь по локальному времени зрителя.
  const RELEASE = new Date(2026, 10, 19, 0, 0, 0);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Плавный скролл ---------- */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollToEl = (el) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = id === "#top" ? document.body : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (id === "#top") { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }); }
      else scrollToEl(target);
    });
  });

  /* ---------- Таймер ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const timers = [...document.querySelectorAll("[data-countdown]")];
  const inline = document.querySelector("[data-countdown-inline]");

  function tick() {
    const diff = RELEASE - Date.now();
    if (diff <= 0) {
      timers.forEach((t) => t.classList.add("is-done"));
      timers.forEach((t) => (t.innerHTML = '<p class="countdown__done">Она вышла.</p>'));
      if (inline) inline.textContent = "Вышла";
      return false;
    }
    const s = Math.floor(diff / 1000);
    const parts = {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60
    };
    timers.forEach((t) => {
      for (const k in parts) {
        const el = t.querySelector(`[data-unit="${k}"]`);
        const v = pad(parts[k]);
        if (el && el.textContent !== v) {
          el.textContent = v;
          if (k === "s" && !reduceMotion) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
        }
      }
    });
    if (inline) inline.textContent = `${parts.d}д ${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`;
    return true;
  }
  if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }

  /* ---------- Рендер таймлайна ---------- */
  const CATS = window.CATEGORIES;
  const ERAS = window.ERAS;
  const events = [...window.EVENTS].sort((a, b) => a.sort.localeCompare(b.sort));
  const root = document.getElementById("events");
  const yearnav = document.querySelector(".yearnav");

  const groups = new Map();
  events.forEach((ev) => {
    const y = ev.sort.slice(0, 4);
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y).push(ev);
  });

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  let side = 0;
  const frag = document.createDocumentFragment();
  groups.forEach((list, year) => {
    const sec = document.createElement("section");
    sec.className = "year";
    sec.id = `y${year}`;
    sec.dataset.year = year;
    sec.innerHTML = `
      <header class="year__head">
        <span class="year__num" aria-hidden="true">${year}</span>
        <h3 class="year__title"><span class="visually-hidden">${year}. </span>${esc(ERAS[year] || "")}</h3>
      </header>
      <div class="year__cards"></div>`;
    const cards = sec.querySelector(".year__cards");
    list.forEach((ev) => {
      const cat = CATS[ev.cat] || { label: ev.cat, color: "#fff" };
      const card = document.createElement("article");
      card.className = `card reveal ${side++ % 2 ? "card--right" : "card--left"}${ev.major ? " card--major" : ""}${ev.draft ? " card--draft" : ""}`;
      card.dataset.cat = ev.cat;
      card.style.setProperty("--accent", cat.color);
      card.innerHTML = `
        <span class="card__dot" aria-hidden="true"></span>
        <div class="card__inner">
          <div class="card__meta">
            <time datetime="${esc(ev.sort)}">${esc(ev.date)}</time>
            <span class="tag">${esc(cat.label)}</span>
            ${ev.draft ? '<span class="tag tag--draft">Черновик</span>' : ""}
          </div>
          <h4 class="card__title">${esc(ev.title)}</h4>
          <p class="card__text">${esc(ev.text)}</p>
          ${ev.source ? `<a class="card__link" href="${esc(ev.source)}" target="_blank" rel="noopener">Источник ↗</a>` : ""}
        </div>`;
      cards.appendChild(card);
    });
    frag.appendChild(sec);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = year;
    btn.dataset.year = year;
    btn.addEventListener("click", () => scrollToEl(sec));
    yearnav.appendChild(btn);
  });
  root.appendChild(frag);

  /* ---------- Фильтры ---------- */
  const filters = document.querySelector(".filters");
  const used = [...new Set(events.map((e) => e.cat))];
  const mkChip = (key, label, color) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.filter = key;
    b.style.setProperty("--accent", color);
    b.innerHTML = `<i></i>${label}`;
    b.setAttribute("aria-pressed", key === "all" ? "true" : "false");
    filters.appendChild(b);
  };
  mkChip("all", "Всё", "#fff");
  Object.keys(CATS).filter((k) => used.includes(k)).forEach((k) => mkChip(k, CATS[k].label, CATS[k].color));

  filters.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const f = chip.dataset.filter;
    filters.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    let n = 0;
    document.querySelectorAll(".year").forEach((sec) => {
      let visible = 0;
      sec.querySelectorAll(".card").forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.hidden = !show;
        if (show) {
          visible++;
          card.classList.toggle("card--left", n % 2 === 0);
          card.classList.toggle("card--right", n % 2 === 1);
          card.classList.add("is-in");
          n++;
        }
      });
      sec.hidden = visible === 0;
      const navBtn = yearnav.querySelector(`[data-year="${sec.dataset.year}"]`);
      if (navBtn) navBtn.hidden = visible === 0;
    });
    if (lenis) lenis.resize();
    updateFill();
  });

  /* ---------- Появление при скролле ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal, .year__head").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal, .year__head").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Активный год в навигации ---------- */
  const navBtns = [...yearnav.querySelectorAll("button")];
  const yearIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const y = en.target.dataset.year;
        navBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.year === y));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".year").forEach((s) => yearIO.observe(s));

  /* ---------- Прогресс линии и параллакс ---------- */
  const body = document.querySelector(".timeline__body");
  const fill = document.querySelector(".timeline__fill");
  const sun = document.querySelector(".hero__sun");
  const yearNums = [...document.querySelectorAll(".year__num")];

  function updateFill() {
    const r = body.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / r.height));
    fill.style.transform = `scaleY(${p})`;
    document.querySelector(".yearnav").classList.toggle("is-visible", r.top < vh * 0.6 && r.bottom > vh * 0.4);
  }
  function onScroll() {
    updateFill();
    if (reduceMotion) return;
    const y = window.scrollY;
    if (sun && y < window.innerHeight * 1.2) sun.style.transform = `translate(-50%, ${y * 0.35}px)`;
    const vh = window.innerHeight;
    yearNums.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const off = Math.max(-40, Math.min(40, (r.top - vh / 2) * -0.06));
      el.style.transform = `translate3d(0, ${off}px, 0)`;
    });
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Счётчик дней ожидания ---------- */
  document.querySelectorAll("[data-days-since]").forEach((el) => {
    const from = new Date(el.dataset.daysSince + "T00:00:00");
    const end = Math.min(Date.now(), RELEASE.getTime());
    const target = Math.floor((end - from) / 86400000);
    const fmt = (n) => n.toLocaleString("ru-RU");
    if (reduceMotion || !("IntersectionObserver" in window)) { el.textContent = fmt(target); return; }
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1800;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - k, 4);
        el.textContent = fmt(Math.round(target * e));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
  });

  document.documentElement.classList.add("is-loaded");
})();
