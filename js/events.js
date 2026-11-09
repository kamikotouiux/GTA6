/*
 * Данные таймлайна (RU + EN).
 *  sort   — ISO-дата для сортировки (YYYY-MM-DD)
 *  date   — подпись даты { ru, en }, можно приблизительно
 *  cat    — ключ категории из CATEGORIES
 *  major  — крупная карточка
 *  draft  — заглушка, факты не проверены
 *  source — ссылка на источник (необязательно)
 */

window.CATEGORIES = {
  news:    { ru: "Новость",   en: "News",     color: "#8fd3ff" },
  trailer: { ru: "Трейлер",   en: "Trailer",  color: "#ff8cc6" },
  delay:   { ru: "Перенос",   en: "Delay",    color: "#ffa77a" },
  leak:    { ru: "Хакеры",    en: "Hackers",  color: "#8ef0c0" },
  rumor:   { ru: "Инсайд",    en: "Insider",  color: "#b9a6ff" },
  meme:    { ru: "Мем",       en: "Meme",     color: "#ffe08a" },
  cast:    { ru: "Актёры",    en: "Cast",     color: "#dcaaff" },
  remake:  { ru: "Переделки", en: "Remakes",  color: "#7fe7e0" },
  ads:     { ru: "Реклама",   en: "Ads",      color: "#ffb5da" }
};

window.ERAS = {
  "2013": { ru: "Часы запущены",                    en: "The clock starts" },
  "2014": { ru: "Первые переиздания",               en: "The first re-releases" },
  "2015": { ru: "Эпоха пустых E3",                  en: "The empty-E3 era" },
  "2018": { ru: "Вестерн вместо Вайс-Сити",         en: "A western instead of Vice City" },
  "2020": { ru: "Смена поколений",                  en: "A generation shift" },
  "2021": { ru: "Ремастер, который лучше забыть",   en: "A remaster best forgotten" },
  "2022": { ru: "Официально и сразу утекло",        en: "Official, then leaked" },
  "2023": { ru: "Трейлер, который сломал интернет", en: "The trailer that broke the internet" },
  "2024": { ru: "Год тишины",                       en: "The year of silence" },
  "2025": { ru: "Два переноса и один сюрприз",      en: "Two delays and one surprise" },
  "2026": { ru: "Финишная прямая",                  en: "The home stretch" }
};

window.EVENTS = [
  {
    sort: "2013-09-17", cat: "news", major: true,
    date:  { ru: "17 сентября 2013", en: "September 17, 2013" },
    title: { ru: "GTA V выходит. Часы запущены", en: "GTA V launches. The clock starts" },
    text:  {
      ru: "Лос-Сантос открывается на PS3 и Xbox 360. За три дня игра приносит миллиард долларов. Никто ещё не знает, что следующую часть придётся ждать тринадцать лет.",
      en: "Los Santos opens on PS3 and Xbox 360. The game makes a billion dollars in three days. Nobody knows yet that the next one will take thirteen years."
    }
  },
  {
    sort: "2013-10-01", cat: "news",
    date:  { ru: "1 октября 2013", en: "October 1, 2013" },
    title: { ru: "Запуск GTA Online", en: "GTA Online goes live" },
    text:  {
      ru: "Онлайн-режим со временем становится денежной машиной Rockstar и главной причиной, почему шестой части некуда торопиться.",
      en: "The online mode grows into Rockstar's money machine, and the main reason the sixth game never had to hurry."
    }
  },
  {
    sort: "2014-11-18", cat: "news",
    date:  { ru: "18 ноября 2014", en: "November 18, 2014" },
    title: { ru: "GTA V на PS4 и Xbox One", en: "GTA V on PS4 and Xbox One" },
    text:  {
      ru: "Первое переиздание, с видом от первого лица. Весной 2015-го игра доходит до ПК. Шутка «купить GTA V ещё раз» только начинается.",
      en: "The first re-release, now with first-person mode. PC follows in spring 2015. The “buy GTA V again” joke is just getting started."
    }
  },
  {
    sort: "2015-06-15", cat: "meme",
    date:  { ru: "Каждый июнь, 2015–2019", en: "Every June, 2015–2019" },
    title: { ru: "«Анонс точно будет на E3»", en: "“They'll announce it at E3 for sure”" },
    text:  {
      ru: "Каждое лето фанаты ждут анонса на E3, и каждое лето его нет. Появляется отдельный жанр: скриншот пустой сцены с подписью «ещё год».",
      en: "Every summer fans wait for an E3 reveal, and every summer it doesn't come. A genre is born: a screenshot of an empty stage captioned “one more year”."
    }
  },
  {
    sort: "2018-10-26", cat: "news",
    date:  { ru: "26 октября 2018", en: "October 26, 2018" },
    title: { ru: "Red Dead Redemption 2", en: "Red Dead Redemption 2" },
    text:  {
      ru: "Rockstar выпускает вестерн вместо GTA. Игра становится шедевром, а тем, кто ждёт Вайс-Сити, выпадают ещё годы без анонса.",
      en: "Rockstar ships a western instead of GTA. It's a masterpiece, and for everyone waiting on Vice City it means more years without an announcement."
    }
  },
  {
    sort: "2020-03-11", cat: "news",
    date:  { ru: "Март 2020", en: "March 2020" },
    title: { ru: "Дэн Хаузер уходит из Rockstar", en: "Dan Houser leaves Rockstar" },
    text:  {
      ru: "Сооснователь студии и главный сценарист серии покидает компанию. Интернет гадает, каким будет юмор новой GTA без него.",
      en: "The studio co-founder and the series' lead writer departs. The internet wonders what the next GTA's humour will be like without him."
    }
  },
  {
    sort: "2020-06-11", cat: "meme",
    date:  { ru: "11 июня 2020", en: "June 11, 2020" },
    title: { ru: "На показе PS5 анонсируют… GTA V", en: "The PS5 reveal announces… GTA V" },
    text:  {
      ru: "Третье поколение консолей подряд. Мем «GTA V выйдет на PS9» перестаёт быть шуткой.",
      en: "A third console generation in a row. “GTA V on PS9” stops being a joke."
    }
  },
  {
    sort: "2021-11-11", cat: "remake", major: true,
    date:  { ru: "11 ноября 2021", en: "November 11, 2021" },
    title: { ru: "Провал Definitive Edition", en: "The Definitive Edition disaster" },
    text:  {
      ru: "Ремастер GTA III, Vice City и San Andreas выходит с багами, дождём на весь экран и странными лицами персонажей. Rockstar извиняется, а фанаты боятся, что студия разучилась делать игры.",
      en: "The GTA III, Vice City and San Andreas remaster launches with bugs, screen-filling rain and strange character faces. Rockstar apologises, and fans worry the studio has forgotten how to make games."
    }
  },
  {
    sort: "2022-02-04", cat: "news", major: true,
    date:  { ru: "4 февраля 2022", en: "February 4, 2022" },
    title: { ru: "Официально: новая GTA в разработке", en: "Official: the next GTA is in development" },
    text:  {
      ru: "Короткий пост Rockstar: разработка следующей Grand Theft Auto «идёт полным ходом». Ни названия, ни даты, зато ожидание наконец становится официальным.",
      en: "A short Rockstar post says development of the next Grand Theft Auto is “well underway”. No title, no date, but the wait is finally official."
    }
  },
  {
    sort: "2022-07-25", cat: "rumor",
    date:  { ru: "25 июля 2022", en: "July 25, 2022" },
    title: { ru: "Bloomberg: героиня и вымышленный Майами", en: "Bloomberg: a female lead and a fictional Miami" },
    text:  {
      ru: "Джейсон Шрайер пишет, что впервые за долгое время в серии будет главная героиня, сюжет в духе Бонни и Клайда, а действие развернётся в Вайс-Сити.",
      en: "Jason Schreier reports a female protagonist for the first time in decades, a Bonnie-and-Clyde-style story, and a return to Vice City."
    }
  },
  {
    sort: "2022-09-18", cat: "leak", major: true,
    date:  { ru: "18 сентября 2022", en: "September 18, 2022" },
    title: { ru: "Крупнейшая утечка в истории игр", en: "The biggest leak in gaming history" },
    text:  {
      ru: "Хакер выкладывает на GTAForums больше 90 видео из ранней сборки: Вайс-Сити, Люсия и Джейсон, ограбление закусочной. Rockstar подтверждает взлом и пишет, что «крайне разочарована».",
      en: "A hacker posts more than 90 videos from an early build on GTAForums: Vice City, Lucia and Jason, a diner robbery. Rockstar confirms the breach and says it is “extremely disappointed”."
    }
  },
  {
    sort: "2023-11-08", cat: "news",
    date:  { ru: "8 ноября 2023", en: "November 8, 2023" },
    title: { ru: "Сэм Хаузер: трейлер будет в декабре", en: "Sam Houser: trailer in December" },
    text:  {
      ru: "Rockstar назначает первый трейлер на 25-летие студии. Обратный отсчёт запускают все, у кого есть аккаунт в соцсетях.",
      en: "Rockstar sets the first trailer for the studio's 25th anniversary. Everyone with a social media account starts a countdown."
    }
  },
  {
    sort: "2023-12-04", cat: "trailer", major: true,
    date:  { ru: "4 декабря 2023", en: "December 4, 2023" },
    title: { ru: "Трейлер 1. Love Is a Long Road", en: "Trailer 1. Love Is a Long Road" },
    text:  {
      ru: "Ролик утекает в X, и Rockstar публикует его на несколько часов раньше срока. Том Петти, Люсия в тюремной робе, Флорида во всей красе. 90 млн просмотров за сутки: рекорд YouTube для немузыкального видео. Окно релиза: 2025.",
      en: "The video leaks on X and Rockstar posts it hours early. Tom Petty, Lucia in a prison jumpsuit, Florida in all its glory. 90 million views in 24 hours: a YouTube record for a non-music video. Release window: 2025."
    }
  },
  {
    sort: "2023-12-07", cat: "meme",
    date:  { ru: "Декабрь 2023", en: "December 2023" },
    title: { ru: "«Флоридский Джокер» хочет гонорар", en: "The “Florida Joker” wants a cut" },
    text:  {
      ru: "Лоуренс Салливан, татуированный герой флоридских новостей, узнаёт себя в трейлере и требует компенсацию. Настоящая Флорида оказывается главным соавтором игры.",
      en: "Lawrence Sullivan, the tattooed star of Florida local news, spots himself in the trailer and asks for compensation. Real-life Florida turns out to be the game's main co-writer."
    }
  },
  {
    sort: "2023-12-21", cat: "leak",
    date:  { ru: "21 декабря 2023", en: "December 21, 2023" },
    title: { ru: "Хакер оказался подростком", en: "The hacker was a teenager" },
    text:  {
      ru: "Суд в Лондоне выносит решение: взлом Rockstar совершил 18-летний участник группировки Lapsus$. Его отправляют в закрытую больницу на неопределённый срок.",
      en: "A London court rules that the Rockstar breach was the work of an 18-year-old member of Lapsus$. He is sent to a secure hospital indefinitely."
    }
  },
  {
    sort: "2024-05-16", cat: "news",
    date:  { ru: "16 мая 2024", en: "May 16, 2024" },
    title: { ru: "Take-Two: осень 2025", en: "Take-Two: fall 2025" },
    text:  {
      ru: "На отчёте для инвесторов издатель сужает окно релиза до осени 2025 года. Фанаты отмечают даты в календарях. Зря.",
      en: "In an investor report the publisher narrows the release window to fall 2025. Fans mark their calendars. They shouldn't have."
    }
  },
  {
    sort: "2024-08-01", cat: "meme",
    date:  { ru: "Весь 2024", en: "All of 2024" },
    title: { ru: "«Где трейлер 2?»", en: "“Where's Trailer 2?”" },
    text:  {
      ru: "Сайты-счётчики дней без второго трейлера, теории про фазы луны, разбор каждого пикселя первого ролика. И бесконечные шутки о том, что Silksong выйдет раньше.",
      en: "Countdown sites for days without a second trailer, moon-phase theories, pixel-by-pixel breakdowns of the first one. And endless jokes that Silksong will come out first."
    }
  },
  {
    sort: "2024-10-01", cat: "remake",
    date:  { ru: "2023–2025", en: "2023–2025" },
    title: { ru: "Фанаты пересобирают трейлеры", en: "Fans rebuild the trailers" },
    text:  {
      ru: "Трейлеры воссоздают кадр в кадр в GTA V, Minecraft, Roblox и Unreal Engine 5. Каждая версия собирает миллионы просмотров. Ждать вместе веселее.",
      en: "The trailers get remade shot for shot in GTA V, Minecraft, Roblox and Unreal Engine 5. Every version pulls millions of views. Waiting is more fun together."
    }
  },
  {
    sort: "2025-05-02", cat: "delay", major: true,
    date:  { ru: "2 мая 2025", en: "May 2, 2025" },
    title: { ru: "Первый перенос: 26 мая 2026", en: "First delay: May 26, 2026" },
    text:  {
      ru: "Rockstar извиняется и сдвигает релиз на полгода с лишним. Акции Take-Two падают, интернет тонет в мемах про внуков, которые наконец поиграют в GTA 6.",
      en: "Rockstar apologises and pushes the release back more than half a year. Take-Two stock drops, and the internet drowns in memes about grandkids finally playing GTA 6."
    }
  },
  {
    sort: "2025-05-06", cat: "trailer", major: true,
    date:  { ru: "6 мая 2025", en: "May 6, 2025" },
    title: { ru: "Трейлер 2 без предупреждения", en: "Trailer 2, no warning" },
    text:  {
      ru: "Через четыре дня после переноса Rockstar молча выкладывает второй трейлер, страницы персонажей и десятки скриншотов. 475 млн просмотров за сутки на всех площадках, новый рекорд.",
      en: "Four days after the delay, Rockstar quietly drops a second trailer, character pages and dozens of screenshots. 475 million views in 24 hours across platforms, a new record."
    }
  },
  {
    sort: "2025-05-07", cat: "cast",
    date:  { ru: "Май 2025", en: "May 2025" },
    title: { ru: "Знакомьтесь: жители Леониды", en: "Meet the people of Leonida" },
    text:  {
      ru: "Джейсон и Люсия, Кэл Хэмптон, Буби Айк, Дре'Куан Прист, Real Dimez, Рауль Баутиста, Брайан Хедер. На карте появляются Вайс-Сити, Леонида-Кис, Грассриверс, Порт-Геллхорн, Амброзия и гора Калага.",
      en: "Jason and Lucia, Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista, Brian Heder. The map gains Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga."
    }
  },
  {
    sort: "2025-05-08", cat: "cast",
    date:  { ru: "2023–2025", en: "2023–2025" },
    title: { ru: "Интернет вычисляет актёров", en: "The internet finds the actors" },
    text:  {
      ru: "По голосу, лицу и старым роликам фанаты находят вероятных исполнителей главных ролей: Мэнни Л. Перес (Люсия) и Дилан Рурк (Джейсон). Rockstar официально не подтверждает.",
      en: "From voices, faces and old clips, fans identify the likely leads: Manni L. Perez (Lucia) and Dylan Rourke (Jason). Rockstar hasn't confirmed either."
    }
  },
  {
    sort: "2025-09-04", cat: "meme",
    date:  { ru: "4 сентября 2025", en: "September 4, 2025" },
    title: { ru: "Silksong действительно вышел раньше", en: "Silksong really did come out first" },
    text:  {
      ru: "Hollow Knight: Silksong, другой главный долгострой-мем, выходит 4 сентября 2025 года. Шутка «Silksong раньше GTA 6» сбывается.",
      en: "Hollow Knight: Silksong, the other great waiting meme, launches on September 4, 2025. “Silksong before GTA 6” comes true."
    }
  },
  {
    sort: "2025-10-30", cat: "news",
    date:  { ru: "Конец октября 2025", en: "Late October 2025" },
    title: { ru: "Увольнения в Rockstar", en: "Layoffs at Rockstar" },
    text:  {
      ru: "Студия увольняет более 30 сотрудников в Великобритании. Профсоюз IWGB называет это борьбой с профсоюзом, Rockstar говорит об утечке конфиденциальной информации.",
      en: "The studio fires more than 30 staff in the UK. The IWGB union calls it union-busting; Rockstar cites leaks of confidential information."
    }
  },
  {
    sort: "2025-11-06", cat: "delay", major: true,
    date:  { ru: "6 ноября 2025", en: "November 6, 2025" },
    title: { ru: "Второй перенос: 19 ноября 2026", en: "Second delay: November 19, 2026" },
    text:  {
      ru: "Rockstar снова извиняется и берёт ещё полгода на полировку. Глава Take-Two обещает, что больше переносов не будет.",
      en: "Rockstar apologises again and takes six more months for polish. Take-Two's CEO promises there will be no more delays."
    }
  },
  {
    sort: "2026-05-15", cat: "news",
    date:  { ru: "Май 2026", en: "May 2026" },
    title: { ru: "Дата подтверждена", en: "The date holds" },
    text:  {
      ru: "На годовом отчёте Take-Two повторяет: 19 ноября 2026. Без сюрпризов, впервые за всю историю ожидания.",
      en: "At its annual report Take-Two repeats: November 19, 2026. No surprises, for the first time in the whole wait."
    }
  },
  {
    sort: "2026-09-01", cat: "ads", draft: true,
    date:  { ru: "Осень 2026", en: "Fall 2026" },
    title: { ru: "Рекламная кампания со звёздами", en: "The celebrity ad campaign" },
    text:  {
      ru: "Место для финальной маркетинговой кампании: ролики с медийными лицами, коллаборации, наружная реклама. Заполнить проверенными фактами и ссылками.",
      en: "Placeholder for the final marketing push: spots with famous faces, collabs, billboards. To be filled with verified facts and links."
    }
  }
];
