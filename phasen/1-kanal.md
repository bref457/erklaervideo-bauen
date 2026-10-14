# Phase 1: Kanal-Fundament (einmal pro Kanal)

Ziel: Alles, was in jedem Video gleich ist, steht fest: Plattformen, Erkennbarkeit, Marke, Stimme, Kanal-Einstieg, Thumbnail-Stil und das Kanal-Profil. Danach geht jedes neue Video direkt bei Phase 2 los.

## 0. Plattformen (als Erstes fragen)

Fragen: Wo sollen die Videos laufen?
- **YouTube:** lange Erklärvideos, dazu Shorts.
- **Instagram:** nur kurze Reels im Hochformat.
- **Beides:** lange Videos auf YouTube, die Shorts zusätzlich als Reels auf Instagram.

Antwort in `KANAL-STATUS.md` unter „Plattformen“ eintragen. Sie bestimmt den Weg:

| Plattform | Pro Video | In dieser Phase entfällt |
|---|---|---|
| YouTube | Phasen 2 bis 8, danach Shorts | nichts |
| Beides | wie YouTube, danach die Shorts als Reels ([instagram.md](instagram.md)) | nichts |
| Nur Instagram | Phase 2, dann direkt Reels nach dem Weg „Nur Instagram“ in [instagram.md](instagram.md). Kein langes Video, Phasen 3 bis 8 entfallen. | Kanal-Einstieg (4), Kanal-Abspann (5), Thumbnail-Stil (6). Das Kanal-Profil (7) ist das Instagram-Profil. |

## 1. Erkennbarkeit

Fragen: Darf die Person erkennbar sein? Gesicht, eigene Stimme, Name, Wohnort? Manche dürfen oder wollen das nicht, etwa aus beruflichen oder privaten Gründen. Den Grund muss die Person nicht nennen. Das ist eine harte Grenze und wird in `KANAL-STATUS.md` als Regel eingetragen.

Wenn nicht erkennbar:
- **Keine eigene Stimme und kein Klon der eigenen Stimme.** Ein Klon bleibt erkennbar, auch leicht verändert. Stattdessen eine fremde Stimme aus der ElevenLabs-Bibliothek.
- **Keine echten Bildschirmaufnahmen vom eigenen Rechner.** Benutzername, Pfade, Lesezeichen, installierte Programme verraten zu viel. Abläufe werden nachgestellt (Phase 5).
- Kanalbild und Banner: Logo oder Maskottchen, nie ein Foto.

## 2. Marke in Remotion

`src/marke.ts` mit Farben und Schriften der Marke füllen (von der Website oder aus dem Logo messen). Schriften über `@remotion/google-fonts` laden, wenn möglich. Logo oder Maskottchen als `public/marke/zeichen.svg` ablegen, der Baustein `Zeichen` zeigt es an. Kanalname, Kanal-Satz, Handle und Website in `kanal` in `marke.ts` eintragen. Wer ein animiertes Maskottchen will (zwinkern, winken), baut es als eigenes SVG mit `interpolate()` nach.

## 3. Stimme wählen

1. Mit [../werkzeuge/stimmproben.mjs](../werkzeuge/stimmproben.mjs) in der ElevenLabs-Bibliothek nach Sprache und Stil suchen (`language=de`, ruhig, erklärend) und **4 Stimmen denselben Satz** sprechen lassen. Der Satz kommt aus dem Thema des Kanals, nicht „Hallo, ich bin …“.
2. Die Hördateien direkt in den Chat schicken, mit einer Zeile pro Stimme (Name, Eindruck).
3. Gefällt keine: nicht diskutieren, neue Runde mit wärmeren oder anderen Stimmen. Einstellungen lebendiger machen (`stability 0.42, similarity_boost 0.8, style 0.3, speed 1.0`). Zu hohe Stabilität klingt flach und unsympathisch.
4. Nennt die Person eine Stimme beim Namen (etwa aus der ElevenLabs-Bibliothek), diese suchen und im direkten Vergleich mit dem bisherigen Favoriten vorspielen.
5. Gewählte `voice_id` in `.env` als `ELEVENLABS_VOICE_ID`, Name der Stimme in `KANAL-STATUS.md`.

Modell: `eleven_multilingual_v2` für Deutsch.

## 4. Kanal-Einstieg

Ein immer gleicher, **sehr kurzer** Einstieg: **1,5 Sekunden**, nur Logo oder Zeichen mit einem leisen Whoosh. Klassische Logo-Intros (5 bis 10 Sekunden mit Musik) lassen viele Zuschauer abspringen, deshalb nur ein kurzes Wiedererkennungszeichen. Er kommt **nach der ersten Szene** (dem Aufhänger), nie ganz am Anfang. Was im Video kommt, sagt die Stimme direkt danach (Fahrplan, siehe Phase 3).

Vorlage: [../vorlagen/remotion/bausteine/KanalEinstieg.tsx](../vorlagen/remotion/bausteine/KanalEinstieg.tsx). Den Whoosh mit [../werkzeuge/toene.mjs](../werkzeuge/toene.mjs) erzeugen, keine fremden Soundeffekte:

```
node werkzeuge/toene.mjs public/klang einstieg-whoosh "soft airy whoosh transition, short, clean, modern, no music" 1.2
```

Als MP4 rendern und in den Chat schicken.

## 5. Kanal-Abspann

Jedes lange Video endet mit einem immer gleichen Abspann von **18 Sekunden**. So hat jedes Video einen festen Einstieg und einen festen Abspann.

- Vorlage: [../vorlagen/remotion/bausteine/KanalAbspann.tsx](../vorlagen/remotion/bausteine/KanalAbspann.tsx). Er lässt Platz für YouTubes **Abspann-Elemente**: links eine Fläche für einen Video-Kasten (16:9), rechts ein Kreis für den Abo-Knopf. Die Elemente liegen in den letzten 5 bis 20 Sekunden eines Videos, deshalb 18 Sekunden.
- Sprechtext einmal vertonen (`videos/kanal-abspann/drehbuch.md`, eine Szene) und in jedem Video wiederverwenden. Ton: ehrlich, nicht marktschreierisch. Eine **konkrete Frage** für die Kommentare bringt mehr als „Like und Glocke“. Muster:
  > Wenn dir das geholfen hat, abonniere den Kanal. Und schreib mir in die Kommentare, wo es bei dir nicht geklappt hat. Daraus mache ich die nächsten Videos. Hier geht es direkt weiter.
- **Wortwahl mit der Person prüfen.** Manche Wendungen klingen regional anders, zum Beispiel ist „wo du hängen geblieben bist“ in der Schweiz abwertend. Neutral: „wo es bei dir nicht geklappt hat“.
- **Überschrift „Als Nächstes: <Titel>“** (Eigenschaft `naechstes`), ohne Angabe „Weiter geht's“. **Nie „Danke fürs Schauen“ oder „Bis dann“**: Abschiedsworte lassen viele Zuschauer sofort wegklicken.
- **Leise Musik** darunter, mit ElevenLabs erzeugt (eigene Lizenz): `node werkzeuge/musik.mjs public/klang/abspann-musik.mp3 18 "calm warm instrumental lo-fi, soft electric piano, no vocals, smooth fade out"`. Unter der Stimme leise, danach etwas lauter.
- Shorts bekommen keinen Abspann (dort gibt es keine Abspann-Elemente, der Verweis läuft über „Ähnliches Video“).

Als MP4 rendern und in den Chat schicken.

## 6. Thumbnail-Stil

Festlegen, was jedes Thumbnail gemeinsam hat: Hintergrund, Schrift, Maskottchen, Warnschilder oder andere Markenzeichen. Grundregeln:
- 1280 × 720, höchstens 3 bis 5 grosse Wörter, auf dem Handy lesbar.
- Ohne Gesicht: Maskottchen, Symbole, ein Ausschnitt aus dem Video (Fehlermeldung, Preis).
- Pro Video entstehen in Phase 7 drei Varianten mit unterschiedlichem Aufhänger: sachlich (Thema), Problem (Fehlermeldung), Kosten oder Ergebnis.

## 7. Kanal-Profil

Für Instagram: Konto und Profil nach [instagram.md](instagram.md), Abschnitt „Einmal: Konto einrichten“.

Für YouTube, falls noch nicht geschehen, mit der Person in YouTube Studio → Anpassung:
- Profilbild und Banner (2560 × 1440, wichtiger Inhalt in der Mitte),
- Handle (wenn der Wunschname vergeben ist, eine Variante mit Länderkürzel oder Thema prüfen),
- Beschreibung und Links (Website, GitHub). Text aus vorhandenen Profiltexten der Website übernehmen, damit überall dieselben Fakten stehen.

## Abnahme

Die Person bestätigt Stimme, Einstieg, Abspann und Thumbnail-Stil.

## Fertig, wenn

- [ ] Plattformen entschieden und in `KANAL-STATUS.md`.
- [ ] Erkennbarkeit entschieden und als Regel in `KANAL-STATUS.md`.
- [ ] `marke.ts` und Markenbausteine angepasst.
- [ ] Stimme gewählt, `voice_id` in `.env`.
- [ ] Kanal-Einstieg als MP4 abgenommen (nur mit YouTube).
- [ ] Kanal-Abspann als MP4 abgenommen, Sprechtext mit der Person abgestimmt (nur mit YouTube).
- [ ] Thumbnail-Stil beschrieben (nur mit YouTube).
- [ ] Kanal-Profil vollständig.

Weiter mit [Phase 2: Thema und Fakten](2-thema.md).
