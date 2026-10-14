# Instagram: Reels

Ziel: Videos laufen als Reels auf Instagram. Wer YouTube und Instagram nutzt, baut **kein neues Video**: Derselbe Code rendert aus jedem Short eine zweite Fassung, die in Instagrams sichere Zone passt und am Schluss auf YouTube verweist.

Welcher Weg gilt, steht in `KANAL-STATUS.md` unter „Plattformen“ (Phase 1).

## Einmal: Konto einrichten

Hier passieren die Fehler, die die Anonymität kosten. Darum Schritt für Schritt begleiten, ein Schritt pro Nachricht:

1. Konto **im privaten Browserfenster** anlegen (Ctrl+Shift+N → instagram.com → Registrieren), nicht in einer App, in der ein privates Konto angemeldet ist.
2. Mit einer eigenen E-Mail-Adresse für den Kanal, **ohne Telefonnummer, ohne Facebook**.
3. Optionale Cookies **ablehnen**.
4. **Name** mit Stichwort, weil er durchsuchbar ist (z. B. „Kanalname · Thema“). **Benutzername** wie bei YouTube, damit man den Kanal überall gleich findet. Das Geburtsdatum ist Pflicht und wird nicht angezeigt.
5. Angebote wie „Kontakte synchronisieren“, „Mit Facebook verbinden“ und „Zur Kontenübersicht hinzufügen“ **ablehnen**, wenn die Person nicht erkennbar sein will. Eine Verknüpfung ist nach aussen unsichtbar, führt aber zu Kontaktvorschlägen bei Leuten, die die Person kennen, und zu versehentlichem Mitposten.
6. Mit dem privaten Konto dem Kanal **nicht folgen, nichts liken und nichts kommentieren**. Follower-Listen sind öffentlich, und Instagram zeigt Freunden „Gefolgt von …“.
7. **Profilbild:** Logo oder Maskottchen quadratisch auf ruhigem Grund, etwas kleiner als das Bild, weil Instagram rund zuschneidet. Als 1080 × 1080 PNG rendern (z. B. das SVG mit Playwright fotografieren) und der Person zusätzlich eine runde Vorschau zeigen, gross und in 110 px.
8. **Bio** (höchstens 150 Zeichen): Thema, Nutzen und, wenn es YouTube gibt, der Hinweis darauf. Muster: „<Thema> ehrlich erklärt / <was man lernt>: kurz gezeigt. / Ganze Videos: YouTube @<handle>“.
9. **Links** lassen sich im Browser nicht eintragen, nur in der App. Bis dahin den Kanal als Text in die Bio schreiben. Später in der App eintragen (wer anonym bleiben will: anmelden, Links eintragen, abmelden, „Kontenübersicht“ ablehnen).

## Pro Short: Reel-Fassung bauen (YouTube und Instagram)

1. **Sichere Zone:** Meta empfiehlt für Reels (Ads Guide) oben 14 %, unten 35 %, seitlich 6 % frei, bei 1080 × 1920 also **y 269 bis 1248, x 65 bis 1015**. Für normale Reels nennt Meta keine eigene Zahl, das ist die sichere Seite. YouTube-Shorts verletzen das (Untertitel bei y 1230, Titel bei y 190).
2. **Schalter `format`:** Jeder Short nimmt `format?: "youtube" | "instagram"` und umhüllt seine `<Series>` mit `<FormatRahmen format={format}>`. Alle Abstände stehen zentral in `LAYOUT` in `src/videos/shorts/teile.tsx` ([Vorlage](../vorlagen/shorts/teile.tsx)). Die Instagram-Werte sind erprobt:
   - Titel y 290, 86 px
   - Mitte 60 px höher, auf 88 % verkleinert
   - Untertitel y 1070, 74 px
   - Zeichen oben rechts y 290
   - Schluss-Szene y 390, Abstand 36 px, Plakette y 275
   Nie feste Pixelwerte in einzelne Szenen schreiben, immer `useLayout()`. Muster: [../vorlagen/shorts/BeispielShort.tsx](../vorlagen/shorts/BeispielShort.tsx).
3. **Schluss anpassen:** Instagram hat kein „verlinktes Video“ und kein „Video unten“. Im Bild steht automatisch „auf YouTube“ (`Verweis` ohne `zeile2`). Den Sprechtext neu vertonen in `videos/reels-verweis/drehbuch.md` ([Vorlage](../vorlagen/instagram/reels-verweis-drehbuch.md)), z. B. „…findest du auf meinem YouTube-Kanal.“ Gibt es den passenden Satz schon, wiederverwenden (kostet nichts). Im Short `reel={REEL}` an `Verweis` geben und die Länge mit `stimmenFuer(format)` berechnen, weil der Schlusssatz anders lang ist.
4. In `Root.tsx` im Ordner **„Reels“** registrieren: `durationInFrames={laengeShortNN(FPS, "instagram")}`, `defaultProps={{ format: "instagram" as const }}`.
5. **Prüfen**, ein Durchgang: Standbilder jeder Szene (spät in der Szene, damit alles eingeblendet ist) mit eingezeichneter Zone (oben und unten rot getönt, sicherer Bereich grün umrandet) als ein Raster. Typische Funde: Untertitel stossen ans Terminal oder an den Handle, eine Plakette berührt das Zeichen. Zusätzlich ein Bild der YouTube-Fassung gegen das fertige YouTube-MP4 vergleichen: Es muss gleich bleiben.
6. Rendern nach `out/reelNN-<thema>.mp4`, in den Chat schicken, Abnahme.

## Nur Instagram: Reels ohne langes Video

Für Kanäle ohne YouTube. Jedes Reel steht für sich und beantwortet genau **eine Frage** (ein Stolperstein, ein Kostenpunkt, ein Aha-Moment). Es gibt kein langes Video, keinen Kanal-Einstieg, keinen Abspann und kein eigenes Thumbnail. Ordner pro Reel: `videos/rNN-<thema>/`.

1. **Thema und Fakten:** [Phase 2](2-thema.md) wie gewohnt, nur kleiner: eine Frage, ihre Antwort, an der offiziellen Quelle am Tag geprüft, in `fakten.md` mit Quelle und Datum. Gleich 3 bis 5 weitere Fragen als Themenliste notieren, daraus werden die nächsten Reels.
2. **Drehbuch:** `drehbuch.md` mit 4 Szenen wie ein Short ([Muster](../vorlagen/shorts/drehbuch-beispiel-short.md)): Aufhänger (Problem als Frage), Einordnung, Lösung, Schluss. Regeln aus [shorts.md](shorts.md) gelten: erstes Bild = Titelbild, grosse Untertitel, 20 bis 30 Sekunden, keine Telegrammsätze ([Sprechregeln](../sprechregeln.md)). **Abnahme durch die Person, bevor vertont wird.**
3. **Schluss ohne YouTube:** Der Verweis zeigt aufs eigene Profil oder die Website, nicht auf ein Video. Sprechtext z. B. „Mehr solche Tipps findest du auf meinem Profil.“ Im Bild `Verweis` mit eigener `zeile2`, z. B. `zeile1="Mehr Tipps"` `zeile2="auf meinem Profil"`. Kein „Folge mir!“-Geschrei, ehrlich und ruhig.
4. **Vertonen** mit `stimme.mjs`, dann Aussprache und Tempo prüfen wie in [Phase 4](4-stimme.md) (um 2,5 Wörter pro Sekunde). Hördatei in den Chat schicken.
5. **Bildmaterial:** Nachbauten wie in [Phase 5](5-bildmaterial.md), nachgestellte Szenen klein mit „NACHGESTELLT“ kennzeichnen.
6. **Bauen:** Komponente in `src/videos/reels/ReelNN.tsx` mit den Teilen aus `teile.tsx`, immer mit `<FormatRahmen format="instagram">`, damit alles in der sicheren Zone liegt. In `Root.tsx` im Ordner „Reels“ registrieren (1080 × 1920). Prüfen und rendern wie oben (Standbild-Raster mit Zone, ein Durchgang), MP4 nach `out/reelNN-<thema>.mp4`, Abnahme.
7. **Beschriftung und Hochladen** wie unten. Im Verweis der Beschriftung statt YouTube: „Mehr Tipps auf meinem Profil“ oder die Website als Text.
8. **Danach:** Nach etwa einer Woche Aufrufe, Wiedergabedauer und Kommentare ansehen und in `KANAL-STATUS.md` notieren. Statistiken („Insights“) zeigt Instagram bei jedem öffentlichen Konto, ein professionelles Konto (Creator) bietet mehr. Umstellen unter „Kontotyp und Tools“ in den Einstellungen; ein privates Konto wird dabei öffentlich. Fragen aus Kommentaren kommen auf die Themenliste.

## Pro Reel: Beschriftung

`videos/<ordner>/instagram.md` ([Beispiel](../vorlagen/instagram/beispiel-instagram.md)):
- **Erste Zeile = Aufhänger** mit einem Emoji. Nur sie ist ohne „mehr“ sichtbar.
- Lösung oder Fakt in zwei, drei Sätzen, bei Preisen der Stand.
- Verweis mit Namen, z. B. „Die ganze Anleitung: YouTube @<handle>.“ **Keine Links**, sie sind in Beschriftungen nicht anklickbar. Keinen „Link in der Bio“ versprechen, solange keiner drin ist.
- Ehrlichkeit: „Stimme KI-generiert, Ablauf nachgestellt.“
- **3 bis 5 Hashtags** am Schluss.

Der Person am Schluss **eine Liste** geben: pro Reel der volle Pfad zur MP4 und die Beschriftung im Kopierblock, damit klar ist, was wozu gehört.

## Hochladen (macht die Person, am Computer im Browser)

1. instagram.com → **+ Erstellen → Beitrag** → MP4 wählen.
2. **Zuschneiden: unten links auf das Symbol mit den zwei Ecken → „Original“.** Sonst schneidet Instagram auf 1:1 zu und der Titel oben fehlt. Kontrollieren, dass das ganze Hochformat zu sehen ist.
3. Titelbild: Das erste Bild passt, wenn das Reel ab Frame 0 Problem und Überschrift zeigt.
4. Beschriftung aus `instagram.md` einfügen.
5. **KI-Label** unter „Erweiterte Einstellungen“ einschalten. Meta verlangt die Kennzeichnung bei realistisch klingender künstlicher Stimme. Danach steht „KI-Inhalte“ unter dem Kontonamen.
6. Teilen. Ist es doch abgeschnitten: über ••• → Löschen und neu hochladen, solange es frisch ist.

**Ein Reel pro Tag**, nicht alle auf einmal, sonst nehmen sie sich gegenseitig die Reichweite. Termine und Links in `KANAL-STATUS.md` (Zeilen R01, R02 …).

## Fertig, wenn

- [ ] Reel-Fassung im Ordner „Reels“, Raster mit Zone geprüft, YouTube-Fassung unverändert.
- [ ] Schlusssatz für Instagram vertont und eingebaut.
- [ ] `instagram.md` pro Reel, Liste mit Pfad und Beschriftung an die Person.
- [ ] Hochgeladen mit „Original“ und KI-Label, Link in `KANAL-STATUS.md`, nächste Termine eingetragen.
