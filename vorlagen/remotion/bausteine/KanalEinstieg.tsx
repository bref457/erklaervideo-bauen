// Immer gleicher Kanal-Einstieg (3,5 s): Zeichen springt ein, der Kanalname schiebt sich daneben,
// darunter tippt sich der Kanal-Satz. Kommt in jedem Video nach der ersten Szene (dem Aufhänger).
// Töne: mit werkzeuge/toene.mjs nach public/klang/ erzeugen (einstieg-whoosh.mp3, einstieg-feder.mp3).
import { Audio } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { farbe, kanal, schrift } from "../marke";
import { Zeichen } from "./Zeichen";

export const EINSTIEG_SEKUNDEN = 3.5;

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(0.16, 1, 0.3, 1);

type Props = { readonly mitTon?: boolean };

export const KanalEinstieg: React.FC<Props> = ({ mitTon = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ende = Math.round(EINSTIEG_SEKUNDEN * fps);
  const tippAb = Math.round(1.4 * fps);
  const zeichen = Math.max(0, Math.floor((frame - tippAb) * 1.4));
  const aus = interpolate(frame, [ende - 8, ende], [1, 0], klemmen);
  return (
    <AbsoluteFill style={{ backgroundColor: farbe.nacht, alignItems: "center", justifyContent: "center", opacity: aus }}>
      <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
        <Zeichen groesse={200} einspringen federnBei={[62]} />
        <div
          style={{
            fontFamily: schrift.kopf,
            fontWeight: 800,
            fontSize: 120,
            letterSpacing: "-0.04em",
            color: farbe.text,
            clipPath: `inset(0 ${interpolate(frame, [12, 34], [100, 0], { ...klemmen, easing: weich })}% 0 0)`,
            translate: interpolate(frame, [12, 34], ["-40px 0px", "0px 0px"], { ...klemmen, easing: weich }),
          }}
        >
          {kanal.name}
        </div>
      </div>
      <div style={{ marginTop: 50, height: 60, fontFamily: schrift.kopf, fontWeight: 700, fontSize: 46, letterSpacing: "-0.02em", color: farbe.leise }}>
        {kanal.satz.slice(0, zeichen)}
      </div>
      {mitTon && <Audio src={staticFile("klang/einstieg-whoosh.mp3")} volume={0.6} premountFor={fps} />}
      {mitTon && <Audio src={staticFile("klang/einstieg-feder.mp3")} from={62} volume={0.5} premountFor={fps} />}
    </AbsoluteFill>
  );
};
