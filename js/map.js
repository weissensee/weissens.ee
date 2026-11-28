/* openLitfass – Kartenausschnitt auf Nachfrage
   Ein Platzhalter .map-snippet[data-lat][data-lon] lädt erst nach einem
   Klick auf "Karte anzeigen" Kartenkacheln von OpenStreetMap. Vorher geht
   keine Anfrage an Dritte. Es sind schlichte Bilder (kein iframe, keine
   Bibliothek); crossorigin="anonymous" lässt Cookies weg, in beide
   Richtungen. Genutzt von der App (app.js) und den statischen Seiten.
   Die Einstellung "Karten" (settings.js) kann das Laden auch automatisch
   machen oder die Karte ganz weglassen. */
(function () {
  "use strict";

  var TILE = "https://tile.openstreetmap.org/";
  var ZOOM = 17;
  var SIZE = 256;
  // 5 x 3 Kacheln um den Punkt reichen für bis zu 1024 x 512 px.
  var COLS = 2, ROWS = 1;
  var PIN = '<svg class="map-snippet__pin" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 2a7 7 0 0 0 -7 7c0 5.25 7 13 7 13s7 -7.75 7 -13a7 7 0 0 0 -7 -7z"/>' +
    '<circle cx="12" cy="9" r="2.6"/></svg>';

  function tilePoint(lat, lon) {
    var n = Math.pow(2, ZOOM);
    var r = lat * Math.PI / 180;
    return {
      x: (lon + 180) / 360 * n,
      y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n
    };
  }

  function show(box) {
    var lat = parseFloat(box.getAttribute("data-lat"));
    var lon = parseFloat(box.getAttribute("data-lon"));
    if (!isFinite(lat) || !isFinite(lon)) return;
    var p = tilePoint(lat, lon);
    var ix = Math.floor(p.x), iy = Math.floor(p.y);
    var fx = (p.x - ix) * SIZE, fy = (p.y - iy) * SIZE;
    var max = Math.pow(2, ZOOM);
    var imgs = "";
    for (var dy = -ROWS; dy <= ROWS; dy++) {
      for (var dx = -COLS; dx <= COLS; dx++) {
        var tx = ix + dx, ty = iy + dy;
        if (ty < 0 || ty >= max) continue;
        tx = ((tx % max) + max) % max;
        imgs += '<img src="' + TILE + ZOOM + "/" + tx + "/" + ty + '.png" alt="" ' +
          'width="256" height="256" crossorigin="anonymous" referrerpolicy="strict-origin-when-cross-origin" ' +
          'style="left:' + Math.round(dx * SIZE - fx) + "px;top:" + Math.round(dy * SIZE - fy) + 'px">';
      }
    }
    var label = box.getAttribute("data-label") || "";
    box.innerHTML =
      '<div class="map-snippet__map" role="img" aria-label="Kartenausschnitt' + (label ? ": " + escapeAttr(label) : "") + '">' +
      '<div class="map-snippet__tiles">' + imgs + "</div>" + PIN + "</div>" +
      '<p class="map-snippet__credit">© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">' +
      "OpenStreetMap</a>-Mitwirkende</p>";
    box.classList.add("is-loaded");
  }

  function escapeAttr(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Einstellung "maps" (settings.js): "click" wie bisher, "auto" lädt
  // gleich, "off" zeigt gar nichts. Ohne settings.js gilt "click".
  function mode() {
    var s = window.openLitfassSettings;
    return s ? s.get("maps") : "click";
  }

  // Platzhalter (Knopf + Hinweis) einsetzen und auf den Klick warten.
  function mount(box) {
    if (!box || box.getAttribute("data-mounted")) return;
    var m = mode();
    if (m === "off") return;
    box.setAttribute("data-mounted", "1");
    box.hidden = false;
    if (m === "auto") {
      show(box);
      return;
    }
    box.innerHTML =
      '<button type="button" class="btn map-snippet__load">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13"/><path d="M9 4v13"/><path d="M15 7v13"/></svg> Karte anzeigen</button>' +
      '<p class="map-snippet__note">Lädt Kartenbilder von openstreetmap.org – erst nach dem Klick, ohne Cookies. ' +
      "Dabei sieht OpenStreetMap deine IP-Adresse.</p>";
    box.querySelector("button").addEventListener("click", function () { show(box); });
  }

  function mountAll(root) {
    var list = (root || document).querySelectorAll(".map-snippet[data-lat]");
    for (var i = 0; i < list.length; i++) mount(list[i]);
  }

  window.openLitfassMap = { mount: mount, mountAll: mountAll };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
})();
