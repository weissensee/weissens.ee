/* ---------------------------------------------------------
   openLitfass – Frontend-Logik
   Vanilla JS, keine Abhängigkeiten, keine Build-Pipeline.

   Daten (alle von fetch / build-site erzeugt, siehe https://docs.openlitfass.org/?page=data-formats):
     data/events.json      Termine
     data/categories.json  Kategorie -> Piktogramm (Reihenfolge = Menü)
     data/sources.json     Quellen für "Quelle: …" und die Über-Seite
     data/site.json        instance.json der Instanz (Name, Texte, Links)

   Ansichten (Hash-Routing, damit Links teilbar sind):
     #            Liste
     #gemerkt     gemerkte Termine
     #ueber       Über-Seite
     #<event-id>  Detailansicht eines Termins
--------------------------------------------------------- */
(() => {
  "use strict";

  // ---- Projekt ----
  // Die Software selbst, unabhängig von der Instanz: Ziel für "Erstellt mit
  // openLitfass" und für Fehlermeldungen zur Software auf der Über-Seite.
  const CORE_HOMEPAGE = "https://openlitfass.org";
  const CORE_ISSUES_URL = "https://github.com/schreibtischhelden/openlitfass/issues";

  // Einstellungen auf dem Gerät (js/settings.js). Fehlt das Skript (alte
  // Kopie im Cache), gelten die Standardwerte und nichts wird gespeichert.
  const SETTINGS = window.openLitfassSettings || {
    get: (name) => (name === "theme" ? "system" : "click"),
    set: () => {},
    all: () => ({ theme: "system", maps: "click", images: "click" }),
    readOnly: () => false,
    entries: () => [],
    remove: () => {},
    clearAll: () => Promise.resolve(),
    onChange: () => {}
  };

  // ---- Texte ----
  // Alle sichtbaren Texte an einer Stelle, damit Mehrsprachigkeit später
  // ohne Umbau ergänzt werden kann.
  const STR = {
    today: "Heute",
    tomorrow: "Morgen",
    periodDay: "Tag",
    periodWeekend: "Wochenende",
    periodWeek: "7 Tage",
    period: "Zeitraum",
    earlier: "Früher",
    later: "Später",
    pickDate: "Datum wählen",
    allDates: "Alle Termine",
    backToToday: "zurück zu heute",
    nextEvent: "Nächster Termin:",
    prevEventNav: "Vorheriger Termin",
    nextEventNav: "Nächster Termin",
    filters: "Filter",
    activeFilters: "Gesetzte Filter",
    remove: "entfernen",
    reset: "zurücksetzen",
    emptyRange: ["Keine Termine in diesem Zeitraum.", ""],
    allDay: "ganztägig",
    running: "Läuft",
    longRunning: "Läuft noch",
    ended: "Beendet",
    free: "Kostenlos",
    ticket: "Ticket nötig",
    registration: "Anmeldung nötig",
    family: "Familie & Kinder",
    resultOne: "1 Termin",
    resultMany: (n) => `${n} Termine`,
    resultCancelled: (n) => ` · davon ${n} abgesagt`,
    cancelled: "Abgesagt",
    cancelledNotice: "Laut Veranstalter findet dieser Termin nicht statt.",
    savedHeading: "Gemerkt",
    emptyNoData: ["Gerade stehen keine Termine an.", "Schau bald wieder vorbei."],
    emptyFiltered: ["Keine Termine für diese Auswahl.", ""],
    emptySaved: ["Noch nichts gemerkt.", "Tipp auf den Stern in einem Termin, um ihn hier zu sammeln."],
    resetFilters: "Filter zurücksetzen",
    clearCategories: "Kategorien zurücksetzen",
    clearQuick: "Merkmale zurücksetzen",
    clearSearch: "Suche leeren",
    loadError: "Die Termine konnten nicht geladen werden. Bitte später erneut versuchen.",
    back: "Zurück",
    save: "Merken",
    unsave: "Nicht mehr merken",
    newTab: "(öffnet externe Seite in neuem Tab)",
    placesHeading: "Orte",
    allPlaces: "Alle Orte",
    upcomingHere: "Kommende Termine hier",
    noUpcomingHere: "Zurzeit sind hier keine Termine bekannt.",
    openingHours: "Öffnungszeiten",
    season: "Saison",
    website: "Website",
    aboutPlace: "Mehr über diesen Ort",
    moreEvents: (n) => `… und ${n} weitere Termine`,
    suggestPlace: "Ort",
    suggestType: "Typ",
    suggestName: "Termin",
    suggestEventOne: "Termin",
    suggestEventMany: "Termine",
    themeDark: "Dunkles Farbschema",
    themeLight: "Helles Farbschema",
    addToCalendar: "In Kalender",
    share: "Teilen",
    toEvent: "Zur Veranstaltung",
    openMap: "Karte öffnen",
    noRegistration: "keine Anmeldung nötig",
    source: "Quelle",
    sources: "Quellen",
    updated: "aktualisiert",
    linkCopied: "Link kopiert",
    about: "Über",
    aboutSources: "Woher die Termine kommen",
    aboutSubmit: "Termin fehlt?",
    aboutSubmitBtn: "Termin melden",
    imprint: "Impressum",
    privacy: "Datenschutz",
    poweredBy: "Erstellt mit openLitfass",
    aboutFeedback: "Fehler gefunden? Eine Idee?",
    aboutFeedbackSite: "Zu dieser Seite – Termine, Quellen, Orte",
    aboutFeedbackCore: "Zur Software openLitfass",
    feedbackBug: "Fehler melden",
    feedbackFeature: "Idee vorschlagen",
    feedbackAll: "Alle Meldungen",
    inbox: "Von Hand eingetragen",
    settings: "Einstellungen",
    settingsIntro: "Diese Einstellungen gelten nur für diesen Browser auf diesem Gerät. Sie werden nicht an uns oder andere geschickt, Cookies setzt diese Seite nicht.",
    settingsReadOnly: "Die Einstellungen stammen von einer neueren Version dieser Seite. Sie werden hier angezeigt, aber nicht verändert.",
    settingsAppearance: "Darstellung",
    settingsTheme: "Farbschema",
    themeSystem: "Wie das Gerät",
    themeLightShort: "Hell",
    themeDarkShort: "Dunkel",
    settingsExternal: "Inhalte von anderen Seiten",
    settingsExternalIntro: "Karten und Bilder kommen von fremden Servern. Beim Laden sieht der jeweilige Server deine IP-Adresse.",
    settingsMaps: "Karten",
    settingsMapsHost: "Kartenbilder von openstreetmap.org, ohne Cookies",
    settingsImages: "Bilder zu Terminen",
    settingsImagesHost: "direkt von den Servern der Veranstalter, ohne Angabe dieser Seite (Cookies je nach Browser)",
    externalClick: "Nach Klick laden",
    externalAuto: "Immer laden",
    externalOff: "Nie anzeigen",
    settingsLocal: "Gespeichert auf diesem Gerät",
    settingsLocalNone: "Zurzeit ist nichts gespeichert.",
    settingsLocalOffline: "Außerdem hält der Browser eine Offline-Kopie der Seite, damit sie ohne Netz startet.",
    localSettings: "Einstellungen",
    localSaved: (n) => `Merkliste (${n === 1 ? "1 Termin" : `${n} Termine`})`,
    localLegacyTheme: "Farbschema (ältere Version)",
    localOther: "Sonstiger Eintrag",
    localDelete: "Löschen",
    clearAll: "Alle Daten auf diesem Gerät löschen",
    clearAllConfirm: "Alle Einstellungen, die Merkliste und die Offline-Kopie dieser Seite löschen?",
    clearedAll: "Alles gelöscht",
    deleted: "Gelöscht",
    settingSaved: "Gespeichert",
    imageAlt: (title) => `Bild zu „${title}“`
  };

  const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const WEEKDAYS_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const MONTHS_SHORT = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

  // ---- Icons (Tabler Icons, MIT, outline, 24x24; see THIRD-PARTY-NOTICES.txt) ----
  const ICON = {
    fallback: ["M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3"],
    free: ["M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2", "M12 8l0 13", "M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7", "M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5"],
    ticket: ["M15 5l0 2", "M15 11l0 2", "M15 17l0 2", "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"],
    registration: ["M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "M6 21v-2a4 4 0 0 1 4 -4h4", "M15 19l2 2l4 -4"],
    family: ["M6 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "M16 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "M2 5h2.5l1.632 4.897a6 6 0 0 0 5.693 4.103h2.675a5.5 5.5 0 0 0 0 -11h-.5v6", "M6 9h14", "M9 17l1 -3", "M16 14l1 3"],
    pin: ["M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"],
    calendar: ["M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12", "M16 3v4", "M8 3v4", "M4 11h16"],
    calendarToday: ["M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12", "M16 3v4", "M8 3v4", "M4 11h16", "M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"],
    calendarPlus: ["M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5", "M16 3v4", "M8 3v4", "M4 11h16", "M16 19h6", "M19 16v6"],
    clock: ["M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "M12 7v5l3 3"],
    users: ["M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", "M16 3.13a4 4 0 0 1 0 7.75", "M21 21v-2a4 4 0 0 0 -3 -3.85"],
    coin: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1", "M12 7v10"],
    share: ["M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "M8.7 10.7l6.6 -3.4", "M8.7 13.3l6.6 3.4"],
    external: ["M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6", "M11 13l9 -9", "M15 4h5v5"],
    star: ["M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245"],
    back: ["M15 6l-6 6l6 6"],
    forward: ["M9 6l6 6l-6 6"],
    filter: ["M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"],
    clear: ["M18 6l-12 12", "M6 6l12 12"]
  };

  function svg(paths, cls) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ` +
      `stroke-linejoin="round" aria-hidden="true"${cls ? ` class="${cls}"` : ""}>${paths.map((d) => `<path d="${d}"/>`).join("")}</svg>`;
  }

  const ATTRS = [
    { key: "free", label: STR.free, icon: ICON.free, test: (ev) => ev.price && ev.price.free },
    { key: "family", label: STR.family, icon: ICON.family, test: (ev) => ev.familyFriendly },
    { key: "ticket", label: STR.ticket, icon: ICON.ticket, test: (ev) => ev.ticketRequired },
    { key: "registration", label: STR.registration, icon: ICON.registration, test: (ev) => ev.registrationRequired }
  ];
  // Zeiträume der Datumsleiste: die Pfeile blättern um genau diese Einheit.
  // Eigene Symbole aus einer Familie (Tabler-Stil): derselbe Kalender, die
  // Markierung zeigt den Zeitraum - ein Punkt = Tag, zwei Punkte rechts =
  // die letzten beiden Wochentage, Doppelpfeil = 7 Tage ab Datum.
  const CAL = ["M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12", "M16 3v4", "M8 3v4", "M4 11h16"];
  const PERIODS = [
    { key: "tag", label: STR.periodDay, icon: CAL.concat(["M10.5 14.5h3v2.5h-3z"]) },
    { key: "wochenende", label: STR.periodWeekend, icon: CAL.concat(["M12 14.5h2v2.5h-2z", "M15.5 14.5h2v2.5h-2z"]) },
    { key: "woche", label: STR.periodWeek, icon: CAL.concat(["M7 15.5h10", "M9 13.5l-2 2l2 2", "M15 13.5l2 2l-2 2"]) }
  ];

  // ---- State ----
  const state = {
    events: [],
    byId: new Map(),
    generatedAt: null,
    categories: [],
    categoryIcons: new Map(),
    places: [], placeTypes: [], placeById: new Map(), placeTypeIcons: new Map(),
    placeType: "",              // gewählte Ortsart in der Orte-Liste ("" = alle)
    categoryGroup: new Map(),   // Mitglied -> Gruppe (categories.json "group")
    groupMembers: new Map(),    // Gruppe -> [Mitglieder]
    sources: new Map(),
    site: {},
    search: "",
    categoriesOn: new Set(),
    attrsOn: new Set(),
    period: "tag",   // tag | wochenende | woche
    anchor: "",      // erster Tag des gewählten Zeitraums (YYYY-MM-DD); "" = heute
    view: "list",
    cameFromList: false,
    placeId: "",          // zuletzt geöffnete Ortsseite
    detailId: "",         // Termin in der Detailansicht
    detailFrom: "list"    // Ansicht, aus der die Detailansicht geöffnet wurde
  };

  const $ = (id) => document.getElementById(id);
  const el = {
    header: document.querySelector(".app-header"),
    searchToggle: $("searchToggle"),
    searchBar: $("searchBar"),
    searchInput: $("searchInput"),
    toolbar: $("toolbar"),
    categoryMenu: $("categoryMenu"),
    dateNav: $("dateNav"),
    quickFilters: $("quickFilters"),
    main: $("main"),
    viewList: $("viewList"),
    viewDetail: $("viewDetail"),
    viewAbout: $("viewAbout"),
    viewSettings: $("viewSettings"),
    viewPlaces: $("viewPlaces"),
    viewPlace: $("viewPlace"),
    navPlaces: $("navPlaces"),
    resultCount: $("resultCount"),
    groups: $("eventGroups"),
    empty: $("emptyState"),
    footer: $("siteFooter"),
    savedCount: $("savedCount"),
    toast: $("toast"),
    navItems: document.querySelectorAll(".bottom-nav__item")
  };

  // ---- Gemerkt (nur lokal im Browser) ----
  const SAVED_KEY = "openlitfass:saved:" + location.pathname;
  const saved = new Set(readSaved());

  function readSaved() {
    try {
      const v = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      return Array.isArray(v) ? v : [];
    } catch (_) {
      return [];
    }
  }
  function writeSaved() {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...saved])); } catch (_) { /* privat/gesperrt: nur für diese Sitzung */ }
  }
  function toggleSaved(id) {
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    writeSaved();
    updateSavedCount();
  }
  function updateSavedCount() {
    const n = [...saved].filter((id) => state.byId.has(id)).length;
    el.savedCount.hidden = n === 0;
    el.savedCount.textContent = String(n);
  }

  // ---- Datum ----
  // Bewusst lokale Datumsteile statt toISOString() (das rechnet in UTC um
  // und springt nahe Mitternacht auf das falsche Datum).
  function iso(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function parseDate(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function addDays(d, n) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }
  // "Jetzt" als Wanduhrzeit der Instanz (instance.json "timezone"), nicht des
  // Geräts: die Termine gelten in der Zeitzone der Instanz, und Browser mit
  // Fingerprinting-Schutz (Firefox resistFingerprinting, LibreWolf, Tor)
  // melden UTC - dort wäre sonst bis 1 Uhr noch der Vortag "heute".
  // Liefert ein Date, dessen lokale Teile (getDate, getHours …) die Uhrzeit
  // der Instanz sind; ohne Intl-Unterstützung die Gerätezeit.
  const DEFAULT_TZ = "Europe/Berlin";
  const zoneFormats = new Map();
  function instanceTz() { return state.site.timezone || DEFAULT_TZ; }
  function zoneFormat(tz) {
    if (!zoneFormats.has(tz)) {
      let f = null;
      try {
        f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23",
          year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
      } catch (_) { /* unbekannte Zeitzone: Gerätezeit */ }
      zoneFormats.set(tz, f);
    }
    return zoneFormats.get(tz);
  }
  function instanceNow() {
    const now = new Date();
    const f = zoneFormat(instanceTz());
    if (!f) return now;
    const p = {};
    for (const part of f.formatToParts(now)) p[part.type] = Number(part.value);
    return new Date(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  }
  function todayISO() { return iso(instanceNow()); }

  // Zeitstatus eines Termins von heute: "running" (läuft gerade), "ended"
  // (heute schon vorbei) oder "" (später / anderer Tag). Ohne Endzeit
  // gilt ein Termin DEFAULT_DURATION Minuten lang als laufend; eine Endzeit
  // vor dem Beginn heißt "über Mitternacht" (läuft bis Tagesende).
  // Ganztägige Termine laufen den ganzen Tag.
  const DEFAULT_DURATION = 120;
  function minutes(hm) {
    const m = /^(\d{1,2}):(\d{2})/.exec(hm || "");
    return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  }
  function timeState(ev, now = instanceNow()) {
    if (ev.date !== iso(now)) return "";
    const start = minutes(ev.startTime);
    if (start === null) return "running";
    let end = minutes(ev.endTime);
    if (end === null) end = start + DEFAULT_DURATION;
    else if (end <= start) end = 24 * 60;
    const cur = now.getHours() * 60 + now.getMinutes();
    if (cur >= end) return "ended";
    if (cur >= start) return "running";
    return "";
  }

  function endMinutes(ev) {
    const start = minutes(ev.startTime);
    const end = minutes(ev.endTime);
    if (start === null) return 24 * 60;
    if (end === null) return start + DEFAULT_DURATION;
    return end <= start ? 24 * 60 : end;
  }

  // Lange Termine (#42): laufen gerade und enden später als der nächste
  // Termin, der nach ihnen beginnt. Beim Scrollen zur aktuellen Uhrzeit
  // lägen sie oberhalb, obwohl sie noch laufen - deshalb schweben sie mit
  // der Tagesüberschrift mit.
  function longRunning(evs, now = instanceNow()) {
    const startOf = (ev) => minutes(ev.startTime) ?? -1;
    return evs.filter((ev) => {
      if (ev.cancelled || timeState(ev, now) !== "running") return false;
      const next = evs
        .filter((n) => !n.cancelled && startOf(n) > startOf(ev))
        .reduce((a, n) => (!a || startOf(n) < startOf(a) ? n : a), null);
      return next !== null && endMinutes(ev) > endMinutes(next);
    });
  }

  function longStripHtml(evs) {
    return `<ul class="long-strip" aria-label="${STR.longRunning}">` + evs.map((ev) => {
      const time = !ev.startTime ? STR.allDay
        : ev.endTime ? `${escapeHtml(ev.startTime)}–${escapeHtml(ev.endTime)}` : escapeHtml(ev.startTime);
      const href = `#${encodeURIComponent(ev.id)}`;
      return `<li hidden data-card="${href}"><a class="long-strip__item" href="${href}">` +
        `<span class="long-strip__time">${time}</span>` +
        `<span class="long-strip__title">${escapeHtml(ev.title)}</span></a></li>`;
    }).join("") + `</ul>`;
  }

  // Ein Eintrag der Leiste erscheint erst, wenn seine Karte unter seinen
  // Platz in der Leiste gescrollt ist (#50). Die Karten liegen in derselben
  // Reihenfolge wie die Einträge, sichtbar ist also immer ein Anfangsstück -
  // deshalb gilt der Platz bei ganz ausgeklappter Leiste.
  function updateLongStrip() {
    el.groups.querySelectorAll(".day-sticky").forEach((sticky) => {
      const group = sticky.closest(".day-group");
      const items = [...sticky.querySelectorAll(".long-strip li")];
      items.forEach((li) => { li.hidden = false; });
      const slots = items.map((li) => li.getBoundingClientRect().bottom);
      items.forEach((li, i) => {
        const card = group.querySelector(`.event-card[href="${li.dataset.card}"]`);
        li.hidden = !card || card.getBoundingClientRect().bottom > slots[i];
      });
    });
  }

  function dayHeading(dateStr) {
    const d = parseDate(dateStr);
    const base = `${WEEKDAYS_SHORT[d.getDay()]} ${d.getDate()}. ${MONTHS_SHORT[d.getMonth()]}`;
    if (dateStr === todayISO()) return `${STR.today} · ${base}`;
    if (dateStr === iso(addDays(instanceNow(), 1))) return `${STR.tomorrow} · ${base}`;
    return base;
  }
  function longDate(dateStr) {
    const d = parseDate(dateStr);
    return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  // ---- Zeitraum (Datumsleiste) ----
  // Normalisiert ein Datum auf den Anfang seines Zeitraums: Tag = der Tag,
  // Wochenende = dessen Samstag (am Sonntag: der Samstag davor), 7 Tage = das Datum selbst.
  function periodStart(period, dateStr) {
    const d = parseDate(dateStr);
    const dow = d.getDay(); // 0 = So
    if (period === "wochenende") return iso(dow === 0 ? addDays(d, -1) : addDays(d, 6 - dow));
    // "woche" ist ein Zeitraum von 7 Tagen ab dem gewählten Datum, keine
    // Kalenderwoche Mo-So.
    if (period === "woche") return dateStr;
    return dateStr;
  }
  function periodLength(period) {
    return period === "woche" ? 7 : period === "wochenende" ? 2 : 1;
  }
  function periodStep(period) {
    return period === "tag" ? 1 : 7;
  }
  // Anfang des gewählten Zeitraums, nie vor dem Zeitraum von heute: ein
  // Anker aus einem alten Link oder von vor Mitternacht zählt als heute.
  function anchorDay() {
    const today = periodStart(state.period, todayISO());
    const a = periodStart(state.period, state.anchor || todayISO());
    return a < today ? today : a;
  }
  // [erster, letzter] Tag des aktuellen Zeitraums; nie vor heute beginnend
  // (der Kalender hat keine vergangenen Termine).
  function currentRange() {
    const today = todayISO();
    const start = anchorDay();
    const end = iso(addDays(parseDate(start), periodLength(state.period) - 1));
    return [start < today ? today : start, end];
  }
  function shortDate(dateStr, withWeekday) {
    const d = parseDate(dateStr);
    // Immer tt.mm. (zweistellig), damit die Beschriftung nicht springt.
    const pad = (n) => String(n).padStart(2, "0");
    return `${withWeekday ? WEEKDAYS_SHORT[d.getDay()] + " " : ""}${pad(d.getDate())}.${pad(d.getMonth() + 1)}.`;
  }
  function rangeLabel() {
    if (state.search) return STR.allDates;
    const start = anchorDay();
    const end = iso(addDays(parseDate(start), periodLength(state.period) - 1));
    if (state.period === "tag") {
      // Immer Wochentag + Datum (kein "Heute"/"Morgen"), damit die
      // Beschriftung beim Blättern nicht die Breite wechselt.
      const d = parseDate(start);
      return `${WEEKDAYS_SHORT[d.getDay()]}, ${shortDate(start)}`;
    }
    const visibleStart = currentRange()[0];
    if (visibleStart === end) return shortDate(end);
    // Immer tt.mm.–tt.mm.: gleich lang, egal ob der Zeitraum über einen
    // Monatswechsel geht; dass es ein Wochenende ist, zeigt der aktive
    // Zeitraum-Knopf.
    return `${shortDate(visibleStart)}–${shortDate(end)}`;
  }
  function timeText(ev) {
    if (!ev.startTime) return STR.allDay;
    return ev.endTime ? `${ev.startTime} – ${ev.endTime} Uhr` : `${ev.startTime} Uhr`;
  }
  function relativeTime(date) {
    const mins = Math.round((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `vor ${Math.max(mins, 1)} Min.`;
    const h = Math.round(mins / 60);
    if (h < 48) return `vor ${h} Std.`;
    return `am ${date.getDate()}. ${MONTHS_SHORT[date.getMonth()]}`;
  }

  // ---- Preis ----
  const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  function priceText(ev) {
    if (!ev.price) return "";
    if (ev.price.free) return STR.free;
    if (typeof ev.price.amount === "number") return euro.format(ev.price.amount);
    return "";
  }

  // ---- Laden ----
  function getJSON(path) {
    return fetch(path).then((res) => {
      if (!res.ok) throw new Error(`${path}: ${res.status}`);
      return res.json();
    });
  }

  Promise.allSettled([
    getJSON("data/events.json"),
    getJSON("data/categories.json"),
    getJSON("data/sources.json"),
    getJSON("data/site.json"),
    getJSON("data/places.json")
  ]).then(([events, cats, sources, site, places]) => {
    // Orte sind optional (Instanz ohne places.json: kein Reiter "Orte").
    if (places.status === "fulfilled" && (places.value.places || []).length) {
      state.placeTypes = places.value.types || [];
      state.places = places.value.places;
      state.placeById = new Map(state.places.map((p) => [p.id, p]));
      state.placeTypeIcons = new Map(state.placeTypes.map((t) => [t.name, t.icon]));
      el.navPlaces.hidden = false;
    }
    if (site.status === "fulfilled") state.site = site.value || {};
    if (sources.status === "fulfilled") {
      (sources.value.sources || []).forEach((s) => state.sources.set(s.name, s));
    }
    if (cats.status === "fulfilled") {
      state.categories = cats.value.categories || [];
      state.categoryIcons = new Map(state.categories.map((c) => [c.name, c.icon]));
      state.categoryGroup = new Map(state.categories.filter((c) => c.group).map((c) => [c.name, c.group]));
      state.groupMembers = new Map();
      for (const c of state.categories) {
        if (!c.group) continue;
        if (!state.groupMembers.has(c.group)) state.groupMembers.set(c.group, []);
        state.groupMembers.get(c.group).push(c);
      }
    } else {
      console.warn("categories.json fehlt, Kategorie-Menü bleibt leer", cats.reason);
    }

    if (events.status !== "fulfilled") {
      console.error(events.reason);
      showLoadError();
      return;
    }
    state.generatedAt = events.value.generatedAt ? new Date(events.value.generatedAt) : null;
    state.events = (events.value.events || [])
      .slice()
      .sort((a, b) => (a.date + (a.startTime || "")).localeCompare(b.date + (b.startTime || "")));
    state.byId = new Map(state.events.map((ev) => [ev.id, ev]));

    buildCategoryMenu();
    buildDateNav();
    buildQuickFilters();
    renderFooter();
    updateSavedCount();
    bindEvents();
    route();
    setInterval(refreshTimeStates, 60 * 1000);
    document.addEventListener("visibilitychange", refreshTimeStates);
  });

  function showLoadError() {
    el.empty.hidden = false;
    el.empty.innerHTML = `<strong>${escapeHtml(STR.loadError)}</strong>`;
  }

  // ---- Aufbau ----
  // Eine Werkzeugzeile statt mehrerer Filterzeilen:
  //   [‹] [Datum 📅] [›] … [gesetzte Filter] [Filter-Knopf]; der Zeitraum
  //   (Tag | Wochenende | 7 Tage) steht im Filter-Panel.
  // Der Filter-Knopf klappt ein Panel mit Kategorien und Merkmalen auf
  // (Chips mit Symbol und Text) - dort ist Platz für weitere Filter.
  // Gesetzte Filter erscheinen als kleine Symbole in der Zeile; Antippen
  // entfernt einen. Jede Gruppe im Panel hat ihr eigenes "zurücksetzen".
  function clearButton(row, label, cls) {
    return `<button type="button" class="${cls}" data-clear="${row}" hidden ` +
      `aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">${svg(ICON.clear)}</button>`;
  }
  function resetLink(row, label) {
    return `<button type="button" class="link-btn" data-clear="${row}" hidden>${escapeHtml(label)}</button>`;
  }

  function filterChip(kind, value, label, icon) {
    return `<button type="button" class="chip" data-${kind}="${escapeHtml(value)}" aria-pressed="false">` +
      `${svg(icon)}<span>${escapeHtml(label)}</span></button>`;
  }

  // Kategorie-Gruppen (categories.json "group"): Mitglieder stehen in einem
  // gemeinsamen Rahmen direkt hinter ihrer Oberkategorie. Die Oberkategorie
  // wählt die ganze Gruppe; eine Sparte bei aktiver Gruppe engt darauf ein.
  function buildCategoryMenu() {
    const members = state.groupMembers;
    el.categoryMenu.innerHTML = state.categories
      .filter((c) => !c.group || !state.categoryIcons.has(c.group))
      .map((c) => {
        const chip = filterChip("category", c.name, c.name, c.icon);
        const subs = members.get(c.name);
        if (!subs || !subs.length) return chip;
        return `<span class="chip-group" role="group" aria-label="${escapeHtml(c.name)}">${chip}` +
          subs.map((m) => filterChip("category", m.name, m.name, m.icon).replace('class="chip"', 'class="chip chip--sub"')).join("") +
          `</span>`;
      }).join("");
    $("catClearSlot").innerHTML = resetLink("categories", STR.reset);
    el.categoryMenu.closest(".fp-group").hidden = state.categories.length === 0;
  }

  // Kategorie an/aus mit Gruppen-Regeln: Oberkategorie an = ganze Gruppe
  // (Mitglieder einzeln werden dann überflüssig und entfernt); eine Sparte
  // antippen, während ihre Gruppe aktiv ist, engt auf diese Sparte ein.
  function toggleCategory(name) {
    const on = state.categoriesOn;
    const group = state.categoryGroup.get(name);
    if (group && on.has(group)) {
      on.delete(group);
      on.add(name);
      return;
    }
    toggleIn(on, name);
    if (on.has(name)) (state.groupMembers.get(name) || []).forEach((m) => on.delete(m.name));
  }

  function buildQuickFilters() {
    el.quickFilters.innerHTML = ATTRS.map((a) => filterChip("attr", a.key, a.label, a.icon)).join("");
    $("attrClearSlot").innerHTML = resetLink("quick", STR.reset);
    el.searchBar.insertAdjacentHTML("beforeend", clearButton("search", STR.clearSearch, "icon-btn search-clear"));
    el.searchClear = el.searchBar.querySelector("[data-clear]");
    el.searchClear.addEventListener("click", () => {
      clearRow("search");
      el.searchInput.focus();
    });
    syncFilterButtons();
  }

  // Werkzeugzeile. Das Datum öffnet die native Datumsauswahl des Browsers
  // (auf dem Handy das gewohnte Datumsrad).
  function buildDateNav() {
    $("periodMenu").innerHTML = PERIODS.map((p) => filterChip("period", p.key, p.label, p.icon)).join("");
    el.dateNav.innerHTML =
      `<button type="button" class="date-step" data-step="-1" aria-label="${STR.earlier}" title="${STR.earlier}">${svg(ICON.back)}</button>` +
      `<button type="button" class="date-step" data-today aria-label="${STR.backToToday}" title="${STR.backToToday}">${svg(ICON.calendarToday)}</button>` +
      `<label class="date-label" title="${STR.pickDate}"><span class="date-label__text" id="dateText"></span>${svg(ICON.calendar)}` +
      `<input type="date" class="date-input" id="dateInput" aria-label="${STR.pickDate}"></label>` +
      `<button type="button" class="date-step" data-step="1" aria-label="${STR.later}" title="${STR.later}">${svg(ICON.forward)}</button>` +
      `<span class="active-filters" id="activeFilters" aria-label="${STR.activeFilters}"></span>` +
      `<button type="button" class="filter-toggle" id="filterToggle" aria-expanded="false" aria-controls="filterPanel" ` +
      `aria-label="${STR.filters}" title="${STR.filters}">${svg(ICON.filter)}<span class="badge" id="filterCount" hidden></span></button>`;
    el.dateText = $("dateText");
    el.dateInput = $("dateInput");
    el.activeFilters = $("activeFilters");
    el.filterToggle = $("filterToggle");
    el.filterCount = $("filterCount");
  }

  function syncDateNav() {
    if (!el.dateText) return;
    const today = todayISO();
    const [start] = currentRange();
    el.dateText.textContent = rangeLabel();
    el.dateInput.min = today;
    el.dateInput.value = start;
    el.dateNav.classList.toggle("is-searching", Boolean(state.search));
    const prev = el.dateNav.querySelector('[data-step="-1"]');
    prev.disabled = Boolean(state.search) || start <= today;
    el.dateNav.querySelector("[data-today]").disabled = prev.disabled;
    el.dateNav.querySelector('[data-step="1"]').disabled = Boolean(state.search);
    $("periodMenu").querySelectorAll("[data-period]").forEach((b) => setPressed(b, b.dataset.period === state.period));
  }

  // Gesetzte Filter als kleine, entfernbare Symbole in der Werkzeugzeile.
  function syncActiveFilters() {
    if (!el.activeFilters) return;
    const items = [];
    state.categoriesOn.forEach((name) => {
      const icon = state.categoryIcons.get(name) || ICON.fallback;
      items.push(`<button type="button" class="active-filter" data-remove-category="${escapeHtml(name)}" ` +
        `title="${escapeHtml(name)} – ${STR.remove}" aria-label="${escapeHtml(name)} – ${STR.remove}">${svg(icon)}</button>`);
    });
    ATTRS.filter((a) => state.attrsOn.has(a.key)).forEach((a) => {
      items.push(`<button type="button" class="active-filter" data-remove-attr="${a.key}" ` +
        `title="${escapeHtml(a.label)} – ${STR.remove}" aria-label="${escapeHtml(a.label)} – ${STR.remove}">${svg(a.icon)}</button>`);
    });
    el.activeFilters.innerHTML = items.join("");
    const n = items.length;
    el.filterCount.hidden = n === 0;
    el.filterCount.textContent = String(n);
    el.filterToggle.classList.toggle("has-filters", n > 0);
  }

  function toggleFilterPanel(open) {
    const panel = $("filterPanel");
    const show = open === undefined ? panel.hidden : open;
    panel.hidden = !show;
    el.filterToggle.setAttribute("aria-expanded", String(show));
    el.filterToggle.classList.toggle("is-active", show);
    measureSticky();
  }

  // Setzt Zeitraum/Datum und schreibt es in die Adresse (teilbar), ohne
  // für jeden Pfeil-Klick einen Verlaufseintrag anzulegen.
  function setRange(period, anchor) {
    const today = todayISO();
    state.period = period;
    let a = periodStart(period, anchor || today);
    if (a < periodStart(period, today)) a = periodStart(period, today);
    const isDefault = period === "tag" && a === today;
    // Heute als "" merken, nicht als festes Datum: sonst bleibt nach
    // Mitternacht der Vortag als "heute" stehen.
    state.anchor = isDefault ? "" : a;
    history.replaceState(null, "", isDefault ? location.pathname + location.search : `#${period}/${a}`);
    syncDateNav();
    renderList();
    scrollToNow();
  }

  function syncFilterButtons() {
    el.categoryMenu.querySelectorAll("[data-category]").forEach((b) => {
      const name = b.dataset.category;
      const implied = !state.categoriesOn.has(name) && state.categoriesOn.has(state.categoryGroup.get(name));
      setPressed(b, state.categoriesOn.has(name) || implied);
      b.classList.toggle("is-implied", implied);
    });
    el.quickFilters.querySelectorAll("[data-attr]").forEach((b) => setPressed(b, state.attrsOn.has(b.dataset.attr)));
    const catClear = $("catClearSlot").querySelector("[data-clear]");
    if (catClear) catClear.hidden = state.categoriesOn.size === 0;
    const quickClear = $("attrClearSlot").querySelector("[data-clear]");
    if (quickClear) quickClear.hidden = state.attrsOn.size === 0;
    if (el.searchClear) el.searchClear.hidden = !state.search;
    syncActiveFilters();
    syncDateNav();
  }

  function clearRow(row) {
    if (row === "categories") state.categoriesOn.clear();
    if (row === "quick") state.attrsOn.clear();
    if (row === "search") {
      state.search = "";
      el.searchInput.value = "";
    }
    afterFilterChange();
  }
  function setPressed(btn, on) {
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", String(on));
  }

  function renderFooter() {
    const s = state.site;
    const links = [];
    if (s.imprintUrl) links.push(siteLink(s.imprintUrl, STR.imprint));
    if (s.privacyUrl) links.push(siteLink(s.privacyUrl, STR.privacy));
    links.push(`<a href="#ueber">${STR.about}</a>`);
    links.push(`<a href="#einstellungen">${STR.settings}</a>`);
    el.footer.innerHTML = links.join("");
  }

  // ---- Farbschema ----
  // Ohne eigene Wahl folgt die Seite dem System. Der Schalter ist eine
  // Abkürzung für die Einstellung "Farbschema" (settings.js setzt
  // data-theme auf <html>); entspricht die Wahl dem System, wird "system"
  // gespeichert, damit die Seite wieder automatisch mitwechselt.
  const darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function isDark() {
    const t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : !!(darkQuery && darkQuery.matches);
  }
  function syncThemeToggle() {
    const btn = $("themeToggle");
    if (!btn) return;
    const dark = isDark();
    btn.classList.toggle("is-dark", dark);
    btn.setAttribute("aria-pressed", String(dark));
    btn.title = dark ? STR.themeLight : STR.themeDark;
  }
  function toggleTheme() {
    const next = isDark() ? "light" : "dark";
    const system = darkQuery && darkQuery.matches ? "dark" : "light";
    SETTINGS.set("theme", next === system ? "system" : next);
    syncThemeToggle();
  }

  // ---- Suchvorschläge ----
  // Beim Tippen (ab 2 Zeichen) schlägt die Suche passende Orte, Typen und
  // Termine vor, mit Anzahl der kommenden Termine. Orte umfassen auch die
  // einzelnen Wörter der Ortsnamen ("KINO Brotfabrik" -> "Kino",
  // "Brotfabrik"), damit man nach Haus oder Art eines Raums suchen kann.
  // Ort/Name übernehmen den Text in die Suche, ein Typ setzt den
  // Kategorie-Filter. Bedienung als Combobox: Pfeile, Enter, Escape.
  const SUGGEST = [
    { key: "place", label: STR.suggestPlace, icon: ICON.pin, max: 4 },
    { key: "type", label: STR.suggestType, icon: ICON.fallback, max: 2 },
    { key: "name", label: STR.suggestName, icon: ICON.calendar, max: 4 }
  ];
  let suggestItems = [];
  let suggestActive = -1;

  // Vergleichsform: klein, ohne Akzente, ß = ss ("Weißensee" ~ "weissensee").
  function fold(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
  }
  // "KINO" -> "Kino": Versalien aus Ortsnamen lesbar machen.
  function niceWord(w) {
    return w.length > 3 && w === w.toUpperCase() ? w[0] + w.slice(1).toLowerCase() : w;
  }

  function buildSuggestions(query) {
    const q = fold(query.trim());
    if (q.length < 2) return [];
    const today = todayISO();
    const pools = { place: new Map(), type: new Map(), name: new Map() };
    const add = (pool, label) => {
      if (!label) return;
      const key = fold(label);
      const hit = pool.get(key);
      if (hit) hit.count++;
      else pool.set(key, { key, label, count: 1 });
    };
    for (const ev of state.events) {
      if (ev.date < today) continue;
      const place = ev.location && ev.location.name;
      add(pools.place, place);
      if (place) {
        // Einzelwörter nur, wenn der Name aus mehreren besteht.
        const words = [...new Set(place.split(/[\s,/–-]+/).filter((w) => w.length >= 4))];
        if (words.length > 1) words.forEach((w) => add(pools.place, niceWord(w)));
      }
      add(pools.type, ev.category);
      add(pools.name, ev.title);
    }
    const rank = (e) => (e.key.startsWith(q) ? 0 : e.key.includes(" " + q) ? 1 : 2);
    const out = [];
    for (const t of SUGGEST) {
      [...pools[t.key].values()]
        .filter((e) => e.key.includes(q))
        .sort((a, b) => rank(a) - rank(b) || b.count - a.count || a.label.localeCompare(b.label, "de"))
        .slice(0, t.max)
        .forEach((e) => out.push({ type: t.key, label: e.label, count: e.count }));
    }
    return out;
  }

  function highlight(label, query) {
    const i = label.toLowerCase().indexOf(query.trim().toLowerCase());
    if (i < 0 || !query.trim()) return escapeHtml(label);
    const j = i + query.trim().length;
    return escapeHtml(label.slice(0, i)) + "<mark>" + escapeHtml(label.slice(i, j)) + "</mark>" + escapeHtml(label.slice(j));
  }

  function renderSuggestions() {
    const list = $("searchSuggest");
    if (!list) return;
    const open = suggestItems.length > 0 && document.activeElement === el.searchInput;
    list.hidden = !open;
    el.searchInput.setAttribute("aria-expanded", String(open));
    if (!open) {
      el.searchInput.removeAttribute("aria-activedescendant");
      return;
    }
    const typeOf = Object.fromEntries(SUGGEST.map((t) => [t.key, t]));
    list.innerHTML = suggestItems.map((s, i) =>
      `<li class="sg-item${i === suggestActive ? " is-active" : ""}" id="sg-${i}" role="option" data-i="${i}" aria-selected="${i === suggestActive}">` +
      svg(typeOf[s.type].icon) +
      `<span class="sg-label">${highlight(s.label, el.searchInput.value)}</span>` +
      `<span class="sg-type">${typeOf[s.type].label}</span>` +
      `<span class="sg-count" aria-label="${s.count} ${s.count === 1 ? STR.suggestEventOne : STR.suggestEventMany}">${s.count}</span></li>`
    ).join("");
    if (suggestActive >= 0) el.searchInput.setAttribute("aria-activedescendant", `sg-${suggestActive}`);
    else el.searchInput.removeAttribute("aria-activedescendant");
  }

  function updateSuggestions() {
    suggestItems = buildSuggestions(el.searchInput.value);
    suggestActive = -1;
    renderSuggestions();
  }

  function closeSuggestions() {
    suggestItems = [];
    suggestActive = -1;
    renderSuggestions();
  }

  function applySuggestion(s) {
    if (s.type === "type") {
      // Typ = Kategorie: als Filter setzen, Suchtext leeren.
      state.categoriesOn.add(s.label);
      state.search = "";
      el.searchInput.value = "";
      if (el.searchClear) el.searchClear.hidden = true;
      closeSuggestions();
      syncDateNav();
      afterFilterChange();
      return;
    }
    el.searchInput.value = s.label;
    state.search = s.label.toLowerCase();
    if (el.searchClear) el.searchClear.hidden = false;
    closeSuggestions();
    syncDateNav();
    renderList();
  }

  function bindSuggestions() {
    const list = $("searchSuggest");
    if (!list) return;
    // mousedown statt click: sonst verliert das Feld vorher den Fokus und
    // die Liste schließt sich, bevor der Klick ankommt.
    list.addEventListener("mousedown", (e) => {
      const li = e.target.closest("[data-i]");
      if (!li) return;
      e.preventDefault();
      applySuggestion(suggestItems[Number(li.dataset.i)]);
    });
    el.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!suggestItems.length) { updateSuggestions(); return; }
        e.preventDefault();
        const n = suggestItems.length;
        suggestActive = e.key === "ArrowDown" ? (suggestActive + 1) % n : (suggestActive - 1 + n) % n;
        renderSuggestions();
        const act = $(`sg-${suggestActive}`);
        if (act) act.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        if (suggestActive >= 0 && suggestItems[suggestActive]) {
          e.preventDefault();
          applySuggestion(suggestItems[suggestActive]);
        } else {
          closeSuggestions();
        }
      } else if (e.key === "Escape" && suggestItems.length) {
        e.stopPropagation();
        closeSuggestions();
      }
    });
    el.searchInput.addEventListener("focus", updateSuggestions);
    el.searchInput.addEventListener("blur", () => setTimeout(closeSuggestions, 100));
  }

  // ---- Interaktion ----
  function bindEvents() {
    const themeBtn = $("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
    if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener("change", syncThemeToggle);
    syncThemeToggle();
    bindSettings();

    el.searchToggle.addEventListener("click", () => {
      const open = el.searchBar.hidden;
      el.searchBar.hidden = !open;
      el.searchToggle.setAttribute("aria-expanded", String(open));
      if (open) {
        if (state.view !== "list" && state.view !== "saved") location.hash = "";
        el.searchInput.focus();
      } else if (state.search) {
        state.search = "";
        el.searchInput.value = "";
        renderList();
      }
      measureSticky();
    });
    el.searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.trim().toLowerCase();
      if (el.searchClear) el.searchClear.hidden = !state.search;
      syncDateNav();
      renderList();
      updateSuggestions();
    });
    bindSuggestions();

    el.dateNav.addEventListener("click", (e) => {
      if (e.target.closest("#filterToggle")) { toggleFilterPanel(); return; }
      const rmCat = e.target.closest("[data-remove-category]");
      if (rmCat) { state.categoriesOn.delete(rmCat.dataset.removeCategory); afterFilterChange(); return; }
      const rmAttr = e.target.closest("[data-remove-attr]");
      if (rmAttr) { state.attrsOn.delete(rmAttr.dataset.removeAttr); afterFilterChange(); return; }
      const toToday = e.target.closest("[data-today]");
      if (toToday && !toToday.disabled) { setRange(state.period, todayISO()); return; }
      const step = e.target.closest("[data-step]");
      if (step && !step.disabled) { stepRange(Number(step.dataset.step)); return; }
    });
    // Klick aufs Datum öffnet den Picker (showPicker, wo vorhanden; sonst
    // reicht der Klick auf das darüberliegende, unsichtbare Datumsfeld).
    el.dateNav.querySelector(".date-label").addEventListener("click", (e) => {
      if (state.search) { e.preventDefault(); return; }
      if (el.dateInput.showPicker) {
        e.preventDefault();
        try { el.dateInput.showPicker(); } catch (_) { el.dateInput.focus(); }
      }
    });
    el.dateInput.addEventListener("change", () => {
      if (el.dateInput.value) setRange(state.period, el.dateInput.value);
    });

    // Filter-Panel: Chips an/aus, "zurücksetzen" je Gruppe.
    $("filterPanel").addEventListener("click", (e) => {
      const clear = e.target.closest("[data-clear]");
      if (clear) { clearRow(clear.dataset.clear); return; }
      const b = e.target.closest(".chip");
      if (!b) return;
      if (b.dataset.period) { setRange(b.dataset.period, currentRange()[0]); return; }
      if (b.dataset.category) toggleCategory(b.dataset.category);
      if (b.dataset.attr) toggleIn(state.attrsOn, b.dataset.attr);
      afterFilterChange(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("filterPanel").hidden) toggleFilterPanel(false);
      // Pfeiltasten blättern wie das Wischen: in der Detailansicht durch die
      // Termine, in der Liste durch die Zeiträume. Nicht in Eingabefeldern
      // und nicht in waagerecht scrollbaren Bereichen (Kategorie-Menü).
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") &&
          !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey &&
          !(e.target instanceof Element &&
            (e.target.closest("input, textarea, select, [contenteditable]") || inHorizontalScroller(e.target, document.body)))) {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        if (state.view === "detail") { e.preventDefault(); showNeighbour(dir); }
        else if (state.view === "list" && canStepRange(dir)) { e.preventDefault(); slideRange(dir); }
      }
    });
    bindSwipe(el.viewDetail, {
      active: () => state.view === "detail" && state.byId.has(state.detailId),
      canGo: (dir) => {
        const n = detailNeighbours(state.byId.get(state.detailId));
        return Boolean(dir > 0 ? n.next : n.prev);
      },
      go: showNeighbour
    });
    bindSwipe(el.viewList, {
      active: () => state.view === "list",
      canGo: canStepRange,
      go: slideRange
    });
    bindZoomState();

    // Klick auf eine Karte merkt sich, dass "Zurück" in die Liste führt
    // (dann history.back() statt Hash-Sprung, damit die Scrollposition bleibt).
    el.groups.addEventListener("click", (e) => {
      const star = e.target.closest("[data-star]");
      if (star) {
        // Nur den Knopf umschalten, nicht neu rendern: in "Gemerkt"
        // verschwindet die Karte so nicht unterm Finger (versehentliches
        // Antippen bleibt umkehrbar), beim nächsten Aufbau ist sie weg.
        const id = star.dataset.star;
        toggleSaved(id);
        const on = saved.has(id);
        star.classList.toggle("is-active", on);
        star.setAttribute("aria-pressed", String(on));
        const ev = state.byId.get(id);
        star.setAttribute("aria-label", `${on ? STR.unsave : STR.save}${ev ? ": " + ev.title : ""}`);
        star.title = on ? STR.unsave : STR.save;
        return;
      }
      if (e.target.closest(".event-card")) state.cameFromList = true;
    });

    // "Termine" in der unteren Leiste: wie beim Aufruf der Seite zurück auf
    // heute und zur aktuellen Uhrzeit - auch aus der Detailansicht und auch,
    // wenn die Liste schon offen ist.
    document.querySelector('.bottom-nav__item[data-view="list"]').addEventListener("click", (e) => {
      e.preventDefault();
      state.period = "tag";
      state.anchor = "";
      if (location.hash) history.pushState(null, "", location.pathname + location.search);
      route();
      scrollToNow();
    });

    window.addEventListener("hashchange", route);
    let t = null;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => { updateColumns(); measureSticky(); updateLongStrip(); }, 120); });
    let stripFrame = 0;
    window.addEventListener("scroll", () => {
      if (stripFrame) return;
      stripFrame = requestAnimationFrame(() => { stripFrame = 0; updateLongStrip(); });
    }, { passive: true });
  }

  function toggleIn(set, v) { if (set.has(v)) set.delete(v); else set.add(v); }
  function afterFilterChange(scrollTop = true) {
    syncFilterButtons();
    renderList();
    if (scrollTop) scrollToNow();
  }
  function resetFilters() {
    state.search = "";
    el.searchInput.value = "";
    state.categoriesOn.clear();
    state.attrsOn.clear();
    afterFilterChange();
  }

  // ---- Routing ----
  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    let view = "list";
    // Zeitraum in der Adresse: #tag/2026-11-22, #wochenende/…, #woche/…
    const rangeMatch = hash.match(/^(tag|wochenende|woche)\/(\d{4}-\d{2}-\d{2})$/);
    if (rangeMatch) {
      state.period = rangeMatch[1];
      state.anchor = periodStart(rangeMatch[1], rangeMatch[2]);
    }
    // Ohne Hash (Startseite, Zurück aus der Detailansicht) bleibt der
    // zuletzt gewählte Zeitraum.
    if (rangeMatch || hash === "") view = "list";
    else if (hash === "gemerkt") view = "saved";
    else if (hash === "ueber") view = "about";
    else if (hash === "einstellungen") view = "settings";
    else if (hash === "orte" && state.places.length) view = "places";
    else if (hash.startsWith("ort/") && state.placeById.has(hash.slice(4))) view = "place";
    else if (hash && state.byId.has(hash)) view = "detail";

    const fromView = state.view;
    state.view = view;
    if (view === "place") state.placeId = hash.slice(4);
    // Wischen in der Detailansicht blättert durch die Termine der Ansicht,
    // aus der der Termin geöffnet wurde (siehe detailSequence).
    if (view === "detail" && fromView !== "detail") state.detailFrom = fromView;
    el.viewList.hidden = !(view === "list" || view === "saved");
    el.viewDetail.hidden = view !== "detail";
    el.viewAbout.hidden = view !== "about";
    el.viewSettings.hidden = view !== "settings";
    el.viewPlaces.hidden = view !== "places";
    el.viewPlace.hidden = view !== "place";
    const filtersVisible = view === "list";
    el.toolbar.hidden = !filtersVisible;
    if (!filtersVisible) toggleFilterPanel(false);
    syncDateNav();
    const navView = view === "detail" ? "list" : view === "place" ? "places" : view === "settings" ? "about" : view;
    el.navItems.forEach((a) => a.classList.toggle("is-active", a.dataset.view === navView));

    if (view === "list" || view === "saved") {
      renderList();
      if (fromView !== "detail") scrollToNow();
    } else if (view === "detail") {
      renderDetail(state.byId.get(hash));
      window.scrollTo({ top: 0 });
    } else if (view === "places") {
      renderPlaces();
      if (fromView !== "place") window.scrollTo({ top: 0 });
    } else if (view === "place") {
      renderPlace(state.placeById.get(hash.slice(4)));
      window.scrollTo({ top: 0 });
    } else if (view === "settings") {
      renderSettings();
      window.scrollTo({ top: 0 });
    } else {
      renderAbout();
      window.scrollTo({ top: 0 });
    }
    if (view !== "detail") state.cameFromList = false;
    measureSticky();
  }

  // Sticky-Abstände an die tatsächlich gerenderten Höhen anpassen (Header
  // mit/ohne Suche, ein- oder mehrzeiliges Kategorie-Menü).
  // ---- Spalten ----
  // Mehrere Tage nebeneinander, so viele, wie bei mindestens COLUMN_MIN px
  // je Spalte in die Breite passen - höchstens so viele, wie Tage angezeigt
  // werden (Tablet hoch: Wochenende, quer/Desktop: mehr von der Woche).
  // Weitere Tage fließen in die nächste Reihe. Gescrollt wird die ganze
  // Seite; im Spaltenmodus wird sie breiter (bis WIDE_MAX) und die Karten
  // kompakt (Zeit, "Läuft", Kategorie in einer Zeile über dem Titel).
  const COLUMN_MIN = 260;
  const COLUMN_GAP = 16;
  const WIDE_MAX = 1960;
  let shownDays = 1;
  function updateColumns(days = shownDays) {
    shownDays = days;
    const avail = Math.min(document.documentElement.clientWidth, WIDE_MAX) - 2 * COLUMN_GAP;
    const fit = Math.floor((avail + COLUMN_GAP) / (COLUMN_MIN + COLUMN_GAP));
    const cols = Math.max(1, Math.min(days, fit));
    const multi = cols > 1;
    document.body.classList.toggle("is-wide", multi);
    el.groups.classList.toggle("is-columns", multi);
    el.groups.style.setProperty("--cols", String(cols));
  }

  function measureSticky() {
    const root = document.documentElement.style;
    root.setProperty("--hdr", `${el.header.offsetHeight}px`);
    root.setProperty("--tb", `${el.toolbar.hidden ? 0 : el.toolbar.offsetHeight}px`);
  }

  // Scrollt zur aktuellen Uhrzeit: zum ersten Termin, der jetzt oder später
  // beginnt. Alles, was heute schon begonnen hat (auch laufende und
  // ganztägige Termine, data-start -1), liegt oberhalb. Beginnt heute nichts
  // mehr, ist es der erste Termin eines späteren Tages. Steht davor nichts,
  // bleibt die Liste oben.
  function scrollToNow() {
    const cards = [...el.groups.querySelectorAll(".event-card")];
    const now = instanceNow();
    const cur = now.getHours() * 60 + now.getMinutes();
    const target = cards.find((c) => !("start" in c.dataset) || Number(c.dataset.start) >= cur);
    if (!target || target === cards[0]) { window.scrollTo({ top: 0 }); return; }
    measureSticky();
    const li = target.closest("li");
    const group = target.closest(".day-group");
    const firstInGroup = group.querySelector("li") === li;
    const stuck = el.header.offsetHeight + (el.toolbar.hidden ? 0 : el.toolbar.offsetHeight);
    const heading = group.querySelector(".day-sticky") || group.querySelector(".day-heading");
    const anchor = firstInGroup ? group : li;
    // Platz für die Einträge, deren Karten nach dem Scrollen oberhalb liegen.
    let strip = 0;
    const stripList = firstInGroup ? null : group.querySelector(".long-strip");
    if (stripList) {
      stripList.querySelectorAll("li").forEach((item) => {
        const card = group.querySelector(`.event-card[href="${item.dataset.card}"]`);
        item.hidden = !card || !(card.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
      });
      strip = stripList.offsetHeight;
    }
    const offset = stuck + (firstInGroup ? 0 : heading.offsetHeight + strip) + 8;
    window.scrollTo({ top: Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - offset) });
    updateLongStrip();
  }

  // Zeitstatus der Karten jede Minute auffrischen (ohne zu scrollen).
  // Läuft die Seite über Mitternacht, folgt auch die Datumsleiste dem neuen
  // Tag (Beschriftung, frühestes Datum, Zurück-Knopf) - unabhängig davon,
  // wann die Instanz zuletzt gebaut wurde.
  let shownDay = todayISO();
  function refreshTimeStates() {
    const today = todayISO();
    if (today !== shownDay) {
      shownDay = today;
      syncDateNav();
    }
    if ((state.view === "list" || state.view === "saved") && !document.hidden) renderList();
  }

  // ---- Liste ----
  // ignoreRange: für die Suche nach dem nächsten Termin außerhalb des
  // gewählten Zeitraums (Leerzustand).
  function filteredEvents(ignoreRange) {
    const today = todayISO();
    const savedOnly = state.view === "saved";
    // Die Suche gilt über alle Daten hinweg, nicht nur im Zeitraum.
    const [from, to] = ignoreRange || state.search ? [today, "9999-12-31"] : currentRange();

    return state.events.filter((ev) => {
      if (ev.date < today) return false;
      if (savedOnly) return saved.has(ev.id);
      if (ev.date < from || ev.date > to) return false;
      if (state.categoriesOn.size && !state.categoriesOn.has(ev.category) &&
          !state.categoriesOn.has(state.categoryGroup.get(ev.category))) return false;
      for (const a of ATTRS) {
        if (state.attrsOn.has(a.key) && !a.test(ev)) return false;
      }
      if (state.search) {
        const hay = [ev.title, ev.description, ev.category, ev.organizer, ev.location && ev.location.name]
          .filter(Boolean).join(" ");
        // Ohne Akzente, ß = ss: "weissensee" findet "Weißensee".
        if (!fold(hay).includes(fold(state.search))) return false;
      }
      return true;
    });
  }

  function hasActiveFilters() {
    return state.search || state.categoriesOn.size || state.attrsOn.size;
  }

  function renderList() {
    if (state.view !== "list" && state.view !== "saved") return;
    const results = filteredEvents();
    const savedView = state.view === "saved";

    const cancelledCount = results.filter((ev) => ev.cancelled).length;
    el.resultCount.textContent = (savedView ? `${STR.savedHeading} · ` : "") +
      (results.length === 1 ? STR.resultOne : STR.resultMany(results.length)) +
      (cancelledCount ? STR.resultCancelled(cancelledCount) : "");
    el.resultCount.hidden = results.length === 0;

    const groups = new Map();
    results.forEach((ev) => {
      if (!groups.has(ev.date)) groups.set(ev.date, []);
      groups.get(ev.date).push(ev);
    });
    const today = todayISO();
    el.groups.innerHTML = [...groups].map(([date, evs]) => {
      const heading = `<h2 class="day-heading">${escapeHtml(dayHeading(date))}</h2>`;
      const long = date === today ? longRunning(evs) : [];
      return `<section class="day-group" aria-label="${escapeHtml(longDate(date))}">` +
        (long.length ? `<div class="day-sticky">${heading}${longStripHtml(long)}</div>` : heading) +
        `<ul class="event-list">${evs.map(cardHtml).join("")}</ul></section>`;
    }).join("");
    updateColumns(groups.size || 1);
    updateLongStrip();

    // "Zurück zu heute", wenn ein anderer Zeitraum gewählt ist.
    if (!savedView && !state.search && currentRange()[0] > todayISO()) {
      el.resultCount.hidden = false;
      el.resultCount.insertAdjacentHTML("beforeend",
        ` · <button type="button" class="link-btn" id="backToToday">${STR.backToToday}</button>`);
      $("backToToday").addEventListener("click", () => setRange(state.period, todayISO()));
    }

    el.empty.hidden = results.length > 0;
    if (results.length === 0) {
      let msg = STR.emptyNoData;
      let action = "";
      if (savedView) {
        msg = STR.emptySaved;
      } else if (!state.search) {
        // Leerer Zeitraum: zum nächsten Tag mit passenden Terminen springen.
        const [, to] = currentRange();
        const next = filteredEvents(true).find((ev) => ev.date > to);
        if (next) {
          msg = STR.emptyRange;
          action = `<br><button type="button" class="btn" id="emptyNext">${STR.nextEvent} ${escapeHtml(dayHeading(next.date))}</button>`;
        } else if (hasActiveFilters()) {
          msg = STR.emptyFiltered;
        }
      } else {
        msg = STR.emptyFiltered;
      }
      if (!action && !savedView && hasActiveFilters()) {
        action = `<br><button type="button" class="btn" id="emptyReset">${STR.resetFilters}</button>`;
      }
      el.empty.innerHTML = `<strong>${escapeHtml(msg[0])}</strong>${msg[1] ? `<span>${escapeHtml(msg[1])}</span>` : ""}` + action;
      const reset = $("emptyReset");
      if (reset) reset.addEventListener("click", resetFilters);
      const nextBtn = $("emptyNext");
      if (nextBtn) {
        const [, to] = currentRange();
        const next = filteredEvents(true).find((ev) => ev.date > to);
        nextBtn.addEventListener("click", () => setRange(state.period, next.date));
      }
    }
  }

  function categoryLabelHtml(cat) {
    if (!cat) return "";
    return `<span class="category-label">${svg(state.categoryIcons.get(cat) || ICON.fallback)}${escapeHtml(cat)}</span>`;
  }

  function cardHtml(ev) {
    const time = ev.startTime
      ? `${escapeHtml(ev.startTime)}${ev.endTime ? `<small>– ${escapeHtml(ev.endTime)}</small>` : ""}`
      : `<small>${STR.allDay}</small>`;
    const meta = [];
    if (ev.location && ev.location.name) meta.push(`<span>${svg(ICON.pin)} ${escapeHtml(ev.location.name)}</span>`);
    const price = priceText(ev);
    if (price) meta.push(`<span>${escapeHtml(price)}</span>`);
    const attrIcons = ATTRS.filter((a) => a.key !== "free" && a.test(ev))
      .map((a) => `<span title="${escapeHtml(a.label)}" aria-label="${escapeHtml(a.label)}">${svg(a.icon)}</span>`).join("");
    if (attrIcons) meta.push(attrIcons);

    // Abgesagte Termine bleiben in der Liste (wer hingehen wollte, soll es
    // erfahren), sind aber deutlich gekennzeichnet: Etikett + durchgestrichener
    // Titel + gedämpfte Karte. Das Etikett ist Text, nicht nur Farbe.
    const cancelled = ev.cancelled
      ? `<span class="cancelled-badge">${STR.cancelled}</span>`
      : "";
    // Abgesagt schlägt den Zeitstatus: keine "Läuft"-/"Beendet"-Färbung und
    // kein Etikett.
    const ts = ev.cancelled ? "" : timeState(ev);
    const tsBadge = ts === "running"
      ? `<span class="running-badge">${STR.running}</span>`
      : ts === "ended" ? `<span class="sr-only">${STR.ended}: </span>` : "";
    const isSaved = saved.has(ev.id);
    const start = ev.date === todayISO() ? ` data-start="${minutes(ev.startTime) ?? -1}"` : "";
    return `<li class="event-item"><a class="event-card${ev.cancelled ? " event-card--cancelled" : ""}${ts ? ` event-card--${ts}` : ""}"${start} href="#${encodeURIComponent(ev.id)}">` +
      `<div class="event-card__time">${time}</div>` +
      `<div class="event-card__body">${tsBadge}${cancelled}${categoryLabelHtml(ev.category)}` +
      `<h3 class="event-card__title">${escapeHtml(ev.title)}</h3>` +
      `<p class="event-card__meta">${meta.join("")}</p></div>` +
      `</a>` +
      // Merken direkt aus der Liste: eigener Knopf neben (nicht im) Link.
      `<button type="button" class="card-star${isSaved ? " is-active" : ""}" data-star="${escapeHtml(ev.id)}" ` +
      `aria-pressed="${isSaved}" aria-label="${isSaved ? STR.unsave : STR.save}: ${escapeHtml(ev.title)}" ` +
      `title="${isSaved ? STR.unsave : STR.save}">${svg(ICON.star)}</button></li>`;
  }

  // ---- Detail ----
  // ---- Orte ----
  // Gepflegte Orte der Instanz (data/places.json): Sehenswürdigkeiten,
  // Parks, Spielstätten … ohne Datum. build-site resolves each event's place
  // (reference from the source, else the match terms) into ev.placeId.
  function placeForEvent(ev) {
    return (ev.placeId && state.places.find((p) => p.id === ev.placeId)) || null;
  }
  function upcomingAt(place) {
    const today = todayISO();
    return state.events.filter((ev) => ev.date >= today && ev.placeId === place.id);
  }
  function placeMapUrl(p) {
    if (p.lat || p.lon) return `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=17/${p.lat}/${p.lon}`;
    return `https://www.openstreetmap.org/search?query=${encodeURIComponent(p.address || p.name)}`;
  }
  // Platzhalter für den Kartenausschnitt (js/map.js lädt erst auf Klick).
  function mapSnippetHtml(lat, lon, label) {
    if (!isFinite(lat) || !isFinite(lon) || (!lat && !lon)) return "";
    return `<div class="map-snippet" data-lat="${lat}" data-lon="${lon}" data-label="${escapeHtml(label || "")}" hidden></div>`;
  }
  function mountMaps(root) {
    if (window.openLitfassMap) window.openLitfassMap.mountAll(root);
    if (window.openLitfassImage) window.openLitfassImage.mountAll(root);
  }
  // Bild von der Quelle (js/image.js lädt es je nach Einstellung).
  function imageHtml(ev) {
    if (!ev.image || !/^https:\/\//i.test(ev.image)) return "";
    return `<figure class="event-image" data-src="${escapeHtml(ev.image)}" data-alt="${escapeHtml(STR.imageAlt(ev.title))}" hidden></figure>`;
  }
  function placeTypeLabel(type) {
    return `<span class="category-label">${svg(state.placeTypeIcons.get(type) || ICON.pin)}${escapeHtml(type)}</span>`;
  }

  function renderPlaces() {
    const types = state.placeTypes.filter((t) => state.places.some((p) => p.type === t.name));
    if (state.placeType && !types.some((t) => t.name === state.placeType)) state.placeType = "";
    const chips = [`<button type="button" class="chip" data-place-type="" aria-pressed="${!state.placeType}">${svg(ICON.pin)}<span>${STR.allPlaces}</span></button>`]
      .concat(types.map((t) => `<button type="button" class="chip" data-place-type="${escapeHtml(t.name)}" aria-pressed="${state.placeType === t.name}">` +
        `${svg(t.icon)}<span>${escapeHtml(t.name)}</span></button>`));
    const shown = types.filter((t) => !state.placeType || t.name === state.placeType);
    const groups = shown.map((t) => {
      const list = state.places.filter((p) => p.type === t.name);
      return `<section class="place-group"><h2 class="day-heading">${escapeHtml(t.name)}</h2><ul class="place-list">` +
        list.map((p) => {
          const n = upcomingAt(p).length;
          return `<li><a class="event-card place-card" href="#ort/${encodeURIComponent(p.id)}">` +
            `<div class="event-card__body">${placeTypeLabel(p.type)}` +
            `<h3 class="event-card__title">${escapeHtml(p.name)}</h3>` +
            `<p class="event-card__meta">${p.address ? `<span>${svg(ICON.pin)} ${escapeHtml(p.address)}</span>` : ""}` +
            `${n ? `<span class="place-count">${n} ${n === 1 ? STR.suggestEventOne : STR.suggestEventMany}</span>` : ""}</p>` +
            `</div></a></li>`;
        }).join("") + `</ul></section>`;
    }).join("");
    el.viewPlaces.innerHTML =
      `<h1 class="sr-only" id="placesHeading">${STR.placesHeading}</h1>` +
      `<div class="fp-chips place-types" role="group" aria-label="${STR.placesHeading}">${chips.join("")}</div>` +
      groups;
    el.viewPlaces.querySelectorAll(".place-card").forEach((a) => a.addEventListener("click", () => { state.cameFromPlaces = true; }));
    el.viewPlaces.querySelectorAll("[data-place-type]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("aria-pressed") === "true");
      b.addEventListener("click", () => { state.placeType = b.dataset.placeType; renderPlaces(); });
    });
  }

  function renderPlace(p) {
    const facts = [];
    if (p.address) facts.push(fact(ICON.pin, `${escapeHtml(p.address)}<small>${extLink(placeMapUrl(p), STR.openMap)}</small>`));
    else facts.push(fact(ICON.pin, extLink(placeMapUrl(p), STR.openMap)));
    if (p.openingHours) facts.push(fact(ICON.clock, `${STR.openingHours}: ${escapeHtml(p.openingHours)}`));
    if (p.season) facts.push(fact(ICON.calendar, `${STR.season}: ${escapeHtml(p.season)}`));
    const events = upcomingAt(p);
    const shown = events.slice(0, 30);
    el.viewPlace.innerHTML =
      `<div class="detail__bar"><button type="button" class="detail__back" id="placeBack">${svg(ICON.back)} ${STR.allPlaces}</button></div>` +
      placeTypeLabel(p.type) +
      `<h1 class="detail__title">${escapeHtml(p.name)}</h1>` +
      `<ul class="facts">${facts.join("")}</ul>` +
      mapSnippetHtml(Number(p.lat), Number(p.lon), p.name) +
      (p.description ? `<p class="detail__desc">${linkify(p.description)}</p>` : "") +
      `<div class="btn-row">` +
      `<button type="button" class="btn" id="placeShare">${svg(ICON.share)} ${STR.share}</button>` +
      (p.url ? extLink(p.url, STR.website, "btn btn--primary") : "") +
      `</div>` +
      `<h2 class="place-events-heading">${STR.upcomingHere}${events.length ? ` (${events.length})` : ""}</h2>` +
      (shown.length
        ? `<ul class="event-list place-events">${shown.map(cardHtml).join("")}</ul>` +
          (events.length > shown.length ? `<p class="static-more">${STR.moreEvents(events.length - shown.length)}</p>` : "")
        : `<p class="place-none">${STR.noUpcomingHere}</p>`);
    $("placeBack").addEventListener("click", () => {
      if (history.length > 1 && state.cameFromPlaces) history.back();
      else location.hash = "orte";
    });
    $("placeShare").addEventListener("click", () => sharePlace(p));
    mountMaps(el.viewPlace);
    // Termin aus der Ortsseite öffnen: "Zurück" führt wieder hierher.
    el.viewPlace.querySelector(".place-events") && el.viewPlace.querySelector(".place-events").addEventListener("click", (e) => {
      if (e.target.closest(".event-card")) state.cameFromList = true;
      const star = e.target.closest("[data-star]");
      if (star) { toggleSaved(star.dataset.star); renderPlace(p); }
    });
    el.main.focus({ preventScroll: true });
  }

  function renderDetail(ev) {
    const facts = [];
    let map = "";
    facts.push(fact(ICON.calendar, escapeHtml(longDate(ev.date))));
    facts.push(fact(ICON.clock, escapeHtml(timeText(ev))));
    if (ev.location && (ev.location.name || ev.location.address)) {
      // Adresse bevorzugen: der Name ist manchmal nur ein Raum ("Bewegungsraum").
      const q = ev.location.address || ev.location.name;
      const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`;
      const place = placeForEvent(ev);
      facts.push(fact(ICON.pin, `${escapeHtml(ev.location.name || ev.location.address)}` +
        `<small>${ev.location.name && ev.location.address ? escapeHtml(ev.location.address) + " · " : ""}` +
        `${extLink(mapUrl, STR.openMap)}` +
        `${place ? ` · <a href="#ort/${encodeURIComponent(place.id)}">${STR.aboutPlace}</a>` : ""}</small>`));
      // Koordinaten aus der Quelle, sonst die des erkannten Orts.
      const label = ev.location.name || ev.location.address;
      if (ev.location.lat != null && ev.location.lng != null) map = mapSnippetHtml(Number(ev.location.lat), Number(ev.location.lng), label);
      else if (place) map = mapSnippetHtml(Number(place.lat), Number(place.lon), label);
    }
    const priceBits = [priceText(ev)];
    if (ev.ticketRequired) priceBits.push(STR.ticket);
    priceBits.push(ev.registrationRequired ? STR.registration : STR.noRegistration);
    facts.push(fact(ICON.coin, escapeHtml(priceBits.filter(Boolean).join(" · "))));
    if (ev.familyFriendly) facts.push(fact(ICON.family, escapeHtml(STR.family)));
    if (ev.organizer) facts.push(fact(ICON.users, escapeHtml(ev.organizer)));

    const external = ev.url && !isSelfLink(ev.url)
      ? extLink(ev.url, STR.toEvent, "btn btn--primary")
      : "";

    // Derselbe Termin kann aus mehreren Quellen stammen (vom Backend
    // zusammengeführt, siehe writer.MergeAcrossSources): alle nennen,
    // die angezeigte Version zuerst.
    const sourceLabel = (name) => {
      if (name === "inbox") return STR.inbox;
      const src = state.sources.get(name);
      return src ? src.label : name;
    };
    const srcNames = (ev.sources && ev.sources.length ? ev.sources : [ev.source]).filter(Boolean);
    const srcLabel = [...new Set(srcNames.map(sourceLabel))].join(", ");
    const sourceLine = [srcLabel ? `${srcNames.length > 1 ? STR.sources : STR.source}: ${escapeHtml(srcLabel)}` : "",
      state.generatedAt ? `${STR.updated} ${relativeTime(state.generatedAt)}` : ""].filter(Boolean).join(" · ");

    const isSaved = saved.has(ev.id);
    state.detailId = ev.id;
    const { prev, next } = detailNeighbours(ev);
    const navBtn = (id, icon, label, target) =>
      `<button type="button" class="icon-btn detail__nav" id="${id}"${target ? "" : " disabled"} ` +
      `aria-label="${escapeHtml(target ? `${label}: ${target.title}` : label)}" title="${label}">${svg(icon)}</button>`;
    el.viewDetail.innerHTML =
      `<div class="detail__bar">` +
      `<button type="button" class="detail__back" id="detailBack">${svg(ICON.back)} ${STR.back}</button>` +
      `<div class="detail__actions">` +
      navBtn("detailPrev", ICON.back, STR.prevEventNav, prev) +
      navBtn("detailNext", ICON.forward, STR.nextEventNav, next) +
      `<button type="button" class="icon-btn star-btn${isSaved ? " is-active" : ""}" id="detailStar" aria-pressed="${isSaved}" ` +
      `aria-label="${isSaved ? STR.unsave : STR.save}" title="${isSaved ? STR.unsave : STR.save}">${svg(ICON.star)}</button>` +
      `</div></div>` +
      (ev.cancelled
        ? `<div class="cancelled-notice" role="status"><strong>${STR.cancelled}</strong> ${STR.cancelledNotice}</div>`
        : "") +
      categoryLabelHtml(ev.category) +
      `<h1 class="detail__title${ev.cancelled ? " is-cancelled" : ""}">${escapeHtml(ev.title)}</h1>` +
      imageHtml(ev) +
      `<ul class="facts">${facts.join("")}</ul>` +
      map +
      (ev.description ?`<p class="detail__desc">${linkify(ev.description)}</p>` : "") +
      `<div class="btn-row">` +
      `<button type="button" class="btn" id="detailIcs">${svg(ICON.calendarPlus)} ${STR.addToCalendar}</button>` +
      `<button type="button" class="btn" id="detailShare">${svg(ICON.share)} ${STR.share}</button>` +
      `</div>` +
      (external ? `<div class="btn-row" style="margin-top:var(--space-2)">${external}</div>` : "") +
      (sourceLine ? `<p class="detail__source">${sourceLine}</p>` : "");

    $("detailBack").addEventListener("click", () => {
      if (state.cameFromList && history.length > 1) history.back();
      else location.hash = "";
    });
    $("detailStar").addEventListener("click", () => {
      toggleSaved(ev.id);
      renderDetail(ev);
    });
    $("detailPrev").addEventListener("click", () => showNeighbour(-1));
    $("detailNext").addEventListener("click", () => showNeighbour(1));
    $("detailIcs").addEventListener("click", () => downloadIcs(ev));
    $("detailShare").addEventListener("click", () => shareEvent(ev));
    mountMaps(el.viewDetail);
    el.main.focus({ preventScroll: true });
  }

  // ---- Blättern in der Detailansicht ----
  // Reihenfolge wie in der Ansicht, aus der der Termin geöffnet wurde: Liste
  // mit den gesetzten Filtern (über den Zeitraum hinaus), "Gemerkt" oder die
  // Ortsseite. Ist der Termin dort nicht enthalten (direkt aufgerufener
  // Link), alle kommenden Termine.
  function detailSequence(ev) {
    const today = todayISO();
    const place = state.detailFrom === "place" && state.placeById.get(state.placeId);
    let seq = state.detailFrom === "saved"
      ? state.events.filter((e) => e.date >= today && saved.has(e.id))
      : place ? upcomingAt(place) : filteredEvents(true);
    if (!seq.includes(ev)) seq = state.events.filter((e) => e.date >= today);
    return seq;
  }
  function detailNeighbours(ev) {
    const seq = detailSequence(ev);
    const i = seq.indexOf(ev);
    if (i < 0) return { prev: null, next: null };
    return { prev: seq[i - 1] || null, next: seq[i + 1] || null };
  }

  // dir: 1 = nächster, -1 = vorheriger Termin. replaceState statt neuem
  // Verlaufseintrag: "Zurück" führt weiter direkt in die Liste.
  function showNeighbour(dir) {
    const cur = state.byId.get(state.detailId);
    if (!cur || sliding) return;
    const target = detailNeighbours(cur)[dir > 0 ? "next" : "prev"];
    if (!target) { snapBack(el.viewDetail); return; }
    slide(el.viewDetail, dir, () => {
      history.replaceState(null, "", `#${encodeURIComponent(target.id)}`);
      route();
    });
  }

  // ---- Blättern durch die Zeiträume (Liste) ----
  // Wie die Pfeile in der Datumsleiste: einen Tag bzw. eine Woche weiter
  // oder zurück, nie vor heute; mit Suche gilt die Liste für alle Tage.
  function canStepRange(dir) {
    if (state.search) return false;
    return dir > 0 || currentRange()[0] > todayISO();
  }
  function stepRange(dir) {
    const from = dir > 0 ? anchorDay() : currentRange()[0];
    setRange(state.period, iso(addDays(parseDate(from), dir * periodStep(state.period))));
  }
  function slideRange(dir) {
    if (sliding || !canStepRange(dir)) { snapBack(el.viewList); return; }
    slide(el.viewList, dir, () => stepRange(dir));
  }

  // ---- Wisch-Animation ----
  const SLIDE_MS = 180;
  let sliding = false;
  function motionOk() {
    return !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function resetSlide(v) {
    v.style.transition = "";
    v.style.transform = "";
    v.style.opacity = "";
    v.classList.remove("is-sliding");
  }
  function snapBack(v) {
    if (!v.classList.contains("is-sliding")) return;
    v.style.transition = `transform ${SLIDE_MS}ms ease-out`;
    v.style.transform = "";
    setTimeout(() => resetSlide(v), SLIDE_MS + 20);
  }
  // Ansicht v zur Seite hinaus, change() tauscht den Inhalt, dann von der
  // anderen Seite herein. dir 1 = vorwärts (Inhalt wandert nach links).
  function slide(v, dir, change) {
    if (!motionOk()) { resetSlide(v); change(); return; }
    const shift = Math.round(v.offsetWidth * 0.35);
    sliding = true;
    v.classList.add("is-sliding");
    v.style.transition = `transform ${SLIDE_MS}ms ease-in, opacity ${SLIDE_MS}ms ease-in`;
    v.style.transform = `translateX(${-dir * shift}px)`;
    v.style.opacity = "0";
    setTimeout(() => {
      change();
      v.style.transition = "none";
      v.style.transform = `translateX(${dir * shift}px)`;
      void v.offsetWidth;
      v.style.transition = `transform ${SLIDE_MS}ms ease-out, opacity ${SLIDE_MS}ms ease-out`;
      v.style.transform = "";
      v.style.opacity = "";
      setTimeout(() => { resetSlide(v); sliding = false; }, SLIDE_MS + 20);
    }, SLIDE_MS);
  }

  // Liegt el (bis zur Grenze stop) in einem Bereich, der selbst waagerecht
  // scrollt? Dann gehören Wischen und Pfeiltasten diesem Bereich.
  function inHorizontalScroller(node, stop) {
    for (let n = node; n && n !== stop && n.nodeType === 1; n = n.parentElement) {
      if (n.scrollWidth > n.clientWidth + 1 && /(auto|scroll)/.test(getComputedStyle(n).overflowX)) return true;
    }
    return false;
  }
  function isZoomed() {
    return Boolean(window.visualViewport && window.visualViewport.scale > 1.01);
  }
  // Hineingezoomt verschiebt waagerechtes Wischen den Ausschnitt, statt zu
  // blättern: .is-zoomed hebt touch-action: pan-y auf (style.css).
  function bindZoomState() {
    if (!window.visualViewport) return;
    const sync = () => document.documentElement.classList.toggle("is-zoomed", isZoomed());
    window.visualViewport.addEventListener("resize", sync);
    sync();
  }

  // Wischen auf v: nur bei überwiegend waagerechter Bewegung (senkrecht
  // scrollt die Seite wie gewohnt, touch-action im CSS). Berührungen am
  // Bildschirmrand bleiben der Zurück-Geste des Systems. Nach links wischen
  // = vorwärts (dir 1), nach rechts = zurück (dir -1).
  //   active()   ob die Ansicht gerade wischbar ist
  //   canGo(dir) ob es in diese Richtung weitergeht
  //   go(dir)    blättern (mit Animation, siehe slide)
  function bindSwipe(v, { active, canGo, go }) {
    const EDGE = 24, LOCK = 10;
    let sw = null;
    v.addEventListener("touchstart", (e) => {
      sw = null;
      if (!active() || sliding || isZoomed() || e.touches.length !== 1) return;
      const t = e.touches[0];
      if (t.clientX < EDGE || t.clientX > window.innerWidth - EDGE) return;
      if (inHorizontalScroller(e.target, v)) return;
      sw = { x: t.clientX, y: t.clientY, dx: 0, lock: "", time: Date.now(), next: canGo(1), prev: canGo(-1) };
    }, { passive: true });
    v.addEventListener("touchmove", (e) => {
      if (!sw) return;
      if (e.touches.length !== 1) { sw = null; snapBack(v); return; }
      const t = e.touches[0];
      const dx = t.clientX - sw.x, dy = t.clientY - sw.y;
      if (!sw.lock) {
        if (Math.abs(dx) < LOCK && Math.abs(dy) < LOCK) return;
        sw.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (sw.lock !== "x") return;
      sw.dx = dx;
      if (!motionOk()) return;
      // Ohne Weiter in dieser Richtung nur ein gebremstes Nachgeben.
      const has = dx < 0 ? sw.next : sw.prev;
      v.classList.add("is-sliding");
      v.style.transition = "none";
      v.style.transform = `translateX(${has ? dx : dx / 4}px)`;
    }, { passive: true });
    v.addEventListener("touchend", () => {
      if (!sw || sw.lock !== "x") { sw = null; return; }
      const { dx, time } = sw;
      const dir = dx < 0 ? 1 : -1;
      const has = dir > 0 ? sw.next : sw.prev;
      sw = null;
      const far = Math.abs(dx) > Math.min(80, v.offsetWidth * 0.25);
      const flick = Math.abs(dx) > 30 && Date.now() - time < 250;
      if ((far || flick) && has) go(dir);
      else snapBack(v);
    });
    v.addEventListener("touchcancel", () => { if (sw) { sw = null; snapBack(v); } });
  }

  function fact(icon, html) {
    return `<li>${svg(icon)}<div>${html}</div></li>`;
  }

  // Der Backend-Fallback-Link zeigt auf diese Seite selbst (baseUrl/#id) -
  // als "Zur Veranstaltung"-Button wäre das ein Link im Kreis.
  function isSelfLink(url) {
    const base = (state.site.baseUrl || "").replace(/\/+$/, "");
    return (base && url.startsWith(base + "/#")) || url.startsWith("#");
  }

  // Die App teilt immer ihren eigenen Link /#<id>. Die statischen Seiten
  // (OL_STATIC_PAGES) teilen ihre Adresse termine/<id>.html selbst.
  function eventLink(ev) {
    return location.href.split("#")[0] + "#" + encodeURIComponent(ev.id);
  }

  function shareEvent(ev) {
    const text = `${ev.cancelled ? STR.cancelled + ": " : ""}${ev.title} · ${dayHeading(ev.date)}${ev.startTime ? ", " + ev.startTime : ""}`;
    shareLink(ev.title, text, eventLink(ev));
  }
  function sharePlace(p) {
    const url = location.href.split("#")[0] + "#ort/" + encodeURIComponent(p.id);
    shareLink(p.name, [p.type, p.address].filter(Boolean).join(" · "), url);
  }
  function shareLink(title, text, url) {
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => toast(STR.linkCopied), () => toast(url));
    } else {
      toast(url);
    }
  }

  // ---- iCalendar (.ics) ----
  function icsEscape(s) {
    return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => "\\" + c);
  }
  function icsDate(date, time) {
    return date.replace(/-/g, "") + (time ? "T" + time.replace(":", "") + "00" : "");
  }
  function downloadIcs(ev) {
    const tz = instanceTz();
    const host = (state.site.baseUrl || location.host || "openlitfass").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//openLitfass//DE", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      `UID:${ev.id}@${host}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z")}`
    ];
    if (ev.startTime) {
      lines.push(`DTSTART;TZID=${tz}:${icsDate(ev.date, ev.startTime)}`);
      if (ev.endTime && ev.endTime > ev.startTime) lines.push(`DTEND;TZID=${tz}:${icsDate(ev.date, ev.endTime)}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${icsDate(ev.date)}`);
      lines.push(`DTEND;VALUE=DATE:${icsDate(iso(addDays(parseDate(ev.date), 1)))}`);
    }
    lines.push(`SUMMARY:${icsEscape((ev.cancelled ? STR.cancelled + ": " : "") + ev.title)}`);
    if (ev.cancelled) lines.push("STATUS:CANCELLED");
    if (ev.description) lines.push(`DESCRIPTION:${icsEscape(ev.description)}`);
    const loc = ev.location ? [ev.location.name, ev.location.address].filter(Boolean).join(", ") : "";
    if (loc) lines.push(`LOCATION:${icsEscape(loc)}`);
    lines.push(`URL:${ev.url && !isSelfLink(ev.url) ? ev.url : eventLink(ev)}`);
    lines.push("END:VEVENT", "END:VCALENDAR");

    const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${ev.id}.ics`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ---- Über ----
  function renderAbout() {
    const s = state.site;
    const paras = String(s.about || s.description || "").split(/\n\s*\n/).filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`).join("");

    const sources = [...state.sources.values()].map((src) => {
      const name = src.name === "inbox" ? STR.inbox : src.label;
      const label = src.homepage
        ? extLink(src.homepage, escapeHtml(name))
        : escapeHtml(name);
      const when = src.lastSuccess ? `<small>${STR.updated} ${relativeTime(new Date(src.lastSuccess))}</small>` : "";
      return `<li><span>${label}</span>${when}</li>`;
    }).join("");


    el.viewAbout.innerHTML =
      `<h1>${escapeHtml(s.name || document.title)}</h1>` + paras +
      (s.submitUrl ? `<h2>${STR.aboutSubmit}</h2><p>${siteLink(s.submitUrl, STR.aboutSubmitBtn, "btn")}</p>` : "") +
      (sources ? `<h2>${STR.aboutSources}</h2><ul class="source-list">${sources}</ul>` : "") +
      `<h2>${STR.aboutFeedback}</h2>` +
      (s.issuesUrl ? feedbackBlock(STR.aboutFeedbackSite, s.issuesUrl) : "") +
      feedbackBlock(STR.aboutFeedbackCore, CORE_ISSUES_URL) +
      `<p style="margin-top:var(--space-5)"><small>${extLink(CORE_HOMEPAGE, STR.poweredBy)}</small></p>`;
  }

  // Ein Issue-Tracker als Linkzeile. Bei GitHub (".../issues") führen
  // "Fehler melden" und "Idee vorschlagen" direkt zu den Formularen
  // bug.yml/feature.yml, bei anderen Trackern gibt es nur den einen Link.
  function feedbackBlock(title, url) {
    const base = String(url).trim().replace(/\/+$/, "");
    const links = /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues$/i.test(base)
      ? [
          extLink(`${base}/new?template=bug.yml`, STR.feedbackBug),
          extLink(`${base}/new?template=feature.yml`, STR.feedbackFeature),
          extLink(base, STR.feedbackAll)
        ]
      : [extLink(base, STR.feedbackAll)];
    return `<div class="feedback"><h3>${escapeHtml(title)}</h3><p>${links.join("")}</p></div>`;
  }

  // ---- Einstellungen ----
  // Alles nur auf diesem Gerät (settings.js). Jede Wahl wird sofort
  // gespeichert; die Liste unten zeigt, was openLitfass abgelegt hat.
  const SETTING_CHOICES = {
    theme: [["system", "themeSystem"], ["light", "themeLightShort"], ["dark", "themeDarkShort"]],
    maps: [["click", "externalClick"], ["auto", "externalAuto"], ["off", "externalOff"]],
    images: [["click", "externalClick"], ["auto", "externalAuto"], ["off", "externalOff"]]
  };

  function settingGroup(name, label, hint) {
    const current = SETTINGS.get(name);
    const disabled = SETTINGS.readOnly() ? " disabled" : "";
    const chips = SETTING_CHOICES[name].map(([value, key]) =>
      `<label class="chip${value === current ? " is-active" : ""}">` +
      `<input type="radio" class="sr-only" name="setting-${name}" value="${value}"${value === current ? " checked" : ""}${disabled}>` +
      `${STR[key]}</label>`).join("");
    return `<fieldset class="setting" data-setting="${name}"><legend>${label}</legend>` +
      (hint ? `<p class="setting__hint">${hint}</p>` : "") +
      `<div class="fp-chips">${chips}</div></fieldset>`;
  }

  function localEntryLabel(key, value) {
    if (key === "openlitfass:settings") return STR.localSettings;
    if (key === "openlitfass:theme") return STR.localLegacyTheme;
    if (key.startsWith("openlitfass:saved:")) {
      let n = 0;
      try { const v = JSON.parse(value); if (Array.isArray(v)) n = v.length; } catch (_) { /* leer */ }
      return STR.localSaved(n);
    }
    return STR.localOther;
  }

  function formatBytes(n) {
    return n < 1024 ? `${n} Byte` : `${(n / 1024).toFixed(1).replace(".", ",")} KB`;
  }

  function renderSettings() {
    const entries = SETTINGS.entries();
    const rows = entries.map((e) => {
      const size = new Blob([e.key + e.value]).size;
      return `<li><span>${escapeHtml(localEntryLabel(e.key, e.value))}<br><small><code>${escapeHtml(e.key)}</code> · ${formatBytes(size)}</small></span>` +
        `<button type="button" class="btn btn--small" data-remove="${escapeHtml(e.key)}">${STR.localDelete}</button></li>`;
    }).join("");

    el.viewSettings.innerHTML =
      `<h1>${STR.settings}</h1><p>${STR.settingsIntro}</p>` +
      (SETTINGS.readOnly() ? `<p class="setting__warn" role="status">${STR.settingsReadOnly}</p>` : "") +
      `<h2>${STR.settingsAppearance}</h2>` +
      settingGroup("theme", STR.settingsTheme) +
      `<h2>${STR.settingsExternal}</h2><p>${STR.settingsExternalIntro}</p>` +
      settingGroup("maps", STR.settingsMaps, STR.settingsMapsHost) +
      settingGroup("images", STR.settingsImages, STR.settingsImagesHost) +
      `<h2>${STR.settingsLocal}</h2>` +
      (rows ? `<ul class="source-list local-data">${rows}</ul>` : `<p>${STR.settingsLocalNone}</p>`) +
      `<p><small>${STR.settingsLocalOffline}</small></p>` +
      `<p><button type="button" class="btn" id="clearAllData">${STR.clearAll}</button></p>`;
  }

  function bindSettings() {
    el.viewSettings.addEventListener("change", (e) => {
      const input = e.target.closest("input[type=radio]");
      const group = input && input.closest("[data-setting]");
      if (!group) return;
      SETTINGS.set(group.dataset.setting, input.value);
      syncThemeToggle();
      renderSettings();
      toast(STR.settingSaved);
    });
    el.viewSettings.addEventListener("click", (e) => {
      const remove = e.target.closest("[data-remove]");
      if (remove) {
        const key = remove.dataset.remove;
        SETTINGS.remove(key);
        if (key === SAVED_KEY) {
          saved.clear();
          updateSavedCount();
        }
        syncThemeToggle();
        renderSettings();
        toast(STR.deleted);
        return;
      }
      if (e.target.closest("#clearAllData")) {
        if (!window.confirm(STR.clearAllConfirm)) return;
        SETTINGS.clearAll().then(() => {
          saved.clear();
          updateSavedCount();
          syncThemeToggle();
          renderSettings();
          toast(STR.clearedAll);
        });
      }
    });
  }

  // ---- Hilfen ----
  let toastTimer = null;
  function toast(text) {
    el.toast.textContent = text;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.toast.hidden = true; }, 2500);
  }

  // Nur http(s), mailto und relative Links durchlassen: URLs kommen auch aus
  // fremden Feeds, ein "javascript:"-Link wäre sonst ausführbarer Code.
  function safeUrl(url) {
    const u = String(url || "").trim();
    if (/^(https?:|mailto:)/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith("//")) return "#";
    return u;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  // Externe Links: öffnen in neuem Tab und tragen dasselbe Symbol wie
  // "Zur Veranstaltung", damit man vor dem Antippen sieht, dass es die
  // Seite verlässt. html ist bereits escapter Linktext.
  function extLink(url, html, cls) {
    return `<a${cls ? ` class="${cls}"` : ""} href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noopener">` +
      `${html}<span class="ext-icon">${svg(ICON.external)}</span><span class="sr-only"> ${STR.newTab}</span></a>`;
  }
  function isExternal(url) {
    try { return new URL(url, location.href).origin !== location.origin; } catch (_) { return false; }
  }
  // Links aus der Konfiguration (Impressum, Termin melden …): extern
  // gekennzeichnet, wenn sie die Seite verlassen.
  function siteLink(url, html, cls) {
    if (isExternal(url)) return extLink(url, html, cls);
    return `<a${cls ? ` class="${cls}"` : ""} href="${escapeHtml(safeUrl(url))}">${html}</a>`;
  }
  // Text escapen und darin enthaltene http(s)-Adressen als Links ausgeben
  // (neuer Tab). Satzzeichen am Ende gehören nicht zur Adresse.
  function linkify(text) {
    return String(text).split(/(https?:\/\/[^\s<>"]+)/g).map((part, i) => {
      if (i % 2 === 0) return escapeHtml(part);
      const m = /^(.*?)([.,;:!?)\]]*)$/.exec(part);
      return extLink(m[1], escapeHtml(m[1])) + escapeHtml(m[2]);
    }).join("");
  }

  // ---- PWA ----
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) => console.warn("Service Worker:", err));
    });
  }
})();
