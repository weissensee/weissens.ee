# weissens.ee

Der Event-Kalender für Berlin-Weißensee, eine Instanz von
[openLitfass](../openlitfass/README.md).

Dieses Repo enthält nur Inhalte und Gestaltung. Code, Frontend und
Container-Image kommen aus dem Kern-Repo (Aufbau einer Instanz:
`docs/instance.md` dort).

| Datei/Ordner | Inhalt |
|---|---|
| `instance.json` | Name, Titel, Zeitzone, Base-URL |
| `sources/` | Quellen (aktiv: Familienzentrum, Brotfabrik, Freilichtbühne, Stadtteilzentrum, Peter Edel; siehe `docs/quellen-checkliste.md`) |
| `inbox/` | Einzel-Events von Hand |
| `categories.json` | Kategorien + Piktogramme |
| `site/` | Theme (Seeblau-Petrol/Backstein), Logo |
| `data/` | generiert von `fetch` (echte Termine, Stand des letzten Laufs) |
| `docs/` | Quellenrecherche, Quellen-Checkliste, Farbsystem |

## Betreiben / lokal ansehen

Im Ordner dieses Repos, mit gebautem oder gezogenem Kern-Image:

```sh
docker run -d --name weissens --restart unless-stopped -v "$PWD:/instance" -p 8080:8080 openlitfass
```

Dann <http://localhost:8080>. Der Container ruft alle 6 Stunden ab und baut
neu; Zustand unter <http://localhost:8080/healthz>. Er schreibt dabei in
`data/`, die `status`-Felder in `sources/` und löscht abgelaufene
`inbox/`-Dateien – Änderungen bei Bedarf committen. Details: Kern-Doku
`docs/instance.md` → "Betrieb".
