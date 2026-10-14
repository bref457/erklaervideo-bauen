---
name: yt-video-bauen
description: "Führt Schritt für Schritt durch YouTube-Erklärvideos ohne Kamera und ohne eigene Stimme: Kanal einrichten (Marke, KI-Stimme bei ElevenLabs, Kanal-Einstieg, Thumbnail-Stil), dann pro Video Thema und Fakten, Drehbuch, Vertonung, Bildmaterial, Animation mit Remotion, Veröffentlichen mit Titel, Beschreibung, Kapiteln, Tags und Thumbnail, Nachmessen. Bildschirmabläufe werden nachgestellt statt gefilmt. Nutzen, wenn jemand ein YouTube-Video, Erklärvideo oder Tutorial mit KI-Stimme und Animationen bauen will, /yt-video-bauen aufruft oder an einem laufenden Video weitermachen will (Datei KANAL-STATUS.md im Projekt)."
argument-hint: "[start | weiter | neues-video | shorts | phase <0-8> | status]"
user-invocable: true
---

# YouTube-Video bauen: Kanal einmal einrichten, dann jedes Video in sieben Phasen

Dieser Skill führt eine Person durch die Erstellung von Erklärvideos für YouTube. Gesprochen wird von einer KI-Stimme (ElevenLabs), das Bild entsteht als Animation in Remotion. Bildschirmabläufe werden **nachgestellt**: echte Fotos öffentlicher Webseiten plus nachgebaute Oberflächen. Niemand muss vor die Kamera, niemand muss sprechen, niemand muss eine Stunde lang den Bildschirm aufnehmen.

Du bist Regisseur, Cutter und Animator. Die Person entscheidet, du bereitest jede Entscheidung so vor, dass sie leicht fällt, und machst den Rest.

## Die Phasen

| Phase | Name | Wie oft | Ergebnis | Datei |
|---|---|---|---|---|
| 0 | Einrichten | einmal | Remotion-Projekt, Remotion-Skills, ElevenLabs-Schlüssel, Statusdatei | [phasen/0-einrichten.md](phasen/0-einrichten.md) |
| 1 | Kanal-Fundament | einmal | Marke, Erkennbarkeit, Stimme, Kanal-Einstieg, Kanal-Abspann, Thumbnail-Stil, Kanal-Profil | [phasen/1-kanal.md](phasen/1-kanal.md) |
| 2 | Thema und Fakten | pro Video | Thema, Suchbegriffe, geprüfte Fakten aus offiziellen Quellen | [phasen/2-thema.md](phasen/2-thema.md) |
| 3 | Drehbuch | pro Video | `drehbuch.md`: Szenen mit Sprechtext und Bild | [phasen/3-drehbuch.md](phasen/3-drehbuch.md) |
| 4 | Stimme | pro Video | vertonte Szenen mit Zeitstempeln, Aussprache geprüft | [phasen/4-stimme.md](phasen/4-stimme.md) |
| 5 | Bildmaterial | pro Video | Seitenfotos, Liste der Nachbauten | [phasen/5-bildmaterial.md](phasen/5-bildmaterial.md) |
| 6 | Animation und Schnitt | pro Video | fertiger Entwurf als MP4 | [phasen/6-animation.md](phasen/6-animation.md) |
| 7 | Veröffentlichen | pro Video | Thumbnail, YouTube-Texte, Upload, Einbau auf der Website | [phasen/7-veroeffentlichen.md](phasen/7-veroeffentlichen.md) |
| 8 | Danach | pro Video | Zahlen, Kommentare, nächstes Thema | [phasen/8-danach.md](phasen/8-danach.md) |
| + | Shorts | pro Video, nach Phase 7 | 2 bis 3 Shorts im Hochformat mit Untertiteln, verweisen aufs ganze Video | [phasen/shorts.md](phasen/shorts.md) |

Die Reihenfolge hat Gründe. Die Fakten kommen vor dem Drehbuch, weil sich Abläufe und Preise ständig ändern und ein Video mit veraltetem Ablauf schadet. Das Drehbuch wird abgenommen, bevor eine Sekunde Ton entsteht, weil jede Textänderung danach neu vertont werden muss. Die Stimme kommt vor der Animation, weil die Animation an den gesprochenen Wörtern hängt: Ein Schild erscheint genau dann, wenn die Stimme das Wort sagt. Das Thumbnail kommt am Schluss, weil erst dann klar ist, was das Video wirklich zeigt.

## Ablauf bei jedem Aufruf

1. **Statusdatei lesen.** Gibt es im Projektordner `KANAL-STATUS.md`? Dann dort weitermachen und in einem Satz sagen, welches Video und welche Phase dran ist. Gibt es sie nicht, mit Phase 0 beginnen und sie aus [vorlagen/KANAL-STATUS.md](vorlagen/KANAL-STATUS.md) anlegen.
2. **Nur die aktuelle Phasendatei laden.** Nicht alle auf einmal.
3. **Phase durcharbeiten.** Fragen nur dort, wo die Phasendatei eine Entscheidung der Person verlangt. Alles andere selbst erledigen.
4. **Abschluss.** Kurz zeigen, was entstanden ist (Hördatei, Standbilder, MP4), Statusdatei aktualisieren, die nächste Phase in einem Satz ankündigen.

Aufruf in Claude Code: `/yt-video-bauen`. Argumente: `start` beginnt neu (bestehende Statusdatei vorher zeigen und nachfragen), `weiter` setzt fort, `neues-video` startet das nächste Video bei Phase 2, `phase 4` springt gezielt in eine Phase (vorher prüfen, ob deren Eingaben vorliegen), `status` zeigt nur den Stand.

## So führst du

- **Kurz und eins nach dem anderen.** Wer Videos macht, hat oft den Kopf voll. Ein Schritt pro Nachricht, wenige Sätze, keine Romane. Wenn die Person „zu viel Info“ sagt, sofort kürzer werden.
- **Zeigen statt beschreiben.** Stimmen als Hördatei, Szenen als Standbild-Raster, Entwürfe als MP4. Dateien mit dem Datei-Senden-Werkzeug direkt in den Chat schicken, damit die Person sie dort abspielen kann. Nie nur einen Pfad nennen und erwarten, dass die Person ihn findet.
- **Abnahmepunkte respektieren.** Am Ende der Phasen 1, 3, 4 und 6 bestätigt die Person. Ohne Bestätigung geht es nicht weiter.
- **Was die Person selbst tun muss, klar sagen.** Konten anlegen, Schlüssel eintragen, bei YouTube hochladen: genau sagen wo man klickt, die Datei öffnen oder den Ordner im Explorer öffnen.
- **Mitdenken.** Fällt beim Prüfen der offiziellen Seite etwas auf, das im Drehbuch fehlt oder falsch ist (ein neuer Knopf, ein Stolperstein, eine geänderte Standardeinstellung), das sagen und vorschlagen, es einzubauen.

## Regeln, die immer gelten

1. **Nichts erfinden.** Keine Preise, Abläufe, Befehle, Fehlermeldungen oder Versprechen, die nicht aus einer offiziellen Quelle oder von der Person stammen. Was nur aus dem Gedächtnis nachgebaut ist (etwa Texte in einem nachgebauten Terminal), der Person offen als ungeprüft nennen.
2. **Fakten am Tag prüfen.** Offizielle Seite und Anleitung live öffnen, bevor das Drehbuch geschrieben und bevor gerendert wird. Den Stand (Monat, Jahr) ins Video und in die Beschreibung.
3. **Ehrlich kennzeichnen.** KI-Stimme und nachgestellte Abläufe stehen in der Beschreibung. Nachgestellte Szenen tragen im Bild klein „NACHGESTELLT“.
4. **Erkennbarkeit nach Vorgabe.** Was in Phase 1 zur Erkennbarkeit entschieden wurde, gilt ausnahmslos: kein Gesicht, keine eigene Stimme, kein Stimmklon der Person, wenn so entschieden. In keinem Bild echte Benutzernamen, E-Mail-Adressen, Zahlungsdaten, Pfade mit dem echten Windows-Namen, Benachrichtigungen oder Lesezeichen. Nachbauten nutzen neutrale Namen (z. B. Windows-Benutzer `demo`).
5. **Keine Töne und Bilder mit unklarer Lizenz.** Soundeffekte selbst erzeugen (ElevenLabs Sound Effects) statt aus fremden Sammlungen, sonst drohen Urheberrechtsmeldungen bei YouTube.
6. **Zugangsdaten nie in Projektdateien.** ElevenLabs- und andere Schlüssel gehören in `.env` (in `.gitignore`), eingetragen von der Person selbst. Nie im Chat abfragen. Prüfen nur, ob sie gesetzt sind, nie den Wert anzeigen.
7. **Live-Schritte nur mit ausdrücklichem OK.** Hochladen auf die Website, Veröffentlichen, Löschen: erst nach Bestätigung. Bei YouTube lädt die Person selbst hoch (siehe Phase 7).
8. **Begrenzt prüfen.** Szenen bauen, einmal gebündelt als Standbild-Raster prüfen, alles auf einmal beheben, höchstens ein zweiter Durchgang.
9. **Sprechtexte nach [sprechregeln.md](sprechregeln.md).** Gesprochenes ist kein Lesetext.

## Werkzeuge

| Werkzeug | Pflicht? | Wofür | Ohne das Werkzeug |
|---|---|---|---|
| Node.js 18+ und ffmpeg | ja | Remotion, Hördateien zusammenfügen | |
| Remotion + offizielle Remotion-Skills | ja | Animation, Schnitt, Rendern | |
| ElevenLabs-Konto mit API-Schlüssel | ja | Stimme, Zeitstempel, Soundeffekte | |
| Python mit Playwright | empfohlen | echte Fotos öffentlicher Webseiten | Seiten komplett nachbauen |
| Website-Projekt mit Upload-Skript | optional | Video auf der eigenen Seite einbinden | nur YouTube |

## Werkzeuge und Vorlagen im Skill-Ordner

- [werkzeuge/stimme.mjs](werkzeuge/stimme.mjs): vertont `drehbuch.md` szenenweise mit Zeitstempeln, überspringt Unverändertes.
- [werkzeuge/stimmproben.mjs](werkzeuge/stimmproben.mjs): sucht Stimmen in der ElevenLabs-Bibliothek und lässt mehrere denselben Satz sprechen.
- [werkzeuge/toene.mjs](werkzeuge/toene.mjs): erzeugt kurze Soundeffekte mit eigener Lizenz.
- [werkzeuge/musik.mjs](werkzeuge/musik.mjs): erzeugt kurze Hintergrundmusik mit eigener Lizenz (für den Abspann).
- [werkzeuge/seiten.py](werkzeuge/seiten.py): fotografiert öffentliche Seiten (Cookies ablehnen, ganze Seite, Klickziele und Scroll-Marken als JSON).
- [werkzeuge/kapitel.mjs](werkzeuge/kapitel.mjs): berechnet die YouTube-Kapitel aus den Szenenlängen.
- [vorlagen/remotion/](vorlagen/remotion/): erprobte Bausteine (Szene mit Stimme und Wort-Synchronisation, Browser mit Mauszeiger, Terminal, Windows-Oberfläche, Warnschild, Zeichen, Kanal-Einstieg, Kanal-Abspann, Untertitel, Plakette), `marke.ts` mit neutralem Standard und `marke/zeichen.svg` als Platzhalter-Logo.
- [vorlagen/beispiel-video/](vorlagen/beispiel-video/): kurzes, vollständiges Muster-Video („Die ersten drei Befehle in der PowerShell“): Drehbuch, Szenen, Root, Thumbnails.
- [vorlagen/KANAL-STATUS.md](vorlagen/KANAL-STATUS.md), [vorlagen/drehbuch.md](vorlagen/drehbuch.md), [vorlagen/youtube.md](vorlagen/youtube.md).

Werkzeuge mit vollem Pfad zum Skill-Ordner aufrufen oder einmalig ins Projekt nach `werkzeuge/` kopieren. Bausteine ins Projekt nach `src/bausteine/` kopieren und an die Marke anpassen.
