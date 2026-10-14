# Phase 7: Veröffentlichen (pro Video)

Ziel: Das Video ist mit Thumbnail, Titel, Beschreibung, Kapiteln und Tags öffentlich auf YouTube und, falls es eine Website gibt, dort eingebunden.

## 1. Thumbnail

Drei Varianten im Kanal-Stil als `<Still>` (1280 × 720), Muster: [../vorlagen/beispiel-video/Vorschaubild.tsx](../vorlagen/beispiel-video/Vorschaubild.tsx):
- **A sachlich:** das Thema in 2 bis 3 grossen Wörtern, Maskottchen, Symbol.
- **B Problem:** die Fehlermeldung oder der Stolperstein als Frage.
- **C Kosten oder Ergebnis:** Preis oder fertiges Ergebnis gross.

Alle drei rendern und in den Chat schicken, mit Empfehlung. Für eine Grundanleitung meist A, weil Leute nach dem Thema suchen.

## 2. Finale Fassung rendern

```
npx remotion render <Gesamtvideo> out/<nr>-<thema>.mp4 --codec=h264 --crf=18
```

Thumbnail nach `out/<nr>-thumbnail.png` kopieren. Den Ordner `out` für die Person im Explorer öffnen und beide vollständigen Pfade nennen.

## 3. YouTube-Texte

`videos/<nr>/youtube.md` aus [../vorlagen/youtube.md](../vorlagen/youtube.md):
- **Titel:** Hauptbegriff vorn, unter 70 Zeichen, mit Jahr bei Anleitungen.
- **Beschreibung:** zwei Sätze worum es geht, wichtige Befehle zum Kopieren, offizielle Links, Website, Kapitel, Hinweise („Die Stimme in diesem Video ist KI-generiert. Die Abläufe am Bildschirm sind nachgestellt, Stand <Monat Jahr>.“).
- **Kapitel:** mit [../werkzeuge/kapitel.mjs](../werkzeuge/kapitel.mjs) aus den Szenenlängen berechnen. Erstes Kapitel muss `0:00` sein.
- **Tags:** 6 bis 10 Begriffe, durch Komma getrennt.

## 4. Hochladen (macht die Person)

Upload über die YouTube-Schnittstelle ist möglich, aber Videos aus nicht geprüften API-Projekten bleiben privat, bis Google das Projekt geprüft hat (Audit). Darum lädt die Person selbst hoch, das dauert mit fertiger `youtube.md` etwa 5 Minuten. Anleitung Schritt für Schritt:

1. studio.youtube.com → Erstellen → Videos hochladen → MP4 hineinziehen.
2. Titel und Beschreibung aus `youtube.md` kopieren.
3. Thumbnail hochladen.
4. „Nein, nicht speziell für Kinder“.
5. **Tags:** ganz unten auf „Mehr anzeigen“ klicken, dort ist das Feld.
6. Veränderte oder synthetische Inhalte: Bei einer KI-Erzählstimme ohne echte Person ist das nicht eindeutig. Im Zweifel „Ja“.
7. **Abspann** (Seite „Videoelemente“ beim Hochladen, oder später Studio → Inhalte → Video → Abspann): „Element hinzufügen“ → **Video** („Für Zuschauer am besten geeignet“, oder gezielt das nächste passende lange Video) und **Abonnieren**. Beide Elemente auf die gestrichelten Flächen im Abspann ziehen (Video links, Abo rechts) und auf die ganzen 18 Sekunden ausdehnen.
8. Sichtbarkeit zuerst „Nicht gelistet“, einmal ansehen, dann „Öffentlich“.
9. **Angepinnter Kommentar** nach dem Veröffentlichen, mit einer Frage, z. B. „Wo hat es bei dir nicht geklappt? Schreib es hier rein.“ Kommentar schreiben, dann über die drei Punkte „Anpinnen“.

Häufig: Die Datei wird aus Versehen zweimal hochgeladen. Dann steht ein Video als „Entwurf“ ohne Titel in der Liste. Löschen über die drei Punkte → „Endgültig löschen“.

Die Person schickt den Link zum Video.

## 5. Auf der Website einbinden

Wenn die Website Videos per Klick lädt (Vorschaubild lokal, YouTube erst nach Klick über youtube-nocookie.com):
1. Thumbnail als JPG mit der Video-ID als Dateinamen in den Bilderordner der Website (nicht von YouTube laden, sonst geht schon vor dem Klick eine Anfrage an Google).
2. Video-ID und Titel in die Videoliste der Website eintragen.
3. Lokal prüfen: vor dem Klick keine Anfrage an fremde Server, nach dem Klick spielt das Video.
4. Erst hochladen, wenn das Video öffentlich ist (mit OK der Person). Danach live prüfen.

## Fertig, wenn

- [ ] Thumbnail gewählt.
- [ ] Finale MP4 und `youtube.md` fertig.
- [ ] Abspann-Elemente gesetzt (Video und Abonnieren).
- [ ] Video öffentlich, Link in `KANAL-STATUS.md`.
- [ ] Kommentar mit Frage angepinnt.
- [ ] Doppelte Entwürfe gelöscht.
- [ ] Auf der Website eingebunden und live geprüft (falls vorhanden).

Weiter mit [Phase 8: Danach](8-danach.md).
