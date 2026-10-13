# Phase 0: Einrichten (einmal pro Kanal)

Ziel: Ein Remotion-Projekt läuft, die offiziellen Remotion-Skills sind installiert, ElevenLabs ist verbunden, es gibt eine Statusdatei. Dauer: 15 bis 20 Minuten.

## 1. Ausgangslage klären

Drei Fragen in einer Nachricht, jeweils mit Empfehlung:

1. **Gibt es den YouTube-Kanal schon?** Wenn ja: Handle (z. B. `@meinkanal`). Wenn nein, wird er in Phase 1 eingerichtet. Ein bestehender Kanal, auf dem die Person nur Videos schaut, geht auch. Vorher prüfen: Abos privat, keine öffentlichen fremden Playlists, keine alten eigenen Uploads, Bestätigung in zwei Schritten aktiv.
2. **Gibt es eine Marke oder Website?** Wenn ja, Farben, Schriften, Logo und Maskottchen von dort übernehmen (messen, nicht schätzen). Wenn nein, reicht für den Anfang eine dunkle Grundfarbe, eine Akzentfarbe und zwei Schriften.
3. **Gibt es ein ElevenLabs-Konto?** Empfehlung: ja, Pay-as-you-go oder kleinster Plan. Ein Video von 4 Minuten braucht etwa 4000 Zeichen.

## 2. Projektordner anlegen

Remotion-Gerüst über die offizielle Vorlage. Der Ordner muss leer sein, sonst in einen Unterordner:

```
npx create-video@latest --yes --blank --no-tailwind <ordner>
cd <ordner>
npm i
npx remotion add @remotion/media @remotion/transitions @remotion/google-fonts
```

Offizielle Remotion-Skills ins Projekt (lesen, bevor man sich darauf stützt):
```
npx skills add remotion-dev/skills --agent claude-code -y
```

Dann ergänzen:
```
<projekt>/
  KANAL-STATUS.md        aus vorlagen/
  .env                   ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID (in .gitignore!)
  .env.example           dieselben Namen ohne Werte
  werkzeuge/             stimme.mjs, stimmproben.mjs, toene.mjs, seiten.py, kapitel.mjs aus dem Skill
  src/bausteine/         Bausteine aus vorlagen/remotion/
  src/marke.ts           aus vorlagen/remotion/, in Phase 1 angepasst
  public/stimme/         entsteht in Phase 4
  public/aufnahmen/      entsteht in Phase 5
  videos/<nr-thema>/     drehbuch.md, seiten.json, youtube.md pro Video
  out/                   gerenderte Videos (in .gitignore)
```

In `.gitignore` ergänzen: `.env`, `.env.*`, `!.env.example`, `out/`. In `tsconfig.json`: `"resolveJsonModule": true` und `"lib": ["es2022", "dom"]`, damit die Zeitstempel-Dateien importiert werden können.

## 3. ElevenLabs-Schlüssel

Die Person trägt den Schlüssel selbst ein. `.env` im Editor für sie öffnen (unter Windows `Start-Process notepad.exe <pfad>\.env`), weil versteckte Dateien sonst schwer zu finden sind.

Anleitung für die Person: elevenlabs.io → Developers → API Keys → Create API Key, Berechtigungen „Text to Speech“, „Voices“ und „Sound Effects“. **Der Schlüssel beginnt mit `sk_`** und wird nur beim Erstellen einmal angezeigt. Häufiger Fehler: Die Schlüssel-ID wird eingetragen statt des Schlüssels. Dann meldet die API „API key ID used as API key“. Lösung: neuen Schlüssel erstellen, alten löschen.

Prüfen ohne den Wert zu zeigen: `GET https://api.elevenlabs.io/v1/user/subscription` mit dem Schlüssel, nur Status, Plan und Zeichenkontingent ausgeben.

## 4. Vorschau einrichten

Remotion Studio im Browser-Bereich des Agenten starten. Läuft der Agent in einem übergeordneten Ordner, über npm mit `--prefix`, sonst findet Remotion die `package.json` nicht:

```json
{ "name": "video-studio", "runtimeExecutable": "npm", "runtimeArgs": ["--prefix", "<ordner>", "run", "dev", "--", "--no-open", "--port", "3000"], "port": 3000 }
```

Für die Person ist das Studio aber zweitrangig. Abnahmen laufen über MP4-Dateien im Chat (siehe Phase 6).

## Fertig, wenn

- [ ] Remotion-Projekt rendert ein leeres Standbild (`npx remotion still ...`).
- [ ] Remotion-Skills installiert und gelesen.
- [ ] ElevenLabs-Schlüssel gesetzt und geprüft.
- [ ] `KANAL-STATUS.md` angelegt, Phase 0 ✅.

Weiter mit [Phase 1: Kanal-Fundament](1-kanal.md).
