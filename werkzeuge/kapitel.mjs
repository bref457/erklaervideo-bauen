// Berechnet die YouTube-Kapitel aus den vertonten Szenen.
//
//   node kapitel.mjs <video-ordnername> [--einstieg-nach 1] [--einstieg-sekunden 1.5] [--fps 30]
//
// Muss dieselben Werte wie src/bausteine/Szene.tsx nutzen (VORLAUF 0.4, NACHLAUF 0.7).
// Liest public/stimme/<video>/szenen.json. Ausgabe direkt in youtube.md kopieren.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const VORLAUF = 0.4;
const NACHLAUF = 0.7;

const args = process.argv.slice(2);
const video = args[0];
const wert = (name, standard) => {
  const i = args.indexOf(name);
  return i >= 0 ? Number(args[i + 1]) : standard;
};
const fps = wert("--fps", 30);
const einstiegNach = wert("--einstieg-nach", 1);
const einstiegFrames = Math.round(wert("--einstieg-sekunden", 1.5) * fps);

const szenen = JSON.parse(readFileSync(join("public", "stimme", video, "szenen.json"), "utf8"));
const zeit = (f) => {
  const s = Math.floor(f / fps);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

let frame = 0;
szenen.forEach((s, i) => {
  console.log(`${zeit(frame)} ${s.titel}`);
  frame += Math.ceil((VORLAUF + s.sekunden + NACHLAUF) * fps);
  if (i + 1 === einstiegNach) frame += einstiegFrames;
});
console.log(`(Gesamtlänge ${zeit(frame)})`);
