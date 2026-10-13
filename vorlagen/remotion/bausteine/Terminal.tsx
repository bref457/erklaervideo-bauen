// Terminal-Fenster (PowerShell, Eingabeaufforderung, KI-Agent im Terminal). Zeilen erscheinen ab einem Frame,
// Befehle tippen sich Zeichen für Zeichen.
import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { farbe, schrift } from "../marke";

export type Zeile = {
  readonly ab: number; // Frame, ab dem die Zeile erscheint
  readonly text: string;
  readonly art?: "befehl" | "ausgabe" | "fehler" | "gut" | "wahl" | "agent"; // agent = Ausgabe eines KI-Agenten
  readonly prompt?: string; // statt "PS> ", z. B. "> " für Eingaben in einem KI-Agenten
};

type Props = {
  readonly titel?: string;
  readonly zeilen: Zeile[];
  readonly breite?: number;
  readonly style?: React.CSSProperties;
};

const TIPPEN = 1.6; // Zeichen pro Frame

export const Terminal: React.FC<Props> = ({ titel = "Windows PowerShell", zeilen, breite = 1400, style }) => {
  const frame = useCurrentFrame();
  const sichtbar = zeilen.filter((z) => frame >= z.ab);
  const letzte = sichtbar.at(-1);
  const cursorAn = Math.floor(frame / 16) % 2 === 0;

  return (
    <div
      style={{
        width: breite,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: farbe.tinte,
        border: `2px solid ${farbe.linie}`,
        boxShadow: "0 30px 80px rgba(0,0,0,.55)",
        fontFamily: schrift.kopf,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 26px", backgroundColor: "#1e1e24", color: farbe.leise, fontSize: 24 }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: farbe.akzent }} />
        {titel}
      </div>
      <div style={{ padding: "30px 36px 40px", fontSize: 34, lineHeight: 1.55, minHeight: 260 }}>
        {sichtbar.map((z, i) => {
          const istBefehl = (z.art ?? "befehl") === "befehl";
          const zeichen = istBefehl ? Math.floor((frame - z.ab) * TIPPEN) : z.text.length;
          const text = z.text.slice(0, zeichen);
          const fertig = zeichen >= z.text.length;
          const deckkraft = istBefehl ? 1 : interpolate(frame, [z.ab, z.ab + 6], [0, 1], { extrapolateRight: "clamp" });
          const farbeZeile = z.art === "fehler" ? "#ff8a73" : z.art === "gut" ? "#8fe3a6" : z.art === "ausgabe" ? farbe.leise : z.art === "agent" ? "#e8a07a" : farbe.text;
          return (
            <div key={i} style={{ color: farbeZeile, opacity: deckkraft, fontWeight: z.art === "wahl" ? 800 : 700, whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
              {istBefehl && <span style={{ color: farbe.akzentHell }}>{z.prompt ?? "PS> "}</span>}
              {z.art === "wahl" && <span style={{ color: farbe.akzentHell }}>❯ </span>}
              {text}
              {z === letzte && istBefehl && (fertig ? cursorAn : true) && (
                <span style={{ display: "inline-block", width: 18, height: 36, marginLeft: 4, translate: "0 6px", backgroundColor: farbe.akzentHell }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
