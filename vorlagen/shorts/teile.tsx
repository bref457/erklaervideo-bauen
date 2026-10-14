// Gemeinsame Teile für Shorts und Reels (Hochformat 1080 × 1920).
// Zwei Fassungen aus demselben Code, gewählt über die Eigenschaft format:
// - youtube: oben 160 px, unten 420 px und rechts 140 px bleiben für YouTubes Knöpfe frei.
// - instagram (Reels): oben 14 %, unten 35 %, seitlich 6 % frei (Meta Ads Guide), also y 269 bis 1248.
// Positionen nie fest in einzelne Szenen schreiben, immer über useLayout().
import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Zeichen } from "../../bausteine/Zeichen";
import { Szene, wortFrame, type Stimme } from "../../bausteine/Szene";
import { Untertitel } from "../../bausteine/Untertitel";
import { farbe, kanal, sanft, schrift } from "../../marke";

export type Format = "youtube" | "instagram";
export type FormatProps = { readonly format?: Format };

const LAYOUT = {
  youtube: { kopfOben: 190, kopfGroesse: 96, mitteVersatz: 0, mitteSkala: 1, signalOben: 440, untertitelOben: 1230, untertitelGroesse: 82, eckeOben: 80, verweisOben: 300, verweisAbstand: 60, plaketteOben: 160, verweisZeile2: "im Video unten" },
  instagram: { kopfOben: 290, kopfGroesse: 86, mitteVersatz: -60, mitteSkala: 0.88, signalOben: 470, untertitelOben: 1070, untertitelGroesse: 74, eckeOben: 290, verweisOben: 390, verweisAbstand: 36, plaketteOben: 275, verweisZeile2: "auf YouTube" },
} as const;

const FormatKontext = createContext<Format>("youtube");
export const FormatRahmen: React.FC<{ readonly format?: Format; readonly children: React.ReactNode }> = ({ format = "youtube", children }) => (
  <FormatKontext.Provider value={format}>{children}</FormatKontext.Provider>
);
export const useFormat = () => useContext(FormatKontext);
export const useLayout = () => LAYOUT[useFormat()];

// Schluss-Stimme je Format: Instagram hat kein „verlinktes Video“, dort ein eigener Satz
export type ReelSchluss = { readonly stimme: Stimme; readonly video: string };
export const schlussStimme = (format: Format | undefined, youtube: Stimme, reel?: ReelSchluss) => (format === "instagram" && reel ? reel.stimme : youtube);

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(...sanft);

export const rein = (frame: number, ab: number, dauer = 12): React.CSSProperties => ({
  opacity: interpolate(frame, [ab, ab + dauer], [0, 1], { ...klemmen, easing: weich }),
  translate: interpolate(frame, [ab, ab + dauer], ["0px 30px", "0px 0px"], { ...klemmen, easing: weich }),
});

// Grosse Überschrift oben. ab = -99 heisst: ab dem ersten Bild sichtbar (für das Titelbild)
export const Kopf: React.FC<{ readonly children: React.ReactNode; readonly ab?: number }> = ({ children, ab = -99 }) => {
  const frame = useCurrentFrame();
  const l = useLayout();
  return (
    <div style={{ position: "absolute", left: 70, right: 140, top: l.kopfOben, fontFamily: schrift.kopf, fontWeight: 800, fontSize: l.kopfGroesse, lineHeight: 1.02, letterSpacing: "-0.05em", ...rein(frame, ab, 10) }}>
      {children}
    </div>
  );
};

export const Ecke: React.FC = () => {
  const l = useLayout();
  return <Zeichen groesse={70} style={{ position: "absolute", right: 60, top: l.eckeOben, opacity: 0.85 }} />;
};

// Bildmitte (Terminal, Karten). Bei Instagram etwas höher und kleiner, damit die Untertitel Platz haben
export const Mitte: React.FC<{ readonly children: React.ReactNode; readonly oben?: number }> = ({ children, oben = 560 }) => {
  const l = useLayout();
  return <div style={{ position: "absolute", left: 60, top: oben + l.mitteVersatz, width: 960, scale: l.mitteSkala, transformOrigin: "top center" }}>{children}</div>;
};

export const UntertitelImFormat: React.FC<{ readonly stimme: Stimme }> = ({ stimme }) => {
  const l = useLayout();
  return <Untertitel stimme={stimme} oben={l.untertitelOben} groesse={l.untertitelGroesse} />;
};

// Szene im Short-Format: Stimme, Untertitel, kleines Zeichen oben rechts
export const ShortSzene: React.FC<{ readonly stimme: Stimme; readonly video: string; readonly ecke?: boolean; readonly children: React.ReactNode }> = ({ stimme, video, ecke = true, children }) => (
  <Szene stimme={stimme} video={video} leitlinie={false}>
    {children}
    {ecke && <Ecke />}
    <UntertitelImFormat stimme={stimme} />
  </Szene>
);

// Schluss: Zeichen federt, Verweis auf das ganze Video.
// zeile2 leer lassen, dann passt sie sich dem Format an („im Video unten“ / „auf YouTube“).
// reel: Schluss-Stimme für Instagram, federnBeiWortReel: Wort darin, bei dem das Zeichen federt.
export const Verweis: React.FC<{
  readonly stimme: Stimme;
  readonly video: string;
  readonly reel?: ReelSchluss;
  readonly zeile1: string;
  readonly zeile2?: string;
  readonly federnBeiWort: string;
  readonly federnBeiWortReel?: string;
  readonly children?: React.ReactNode;
}> = ({ stimme: youtube, video: youtubeVideo, reel, zeile1, zeile2, federnBeiWort, federnBeiWortReel = "YouTube-Kanal", children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const l = useLayout();
  const alsReel = useFormat() === "instagram" && reel !== undefined;
  const stimme = alsReel ? reel.stimme : youtube;
  const video = alsReel ? reel.video : youtubeVideo;
  const feder = wortFrame(stimme, alsReel ? federnBeiWortReel : federnBeiWort, fps);
  return (
    <ShortSzene stimme={stimme} video={video} ecke={false}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: l.verweisOben, gap: l.verweisAbstand }}>
        <Zeichen groesse={240} federnBei={[feder + 6]} style={{ scale: interpolate(frame, [0, 10, 16], [0.6, 1.1, 1], klemmen) }} />
        <div style={{ fontFamily: schrift.kopf, fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: "-0.04em", textAlign: "center", padding: "0 120px" }}>
          {zeile1}
          <br />
          <span style={{ color: farbe.akzentHell }}>{zeile2 ?? l.verweisZeile2}</span>
        </div>
        <div style={{ fontFamily: schrift.kopf, fontWeight: 700, fontSize: 44, color: farbe.leise }}>{kanal.handle}</div>
      </AbsoluteFill>
      {children}
    </ShortSzene>
  );
};
