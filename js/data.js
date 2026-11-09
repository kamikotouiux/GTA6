/*
 * Метаданные таймлайна. Тексты лежат в js/locales/<язык>.js под тем же id.
 *
 *  id      — ключ события (совпадает с ключом в локалях)
 *  date    — "YYYY-MM-DD", "YYYY-MM" или "YYYY": точность определяет формат даты
 *  sort    — ключ сортировки, если отличается от date (необязательно)
 *  cat     — категория из CATEGORIES
 *  major   — крупная карточка
 *  yt      — id ролика на YouTube: превью подтянется в браузере зрителя
 *  img     — путь к своей картинке (assets/events/...), если она есть
 *  poster  — крупная цифра/слово вместо картинки
 *  link    — внутренняя ссылка (например, на раздел с мемами)
 *  source  — ссылка на источник
 */

window.CATEGORIES = {
  news:    "#8fd3ff",
  trailer: "#ff8cc6",
  delay:   "#ffa77a",
  leak:    "#8ef0c0",
  rumor:   "#b9a6ff",
  meme:    "#ffe08a",
  cast:    "#dcaaff",
  music:   "#ffb5da",
  remake:  "#7fe7e0",
  ads:     "#f7c08f"
};

window.EVENTS = [
  { id: "gtav", img: "assets/events/gtav.webp", yt: "hvoD7ehZPcM", date: "2013-09-17", cat: "news", major: true },
  { id: "online", date: "2013-10-01", cat: "news" },
  { id: "nextgen", img: "assets/events/nextgen.webp", yt: "Fng-OaFeeO0", date: "2014-11-18", cat: "news" },
  { id: "e3", date: "2015", sort: "2015-06-15", cat: "meme" },
  { id: "rdr2", date: "2018-10-26", cat: "news" },
  { id: "houser", date: "2020-03", sort: "2020-03-11", cat: "news" },
  { id: "ps5", date: "2020-06-11", cat: "meme" },
  { id: "definitive", img: "assets/events/definitive.webp", yt: "7x7zr1onxfU", date: "2021-11-11", cat: "remake", major: true },
  { id: "official", img: "assets/events/official.webp", date: "2022-02-04", cat: "news", major: true },
  { id: "bloomberg", img: "assets/events/bloomberg.webp", date: "2022-07-25", cat: "rumor" },
  { id: "hack", date: "2022-09-18", cat: "leak", major: true, poster: "90+",
    source: "https://variety.com/2022/digital/news/grand-theft-auto-6-leak-rockstar-games-hack-1235376727" },
  { id: "aliens", date: "2023-07-27", cat: "meme", major: true, link: "#memes",
    source: "https://knowyourmeme.com/memes/we-got-x-before-gta-6" },
  { id: "cfx", date: "2023-08-11", cat: "news",
    source: "https://videogameschronicle.com/news/rockstar-acquires-gta-5-roleplay-devs-cfx-re" },
  { id: "firestick", date: "2023-08", sort: "2023-08-23", cat: "leak",
    source: "https://www.pcgamer.com/teenager-found-liable-for-gta-6-hack-did-it-in-a-travelodge-where-police-put-him-after-he-was-arrested-for-another-hack" },
  { id: "announce", date: "2023-11-08", cat: "news" },
  { id: "btc", date: "2023-12-04", cat: "leak",
    source: "https://decrypt.co/208899/buy-btc-viral-leaked-gta-6-game-trailer-shills-bitcoin" },
  { id: "trailer1", img: "assets/events/trailer1.webp", date: "2023-12-04", cat: "trailer", major: true, yt: "QdBZY2fkU-0",
    source: "https://pushsquare.com/news/2023/12/gta-6-trailer-pulls-90-million-views-in-24-hours-sets-new-world-records" },
  { id: "petty", date: "2023-12-06", cat: "music", poster: "+36 979%",
    source: "https://pcgamer.com/spotify-registers-ridiculous-increase-in-tom-petty-streams-as-gta-6-trailer-drives-everyone-dad-rock-mad" },
  { id: "joker", img: "assets/events/joker.webp", date: "2023-12", sort: "2023-12-10", cat: "meme" },
  { id: "sentence", date: "2023-12-21", cat: "leak" },
  { id: "fall2025", date: "2024-05-16", cat: "news" },
  { id: "where", date: "2024", sort: "2024-08-01", cat: "meme" },
  { id: "remakes", date: "2024", sort: "2024-10-01", cat: "remake" },
  { id: "delay1", date: "2025-05-02", cat: "delay", major: true, poster: "2025 → 2026",
    source: "https://www.videogameschronicle.com/news/grand-theft-auto-6-has-been-delayed-to-2026/" },
  { id: "trailer2", img: "assets/events/trailer2.webp", date: "2025-05-06", cat: "trailer", major: true, yt: "VQRLujxTm3c",
    source: "https://www.techradar.com/gaming/the-latest-grand-theft-auto-6-trailer-has-set-a-major-record-by-racking-up-475-million-views-in-just-24-hours" },
  { id: "leonida", img: "assets/events/leonida.webp", date: "2025-05-06", sort: "2025-05-06b", cat: "cast" },
  { id: "pope", date: "2025-05-08", cat: "meme", link: "#memes" },
  { id: "actors", date: "2025", sort: "2025-05-20", cat: "cast" },
  { id: "silksong", date: "2025-09-04", cat: "meme" },
  { id: "layoffs", date: "2025-10-30", cat: "news",
    source: "https://www.pcgamer.com/gaming-industry/rockstar-faces-legal-setback-as-uk-tribunal-allows-its-fired-workers-to-bring-every-one-of-their-union-busting-allegations-to-trial/" },
  { id: "delay2", date: "2025-11-06", cat: "delay", major: true, poster: "26.05 → 19.11",
    source: "https://kotaku.com/when-rockstar-needed-to-delay-gta-6-again-take-twos-ceo-replied-please-tell-me-youre-kidding-2000745938" },
  { id: "confirm", date: "2026-05", sort: "2026-05-15", cat: "news",
    source: "https://variety.com/2026/gaming/news/gta-5-no-delay-price-marketing-summer-1236755303/" },
  { id: "cover", img: "assets/events/cover.webp", yt: "EiQEBYDox_k", date: "2026-06-18", cat: "meme", major: true,
    source: "https://opencritic.com/news/33238/rockstar-responds-after-white-house-posts-gta-6-box-art-with-trump" },
  { id: "preorders", img: "assets/events/preorders.webp", date: "2026-06-25", cat: "news", major: true,
    source: "https://techradar.com/gaming/gta-6-pre-orders-go-live-at-midnight-local-time-as-rockstar-unveils-the-ultimate-edition-that-amplifies-the-experience-with-exclusive-items" },
  { id: "nodisc", date: "2026-06", sort: "2026-06-26", cat: "news",
    source: "https://kotaku.com/physical-copies-of-gta-6-will-just-be-a-code-in-a-box-with-no-disc-at-launch-2000709919" },
  { id: "cyberleek", img: "assets/events/cyberleek.webp", date: "2026-08", sort: "2026-08-10", cat: "leak", major: true,
    source: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-leaker-threatens-to-release-a-build-of-the-entire-game-start-to-finish-but-gives-take-two-a-way-out-physical-disks-and-a-public-apology/" },
  { id: "extended", img: "assets/events/extended.webp", yt: "tJbzMqJGH4k", date: "2026-08-27", cat: "trailer", major: true,
    source: "https://variety.com/2026/tv/news/gta-6-netflix-extended-look-views-1236848409/" },
  { id: "root", date: "2026-09-14", cat: "cast",
    source: "https://www.pushsquare.com/news/2026/09/the-first-gta-6-actor-has-confirmed-their-involvement-and-nobodys-surprised" },
  { id: "artists", img: "assets/events/artists.webp", date: "2026-09-15", cat: "music",
    source: "https://kotaku.com/music-artists-like-travis-scott-and-keith-richards-have-started-hyping-gta-6s-massive-soundtrack-2000734652" },
  { id: "extleek", date: "2026-10-08", cat: "leak",
    source: "https://www.dexerto.com/gta/gta-6-leaker-cyberleek-returns-with-massive-25-minute-gameplay-leak-3416630/" },
  { id: "blimp", date: "2026-10-12", cat: "ads",
    source: "https://www.gfinityesports.com/article/latest-gta-6-marketing-stunt-sees-rockstar-launch-vice-city-blimp" },
  { id: "launch", img: "assets/events/launch.webp", yt: "rz1B4B2yBZY", date: "2026-10-15", cat: "trailer", major: true,
    source: "https://www.thegamer.com/gta-6-more-views-gta-5-launch-trailer/" },
  { id: "justice", img: "assets/events/justice.webp", date: "2026-10-15", sort: "2026-10-15b", cat: "music",
    source: "https://www.billboard.com/music/music-news/grand-theft-auto-vi-score-justice-1236361230/" },
  { id: "beach", img: "assets/events/beach.webp", date: "2026-10-15", sort: "2026-10-15c", cat: "ads",
    source: "https://www.gamespot.com/articles/gta-6-is-taking-over-miami-amid-pushback-from-officials-were-depicting-miami-like-a-murder-capital/" },
  { id: "tvad", date: "2026-10", sort: "2026-10-20", cat: "ads",
    source: "https://www.gamespot.com/articles/gta-6s-new-tv-trailer-is-a-bit-different-see-it-for-yourself/" },
  { id: "preload", date: "2026-11-03", cat: "news", poster: "212 GB",
    source: "https://www.gamesradar.com/games/grand-theft-auto/rockstar-confirms-gta-6-is-212gb-pre-loading-opens-earlier-than-previously-announced-for-digital-orders/" }
];

/* «Мы получили это раньше GTA VI». Тексты — в локалях под ключом memes. */
window.MEMES = [
  { id: "flappy", date: "2014-02-10" },
  { id: "philae", date: "2014-11-12" },
  { id: "dress", date: "2015-02-26", big: true },
  { id: "pluto", date: "2015-07-14" },
  { id: "win10", date: "2015-07-29" },
  { id: "leo", date: "2016-02-28", big: true },
  { id: "pokemongo", date: "2016-07-06" },
  { id: "vine", date: "2017-01-17" },
  { id: "envelope", date: "2017-02-26" },
  { id: "fortnite", date: "2017-07-25" },
  { id: "roadster", date: "2018-02-06", big: true },
  { id: "tes6", date: "2018-06-10" },
  { id: "tiktok", date: "2018-08-02" },
  { id: "blackhole", date: "2019-04-10" },
  { id: "got", date: "2019-05-19" },
  { id: "sonic", date: "2019-11-12" },
  { id: "stadia", date: "2019-11-19", big: true },
  { id: "babyshark", date: "2020-11-02" },
  { id: "cyberpunk", date: "2020-12-10" },
  { id: "gamestop", date: "2021-01-28" },
  { id: "evergiven", date: "2021-03-23", big: true },
  { id: "ingenuity", date: "2021-04-19" },
  { id: "rickroll", date: "2021-07-28" },
  { id: "squidgame", date: "2021-09-17", big: true },
  { id: "webb", date: "2021-12-25" },
  { id: "gtav3", date: "2022-03-15" },
  { id: "slap", date: "2022-03-27" },
  { id: "morbius", date: "2022-06-03", big: true },
  { id: "iedeath", date: "2022-06-15" },
  { id: "musk", date: "2022-10-27" },
  { id: "chatgpt", date: "2022-11-30" },
  { id: "avatar", date: "2022-12-16" },
  { id: "coronation", date: "2023-05-06" },
  { id: "messimiami", date: "2023-07-15", big: true },
  { id: "barbie", date: "2023-07-21" },
  { id: "x", date: "2023-07-24" },
  { id: "ufo", date: "2023-07-26", big: true },
  { id: "moonlanding", date: "2024-02-22" },
  { id: "dikec", date: "2024-07-30", big: true },
  { id: "raygun", date: "2024-08-09", big: true },
  { id: "concord", date: "2024-09-06" },
  { id: "moodeng", date: "2024-09-15" },
  { id: "chopsticks", date: "2024-10-13" },
  { id: "tyson", date: "2024-11-15" },
  { id: "btc100k", date: "2024-12-05" },
  { id: "magnus", date: "2024-12-27", big: true },
  { id: "duolingo", date: "2025-02-11" },
  { id: "chickenjockey", date: "2025-04-04" },
  { id: "direwolf", date: "2025-04-07", big: true },
  { id: "pope", date: "2025-05-08", big: true },
  { id: "artemis", date: "2026-04-06", big: true },
  { id: "flyingcar", date: "2026-10-15", big: true }
];

/* Инфографика: что считать в реальном времени. */
window.WAIT = {
  start: "2013-09-17T00:00:00",
  birthsPerYear: 135e6,     // ≈ среднее по данным ООН за 2013–2026 (132–140 млн в год)
  earthKmPerSec: 29.78,     // орбитальная скорость Земли
  synodicMonthDays: 29.530589
};
