// Das Zeichen des Kanals (Logo oder Maskottchen) aus public/marke/zeichen.svg.
// Springt ein und federt bei den angegebenen Frames kurz nach.
// Wer ein animierbares Maskottchen will (z. B. mit zwinkerndem Auge), baut es als eigenes SVG nach.
import type React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

type Props = {
  readonly groesse: number;
  readonly einspringen?: boolean;
  readonly federnBei?: number[];
  readonly style?: React.CSSProperties;
};

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Zeichen: React.FC<Props> = ({ groesse, einspringen = false, federnBei = [], style }) => {
  const frame = useCurrentFrame();
  const rein = einspringen ? interpolate(frame, [0, 10, 16], [0, 1.15, 1], klemmen) : 1;
  const feder = Math.max(0, ...federnBei.map((f) => interpolate(frame, [f, f + 4, f + 10], [0, 1, 0], klemmen)));
  return <Img src={staticFile("marke/zeichen.svg")} style={{ width: groesse, height: groesse, scale: `${rein * (1 + feder * 0.08)}`, ...style }} />;
};
