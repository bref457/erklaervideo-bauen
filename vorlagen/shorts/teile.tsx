// Gemeinsame Teile für Shorts (Hochformat 1080 × 1920).
// Sichere Zone: oben 160 px, unten 420 px und rechts 140 px bleiben für YouTubes Knöpfe frei.
import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Zeichen } from "../../bausteine/Zeichen";
import { Szene, wortFrame, type Stimme } from "../../bausteine/Szene";
import { Untertitel } from "../../bausteine/Untertitel";
import { farbe, kanal, sanft, schrift } from "../../marke";

export const UNTERTITEL_OBEN = 1230;
const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(...sanft);

export const rein = (frame: number, ab: number, dauer = 12): React.CSSProperties => ({
  opacity: interpolate(frame, [ab, ab + dauer], [0, 1], { ...klemmen, easing: weich }),
  translate: interpolate(frame, [ab, ab + dauer], ["0px 30px", "0px 0px"], { ...klemmen, easing: weich }),
});

// Grosse Überschrift oben. ab = -99 heisst: ab dem ersten Bild sichtbar (für das Titelbild)
export const Kopf: React.FC<{ readonly children: React.ReactNode; readonly ab?: number }> = ({ children, ab = -99 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 70, right: 140, top: 190, fontFamily: schrift.kopf, fontWeight: 800, fontSize: 96, lineHeight: 1.02, letterSpacing: "-0.05em", ...rein(frame, ab, 10) }}>
      {children}
    </div>
  );
};

export const Ecke: React.FC = () => <Zeichen groesse={70} style={{ position: "absolute", right: 60, top: 80, opacity: 0.85 }} />;

export const Mitte: React.FC<{ readonly children: React.ReactNode; readonly oben?: number }> = ({ children, oben = 560 }) => (
  <div style={{ position: "absolute", left: 60, top: oben, width: 960 }}>{children}</div>
);

// Szene im Short-Format: Stimme, Untertitel, kleines Zeichen oben rechts
export const ShortSzene: React.FC<{ readonly stimme: Stimme; readonly video: string; readonly ecke?: boolean; readonly children: React.ReactNode }> = ({ stimme, video, ecke = true, children }) => (
  <Szene stimme={stimme} video={video} leitlinie={false}>
    {children}
    {ecke && <Ecke />}
    <Untertitel stimme={stimme} oben={UNTERTITEL_OBEN} />
  </Szene>
);

// Schluss: Zeichen federt, Verweis auf das ganze Video
export const Verweis: React.FC<{ readonly stimme: Stimme; readonly video: string; readonly zeile1: string; readonly zeile2: string; readonly federnBeiWort: string; readonly children?: React.ReactNode }> = ({ stimme, video, zeile1, zeile2, federnBeiWort, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const feder = wortFrame(stimme, federnBeiWort, fps);
  return (
    <ShortSzene stimme={stimme} video={video} ecke={false}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, gap: 60 }}>
        <Zeichen groesse={240} federnBei={[feder + 6]} style={{ scale: interpolate(frame, [0, 10, 16], [0.6, 1.1, 1], klemmen) }} />
        <div style={{ fontFamily: schrift.kopf, fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: "-0.04em", textAlign: "center", padding: "0 120px" }}>
          {zeile1}
          <br />
          <span style={{ color: farbe.akzentHell }}>{zeile2}</span>
        </div>
        <div style={{ fontFamily: schrift.kopf, fontWeight: 700, fontSize: 44, color: farbe.leise }}>{kanal.handle}</div>
      </AbsoluteFill>
      {children}
    </ShortSzene>
  );
};
