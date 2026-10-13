# Phase 4: Stimme (pro Video)

Ziel: Jede Szene ist vertont, mit Zeitstempeln pro Zeichen, und die Person hat den ganzen Sprechtext am Stück gehört.

## 1. Vertonen

```
node werkzeuge/stimme.mjs videos/<nr>-<thema>
```

Das Skript
- liest `drehbuch.md`, schickt jede Szene an ElevenLabs (`/with-timestamps`),
- gibt den Text der Nachbarszenen mit (`previous_text`, `next_text`), damit die Betonung über Szenengrenzen gleich bleibt,
- speichert `public/stimme/<video>/s01.mp3` und `s01.json` (Text, Länge, Zeitstempel),
- überspringt Szenen, deren Text sich nicht geändert hat. Korrekturen kosten also nur die geänderte Szene.

Vorher kurz die Zeichenzahl nennen (Sprechtext ohne `> `), damit die Person weiss, was es kostet.

## 2. Zum Anhören zusammenfügen

Alle Szenen mit 0,8 s Pause zu einer Datei zusammenfügen und in den Chat schicken:

```
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.8 -c:a libmp3lame -b:a 128k pause.mp3
# liste.txt: file 's01.mp3' / file 'pause.mp3' / ...
ffmpeg -f concat -safe 0 -i liste.txt -c:a libmp3lame -b:a 128k sprechtext-komplett.mp3
```

Dazu sagen, worauf die Person achten soll: Aussprache von Produktnamen, Webadressen, Abkürzungen.

## 3. Korrigieren

- **Falsche Aussprache:** Sprechtext umschreiben (siehe Sprechregeln), nur diese Szene wird neu vertont. Die geänderte Szene einzeln in den Chat schicken.
- **Inhaltliche Fehler** (z. B. falsche Perspektive, fehlender Schritt): im Drehbuch ändern, neu vertonen, einzeln vorspielen.

## Abnahme

Die Person sagt, dass es gut klingt.

## Fertig, wenn

- [ ] Alle Szenen vertont, `szenen.json` aktuell.
- [ ] Gesamte Hördatei angehört und bestätigt.
- [ ] Ausspracheprobleme behoben.

Weiter mit [Phase 5: Bildmaterial](5-bildmaterial.md).
