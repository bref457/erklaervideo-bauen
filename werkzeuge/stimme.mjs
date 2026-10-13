// Vertont die Sprechtexte eines Drehbuchs mit ElevenLabs.
//
//   node werkzeuge/stimme.mjs videos/01-mein-thema
//
// Liest drehbuch.md: jede Szene beginnt mit "## <Nr> · <Titel>", der Sprechtext steht
// in Zeilen mit "> ". Pro Szene entstehen in public/stimme/<video>/:
//   s<Nr>.mp3   die Tonspur
//   s<Nr>.json  Text, Länge in Sekunden und Zeitstempel pro Zeichen (für Untertitel und Timing)
// Unveränderte Szenen werden übersprungen (kostet nichts). --alle erzwingt alles neu.
// Am Ende: public/stimme/<video>/szenen.json mit allen Szenen und Längen.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const MODELL = "eleven_multilingual_v2";
const EINSTELLUNGEN = { stability: 0.42, similarity_boost: 0.8, style: 0.3, speed: 1.0 };

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => [z.slice(0, z.indexOf("=")).trim(), z.slice(z.indexOf("=") + 1).trim()]),
);
const schluessel = env.ELEVENLABS_API_KEY;
const stimme = env.ELEVENLABS_VOICE_ID;
if (!schluessel || !stimme) throw new Error("ELEVENLABS_API_KEY oder ELEVENLABS_VOICE_ID fehlt in .env");

const videoOrdner = process.argv[2];
if (!videoOrdner) throw new Error("Aufruf: node werkzeuge/stimme.mjs videos/<video-ordner> [--alle]");
const alle = process.argv.includes("--alle");
const video = basename(videoOrdner);
const ziel = join("public", "stimme", video);
mkdirSync(ziel, { recursive: true });

// Drehbuch zerlegen
const szenen = [];
for (const zeile of readFileSync(join(videoOrdner, "drehbuch.md"), "utf8").split(/\r?\n/)) {
  const kopf = zeile.match(/^## (\d+) · (.+?)(?: \(|$)/);
  if (kopf) szenen.push({ id: "s" + kopf[1].padStart(2, "0"), titel: kopf[2].trim(), zeilen: [] });
  else if (zeile.startsWith("> ") && szenen.length) szenen.at(-1).zeilen.push(zeile.slice(2).trim());
}
for (const s of szenen) s.text = s.zeilen.join(" ");
const mitText = szenen.filter((s) => s.text);

let zeichen = 0;
for (const [i, s] of mitText.entries()) {
  const fingerabdruck = createHash("sha1").update(JSON.stringify([s.text, stimme, MODELL, EINSTELLUNGEN])).digest("hex");
  const jsonPfad = join(ziel, s.id + ".json");
  if (!alle && existsSync(jsonPfad) && JSON.parse(readFileSync(jsonPfad, "utf8")).fingerabdruck === fingerabdruck) {
    console.log("  gleich ", s.id, s.titel);
    continue;
  }
  const antwort = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${stimme}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": schluessel, "Content-Type": "application/json" },
      body: JSON.stringify({
        text: s.text,
        model_id: MODELL,
        voice_settings: EINSTELLUNGEN,
        // Nachbartexte sorgen für eine gleichmässige Betonung über die Szenengrenzen
        previous_text: mitText[i - 1]?.text,
        next_text: mitText[i + 1]?.text,
      }),
    },
  );
  if (!antwort.ok) throw new Error(`${s.id}: ${antwort.status} ${await antwort.text()}`);
  const daten = await antwort.json();
  writeFileSync(join(ziel, s.id + ".mp3"), Buffer.from(daten.audio_base64, "base64"));
  const ende = daten.alignment.character_end_times_seconds;
  writeFileSync(
    jsonPfad,
    JSON.stringify({ id: s.id, titel: s.titel, text: s.text, sekunden: ende.at(-1), fingerabdruck, ausrichtung: daten.alignment }),
  );
  zeichen += s.text.length;
  console.log("  neu    ", s.id, s.titel, `(${ende.at(-1).toFixed(1)} s)`);
}

const uebersicht = mitText.map((s) => {
  const d = JSON.parse(readFileSync(join(ziel, s.id + ".json"), "utf8"));
  return { id: s.id, titel: s.titel, datei: `stimme/${video}/${s.id}.mp3`, sekunden: d.sekunden };
});
writeFileSync(join(ziel, "szenen.json"), JSON.stringify(uebersicht, null, 2));
const total = uebersicht.reduce((a, s) => a + s.sekunden, 0);
console.log(`Fertig: ${uebersicht.length} Szenen, ${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, "0")} min Sprechzeit, ${zeichen} Zeichen neu vertont.`);
