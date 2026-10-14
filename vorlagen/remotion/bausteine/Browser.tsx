// Nachgestellter Browser: echtes Seitenfoto (public/aufnahmen/...), animiertes Scrollen,
// Mauszeiger mit Klick und optionaler Markierung. Koordinaten sind Pixel im Seitenfoto (1920 breit).
import type React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { farbe, sanft, schrift } from "../marke";

const weich = Easing.bezier(...sanft);
const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const FENSTER = { links: 80, oben: 50, breite: 1760, hoehe: 980, leiste: 64 };
const MASS = FENSTER.breite / 1920; // Seitenfoto → Fenster

// Wert aus Schlüsselbildern [{frame, wert}] mit weichem Übergang
export const verlauf = (frame: number, punkte: { frame: number; wert: number }[]) => {
  if (punkte.length === 1) return punkte[0].wert;
  return interpolate(
    frame,
    punkte.map((p) => p.frame),
    punkte.map((p) => p.wert),
    { ...klemmen, easing: weich },
  );
};

export type Zeiger = { frame: number; x: number; y: number; klick?: boolean };

// Mauszeiger in Video-Koordinaten (1920 × 1080)
export const Mauszeiger: React.FC<{ readonly wege: Zeiger[]; readonly ab?: number }> = ({ wege, ab = 0 }) => {
  const frame = useCurrentFrame();
  if (frame < ab) return null;
  const x = verlauf(frame, wege.map((w) => ({ frame: w.frame, wert: w.x })));
  const y = verlauf(frame, wege.map((w) => ({ frame: w.frame, wert: w.y })));
  const klick = wege.filter((w) => w.klick).map((w) => w.frame);
  const ring = Math.max(0, ...klick.map((k) => interpolate(frame, [k, k + 14], [1, 0], klemmen) * (frame >= k ? 1 : 0)));
  const druck = Math.max(0, ...klick.map((k) => interpolate(frame, [k - 2, k, k + 4], [0, 1, 0], klemmen)));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 10, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -36, top: -36, width: 72, height: 72, borderRadius: 36, border: `5px solid ${farbe.akzent}`, opacity: ring, scale: `${1.6 - ring * 0.6}` }} />
      <svg width={44} height={44} viewBox="0 0 24 24" style={{ scale: `${1 - druck * 0.15}`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))" }}>
        <path d="M3 2 L3 19 L7.5 14.8 L10.6 21.5 L13.6 20.2 L10.6 13.6 L16.6 13.6 Z" fill="#fff" stroke="#111" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// Seitenfoto-Koordinate → Video-Koordinate (bei aktuellem Scroll)
export const aufVideo = (x: number, y: number, scroll: number) => ({
  x: FENSTER.links + x * MASS,
  y: FENSTER.oben + FENSTER.leiste + (y - scroll) * MASS,
});

type Props = {
  readonly url: string;
  readonly bild?: string; // Pfad in public/ (Seitenfoto)
  readonly bildHoehe?: number;
  readonly inhalt?: React.ReactNode; // statt Foto: nachgebaute Seite
  readonly scroll?: { frame: number; wert: number }[];
  readonly markierungen?: { x: number; y: number; b: number; h: number; ab: number; bis?: number }[];
  // Lupe: zoomt ab Frame `ab` auf den Punkt x/y (Seitenfoto-Koordinaten) heran, damit kleine Schrift
  // auf dem Handy lesbar wird. Den Mauszeiger währenddessen ausblenden (er rechnet ohne Zoom).
  readonly lupe?: { ab: number; bis?: number; x: number; y: number; faktor?: number };
  readonly children?: React.ReactNode;
};

export const Browser: React.FC<Props> = ({ url, bild, bildHoehe = 1080, inhalt, scroll = [{ frame: 0, wert: 0 }], markierungen = [], lupe, children }) => {
  const frame = useCurrentFrame();
  const y = verlauf(frame, scroll);
  const zoom = lupe
    ? interpolate(frame, [lupe.ab, lupe.ab + 18, ...(lupe.bis ? [lupe.bis, lupe.bis + 18] : [])], [1, lupe.faktor ?? 2, ...(lupe.bis ? [lupe.faktor ?? 2, 1] : [])], { ...klemmen, easing: Easing.bezier(...sanft) })
    : 1;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: FENSTER.links,
          top: FENSTER.oben,
          width: FENSTER.breite,
          height: FENSTER.hoehe,
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: "#0b0b0d",
          border: `2px solid ${farbe.linie}`,
          boxShadow: "0 30px 80px rgba(0,0,0,.55)",
        }}
      >
        <div style={{ height: FENSTER.leiste, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", backgroundColor: "#1e1e24" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: farbe.linie }} />
            ))}
          </div>
          <div style={{ flex: 1, height: 40, borderRadius: 20, backgroundColor: farbe.nacht, color: farbe.leise, display: "flex", alignItems: "center", padding: "0 22px", fontFamily: schrift.text, fontSize: 22 }}>
            <span style={{ color: farbe.text }}>{url.replace(/^https:\/\//, "").split("/")[0]}</span>
            <span>{url.replace(/^https:\/\/[^/]+/, "")}</span>
          </div>
        </div>
        <div style={{ position: "relative", height: FENSTER.hoehe - FENSTER.leiste, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, scale: `${zoom}`, transformOrigin: lupe ? `${lupe.x * MASS}px ${(lupe.y - y) * MASS}px` : "center" }}>
          {bild && <Img src={staticFile(bild)} style={{ position: "absolute", left: 0, top: -y * MASS, width: FENSTER.breite, height: bildHoehe * MASS }} />}
          {inhalt}
          {markierungen.map((m, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: (m.x - 16) * MASS,
                top: (m.y - y - 12) * MASS,
                width: (m.b + 32) * MASS,
                height: (m.h + 24) * MASS,
                borderRadius: 12,
                border: `5px solid ${farbe.akzent}`,
                boxShadow: "0 0 0 9999px rgba(0,0,0,.45)",
                opacity: interpolate(frame, [m.ab, m.ab + 10, ...(m.bis ? [m.bis, m.bis + 8] : [])], [0, 1, ...(m.bis ? [1, 0] : [])], klemmen),
              }}
            />
          ))}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
