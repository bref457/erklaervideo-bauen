// Warnschild: weisses Feld, farbiger Rand, Piktogramm in Tinte. Für Stolpersteine, Kosten, Hinweise.
import type React from "react";
import { farbe, schrift } from "../marke";

type Props = {
  readonly art: "kosten" | "terminal" | "achtung" | "pruefen";
  readonly waehrung?: string; // Text im Kosten-Schild, z. B. "€", "$", "Fr."
  readonly groesse: number;
  readonly style?: React.CSSProperties;
};

const dreieck = "M60 12 L110 98 H10 Z";

export const Signal: React.FC<Props> = ({ art, groesse, waehrung = "€", style }) => (
  <svg viewBox="0 0 120 110" width={groesse} height={(groesse * 110) / 120} style={{ overflow: "visible", ...style }}>
    <path d={dreieck} fill="#fff" stroke="#fff" strokeWidth={16} strokeLinejoin="round" />
    <path d={dreieck} fill={farbe.warnung} stroke={farbe.warnung} strokeWidth={8} strokeLinejoin="round" />
    <path d="M60 36 L91 89 H29 Z" fill="#fff" stroke="#fff" strokeWidth={6} strokeLinejoin="round" />
    <g fill="none" stroke={farbe.tinte} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      {art === "kosten" && (
        <text x="60" y="80" textAnchor="middle" fill={farbe.tinte} stroke="none" fontFamily={schrift.kopf} fontWeight={800} fontSize={19} letterSpacing={-1}>
          {waehrung}
        </text>
      )}
      {art === "terminal" && <path d="M48 65 L57 71.5 L48 78 M61 80 H73" />}
      {art === "achtung" && (
        <>
          <path d="M60 54 V72" />
          <circle cx="60" cy="81" r="1.5" fill={farbe.tinte} />
        </>
      )}
      {art === "pruefen" && (
        <>
          <circle cx="57.5" cy="68" r="7.5" />
          <path d="M63 73.5 L70 80.5" />
        </>
      )}
    </g>
  </svg>
);
