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

## Gefunden — startklar

*(derzeit keine weitere)*

## Gefunden — braucht eigenen Parser

*(derzeit keine)*

## Nicht machbar (derzeit)

| Quelle | Geprüft | Befund |
|---|---|---|
| weissensee-kultur.de ("Weißenseer Kultursommer") | 20.11.2026 | WordPress mit **Modern Events Calendar (MEC)**. RSS-Feed `/feed/` ist leer (keine Items). MEC-REST-API `wp-json/mec/v1/events` liefert `[]`, auch mit `start_date`. `wp-json/wp/v2/mec-events` listet zwar Termin-Beiträge (zuletzt Ende September 2026), aber ohne Termindaten (nur Veröffentlichungsdatum). Kein iCal-Feed (`?mec-ical-feed=1` liefert HTML). Einzelne Termin-Seiten antworten mit HTTP 500. **Nachtrag (Browser):** Die Programmseite `/programm/` lädt Monate per `POST /wp-admin/admin-ajax.php` (`action=mec_tile_load_month`, Shortcode `atts[id]=375`); die Antwort enthält je Termin einen schema.org-Event-Block (JSON-LD) mit Start, Ort+Adresse, Preis, URL. Der Server liefert aber unabhängig vom angefragten Monat immer nur den nächsten Monat mit Terminen. Derzeit 1 Termin (Advents-Umzug 17.12.), **von Hand als Inbox-Eintrag übernommen**. Idee für später: generischer Quelltyp `jsonld` (schema.org-Events aus Seiten/Antworten). Saisonal (Kultursommer): **im Frühjahr erneut prüfen**; ggf. beim Betreiber nach dem MEC-iCal-Export fragen. |

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
