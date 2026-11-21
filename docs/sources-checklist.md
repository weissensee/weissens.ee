# Weißensee: source inventory

This is an honest record of the current state, not a wish list. For the
location-independent approach, see
[Finding sources](https://github.com/schreibtischhelden/openlitfass/blob/main/docs/source-discovery.md)
in the openLitfass core repository.

## Active

| Source | Type | Since | Status |
|---|---|---|---|
| Familienzentrum Weißensee (family centre; course calendar, "Weekly Class Schedule" plugin) | `wcs` | 20 Nov 2026 | `sources/familienzentrum-weissensee.json`; first run 95 events (four weeks ahead). Category IDs 27/28/29/30, see the core documentation, `docs/backend.md` → "wcs sources". About half end up in "Unkategorisiert" via `categoryMap` (austausch, beratung). |
| Brotfabrik (cinema, stage, gallery, courses) | `json` | 20 Nov 2026 | `sources/brotfabrik.json`; WordPress "The Events Calendar", REST API `wp-json/tribe/events/v1/events`, paginated (`next_rest_url`). First run 192 events in 30 days, all categories mapped to "Kultur" via `categoryMap`. Venue with postcode 13086. |
| Freilichtbühne Weißensee (open-air stage) | `ical` | 20 Nov 2026 | `sources/freilichtbuehne-weissensee.json`; Events Manager export `/events.ics` with a structured location (stage and address, postcode 13086). No end times in the feed (DTEND = DTSTART), so only start times. Seasonal: in November only one event (July 2027), hence `daysAhead` 270. |
| Stadtteilzentrum Weißensee (neighbourhood centre, FreiZeitHaus e.V.) | `html` | 20 Nov 2026 | `sources/stadtteilzentrum-weissensee.json`; Joomla/JEvents list `/veranstaltungen.html`, about two months ahead (35 events). No usable feed (the JEvents RSS feed is fixed at five entries). No individual links per event, so each event links to the list. Price extracted by regex from "Kosten:/Eintritt:" in the text ("Eintritt: frei" remains unknown). Cancellations in the title ("ENTFÄLLT - …") set the cancelled flag; the title stays unchanged. |
| Bildungs- und Kulturzentrum Peter Edel (education and arts centre) | `html` | 20 Nov 2026 | `sources/peter-edel.json`; Umbraco site `/events/`, events until October 2027 (41 in the 120-day window). Dates without a year ("FR \| 20.11."); the year is added. Time from "Beginn" (start), otherwise "Einlass" (doors). Price from the ticket column ("Ab 27,00€", "Eintritt frei!"). Some links point to external ticket shops. Titles are taken over unchanged; "[VERSCHOBEN!]" (postponed) marks the original date as cancelled, while "AUSVERKAUFT!" (sold out) and similar notes remain in the title only. |
| KuBiZ Raoul Wallenberg (arts and education centre) | `rss` | 21 Nov 2026 | `sources/kubiz-wallenberg.json`; WordPress without "pretty" URLs (`?p=…`), so the feed is `?feed=rss2` (and the REST API correspondingly `?rest_route=`, not `/feed/` or `/wp-json/`). The feed contains the full post text (`content:encoded`). The date is at the start of the title ("21.11.26 jazz im kubiz: …"), the time and room in the first line of the text ("20 Uhr, Aula"); combined with `template` and `regex`. Posts without a date in the title are dropped. `/rss.xml` is only an SEO sitemap (All in One SEO) without times. Visible plugins: All in One SEO, announcer, gdpr-cookie-compliance, simply-gallery-block; no events plugin. The feed holds the last ten posts; events are usually published shortly beforehand (21 Nov: one upcoming event). Regular dates (bicycle workshop, free shop, open garden) appear only in the sidebar and are not included. |
| Kino Toni (cinema, Antonplatz) | `html` | 21 Nov 2026 | `sources/kino-toni.json`; WordPress with its own theme/plugin `imkinoberlin` (a network of Berlin cinemas). **No feeds:** `/feed/`, `/feed/atom/` and `/film/feed/` are empty, the REST API requires authentication (401), no JSON-LD. Programme on `/programm/` as a widget: date heading `h3.program_date1`, followed by one `div.program_entry` per screening ("12:45 Emil und die Detektive"), hence `sectionSelector` (core commit b2f96a1). First run 53 screenings until February 2027. Programme links are `/film/<title>/<screening-id>` and open the ticket purchase; shortened by `regex` to `/film/<title>`, the film page with a description. Tickets via kinoheld.de; no prices in the programme. The network's Letterboxd profile (`letterboxd.com/imkinoberlin`, RSS `/rss/`, populated by the plugin `imkinoberlin-tools`) contains the team's short diary reviews and lists ("Now Showing", series such as "Toni Filmclub") without showtimes; unsuitable as an event source, and reviews are opinion pieces and are not included. Other `imkinoberlin` cinemas are likely to work with the same source file (only URL and address changed). |
| Theater im Delphi (theatre, Gustav-Adolf-Straße 2) | `html` | 21 Nov 2026 | `sources/theater-im-delphi.json`; found via berlin.de (see below). WordPress; the feed contains only blog posts, no event JSON-LD. Programme `/programm/` as a table `table.program_table`, one row per event (day and weekday, time, title, teaser, genre, ticket link); month and year from the heading `h2.month` via `sectionSelector`. Date format `2. Jan 2006` (German month names are translated to English abbreviations). First run 35 events in the 120-day window (37 until April 2027). Prices only in HTML comments; not included. The site's WordPress holds no event data (only Yoast, Mailchimp, Safe SVG; no events extension, no custom post type): the programme is a separate PHP script outside WordPress (`/programm/index.php?prod=…`) without RSS or iCal. |
| Wolfdietrich-Schnurre-Bibliothek (library, Bizetstraße 41, Stadtbibliothek Pankow) | `ical` | 21 Nov 2026 | `sources/wolfdietrich-schnurre-bibliothek.json`; found via visitBerlin (see below). Events in the **events calendar of the State of Berlin**, venue ID 40313: iCal `berlin.de/land/kalender/index.php?ics&v_ort=40313` (also RSS with `?rss`). 370 events until November 2027, hence `daysAhead` 60 (83 events). Export without LOCATION/CATEGORIES/URL → `locationDefault`, category via `categoryMap` `"" → Kultur`. Series share one UID without RRULE; this required a core fix (one ID per event). Other libraries and institutions in Pankow can be connected the same way via their `v_ort` ID. |
| weißensee kunsthochschule berlin (art school) | `html` | 21 Nov 2026 | `sources/kunsthochschule-weissensee.json`; TYPO3 calendar `kh-berlin.de/kalender` as hCalendar (`li.vevent`). Date from `time.dtstart[datetime]` (the text contains "from – to"; a second, hidden `.dtstart` is one day off). The link to the detail page appears only in an HTML comment and is read with `html` + `regex`. Location split into name and address by regex. **Location filter** `include` (core commit a3a6a03): only Weißensee/Bühringstraße/Hamburger Platz/13086/13088, as the calendar contains much outside the area (Kinemathek, Zitadelle Spandau, …). The calendar has start dates only, so ongoing exhibitions that started in the past are dropped. First run: one event (ORIGINALE, Kunsthalle am Hamburger Platz). |

## Found: ready to connect

*(none at present)*

## Found: needs a custom parser

*(none at present)*

## Not feasible (at present)

| Source | Checked | Finding |
|---|---|---|
| weissensee-kultur.de ("Weißenseer Kultursommer") | 20 Nov 2026 | WordPress with **Modern Events Calendar (MEC)**. The RSS feed `/feed/` is empty (no items). The MEC REST API `wp-json/mec/v1/events` returns `[]`, also with `start_date`. `wp-json/wp/v2/mec-events` does list event posts (most recently end of September 2026), but without event data (only the publication date). No iCal feed (`?mec-ical-feed=1` returns HTML). Individual event pages respond with HTTP 500. **Addendum (browser):** the programme page `/programm/` loads months via `POST /wp-admin/admin-ajax.php` (`action=mec_tile_load_month`, shortcode `atts[id]=375`); the response contains a schema.org Event block (JSON-LD) per event with start, venue and address, price and URL. However, regardless of the requested month, the server always returns only the next month with events. Currently one event (Advent procession, 17 Dec), **added by hand as an inbox entry**. Idea for later: a generic source type `jsonld` (schema.org events from pages or responses). Seasonal (Kultursommer): **check again in spring**; possibly ask the operator about the MEC iCal export. |

## Discovery aids (not a source in their own right)

| Page | Checked | Finding |
|---|---|---|
| berlin.de Weißensee district page, `/special/stadtteile/weissensee/veranstaltungen/` | 21 Nov 2026 | Deliberately **not used as a source**, only for finding organisers. Shows the next twelve events from the berlin.de ticket offer (JSON-LD, times in UTC): Brotfabrik and Peter Edel (connected directly) and Theater im Delphi (now a source of its own). `index.rss`: seven editorial entries without event dates. Of these, the neighbourhood festival is the Stadtteilzentrum (connected) and the piano festival is connected; the Advent bazaar of the Albert-Schweitzer-Stiftung (Bahnhofstraße 32, 13129, Blankenburg) and the Blankenburg Christmas fair are outside Weißensee. |
| pankow-weissensee-prenzlauerberg.berlin/de/events (TIC Berlin) | 21 Nov 2026 | Only an iframe of **visitberlin.de/de/events-pankow** (the whole district, about 67 venues). Checked by postcode: in Weißensee (13086/13088) only Brotfabrik, Theater im Delphi, KuBiZ (all connected) and the Wolfdietrich-Schnurre-Bibliothek (now a source of its own). "Familienzentrum Parkstraße" is in 13187 Pankow. |
| Fever, `feverup.com/de/berlin/venue/freilichtbuhne-weissensee`, section "Veranstaltungsorte nahe Freilichtbühne Weißensee" | 21 Nov 2026 | Ticket platform. The nearby venues: Theater im Delphi (2.2 km, connected), Colosseum (Gleimstraße), Käthe-Kollwitz monument, Berlin on Bike (Kulturbrauerei), Frannz-Club, Cosmic Comedy Club (all Prenzlauer Berg), Computerspielemuseum (Friedrichshain), Weltzeituhr / hop-on hop-off (Alexanderplatz). Apart from the Delphi, none is in Weißensee, so nothing new. The Delphi production on Fever ("Ballet of Lights: Cinderella") is already included via our Delphi source. |

## Web search of 21 November 2026: candidates

| Candidate | Finding | Effort |
|---|---|---|
| State events calendar, further venues in Weißensee | Venues with events (venue selection on `berlin.de/land/kalender`): Immanuel-Kapelle `v_ort=40648` (Christmas concert 11 Dec), Musikschule Béla Bartók, Weißensee site `44135` (taster day 23 Jan), Pfarrkirche Weißensee `44527` ("Alte Musik" 22 Nov), Rathaus Weißensee `33144` (town hall concerts by the Kammerorchester Weißensee). One iCal feed per venue (`?ics&v_ort=…`); several venues per query are not possible. Few events, but genuine ones. | low: one `ical` file per venue, like the library |
| weißensee kunsthochschule berlin | → now a source of its own (see above) | done |
| Rugby Klub 03 Berlin (Stadion Buschallee, Hansastraße 190) | The calendar `/de/calendar/` (Next.js) shows home matches "in der Buschallee", but the dates are loaded by JavaScript and are not in the HTML or RSC data stream. No iCal found. | open: ask the club for an export |
| Weißenseer FC (Stadion Buschallee) | The club's own site is an almost empty WordPress. Fixtures are on fussball.de (club and team pages with fixture export); club ID not yet found. | medium |
| Strandbad Weißensee (lido) | Seasonal (May–September); opening hours contradict each other between sources; no operator page with dates found. | check in spring |
| Tommys turbulente Tobewelt (indoor playground) | Purely commercial; do not include. | – |
| Ev. Kirchengemeinde Weißensee (Protestant parish, Bethanienkirche) | No website with dates found. | open |

## Still to check

Candidates that would be promising according to the discovery playbook
(associations, parishes, schools, sports clubs, local newspapers) but have
not yet been searched for or tested:

- [ ] Bezirksamt Pankow (district office): central events calendar (possibly
      with a filter for the Weißensee locality, see the `berlin.de` API
      pattern)
- [ ] Arts and community centres in Weißensee (for example around Antonplatz
      and Pistoriusplatz): look for an ICS/RSS export
- [ ] Parishes in Weißensee (Protestant/Catholic): parish calendars
- [ ] Sports clubs (boules, football, swimming; Volkspark and Weißer See as
      anchor points)
- [ ] Associations around the Weißer See (Parkbühne, nature conservation,
      local NABU group)
- [ ] Local newspaper or neighbourhood initiative in Weißensee (newsletter,
      website)
- [ ] Repair café, second-hand and swap initiatives
- [ ] Familienzentrum Weißensee: RSS or news section in addition to the
      course calendar (if there is one, for example for one-off events such as
      the family breakfast outside the regular weekly schedule)

## Note on the former example files

`kulturzentrum-tiefgrund.example.json` and
`berlin-de-veranstaltungen-pankow.example.json` were removed during the
migration to openLitfass (generic templates now live in the core under
`example-instance/sources/`). They were illustrative examples, not verified
sources. Note the contradiction: [source-research.md](source-research.md)
lists `tiefgrund-berlin.de/events/feed` as a real RSS feed, and the berlin.de
endpoint returned nothing when tested. Both need to be checked again
following the playbook before being activated.
