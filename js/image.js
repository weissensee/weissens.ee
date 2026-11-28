/* openLitfass – Bild zum Termin, von der Quelle (#70)
   Ein Platzhalter .event-image[data-src] lädt das Bild direkt vom Server
   des Veranstalters; openLitfass kopiert es nie. Wann, bestimmt die
   Einstellung "images" (settings.js): "click" (Standard) zeigt erst einen
   Knopf, "auto" lädt gleich, "off" zeigt nichts. Vorher geht keine Anfrage
   an Dritte. referrerpolicy="no-referrer": der fremde Server erfährt nicht,
   von welcher Seite das Bild abgerufen wird. Kein crossorigin, weil die
   meisten Server kein CORS senden; ob der Browser dabei Cookies des
   fremden Servers mitschickt, hängt von seinen Einstellungen ab.
   Genutzt von der App (app.js) und den statischen Terminseiten. */
(function () {
  "use strict";

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/>' +
    '<path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/></svg>';

  function mode() {
    var s = window.openLitfassSettings;
    return s ? s.get("images") : "click";
  }

  function source(box) {
    var src = box.getAttribute("data-src") || "";
    try {
      var u = new URL(src);
      return u.protocol === "https:" ? u : null;
    } catch (_) {
      return null;
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function show(box, u) {
    var img = document.createElement("img");
    img.alt = box.getAttribute("data-alt") || "";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", function () {
      box.hidden = true;
      box.innerHTML = "";
    });
    img.src = u.href;
    box.innerHTML = "";
    box.appendChild(img);
    var credit = document.createElement("figcaption");
    credit.className = "event-image__credit";
    credit.textContent = "Bild: " + u.hostname;
    box.appendChild(credit);
    box.classList.add("is-loaded");
  }

  function mount(box) {
    if (!box || box.getAttribute("data-mounted")) return;
    var u = source(box);
    var m = mode();
    if (!u || m === "off") return;
    box.setAttribute("data-mounted", "1");
    box.hidden = false;
    if (m === "auto") {
      show(box, u);
      return;
    }
    box.innerHTML =
      '<button type="button" class="btn event-image__load">' + ICON + " Bild von " + esc(u.hostname) + " laden</button>" +
      '<p class="event-image__note">Erst nach dem Klick. Dabei sieht der Server des Veranstalters deine IP-Adresse.</p>';
    box.querySelector("button").addEventListener("click", function () { show(box, u); });
  }

  function mountAll(root) {
    var list = (root || document).querySelectorAll(".event-image[data-src]");
    for (var i = 0; i < list.length; i++) mount(list[i]);
  }

  window.openLitfassImage = { mount: mount, mountAll: mountAll };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
})();
