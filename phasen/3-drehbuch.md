# Phase 3: Drehbuch (pro Video)

Ziel: `videos/<nr>/drehbuch.md` enthält jede Szene mit Sprechtext und Bildbeschreibung. Es wird abgenommen, bevor vertont wird.

## Format

Vorlage: [../vorlagen/drehbuch.md](../vorlagen/drehbuch.md), Muster: [../vorlagen/beispiel-video/drehbuch.md](../vorlagen/beispiel-video/drehbuch.md).

Das Format ist fest, weil `stimme.mjs` es liest:
- Jede Szene beginnt mit `## <Nr> · <Titel>` (Mittelpunkt mit Leerzeichen).
- **Bild:** und Bild-Art (ANIM, BROWSER, WINDOWS) als normaler Text.
- Der Sprechtext steht in Zeilen mit `> ` am Anfang. Nur diese Zeilen werden gesprochen.

## Aufbau, der funktioniert

1. **Aufhänger (10 bis 15 s):** Was wir machen und warum dieses Video anders ist. Danach kommt der Kanal-Einstieg.
2. **Was du brauchst:** Voraussetzungen als Checkliste.
3. **Was es kostet:** früh und ehrlich, falls etwas Geld kostet.
4. **Die Schritte:** eine Szene pro Schritt, in der Reihenfolge aus `fakten.md`.
5. **Stolpersteine:** jeder bekommt eine eigene Szene mit Warnschild, Fehlermeldung und Lösung.
6. **Erster Erfolg:** etwas Kleines, das sofort funktioniert.
7. **Zusammenfassung (unter 10 s):** die Schritte als Route.
8. **Abschluss:** Website, Kanal, nächstes Video.

Länge: 4 bis 8 Minuten für eine Anleitung. Lieber kürzer und vollständig als lang.

## Bild-Arten

- **ANIM:** reine Animation (Checkliste, Kosten, Schilder, Route).
- **BROWSER:** nachgestellter Browser mit echtem Foto der öffentlichen Seite, Mauszeiger, Markierung.
- **WINDOWS:** nachgebaute Oberfläche (Startmenü, PowerShell, Installationsassistent, App-Fenster).

Seiten mit Anmeldung oder Zahlung werden nie fotografiert, sondern vereinfacht nachgebaut, persönliche Daten unkenntlich.

## Schreiben

Nach [../sprechregeln.md](../sprechregeln.md). Besonders: Die Stimme spricht die Zuschauer an und tut nichts an ihrer Stelle („Lade sie herunter“, nicht „Die lade ich mir herunter“). Webadressen im Sprechtext ausschreiben.

Am Ende des Drehbuchs: Abschnitt „Vor der Veröffentlichung prüfen“ (Preise, Abläufe am Tag nochmals ansehen).

## Abnahme

Die Person liest das Drehbuch. Zur Übersicht in sechs Zeilen zusammenfassen, was im Video passiert. Änderungen einarbeiten. Ohne Bestätigung keine Vertonung.

## Fertig, wenn

- [ ] Alle Szenen im festen Format.
- [ ] Jeder Fakt aus `fakten.md`, nichts erfunden.
- [ ] Sprechregeln geprüft.
- [ ] Die Person hat bestätigt.

Weiter mit [Phase 4: Stimme](4-stimme.md).
