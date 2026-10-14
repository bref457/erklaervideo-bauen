// Grosse, mitlaufende Untertitel aus den Zeitstempeln der Stimme (für Shorts, viele schauen ohne Ton).
// Zeigt immer eine kurze Wortgruppe, das gerade gesprochene Wort ist hervorgehoben.
import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { farbe, schrift } from "../marke";
import { VORLAUF, type Stimme } from "./Szene";

type Wort = { text: string; ab: number; bis: number };

// Zeichen-Zeitstempel → Wörter mit Start und Ende in Sekunden
const woerter = (stimme: Stimme): Wort[] => {
  const { characters, character_start_times_seconds: start, character_end_times_seconds: ende } = stimme.ausrichtung;
  const liste: Wort[] = [];
  let aktuell: Wort | null = null;
  characters.forEach((c, i) => {
    if (c === " ") {
      if (aktuell) liste.push(aktuell);
      aktuell = null;
    } else if (!aktuell) {
      aktuell = { text: c, ab: start[i], bis: ende[i] };
    } else {
      aktuell.text += c;
      aktuell.bis = ende[i];
    }
  });
  if (aktuell) liste.push(aktuell);
  return liste;
};

// Gruppen von höchstens drei Wörtern, nach Satzzeichen wird neu begonnen
const gruppen = (liste: Wort[]) => {
  const ergebnis: Wort[][] = [];
  let g: Wort[] = [];
  for (const w of liste) {
    g.push(w);
    if (g.length === 3 || /[.,:?!]$/.test(w.text)) {
      ergebnis.push(g);
      g = [];
    }
  }
  if (g.length) ergebnis.push(g);
  return ergebnis;
};

export const Untertitel: React.FC<{ readonly stimme: Stimme; readonly oben: number }> = ({ stimme, oben }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - VORLAUF;
  const alle = gruppen(woerter(stimme));
  const aktiv = alle.find((g, i) => t >= g[0].ab - 0.05 && (t < (alle[i + 1]?.[0].ab ?? Infinity) - 0.05)) ?? (t < 0 ? null : alle.at(-1));
  if (!aktiv) return null;
  const startFrame = (aktiv[0].ab + VORLAUF) * fps;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 140,
        top: oben,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 22px",
        fontFamily: schrift.kopf,
        fontWeight: 800,
        fontSize: 82,
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        textAlign: "center",
        scale: interpolate(frame, [startFrame - 2, startFrame + 4], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    >
      {aktiv.map((w, i) => {
        const gesprochen = t >= w.ab - 0.03;
        return (
          <span key={i} style={{ color: gesprochen ? (t < w.bis ? farbe.akzentHell : farbe.weiss) : "rgba(255,255,255,.45)", textShadow: "0 6px 24px rgba(0,0,0,.9)" }}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
