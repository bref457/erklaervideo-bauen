# Phase 6: Animation und Schnitt (pro Video)

Ziel: Das ganze Video läuft in Remotion, jede Animation sitzt auf dem gesprochenen Wort, und die Person hat einen MP4-Entwurf angesehen und bestätigt.

Vorher die offiziellen Remotion-Regeln laden (Skill `remotion-best-practices` im Projekt): Animationen nur mit `useCurrentFrame()` und `interpolate()`, keine CSS-Animationen, `premountFor={fps}` an Sequenzen und Medien, `fps` aus `useVideoConfig()`.

## 1. Aufbau

Muster: [../vorlagen/beispiel-video/](../vorlagen/beispiel-video/).

- `src/videos/v<nr>/Szenen.tsx`: eine Komponente pro ANIM-Szene, importiert die `sNN.json` der Stimme.
- `src/videos/v<nr>/Nachgestellt.tsx`: BROWSER- und WINDOWS-Szenen.
- `src/videos/v<nr>/Video<nr>.tsx`: `<Series>` mit allen Szenen, **Kanal-Einstieg nach Szene 1** und **Kanal-Abspann als letzte Sequenz** (`ABSPANN_SEKUNDEN`, mit `naechstes="<Titel des nächsten Videos>"`, wenn es eins gibt). Die Gesamtlänge zählt beide mit.
- `src/Root.tsx`: Gesamtvideo plus jede Szene als eigene Komposition (Ordner pro Video), damit Standbilder einzeln gerendert werden können.

Länge jeder Szene: `szenenLaenge(stimme, fps)` = 0,4 s Vorlauf + Sprechzeit + 0,7 s Nachlauf. Die Stimme läuft im Baustein `Szene` automatisch mit.

## 2. Auf das Wort genau

`wortFrame(stimme, "Wort", fps)` liefert den Frame, an dem die Stimme dieses Wort beginnt. Jede Einblendung, jeder Mausklick, jedes Warnschild hängt daran, nie an festen Sekunden. Ändert sich der Sprechtext, wandern die Animationen von selbst mit.

Typische Muster (dazu für Abwechslung: wichtige Befehle und Knöpfe **heranzoomen oder markieren**, nicht nur zeigen):
- Checkliste: jeder Haken beim passenden Wort.
- Kosten: Durchstreichen bei „funktioniert erst“, Preis bei der Zahl.
- Browser: Mauszeiger fährt zum Knopf, wenn er genannt wird, Klick 10 bis 15 Frames später, dann Seitenwechsel.
- Stolperstein: Befehl tippt sich, Fehlermeldung beim Wort „nicht gefunden“, Warnschild springt ein, Lösung beim Wort „Schliess“.
- Plakette einige Frames vor dem Wort einblenden.

## Lesbar auf dem Handy

Die meisten schauen auf dem Handy. Was im 1920er-Bild klein ist, ist dort winzig.
- **Terminal:** Schrift mindestens **42 px** (Standard im Baustein `Terminal`), lieber weniger Zeilen als kleine Schrift.
- **Webseiten-Fotos:** Wichtige Stellen (Befehl, Knopf, Preis) mit der **Lupe** im Baustein `Browser` heranzoomen (`lupe={{ ab, x, y, faktor: 2 }}`), zusätzlich markieren. Den Mauszeiger während der Lupe ausblenden.
- **Text im Bild:** Überschriften mindestens 60 px, Hinweise (Plaketten) mindestens 36 px.
- Prüfen: Standbild auf etwa 400 px Breite verkleinern. Ist der wichtige Text noch lesbar?

## 3. Prüfen mit Standbildern

Statt sich jedes Mal das ganze Video anzusehen: wichtige Momente als Standbild rendern und zu einem Raster zusammensetzen.

```
npx remotion still <Komposition> out/pruefen/n01.jpg --frame=<f> --scale=0.5
ffmpeg -i out/pruefen/n%02d.jpg -vf tile=4x4 -frames:v 1 out/pruefen/raster.jpg
```

Die Frames berechnen, indem man für die geprüften Wörter `wortFrame` mit etwas Abstand nimmt. Typische Fehler: Text bricht um (`whiteSpace: "nowrap"`), Wörter werden mitten im Wort getrennt (`overflowWrap: "break-word"` statt `break-all`), Markierung sitzt daneben (Position im Seitenfoto nachmessen), Zeichen fehlen in der Schrift.

Einmal gebündelt beheben, höchstens ein zweiter Durchgang.

## 4. Lautheit prüfen

YouTube spielt Videos mit etwa **−14 LUFS** ab. Nach dem Rendern messen:

```
ffmpeg -hide_banner -nostats -i out/<datei>.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:"
```

Ziel: I zwischen −15 und −13 LUFS, Peak unter −1 dBFS. Mit den ElevenLabs-Stimmen passt das meist von selbst. Wenn nicht, angleichen:

```
ffmpeg -i out/<datei>.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 out/<datei>-laut.mp4
```

## 5. Entwurf rendern und zeigen

```
npx remotion render <Gesamtvideo> out/<nr>-entwurf.mp4 --codec=h264 --crf=20
```

Die Datei **direkt in den Chat schicken**. Das Remotion Studio ist für die Person meist umständlich, die MP4 kann sie überall ansehen.

## Abnahme

Die Person sieht den Entwurf an und sagt „passt“ oder was zu ändern ist. Kleine Änderungen (Text einer Plakette, Zeitpunkt) direkt, Änderungen am Sprechtext zurück in Phase 4 (nur die Szene).

## Fertig, wenn

- [ ] Alle Szenen gebaut, keine Platzhalter.
- [ ] Kanal-Einstieg nach Szene 1 und Kanal-Abspann am Schluss eingefügt.
- [ ] „NACHGESTELLT“ in allen nachgestellten Szenen.
- [ ] Keine echten persönlichen Daten im Bild.
- [ ] Standbild-Raster geprüft, Text auch verkleinert lesbar.
- [ ] Lautheit gemessen (um −14 LUFS).
- [ ] Entwurf als MP4 von der Person bestätigt.

Weiter mit [Phase 7: Veröffentlichen](7-veroeffentlichen.md).
