# Source research: Weißensee (Berlin)

> **Snapshot of 13 July 2026.** This document records the initial research
> and is not kept up to date. Several statements have since been superseded
> (for example, there are now `ical` and `html` source types, and several of
> the sources below are connected). The current state is in
> [sources-checklist.md](sources-checklist.md).

Solid basic coverage per category (not an exhaustive list). Focus: sources
that are likely to provide structured, regularly updated data (homepage,
calendar, feed) usable for `weissens.ee` (front end) and `sources/`.

Note on the architecture at the time: the backend reads one JSON file per
source (`sources/*.json`) with the type `json`, `rss`, `wcs` or `generic`.
Templates for all source types are in the core
(`openlitfass/example-instance/sources/`); prepared here was
`familienzentrum-weissensee.example.json` (WCS). The sources found below are
marked accordingly where a feed or API is recognisable.

---

## 1. Venues

- **Bildungs- und Kulturzentrum Peter Edel** — Homepage: [peteredel.de](https://www.peteredel.de/) (use this site, not kbw.de). Calendar: [peteredel.de/events](https://www.peteredel.de/events/). Format: HTML, no feed or API (Umbraco CMS, not WordPress); details below.
- **Freilichtbühne Weißensee** — Homepage: [freilichtbuehne-weissensee.de](https://freilichtbuehne-weissensee.de/). Calendar: [events.ics](https://freilichtbuehne-weissensee.de/events.ics). Format: **best find: genuine iCal (Events Manager Pro)**, standard ICS with `SUMMARY`, `DESCRIPTION`, `DTSTART`, `CATEGORIES`, `URL`, image via `ATTACH` and a full `LOCATION` including postcode (see below).
- **Brotfabrik Berlin** (cinema, theatre, gallery, bar) — Homepage: [brotfabrik-berlin.de](https://brotfabrik-berlin.de/). Calendar: [wp-json/tribe/events/v1/events](https://brotfabrik-berlin.de/wp-json/tribe/events/v1/events). Format: **JSON API (The Events Calendar plugin)**; provides title, start_date, end_date, url, description (HTML), venue, organizer and images.
- **Kulturzentrum Tiefgrund** — Homepage: [tiefgrund-berlin.de](https://tiefgrund-berlin.de/). Calendar: [feed](https://tiefgrund-berlin.de/events/feed). Format: **RSS; already an example in the repository** at the time.
- **Familienzentrum Weißensee** — Homepage: [familienzentrum-weissensee.de](https://www.familienzentrum-weissensee.de). Format: **WCS; already an example in the repository** at the time.
- **Stadtteilzentrum Weissensee** (FreiZeitHaus e.V.) — Homepage: [stz-weissensee.de](https://www.stz-weissensee.de/). Calendar: [veranstaltungen.html](https://www.stz-weissensee.de/veranstaltungen.html) (best source, see below) or the [day view](https://www.stz-weissensee.de/component/jevents/eventsnachtag/2026/7/14/281,263,264,265,270,266,267,271,268,269,286,287.html?Itemid=563). Format: Joomla with the **JEvents** component. No clean ICS/JSON publicly available, but `/veranstaltungen.html` is an HTML page that is easy to scrape (see below).
- **weißensee-kultur.de** (neighbourhood initiative "Weißenseer Kultursommer") — Homepage: [weissensee-kultur.de](https://weissensee-kultur.de/). Calendar: [programme](https://weissensee-kultur.de/programm/). Format: **RSS available** (`/feed`); already collects events from several venues in Weißensee, so potentially a productive single source.
- **Kulturverein Weißensee e.V.** (Kaufmuseum, Berliner Allee) — Homepage: [kulturvereinweissensee.de](https://kulturvereinweissensee.de/). Calendar: on the homepage. Format: HTML, no recognisable feed.
- **Strandbad Weißensee** (summer events, beach bar) — Homepage: [strandbadweissensee.de](https://www.strandbadweissensee.de/). Format: HTML.
- **OC23 youth centre** — Homepage: [jup.berlin entry](https://jup.berlin/orte/jugendfreizeiteinrichtung-oc23) or [kinderring-berlin.org/oc23](https://www.kinderring-berlin.org/oc23/). Format: HTML.
- **Berlin.de district calendar Pankow** (including Weißensee) — Homepage: [berlin.de/land/kalender/?b=8](https://www.berlin.de/land/kalender/?b=8). Format: **JSON API; already an example in the repository** at the time; covers all of Pankow (filtering for Weißensee required).
- **pankow-weissensee-prenzlauerberg.berlin** (neighbourhood and business improvement district portal) — Homepage: [site](https://www.pankow-weissensee-prenzlauerberg.berlin/de/events). Format: HTML, possibly with its own events database; worth a technical check.

Further pure aggregator portals (not primary sources, but useful for cross-checking): [berlin.de/special/stadtteile/weissensee/veranstaltungen](https://www.berlin.de/special/stadtteile/weissensee/veranstaltungen/), [veranstaltungen.meinestadt.de/berlin-weissensee](https://veranstaltungen.meinestadt.de/berlin-weissensee), [berlin.city-map.de events](https://berlin.city-map.de/01100000/berlin/weissensee/events).

---

## 2. Public institutions (opening hours)

- **Bürgeramt Pankow (citizens' office), Weißensee site** — Berliner Allee 252–260, 13088 Berlin. Opening hours: Mon 08–15, Tue 11–18, Wed 08–14, Thu 11–18, Fri 08–13 (appointment only, bookable via 115). Source: [berlinstadtservice.de](https://www.berlinstadtservice.de/aemter-und_behoerden_berlin/buergeramt/Buergeramt_Pankow-Prenzlauer_Berg-Weissensee.html).
- **Wolfdietrich-Schnurre-Bibliothek** (library, Antonplatz) — Bizetstraße 41, 13088 Berlin. Opening hours: Mon 10–19, Tue 10–17, Wed 13–19, Thu 10–19, Fri 10–17, Sat/Sun 10–16. Source: [berlin.de Stadtbibliothek Pankow](https://www.berlin.de/stadtbibliothek-pankow/bibliotheken/wolfdietrich-schnurre-bibliothek/).
- **Strandbad Weißensee** (lido, Berliner Bäder-Betriebe) — Uferpromenade am Weißen See, 13088 Berlin. Opening hours: season May–August; May 13–19, June–August 10–20 (weather permitting). Source: [berlinerbaeder.de](https://www.berlinerbaeder.de/baeder/detail/strandbad-weissensee/).
- **Stadtteilzentrum Weißensee / FreiZeitHaus e.V.** (including a leisure centre for older people) — Pistoriusstr. 23, 13086 Berlin. Opening hours: Mon–Fri 09–18 (evening and weekend events by arrangement). Source: [hilfelotse-berlin.de](https://www.hilfelotse-berlin.de/detail/stadtteilzentrum-weissensee-freizeithaus-e-v).
- **OC23 youth centre** (ages 12–27) — Charlottenburger Str./Gäblerstr. area. Opening hours: Mon–Thu 14–20, Sun 12–18. Source: [jup.berlin](https://jup.berlin/orte/jugendfreizeiteinrichtung-oc23).
- **Kinder- und Jugendklub Maxim** (children's and youth club) — Charlottenburger Straße 117, 13086 Berlin (tel. 030 92376457). Source: [kauperts.de](https://berlin.kauperts.de/eintrag/Kinder-und-Jugendklub-Maxim-Charlottenburger-Strasse-117-13086-Berlin).
- **FiPP-Nische & FreiRaum** (children's and girls' club) — Source: [fippev.de](https://www.fippev.de/fipp-nischefreiraum).
- **Bildungszentrum Antonplatz** (library, VHS Pankow adult education centre, Musikschule Béla Bartók) — Antonplatz; opening hours differ by institution. Source: [berlin.de library](https://www.berlin.de/stadtbibliothek-pankow/bibliotheken/wolfdietrich-schnurre-bibliothek/).
- **Kita-Navigator / Kita-Suche Berlin** (nursery directories, not individual institutions) — [kita-navigator.berlin.de](https://kita-navigator.berlin.de/), [kita-suche.berlin](https://kita-suche.berlin/).
- **Primary schools in Weißensee** (including Picasso-Grundschule and Grundschule an der Rennbahn) — Gounodstr. 71 / Rennbahnstr. 45. Source: [gemeinschaftsschulen-berlin.de](https://www.gemeinschaftsschulen-berlin.de/grundschulen/ortsteil/weissensee).

---

## 3. Playgrounds

Mentioned, among others: Großer Spielplatz am Weißensee, Plantsche am Weißen See, Parkstraße, Mahlerstraße, Tassostraße, Fuchsspielplatz, Wackelhaus-Spielplatz, Borodin-Spielplatz, Lehderstraße and the playground on Pistoriusstraße (more than 40 playgrounds in the locality in total).

Primary sources for a complete list with exact addresses:
- [berlin.de – playgrounds in Weißensee](https://www.berlin.de/adressen/spielplatz/district/weissensee/) (official directory)
- [spielplatztreff.de – Weißensee](https://www.spielplatztreff.de/spielplaetze/berlin_wei%C3%9Fensee) (with ratings and photos)
- [spielplatznet.de – Weißensee](https://spielplatznet.de/spielplaetze/Berlin/Wei%C3%9Fensee)

Note: playgrounds do not have "events" in the strict sense; they are relevant as a static list of places (for example a separate JSON file in `data/`) rather than as an event source. See [places.md](places.md).

---

## 4. Associations and clubs

- **Kulturverein Weißensee e.V.** — culture (Kaufmuseum, Berliner Allee). Homepage: [kulturvereinweissensee.de](https://kulturvereinweissensee.de/). Concerts, readings, intercultural formats.
- **Bezirksverband der Kleingärtner Berlin-Weißensee e.V.** — allotments (umbrella association, 28 sites). Homepage: [kleingaertner-weissensee.de](https://www.kleingaertner-weissensee.de/), including a [list of associations](https://www.kleingaertner-weissensee.de/Vereine/VereineListe.html).
- **KGA „Frieden" e.V.** — allotments, single site. Homepage: [kga-frieden.de](http://www.kga-frieden.de/).
- **Kleingartenverein Hansastraße** — allotments, single site. Homepage: [kleingaertner-weissensee-hansastrasse.de](http://www.kleingaertner-weissensee-hansastrasse.de/).
- **SV Preußen Berlin** — children's and youth sport (Hohenschönhausen/Weißensee/Pankow), founded in 1990.
- **Tennis-Club Berlin-Weißensee** — sport; can be found in business directories.
- **Berliner SV 63 „Chemie" Weißensee** — sport; can be found in business directories.
- **Weißenseer Sportverein „Rot-Weiß"** — sport; can be found in business directories.
- **SV Weißensee** — football. [BFV entry](https://www.bfv.de/vereine/sv-weissensee/00ES8GNJFC00000NVV0AG08LVUPGND5I) (association profile).
- **Familienzentrum Weißensee** — family, courses. Homepage: [familienzentrum-weissensee.de](https://www.familienzentrum-weissensee.de) (see category 1; already a source in the repository).

Directories for further or current associations: [WEGWEISER aktuell – associations in Weißensee](https://www.wegweiser-aktuell.de/berlin/21_weissensee_672_vereine-verbaende-organisationen.htm), [city-map.de – associations in Weißensee](https://berlin.city-map.de/01100000/berlin/weissensee/vereine), [Das Örtliche – associations in Weißensee](https://www.dasoertliche.de/Themen/Vereine/Berlin-Wei%C3%9Fensee.html).

Caution: `weissensee.de` (with a "Bürger & Stadt" section) is the town of **Weißensee in Thuringia**, not the Berlin locality. It appeared in the search results but is not relevant and is therefore excluded here.

---

## 5. Service providers of all kinds

An exhaustive list is of little use here (hundreds of entries, high turnover). Instead: anchor points and directories.

**Weekly market:**
- Weißenseer Frischemarkt / Wochenmarkt Antonplatz — Tue and Fri 9–18, Thu 11–16 (street food) — Berliner Allee, corner of Langhansstraße — [berlinecho.de](https://berlinecho.de/maerkte/wochenmarkt-antonplatz-weissensee/)

**Pharmacies (examples):**
- Weissenseer Apotheke, Schönstr. 5–7 — [weissenseer-apotheke.de](https://www.weissenseer-apotheke.de/)
- Rennbahn Apotheke, Rennbahnstraße 22–23 — Mon–Fri 08–18:30 — [rennbahn-apotheke.de](https://www.rennbahn-apotheke.de/)
- Apotheke am Weißen See — [apotheke-am-weissen-see.de](https://www.apotheke-am-weissen-see.de/)
- Dr. Bäder & Dr. Kemmritz Apotheken — Mon–Fri 08:30–19, Sat 08:30–13 — [bk-apo.de](https://bk-apo.de/)

**Directories (for trades, gastronomy, health, beauty, etc.):**
- [Branchenbuch Weißensee – meinestadt.de](https://branchenbuch.meinestadt.de/weissensee)
- [golocal.de – tradespeople in Weißensee](https://www.golocal.de/berlin-weissensee/handwerker/)
- [Das Örtliche – Weißensee](https://www.dasoertliche.de/Themen/Vereine/Berlin-Wei%C3%9Fensee.html)
- [WEGWEISER aktuell – Weißensee](https://www.wegweiser-aktuell.de/berlin/21_weissensee_672_vereine-verbaende-organisationen.htm)

Emergencies and out-of-hours medical service: the nationwide on-call medical service is **116 117**.

---

## Technical assessment for backend integration

- **Immediately productive for `sources/`:**
  - `weissensee-kultur.de` — active RSS feed (`/feed`), already aggregates several organisers in Weißensee. Mapping analogous to the existing Tiefgrund example.
  - `brotfabrik-berlin.de` — runs on WordPress with the **The Events Calendar** plugin; the REST API at `wp-json/tribe/events/v1/events` returns clean JSON (tested, fetched live): per event, among other things, `title`, `start_date`, `end_date`, `url` (permalink), `description` (HTML), `venue` (object including `address`/`zip`), `organizer` (object) and image URLs in several sizes. No API key required. The mapping could follow the `berlin-de-veranstaltungen-pankow.example.json` pattern almost one to one (type `json`, `itemsPath` pointing to the result list, `mapping.start`/`mapping.end` with format `2006-01-02 15:04:05`).
  - `freilichtbuehne-weissensee.de` — runs on **Events Manager Pro** (wp-events-plugin.com). The plugin's REST API (namespace `events-manager/v1`) is registered in `/wp-json/`, but without a publicly accessible `/events` route (only a payment gateway endpoint is visible). Instead, the built-in **iCal export at `/events.ics`** (tested, fetched live, about 36 events well into the autumn) returns clean standard ICS: `SUMMARY`, `DESCRIPTION`, `DTSTART`/`DTEND`, `CATEGORIES`, `URL`, `ATTACH` (image) and a full `LOCATION` field with stage name, address and postcode (for example "Kleine Bühne, Große Seestraße 10, Berlin-Weißensee, 13086, Deutschland"; three stages, Kleine Bühne, Große Bühne and Kinderbühne, all at the same address). Known quirk: `DTEND` is identical to `DTSTART` in every entry checked (no real end time in the feed), so the end would have to be filled in by the backend with a default duration, or not at all. Importing it would require either an ICS parser (no existing type in the repository at the time; it would be a fourth source type next to `rss`/`json`/`wcs`) or a hand-written source as with `wcs.go`.
- **Already covered:** Tiefgrund (RSS), Familienzentrum (WCS), Berlin.de Pankow API (JSON, `berlin-de-veranstaltungen-pankow.example.json`). Caution: the endpoint stored in the example (`berlin.de/api/veranstaltungen?bezirk=pankow`) **returned no result** when tested (empty response) and would need to be verified again before activation (parameters or URL possibly outdated). Regardless of this, the API covers the whole *district* of Pankow (Prenzlauer Berg, Pankow, Weißensee, Buch, Karow, Blankenburg, …), not just the *locality* of Weißensee, so filtering is essential; see [Location and filtering](#location-and-filtering-for-weißensee) below.
- **Peter Edel (`peteredel.de`, not `kbw.de`), checked:** its own site, running on **Umbraco** (a .NET CMS, recognisable by its `/media/…` paths), not WordPress; accordingly no `/wp-json/`, no `/events.ics` and no RSS found. However, like `stz-weissensee.de/veranstaltungen.html`, `/events/` is **a single static HTML page with all events from July 2026 to May 2027** in one go (month heading → date → image → title and link → description → "Beginn & Einlass"/"Tickets"), easy to scrape. The address appears as free text both in the page footer and on every event detail page ("PETER EDEL, Berliner Allee 125, 13088 Berlin"). As a single-venue source, its location in Weißensee is trivial (no filtering needed); it can simply be set as a `default` value in the mapping, as for Tiefgrund and Familienzentrum.
- **Worth checking, but without a recognisable feed (HTML scraping or contacting the operator required):** Kulturverein Weißensee, pankow-weissensee-prenzlauerberg.berlin (BID portal, possibly with its own structure; worth looking at the page source). Tip: for WordPress sites, always check `/wp-json/` first (namespaces such as `tribe`, `events-manager`, etc.) and also `/events.ics` or `/?ical=1`, as found with Brotfabrik and Freilichtbühne. For non-WordPress sites (such as Peter Edel), HTML scraping is usually the only option.
- **Stadtteilzentrum Weißensee (Joomla with JEvents), three variants checked:**
  1. **Day view** (`/component/jevents/eventsnachtag/{year}/{month}/{day}/{catids}.html?Itemid=563`): HTML, shows mainly the weekly recurring **courses** (dancing, ceramics, sewing salon, …); would require a daily pass over many day URLs.
  2. **`/veranstaltungen.html`, the best option:** a single static HTML page which, when tested, contained **all "real" one-off events from July 2026 to January 2027** (German Red Cross blood donation, quiz night, Elvis Club Berlin, MachArt market, concerts, festivals, …) in one go; no JavaScript or pagination required. A recurring pattern per event: image, `## Title`, category link(s) (talks/festivals/stage/workshops/dance/neighbourhood meetings/market/games), time, **location in bold**, free-text description. No JSON-LD, but the regularity makes a regex or HTML parser quite feasible (pattern: `wcs.go` in the repository as a model for a hand-written source).
  3. **RSS endpoint** `index.php?option=com_jevents&task=modlatest.rss&format=feed&type=rss&Itemid=495&modid=0`: the headers confirm `Content-Type: application/rss+xml`, so it is a genuine JEvents "Latest Events" RSS feed (source code: `component/site/views/modlatest/tmpl/rss.php`). When fetched, the payload was too small or empty to be read as text with the tools available (an RSS content type is treated as binary data and only mirrored to a readable file for large payloads). Important suspicion: **`modid=0` is probably not a real module ID**. According to the JEvents documentation, the feed content (date window, category filter, number of entries) depends on the `modid` of a "Latest Events" module created in the Joomla back end; with `modid=0` the feed probably returns nothing useful. The real module ID normally appears in the RSS icon link on the live page (can be checked with the browser's developer tools or "view page source") or can be requested from the site operator. If a valid `modid` is found: according to the plugin code, feed items contain only `title` (prefixed with date and time as text, for example "13.07.2026 10:00 : Title"), `link`, `description` (intro text) and `category`; **no separate location or organiser field** (present in the plugin but commented out by default). Even a working feed would therefore be thinner than `/veranstaltungen.html`.
  - **Recommendation:** use `/veranstaltungen.html` as the source (option 2); use the RSS variant only if the real `modid` can be found and parsing the location and date from the title string is acceptable.
- **Public institutions and playgrounds are not "event" sources** in the sense of `internal/sources`, but rather static reference data (address, opening hours). Recommendation: a separate static JSON file (for example `data/orte.json`) instead of an event source configuration, if the front end is to display them.
- **Associations and service providers:** best approached individually, provided they have their own homepages with events (for example Kulturverein Weißensee, the allotment umbrella association). Pure business directories are not suitable as fetch sources, only for manually researching further candidates.

## Location and filtering for Weißensee

Important requirement: we need the **location of the event itself** (not just the "district" or "provider"), both for display and to filter aggregator sources that cover more than just Weißensee correctly.

**Correction:** Weißensee has the postcodes **13086** and **13088** (13088 is shared between Weißensee and Hohenschönhausen). **13089 belongs to Pankow (the locality), not to Weißensee**; an earlier version of this document wrongly listed it as a Weißensee postcode, which has been corrected here. For a pure postcode filter, `13086` and `13088` are therefore sufficient, although 13088 may require manual filtering (street sections belonging to Hohenschönhausen).

Checked status per source:

- **Brotfabrik** (`wp-json/tribe/events/v1/events`): structured location field: **yes**. A dedicated `venue` object per event with `venue`, `address` (Caligariplatz 1), `city` and `zip` (**13086**, verified live); can be filtered directly by postcode.
- **Freilichtbühne** (`/events.ics`): structured location field: **yes**. ICS `LOCATION` field per event with stage name, street, locality ("Berlin-Weißensee") and **postcode 13086** (verified live, three stages, all at the same address); can be filtered directly by postcode, and needs no extra effort anyway, as this source only has one venue.
- **Peter Edel** (`peteredel.de/events`): structured location field: **no, free text only**. The address appears as text in the footer and on detail pages ("Berliner Allee 125, 13088 Berlin"), but as a single-venue source no filtering is needed, as it is by definition in Weißensee.
- **Berlin.de Pankow API** (example configuration): structured location field: intended, but unverified. The mapping provides `locationName`/`locationAddress`, but the endpoint itself returned no response when tested (see above) and must be checked again before use. If it works, filtering by address or postcode is essential, as the API covers the whole district.
- **weissensee-kultur.de** (RSS): structured location field: **unclear, probably not**. It uses no events plugin with its own REST structure (no `tribe` namespace or similar found in `/wp-json/`); the feed is probably the normal WordPress post feed (title, description, link), and the location is likely to appear only as free text in the description, if at all. To be checked against the actual feed content once it can be read (currently not technically readable). As the site exclusively curates events in Weißensee, location filtering is probably less critical here than displaying the location itself.
- **Stadtteilzentrum** `/veranstaltungen.html`: structured location field: **yes, as text**. Every event has a location in bold (for example "Stadtteilzentrum Weißensee, Pistoriusstraße 23", but also outliers such as "FreiwilligenAgentur Pankow, Berliner Allee 124"; this is on the road that runs through Weißensee, so check the postcode there). No separate postcode field; the address would have to be parsed or geocoded.
- **Tiefgrund, Familienzentrum** (existing examples): structured location field: no (fixed). Single-venue sources; the location is set in the mapping as a `default` value, as the source only has one venue. No filtering issue, as they are by definition in Weißensee.

**Recommendations for the backend:**
1. `model.Event` should have a structured location field (at least `name` and `address`, ideally `zip`), not just a free-text string; this is exactly what the existing mapping syntax (`locationName`/`locationAddress`) already provides.
2. As a filter rule: postcode `13086`/`13088` as the primary criterion, supplemented by a small allowlist of known streets and places in Weißensee (from the venue list in category 1 of this document) for cases where a source provides no postcode or an address lies on the locality boundary (Berliner Allee, Prenzlauer Promenade and similar).
3. For aggregator sources without a postcode (for example if weissensee-kultur.de turns out to be a pure text feed), trusting the source's own editorial curation may be sufficient, but should be spot-checked if in doubt.
4. With the Freilichtbühne find, a fourth generic source type `ical` (alongside `rss`/`json`/`wcs`) is worthwhile. Events Manager Pro is a widely used plugin, and it is plausible that other sites in Weißensee that have not yet been checked also export via `/events.ics` or `/?ical=1` (worth a standard check for every new WordPress source). The `LOCATION` field in the ICS standard is a single string (no separate address or postcode field); for the postcode filter, the five-digit number would have to be extracted from the string with a regex.

## Next steps (proposal)

1. Check the structure of `weissensee-kultur.de/feed` (fields, categories) and create an active source configuration.
2. Check Kulturverein Weißensee and pankow-weissensee-prenzlauerberg.berlin for their HTML structure or hidden APIs (Network tab). Peter Edel, Freilichtbühne and Brotfabrik have already been checked (see above).
3. Decide whether "places" (playgrounds, public institutions) should become a data type of their own in the front end and, if so, define a data model for them.
4. Expand the list of associations and service providers only as needed (currently basic coverage only).
5. Verify the Berlin.de Pankow endpoint again (currently no response) and, if it works, add a postcode and address filter for Weißensee (13086/13088 plus a street allowlist).
6. Review the location data model in the backend: a structured field (`name`/`address`/`zip`) instead of free text, so that filtering for Weißensee works consistently across all sources.
