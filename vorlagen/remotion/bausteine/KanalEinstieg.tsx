// Kurzer, immer gleicher Kanal-Einstieg (1,5 s): Zeichen springt ein, der Kanalname schiebt sich daneben,
// dazu ein leiser Whoosh. Kommt nach dem Aufhänger (Szene 1). Bewusst kurz: Lange Logo-Intros lassen
// Zuschauer abspringen. Was im Video kommt, sagt die Stimme direkt danach (Fahrplan).
// Ton: node werkzeuge/toene.mjs public/klang einstieg-whoosh "soft airy whoosh transition, short, clean, modern, no music" 1.2
import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { farbe, kanal, schrift } from "../marke";
import { Zeichen } from "./Zeichen";

export const EINSTIEG_SEKUNDEN = 1.5;

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(0.16, 1, 0.3, 1);

type Props = { readonly mitTon?: boolean };

export const KanalEinstieg: React.FC<Props> = ({ mitTon = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ende = Math.round(EINSTIEG_SEKUNDEN * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: farbe.nacht, alignItems: "center", justifyContent: "center", opacity: interpolate(frame, [ende - 7, ende], [1, 0], klemmen) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
        <Zeichen groesse={200} einspringen />
        <div
          style={{
            fontFamily: schrift.kopf,
            fontWeight: 800,
            fontSize: 120,
            letterSpacing: "-0.04em",
            color: farbe.text,
            clipPath: `inset(0 ${interpolate(frame, [6, 20], [100, 0], { ...klemmen, easing: weich })}% 0 0)`,
            translate: interpolate(frame, [6, 20], ["-40px 0px", "0px 0px"], { ...klemmen, easing: weich }),
          }}
        >
          {kanal.name}
        </div>
      </div>
      {mitTon && <Audio src={staticFile("klang/einstieg-whoosh.mp3")} volume={0.6} premountFor={fps} />}
    </AbsoluteFill>
  );
};
