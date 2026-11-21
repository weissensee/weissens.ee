# Weißensee: Quellen-Bestandsaufnahme

Ehrlicher Stand, keine Wunschliste. Format/Vorgehen (ortsunabhängig)
siehe `docs/source-discovery.md` im Kern-Repo openLitfass.

## Aktiv

| Quelle | Typ | Seit | Status |
|---|---|---|---|
| Familienzentrum Weißensee (Kurskalender, "Weekly Class Schedule"-Plugin) | `wcs` | 20.11.2026 | `sources/familienzentrum-weissensee.json`; erster Lauf 95 Termine (4 Wochen voraus). Kategorie-IDs 27/28/29/30, siehe Kern-Doku `docs/backend.md` → "wcs-Quellen". Etwa die Hälfte landet über `categoryMap` (austausch, beratung) in "Unkategorisiert". |
| Brotfabrik (Kino, Bühne, Galerie, Kurse) | `json` | 20.11.2026 | `sources/brotfabrik.json`; WordPress "The Events Calendar", REST-API `wp-json/tribe/events/v1/events`, paginiert (`next_rest_url`). Erster Lauf 192 Termine in 30 Tagen, alle Kategorien per `categoryMap` auf "Kultur". Venue mit PLZ 13086. |
| Freilichtbühne Weißensee | `ical` | 20.11.2026 | `sources/freilichtbuehne-weissensee.json`; Events-Manager-Export `/events.ics` mit strukturiertem Ort (Bühne + Adresse, PLZ 13086). Keine Endzeiten im Feed (DTEND = DTSTART), daher nur Beginn. Saisonbetrieb: im November nur 1 Termin (Juli 2027), daher `daysAhead` 270. |
| Stadtteilzentrum Weißensee (FreiZeitHaus e.V.) | `html` | 20.11.2026 | `sources/stadtteilzentrum-weissensee.json`; Joomla/JEvents-Liste `/veranstaltungen.html`, rund 2 Monate voraus (35 Termine). Kein Feed brauchbar (JEvents-RSS liefert fest nur 5 Einträge). Keine Einzel-Links pro Termin, daher verlinkt jeder Termin auf die Liste. Preis per Regex aus "Kosten:/Eintritt:" im Text ("Eintritt: frei" bleibt unbekannt). Absagen im Titel ("ENTFÄLLT - …") setzen das Abgesagt-Kennzeichen, der Titel bleibt unverändert. |
| Bildungs- und Kulturzentrum Peter Edel | `html` | 20.11.2026 | `sources/peter-edel.json`; Umbraco-Seite `/events/`, Termine bis Oktober 2027 (41 im 120-Tage-Fenster). Datum ohne Jahr ("FR | 20.11."), Jahr wird ergänzt. Uhrzeit "Beginn", sonst "Einlass". Preis aus der Ticketspalte ("Ab 27,00€", "Eintritt frei!"). Links teils auf externe Ticketshops. Titel werden 1:1 übernommen; "[VERSCHOBEN!]" kennzeichnet den alten Termin als abgesagt, "AUSVERKAUFT!" u.ä. bleiben nur im Titel. |
| KuBiZ Raoul Wallenberg (Kultur- und Bildungszentrum) | `rss` | 21.11.2026 | `sources/kubiz-wallenberg.json`; WordPress ohne "schöne" URLs (`?p=…`), daher Feed über `?feed=rss2` (REST entsprechend über `?rest_route=`, nicht `/feed/` bzw. `/wp-json/`). Der Feed hat den vollen Beitragstext (`content:encoded`). Datum vorn im Titel ("21.11.26 jazz im kubiz: …"), Uhrzeit und Raum in der ersten Zeile des Textes ("20 Uhr, Aula") – per `template` + `regex` zusammengesetzt. Beiträge ohne Datum im Titel fallen weg. `/rss.xml` ist nur eine SEO-Sitemap (All in One SEO) ohne Uhrzeiten. Sichtbare Plugins: All in One SEO, announcer, gdpr-cookie-compliance, simply-gallery-block – kein Termin-Plugin. Der Feed hat die letzten 10 Beiträge; Termine werden meist kurz vorher eingestellt (21.11.: 1 kommender Termin). Regelmäßige Termine (Fahrradwerkstatt, Umsonstladen, Offener Garten) nur in der Seitenleiste, nicht übernommen. |
| Kino Toni (Antonplatz) | `html` | 21.11.2026 | `sources/kino-toni.json`; WordPress mit eigenem Theme/Plugin `imkinoberlin` (Verbund Berliner Kinos). **Keine Feeds:** `/feed/`, `/feed/atom/`, `/film/feed/` sind leer, REST-API verlangt Anmeldung (401), kein JSON-LD. Programm auf `/programm/` als Widget: Datumsüberschrift `h3.program_date1`, danach je Vorstellung `div.program_entry` ("12:45 Emil und die Detektive") – daher `sectionSelector` (Kern b2f96a1). Erster Lauf 53 Vorstellungen bis Februar 2027. Links im Programm sind `/film/<titel>/<vorstellungs-id>` und öffnen den Ticketkauf; per `regex` auf `/film/<titel>` gekürzt = Filmseite mit Beschreibung. Tickets über kinoheld.de; Preise nicht im Programm. Letterboxd-Profil des Verbunds (`letterboxd.com/imkinoberlin`, RSS `/rss/`, befüllt vom Plugin `imkinoberlin-tools`): Tagebuch-Kurzkritiken des Teams und Listen ("Now Showing", Reihen wie "Toni Filmclub") ohne Spielzeiten – als Terminquelle ungeeignet, Kritiken sind Meinungstexte und werden nicht übernommen. Andere `imkinoberlin`-Kinos dürften mit derselben Quelldatei (nur URL/Adresse ändern) funktionieren. |
| Theater im Delphi (Gustav-Adolf-Straße 2) | `html` | 21.11.2026 | `sources/theater-im-delphi.json`; gefunden über berlin.de (s. u.). WordPress, Feed enthält nur Blogbeiträge, kein Termin-JSON-LD. Programm `/programm/` als Tabelle `table.program_table`, je Termin eine Zeile (Tag + Wochentag, Uhrzeit, Titel, Anrisstext, Sparte, Ticketlink); Monat/Jahr aus der Überschrift `h2.month` per `sectionSelector`. Datumsformat `2. Jan 2006` (deutsche Monatsnamen werden zu englischen Kürzeln übersetzt). Erster Lauf 35 Termine im 120-Tage-Fenster (37 bis April 2027). Preise nur in HTML-Kommentaren, nicht übernommen. Das WordPress der Seite hat keine Termindaten (nur Yoast, Mailchimp, Safe SVG; keine Termin-Erweiterung, kein eigener Beitragstyp) – das Programm ist ein eigenes PHP-Skript außerhalb von WordPress (`/programm/index.php?prod=…`) ohne RSS/iCal. |
| Wolfdietrich-Schnurre-Bibliothek (Bizetstraße 41, Stadtbibliothek Pankow) | `ical` | 21.11.2026 | `sources/wolfdietrich-schnurre-bibliothek.json`; gefunden über visitBerlin (s. u.). Termine im **Veranstaltungskalender des Landes Berlin**, Orts-ID 40313: iCal `berlin.de/land/kalender/index.php?ics&v_ort=40313` (auch RSS mit `?rss`). 370 Termine bis Nov. 2027, daher `daysAhead` 60 (83 Termine). Export ohne LOCATION/CATEGORIES/URL → `locationDefault`, Kategorie per `categoryMap` `"" → Kultur`. Serien haben eine gemeinsame UID ohne RRULE – brauchte Kern-Fix (eigene ID je Termin). Andere Pankower Bibliotheken/Einrichtungen lassen sich genauso über ihre `v_ort`-ID anbinden. |

## Gefunden — startklar

*(derzeit keine weitere)*

## Gefunden — braucht eigenen Parser

*(derzeit keine)*

## Nicht machbar (derzeit)

| Quelle | Geprüft | Befund |
|---|---|---|
| weissensee-kultur.de ("Weißenseer Kultursommer") | 20.11.2026 | WordPress mit **Modern Events Calendar (MEC)**. RSS-Feed `/feed/` ist leer (keine Items). MEC-REST-API `wp-json/mec/v1/events` liefert `[]`, auch mit `start_date`. `wp-json/wp/v2/mec-events` listet zwar Termin-Beiträge (zuletzt Ende September 2026), aber ohne Termindaten (nur Veröffentlichungsdatum). Kein iCal-Feed (`?mec-ical-feed=1` liefert HTML). Einzelne Termin-Seiten antworten mit HTTP 500. **Nachtrag (Browser):** Die Programmseite `/programm/` lädt Monate per `POST /wp-admin/admin-ajax.php` (`action=mec_tile_load_month`, Shortcode `atts[id]=375`); die Antwort enthält je Termin einen schema.org-Event-Block (JSON-LD) mit Start, Ort+Adresse, Preis, URL. Der Server liefert aber unabhängig vom angefragten Monat immer nur den nächsten Monat mit Terminen. Derzeit 1 Termin (Advents-Umzug 17.12.), **von Hand als Inbox-Eintrag übernommen**. Idee für später: generischer Quelltyp `jsonld` (schema.org-Events aus Seiten/Antworten). Saisonal (Kultursommer): **im Frühjahr erneut prüfen**; ggf. beim Betreiber nach dem MEC-iCal-Export fragen. |

## Fundgruben (keine eigene Quelle)

| Seite | Geprüft | Befund |
|---|---|---|
| berlin.de Stadtteil Weißensee, `/special/stadtteile/weissensee/veranstaltungen/` | 21.11.2026 | Bewusst **nicht als Quelle** genutzt, nur zum Finden von Veranstaltern. Zeigt die nächsten 12 Termine aus dem berlin.de-Ticketangebot (JSON-LD, Zeiten in UTC) – Brotfabrik, Peter Edel (haben wir direkt) und Theater im Delphi (jetzt eigene Quelle). `index.rss`: 7 redaktionelle Einträge ohne Termindatum. Davon: Nachbarschaftsfest = Stadtteilzentrum (haben wir), Klavierfest (haben wir), Adventsbasar der Albert-Schweitzer-Stiftung (Bahnhofstraße 32, 13129 – Blankenburg) und Blankenburger Weihnachtsfest liegen außerhalb Weißensees. |
| pankow-weissensee-prenzlauerberg.berlin/de/events (TIC Berlin) | 21.11.2026 | Nur ein Iframe auf **visitberlin.de/de/events-pankow** (ganzer Bezirk, ~67 Orte). Per Postleitzahl geprüft: in Weißensee (13086/13088) nur Brotfabrik, Theater im Delphi, KuBiZ (haben wir) und die Wolfdietrich-Schnurre-Bibliothek (jetzt eigene Quelle). "Familienzentrum Parkstraße" ist 13187 Pankow. |
| Fever, `feverup.com/de/berlin/venue/freilichtbuhne-weissensee`, Abschnitt "Veranstaltungsorte nahe Freilichtbühne Weißensee" | 21.11.2026 | Ticketplattform. Die nahen Orte: Theater im Delphi (2,2 km, haben wir), Colosseum (Gleimstraße), Käthe-Kollwitz-Denkmal, Berlin on Bike (Kulturbrauerei), Frannz-Club, Cosmic Comedy Club (alle Prenzlauer Berg), Computerspielemuseum (Friedrichshain), Weltzeituhr / Hop-on-Hop-off (Alexanderplatz) – außer dem Delphi keiner in Weißensee, also nichts Neues. Das Delphi-Angebot auf Fever ("Ballet of Lights: Cinderella") ist über unsere Delphi-Quelle schon drin. |

## Websuche 21.11.2026 – Kandidaten

| Kandidat | Befund | Aufwand |
|---|---|---|
| Landeskalender, weitere Weißenseer Orte | Orte mit Terminen (Ortsauswahl auf `berlin.de/land/kalender`): Immanuel-Kapelle `v_ort=40648` (Weihnachtskonzert 11.12.), Musikschule Béla Bartók Standort Weißensee `44135` (Schnuppertag 23.1.), Pfarrkirche Weißensee `44527` ("Alte Musik" 22.11.), Rathaus Weißensee `33144` (Rathauskonzerte Kammerorchester Weißensee). Je Ort ein iCal (`?ics&v_ort=…`), mehrere Orte pro Abfrage gehen nicht. Wenige Termine, aber echt. | gering: je Ort eine `ical`-Datei wie die Bibliothek |
| weißensee kunsthochschule berlin (`kh-berlin.de/kalender`) | TYPO3, kein Feed; Kalender als hCalendar-Mikroformat (`.vevent`, `.dtstart`, `.summary`, `.location`, Kategorie) mit 12 Einträgen. Mischt Termine am Campus/Kunsthalle am Hamburger Platz (Gustav-Adolf-Str. 140) mit externen Orten (z. B. Deutsche Kinemathek) und mehrmonatigen Ausstellungen; kein Enddatum im Markup. | mittel: `html`, bräuchte Ortsfilter |
| Rugby Klub 03 Berlin (Stadion Buschallee, Hansastraße 190) | Kalender `/de/calendar/` (Next.js) zeigt Heimspiele "in der Buschallee", Termine werden aber per JavaScript nachgeladen, nicht im HTML/RSC-Datenstrom. Kein iCal gefunden. | offen: Verein nach Export fragen |
| Weißenseer FC (Stadion Buschallee) | Eigene Seite ist ein fast leeres WordPress. Spielpläne liegen bei fussball.de (Vereins-/Mannschaftsseiten mit Spielplan-Export), Vereins-ID noch nicht gefunden. | mittel |
| Strandbad Weißensee | Saisonbetrieb (Mai–Sept.), Öffnungszeiten je nach Quelle widersprüchlich, keine Betreiberseite mit Terminen gefunden. | im Frühjahr prüfen |
| Tommys turbulente Tobewelt (Indoor-Spielplatz) | Kommerziell, nur Öffnungszeiten. | ggf. wie Knirpsenfarm als `repeat`-Inbox |
| Ev. Kirchengemeinde Weißensee (Bethanienkirche) | Keine Website mit Terminen gefunden. | offen |

## Noch zu prüfen

Kandidaten, die laut Discovery-Playbook (Vereine, Kirchengemeinden, Schulen,
Sportvereine, Kiezzeitungen) vielversprechend wären, aber noch nicht
gesucht/getestet sind:

- [ ] Bezirksamt Pankow — zentraler Veranstaltungskalender (ggf. mit
      Filter auf Weißensee/Ortsteil, siehe `berlin.de`-API-Muster)
- [ ] Kulturzentrum/soziokulturelle Zentren in Weißensee (z.B. rund um
      Antonplatz, Pistoriusplatz) — nach ICS/RSS-Export suchen
- [ ] Kirchengemeinden Weißensee (evangelisch/katholisch) — Gemeindekalender
- [ ] Sportvereine (Boule, Fußball, Schwimmen — Volkspark/Weißer See als
      Ankerpunkte)
- [ ] Vereine rund um den Weißen See (Parkbühne, Naturschutz/NABU-Ortsgruppe)
- [ ] Kiezzeitung/Nachbarschaftsinitiative Weißensee (Newsletter, Website)
- [ ] Repair-Café, Second-Hand-/Tauschinitiativen
- [ ] Familienzentrum Weißensee — RSS/News-Bereich zusätzlich zum
      Kurskalender (falls es einen gibt, z.B. für Einzelveranstaltungen wie
      das Familienfrühstück außerhalb des regulären Wochenplans)

## Hinweis zu den früheren Beispiel-Dateien

`kulturzentrum-tiefgrund.example.json` und
`berlin-de-veranstaltungen-pankow.example.json` wurden beim Umbau auf
openLitfass entfernt (generische Vorlagen liegen jetzt im Kern unter
`example-instance/sources/`). Sie galten als illustrative Beispiele, nicht als
verifizierte Quellen. Achtung, Widerspruch: `quellenrecherche-weissensee.md`
führt `tiefgrund-berlin.de/events/feed` als echten RSS-Feed, und der
Berlin.de-Endpunkt lieferte beim Test nichts. Beide vor einer Aktivierung
nach Playbook neu prüfen.
