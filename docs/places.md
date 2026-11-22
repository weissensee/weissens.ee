# Places in Weißensee (collection)

Places without fixed dates: playgrounds, sports facilities, nature, bathing
and markets. This file is the full **collection**. A curated selection is in
the app: [`../places.json`](../places.json) feeds the "Orte" tab (place pages
with the upcoming events held there; see the core's docs/instance.md,
"Places"). Since 21 November 2026 it holds 23 hand-picked places; since
22 November 2026 also playgrounds (type "Spielplätze"): the 33 official public
playgrounds from the Berlin Geoportal first, then 20 further playgrounds that
are only in OpenStreetMap (see the two sections below).
Pitches and fitness stations from OpenStreetMap are not in the app yet.
Places with opening hours (for example the lido, boat hire or markets) could
additionally be brought into the calendar as recurring inbox entries, as was
done for the Knirpsenfarm.

## Collected by hand

### Nature and parks

| Place | What | Notes | Source |
|---|---|---|---|
| Weißer See and park | Lake with park, 1.3 km circular path, rose garden, sunbathing lawns, small game enclosure, playgrounds, paddling area for children | Freilichtbühne (own source) and lido on the shore | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Weisse_See_Berlin.html) |
| Fauler See | Nature reserve, about 24 ha of parkland with paths and a sunbathing lawn, about 40 breeding bird species | Nature to walk through | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Fauler_See.html) |
| Orankesee | Lido with green space for relaxing | Just outside Weißensee (Alt-Hohenschönhausen, Lichtenberg) | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Orankesee.html) |
| Obersee with water tower | Lake and water tower | Just outside Weißensee (Alt-Hohenschönhausen) | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Wasserturm_Obersee_Berlin.html) |

### Bathing, boats and refreshments at the Weißer See

| Place | What | Season / times | Source |
|---|---|---|---|
| Strandbad Weißensee, Berliner Allee 155 | Natural lido | Summer (season from May); times differ between sources, OSM: 10:00–20:00 | OSM [way/20130679](https://www.openstreetmap.org/way/20130679) |
| Boat hire at the Seeterrassen | Rowing boats | Summer | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Weisse_See_Berlin.html) |
| Milchhäuschen | Café and restaurant with a terrace by the lake | All year | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Weisse_See_Berlin.html) |
| Strandbad Orankesee | Natural lido | Summer | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Orankesee.html) |

### Markets

| Market | Times | Notes |
|---|---|---|
| HansaMarkt – Trödelmarkt Weißensee (flea market), Hansastraße 188 (Fressnapf car park) | Every Sunday; time unclear (sources say 8–16, 9–16, 10–16 or 10–18; some also Saturdays) | No website of its own found. Operator according to a directory: Hansamarkt GmbH & Co. KG. Clarify the times before adding it. OSM [way/505312521](https://www.openstreetmap.org/way/505312521) |
| Wochenmarkt Antonplatz (weekly market) | According to OSM Tue and Fri 9:00–18:00 | Not confirmed (no other source found). OSM [node/12356318726](https://www.openstreetmap.org/node/12356318726) |

Not included: Tommys turbulente Tobewelt (purely commercial).

### Sights

| Place | What | Source |
|---|---|---|
| Jüdischer Friedhof Berlin-Weißensee (Jewish cemetery), Herbert-Baum-Straße | By area the largest Jewish cemetery in Europe, opened in 1880, about 115,000 graves; listed historic garden, UNESCO World Heritage status sought | [berlin.de](https://www.berlin.de/sehenswuerdigkeiten/3560738-3558930-juedischer-friedhof-weissensee.html), [Landesdenkmalamt](https://www.berlin.de/landesdenkmalamt/denkmale/highlight-gartendenkmale/juedischer-friedhof-weissensee/) |
| Park am Weißen See | Lake with fountain, park, Freilichtbühne, Milchhäuschen (see above) | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Weisse_See_Berlin.html) |
| Theater im Delphi (formerly the Delphi silent film cinema), Gustav-Adolf-Straße 2 | Once the largest and most luxurious silent film cinema in Berlin (870 seats); filming location of the "Moka Efti" night club in "Babylon Berlin" | [berlin.de highlights](https://www.berlin.de/sehenswuerdigkeiten/ortsteile/7774896-8037629-weissensee.html) |
| Brotfabrik / Caligariplatz | Arts centre; the square commemorates Weißensee's film studios ("Little Hollywood", silent film era) | [berlin.de highlights](https://www.berlin.de/sehenswuerdigkeiten/ortsteile/7774896-8037629-weissensee.html) |
| Brecht-Haus, Berliner Allee 185 | Bertolt Brecht's home 1949–1953 (founding of the Berliner Ensemble); unrestored, exterior only | [berlin.de highlights](https://www.berlin.de/sehenswuerdigkeiten/ortsteile/7774896-8037629-weissensee.html) |
| Komponistenviertel (composers' quarter) | Quarter of period buildings between the Jewish cemetery and Berliner Allee, with streets named after composers (Bizet, Smetana, …) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/Berlin-Wei%C3%9Fensee) |
| Kunsthalle am Hamburger Platz / weißensee kunsthochschule | Exhibitions of the art school (own source) | [kh-berlin.de](https://kh-berlin.de/kalender) |
| Bethanienkirche, Pfarrkirche Weißensee | Churches, some with concerts (Berlin state events calendar) | OSM, Wikipedia (see below) |
| Naturschutzgebiet Fauler See | See "Nature and parks" | [berlinstadtservice](https://www.berlinstadtservice.de/xinh/Fauler_See.html) |

Further reading: [Merian – Sehenswürdigkeiten Weißensee](https://www.merian.de/deutschland/berlin/sehenswuerdigkeiten-tipps-berlin-weissensee), [berlin.de – Sehenswürdigkeiten Pankow](https://www.berlin.de/sehenswuerdigkeiten/bezirk/pankow/).

### Sights from OpenStreetMap

Second Overpass query (`docs/osm/sehenswertes-weissensee.overpassql`):
`tourism=attraction|museum|artwork|viewpoint|gallery`, `historic=*`,
`amenity=place_of_worship|theatre|cinema|arts_centre|fountain`, and named
cemeteries, parks and nature reserves. Data © OpenStreetMap contributors,
ODbL.

#### Cemeteries (9)

| Name | Type | Location | Links |
|---|---|---|---|
| Jüdischer Friedhof Berlin-Weißensee |  | 52.54205, 13.46245 | [way/6197783](https://www.openstreetmap.org/way/6197783) · [Wikipedia](https://de.wikipedia.org/wiki/J%C3%BCdischer_Friedhof_Berlin-Wei%C3%9Fensee) |
| Städtischer Friedhof Weißensee |  | 52.55639, 13.45292 | [way/25768161](https://www.openstreetmap.org/way/25768161) · [Wikipedia](https://de.wikipedia.org/wiki/Friedhof_Wei%C3%9Fensee) |
| Georgen-Parochial-Friedhof III |  | 52.55610, 13.44358 | [way/25960318](https://www.openstreetmap.org/way/25960318) |
| Auferstehungskirchhof |  | 52.54890, 13.47043 | [way/44393777](https://www.openstreetmap.org/way/44393777) |
| Friedhof der Segenskirchengemeinde |  | 52.55939, 13.45197 | [way/47391017](https://www.openstreetmap.org/way/47391017) |
| St. Bartholomäus-Friedhof |  | 52.55917, 13.48232 | [way/51316591](https://www.openstreetmap.org/way/51316591) · [Wikipedia](https://de.wikipedia.org/wiki/Kirchhof_St._Bartholom%C3%A4us) |
| Evangelischer Friedhof Weißensee |  | 52.55864, 13.47912 | [way/51316688](https://www.openstreetmap.org/way/51316688) |
| Adass Jisroel Gemeindefriedhof |  | 52.55800, 13.47711 | [way/51316739](https://www.openstreetmap.org/way/51316739) · [Wikipedia](https://de.wikipedia.org/wiki/Adass-Jisroel-Friedhof) |
| St.-Hedwigs-Friedhof |  | 52.54558, 13.45983 | [way/156138102](https://www.openstreetmap.org/way/156138102) |

#### Churches and places of worship (14)

| Name | Type | Location | Links |
|---|---|---|---|
| Baptisten-Gemeinde | christian | 52.55269, 13.44040 | [node/1556403863](https://www.openstreetmap.org/node/1556403863) |
| Jagannatha Tempel Berlin | hindu | 52.55688, 13.46666 | [node/3039050111](https://www.openstreetmap.org/node/3039050111) |
| Stadtmission Gemeinde Bizetstraße | christian | 52.54860, 13.45686 | [node/3039050989](https://www.openstreetmap.org/node/3039050989) |
| Buddhistisches Zentrum Berlin der Karma Kagyü Linie | buddhist | 52.55255, 13.44525 | [node/6147582386](https://www.openstreetmap.org/node/6147582386) |
| diekreative | christian | 52.56406, 13.46126 | [node/11214170388](https://www.openstreetmap.org/node/11214170388) |
| Friedhofskapelle | christian | 52.54886, 13.46990 | [node/12092147346](https://www.openstreetmap.org/node/12092147346) |
| St. Josef | christian | 52.55088, 13.44648 | [way/108243577](https://www.openstreetmap.org/way/108243577) |
| Bethanien-Kirche |  | 52.55279, 13.44910 | [way/117855555](https://www.openstreetmap.org/way/117855555) · [Wikipedia](https://de.wikipedia.org/wiki/Bethanienkirche_(Berlin-Wei%C3%9Fensee)) |
| Kapelle des Georgen-Parochial-Friedhof III | christian | 52.55560, 13.44449 | [way/132876050](https://www.openstreetmap.org/way/132876050) |
| Friedenskirche | christian | 52.55218, 13.45852 | [way/289150196](https://www.openstreetmap.org/way/289150196) |
| Königreichssaal Jehovas Zeugen | christian | 52.55955, 13.47256 | [way/296999883](https://www.openstreetmap.org/way/296999883) |
| Evangelische Kirche | christian | 52.55477, 13.46833 | [way/326566954](https://www.openstreetmap.org/way/326566954) · [Wikipedia](https://de.wikipedia.org/wiki/Pfarrkirche_Wei%C3%9Fensee) |
| C3.NYC Berlin | christian | 52.55169, 13.46770 | [way/326610460](https://www.openstreetmap.org/way/326610460) · [Wikipedia](https://de.wikipedia.org/wiki/Neuapostolische_Kirche_(Berlin-Wei%C3%9Fensee)) |
| Kapelle | christian | 52.55780, 13.47865 | [way/378441390](https://www.openstreetmap.org/way/378441390) |

#### Museums, galleries, culture (11)

| Name | Type | Location | Links |
|---|---|---|---|
| Kino Toni & Tonino | cinema | 52.54882, 13.45093 | [node/281887442](https://www.openstreetmap.org/node/281887442) |
| Brotfabrik | cinema | 52.55256, 13.43058 | [node/447078290](https://www.openstreetmap.org/node/447078290) |
| BrotfabrikBühne | theatre | 52.55256, 13.43073 | [node/945402693](https://www.openstreetmap.org/node/945402693) |
| Kunstgießerei & Galerie Flierl | gallery | 52.55322, 13.44054 | [node/2565247202](https://www.openstreetmap.org/node/2565247202) |
| Sexauer Gallery | gallery | 52.55107, 13.43887 | [node/2853902146](https://www.openstreetmap.org/node/2853902146) |
| Theater im Delphi | theatre | 52.55190, 13.43116 | [node/4456147960](https://www.openstreetmap.org/node/4456147960) · [Wikipedia](https://de.wikipedia.org/wiki/Kino_Delphi_(Berlin-Wei%C3%9Fensee)) |
| Kühlspot Social Club | gallery | 52.55040, 13.43653 | [node/9517825120](https://www.openstreetmap.org/node/9517825120) |
| Galerie kunstWerkstatt Weißensee | gallery | 52.54933, 13.44788 | [node/12323856459](https://www.openstreetmap.org/node/12323856459) |
| Freilichtbühne Weißensee | cinema | 52.55619, 13.46327 | [way/20131071](https://www.openstreetmap.org/way/20131071) |
| Brotfabrik | arts_centre | 52.55261, 13.43059 | [way/81127025](https://www.openstreetmap.org/way/81127025) · [Wikipedia](https://de.wikipedia.org/wiki/Brotfabrik_(Berlin)) |
| Kunsthalle Berlin-Weißensee | museum | 52.55611, 13.43936 | [way/138516180](https://www.openstreetmap.org/way/138516180) |

#### Public art (25)

| Name | Type | Location | Links |
|---|---|---|---|
| Emma T. |  | 52.55202, 13.43165 | [node/1486087545](https://www.openstreetmap.org/node/1486087545) |
| Feuerwehrmann | statue | 52.55641, 13.45959 | [node/2927313833](https://www.openstreetmap.org/node/2927313833) |
| Feuerwehrmann | statue | 52.55662, 13.45981 | [node/2927314654](https://www.openstreetmap.org/node/2927314654) |
| Seelöwe | statue, Willy Ernst Schade | 52.55539, 13.46130 | [node/3181885304](https://www.openstreetmap.org/node/3181885304) |
| Vater mit zwei Kindern | statue, Stephan Horota | 52.55235, 13.47006 | [node/3413849132](https://www.openstreetmap.org/node/3413849132) |
| Junger Arbeiter | statue, Christa Sammler | 52.55573, 13.46253 | [node/3711007085](https://www.openstreetmap.org/node/3711007085) |
| Orang-Utan-Kinder | sculpture, Stephan Horota | 52.54942, 13.46236 | [node/7502777456](https://www.openstreetmap.org/node/7502777456) |
| Jaguar | statue, Heinrich Drake | 52.55482, 13.45918 | [node/7502919754](https://www.openstreetmap.org/node/7502919754) |
| Frauenstatue | statue, Eberhard Bachmann | 52.55397, 13.45949 | [node/8042118223](https://www.openstreetmap.org/node/8042118223) |
| Lesender Knabe | statue, Siegfried Krepp, Gertrud Claasen | 52.55202, 13.45282 | [node/9583445935](https://www.openstreetmap.org/node/9583445935) |
| Christus | statue, Bertel Thorvaldsen | 52.55932, 13.45143 | [node/9583448463](https://www.openstreetmap.org/node/9583448463) |
| Grüner Hering | statue | 52.54975, 13.45221 | [node/9613470858](https://www.openstreetmap.org/node/9613470858) |
| Seelöwe | statue, Willy Ernst Schade | 52.55546, 13.46125 | [node/10038850411](https://www.openstreetmap.org/node/10038850411) |
| Till Eulenspiegel | statue, Stephan Horota | 52.55378, 13.47604 | [node/11148701824](https://www.openstreetmap.org/node/11148701824) |
| Sich umarmendes Paar | statue, Martin Wilke | 52.55394, 13.47337 | [node/11153701958](https://www.openstreetmap.org/node/11153701958) |
| Sich Sonnende | statue, Martin Wilke | 52.55397, 13.47245 | [node/11153712703](https://www.openstreetmap.org/node/11153712703) |
| Caritas | sculpture, Gottlieb Elster | 52.55222, 13.45693 | [node/11273067087](https://www.openstreetmap.org/node/11273067087) |
| Vogel-Haus | installation, Sergej Alexander Dott | 52.56032, 13.44876 | [node/12914372275](https://www.openstreetmap.org/node/12914372275) |
| Fisch-Haus | installation, Sergej Alexander Dott | 52.56007, 13.44905 | [node/12914372276](https://www.openstreetmap.org/node/12914372276) |
| Hasen-Haus | installation, Sergej Alexander Dott | 52.56111, 13.45057 | [node/12914372277](https://www.openstreetmap.org/node/12914372277) |
| Schmetterlings-Haus | installation, Sergej Alexander Dott | 52.56092, 13.45101 | [node/12914372278](https://www.openstreetmap.org/node/12914372278) |
| Chaussee-Haus | installation, Sergej Alexander Dott | 52.56108, 13.45142 | [node/12914372279](https://www.openstreetmap.org/node/12914372279) |
| Rollerkinder | statue, Stephan Horota | 52.55590, 13.43920 | [node/13049087633](https://www.openstreetmap.org/node/13049087633) |
| Triton | statue, Hans Schellhorn | 52.55537, 13.46196 | [node/13057790219](https://www.openstreetmap.org/node/13057790219) |
| Triton | statue, Hans Schellhorn | 52.55531, 13.46176 | [node/13057790220](https://www.openstreetmap.org/node/13057790220) |

#### Monuments and memorials (10)

| Name | Type | Location | Links |
|---|---|---|---|
| Herbert Baum | tomb | 52.54444, 13.45794 | [node/281756556](https://www.openstreetmap.org/node/281756556) |
| Gedenkstein an die Erbauer des Parks | plaque | 52.55629, 13.46264 | [node/2607888430](https://www.openstreetmap.org/node/2607888430) |
| Bismarckstein | stone | 52.55723, 13.46643 | [node/3181885303](https://www.openstreetmap.org/node/3181885303) |
| Mahnmal zum Gedenken an die 6 Millionen jüdischen Opfer der faschistischen Verfolgung | grave | 52.54519, 13.45806 | [node/9504326858](https://www.openstreetmap.org/node/9504326858) |
| Denkmal der antifaschistischen Widerstandskämpfer | statue | 52.55129, 13.46268 | [node/9600143600](https://www.openstreetmap.org/node/9600143600) |
| Spartakusaufstand | stone | 52.56444, 13.44897 | [node/11621925134](https://www.openstreetmap.org/node/11621925134) |
| Werner Klemke | plaque | 52.54915, 13.45253 | [node/12190258386](https://www.openstreetmap.org/node/12190258386) |
| Erich Boltze | plaque | 52.55228, 13.45175 | [node/12768039989](https://www.openstreetmap.org/node/12768039989) |
| Carl James Bühring | plaque | 52.55242, 13.45117 | [node/12768039990](https://www.openstreetmap.org/node/12768039990) |
| Erbbegräbnis Lewinsohn Netter | tomb | 52.54381, 13.46063 | [node/12785757520](https://www.openstreetmap.org/node/12785757520) |

In addition, there are 28 Stolpersteine (OSM `memorial=stolperstein`), not listed individually here.

#### Parks and squares (9)

| Name | Type | Location | Links |
|---|---|---|---|
| NSG Fauler See |  | 52.55410, 13.49141 | [way/4788729](https://www.openstreetmap.org/way/4788729) |
| Solonplatz |  | 52.54919, 13.46249 | [way/25822455](https://www.openstreetmap.org/way/25822455) |
| Arnold-Schönberg-Platz |  | 52.54879, 13.45939 | [way/25911017](https://www.openstreetmap.org/way/25911017) |
| Jürgen-Kuczynski-Park |  | 52.55298, 13.45252 | [way/37130787](https://www.openstreetmap.org/way/37130787) |
| Orankeseepark |  | 52.54880, 13.48108 | [way/111400097](https://www.openstreetmap.org/way/111400097) |
| Werner-Klemke-Park |  | 52.55442, 13.45604 | [way/111489919](https://www.openstreetmap.org/way/111489919) |
| Park am Weißen See |  | 52.55392, 13.46270 | [way/111489921](https://www.openstreetmap.org/way/111489921) |
| Antonplatz |  | 52.54777, 13.45115 | [way/126559143](https://www.openstreetmap.org/way/126559143) · [Wikipedia](https://de.wikipedia.org/wiki/Antonplatz) |
| Wohnungsnahe Grünanlage |  | 52.56013, 13.45395 | [way/1183858582](https://www.openstreetmap.org/way/1183858582) |

#### Other (historic, fountains, industry) (5)

| Name | Type | Location | Links |
|---|---|---|---|
| VEB Isokond |  | 52.55050, 13.43846 | [node/2030883817](https://www.openstreetmap.org/node/2030883817) |
| Seelöwe |  | 52.55539, 13.46130 | [node/3181885304](https://www.openstreetmap.org/node/3181885304) |
| Seelöwe |  | 52.55546, 13.46125 | [node/10038850411](https://www.openstreetmap.org/node/10038850411) |
| Motorwerk Berlin |  | 52.56359, 13.46177 | [way/288253333](https://www.openstreetmap.org/way/288253333) · [Wikipedia](https://de.wikipedia.org/wiki/Motorwerk) |
| DGZ Brunnen |  | 52.55846, 13.44122 | [way/490757360](https://www.openstreetmap.org/way/490757360) |

## From the Berlin Geoportal: public playgrounds (22 November 2026)

Official source for the playgrounds in the app: "Grünanlagenbestand Berlin
(einschließlich der öffentlichen Spielplätze)", WFS layer
`gruenanlagen:spielplaetze` at `https://gdi.berlin.de/services/wfs/gruenanlagen`
([field description](https://gdi.berlin.de/data/gruenanlagen/docs/Datenformatbeschreibung_Gruenanlagen_Spielplaetze.pdf)),
licence Datenlizenz Deutschland – Zero 2.0. Filtered to `ortstlname = Weißensee`:
33 public playgrounds. Example request (GeoJSON, WGS 84):

```
https://gdi.berlin.de/services/wfs/gruenanlagen?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=gruenanlagen:spielplaetze&OUTPUTFORMAT=application/json&SRSNAME=EPSG:4326&BBOX=52.538,13.420,52.568,13.500,urn:ogc:def:crs:EPSG::4326
```

Rules for `places.json` (issue #3): the official data takes precedence - one
place per Geoportal playground, official name and address, sorted by net play
area (largest first). OpenStreetMap only adds what the Geoportal lacks
(wheelchair access, age range) from OSM playgrounds within 45 m. OSM
playgrounds without an official counterpart follow after the official ones,
marked "nur in OpenStreetMap eingetragen" (see the next section).

| Object | Name | Net play area m² | Plot m² | Built | Renovated | Location |
|---|---|---|---|---|---|---|
| 70160 | Falkenberger Str. 151 bis 155 (östl. Bernkasteler Str. 24 A) | 4801 | 8323 |  | 2021 | 52.55688, 13.48082 |
| 78981 | Tassostr. 18 ("Grüner Hering") | 3347 | 4992 | 2006 |  | 52.54967, 13.45191 |
| 70173 | Wigandstaler Str. 39 A - Spielplatz | 3094 | 3848 | 1996 | 2020 | 52.55966, 13.44026 |
| 70508 | Park Am Weißen See - Spielplatz 1 (Berliner Allee zw. 125 und 165) | 1683 | 2963 | 1999 | 2017 | 52.55201, 13.46357 |
| 70155 | Otto-Brahm-Str. zw. 7 und 11 | 1537 | 2335 | 1992 | 2019 | 52.54648, 13.46194 |
| 70177 | Gartenstr. 6, Hansastr. 151- Spielplatz (südl. Else-Jahn-Str., westl Hansastr.) | 1410 | 1552 | 1994 |  | 52.55109, 13.47427 |
| 70180 | Falkenberger Str. 5-12/ Buschallee | 1318 | 2114 | 1996 | 2018 | 52.55436, 13.47180 |
| 77860 | Gounodstr. 58 | 1298 | 1942 | 2012 |  | 52.54671, 13.45928 |
| 70509 | Park Am Weißen See - Spielplatz 2 (Plansche) | 1183 | 6945 | 1992 |  | 52.55549, 13.46086 |
| 70149 | Frieda-Seidlitz-Str. (ggü 54D) | 1178 | 1412 |  |  | 52.55648, 13.43980 |
| 70154 | Schönstr. 65 (zw. Schönstr. 64 und 66) | 1064 | 1572 | 1992 |  | 52.55701, 13.45670 |
| 77799 | Mahlerstr. 30 | 1042 | 1735 | 2004 |  | 52.54631, 13.45363 |
| 70159 | Bernkasteler Str. 73 a (zwischen Nr. 73 und 75) | 1032 | 1629 | 1996 |  | 52.55741, 13.47363 |
| 70114 | Günter-Litfin-Str. 19, 21 (zw. Nr. 17 und 23) | 966 | 1358 |  | 2020 | 52.56101, 13.44728 |
| 70502 | Park am Faulen See - Spielplatz (Am NSG "Fauler See") | 900 | 1647 |  |  | 52.55182, 13.49205 |
| 70190 | Mahlerstr.  27 | 875 | 1451 | 2005 |  | 52.54647, 13.45438 |
| 70181 | Buschallee 87 - Spielplatz 1 (Falkenberger Straße 27-30) | 872 | 1506 | 2004 |  | 52.55471, 13.47590 |
| 70158 | Bernkasteler Str. 15-16 A (Wittlicher Str. 5-7) | 835 | 1175 | 1995 |  | 52.55679, 13.47545 |
| 70171 | Bühringstr. neben 25 | 807 | 982 |  |  | 52.55862, 13.43788 |
| 78861 | Lehderstr. 68 | 718 | 989 | 2012 |  | 52.55122, 13.43373 |
| 70106 | Meyerbeerstr. 18/ Borodinstr. 12 | 718 | 1118 | 1993 |  | 52.54625, 13.45203 |
| 70511 | Gounodstr. 37-39 | 631 | 1115 | 2002 |  | 52.54664, 13.45625 |
| 70161 | Meyerbeerstr. 65-67 | 588 | 1235 | 1992 |  | 52.54801, 13.45797 |
| 70504 | Werner-Klemke-Park (Goldfischteich) - Spielplatz (Parkstr./Amalienstr./hinter Hotel) | 527 | 1076 | 1999 | 2020 | 52.55434, 13.45632 |
| 77865 | Mahlerstr. (bespielbarer Straßenabschnitt) | 501 | 510 | 2005 |  | 52.54623, 13.45412 |
| 70175 | Otto-Brahm-Str. ggü. 17 | 412 | 742 | 1992 |  | 52.54692, 13.46384 |
| 70506 | Kreuzpfuhl - Spielplatz (hinter Schönstr. 9, 10) | 411 | 737 | 2001 |  | 52.55347, 13.45167 |
| 78941 | Goethestr. 9, 11 / Lehderstr. 73 | 304 | 1577 |  |  | 52.55087, 13.43516 |
| 70103 | Tassostr. ggü. 12-14 | 303 | 634 | 1995 |  | 52.55092, 13.45337 |
| 78520 | Charlottenburger Str 75 | 276 | 405 |  |  | 52.55590, 13.43251 |
| 70117 | Solonplatz - Spielplatz | 240 | 572 | 1999 | 2020 | 52.54923, 13.46247 |
| 70973 | Pistoriusstr. 95 (Spielplatz) | 213 | 1085 |  |  | 52.55573, 13.43707 |
| 77863 | Buschallee 87 - Spielplatz 2 (Falkenberger Straße 27-30) | 99 | 284 | 2004 |  | 52.55412, 13.47623 |

## From OpenStreetMap: play, sport, markets (21 November 2026)

Query via the Overpass API (`docs/osm/orte-weissensee.overpassql`): all objects
within the Weißensee locality boundary (`admin_level=10`) with
`leisure=playground|pitch|sports_centre|stadium|fitness_station|track|swimming_pool|sports_hall|fitness_centre|…`,
`amenity=marketplace|boat_rental` and clubs with `sport=*`. Data ©
OpenStreetMap contributors, ODbL. "Location" is the centre point
(latitude, longitude).

### Playgrounds, public or unspecified (69)

In the app (since issue #3): areas within 45 m of a Geoportal playground are
covered by the official entry (above). The remaining areas became 20 places
listed after the official ones, marked "nur in OpenStreetMap eingetragen";
neighbouring areas were merged and unnamed ones named after the nearest
street. Private playgrounds (next section) are left out.

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.56056, 13.44651 | [node/2091480495](https://www.openstreetmap.org/node/2091480495) |
| – |  |  |  | 52.56116, 13.44542 | [node/2091489555](https://www.openstreetmap.org/node/2091489555) |
| – |  |  |  | 52.56159, 13.44302 | [node/2091489558](https://www.openstreetmap.org/node/2091489558) |
| – |  |  |  | 52.55788, 13.44356 | [node/2109552890](https://www.openstreetmap.org/node/2109552890) |
| – |  |  |  | 52.56036, 13.45342 | [node/2587373472](https://www.openstreetmap.org/node/2587373472) |
| – |  |  |  | 52.56056, 13.45288 | [node/2587373473](https://www.openstreetmap.org/node/2587373473) |
| – |  |  |  | 52.55581, 13.47253 | [node/8502577679](https://www.openstreetmap.org/node/8502577679) |
| – |  |  | 24/7 | 52.55089, 13.43518 | [node/12332796601](https://www.openstreetmap.org/node/12332796601) |
| Spielplatz |  |  |  | 52.55279, 13.45836 | [node/14052311022](https://www.openstreetmap.org/node/14052311022) |
| – |  | Berliner Allee 125-165 |  | 52.55201, 13.46357 | [way/28619129](https://www.openstreetmap.org/way/28619129) |
| Spielplatz Amalienstraße |  |  |  | 52.55434, 13.45632 | [way/37071166](https://www.openstreetmap.org/way/37071166) |
| Grüner Hering |  | Tassostraße 18 |  | 52.54967, 13.45190 | [way/54930133](https://www.openstreetmap.org/way/54930133) |
| – |  |  |  | 52.55975, 13.44058 | [way/59431390](https://www.openstreetmap.org/way/59431390) |
| – |  |  |  | 52.55549, 13.46086 | [way/70526056](https://www.openstreetmap.org/way/70526056) |
| – |  |  |  | 52.55648, 13.43982 | [way/143737390](https://www.openstreetmap.org/way/143737390) |
| – |  |  |  | 52.55122, 13.43373 | [way/180535662](https://www.openstreetmap.org/way/180535662) |
| – |  |  |  | 52.55758, 13.46268 | [way/234756135](https://www.openstreetmap.org/way/234756135) |
| – |  |  |  | 52.55686, 13.43174 | [way/234796499](https://www.openstreetmap.org/way/234796499) |
| – |  |  |  | 52.55716, 13.43228 | [way/234796500](https://www.openstreetmap.org/way/234796500) |
| – |  |  |  | 52.55650, 13.43123 | [way/234796501](https://www.openstreetmap.org/way/234796501) |
| – |  |  |  | 52.55477, 13.43107 | [way/234798426](https://www.openstreetmap.org/way/234798426) |
| – |  |  |  | 52.55740, 13.47366 | [way/235287307](https://www.openstreetmap.org/way/235287307) |
| – |  |  |  | 52.55679, 13.47545 | [way/235414360](https://www.openstreetmap.org/way/235414360) |
| – |  |  |  | 52.55548, 13.45524 | [way/289151733](https://www.openstreetmap.org/way/289151733) |
| – |  |  |  | 52.54625, 13.45203 | [way/305475815](https://www.openstreetmap.org/way/305475815) |
| – |  |  |  | 52.55109, 13.47425 | [way/334272917](https://www.openstreetmap.org/way/334272917) |
| Kleinkinderspielplatz Gouodstraße 58, ehemalige Kita |  |  |  | 52.54671, 13.45928 | [way/334642254](https://www.openstreetmap.org/way/334642254) |
| – |  |  |  | 52.54924, 13.46247 | [way/334800693](https://www.openstreetmap.org/way/334800693) |
| – |  |  |  | 52.54648, 13.46194 | [way/334800958](https://www.openstreetmap.org/way/334800958) |
| – |  |  |  | 52.54692, 13.46385 | [way/334800972](https://www.openstreetmap.org/way/334800972) |
| – |  |  |  | 52.54664, 13.45625 | [way/334801088](https://www.openstreetmap.org/way/334801088) |
| – |  |  |  | 52.54629, 13.45363 | [way/334801420](https://www.openstreetmap.org/way/334801420) |
| – |  |  |  | 52.54647, 13.45438 | [way/334801421](https://www.openstreetmap.org/way/334801421) |
| – |  |  |  | 52.54623, 13.45414 | [way/334801480](https://www.openstreetmap.org/way/334801480) |
| – |  |  |  | 52.55092, 13.45337 | [way/334802117](https://www.openstreetmap.org/way/334802117) |
| Kreuzpfuhlspielplatz |  |  |  | 52.55349, 13.45170 | [way/334802118](https://www.openstreetmap.org/way/334802118) |
| – |  |  |  | 52.55701, 13.45670 | [way/334802240](https://www.openstreetmap.org/way/334802240) |
| – |  |  |  | 52.55436, 13.47182 | [way/334803233](https://www.openstreetmap.org/way/334803233) |
| – |  |  |  | 52.55487, 13.47638 | [way/336875169](https://www.openstreetmap.org/way/336875169) |
| – |  |  |  | 52.55480, 13.47522 | [way/336875170](https://www.openstreetmap.org/way/336875170) |
| – |  |  |  | 52.55462, 13.47556 | [way/336875171](https://www.openstreetmap.org/way/336875171) |
| – |  |  |  | 52.56102, 13.44728 | [way/473786460](https://www.openstreetmap.org/way/473786460) |
| – |  |  |  | 52.55411, 13.45662 | [way/474620656](https://www.openstreetmap.org/way/474620656) |
| – |  |  |  | 52.54733, 13.46654 | [way/480026643](https://www.openstreetmap.org/way/480026643) |
| – |  |  |  | 52.55178, 13.49163 | [way/588717390](https://www.openstreetmap.org/way/588717390) |
| – |  |  |  | 52.55597, 13.47425 | [way/712508640](https://www.openstreetmap.org/way/712508640) |
| – |  |  |  | 52.55639, 13.47450 | [way/712508643](https://www.openstreetmap.org/way/712508643) |
| – |  |  |  | 52.55443, 13.46931 | [way/714460405](https://www.openstreetmap.org/way/714460405) |
| – |  |  |  | 52.55869, 13.47731 | [way/863520954](https://www.openstreetmap.org/way/863520954) |
| – |  |  |  | 52.55572, 13.43706 | [way/898507466](https://www.openstreetmap.org/way/898507466) |
| – |  |  |  | 52.55487, 13.45427 | [way/914146520](https://www.openstreetmap.org/way/914146520) |
| – |  |  |  | 52.54801, 13.45794 | [way/961150872](https://www.openstreetmap.org/way/961150872) |
| – |  |  |  | 52.55759, 13.43432 | [way/1006186393](https://www.openstreetmap.org/way/1006186393) |
| – |  |  |  | 52.55726, 13.43475 | [way/1006186394](https://www.openstreetmap.org/way/1006186394) |
| Labyrinth |  |  |  | 52.54696, 13.46670 | [way/1018866024](https://www.openstreetmap.org/way/1018866024) |
| – |  |  |  | 52.54634, 13.45012 | [way/1042709247](https://www.openstreetmap.org/way/1042709247) |
| – |  |  |  | 52.54862, 13.47943 | [way/1050500836](https://www.openstreetmap.org/way/1050500836) |
| – |  |  |  | 52.55738, 13.48059 | [way/1084095750](https://www.openstreetmap.org/way/1084095750) |
| – |  |  |  | 52.55695, 13.45898 | [way/1154792885](https://www.openstreetmap.org/way/1154792885) |
| – |  |  |  | 52.54873, 13.44248 | [way/1198936543](https://www.openstreetmap.org/way/1198936543) |
| – |  |  |  | 52.55811, 13.48909 | [way/1203410219](https://www.openstreetmap.org/way/1203410219) |
| – |  |  |  | 52.55672, 13.48107 | [way/1226867794](https://www.openstreetmap.org/way/1226867794) |
| – |  |  |  | 52.55624, 13.47683 | [way/1226893490](https://www.openstreetmap.org/way/1226893490) |
| – |  |  |  | 52.55750, 13.44141 | [way/1290644425](https://www.openstreetmap.org/way/1290644425) |
| – |  |  |  | 52.54887, 13.44446 | [way/1318297631](https://www.openstreetmap.org/way/1318297631) |
| – |  |  |  | 52.55592, 13.43251 | [way/1413056145](https://www.openstreetmap.org/way/1413056145) |
| – |  |  |  | 52.54889, 13.47974 | [way/1426253818](https://www.openstreetmap.org/way/1426253818) |
| – |  |  |  | 52.54930, 13.47830 | [way/1426253821](https://www.openstreetmap.org/way/1426253821) |
| – |  |  |  | 52.54921, 13.47755 | [way/1426253822](https://www.openstreetmap.org/way/1426253822) |

### Playgrounds, private (nursery, housing estate, customers) (13)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.56104, 13.45457 | [node/2587373474](https://www.openstreetmap.org/node/2587373474) |
| – |  |  |  | 52.54900, 13.46634 | [node/6499784792](https://www.openstreetmap.org/node/6499784792) |
| – |  |  |  | 52.54872, 13.46402 | [node/6499784793](https://www.openstreetmap.org/node/6499784793) |
| – |  |  |  | 52.54879, 13.46517 | [node/6499784794](https://www.openstreetmap.org/node/6499784794) |
| – |  |  |  | 52.54711, 13.45270 | [node/9597988869](https://www.openstreetmap.org/node/9597988869) |
| – |  |  |  | 52.54878, 13.44573 | [way/182088951](https://www.openstreetmap.org/way/182088951) |
| – |  |  |  | 52.55356, 13.43049 | [way/513387479](https://www.openstreetmap.org/way/513387479) |
| – |  |  |  | 52.55754, 13.48363 | [way/518911687](https://www.openstreetmap.org/way/518911687) |
| – |  |  |  | 52.55368, 13.44796 | [way/563656668](https://www.openstreetmap.org/way/563656668) |
| – |  |  |  | 52.55357, 13.45241 | [way/563662791](https://www.openstreetmap.org/way/563662791) |
| – |  |  |  | 52.55386, 13.43613 | [way/1026536875](https://www.openstreetmap.org/way/1026536875) |
| – |  |  |  | 52.54807, 13.45364 | [way/1042709234](https://www.openstreetmap.org/way/1042709234) |
| – |  |  |  | 52.55829, 13.48468 | [way/1169861692](https://www.openstreetmap.org/way/1169861692) |

### Outdoor fitness stations (6)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – | horizontal_bar;horizontal_ladder;wall_bars |  |  | 52.55595, 13.46133 | [node/11070826871](https://www.openstreetmap.org/node/11070826871) |
| – | parallel_bars |  |  | 52.55590, 13.46140 | [node/12217013167](https://www.openstreetmap.org/node/12217013167) |
| – | box |  |  | 52.55600, 13.46128 | [node/12217013168](https://www.openstreetmap.org/node/12217013168) |
| – | box |  |  | 52.55601, 13.46130 | [node/12217013169](https://www.openstreetmap.org/node/12217013169) |
| – | push-up |  |  | 52.55593, 13.46128 | [node/12217013170](https://www.openstreetmap.org/node/12217013170) |
| – |  |  | 24/7 | 52.55602, 13.46137 | [way/760138880](https://www.openstreetmap.org/way/760138880) |

### Sports centres, sports halls, stadiums (15)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| Sportakademie Pankow |  |  |  | 52.55158, 13.44829 | [node/12770852376](https://www.openstreetmap.org/node/12770852376) |
| – |  |  |  | 52.55510, 13.48794 | [way/4788730](https://www.openstreetmap.org/way/4788730) |
| Strandbad Weißensee | swimming | Berliner Allee 155 | 10:00-20:00 | 52.55393, 13.46548 | [way/20130679](https://www.openstreetmap.org/way/20130679) |
| Sporthalle | multi-sport |  | Mo-Fr 08:00-22:00; Sa,Su 10:00-16:00; PH 10:00-13:00 | 52.55188, 13.46107 | [way/36810473](https://www.openstreetmap.org/way/36810473) |
| Sporthalle Woelckpromenade 11 | multi-sport |  |  | 52.55374, 13.45513 | [way/36876896](https://www.openstreetmap.org/way/36876896) |
| TCW SPORTS | tennis | Roelckestraße 105 |  | 52.56533, 13.45900 | [way/37836532](https://www.openstreetmap.org/way/37836532) |
| – | multi-sport |  |  | 52.55095, 13.47550 | [way/43887842](https://www.openstreetmap.org/way/43887842) |
| Sporthalle Hagenbeck Schule | multi-sport |  |  | 52.55805, 13.44715 | [way/59431451](https://www.openstreetmap.org/way/59431451) |
| – | multi-sport |  |  | 52.55874, 13.44862 | [way/59431535](https://www.openstreetmap.org/way/59431535) |
| – |  |  |  | 52.55467, 13.47714 | [way/125226183](https://www.openstreetmap.org/way/125226183) |
| Turnhalle der Picasso Grundschule | multi-sport |  |  | 52.54729, 13.46048 | [way/156138101](https://www.openstreetmap.org/way/156138101) |
| Theresienturnhalle | multi-sport |  |  | 52.55165, 13.44589 | [way/234191552](https://www.openstreetmap.org/way/234191552) |
| XXXL Die Schmiede | fitness | Langhansstraße 123 | Mo-Fr 09:00-22:00; Sa 09:00-17:00 | 52.55068, 13.44359 | [way/288280972](https://www.openstreetmap.org/way/288280972) |
| Sportkomplex Rennbahn |  |  |  | 52.56429, 13.45648 | [way/306663563](https://www.openstreetmap.org/way/306663563) |
| Luisenhalle |  |  |  | 52.55410, 13.45544 | [way/474617810](https://www.openstreetmap.org/way/474617810) |

### Gyms (commercial) (8)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| BiSee Yoga |  | Bizetstraße 43 |  | 52.54786, 13.45343 | [node/9402426708](https://www.openstreetmap.org/node/9402426708) |
| Fitbox |  | Berliner Allee 108 | Mo-Fr 10:00-21:00; Sa 10:00-16:00 | 52.55008, 13.45961 | [node/9431775959](https://www.openstreetmap.org/node/9431775959) |
| Sonne Mond & Sterne |  | Meyerbeerstraße 59 |  | 52.54770, 13.45723 | [node/9504311194](https://www.openstreetmap.org/node/9504311194) |
| Apollo Fitness World |  |  | Mo,We,Th 09:00-22:00; Tu,Fr 08:00-22:00; Sa,Su 10:00-17:00 | 52.54602, 13.45243 | [node/12285966732](https://www.openstreetmap.org/node/12285966732) |
| Reha-Sport & Gesundheitstraining |  |  |  | 52.56036, 13.45908 | [node/12637232303](https://www.openstreetmap.org/node/12637232303) |
| Body Street |  |  | Mo-Fr 09:00-20:00; Sa 09:00-14:00 | 52.54821, 13.45025 | [node/13790834004](https://www.openstreetmap.org/node/13790834004) |
| Yoga im Garten |  |  | Mo 18:00-19:30; We 18:00-19:30; Th 18:15-19:15; Fr 10:30-12:00; Sa 10:00-11:30 | 52.55501, 13.46607 | [node/14112265302](https://www.openstreetmap.org/node/14112265302) |
| Soulstone Studio |  | Lehderstraße 26 |  | 52.54975, 13.44118 | [way/1557250679](https://www.openstreetmap.org/way/1557250679) |

### Running tracks (9)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – | running |  |  | 52.55403, 13.45583 | [way/174737170](https://www.openstreetmap.org/way/174737170) |
| – | athletics |  |  | 52.55128, 13.44515 | [way/234191711](https://www.openstreetmap.org/way/234191711) |
| – | athletics |  |  | 52.55153, 13.44525 | [way/234191712](https://www.openstreetmap.org/way/234191712) |
| – | athletics |  |  | 52.55739, 13.49097 | [way/812902924](https://www.openstreetmap.org/way/812902924) |
| – | athletics |  |  | 52.55743, 13.45105 | [way/1170506030](https://www.openstreetmap.org/way/1170506030) |
| – | athletics |  |  | 52.55164, 13.47602 | [way/1222704099](https://www.openstreetmap.org/way/1222704099) |
| – | athletics |  |  | 52.56360, 13.45592 | [relation/3593180](https://www.openstreetmap.org/relation/3593180) |
| – |  |  |  | 52.55682, 13.49063 | [relation/5640419](https://www.openstreetmap.org/relation/5640419) |
| – | athletics |  |  | 52.55430, 13.48554 | [relation/11170837](https://www.openstreetmap.org/relation/11170837) |

### Sports pitches (92), by sport


#### Table tennis (47)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55164, 13.44505 | [node/1461097283](https://www.openstreetmap.org/node/1461097283) |
| – |  |  |  | 52.55091, 13.45325 | [node/4389400313](https://www.openstreetmap.org/node/4389400313) |
| – |  |  |  | 52.55455, 13.47567 | [node/5037105183](https://www.openstreetmap.org/node/5037105183) |
| – |  |  |  | 52.55457, 13.47554 | [node/5037105184](https://www.openstreetmap.org/node/5037105184) |
| – |  |  |  | 52.55354, 13.45168 | [node/7405592654](https://www.openstreetmap.org/node/7405592654) |
| – |  |  |  | 52.55385, 13.45308 | [node/7405609643](https://www.openstreetmap.org/node/7405609643) |
| – |  |  |  | 52.54889, 13.44264 | [node/7405811692](https://www.openstreetmap.org/node/7405811692) |
| – |  |  |  | 52.55511, 13.45463 | [node/8491548671](https://www.openstreetmap.org/node/8491548671) |
| – |  |  |  | 52.55873, 13.43786 | [node/8822214476](https://www.openstreetmap.org/node/8822214476) |
| – |  |  |  | 52.55484, 13.43912 | [node/9464557846](https://www.openstreetmap.org/node/9464557846) |
| – |  |  |  | 52.55484, 13.43905 | [node/9464557847](https://www.openstreetmap.org/node/9464557847) |
| – |  |  |  | 52.55388, 13.43626 | [node/9464561684](https://www.openstreetmap.org/node/9464561684) |
| – |  |  |  | 52.55394, 13.43632 | [node/9464561685](https://www.openstreetmap.org/node/9464561685) |
| – |  |  |  | 52.55376, 13.43655 | [node/9464563053](https://www.openstreetmap.org/node/9464563053) |
| – |  |  |  | 52.55384, 13.43662 | [node/9464563054](https://www.openstreetmap.org/node/9464563054) |
| – |  | Hansastraße 135 |  | 52.55082, 13.47441 | [node/9610622561](https://www.openstreetmap.org/node/9610622561) |
| – |  |  |  | 52.55972, 13.43981 | [node/9635303956](https://www.openstreetmap.org/node/9635303956) |
| – |  |  |  | 52.55970, 13.43975 | [node/9635303957](https://www.openstreetmap.org/node/9635303957) |
| – |  |  |  | 52.54982, 13.47680 | [node/9760545461](https://www.openstreetmap.org/node/9760545461) |
| – |  |  |  | 52.54814, 13.48029 | [node/10024223022](https://www.openstreetmap.org/node/10024223022) |
| – |  |  |  | 52.54816, 13.48034 | [node/10024223023](https://www.openstreetmap.org/node/10024223023) |
| – |  |  |  | 52.55709, 13.45660 | [node/10024298435](https://www.openstreetmap.org/node/10024298435) |
| – |  |  |  | 52.55707, 13.45656 | [node/10024298436](https://www.openstreetmap.org/node/10024298436) |
| – |  |  |  | 52.54893, 13.44254 | [node/10593447903](https://www.openstreetmap.org/node/10593447903) |
| – |  |  |  | 52.54651, 13.45371 | [node/10606008440](https://www.openstreetmap.org/node/10606008440) |
| – |  |  |  | 52.54656, 13.45417 | [node/10606008444](https://www.openstreetmap.org/node/10606008444) |
| – |  |  |  | 52.54654, 13.45640 | [node/10606281836](https://www.openstreetmap.org/node/10606281836) |
| – |  |  |  | 52.55744, 13.47355 | [node/10709243321](https://www.openstreetmap.org/node/10709243321) |
| – |  |  |  | 52.55746, 13.47380 | [node/10709243322](https://www.openstreetmap.org/node/10709243322) |
| – |  |  |  | 52.56035, 13.48018 | [node/10713483015](https://www.openstreetmap.org/node/10713483015) |
| – |  |  |  | 52.55676, 13.47528 | [node/10758675051](https://www.openstreetmap.org/node/10758675051) |
| – |  |  |  | 52.55671, 13.47533 | [node/10758675052](https://www.openstreetmap.org/node/10758675052) |
| – |  |  |  | 52.55841, 13.44762 | [node/10880589710](https://www.openstreetmap.org/node/10880589710) |
| – |  |  |  | 52.55628, 13.48196 | [node/10880747536](https://www.openstreetmap.org/node/10880747536) |
| – |  |  |  | 52.55413, 13.47224 | [node/11377004063](https://www.openstreetmap.org/node/11377004063) |
| – |  |  |  | 52.55406, 13.47224 | [node/11377004064](https://www.openstreetmap.org/node/11377004064) |
| – |  |  |  | 52.55711, 13.48054 | [node/11377012401](https://www.openstreetmap.org/node/11377012401) |
| – |  |  |  | 52.55694, 13.48078 | [node/11377012402](https://www.openstreetmap.org/node/11377012402) |
| – |  |  |  | 52.55750, 13.48371 | [node/11377012403](https://www.openstreetmap.org/node/11377012403) |
| – |  |  |  | 52.55620, 13.47684 | [node/11377204252](https://www.openstreetmap.org/node/11377204252) |
| – |  |  |  | 52.54646, 13.46196 | [node/12085253634](https://www.openstreetmap.org/node/12085253634) |
| – |  |  |  | 52.55095, 13.48225 | [node/12198123084](https://www.openstreetmap.org/node/12198123084) |
| – |  |  |  | 52.55679, 13.45871 | [node/12286030936](https://www.openstreetmap.org/node/12286030936) |
| – |  |  |  | 52.54916, 13.47942 | [node/13110840846](https://www.openstreetmap.org/node/13110840846) |
| – |  |  |  | 52.54948, 13.47762 | [node/13110840889](https://www.openstreetmap.org/node/13110840889) |
| – |  |  |  | 52.54946, 13.47767 | [node/13110840890](https://www.openstreetmap.org/node/13110840890) |
| – |  |  |  | 52.55726, 13.43443 | [way/234806826](https://www.openstreetmap.org/way/234806826) |

#### Football (16)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| Stadion Buschallee |  |  |  | 52.55433, 13.48565 | [way/26502253](https://www.openstreetmap.org/way/26502253) |
| – |  |  |  | 52.55683, 13.49070 | [way/26502255](https://www.openstreetmap.org/way/26502255) |
| – |  |  |  | 52.56614, 13.45703 | [way/37836533](https://www.openstreetmap.org/way/37836533) |
| – |  |  |  | 52.56573, 13.45802 | [way/37836534](https://www.openstreetmap.org/way/37836534) |
| – |  |  |  | 52.55130, 13.47611 | [way/44397854](https://www.openstreetmap.org/way/44397854) |
| – |  |  |  | 52.55522, 13.48830 | [way/45727090](https://www.openstreetmap.org/way/45727090) |
| – |  |  |  | 52.55518, 13.48742 | [way/51073883](https://www.openstreetmap.org/way/51073883) |
| – |  |  |  | 52.55476, 13.48784 | [way/51073884](https://www.openstreetmap.org/way/51073884) |
| – |  |  |  | 52.55763, 13.45058 | [way/59431605](https://www.openstreetmap.org/way/59431605) |
| – |  |  |  | 52.56378, 13.45854 | [way/142065064](https://www.openstreetmap.org/way/142065064) |
| – |  |  |  | 52.56361, 13.45596 | [way/142065066](https://www.openstreetmap.org/way/142065066) |
| – |  |  |  | 52.55844, 13.47131 | [way/235286568](https://www.openstreetmap.org/way/235286568) |
| – |  |  |  | 52.55955, 13.43999 | [way/255322255](https://www.openstreetmap.org/way/255322255) |
| – |  |  |  | 52.55427, 13.47209 | [way/684711043](https://www.openstreetmap.org/way/684711043) |
| – |  |  |  | 52.55376, 13.48577 | [way/812872009](https://www.openstreetmap.org/way/812872009) |
| Bolzplatz |  |  |  | 52.54650, 13.46168 | [way/1022666160](https://www.openstreetmap.org/way/1022666160) |

#### Tennis (8)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55314, 13.48595 | [way/45726980](https://www.openstreetmap.org/way/45726980) |
| – |  |  |  | 52.55262, 13.48620 | [way/45726981](https://www.openstreetmap.org/way/45726981) |
| – |  |  |  | 52.55120, 13.44538 | [way/234191713](https://www.openstreetmap.org/way/234191713) |
| – |  |  |  | 52.55282, 13.48496 | [way/1275181497](https://www.openstreetmap.org/way/1275181497) |
| – |  |  |  | 52.55278, 13.48520 | [way/1275181498](https://www.openstreetmap.org/way/1275181498) |
| – |  |  |  | 52.55274, 13.48545 | [way/1275181499](https://www.openstreetmap.org/way/1275181499) |
| – |  |  |  | 52.55270, 13.48570 | [way/1275181500](https://www.openstreetmap.org/way/1275181500) |
| – |  |  |  | 52.55266, 13.48596 | [way/1275181501](https://www.openstreetmap.org/way/1275181501) |

#### Basketball (4)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.54640, 13.45396 | [node/4878788684](https://www.openstreetmap.org/node/4878788684) |
| – |  |  |  | 52.55450, 13.45578 | [way/174737169](https://www.openstreetmap.org/way/174737169) |
| – |  |  |  | 52.55443, 13.47744 | [way/344049307](https://www.openstreetmap.org/way/344049307) |
| – |  |  |  | 52.55410, 13.47626 | [way/590539405](https://www.openstreetmap.org/way/590539405) |

#### Athletics (4)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55465, 13.45582 | [way/174737171](https://www.openstreetmap.org/way/174737171) |
| – |  |  |  | 52.55455, 13.45537 | [way/174737172](https://www.openstreetmap.org/way/174737172) |
| – |  |  |  | 52.55446, 13.45514 | [way/174737173](https://www.openstreetmap.org/way/174737173) |
| – |  |  |  | 52.55777, 13.45184 | [way/1170506031](https://www.openstreetmap.org/way/1170506031) |

#### Baseball (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.56223, 13.45567 | [way/28721536](https://www.openstreetmap.org/way/28721536) |
| – |  |  |  | 52.56483, 13.45691 | [way/306663560](https://www.openstreetmap.org/way/306663560) |

#### Rugby (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55478, 13.48685 | [way/51073882](https://www.openstreetmap.org/way/51073882) |
| – |  |  |  | 52.55586, 13.49000 | [way/360656882](https://www.openstreetmap.org/way/360656882) |

#### Multi-sport (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55416, 13.45549 | [way/141225718](https://www.openstreetmap.org/way/141225718) |
| – |  |  |  | 52.55355, 13.43733 | [way/1026538407](https://www.openstreetmap.org/way/1026538407) |

#### Skateboard (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.56425, 13.45426 | [way/306663561](https://www.openstreetmap.org/way/306663561) |
| – |  |  |  | 52.54639, 13.45405 | [way/1019783454](https://www.openstreetmap.org/way/1019783454) |

#### Chess (1)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.54605, 13.45424 | [node/6657112477](https://www.openstreetmap.org/node/6657112477) |

#### Rugby (League) (1)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55552, 13.48908 | [way/46731442](https://www.openstreetmap.org/way/46731442) |

#### Archery (1)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.56537, 13.45570 | [way/306663587](https://www.openstreetmap.org/way/306663587) |

#### Football/basketball (1)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – | private |  |  | 52.54798, 13.46094 | [way/884231553](https://www.openstreetmap.org/way/884231553) |

#### Volleyball (1)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| – |  |  |  | 52.55712, 13.45060 | [way/1170506033](https://www.openstreetmap.org/way/1170506033) |

### Clubs/sport without a pitch object (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| German Neijiaquan Association - Verband für Innere Chinesische Kampfkunst | martial arts |  |  | 52.54780, 13.47910 | [node/1918497090](https://www.openstreetmap.org/node/1918497090) |
| Rugby Klub 03 Berlin e.V. | rugby | Hansastraße 190 |  | 52.55651, 13.48778 | [node/4955043266](https://www.openstreetmap.org/node/4955043266) |

### Markets (2)

| Name | Type | Address | Opening hours (OSM) | Location | OSM |
|---|---|---|---|---|---|
| Wochenmarkt Antonplatz |  |  | Tu,Fr 09:00-18:00; PH off | 52.54863, 13.45100 | [node/12356318726](https://www.openstreetmap.org/node/12356318726) |
| HansaMarkt - Trödelmarkt Weißensee |  | Hansastraße 188 | Su 09:00-16:00 | 52.55550, 13.48572 | [way/505312521](https://www.openstreetmap.org/way/505312521) |
