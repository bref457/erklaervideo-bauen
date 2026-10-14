// Beispielvideo komplett: Szenen nacheinander, Kanal-Einstieg nach dem Aufhänger, Kanal-Abspann am Schluss.
// Die Länge jeder Szene richtet sich nach der Stimme.
import { Series, useVideoConfig } from "remotion";
import { ABSPANN_SEKUNDEN, KanalAbspann } from "../../bausteine/KanalAbspann";
import { EINSTIEG_SEKUNDEN, KanalEinstieg } from "../../bausteine/KanalEinstieg";
import { szenenLaenge } from "../../bausteine/Szene";
import * as S from "./Szenen";

const [l01, l02, l03, l04, l05, l06, l07, l08] = S.STIMMEN;

export const gesamtLaenge = (fps: number) => Math.round(EINSTIEG_SEKUNDEN * fps) + ABSPANN_SEKUNDEN * fps + S.STIMMEN.reduce((summe, st) => summe + szenenLaenge(st, fps), 0);

export const BeispielVideo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence name="1 Aufhänger" durationInFrames={szenenLaenge(l01, fps)} premountFor={fps}><S.S01Aufhaenger /></Series.Sequence>
      <Series.Sequence name="Kanal-Einstieg" durationInFrames={Math.round(EINSTIEG_SEKUNDEN * fps)} premountFor={fps}><KanalEinstieg /></Series.Sequence>
      <Series.Sequence name="2 PowerShell öffnen" durationInFrames={szenenLaenge(l02, fps)} premountFor={fps}><S.S02Oeffnen /></Series.Sequence>
      <Series.Sequence name="3 Ordner anlegen" durationInFrames={szenenLaenge(l03, fps)} premountFor={fps}><S.S03Anlegen /></Series.Sequence>
      <Series.Sequence name="4 Hineinwechseln" durationInFrames={szenenLaenge(l04, fps)} premountFor={fps}><S.S04Wechseln /></Series.Sequence>
      <Series.Sequence name="5 Stolperstein" durationInFrames={szenenLaenge(l05, fps)} premountFor={fps}><S.S05Stolperstein /></Series.Sequence>
      <Series.Sequence name="6 Inhalt anzeigen" durationInFrames={szenenLaenge(l06, fps)} premountFor={fps}><S.S06Anzeigen /></Series.Sequence>
      <Series.Sequence name="7 Zusammenfassung" durationInFrames={szenenLaenge(l07, fps)} premountFor={fps}><S.S07Route /></Series.Sequence>
      <Series.Sequence name="8 Abschluss" durationInFrames={szenenLaenge(l08, fps)} premountFor={fps}><S.S08Abschluss /></Series.Sequence>
      <Series.Sequence name="Kanal-Abspann" durationInFrames={ABSPANN_SEKUNDEN * fps} premountFor={fps}><KanalAbspann /></Series.Sequence>
    </Series>
  );
};
