(() => {
  "use strict";

  // Релиз: 19 ноября 2026, полночь по локальному времени зрителя.
  const RELEASE = new Date(2026, 10, 19, 0, 0, 0);
  const SUPPORTED = ["en", "ru", "es", "fr", "tr", "ja", "zh"];
  const CJK_FONTS = {
    ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;800&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700;800&display=swap"
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CATS = window.CATEGORIES;
  const EVENTS = [...window.EVENTS].sort((a, b) => (a.sort || a.date).localeCompare(b.sort || b.date));
  const MEMES = [...window.MEMES].sort((a, b) => a.date.localeCompare(b.date));
  const WAIT = window.WAIT;
  const START = new Date(WAIT.start);

  /* ---------- Язык ---------- */
  const store = {
    get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch (e) { /* приватный режим */ } }
  };
  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.includes(q)) return q;
    const saved = store.get();
    if (SUPPORTED.includes(saved)) return saved;
    return "en";
  }
  function ensureLocale(code) {
    window.LOCALES = window.LOCALES || {};
    if (window.LOCALES[code]) return Promise.resolve(code);
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = `js/locales/${code}.js`;
      s.onload = () => resolve(window.LOCALES[code] ? code : "en");
      s.onerror = () => resolve("en");
      document.head.appendChild(s);
    });
  }
  function ensureFont(code) {
    const href = CJK_FONTS[code];
    if (!href || document.querySelector(`link[data-font="${code}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = href; l.dataset.font = code;
    document.head.appendChild(l);
  }

  let lang = "en";
  let L = window.LOCALES.en;
  let filter = "all";
  const t = (k) => (L.ui[k] !== undefined ? L.ui[k] : window.LOCALES.en.ui[k]);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cap = (s) => s.charAt(0).toLocaleUpperCase(L.intl) + s.slice(1);
  // Форматтеры создаются один раз на язык, а не на каждый вызов.
  let fmt = null;
  function makeFormatters(intl) {
    const dates = new Map();
    return {
      plural: new Intl.PluralRules(intl),
      num: new Intl.NumberFormat(intl),
      compact: new Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }),
      date(o) {
        const key = JSON.stringify(o);
        if (!dates.has(key)) dates.set(key, new Intl.DateTimeFormat(intl, Object.assign({ timeZone: "UTC" }, o)));
        return dates.get(key);
      }
    };
  }
  const plural = (unit, n) => {
    const forms = L.units[unit];
    return forms[fmt.plural.select(n)] || forms.other;
  };

  function fmtDate(iso, opts) {
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    const o = opts || (d ? { day: "numeric", month: "long", year: "numeric" } : m ? { month: "long", year: "numeric" } : { year: "numeric" });
    const s = fmt.date(o).format(date);
    return cap(s.replace(/\s?г\.$/, ""));
  }
  const eventDate = (ev) => (L.dates && L.dates[ev.id]) || fmtDate(ev.date);

  /* ---------- Плавный скролл ---------- */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollToEl = (el) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
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
      timers.forEach((el) => (el.innerHTML = `<p class="countdown__done">${esc(t("countdown.done"))}</p>`));
      if (inline) inline.textContent = t("countdown.inlineDone");
      return false;
    }
    const s = Math.floor(diff / 1000);
    const p = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    timers.forEach((el) => {
      for (const k in p) {
        const num = el.querySelector(`[data-unit="${k}"]`);
        const lab = el.querySelector(`[data-label="${k}"]`);
        const v = pad(p[k]);
        if (num && num.textContent !== v) {
          num.textContent = v;
          if (k === "s" && !reduceMotion) { num.classList.remove("tick"); void num.offsetWidth; num.classList.add("tick"); }
        }
        if (lab) { const l = plural(k, p[k]); if (lab.textContent !== l) lab.textContent = l; }
      }
    });
    const sh = L.short;
    if (inline) inline.textContent = `${p.d}${sh.d} ${p.h}${sh.h} ${p.m}${sh.m} ${p.s}${sh.s}`;
    return true;
  }

  /* ---------- Таймлайн ---------- */
  const root = document.getElementById("events");
  const yearnav = document.querySelector(".yearnav");
  const filtersEl = document.querySelector(".filters");
  let yearIO = null;
  let yearNums = [];
  let flowEls = [];
  const wide = window.matchMedia("(min-width: 861px)");
  if (wide.addEventListener) wide.addEventListener("change", () => renderTimeline());

  const PLAY = '<span class="card__play" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M5 3.5v13l11-6.5z"/></svg></span>';

  function mediaHTML(ev) {
    if (ev.img && ev.yt) {
      return `<a class="card__media" href="https://www.youtube.com/watch?v=${ev.yt}" target="_blank" rel="noopener" aria-label="${esc(t("card.watch"))}">
        <img src="${esc(ev.img)}" alt="" loading="lazy" decoding="async">${PLAY}</a>`;
    }
    if (ev.yt) {
      return `<a class="card__media" href="https://www.youtube.com/watch?v=${ev.yt}" target="_blank" rel="noopener" aria-label="${esc(t("card.watch"))}">
        <img src="https://i.ytimg.com/vi/${ev.yt}/maxresdefault.jpg" alt="" loading="lazy" data-yt="${ev.yt}">${PLAY}</a>`;
    }
    if (ev.img) return `<div class="card__media"><img src="${esc(ev.img)}" alt="" loading="lazy" decoding="async"></div>`;
    if (ev.poster) return `<div class="card__poster" aria-hidden="true"><span class="flow">${esc(ev.poster)}</span></div>`;
    return "";
  }

  function cardHTML(ev, side) {
    const [title, text] = L.events[ev.id] || window.LOCALES.en.events[ev.id] || [ev.id, ""];
    const media = mediaHTML(ev);
    const links = [];
    if (ev.link) links.push(`<a href="${esc(ev.link)}">${esc(t("card.more"))} ↓</a>`);
    if (ev.yt) links.push(`<a href="https://www.youtube.com/watch?v=${ev.yt}" target="_blank" rel="noopener">${esc(t("card.watch"))} ↗</a>`);
    if (ev.source) links.push(`<a href="${esc(ev.source)}" target="_blank" rel="noopener">${esc(t("card.source"))} ↗</a>`);
    const cls = ["card", side ? "card--right" : "card--left"];
    if (ev.major) cls.push("card--major");
    if (media) cls.push("card--media");
    return `<article class="${cls.join(" ")}" data-cat="${ev.cat}" style="--accent:${CATS[ev.cat] || "#fff"}">
      <span class="card__dot" aria-hidden="true"></span>
      <div class="card__inner">
        ${media}
        <div class="card__body">
          <div class="card__meta">
            <time datetime="${esc(ev.date)}">${esc(eventDate(ev))}</time>
            <span class="tag">${esc(L.cats[ev.cat] || ev.cat)}</span>
          </div>
          <h4 class="card__title">${esc(title)}</h4>
          <p class="card__text">${esc(text)}</p>
          ${links.length ? `<div class="card__links">${links.join("")}</div>` : ""}
        </div>
      </div>
    </article>`;
  }

  // Если превью с YouTube недоступно: maxres → hq → убрать картинку.
  root.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.yt && img.src.includes("maxresdefault")) { img.src = `https://i.ytimg.com/vi/${img.dataset.yt}/hqdefault.jpg`; return; }
    const card = img.closest(".card");
    const media = img.closest(".card__media");
    if (media) media.remove();
    if (card && !card.querySelector(".card__poster")) card.classList.remove("card--media");
  }, true);

  function renderTimeline() {
    const groups = new Map();
    EVENTS.forEach((ev) => {
      if (filter !== "all" && ev.cat !== filter) return;
      const y = ev.date.slice(0, 4);
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y).push(ev);
    });
    const split = wide.matches;
    let html = "", nav = "";
    groups.forEach((list, year) => {
      // На широком экране — две колонки со сдвигом (зигзаг без пустот), на узком — одна.
      const cards = split && list.length > 1
        ? `<div class="year__cards is-split">
            <div class="year__col year__col--left">${list.filter((_, i) => i % 2 === 0).map((ev) => cardHTML(ev, 0)).join("")}</div>
            <div class="year__col year__col--right">${list.filter((_, i) => i % 2 === 1).map((ev) => cardHTML(ev, 1)).join("")}</div>
          </div>`
        : `<div class="year__cards">${list.map((ev, i) => cardHTML(ev, i % 2)).join("")}</div>`;
      html += `<section class="year" id="y${year}" data-year="${year}">
        <header class="year__head">
          <span class="year__num flow" aria-hidden="true">${year}</span>
          <h3 class="year__title"><span class="visually-hidden">${year}. </span>${esc((L.eras && L.eras[year]) || "")}</h3>
        </header>
        ${cards}
      </section>`;
      nav += `<button type="button" data-year="${year}">${year}</button>`;
    });
    root.innerHTML = html;
    yearnav.innerHTML = nav;

    if (yearIO) yearIO.disconnect();
    const navBtns = [...yearnav.querySelectorAll("button")];
    navBtns.forEach((b) => b.addEventListener("click", () => scrollToEl(document.getElementById(`y${b.dataset.year}`))));
    yearIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) navBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.year === en.target.dataset.year));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    root.querySelectorAll(".year").forEach((s) => yearIO.observe(s));
    yearNums = [...root.querySelectorAll(".year__num")];
    flowEls = [...document.querySelectorAll(".flow")];
    if (lenis) lenis.resize();
    paintLine();
    onScroll();
  }

  function renderFilters() {
    const used = new Set(EVENTS.map((e) => e.cat));
    const chips = [["all", t("filters.all"), "var(--text)"]].concat(
      Object.keys(CATS).filter((k) => used.has(k)).map((k) => [k, L.cats[k], CATS[k]])
    );
    filtersEl.innerHTML = chips.map(([k, label, color]) =>
      `<button type="button" class="chip" data-filter="${k}" style="--accent:${color}" aria-pressed="${k === filter}">${k === "all" ? "" : "<i></i>"}${esc(label)}</button>`
    ).join("");
  }
  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    filter = chip.dataset.filter;
    filtersEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    renderTimeline();
  });

  /* ---------- Мемы ---------- */
  const MEME_COLORS = ["#ff8cc6", "#f7c08f", "#b9a6ff", "#8fd3ff", "#7fe7e0", "#ffe08a"];
  function renderMemes() {
    document.getElementById("memes-grid").innerHTML = MEMES.map((m, i) => {
      const [what, note] = L.memes[m.id] || window.LOCALES.en.memes[m.id];
      return `<article class="meme${m.big ? " meme--big" : ""}" style="--accent:${MEME_COLORS[i % MEME_COLORS.length]}">
        <time datetime="${m.date}">${esc(fmtDate(m.date, { day: "numeric", month: "short", year: "numeric" }))}</time>
        <p class="meme__what">${esc(what)}</p>
        ${note ? `<p class="meme__note">${esc(note)}</p>` : ""}
      </article>`;
    }).join("");
  }

  /* ---------- Живые цифры ---------- */
  const live = {
    births: document.querySelector('[data-live="births"]'),
    km: document.querySelector('[data-live="km"]'),
    hours: document.querySelector('[data-live="hours"]'),
    age: document.querySelector('[data-live="age"]')
  };
  const compactEls = [...document.querySelectorAll("[data-compact]")];
  function updateLive() {
    if (!fmt) return;
    const now = Math.min(Date.now(), RELEASE.getTime());
    const sec = (now - START.getTime()) / 1000;
    const years = sec / (365.2425 * 86400);
    const set = (el, v) => { const s = fmt.num.format(v); if (el && el.textContent !== s) el.textContent = s; };
    const v = { births: Math.floor(years * WAIT.birthsPerYear), km: Math.floor(sec * WAIT.earthKmPerSec), hours: Math.floor(sec / 3600) };
    set(live.births, v.births);
    set(live.km, v.km);
    set(live.hours, v.hours);
    set(live.age, Math.floor(years));
    // Крупные цифры — в короткой записи (1.8B, 115K), точные значения тикают строкой ниже.
    const c = (n) => fmt.compact.format(n);
    const big = { births: c(v.births), km: c(v.km), hours: c(v.hours), steam: c(100000) + "+", sales: c(230e6) + "+", green: "≈" + c(13e6) };
    compactEls.forEach((el) => { const s = big[el.dataset.compact]; if (el.textContent !== s) el.textContent = s; });
  }

  /* ---------- Шеринг ---------- */
  const shareUrl = () => location.href.split("#")[0];
  function renderShare() {
    const text = t("share.text"), url = shareUrl();
    const x = document.querySelector('[data-share="x"]');
    const th = document.querySelector('[data-share="threads"]');
    if (x) x.href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    if (th) th.href = `https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + url)}`;
  }
  const copyBtn = document.querySelector('[data-share="copy"]');
  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }
  copyBtn.addEventListener("click", () => {
    const url = shareUrl();
    const done = (ok) => {
      // Если скопировать не вышло, показываем саму ссылку, чтобы её можно было выделить.
      copyBtn.textContent = ok ? t("share.copied") : url;
      setTimeout(() => (copyBtn.textContent = t("share.copy")), ok ? 2000 : 8000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => done(true), () => done(legacyCopy(url)));
    } else done(legacyCopy(url));
  });

  /* ---------- Применить язык ---------- */
  function applyLang(code) {
    lang = code;
    L = window.LOCALES[code];
    fmt = makeFormatters(L.intl);
    document.documentElement.lang = code;
    document.title = t("meta.title");
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelector(".hero__title").innerHTML = L.title.map((line) => `<span>${esc(line)}</span>`).join("");
    document.getElementById("lang-select").value = code;
    const half = L.marquee.map((w) => `<span>${esc(w)}</span><span class="sep">★</span>`).join("");
    document.querySelector(".marquee__track").innerHTML = half + half;
    renderFilters();
    renderTimeline();
    renderMemes();
    renderShare();
    updateLive();
    tick();
  }
  let requested = null;
  function switchLang(code) {
    requested = code;
    ensureFont(code);
    return ensureLocale(code).then((ready) => {
      if (requested !== code) return; // пользователь уже выбрал другой язык
      applyLang(ready);
    });
  }
  document.getElementById("lang-select").addEventListener("change", (e) => {
    store.set(e.target.value);
    switchLang(e.target.value);
  });

  /* ---------- Линия: градиент от цвета одной точки к цвету следующей ---------- */
  function paintLine() {
    const top = body.getBoundingClientRect().top;
    const h = body.offsetHeight || 1;
    const stops = [...root.querySelectorAll(".card")].map((card) => {
      const dot = card.querySelector(".card__dot").getBoundingClientRect();
      return { y: dot.top + dot.height / 2 - top, c: CATS[card.dataset.cat] || "#f472b6" };
    }).sort((a, b) => a.y - b.y);
    if (!stops.length) return;
    const pct = (y) => `${Math.max(0, Math.min(100, (y / h) * 100)).toFixed(3)}%`;
    fill.style.background = `linear-gradient(180deg, ${stops.map((st) => `${st.c} ${pct(st.y)}`).join(", ")})`;
  }

  /* ---------- Скролл: градиент, линия, шапка, параллакс ---------- */
  const docEl = document.documentElement;
  const body = document.querySelector(".timeline__body");
  const fill = document.querySelector(".timeline__fill");
  const topbar = document.querySelector(".topbar");

  function onScroll() {
    // Сначала все чтения геометрии, потом все записи — без принудительных перекомпоновок.
    const vh = window.innerHeight;
    const y = window.scrollY;
    const r = body.getBoundingClientRect();
    const shifts = reduceMotion ? [] : yearNums.map((el) => {
      const rr = el.parentElement.getBoundingClientRect();
      return rr.bottom < -200 || rr.top > vh + 200 ? null : Math.max(-36, Math.min(36, (rr.top - vh / 2) * -0.06));
    });

    const flow = `${(y * 0.45).toFixed(1)}px`;
    flowEls.forEach((el) => el.style.setProperty("--flow", flow));
    const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / Math.max(1, r.height)));
    fill.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`;
    yearnav.classList.toggle("is-visible", r.top < vh * 0.6 && r.bottom > vh * 0.4);
    topbar.classList.toggle("is-scrolled", y > 40);
    shifts.forEach((v, i) => { if (v !== null) yearNums[i].style.transform = `translate3d(0, ${v}px, 0)`; });
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", () => { paintLine(); onScroll(); });
  window.addEventListener("load", paintLine);
  if ("ResizeObserver" in window) new ResizeObserver(() => paintLine()).observe(body);

  /* ---------- Старт ---------- */
  const first = initialLang();
  const start = () => {
    if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }
    requestAnimationFrame(() => docEl.classList.add("is-loaded"));
  };
  // Не рисуем страницу на английском, если нужен другой язык: ждём его файл.
  if (first === "en") { applyLang("en"); start(); }
  else switchLang(first).then(() => { if (!fmt) applyLang("en"); start(); });

  // Главная картинка не загрузилась — убираем её (раньше было inline onerror, его блокирует CSP).
  const heroImg = document.querySelector(".hero__img");
  if (heroImg) {
    const dropHero = () => heroImg.closest("picture")?.remove();
    if (heroImg.complete && heroImg.naturalWidth === 0) dropHero();
    else heroImg.addEventListener("error", dropHero, { once: true });
  }

  let liveTimer = null, liveVisible = false;
  const syncLive = () => {
    const on = liveVisible && !document.hidden;
    if (on && !liveTimer) { updateLive(); liveTimer = setInterval(updateLive, reduceMotion ? 1000 : 120); }
    if (!on && liveTimer) { clearInterval(liveTimer); liveTimer = null; }
  };
  const numbers = document.getElementById("numbers");
  if ("IntersectionObserver" in window && numbers) {
    new IntersectionObserver(([en]) => { liveVisible = en.isIntersecting; syncLive(); }).observe(numbers);
  } else { liveVisible = true; }
  document.addEventListener("visibilitychange", syncLive);
  syncLive();
})();
