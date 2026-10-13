// Grundgerüst jeder Szene: dunkler Grund, optional eine laufende Linie am linken Rand, Stimme.
import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { farbe, schrift } from "../marke";

export type Stimme = {
  id: string;
  text: string;
  sekunden: number;
  ausrichtung: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
};

// Stimme beginnt so viele Sekunden nach Szenenstart
export const VORLAUF = 0.4;
// und so viel Ruhe danach
export const NACHLAUF = 0.7;

export const szenenLaenge = (stimme: Stimme, fps: number, extra = 0) => Math.ceil((VORLAUF + stimme.sekunden + NACHLAUF + extra) * fps);

// Frame (innerhalb der Szene), an dem die Stimme ein bestimmtes Wort zu sprechen beginnt
export const wortFrame = (stimme: Stimme, wort: string, fps: number) => {
  const i = stimme.text.indexOf(wort);
  if (i < 0) throw new Error(`"${wort}" kommt in ${stimme.id} nicht vor`);
  return Math.round((VORLAUF + stimme.ausrichtung.character_start_times_seconds[i]) * fps);
};

type Props = {
  readonly stimme: Stimme;
  readonly video: string;
  readonly children: React.ReactNode;
  readonly leitlinie?: boolean;
};

export const Szene: React.FC<Props> = ({ stimme, video, children, leitlinie = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: farbe.nacht, color: farbe.text, fontFamily: schrift.text }}>
      {leitlinie && (
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 0,
            bottom: 0,
            width: 6,
            backgroundImage: `repeating-linear-gradient(to bottom, ${farbe.linie} 0 34px, transparent 34px 64px)`,
            backgroundPositionY: frame * 2,
          }}
        />
      )}
      {children}
      <Audio src={staticFile(`stimme/${video}/${stimme.id}.mp3`)} from={Math.round(VORLAUF * fps)} premountFor={fps} />
    </AbsoluteFill>
  );
};

// Kleiner Hinweis unten links, z. B. „Kein Administrator nötig“
export const Plakette: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      position: "absolute",
      left: 160,
      bottom: 120,
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "22px 32px",
      borderRadius: 10,
      backgroundColor: farbe.weiss,
      color: farbe.tinte,
      fontFamily: schrift.kopf,
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: "-0.02em",
      boxShadow: "0 18px 50px rgba(0,0,0,.45)",
      ...style,
    }}
  >
    <div style={{ width: 10, alignSelf: "stretch", borderRadius: 5, backgroundColor: farbe.akzent }} />
    {children}
  </div>
);
