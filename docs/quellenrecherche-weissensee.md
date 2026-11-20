# Quellenrecherche Weißensee (Berlin)

Stand: 13.07.2026. Solide Grundabdeckung je Kategorie (keine erschöpfende Liste). Fokus: Quellen mit Aussicht auf strukturierte/regelmäßig aktualisierte Daten (Homepage, Kalender, Feed), die für `weissens.ee` (Frontend) bzw. `sources/` nutzbar sind.

Hinweis zur Architektur: Das Backend liest pro Quelle eine JSON-Datei (`sources/*.json`) mit Typ `json` | `rss` | `wcs` | `generic`. Vorlagen für alle Quelltypen liegen im Kern (`openlitfass/example-instance/sources/`), hier vorbereitet ist `familienzentrum-weissensee.example.json` (WCS). Die unten gefundenen Quellen sind entsprechend markiert, wo ein Feed/API erkennbar ist.

---

## 1. Veranstaltungsorte

- **Bildungs- und Kulturzentrum Peter Edel** — Homepage: [peteredel.de](https://www.peteredel.de/) (eigene Seite nutzen, nicht kbw.de). Kalender: [peteredel.de/events](https://www.peteredel.de/events/). Format: HTML, kein Feed/API (Umbraco-CMS, kein WordPress) — Details s. u.
- **Freilichtbühne Weißensee** — Homepage: [freilichtbuehne-weissensee.de](https://freilichtbuehne-weissensee.de/). Kalender: [events.ics](https://freilichtbuehne-weissensee.de/events.ics). Format: **bester Fund — echtes iCal (Events Manager Pro)**, Standard-ICS mit `SUMMARY`, `DESCRIPTION`, `DTSTART`, `CATEGORIES`, `URL`, Bild via `ATTACH` und vollem `LOCATION` inkl. PLZ (s. u.).
- **Brotfabrik Berlin** (Kino, Theater, Galerie, Kneipe) — Homepage: [brotfabrik-berlin.de](https://brotfabrik-berlin.de/). Kalender: [wp-json/tribe/events/v1/events](https://brotfabrik-berlin.de/wp-json/tribe/events/v1/events). Format: **JSON-API (The Events Calendar Plugin)** — liefert title, start_date, end_date, url, description (HTML), venue, organizer, Bilder.
- **Kulturzentrum Tiefgrund** — Homepage: [tiefgrund-berlin.de](https://tiefgrund-berlin.de/). Kalender: [Feed](https://tiefgrund-berlin.de/events/feed). Format: **RSS — bereits als Beispiel im Repo**.
- **Familienzentrum Weißensee** — Homepage: [familienzentrum-weissensee.de](https://www.familienzentrum-weissensee.de). Format: **WCS — bereits als Beispiel im Repo**.
- **Stadtteilzentrum Weissensee** (FreiZeitHaus e.V.) — Homepage: [stz-weissensee.de](https://www.stz-weissensee.de/). Kalender: [veranstaltungen.html](https://www.stz-weissensee.de/veranstaltungen.html) (beste Quelle, s. u.) bzw. [Tagesansicht](https://www.stz-weissensee.de/component/jevents/eventsnachtag/2026/7/14/281,263,264,265,270,266,267,271,268,269,286,287.html?Itemid=563). Format: Joomla + **JEvents**-Komponente. Kein sauberes ICS/JSON öffentlich erreichbar, aber `/veranstaltungen.html` ist eine gut scrapbare HTML-Seite (s. u.).
- **weißensee-kultur.de** (Nachbarschaftsinitiative „Weißenseer Kultursommer") — Homepage: [weissensee-kultur.de](https://weissensee-kultur.de/). Kalender: [Programm](https://weissensee-kultur.de/programm/). Format: **RSS vorhanden** (`/feed`) — sammelt bereits Events mehrerer Weißenseer Orte, ggf. ergiebige Einzelquelle.
- **Kulturverein Weißensee e.V.** (Kaufmuseum, Berliner Allee) — Homepage: [kulturvereinweissensee.de](https://kulturvereinweissensee.de/). Kalender: auf Homepage. Format: HTML, kein erkennbarer Feed.
- **Strandbad Weißensee** (Sommer-Events/Strandbar) — Homepage: [strandbadweissensee.de](https://www.strandbadweissensee.de/). Format: HTML.
- **OC23 – Jugendfreizeiteinrichtung** — Homepage: [jup.berlin-Eintrag](https://jup.berlin/orte/jugendfreizeiteinrichtung-oc23) bzw. [kinderring-berlin.org/oc23](https://www.kinderring-berlin.org/oc23/). Format: HTML.
- **Berlin.de Bezirkskalender Pankow** (inkl. Weißensee) — Homepage: [berlin.de/land/kalender/?b=8](https://www.berlin.de/land/kalender/?b=8). Format: **JSON-API — bereits als Beispiel im Repo**, liefert ganz Pankow (Filterung auf Weißensee nötig).
- **pankow-weissensee-prenzlauerberg.berlin** (Kiez-/BID-Portal) — Homepage: [Seite](https://www.pankow-weissensee-prenzlauerberg.berlin/de/events). Format: HTML, evtl. eigene Veranstaltungsdatenbank — lohnt technische Prüfung.

Weitere reine Aggregator-Portale (keine Primärquelle, aber nützlich zum Abgleich): [berlin.de/special/stadtteile/weissensee/veranstaltungen](https://www.berlin.de/special/stadtteile/weissensee/veranstaltungen/), [veranstaltungen.meinestadt.de/berlin-weissensee](https://veranstaltungen.meinestadt.de/berlin-weissensee), [berlin.city-map.de Events](https://berlin.city-map.de/01100000/berlin/weissensee/events).

---

## 2. Öffentliche Einrichtungen (Öffnungszeiten)

- **Bürgeramt Pankow – Standort Weißensee** — Berliner Allee 252–260, 13088 Berlin. Öffnungszeiten: Mo 08–15, Di 11–18, Mi 08–14, Do 11–18, Fr 08–13 (nur Termin, buchbar über 115). Quelle: [berlinstadtservice.de](https://www.berlinstadtservice.de/aemter-und_behoerden_berlin/buergeramt/Buergeramt_Pankow-Prenzlauer_Berg-Weissensee.html).
- **Wolfdietrich-Schnurre-Bibliothek** (Antonplatz) — Bizetstraße 41, 13088 Berlin. Öffnungszeiten: Mo 10–19, Di 10–17, Mi 13–19, Do 10–19, Fr 10–17, Sa/So 10–16. Quelle: [berlin.de Stadtbibliothek Pankow](https://www.berlin.de/stadtbibliothek-pankow/bibliotheken/wolfdietrich-schnurre-bibliothek/).
- **Strandbad Weißensee** (Berliner Bäder-Betriebe) — Uferpromenade am Weißen See, 13088 Berlin. Öffnungszeiten: Saison Mai–Aug, Mai 13–19, Jun–Aug 10–20 (wetterabhängig). Quelle: [berlinerbaeder.de](https://www.berlinerbaeder.de/baeder/detail/strandbad-weissensee/).
- **Stadtteilzentrum Weißensee / FreiZeitHaus e.V.** (u. a. Seniorenfreizeitstätte) — Pistoriusstr. 23, 13086 Berlin. Öffnungszeiten: Mo–Fr 09–18 (Termine abends/Wochenende nach Vereinbarung). Quelle: [hilfelotse-berlin.de](https://www.hilfelotse-berlin.de/detail/stadtteilzentrum-weissensee-freizeithaus-e-v).
- **OC23 – Jugendfreizeiteinrichtung** (12–27 Jahre) — Charlottenburger Str./Gäblerstr. Bereich. Öffnungszeiten: Mo–Do 14–20, So 12–18. Quelle: [jup.berlin](https://jup.berlin/orte/jugendfreizeiteinrichtung-oc23).
- **Kinder- und Jugendklub Maxim** — Charlottenburger Straße 117, 13086 Berlin (Tel. 030 92376457). Quelle: [kauperts.de](https://berlin.kauperts.de/eintrag/Kinder-und-Jugendklub-Maxim-Charlottenburger-Strasse-117-13086-Berlin).
- **FiPP-Nische & FreiRaum** (Kinder-/Mädchentreff) — Quelle: [fippev.de](https://www.fippev.de/fipp-nischefreiraum).
- **Bildungszentrum Antonplatz** (Bibliothek, VHS Pankow, Musikschule Béla Bartók) — Antonplatz, Öffnungszeiten je Einrichtung unterschiedlich. Quelle: [berlin.de Bibliothek](https://www.berlin.de/stadtbibliothek-pankow/bibliotheken/wolfdietrich-schnurre-bibliothek/).
- **Kita-Navigator / Kita-Suche Berlin** (Verzeichnis, keine Einzeleinrichtung) — [kita-navigator.berlin.de](https://kita-navigator.berlin.de/), [kita-suche.berlin](https://kita-suche.berlin/).
- **Grundschulen Weißensee** (u. a. Picasso-Grundschule, Grundschule an der Rennbahn) — Gounodstr. 71 / Rennbahnstr. 45. Quelle: [gemeinschaftsschulen-berlin.de](https://www.gemeinschaftsschulen-berlin.de/grundschulen/ortsteil/weissensee).

---

## 3. Spielplätze

Genannt werden u. a.: Großer Spielplatz am Weißensee, Plantsche am Weißen See, Parkstraße, Mahlerstraße, Tassostraße, Fuchsspielplatz, Wackelhaus-Spielplatz, Borodin-Spielplatz, Lehderstraße, Spielplatz an der Pistoriusstraße (insgesamt über 40 Spielplätze im Ortsteil).

Primärquellen für eine vollständige, adressgenaue Liste:
- [berlin.de – Spielplätze Weißensee](https://www.berlin.de/adressen/spielplatz/district/weissensee/) (amtliches Verzeichnis)
- [spielplatztreff.de – Weißensee](https://www.spielplatztreff.de/spielplaetze/berlin_wei%C3%9Fensee) (mit Bewertungen/Fotos)
- [spielplatznet.de – Weißensee](https://spielplatznet.de/spielplaetze/Berlin/Wei%C3%9Fensee)

Hinweis: Spielplätze haben keine „Events" im engeren Sinne – eher als statische Orte-Liste (z. B. eigenes `data/`-JSON) statt als Event-Quelle relevant.

---

## 4. Vereine

- **Kulturverein Weißensee e.V.** — Kultur (Kaufmuseum, Berliner Allee). Homepage: [kulturvereinweissensee.de](https://kulturvereinweissensee.de/). Konzerte, Lesungen, interkulturelle Formate.
- **Bezirksverband der Kleingärtner Berlin-Weißensee e.V.** — Kleingärten (Dachverband, 28 Anlagen). Homepage: [kleingaertner-weissensee.de](https://www.kleingaertner-weissensee.de/), dort auch [Vereinsliste](https://www.kleingaertner-weissensee.de/Vereine/VereineListe.html).
- **KGA „Frieden" e.V.** — Kleingarten, Einzelanlage. Homepage: [kga-frieden.de](http://www.kga-frieden.de/).
- **Kleingartenverein Hansastraße** — Kleingarten, Einzelanlage. Homepage: [kleingaertner-weissensee-hansastrasse.de](http://www.kleingaertner-weissensee-hansastrasse.de/).
- **SV Preußen Berlin** — Kinder-/Jugendsport (Hohenschönhausen/Weißensee/Pankow), gegr. 1990.
- **Tennis-Club Berlin-Weißensee** — Sport, über Branchenverzeichnisse auffindbar.
- **Berliner SV 63 „Chemie" Weißensee** — Sport, über Branchenverzeichnisse auffindbar.
- **Weißenseer Sportverein „Rot-Weiß"** — Sport, über Branchenverzeichnisse auffindbar.
- **SV Weißensee** — Fußball. [BFV-Eintrag](https://www.bfv.de/vereine/sv-weissensee/00ES8GNJFC00000NVV0AG08LVUPGND5I) (Verbandsprofil).
- **Familienzentrum Weißensee** — Familie/Kurse. Homepage: [familienzentrum-weissensee.de](https://www.familienzentrum-weissensee.de) (s. Kat. 1, bereits als Quelle im Repo).

Directory-Quellen für weitere/aktuelle Vereine: [WEGWEISER aktuell – Vereine Weißensee](https://www.wegweiser-aktuell.de/berlin/21_weissensee_672_vereine-verbaende-organisationen.htm), [city-map.de – Vereine Weißensee](https://berlin.city-map.de/01100000/berlin/weissensee/vereine), [Das Örtliche – Vereine Weißensee](https://www.dasoertliche.de/Themen/Vereine/Berlin-Wei%C3%9Fensee.html).

Achtung: `weissensee.de` (mit „Bürger & Stadt"-Bereich) ist die Stadt **Weißensee in Thüringen** – nicht der Berliner Ortsteil. In den Suchergebnissen aufgetaucht, aber nicht relevant und daher hier ausgeschlossen.

---

## 5. Dienstleister aller Art

Eine erschöpfende Einzelaufstellung ist hier wenig sinnvoll (Hunderte Einträge, hohe Fluktuation). Stattdessen: Ankerpunkte + Verzeichnisse.

**Wochenmarkt:**
- Weißenseer Frischemarkt / Wochenmarkt Antonplatz — Di & Fr 9–18 Uhr, Do 11–16 Uhr (Street-Food) — Berliner Allee/Ecke Langhansstraße — [berlinecho.de](https://berlinecho.de/maerkte/wochenmarkt-antonplatz-weissensee/)

**Apotheken (Beispiele):**
- Weissenseer Apotheke, Schönstr. 5–7 — [weissenseer-apotheke.de](https://www.weissenseer-apotheke.de/)
- Rennbahn Apotheke, Rennbahnstraße 22–23 — Mo–Fr 08–18:30 — [rennbahn-apotheke.de](https://www.rennbahn-apotheke.de/)
- Apotheke am Weißen See — [apotheke-am-weissen-see.de](https://www.apotheke-am-weissen-see.de/)
- Dr. Bäder & Dr. Kemmritz Apotheken — Mo–Fr 08:30–19, Sa 08:30–13 — [bk-apo.de](https://bk-apo.de/)

**Verzeichnisse/Branchenbücher (für Handwerk, Gastronomie, Gesundheit, Beauty etc.):**
- [Branchenbuch Weißensee – meinestadt.de](https://branchenbuch.meinestadt.de/weissensee)
- [golocal.de – Handwerker Weißensee](https://www.golocal.de/berlin-weissensee/handwerker/)
- [Das Örtliche – Weißensee](https://www.dasoertliche.de/Themen/Vereine/Berlin-Wei%C3%9Fensee.html)
- [WEGWEISER aktuell – Weißensee](https://www.wegweiser-aktuell.de/berlin/21_weissensee_672_vereine-verbaende-organisationen.htm)

Notfall/Bereitschaft: Ärztlicher Bereitschaftsdienst bundesweit **116 117**.

---

## Technische Einschätzung für die Backend-Integration

- **Sofort ergiebig für `sources/`:**
  - `weissensee-kultur.de` — aktiver RSS-Feed (`/feed`), bündelt bereits mehrere Weißenseer Veranstalter. Mapping analog zum bestehenden Tiefgrund-Beispiel.
  - `brotfabrik-berlin.de` — läuft auf WordPress mit dem Plugin **The Events Calendar**; REST-API unter `wp-json/tribe/events/v1/events` liefert sauberes JSON (getestet, live abgerufen): pro Event u. a. `title`, `start_date`, `end_date`, `url` (Permalink), `description` (HTML), `venue` (Objekt inkl. `address`/`zip`), `organizer` (Objekt), Bild-URLs in mehreren Größen. Kein API-Key nötig. Mapping könnte fast 1:1 dem `berlin-de-veranstaltungen-pankow.example.json`-Muster folgen (Typ `json`, `itemsPath` auf die Ergebnisliste, `mapping.start`/`mapping.end` mit Format `2006-01-02 15:04:05`).
  - `freilichtbuehne-weissensee.de` — läuft auf **Events Manager Pro** (wp-events-plugin.com); die REST-API des Plugins (Namespace `events-manager/v1`) ist zwar in `/wp-json/` registriert, aber ohne öffentlich erreichbare `/events`-Route (nur ein Zahlungs-Gateway-Endpunkt sichtbar) — stattdessen liefert der eingebaute **iCal-Export unter `/events.ics`** (getestet, live abgerufen, ~36 Termine bis weit in den Herbst) sauberes Standard-ICS: `SUMMARY`, `DESCRIPTION`, `DTSTART`/`DTEND`, `CATEGORIES`, `URL`, `ATTACH` (Bild) und ein volles `LOCATION`-Feld mit Saalname + Adresse + PLZ (z. B. „Kleine Bühne, Große Seestraße 10, Berlin-Weißensee, 13086, Deutschland" – drei Spielstätten: Kleine Bühne, Große Bühne, Kinderbühne, alle an derselben Adresse). Bekannte Eigenart: `DTEND` ist in jedem geprüften Eintrag identisch mit `DTSTART` (keine echte Endzeit im Feed) – Enddatum müsste im Backend über eine Default-Dauer oder gar nicht befüllt werden. Für den Import bräuchte es entweder einen ICS-Parser (kein bestehender Typ im Repo – wäre ein vierter Source-Typ neben `rss`/`json`/`wcs`) oder einen handgeschriebenen Source wie bei `wcs.go`.
- **Bereits abgedeckt:** Tiefgrund (RSS), Familienzentrum (WCS), Berlin.de Pankow-API (JSON, `berlin-de-veranstaltungen-pankow.example.json`) — Achtung: der im Beispiel hinterlegte Endpunkt (`berlin.de/api/veranstaltungen?bezirk=pankow`) hat beim Testabruf **kein Ergebnis geliefert** (leere Antwort), müsste vor Aktivierung neu verifiziert werden (Parameter/URL evtl. veraltet). Unabhängig davon gilt: die API deckt den ganzen *Bezirk* Pankow ab (Prenzlauer Berg, Pankow, Weißensee, Buch, Karow, Blankenburg …), nicht nur den *Ortsteil* Weißensee — Filterung zwingend nötig, s. Abschnitt „Standort & Filterung" unten.
- **Peter Edel (`peteredel.de`, nicht `kbw.de`) — geprüft:** eigene Seite, läuft auf **Umbraco** (`.NET`-CMS, erkennbar an `/media/…`-Pfaden), nicht WordPress — entsprechend kein `/wp-json/`, kein `/events.ics`, keine RSS gefunden. `/events/` ist aber genau wie bei `stz-weissensee.de/veranstaltungen.html` **eine einzige statische HTML-Seite mit allen Terminen von Juli 2026 bis Mai 2027** am Stück (Monatsüberschrift → Datum → Bild → Titel+Link → Beschreibung → „Beginn & Einlass"/„Tickets"), gut scrapbar. Die Adresse steht sowohl im Seiten-Footer als auch auf jeder Event-Detailseite als Freitext („PETER EDEL, Berliner Allee 125, 13088 Berlin") — da Single-Venue-Quelle ist die Weißensee-Zugehörigkeit trivial (kein Filterbedarf), im Mapping einfach als `default`-Wert hinterlegbar wie bei Tiefgrund/Familienzentrum.
- **Prüfenswert, aber ohne erkennbaren Feed (HTML-Scraping oder Kontaktaufnahme nötig):** Kulturverein Weißensee, pankow-weissensee-prenzlauerberg.berlin (BID-Portal, evtl. eigene Struktur — lohnt einen Blick in den Seitenquelltext). Tipp: bei WordPress-Seiten immer zuerst `/wp-json/` (Namespaces wie `tribe`, `events-manager` etc.) und zusätzlich `/events.ics` bzw. `/?ical=1` prüfen, wie bei Brotfabrik und Freilichtbühne gefunden — bei Nicht-WordPress-Seiten (wie Peter Edel) bleibt meist nur HTML-Scraping.
- **Stadtteilzentrum Weißensee (Joomla + JEvents) — drei geprüfte Varianten:**
  1. **Tagesansicht** (`/component/jevents/eventsnachtag/{jahr}/{monat}/{tag}/{catids}.html?Itemid=563`): HTML, zeigt v. a. die wöchentlich wiederkehrenden **Kurse** (Tanzen, Keramik, Nähsalon …), bräuchte täglichen Durchlauf über viele Tages-URLs.
  2. **`/veranstaltungen.html` — beste Option:** eine einzige statische HTML-Seite, die beim Testabruf **alle „echten" Einzel-Veranstaltungen von Juli 2026 bis Januar 2027** (Blutspende des DRK, Quizabend, Elvis Club Berlin, MachArt-Markt, Konzerte, Feste …) am Stück enthält — kein JavaScript/Pagination nötig. Pro Termin wiederkehrendes Muster: Bild, `## Titel`, Kategorie-Link(s) (Vorträge/Feste/Bühne/Workshops/Tanz/Nachbarschaftstreffen/Markt/Spielen), Uhrzeit, **fett gesetzter Ort**, Freitext-Beschreibung. Kein JSON-LD, aber die Regelmäßigkeit macht einen Regex-/HTML-Parser gut machbar (Muster: `wcs.go` im Repo als Vorbild für einen handgeschriebenen Source).
  3. **RSS-Endpunkt** `index.php?option=com_jevents&task=modlatest.rss&format=feed&type=rss&Itemid=495&modid=0`: Header bestätigen `Content-Type: application/rss+xml` — es ist ein echter JEvents-„Latest Events"-RSS-Feed (Quellcode: `component/site/views/modlatest/tmpl/rss.php`). Der Payload war beim Abruf zu klein/leer, um ihn mit den verfügbaren Tools als Text auszulesen (RSS-Content-Type wird als Binärdaten behandelt und nur bei großem Payload in eine lesbare Datei gespiegelt). Wichtiger Verdachtspunkt: **`modid=0` ist vermutlich keine echte Modul-ID** — laut JEvents-Doku hängt der Feed-Inhalt (Datumsfenster, Kategorie-Filter, Anzahl Einträge) am jeweiligen `modid` eines im Joomla-Backend angelegten „Latest Events"-Moduls; mit `modid=0` liefert der Feed vermutlich nichts Sinnvolles. Die echte Modul-ID steht normalerweise im RSS-Icon-Link auf der Live-Seite (per Browser-Devtools/„Seitenquelltext" prüfbar) oder ist beim Site-Betreiber zu erfragen. Falls eine gültige `modid` gefunden wird: Feed-Items enthalten laut Plugin-Code nur `title` (mit vorangestelltem Datum/Uhrzeit als Text, z. B. „13.07.2026 10:00 : Titel"), `link`, `description` (Intro-Text), `category` — **kein separates Orts-/Organizer-Feld** (im Plugin vorhanden, aber standardmäßig auskommentiert). Damit wäre selbst ein funktionierender Feed dünner als `/veranstaltungen.html`.
  - **Empfehlung:** `/veranstaltungen.html` als Quelle nehmen (Option 2), die RSS-Variante nur falls die echte `modid` auffindbar ist und Ort/Datum-Parsing aus dem Titel-String akzeptabel ist.
- **Öffentliche Einrichtungen & Spielplätze sind keine „Event"-Quellen** im Sinne von `internal/sources` — eher statische Referenzdaten (Adresse, Öffnungszeiten). Empfehlung: separates statisches JSON (z. B. `data/orte.json`) statt Event-Source-Config, falls das Frontend das anzeigen soll.
- **Vereine/Dienstleister:** am ehesten einzeln zu erschließen, sofern sie eigene Homepages mit Terminen haben (z. B. Kulturverein Weißensee, Kleingärtner-Bezirksverband); reine Branchenbücher taugen nicht als Fetch-Quelle, nur zur manuellen Recherche weiterer Kandidaten.

## Standort & Filterung auf Weißensee

Wichtige Anforderung: wir brauchen die **Location der Veranstaltung selbst** (nicht nur „Bezirk" oder „Anbieter"), sowohl zur Anzeige als auch um Aggregator-Quellen, die mehr als nur Weißensee abdecken, korrekt zu filtern.

**Korrektur:** Weißensee liegt in den Postleitzahlen **13086** und **13088** (13088 teilt sich Weißensee mit Hohenschönhausen). **13089 gehört zu Pankow (Ortsteil), nicht zu Weißensee** — das war in einer früheren Version dieses Dokuments falsch als Weißensee-PLZ gelistet und ist hier korrigiert. Für einen reinen PLZ-Filter reichen also `13086` + `13088`, wobei 13088 händisch nachfiltern kann (Straßenabschnitte, die zu Hohenschönhausen gehören).

Geprüfter Status pro Quelle:

- **Brotfabrik** (`wp-json/tribe/events/v1/events`) — strukturiertes Orts-Feld: **Ja**. Eigenes `venue`-Objekt pro Event mit `venue`, `address` (Caligariplatz 1), `city`, `zip` (**13086**, live verifiziert) — direkt per PLZ filterbar.
- **Freilichtbühne** (`/events.ics`) — strukturiertes Orts-Feld: **Ja**. ICS-`LOCATION`-Feld pro Termin mit Saalname, Straße, Stadtteil („Berlin-Weißensee") und **PLZ 13086** (live verifiziert, 3 Spielstätten, alle gleiche Adresse) — direkt per PLZ filterbar, sogar ohne Zusatzaufwand, da diese Quelle ohnehin nur einen Ort kennt.
- **Peter Edel** (`peteredel.de/events`) — strukturiertes Orts-Feld: **Nein, nur Freitext**. Adresse steht als Text im Footer/auf Detailseiten („Berliner Allee 125, 13088 Berlin"), aber Single-Venue-Quelle — kein Filterbedarf, da per Definition in Weißensee.
- **Berlin.de Pankow-API** (Beispiel-Config) — strukturiertes Orts-Feld: vorgesehen, aber unverifiziert. Mapping sieht `locationName`/`locationAddress` vor — Endpunkt selbst lieferte beim Test aber keine Antwort (s. o.), muss vor Nutzung neu geprüft werden. Falls funktionsfähig: Filterung über Adresse/PLZ zwingend, da API bezirksweit ist.
- **weissensee-kultur.de** (RSS) — strukturiertes Orts-Feld: **unklar/vermutlich nein**. Nutzt kein Events-Plugin mit eigener REST-Struktur (kein `tribe`-Namespace o. ä. in `/wp-json/` gefunden) — der Feed ist wahrscheinlich der normale WordPress-Beitrags-Feed (Titel/Beschreibung/Link), Ort dürfte nur als Freitext im Beschreibungstext stehen, wenn überhaupt. Muss am echten Feed-Inhalt geprüft werden, sobald der lesbar vorliegt (aktuell technisch nicht auslesbar, s. u.). Da die Seite ohnehin ausschließlich Weißensee-Events kuratiert, ist eine Ortsfilterung hier vermutlich weniger kritisch als die Ortsanzeige selbst.
- **Stadtteilzentrum** `/veranstaltungen.html` — strukturiertes Orts-Feld: **Ja, als Text**. Jeder Termin hat einen fett gesetzten Ort (z. B. „Stadtteilzentrum Weißensee, Pistoriusstraße 23", aber auch Ausreißer wie „FreiwilligenAgentur Pankow, Berliner Allee 124" — liegt an der Straße, die durch Weißensee verläuft, PLZ dort prüfen). Kein separates PLZ-Feld — Adresse müsste geparst/geocodiert werden.
- **Tiefgrund, Familienzentrum** (bestehende Beispiele) — strukturiertes Orts-Feld: Nein (fix hinterlegt). Single-Venue-Quellen — Ort ist im Mapping als `default`-Wert hinterlegt, da die Quelle ohnehin nur einen Ort kennt. Kein Filterproblem, da per Definition in Weißensee.

**Empfehlung fürs Backend:**
1. `model.Event` sollte ein strukturiertes Location-Feld führen (mind. `name`, `address`, idealerweise `zip`), nicht nur einen Freitext-String — genau das sieht die bestehende Mapping-Syntax (`locationName`/`locationAddress`) ja schon vor.
2. Als Filterregel: PLZ `13086`/`13088` als primäres Kriterium, ergänzt um eine kleine Allowlist bekannter Weißensee-Straßen/Orte (aus der Venue-Liste in Kategorie 1 dieses Dokuments) für Fälle, in denen eine Quelle keine PLZ liefert oder eine Adresse an der Ortsteilgrenze liegt (Berliner Allee, Prenzlauer Promenade u. ä.).
3. Bei Aggregator-Quellen ohne PLZ (z. B. falls weissensee-kultur.de sich als reiner Text-Feed bestätigt) reicht ggf. Vertrauen in die redaktionelle Kuratierung der Quelle selbst, sollte aber im Zweifel stichprobenartig gegengeprüft werden.
4. Mit dem Freilichtbühnen-Fund lohnt sich ein vierter generischer Source-Typ `ical` (neben `rss`/`json`/`wcs`) — Events Manager Pro ist ein verbreitetes Plugin, es ist plausibel, dass weitere noch ungeprüfte Weißenseer Seiten ebenfalls über `/events.ics` oder `/?ical=1` exportieren (lohnt sich als Standard-Check bei jeder neuen WordPress-Quelle). Das `LOCATION`-Feld im ICS-Standard ist ein einzelner String (kein getrenntes Adress-/PLZ-Feld) — für den PLZ-Filter müsste die 5-stellige Zahl per Regex aus dem String extrahiert werden.

## Nächste Schritte (Vorschlag)
1. `weissensee-kultur.de/feed` strukturell prüfen (Felder, Kategorien) und als aktive Source-Config anlegen.
2. Kulturverein Weißensee / pankow-weissensee-prenzlauerberg.berlin auf HTML-Struktur bzw. versteckte APIs prüfen (Netzwerk-Tab). Peter Edel, Freilichtbühne und Brotfabrik sind bereits geprüft (s. o.).
3. Entscheiden, ob „Orte" (Spielplätze, öffentliche Einrichtungen) als eigener Datentyp ins Frontend sollen — falls ja, Datenmodell dafür festlegen.
4. Vereins-/Dienstleisterliste nur bei Bedarf vertiefen (aktuell nur Grundabdeckung).
5. Berlin.de-Pankow-Endpunkt neu verifizieren (aktuell keine Antwort) und, falls funktionsfähig, PLZ-/Adressfilter auf Weißensee (13086/13088 + Straßen-Allowlist) ergänzen.
6. Location-Datenmodell im Backend prüfen: strukturiertes Feld (`name`/`address`/`zip`) statt Freitext, damit die Weißensee-Filterung konsistent über alle Quellen funktioniert.
