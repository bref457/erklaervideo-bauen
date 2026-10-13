# Phase 5: Bildmaterial (pro Video)

Ziel: Für jede BROWSER-Szene gibt es ein echtes Foto der öffentlichen Seite mit Klickzielen, für jede WINDOWS-Szene ist klar, welcher Nachbau gebraucht wird. Niemand muss etwas aufnehmen.

## Warum nachstellen statt aufnehmen

Eine echte Bildschirmaufnahme braucht einen sauberen Rechner (neuer Windows-Benutzer, nichts installiert), ein zweites Konto beim Anbieter und eine Stunde Zeit der Person. Sie zeigt leicht Persönliches. Ein nachgestellter Ablauf zeigt dieselben Schritte, ist sauber, anonym und lässt sich ändern, wenn sich die Seite ändert. In der Beschreibung steht ehrlich „Abläufe nachgestellt, Stand <Monat Jahr>“.

## 1. Seiten fotografieren

In `videos/<nr>/seiten.json` die öffentlichen Seiten eintragen:

```json
[
  {"name": "produkt", "url": "https://…", "ganz": true, "marken": ["Überschrift, zu der gescrollt wird"]},
  {"name": "download", "url": "https://…"}
]
```

```
python werkzeuge/seiten.py videos/<nr>-<thema>
```

Das Skript lehnt Cookie-Banner ab, fotografiert in 1920 Breite (mit `"ganz": true` die ganze Seite, damit das Scrollen im Video animiert werden kann) und schreibt pro Seite ein JSON mit allen Links und Knöpfen (Text, Mitte x/y, Grösse) und den Positionen der Marken. Daraus nimmt die Animation die Klickziele.

Kontrolle: Ausschnitte der Fotos an den wichtigen Stellen ansehen (Knopf, Befehl, Preise) und die genauen Positionen notieren. Seiten leiten manchmal weiter (die gespeicherte `url` im JSON zeigt die echte Adresse).

Nie fotografieren: Seiten mit Anmeldung, Konto, Zahlung, persönliche Bereiche.

## 2. Nachbauten planen

Für jede WINDOWS-Szene und jede Seite hinter einer Anmeldung festlegen, was nachgebaut wird. Vorhandene Bausteine ([../vorlagen/remotion/bausteine/](../vorlagen/remotion/bausteine/)):

| Baustein | Zeigt |
|---|---|
| `Browser` | Browserfenster mit Adresszeile, Seitenfoto oder nachgebauter Seite, Scrollen, Markierungen |
| `Mauszeiger` (in Browser.tsx) | Mauszeiger mit weichen Wegen und Klick-Ring |
| `Terminal` | PowerShell oder KI-Agent im Terminal, Befehle tippen sich, Ausgaben, Fehler, Auswahl |
| `Desktop`, `Startmenue`, `Fenster`, `Download`, `Assistent`, `Verdeckt` (Windows.tsx) | neutraler Windows-Desktop, Startmenü-Suche, Programmfenster, Download-Hinweis, Installationsassistent mit „Weiter“, unkenntliche Daten |
| `Plakette` (Szene.tsx) | Hinweis unten links, z. B. „Kein Administrator nötig“ |
| `Signal` | Warnschild |

Texte in nachgebauten Programmen (z. B. Begrüssung eines Programms, Fehlermeldungen) möglichst aus der offiziellen Dokumentation. Was nur aus dem Gedächtnis kommt, der Person als ungeprüft nennen.

## Fertig, wenn

- [ ] Fotos aller öffentlichen Seiten mit JSON in `public/aufnahmen/<video>/`.
- [ ] Wichtige Klickziele und Markierungen notiert.
- [ ] Liste der Nachbauten pro Szene.
- [ ] Nicht mehr gebrauchte Fotos entfernt (mit OK der Person).

Weiter mit [Phase 6: Animation und Schnitt](6-animation.md).
