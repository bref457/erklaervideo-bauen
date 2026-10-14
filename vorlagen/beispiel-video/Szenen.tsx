// Beispielvideo: Die ersten drei Befehle in der PowerShell.
// Eine Komponente pro Szene im Drehbuch. Animationen hängen an den Wörtern der Stimme (wortFrame),
// nie an festen Sekunden. Ins Projekt kopieren nach src/videos/beispiel/.
// Voraussetzung: node werkzeuge/stimme.mjs videos/00-beispiel-powershell (erzeugt die JSON-Dateien).
import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Signal } from "../../bausteine/Signal";
import { Plakette, Szene, wortFrame, type Stimme } from "../../bausteine/Szene";
import { Terminal } from "../../bausteine/Terminal";
import { Desktop, Startmenue } from "../../bausteine/Windows";
import { Zeichen } from "../../bausteine/Zeichen";
import { Mauszeiger } from "../../bausteine/Browser";
import { farbe, kanal, sanft, schrift } from "../../marke";

import s01 from "../../../public/stimme/00-beispiel-powershell/s01.json";
import s02 from "../../../public/stimme/00-beispiel-powershell/s02.json";
import s03 from "../../../public/stimme/00-beispiel-powershell/s03.json";
import s04 from "../../../public/stimme/00-beispiel-powershell/s04.json";
import s05 from "../../../public/stimme/00-beispiel-powershell/s05.json";
import s06 from "../../../public/stimme/00-beispiel-powershell/s06.json";
import s07 from "../../../public/stimme/00-beispiel-powershell/s07.json";
import s08 from "../../../public/stimme/00-beispiel-powershell/s08.json";

export const VIDEO = "00-beispiel-powershell";
export const STIMMEN = [s01, s02, s03, s04, s05, s06, s07, s08] as Stimme[];

const HEIM = "PS C:\\Users\\demo> ";
const PROJEKT = "PS C:\\Users\\demo\\projekt> ";

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const weich = Easing.bezier(...sanft);
const rein = (frame: number, ab: number, dauer = 16): React.CSSProperties => ({
  opacity: interpolate(frame, [ab, ab + dauer], [0, 1], { ...klemmen, easing: weich }),
  translate: interpolate(frame, [ab, ab + dauer], ["0px 30px", "0px 0px"], { ...klemmen, easing: weich }),
});

const Titel: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: schrift.kopf, fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: "-0.045em", ...style }}>{children}</div>
);

const Mitte: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>;

// 1 · Aufhänger
export const S01Aufhaenger: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titel = "Die ersten drei Befehle in der PowerShell";
  const zeichen = Math.max(0, Math.floor((frame - Math.round(0.6 * fps)) * 1.3));
  return (
    <Szene stimme={s01 as Stimme} video={VIDEO}>
      <AbsoluteFill style={{ padding: "0 200px", justifyContent: "center", gap: 50 }}>
        <Zeichen groesse={150} einspringen />
        <Titel style={{ fontSize: 100, maxWidth: 1450 }}>{titel.slice(0, zeichen)}</Titel>
        <div style={{ fontSize: 44, color: farbe.leise, ...rein(frame, wortFrame(s01 as Stimme, "Damit legst", fps)) }}>Ordner anlegen · hineinwechseln · Inhalt anzeigen</div>
      </AbsoluteFill>
    </Szene>
  );
};

// 2 · PowerShell öffnen (nachgestellt)
export const S02Oeffnen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s02 as Stimme;
  const start = wortFrame(st, "Klick auf Start", fps);
  const tippe = wortFrame(st, "tippe PowerShell", fps);
  const oeffne = wortFrame(st, "Öffne es", fps);
  const admin = wortFrame(st, "Als Administrator", fps);
  const offen = oeffne + 14;
  return (
    <Szene stimme={st} video={VIDEO}>
      <Desktop>
        {frame < offen ? (
          <Startmenue ab={start + 6} tippen={tippe + 4} suchtext="PowerShell" ergebnis="Windows PowerShell" untertitel="App" />
        ) : (
          <Mitte>
            <Terminal style={rein(frame, offen, 10)} zeilen={[{ ab: offen, text: "Windows PowerShell", art: "ausgabe" }, { ab: offen + 8, text: "", prompt: HEIM }]} />
          </Mitte>
        )}
      </Desktop>
      <Mauszeiger
        wege={[
          { frame: 0, x: 1200, y: 700 },
          { frame: start, x: 823, y: 1048, klick: true },
          { frame: oeffne - 10, x: 823, y: 1048 },
          { frame: oeffne + 2, x: 900, y: 500, klick: true },
          { frame: offen + 20, x: 1500, y: 860 },
        ]}
      />
      <Plakette style={rein(frame, admin - 4)}>Kein Administrator nötig</Plakette>
    </Szene>
  );
};

// 3 · Ordner anlegen
export const S03Anlegen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s03 as Stimme;
  const befehl = wortFrame(st, "Er steht", fps);
  const enter = wortFrame(st, "und Enter", fps);
  return (
    <Szene stimme={st} video={VIDEO}>
      <Mitte>
        <Terminal
          style={rein(frame, 0)}
          zeilen={[
            { ab: befehl, text: "mkdir projekt", prompt: HEIM },
            { ab: enter + 8, text: "    Verzeichnis: C:\\Users\\demo", art: "ausgabe" },
            { ab: enter + 12, text: "d-----        projekt", art: "gut" },
            { ab: enter + 20, text: "", prompt: HEIM },
          ]}
        />
      </Mitte>
    </Szene>
  );
};

// 4 · Hineinwechseln
export const S04Wechseln: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s04 as Stimme;
  const befehl = wortFrame(st, "zweiten Befehl", fps);
  const zeile = wortFrame(st, "Die Zeile vorne", fps);
  return (
    <Szene stimme={st} video={VIDEO}>
      <Mitte>
        <Terminal style={rein(frame, 0)} zeilen={[{ ab: befehl, text: "cd projekt", prompt: HEIM }, { ab: zeile - 6, text: "", prompt: PROJEKT }]} />
      </Mitte>
      <Plakette style={rein(frame, zeile)}>Du bist jetzt in „projekt“</Plakette>
    </Szene>
  );
};

// 5 · Stolperstein: Tippfehler
export const S05Stolperstein: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s05 as Stimme;
  const tipp = wortFrame(st, "Ein einziger", fps);
  const fehler = wortFrame(st, "findet den Ordner", fps);
  const lies = wortFrame(st, "Lies die Meldung", fps);
  return (
    <Szene stimme={st} video={VIDEO}>
      <Mitte>
        <Terminal
          style={rein(frame, 0)}
          zeilen={[
            { ab: tipp, text: "cd projekte", prompt: HEIM },
            { ab: fehler, text: "Set-Location : Der Pfad \"C:\\Users\\demo\\projekte\" kann nicht gefunden werden, da er nicht vorhanden ist.", art: "fehler" },
          ]}
        />
      </Mitte>
      <Signal art="achtung" groesse={190} style={{ position: "absolute", right: 150, top: 110, scale: interpolate(frame, [fehler, fehler + 8, fehler + 16], [0, 1.15, 1], klemmen) }} />
      <Plakette style={rein(frame, lies)}>Namen genau prüfen</Plakette>
    </Szene>
  );
};

// 6 · Inhalt anzeigen
export const S06Anzeigen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s06 as Stimme;
  const befehl = wortFrame(st, "dritten Befehl", fps);
  const leer = wortFrame(st, "Noch ist er leer", fps);
  return (
    <Szene stimme={st} video={VIDEO}>
      <Mitte>
        <Terminal style={rein(frame, 0)} zeilen={[{ ab: befehl, text: "dir", prompt: PROJEKT }, { ab: leer - 4, text: "", prompt: PROJEKT }]} />
      </Mitte>
      <Plakette style={rein(frame, leer)}>Leer: keine Ausgabe</Plakette>
    </Szene>
  );
};

// 7 · Zusammenfassung: Route mit Halten, das Zeichen springt mit
export const S07Route: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s07 as Stimme;
  const halte = [
    { name: "Ordner anlegen", ab: wortFrame(st, "Ordner anlegen", fps) },
    { name: "hineinwechseln", ab: wortFrame(st, "hineinwechseln", fps) },
    { name: "Inhalt anzeigen", ab: wortFrame(st, "Inhalt anzeigen", fps) },
  ];
  const abstand = 560;
  const links = 400;
  let pos = 0;
  let sprung = 0;
  halte.forEach((h, i) => {
    const t = interpolate(frame, [h.ab - 8, h.ab + 4], [0, 1], { ...klemmen, easing: weich });
    if (t > 0) {
      pos = i - 1 + t;
      sprung = Math.sin(t * Math.PI) * 80;
    }
  });
  return (
    <Szene stimme={st} video={VIDEO}>
      <Titel style={{ position: "absolute", left: 200, top: 170, ...rein(frame, 0) }}>Kurz zusammengefasst</Titel>
      <div style={{ position: "absolute", left: links, width: abstand * 2, top: 600, height: 6, backgroundImage: `repeating-linear-gradient(to right, ${farbe.linie} 0 30px, transparent 30px 52px)` }} />
      {halte.map((h, i) => {
        const erreicht = frame >= h.ab;
        return (
          <div key={h.name} style={{ position: "absolute", left: links + i * abstand - 30, top: 573, width: 60, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, border: `6px solid ${erreicht ? farbe.akzent : farbe.text}`, backgroundColor: erreicht ? farbe.akzent : farbe.nacht }} />
            <div style={{ marginTop: 34, width: 360, textAlign: "center", fontFamily: schrift.kopf, fontWeight: 700, fontSize: 36, color: erreicht ? farbe.text : farbe.leise }}>{h.name}</div>
          </div>
        );
      })}
      <Zeichen groesse={90} style={{ position: "absolute", left: links + Math.max(0, pos) * abstand - 45, top: 450 - sprung, ...rein(frame, halte[0].ab - 14, 8) }} />
    </Szene>
  );
};

// 8 · Abschluss
export const S08Abschluss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = s08 as Stimme;
  return (
    <Szene stimme={st} video={VIDEO}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 50 }}>
        <Zeichen groesse={180} einspringen />
        <Titel style={{ fontSize: 110, ...rein(frame, 6) }}>{kanal.name}</Titel>
        <div style={{ display: "flex", gap: 70, fontFamily: schrift.kopf, fontWeight: 700, fontSize: 48 }}>
          <span style={{ color: farbe.akzentHell, ...rein(frame, wortFrame(st, "nächsten Video", fps)) }}>{kanal.handle}</span>
          <span style={rein(frame, wortFrame(st, "Bis gleich", fps))}>{kanal.website}</span>
        </div>
      </AbsoluteFill>
    </Szene>
  );
};
