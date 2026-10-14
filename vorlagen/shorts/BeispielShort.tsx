// Beispiel-Short: Pfad nicht gefunden? Hochformat 1080 × 1920, kein Kanal-Einstieg,
// erstes Bild = Titelbild, grosse Untertitel. Ins Projekt nach src/videos/shorts/ kopieren.
// Voraussetzung: node werkzeuge/stimme.mjs videos/s00-pfad-nicht-gefunden
import type React from "react";
import { Series, useCurrentFrame, useVideoConfig } from "remotion";
import { szenenLaenge, wortFrame, type Stimme } from "../../bausteine/Szene";
import { Terminal } from "../../bausteine/Terminal";
import { farbe } from "../../marke";
import { Kopf, Mitte, rein, ShortSzene, Verweis } from "./teile";

import p1 from "../../../public/stimme/s00-pfad-nicht-gefunden/s01.json";
import p2 from "../../../public/stimme/s00-pfad-nicht-gefunden/s02.json";
import p3 from "../../../public/stimme/s00-pfad-nicht-gefunden/s03.json";
import p4 from "../../../public/stimme/s00-pfad-nicht-gefunden/s04.json";

const VIDEO = "s00-pfad-nicht-gefunden";
const STIMMEN = [p1, p2, p3, p4] as Stimme[];
const KUERZEN = 0.3; // weniger Pause nach den ersten zwei Szenen, Shorts brauchen Tempo
export const laengeBeispielShort = (fps: number) => STIMMEN.reduce((s, st) => s + szenenLaenge(st, fps), 0) - 2 * Math.round(KUERZEN * fps);

const HEIM = "PS C:\\Users\\demo> ";
const FEHLER = "Set-Location : Der Pfad \"C:\\Users\\demo\\projekte\" kann nicht gefunden werden, da er nicht vorhanden ist.";

const S1: React.FC = () => (
  <ShortSzene stimme={p1 as Stimme} video={VIDEO}>
    <Kopf>
      Pfad nicht
      <br />
      <span style={{ color: farbe.warnung }}>gefunden?</span>
    </Kopf>
    <Mitte>
      <Terminal breite={960} zeilen={[{ ab: -999, text: "cd projekte", prompt: HEIM }, { ab: -999, text: FEHLER, art: "fehler" }]} />
    </Mitte>
  </ShortSzene>
);

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zuViel = wortFrame(p2 as Stimme, "ein Buchstabe", fps);
  return (
    <ShortSzene stimme={p2 as Stimme} video={VIDEO}>
      <Kopf ab={0}>
        Meist ein
        <br />
        <span style={{ color: farbe.akzentHell }}>Tippfehler</span>
      </Kopf>
      <Mitte>
        <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 110, letterSpacing: "-0.02em" }}>
          cd projekt<span style={{ color: farbe.warnung, textDecoration: "underline", ...rein(frame, zuViel - 4) }}>e</span>
        </div>
      </Mitte>
    </ShortSzene>
  );
};

const S3: React.FC = () => {
  const { fps } = useVideoConfig();
  const st = p3 as Stimme;
  const klappt = wortFrame(st, "Dann klappt", fps);
  return (
    <ShortSzene stimme={st} video={VIDEO}>
      <Kopf ab={0}>
        Namen genau
        <br />
        <span style={{ color: farbe.akzentHell }}>abschreiben</span>
      </Kopf>
      <Mitte>
        <Terminal breite={960} zeilen={[{ ab: 6, text: "cd projekt", prompt: HEIM }, { ab: klappt, text: "", prompt: "PS C:\\Users\\demo\\projekt> " }]} />
      </Mitte>
    </ShortSzene>
  );
};

const S4: React.FC = () => <Verweis stimme={p4 as Stimme} video={VIDEO} zeile1="Mehr im Video" zeile2="unten verlinkt" federnBeiWort="verlinkten Video" />;

export const BeispielShort = () => {
  const { fps } = useVideoConfig();
  const [l1, l2, l3, l4] = STIMMEN;
  const k = Math.round(KUERZEN * fps);
  return (
    <Series>
      <Series.Sequence name="1 Aufhänger" durationInFrames={szenenLaenge(l1, fps) - k} premountFor={fps}><S1 /></Series.Sequence>
      <Series.Sequence name="2 Einordnung" durationInFrames={szenenLaenge(l2, fps) - k} premountFor={fps}><S2 /></Series.Sequence>
      <Series.Sequence name="3 Lösung" durationInFrames={szenenLaenge(l3, fps)} premountFor={fps}><S3 /></Series.Sequence>
      <Series.Sequence name="4 Verweis" durationInFrames={szenenLaenge(l4, fps)} premountFor={fps}><S4 /></Series.Sequence>
    </Series>
  );
};
