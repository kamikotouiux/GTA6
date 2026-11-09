(() => {
  "use strict";

  // Релиз: 19 ноября 2026, полночь по локальному времени зрителя.
  const RELEASE = new Date(2026, 10, 19, 0, 0, 0);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const I18N = window.I18N, CATS = window.CATEGORIES, ERAS = window.ERAS;
  const events = [...window.EVENTS].sort((a, b) => a.sort.localeCompare(b.sort));

  /* ---------- Язык ---------- */
  const store = {
    get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch (e) { /* приватный режим */ } }
  };
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "ru" || q === "en") return q;
    const saved = store.get();
    if (saved === "ru" || saved === "en") return saved;
    const nav = (navigator.languages || [navigator.language || "ru"]).join(",").toLowerCase();
    return /(^|,)(ru|uk|be|kk)/.test(nav) ? "ru" : "en";
  }
  let lang = detectLang();
  let filter = "all";
  const t = (k) => (I18N[lang] && I18N[lang][k] !== undefined ? I18N[lang][k] : I18N.ru[k]);
  const L = (obj) => (obj && typeof obj === "object" ? obj[lang] || obj.ru : obj);
  const plural = new Map();
  const unitLabel = (unit, n) => {
    if (!plural.has(lang)) plural.set(lang, new Intl.PluralRules(lang));
    const forms = t("units")[unit];
    return forms[plural.get(lang).select(n)] || forms.other;
  };

  /* ---------- Плавный скролл ---------- */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollToEl = (el) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    e.preventDefault();
    if (id === "#top") { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }
    else scrollToEl(document.querySelector(id));
  });

  /* ---------- Таймер ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const timers = [...document.querySelectorAll("[data-countdown]")];
  const inline = document.querySelector("[data-countdown-inline]");

  function tick() {
    const diff = RELEASE - Date.now();
    if (diff <= 0) {
      timers.forEach((el) => (el.innerHTML = `<p class="countdown__done">${t("countdown.done")}</p>`));
      if (inline) inline.textContent = t("countdown.inlineDone");
      return false;
    }
    const s = Math.floor(diff / 1000);
    const parts = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    timers.forEach((el) => {
      for (const k in parts) {
        const num = el.querySelector(`[data-unit="${k}"]`);
        const lab = el.querySelector(`[data-label="${k}"]`);
        const v = pad(parts[k]);
        if (num && num.textContent !== v) {
          num.textContent = v;
          if (k === "s" && !reduceMotion) { num.classList.remove("tick"); void num.offsetWidth; num.classList.add("tick"); }
        }
        if (lab) { const l = unitLabel(k, parts[k]); if (lab.textContent !== l) lab.textContent = l; }
      }
    });
    if (inline) inline.textContent = `${parts.d}${t("countdown.d")} ${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`;
    return true;
  }

  /* ---------- Таймлайн ---------- */
  const root = document.getElementById("events");
  const yearnav = document.querySelector(".yearnav");
  const filtersEl = document.querySelector(".filters");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let yearIO = null;
  let yearNums = [];

  function renderTimeline() {
    const groups = new Map();
    events.forEach((ev) => {
      if (filter !== "all" && ev.cat !== filter) return;
      const y = ev.sort.slice(0, 4);
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y).push(ev);
    });

    root.innerHTML = "";
    yearnav.innerHTML = "";
    let side = 0;
    groups.forEach((list, year) => {
      const sec = document.createElement("section");
      sec.className = "year";
      sec.id = `y${year}`;
      sec.dataset.year = year;
      sec.innerHTML = `
        <header class="year__head is-in">
          <span class="year__num" aria-hidden="true">${year}</span>
          <h3 class="year__title"><span class="visually-hidden">${year}. </span>${esc(L(ERAS[year]) || "")}</h3>
        </header>
        <div class="year__cards"></div>`;
      const cards = sec.querySelector(".year__cards");
      list.forEach((ev) => {
        const cat = CATS[ev.cat] || { ru: ev.cat, en: ev.cat, color: "#fff" };
        const card = document.createElement("article");
        card.className = `card ${side++ % 2 ? "card--right" : "card--left"}${ev.major ? " card--major" : ""}${ev.draft ? " card--draft" : ""}`;
        card.dataset.cat = ev.cat;
        card.style.setProperty("--accent", cat.color);
        card.innerHTML = `
          <span class="card__dot" aria-hidden="true"></span>
          <div class="card__inner">
            <div class="card__meta">
              <time datetime="${esc(ev.sort)}">${esc(L(ev.date))}</time>
              <span class="tag">${esc(L(cat))}</span>
              ${ev.draft ? `<span class="tag tag--draft">${esc(t("card.draft"))}</span>` : ""}
            </div>
            <h4 class="card__title">${esc(L(ev.title))}</h4>
            <p class="card__text">${esc(L(ev.text))}</p>
            ${ev.source ? `<a class="card__link" href="${esc(ev.source)}" target="_blank" rel="noopener">${esc(t("card.source"))} ↗</a>` : ""}
          </div>`;
        cards.appendChild(card);
      });
      root.appendChild(sec);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = year;
      btn.dataset.year = year;
      btn.addEventListener("click", () => scrollToEl(sec));
      yearnav.appendChild(btn);
    });

    if (yearIO) yearIO.disconnect();
    const navBtns = [...yearnav.querySelectorAll("button")];
    yearIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) navBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.year === en.target.dataset.year));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    root.querySelectorAll(".year").forEach((s) => yearIO.observe(s));
    yearNums = [...root.querySelectorAll(".year__num")];
    if (lenis) lenis.resize();
    onScroll();
  }

  function renderFilters() {
    const used = new Set(events.map((e) => e.cat));
    const chips = [["all", t("filters.all"), "var(--text)"]].concat(
      Object.keys(CATS).filter((k) => used.has(k)).map((k) => [k, L(CATS[k]), CATS[k].color])
    );
    filtersEl.innerHTML = chips.map(([k, label, color]) =>
      `<button type="button" class="chip" data-filter="${k}" style="--accent:${color}" aria-pressed="${k === filter}"><i></i>${esc(label)}</button>`
    ).join("");
  }
  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    filter = chip.dataset.filter;
    filtersEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    renderTimeline();
  });

  /* ---------- Бегущая строка и шеринг ---------- */
  function renderMarquee() {
    const half = t("marquee").map((w) => `<span>${esc(w)}</span><span class="sep">★</span>`).join("");
    document.querySelector(".marquee__track").innerHTML = half + half;
  }
  const shareUrl = () => location.href.split("#")[0];
  function renderShare() {
    const text = t("share.text");
    const url = shareUrl();
    const x = document.querySelector('[data-share="x"]');
    const th = document.querySelector('[data-share="threads"]');
    if (x) x.href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    if (th) th.href = `https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + url)}`;
  }
  const copyBtn = document.querySelector('[data-share="copy"]');
  if (copyBtn) copyBtn.addEventListener("click", () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    navigator.clipboard.writeText(shareUrl()).then(() => {
      copyBtn.textContent = t("share.copied");
      setTimeout(() => (copyBtn.textContent = t("share.copy")), 2000);
    }, () => {});
  });

  /* ---------- Счётчик дней ---------- */
  const daysEl = document.querySelector("[data-days-since]");
  const daysTarget = Math.floor((Math.min(Date.now(), RELEASE.getTime()) - new Date(daysEl.dataset.daysSince + "T00:00:00")) / 86400000);
  const fmt = (n) => n.toLocaleString(lang === "ru" ? "ru-RU" : "en-US");
  let daysAnimating = false;

  /* ---------- Применить язык ---------- */
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    renderMarquee();
    renderFilters();
    renderTimeline();
    renderShare();
    if (!daysAnimating) daysEl.textContent = fmt(daysTarget);
    tick();
  }
  document.querySelector(".lang").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b || b.dataset.lang === lang) return;
    store.set(b.dataset.lang);
    applyLang(b.dataset.lang);
  });

  /* ---------- Скролл: линия, шапка, параллакс ---------- */
  const body = document.querySelector(".timeline__body");
  const fill = document.querySelector(".timeline__fill");
  const topbar = document.querySelector(".topbar");

  function onScroll() {
    const vh = window.innerHeight;
    const r = body.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / Math.max(1, r.height)));
    fill.style.transform = `scaleY(${p})`;
    yearnav.classList.toggle("is-visible", r.top < vh * 0.6 && r.bottom > vh * 0.4);
    topbar.classList.toggle("is-scrolled", window.scrollY > 40);
    if (reduceMotion) return;
    yearNums.forEach((el) => {
      const rr = el.parentElement.getBoundingClientRect();
      if (rr.bottom < -200 || rr.top > vh + 200) return;
      const off = Math.max(-36, Math.min(36, (rr.top - vh / 2) * -0.06));
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

  /* ---------- Старт ---------- */
  applyLang(lang);
  if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Счётчик дней «доезжает» до значения, когда блок попадает в кадр.
    const dio = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      dio.disconnect();
      daysAnimating = true;
      const t0 = performance.now(), dur = 1600;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        daysEl.textContent = fmt(Math.round(daysTarget * (0.85 + 0.15 * (1 - Math.pow(1 - k, 4)))));
        if (k < 1) requestAnimationFrame(step); else daysAnimating = false;
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    dio.observe(daysEl);
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
  requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
})();
