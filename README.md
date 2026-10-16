# erklaervideo-bauen

Ein Skill für KI-Agenten wie Claude Code, der dich Schritt für Schritt durch Erklärvideos für YouTube und Instagram führt, **ohne Kamera, ohne eigene Stimme und ohne Bildschirmaufnahmen**:

- **Stimme:** eine KI-Stimme von ElevenLabs, die du aus mehreren Proben auswählst
- **Bild:** Animationen mit Remotion, jede Einblendung genau auf das gesprochene Wort
- **Bildschirmabläufe:** nachgestellt, mit echten Fotos öffentlicher Webseiten und nachgebauten Oberflächen. Niemand muss eine Stunde lang aufnehmen, nichts Persönliches ist zu sehen.
- **Veröffentlichen:** je drei Vorschläge für Thumbnail und Titel, Beschreibung, Kapitel mit Zeitangaben, Tags und eine Anleitung zum Hochladen
- **Dazulernen:** Nach jedem Video werden die Zahlen aus YouTube Studio in `erkenntnisse.md` festgehalten. Was sich bestätigt, fliesst ins nächste Video ein.
- **Shorts:** aus jedem Video 2 bis 3 Shorts im Hochformat mit grossen, mitlaufenden Untertiteln
- **Instagram:** die Shorts als Reels, angepasst an Instagrams Bildbereiche, mit Beschriftung und Anleitung zum Hochladen. Oder nur Reels, ganz ohne YouTube.

Gut geeignet für Anleitungen, Software-Tutorials und Erklärvideos, besonders wenn du nicht erkennbar sein möchtest.

## Installieren

Gib deinem Agenten diesen Satz:

```
Installiere den Skill von https://github.com/bref457/erklaervideo-bauen global, damit er in jedem Projekt verfügbar ist.
```

Oder mit dem Skills-Programm:

```
npx skills add bref457/erklaervideo-bauen
```

Falls der Skill danach nicht auftaucht, starte den Agenten einmal neu.

## Starten

In einem leeren Ordner:

```
/erklaervideo-bauen start
```

In anderen Agenten schreibst du: „Starte den Skill erklaervideo-bauen.“

Als Erstes fragt der Skill, wo deine Videos laufen sollen: **YouTube, Instagram oder beides**. Danach richtet er nur das ein, was du dafür brauchst.

Der Skill speichert den Stand in `KANAL-STATUS.md`. Weitermachen in einem neuen Chat: `/erklaervideo-bauen weiter`. Das nächste Video: `/erklaervideo-bauen neues-video`.

## Ablauf

| Phase | Name | Wie oft |
|---|---|---|
| 0 | Einrichten (Remotion, ElevenLabs, Projektordner) | einmal |
| 1 | Kanal-Fundament (Plattformen, Marke, Erkennbarkeit, Stimme, Kanal-Einstieg, Thumbnail-Stil) | einmal |
| 2 | Thema und Fakten aus offiziellen Quellen | pro Video |
| 3 | Drehbuch | pro Video |
| 4 | Stimme | pro Video |
| 5 | Bildmaterial | pro Video |
| 6 | Animation und Schnitt | pro Video |
| 7 | Veröffentlichen | pro Video |
| 8 | Danach (Zahlen auswerten, dazulernen) | pro Video |
| + | Shorts | pro Video |
| + | Instagram-Reels | pro Short oder pro Reel |

Nur Instagram? Dann geht es nach Phase 2 direkt zu den Reels, ohne langes Video.

## Was du brauchst und was es kostet

- **Einen KI-Agenten** wie Claude Code.
- **Node.js, ffmpeg und Python mit Playwright** auf deinem Rechner. Der Skill prüft das in Phase 0.
- **Ein ElevenLabs-Konto** mit API-Schlüssel. Ein Video von 4 Minuten braucht etwa 4000 Zeichen. Die aktuellen Preise stehen bei ElevenLabs.
- **Remotion** ist für Einzelpersonen und Firmen mit bis zu 3 Mitarbeitenden kostenlos. Grössere Firmen brauchen eine Remotion-Lizenz, siehe [remotion.pro/license](https://www.remotion.pro/license).
- **Einen YouTube-Kanal, ein Instagram-Konto oder beides.**

## Ehrlich bleiben

Der Skill schreibt in jede Videobeschreibung, dass die Stimme KI-generiert ist (auf Instagram zusätzlich mit KI-Label) und die Abläufe nachgestellt sind. Fakten, Preise und Befehle werden vor jedem Video an der offiziellen Quelle geprüft. Bitte lass das so.

## Herkunft

Entstanden beim Aufbau des YouTube-Kanals [@Neo457ch](https://www.youtube.com/@Neo457ch). Der Aufbau mit Phasen und Statusdatei ist inspiriert vom Skill [website-bauen](https://github.com/Julian-Ivanov/website-bauen) von Julian Ivanov.

Mehr auf [neo457.ch](https://www.neo457.ch).

## Lizenz

MIT, siehe [LICENSE](LICENSE).
