# Shorts (nach Phase 7, aus einem fertigen Video)

Ziel: Aus einem fertigen Video entstehen 2 bis 3 Shorts im Hochformat, die neue Zuschauer auf das ganze Video bringen. Shorts sind für neue Kanäle der schnellste Weg zu den ersten Aufrufen, weil YouTube sie im Shorts-Feed auch Nicht-Abonnenten zeigt.

## Themen wählen

Je ein Short pro **Stolperstein, Kostenpunkt oder Aha-Moment** aus dem Video. Ein Short beantwortet genau eine Frage. Beispiele: „Befehl wird nicht erkannt?“, „Ist das gratis?“, „Nichts passiert?“.

## Regeln, die bei Shorts anders sind

- **Kein Kanal-Einstieg.** Die ersten 1 bis 2 Sekunden entscheiden, ob jemand weiterwischt.
- **Das erste Bild ist das Titelbild.** Problem und Überschrift sind ab Frame 0 sichtbar, ohne Einblendung (`ab = -99` bzw. Terminalzeilen mit `ab: -999`). Ein eigenes Thumbnail-Bild ist bei Shorts nicht nötig.
- **Grosse Untertitel**, Wort für Wort mitlaufend, weil viele ohne Ton schauen (Baustein `Untertitel`).
- **Hochformat 1080 × 1920**, 20 bis 30 Sekunden.
- **Sichere Zone:** oben 160 px, unten 420 px, rechts 140 px frei lassen, dort liegen YouTubes Knöpfe und Texte.
- **Kurz gebaut:** 4 Szenen genügen: Aufhänger (Problem als Frage), Einordnung, Lösung, Verweis aufs ganze Video.
- **Tempo:** Nach den ersten zwei Szenen 0,3 s Pause kürzen.
- **Keine Telegrammsätze** im Sprechtext (siehe Sprechregeln). Die KI-Stimme hetzt sonst.

## Bauen

1. `videos/sNN-<thema>/drehbuch.md` mit 4 Szenen, vertonen mit `stimme.mjs` (wenige hundert Zeichen).
2. Nach dem Vertonen das Tempo prüfen: Wörter pro Sekunde sollten um 2,5 liegen. Deutlich mehr heisst: Satz umformulieren.
3. Komponente in `src/videos/shorts/ShortNN.tsx` mit den Teilen aus `src/videos/shorts/teile.tsx` (`Kopf`, `Mitte`, `ShortSzene`, `Verweis`). Vorlagen und ein Beispiel-Short mit Drehbuch: [../vorlagen/shorts/](../vorlagen/shorts/).
4. In `Root.tsx` im Ordner „Shorts“ registrieren (1080 × 1920).
5. Standbild-Raster: Frame 0 (Titelbild) und je ein Bild pro Szene.
6. Rendern, MP4 in den Chat schicken.

## Veröffentlichen

`videos/sNN-<thema>/youtube.md` mit Titel (mit `#shorts`), Beschreibung (Link zum ganzen Video, Hinweis KI-Stimme) und den Einstellungen.

Für die Person:
- Hochladen wie ein normales Video in YouTube Studio. YouTube erkennt am Hochformat, dass es ein Short ist.
- Tags sind nicht nötig. Kategorie „Bildung“, Kinder „Nein“.
- **„Ähnliches Video“** (Link aufs ganze Video) erscheint oft erst nach dem Hochladen: Studio → Inhalte → Reiter „Shorts“ → Short anklicken → Details → „Ähnliches Video“. Sonst in der YouTube-App beim Bearbeiten.
- **Ein Short pro Tag**, nicht alle auf einmal.
- Shorts finden: Kanal → Reiter „Shorts“, oder Studio → Inhalte → „Shorts“.

Link jedes Shorts in `KANAL-STATUS.md` eintragen.
