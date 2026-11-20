# Weißensee: Quellen-Bestandsaufnahme

Ehrlicher Stand, keine Wunschliste. Format/Vorgehen (ortsunabhängig)
siehe `docs/source-discovery.md` im Kern-Repo openLitfass.

## Aktiv

| Quelle | Typ | Seit | Status |
|---|---|---|---|
| Familienzentrum Weißensee (Kurskalender, "Weekly Class Schedule"-Plugin) | `wcs` | 20.11.2026 | `sources/familienzentrum-weissensee.json`; erster Lauf 95 Termine (4 Wochen voraus). Kategorie-IDs 27/28/29/30, siehe Kern-Doku `docs/backend.md` → "wcs-Quellen". Etwa die Hälfte landet über `categoryMap` (austausch, beratung) in "Unkategorisiert". |
| Brotfabrik (Kino, Bühne, Galerie, Kurse) | `json` | 20.11.2026 | `sources/brotfabrik.json`; WordPress "The Events Calendar", REST-API `wp-json/tribe/events/v1/events`, paginiert (`next_rest_url`). Erster Lauf 192 Termine in 30 Tagen, alle Kategorien per `categoryMap` auf "Kultur". Venue mit PLZ 13086. |

## Gefunden — startklar

*(derzeit keine weitere)*

## Gefunden — braucht eigenen Parser

*(noch keine)*

## Nicht machbar

*(noch keine geprüft)*

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
