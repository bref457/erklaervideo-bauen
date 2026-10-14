# Phase 3: Drehbuch (pro Video)

Ziel: `videos/<nr>/drehbuch.md` enthält jede Szene mit Sprechtext und Bildbeschreibung. Es wird abgenommen, bevor vertont wird.

## Format

Vorlage: [../vorlagen/drehbuch.md](../vorlagen/drehbuch.md), Muster: [../vorlagen/beispiel-video/drehbuch.md](../vorlagen/beispiel-video/drehbuch.md).

Das Format ist fest, weil `stimme.mjs` es liest:
- Jede Szene beginnt mit `## <Nr> · <Titel>` (Mittelpunkt mit Leerzeichen).
- **Bild:** und Bild-Art (ANIM, BROWSER, WINDOWS) als normaler Text.
- Der Sprechtext steht in Zeilen mit `> ` am Anfang. Nur diese Zeilen werden gesprochen.

## Aufbau, der funktioniert

1. **Aufhänger (0 bis 15 s):** Das Versprechen aus Titel und Thumbnail sofort aufgreifen und das Ergebnis anreissen: „In diesem Video installieren wir X unter Windows, Schritt für Schritt, mit den Stellen, an denen es hakt.“ **Keine Begrüssung** („Hallo Leute, willkommen auf meinem Kanal“), die wird übersprungen. Nur versprechen, was stimmt (keine erfundenen Zeitangaben wie „in 5 Minuten“).
2. Danach läuft automatisch der **Kanal-Einstieg** (1,5 s).
3. **Fahrplan (ein bis zwei Sätze):** was im Video kommt, in der Reihenfolge der Kapitel. „Wir gehen durch die Voraussetzungen, die Installation und die häufigsten Fehler.“
4. **Was du brauchst** und **was es kostet**, früh und ehrlich.
5. **Die Schritte:** eine Szene pro Schritt aus `fakten.md`. Jede Szene endet mit einer **Brücke** zur nächsten („Jetzt läuft es, aber ein Schritt fehlt noch …“), damit niemand an einer Kapitelgrenze aussteigt.
6. **Stolpersteine:** jeder eine eigene Szene mit Warnschild, Fehlermeldung und Lösung.
7. **Eine Bitte nach dem ersten Erfolg:** direkt nach dem ersten Aha-Moment (z. B. dem gelösten Stolperstein) **ein** kurzer Satz: „Wenn dir das gerade geholfen hat, lass ein Like da.“ Nur eine Bitte, nicht Like, Abo, Glocke und Kommentar auf einmal. Abo und Kommentar kommen im Abspann.
8. **Erster Erfolg:** etwas Kleines, das sofort funktioniert.
9. **Zusammenfassung (unter 10 s):** die Schritte als Route.
10. **Abschluss mit Brücke (unter 10 s):** kurzes Fazit und eine **Brücke zum nächsten Video**: „Jetzt, wo X läuft, willst du sicher wissen, was es im Monat kostet. Das zeige ich dir im nächsten Video.“ **Keine Abschiedsworte** („Das war's“, „Bis dann“, „Danke fürs Zuschauen“), dabei klicken die meisten weg.
11. Danach läuft automatisch der **Kanal-Abspann** (18 s) mit „Als Nächstes: <Titel>“.

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
