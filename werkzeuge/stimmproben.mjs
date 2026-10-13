// Stimmproben aus der ElevenLabs-Bibliothek: suchen und denselben Satz sprechen lassen.
//
//   node stimmproben.mjs suchen [sprache=de] [suchbegriff]
//       listet passende Stimmen (Name, Geschlecht, Alter, Stil, voice_id)
//   node stimmproben.mjs sprechen <zielordner> "<Satz>" name=voice_id name=voice_id ...
//       erzeugt <zielordner>/<name>.mp3 für jede Stimme
//
// Läuft im Projektordner (liest ELEVENLABS_API_KEY aus .env).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => [z.slice(0, z.indexOf("=")).trim(), z.slice(z.indexOf("=") + 1).trim()]),
);
const kopf = { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" };
// Lebendiger als die Standardwerte, klingt weniger flach (in Phase 1 erprobt)
const EINSTELLUNGEN = { stability: 0.42, similarity_boost: 0.8, style: 0.3, speed: 1.0 };

const [befehl, ...rest] = process.argv.slice(2);

if (befehl === "suchen") {
  const sprache = rest[0] ?? "de";
  const suche = rest[1] ? `&search=${encodeURIComponent(rest[1])}` : "";
  const r = await fetch(`https://api.elevenlabs.io/v1/shared-voices?language=${sprache}&page_size=60&sort=usage_character_count_1y${suche}`, { headers: kopf });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j));
  for (const v of j.voices) {
    console.log([v.name, v.gender, v.age, v.use_case, v.descriptive, v.voice_id, (v.description ?? "").slice(0, 80)].join(" | "));
  }
} else if (befehl === "sprechen") {
  const [ziel, satz, ...paare] = rest;
  mkdirSync(ziel, { recursive: true });
  for (const paar of paare) {
    const [name, id] = paar.split("=");
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: kopf,
      body: JSON.stringify({ text: satz, model_id: "eleven_multilingual_v2", voice_settings: EINSTELLUNGEN }),
    });
    if (!r.ok) {
      console.log(name, "FEHLER", r.status, (await r.text()).slice(0, 160));
      continue;
    }
    writeFileSync(join(ziel, `${name}.mp3`), Buffer.from(await r.arrayBuffer()));
    console.log(name, "ok");
  }
} else {
  console.log("Aufruf: node stimmproben.mjs suchen [sprache] [suchbegriff] | sprechen <ordner> \"<Satz>\" name=voice_id ...");
}
