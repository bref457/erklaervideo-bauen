// Fester Kanal-Abspann (18 s) am Ende jedes langen Videos. Stimme: videos/kanal-abspann/drehbuch.md einmal vertonen.
// Lässt Platz für YouTubes Abspann-Elemente: links ein Video-Kasten (16:9), rechts der Abo-Knopf.
// In YouTube Studio → Abspann die Elemente genau auf die gestrichelten Flächen ziehen.
import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import abspann from "../../public/stimme/kanal-abspann/s01.json";
import { farbe, kanal, sanft, schrift } from "../marke";
import { Zeichen } from "./Zeichen";
import { Szene, wortFrame, type Stimme } from "./Szene";

export const ABSPANN_SEKUNDEN = 18;

// Flächen für YouTubes Elemente (Pixel im 1920 × 1080-Bild)
export const ABSPANN_VIDEO = { x: 150, y: 300, b: 720, h: 405 };
export const ABSPANN_ABO = { x: 1310, y: 352, d: 300 };

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(...sanft);
const rein = (frame: number, ab: number, dauer = 14): React.CSSProperties => ({
  opacity: interpolate(frame, [ab, ab + dauer], [0, 1], { ...klemmen, easing: weich }),
  translate: interpolate(frame, [ab, ab + dauer], ["0px 24px", "0px 0px"], { ...klemmen, easing: weich }),
});

const stimme = abspann as Stimme;

export const KanalAbspann: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const abo = wortFrame(stimme, "abonniere", fps);
  const kommentare = wortFrame(stimme, "Kommentare", fps);
  const weiter = wortFrame(stimme, "Hier geht es", fps);
  const puls = frame >= abo ? 1 + Math.max(0, Math.sin((frame - abo) / 5)) * 0.04 * interpolate(frame, [abo, abo + 40], [1, 0], klemmen) : 1;
  const rahmen = (aktiv: boolean): React.CSSProperties => ({
    border: `5px dashed ${aktiv ? farbe.akzentHell : farbe.linie}`,
    display: "grid",
    placeItems: "center",
    fontFamily: schrift.kopf,
    fontWeight: 700,
    fontSize: 30,
    color: aktiv ? farbe.text : farbe.leise,
  });
  return (
    <Szene stimme={stimme} video="kanal-abspann" leitlinie={false}>
      <AbsoluteFill>
        <div style={{ position: "absolute", top: 90, width: "100%", textAlign: "center", fontFamily: schrift.kopf, fontWeight: 800, fontSize: 72, letterSpacing: "-0.04em", ...rein(frame, 0) }}>Danke fürs Schauen</div>
        <div style={{ position: "absolute", top: 196, width: "100%", textAlign: "center", fontSize: 38, color: farbe.leise, ...rein(frame, kommentare - 4) }}>
          Schreib mir in die Kommentare: <span style={{ color: farbe.akzentHell }}>Wo hat es nicht geklappt?</span>
        </div>
        <div style={{ position: "absolute", left: ABSPANN_VIDEO.x, top: ABSPANN_VIDEO.y, width: ABSPANN_VIDEO.b, height: ABSPANN_VIDEO.h, borderRadius: 16, ...rahmen(frame >= weiter), ...rein(frame, 6) }}>Nächstes Video</div>
        <div style={{ position: "absolute", left: ABSPANN_ABO.x, top: ABSPANN_ABO.y, width: ABSPANN_ABO.d, height: ABSPANN_ABO.d, borderRadius: "50%", scale: `${puls}`, ...rahmen(frame >= abo && frame < weiter), ...rein(frame, 10) }}>Abonnieren</div>
        <Zeichen groesse={110} federnBei={[abo + 6, weiter + 10]} style={{ position: "absolute", left: 1035, top: 470, ...rein(frame, 14) }} />
        <div style={{ position: "absolute", bottom: 90, width: "100%", textAlign: "center", fontFamily: schrift.kopf, fontWeight: 700, fontSize: 40, color: farbe.leise, ...rein(frame, 20) }}>
          {kanal.website} · <span style={{ color: farbe.akzentHell }}>{kanal.handle}</span>
        </div>
      </AbsoluteFill>
    </Szene>
  );
};
