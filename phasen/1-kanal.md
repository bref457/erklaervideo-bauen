# Phase 1: Kanal-Fundament (einmal pro Kanal)

Ziel: Alles, was in jedem Video gleich ist, steht fest: Erkennbarkeit, Marke, Stimme, Kanal-Einstieg, Thumbnail-Stil und das Kanal-Profil. Danach geht jedes neue Video direkt bei Phase 2 los.

## 1. Erkennbarkeit (zuerst klären)

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

Ein immer gleicher, **kurzer** Einstieg: 3 bis 4 Sekunden. Längere Intros lassen Zuschauer abspringen. Er kommt **nach der ersten Szene** (dem Aufhänger), nie ganz am Anfang.

Vorlage: [../vorlagen/remotion/bausteine/KanalEinstieg.tsx](../vorlagen/remotion/bausteine/KanalEinstieg.tsx). Zeichen springt ein, der Kanalname schiebt sich daneben, darunter tippt sich der Kanal-Satz. Zwei kurze Töne mit [../werkzeuge/toene.mjs](../werkzeuge/toene.mjs) erzeugen, keine fremden Soundeffekte:

```
node werkzeuge/toene.mjs public/klang einstieg-whoosh "soft airy whoosh transition, short, clean, modern, no music" 1.2 einstieg-feder "tiny soft digital blip, friendly, short pop sound, clean" 0.5
```

Als MP4 rendern und in den Chat schicken.

## 5. Thumbnail-Stil

Festlegen, was jedes Thumbnail gemeinsam hat: Hintergrund, Schrift, Maskottchen, Warnschilder oder andere Markenzeichen. Grundregeln:
- 1280 × 720, höchstens 3 bis 5 grosse Wörter, auf dem Handy lesbar.
- Ohne Gesicht: Maskottchen, Symbole, ein Ausschnitt aus dem Video (Fehlermeldung, Preis).
- Pro Video entstehen in Phase 7 drei Varianten mit unterschiedlichem Aufhänger: sachlich (Thema), Problem (Fehlermeldung), Kosten oder Ergebnis.

## 6. Kanal-Profil

Falls noch nicht geschehen, mit der Person in YouTube Studio → Anpassung:
- Profilbild und Banner (2560 × 1440, wichtiger Inhalt in der Mitte),
- Handle (wenn der Wunschname vergeben ist, eine Variante mit Länderkürzel oder Thema prüfen),
- Beschreibung und Links (Website, GitHub). Text aus vorhandenen Profiltexten der Website übernehmen, damit überall dieselben Fakten stehen.

## Abnahme

Die Person bestätigt Stimme, Einstieg und Thumbnail-Stil.

## Fertig, wenn

- [ ] Erkennbarkeit entschieden und als Regel in `KANAL-STATUS.md`.
- [ ] `marke.ts` und Markenbausteine angepasst.
- [ ] Stimme gewählt, `voice_id` in `.env`.
- [ ] Kanal-Einstieg als MP4 abgenommen.
- [ ] Thumbnail-Stil beschrieben.
- [ ] Kanal-Profil vollständig.

Weiter mit [Phase 2: Thema und Fakten](2-thema.md).
