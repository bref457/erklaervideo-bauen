// Nachgebaute Windows-Oberfläche (vereinfacht, neutral): Desktop, Taskleiste, Startmenü-Suche,
// Programmfenster, Installationsassistent. Kein echter Benutzername, keine echten Daten.
import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { farbe, schrift } from "../marke";

const klemmen = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Desktop: React.FC<{ readonly children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 70% 20%, #2a2f45 0%, #15171f 55%, #0d0e12 100%)" }}>
    {children}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 64, backgroundColor: "rgba(28,28,34,.92)", borderTop: "1px solid #2c2c34", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <WindowsLogo groesse={30} />
      <div style={{ width: 260, height: 40, borderRadius: 20, backgroundColor: "#2a2a32", color: "#9a9aa6", display: "flex", alignItems: "center", padding: "0 18px", gap: 10, fontFamily: schrift.text, fontSize: 20 }}>
        <svg width={20} height={20} viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#9a9aa6" strokeWidth={2.4} /><path d="M15 15 L21 21" stroke="#9a9aa6" strokeWidth={2.4} strokeLinecap="round" /></svg>
        Suche
      </div>
    </div>
  </div>
);

export const WindowsLogo: React.FC<{ readonly groesse: number }> = ({ groesse }) => (
  <svg width={groesse} height={groesse} viewBox="0 0 20 20">
    <rect x="0" y="0" width="9.4" height="9.4" fill="#4cc2ff" />
    <rect x="10.6" y="0" width="9.4" height="9.4" fill="#4cc2ff" />
    <rect x="0" y="10.6" width="9.4" height="9.4" fill="#4cc2ff" />
    <rect x="10.6" y="10.6" width="9.4" height="9.4" fill="#4cc2ff" />
  </svg>
);

// Startmenü mit Suche: tippt `suchtext` ab Frame `tippen`, zeigt ein Ergebnis
export const Startmenue: React.FC<{ readonly ab: number; readonly tippen: number; readonly suchtext: string; readonly ergebnis: string; readonly untertitel: string }> = ({ ab, tippen, suchtext, ergebnis, untertitel }) => {
  const frame = useCurrentFrame();
  if (frame < ab) return null;
  const auf = interpolate(frame, [ab, ab + 10], [0, 1], klemmen);
  const zeichen = Math.max(0, Math.floor((frame - tippen) * 0.8));
  const zeigeErgebnis = zeichen >= 4;
  return (
    <div style={{ position: "absolute", left: 560, bottom: 80, width: 800, height: 720, borderRadius: 14, backgroundColor: "rgba(36,36,44,.97)", border: "1px solid #3a3a44", opacity: auf, translate: `0 ${(1 - auf) * 40}px`, padding: 34, fontFamily: schrift.text, color: farbe.text, boxShadow: "0 30px 80px rgba(0,0,0,.6)" }}>
      <div style={{ height: 64, borderRadius: 32, border: `2px solid ${farbe.akzent}`, display: "flex", alignItems: "center", padding: "0 26px", fontSize: 30, gap: 4 }}>
        {suchtext.slice(0, zeichen)}
        <span style={{ width: 3, height: 34, backgroundColor: farbe.text, opacity: Math.floor(frame / 15) % 2 }} />
      </div>
      {zeigeErgebnis && (
        <div style={{ marginTop: 34 }}>
          <div style={{ fontSize: 22, color: farbe.leise, marginBottom: 14 }}>Höchste Übereinstimmung</div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, padding: 22, borderRadius: 10, backgroundColor: "#33333d" }}>
            <div style={{ width: 64, height: 64, borderRadius: 10, backgroundColor: "#012456", display: "grid", placeItems: "center", color: "#fff", fontFamily: schrift.kopf, fontWeight: 800, fontSize: 28 }}>&gt;_</div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 500 }}>{ergebnis}</div>
              <div style={{ fontSize: 22, color: farbe.leise }}>{untertitel}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Programmfenster mit Titelleiste
export const Fenster: React.FC<{ readonly titel: string; readonly x: number; readonly y: number; readonly b: number; readonly h: number; readonly ab?: number; readonly hell?: boolean; readonly children?: React.ReactNode }> = ({ titel, x, y, b, h, ab = 0, hell = false, children }) => {
  const frame = useCurrentFrame();
  if (frame < ab) return null;
  const auf = interpolate(frame, [ab, ab + 10], [0, 1], klemmen);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: b, height: h, borderRadius: 12, overflow: "hidden", backgroundColor: hell ? "#f3f3f5" : "#16161b", border: "1px solid #3a3a44", boxShadow: "0 30px 80px rgba(0,0,0,.55)", opacity: auf, scale: `${0.96 + auf * 0.04}`, fontFamily: schrift.text, color: hell ? "#1a1a1f" : farbe.text }}>
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", backgroundColor: hell ? "#e4e4e9" : "#1e1e24", fontSize: 21, color: hell ? "#333" : farbe.leise }}>
        {titel}
        <span style={{ letterSpacing: 18 }}>– ▢ ✕</span>
      </div>
      <div style={{ position: "relative", height: h - 52 }}>{children}</div>
    </div>
  );
};

// Download-Hinweis oben rechts im Browser
export const Download: React.FC<{ readonly ab: number; readonly datei: string }> = ({ ab, datei }) => {
  const frame = useCurrentFrame();
  if (frame < ab) return null;
  const auf = interpolate(frame, [ab, ab + 10], [0, 1], klemmen);
  const fortschritt = interpolate(frame, [ab + 6, ab + 50], [0, 1], klemmen);
  return (
    <div style={{ position: "absolute", right: 120, top: 130, width: 520, padding: 26, borderRadius: 12, backgroundColor: "#24242c", border: "1px solid #3a3a44", boxShadow: "0 20px 60px rgba(0,0,0,.6)", opacity: auf, fontFamily: schrift.text, color: farbe.text, zIndex: 5 }}>
      <div style={{ fontSize: 22, color: farbe.leise }}>Downloads</div>
      <div style={{ marginTop: 12, fontSize: 28, fontWeight: 500 }}>{datei}</div>
      <div style={{ marginTop: 16, height: 8, borderRadius: 4, backgroundColor: "#3a3a44" }}>
        <div style={{ width: `${fortschritt * 100}%`, height: 8, borderRadius: 4, backgroundColor: fortschritt >= 1 ? "#8fe3a6" : farbe.akzentHell }} />
      </div>
      <div style={{ marginTop: 10, fontSize: 20, color: farbe.leise }}>{fortschritt >= 1 ? "Fertig · Datei öffnen" : "Wird heruntergeladen …"}</div>
    </div>
  );
};

// Installationsassistent: blättert durch Seiten, jeweils mit Klick auf „Weiter“
export const Assistent: React.FC<{ readonly titel: string; readonly ab: number; readonly seiten: string[]; readonly proSeite: number }> = ({ titel, ab, seiten, proSeite }) => {
  const frame = useCurrentFrame();
  if (frame < ab) return null;
  const i = Math.min(seiten.length - 1, Math.floor((frame - ab) / proSeite));
  const letzte = i === seiten.length - 1;
  const balken = letzte ? 1 : interpolate(frame - ab - i * proSeite, [0, proSeite], [0, 1], klemmen);
  const installiert = seiten[i].startsWith("Installieren");
  return (
    <Fenster titel={titel} x={460} y={170} b={1000} h={700} ab={ab} hell>
      <div style={{ padding: "40px 50px", fontSize: 30 }}>
        <div style={{ fontWeight: 500, fontSize: 36 }}>{seiten[i]}</div>
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
          {[0, 1, 2, 3].map((z) => (
            <div key={z} style={{ height: 18, width: `${90 - z * 14}%`, borderRadius: 9, backgroundColor: "#d6d6dc" }} />
          ))}
        </div>
        {installiert && (
          <div style={{ marginTop: 50, height: 22, borderRadius: 11, backgroundColor: "#d6d6dc" }}>
            <div style={{ width: `${balken * 100}%`, height: 22, borderRadius: 11, backgroundColor: "#2f7d4a" }} />
          </div>
        )}
      </div>
      <div style={{ position: "absolute", right: 40, bottom: 34, display: "flex", gap: 16 }}>
        <div style={{ padding: "14px 36px", borderRadius: 8, border: "2px solid #b9b9c2", fontSize: 26, color: "#555" }}>Abbrechen</div>
        <div style={{ padding: "14px 36px", borderRadius: 8, backgroundColor: "#0b5cd5", color: "#fff", fontSize: 26 }}>{letzte ? "Fertigstellen" : "Weiter"}</div>
      </div>
    </Fenster>
  );
};

// Unkenntliche Daten (E-Mail, Karte): graue, weichgezeichnete Platzhalter
export const Verdeckt: React.FC<{ readonly breite: number; readonly hell?: boolean }> = ({ breite, hell = false }) => (
  <span style={{ display: "inline-block", width: breite, height: "0.9em", borderRadius: 6, translate: "0 0.12em", backgroundColor: hell ? "#b9b9c2" : "#4a4a55", filter: "blur(3px)" }} />
);
