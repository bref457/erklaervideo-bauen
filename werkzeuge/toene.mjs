// Kurze Soundeffekte mit ElevenLabs erzeugen (eigene Lizenz statt fremder Sammlungen).
//
//   node toene.mjs public/klang name "beschreibung auf englisch" sekunden [name "beschreibung" sekunden ...]
//
// Beispiel Kanal-Einstieg:
//   node toene.mjs public/klang einstieg-whoosh "soft airy whoosh transition, short, clean, modern, no music" 1.2 \
//                               einstieg-zwinkern "tiny soft digital blip, friendly, short pop sound, clean" 0.5

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => [z.slice(0, z.indexOf("=")).trim(), z.slice(z.indexOf("=") + 1).trim()]),
);

const [ziel, ...rest] = process.argv.slice(2);
if (!ziel || rest.length % 3 !== 0 || !rest.length) throw new Error('Aufruf: node toene.mjs <ordner> name "beschreibung" sekunden ...');
mkdirSync(ziel, { recursive: true });

for (let i = 0; i < rest.length; i += 3) {
  const [name, text, sekunden] = rest.slice(i, i + 3);
  const r = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
    method: "POST",
    headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text, duration_seconds: Number(sekunden), prompt_influence: 0.6 }),
  });
  if (!r.ok) throw new Error(`${name}: ${r.status} ${await r.text()}`);
  writeFileSync(join(ziel, `${name}.mp3`), Buffer.from(await r.arrayBuffer()));
  console.log(name, "ok");
}
