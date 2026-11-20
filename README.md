# weissens.ee

Der Event-Kalender für Berlin-Weißensee, eine Instanz von
[openLitfass](../openlitfass/README.md).

Dieses Repo enthält nur Inhalte und Gestaltung. Code, Frontend und
Container-Image kommen aus dem Kern-Repo (Aufbau einer Instanz:
`docs/instance.md` dort).

| Datei/Ordner | Inhalt |
|---|---|
| `instance.json` | Name, Titel, Zeitzone, Base-URL |
| `sources/` | Quellen (aktuell nur Vorlage `familienzentrum-weissensee.example.json`) |
| `inbox/` | Einzel-Events von Hand |
| `categories.json` | Kategorien + Piktogramme |
| `site/` | Theme (Seeblau-Petrol/Backstein), Logo |
| `data/` | generiert von `fetch` (aktuell noch Demo-Daten vom Juli 2026) |
| `docs/` | Quellenrecherche, Quellen-Checkliste, Farbsystem |

## Lokal ansehen

Im Ordner dieses Repos, mit gebautem Kern-Image (siehe Kern-README):

```sh
docker run --rm -v "$PWD:/instance" -w /instance openlitfass fetch .
docker run --rm -v "$PWD:/instance" -w /instance openlitfass build-site .
docker run --rm -p 8080:80 -v "$PWD/public:/usr/share/nginx/html:ro" nginx:alpine
```

`fetch` aktualisiert Status-Felder in `sources/` und löscht abgelaufene
`inbox/`-Dateien, also vorher committen.
