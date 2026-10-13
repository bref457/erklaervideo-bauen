// Thumbnails für das Beispielvideo, 1280 × 720. Ohne Gesicht: Zeichen, Schild, wenige grosse Wörter.
// In Phase 7 entstehen drei Varianten: A sachlich, B Problem, C Ergebnis oder Kosten.
import type React from "react";
import { AbsoluteFill } from "remotion";
import { Signal } from "../../bausteine/Signal";
import { Zeichen } from "../../bausteine/Zeichen";
import { farbe, schrift } from "../../marke";

type Props = { readonly variante: "A" | "B" };

const Gross: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: schrift.kopf, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.055em", ...style }}>{children}</div>
);

export const Vorschaubild: React.FC<Props> = ({ variante }) => (
  <AbsoluteFill style={{ backgroundColor: farbe.nacht, color: farbe.text, overflow: "hidden" }}>
    {variante === "A" && (
      <>
        <div style={{ position: "absolute", left: 80, top: 120 }}>
          <Gross style={{ fontSize: 130 }}>3 Befehle</Gross>
          <Gross style={{ fontSize: 90, color: farbe.akzentHell, marginTop: 20 }}>PowerShell</Gross>
          <div style={{ marginTop: 40, fontFamily: schrift.kopf, fontWeight: 700, fontSize: 40, color: farbe.leise }}>mkdir · cd · dir</div>
        </div>
        <Zeichen groesse={300} style={{ position: "absolute", right: 110, top: 200, rotate: "-6deg" }} />
      </>
    )}
    {variante === "B" && (
      <>
        <div style={{ position: "absolute", left: 80, top: 80 }}>
          <Gross style={{ fontSize: 100 }}>Pfad nicht</Gross>
          <Gross style={{ fontSize: 100, color: farbe.warnung }}>gefunden?</Gross>
        </div>
        <div style={{ position: "absolute", left: 80, top: 370, width: 760, borderRadius: 14, border: `2px solid ${farbe.linie}`, backgroundColor: "#0b0c10", padding: "26px 30px", fontFamily: schrift.kopf, fontWeight: 700, fontSize: 30, lineHeight: 1.5 }}>
          <div><span style={{ color: farbe.akzentHell }}>PS&gt; </span>cd projekte</div>
          <div style={{ color: "#ff8a73" }}>… kann nicht gefunden werden</div>
        </div>
        <Signal art="achtung" groesse={260} style={{ position: "absolute", right: 90, top: 300 }} />
      </>
    )}
  </AbsoluteFill>
);
