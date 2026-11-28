/* openLitfass – Einstellungen auf dem Gerät (#69)
   Keine Cookies: was jemand einstellt, liegt nur im localStorage dieses
   Browsers unter dem Schlüssel openlitfass:settings. Geschrieben wird erst,
   wenn jemand etwas ändert (oder alte Daten umgezogen werden müssen).

   Version: "v" ist die openLitfass-Version, in der sich das Schema zuletzt
   geändert hat, "rev" zählt Änderungen innerhalb dieser Version (ab 0).
   Ändert sich das Schema, kommt ein Schritt in MIGRATIONS dazu und SCHEMA
   wird auf dessen Stand gesetzt. Regeln:
   - unbekannte Felder bleiben erhalten (eine neuere Version kann sie kennen)
   - kaputtes JSON: Standardwerte, der Schlüssel wird erst beim nächsten
     Speichern überschrieben
   - gespeicherter Stand neuer als dieser Code (Downgrade): lesen, was
     bekannt ist, nichts zurückschreiben
   Siehe docs: decision record "Settings on the device".
   Genutzt von app.js, map.js und den statischen Seiten. */
(function () {
  "use strict";

  var KEY = "openlitfass:settings";
  var PREFIX = "openlitfass:";
  var SCHEMA = { v: "0.6.0", rev: 0 };

  var FIELDS = {
    theme: { values: ["system", "light", "dark"], fallback: "system" },
    maps: { values: ["click", "auto", "off"], fallback: "click" },
    images: { values: ["click", "auto", "off"], fallback: "click" }
  };

  // Schritte in aufsteigender Reihenfolge. migrate(s, store) ändert s und
  // darf alte Schlüssel über store lesen und entfernen.
  var MIGRATIONS = [
    {
      v: "0.6.0", rev: 0,
      // Bis 0.5: nur das Farbschema unter openlitfass:theme ("light"/"dark",
      // fehlt = System).
      migrate: function (s, store) {
        var old = store.get(PREFIX + "theme");
        if (old === "light" || old === "dark") s.theme = old;
        store.remove(PREFIX + "theme");
      }
    }
  ];

  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (_) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); return true; } catch (_) { return false; } },
    remove: function (k) { try { window.localStorage.removeItem(k); } catch (_) { /* gesperrt */ } }
  };

  function semver(v) {
    var m = /^(\d+)\.(\d+)\.(\d+)/.exec(String(v || ""));
    return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
  }
  // <0, 0, >0 wie bei sort: erst Version, dann rev.
  function compare(a, b) {
    var x = semver(a.v), y = semver(b.v);
    for (var i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
    return (+a.rev || 0) - (+b.rev || 0);
  }

  function valid(name, value) {
    return FIELDS[name].values.indexOf(value) >= 0;
  }

  var data = {};       // gespeichertes Objekt (inkl. unbekannter Felder)
  var readOnly = false;
  var listeners = [];

  function load() {
    var raw = store.get(KEY);
    var stored = null;
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) stored = parsed;
      } catch (_) { /* kaputt: Standardwerte */ }
    }
    data = stored || {};
    var from = stored ? { v: data.v, rev: data.rev } : { v: "0.0.0", rev: 0 };
    if (compare(from, SCHEMA) > 0) {
      readOnly = true;
      return;
    }
    var hadLegacy = false;
    for (var i = 0; i < MIGRATIONS.length; i++) {
      var step = MIGRATIONS[i];
      if (compare(step, from) > 0) {
        if (!stored && store.get(PREFIX + "theme") !== null) hadLegacy = true;
        step.migrate(data, store);
      }
    }
    // Ohne gespeicherten Stand nur schreiben, wenn alte Daten umgezogen
    // wurden - sonst bleibt der Speicher leer, bis jemand etwas einstellt.
    if (stored || hadLegacy) {
      if (compare(from, SCHEMA) < 0) save();
    }
  }

  function save() {
    if (readOnly) return false;
    data.v = SCHEMA.v;
    data.rev = SCHEMA.rev;
    return store.set(KEY, JSON.stringify(data));
  }

  function get(name) {
    var v = data[name];
    return valid(name, v) ? v : FIELDS[name].fallback;
  }

  function all() {
    var out = {};
    for (var name in FIELDS) out[name] = get(name);
    return out;
  }

  function set(name, value) {
    if (readOnly || !FIELDS[name] || !valid(name, value)) return;
    data[name] = value;
    save();
    applyTheme();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](name, value); } catch (e) { console.warn(e); }
    }
  }

  function applyTheme() {
    var t = get("theme");
    if (t === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  // Alle Einträge dieser Seite im localStorage (für die Übersicht).
  function entries() {
    var out = [];
    try {
      var ls = window.localStorage;
      for (var i = 0; i < ls.length; i++) {
        var k = ls.key(i);
        if (k && k.indexOf(PREFIX) === 0) out.push({ key: k, value: ls.getItem(k) || "" });
      }
    } catch (_) { /* gesperrt: nichts gespeichert */ }
    out.sort(function (a, b) { return a.key < b.key ? -1 : 1; });
    return out;
  }

  function removeEntry(key) {
    if (String(key).indexOf(PREFIX) === 0) store.remove(key);
    if (key === KEY) {
      data = {};
      readOnly = false;
      applyTheme();
    }
  }

  // Alles löschen, was openLitfass auf dem Gerät abgelegt hat: localStorage,
  // die Offline-Kopie (Cache Storage) und den Service Worker.
  function clearAll() {
    var list = entries();
    for (var i = 0; i < list.length; i++) store.remove(list[i].key);
    data = {};
    readOnly = false;
    applyTheme();
    var jobs = [];
    if (window.caches && caches.keys) {
      jobs.push(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k.indexOf("openlitfass-") === 0; })
          .map(function (k) { return caches.delete(k); }));
      }));
    }
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      jobs.push(navigator.serviceWorker.getRegistrations().then(function (regs) {
        return Promise.all(regs.map(function (r) { return r.unregister(); }));
      }));
    }
    return Promise.all(jobs).catch(function () { /* nicht verfügbar */ });
  }

  function onChange(fn) { listeners.push(fn); }

  load();
  applyTheme();

  window.openLitfassSettings = {
    KEY: KEY,
    SCHEMA: SCHEMA,
    get: get,
    set: set,
    all: all,
    readOnly: function () { return readOnly; },
    entries: entries,
    remove: removeEntry,
    clearAll: clearAll,
    onChange: onChange,
    // Für Tests in der Konsole.
    _compare: compare
  };
})();
