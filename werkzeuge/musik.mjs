// Erzeugt kurze Hintergrundmusik mit ElevenLabs (eigene Lizenz statt fremder Musik).
//
//   node musik.mjs <zieldatei.mp3> <sekunden> "<beschreibung auf englisch>"
//
// Beispiel Abspann:
//   node werkzeuge/musik.mjs public/klang/abspann-musik.mp3 18 "calm warm instrumental lo-fi, soft electric piano, gentle beat, no vocals, smooth fade out at the end"
//
// Läuft im Projektordner (liest ELEVENLABS_API_KEY aus .env).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => [z.slice(0, z.indexOf("=")).trim(), z.slice(z.indexOf("=") + 1).trim()]),
);

const [ziel, sekunden, beschreibung] = process.argv.slice(2);
if (!ziel || !sekunden || !beschreibung) throw new Error('Aufruf: node musik.mjs <ziel.mp3> <sekunden> "<beschreibung>"');

const antwort = await fetch("https://api.elevenlabs.io/v1/music", {
  method: "POST",
  headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: beschreibung, music_length_ms: Math.round(Number(sekunden) * 1000) }),
});
if (!antwort.ok) throw new Error(`${antwort.status} ${await antwort.text()}`);
mkdirSync(dirname(ziel), { recursive: true });
writeFileSync(ziel, Buffer.from(await antwort.arrayBuffer()));
console.log("ok", ziel);
