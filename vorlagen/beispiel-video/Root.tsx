// Beispiel für src/Root.tsx: Gesamtvideo, Kanal-Einstieg, Thumbnails und jede Szene einzeln
// (einzeln, damit Standbilder pro Szene gerendert werden können).
import { Composition, Folder, Still } from "remotion";
import { EINSTIEG_SEKUNDEN, KanalEinstieg } from "./bausteine/KanalEinstieg";
import { szenenLaenge, type Stimme } from "./bausteine/Szene";
import * as S from "./videos/beispiel/Szenen";
import { BeispielVideo, gesamtLaenge } from "./videos/beispiel/Video";
import { Vorschaubild } from "./videos/beispiel/Vorschaubild";

const FPS = 30;
const laenge = (i: number) => szenenLaenge(S.STIMMEN[i] as Stimme, FPS);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Beispiel-Video" component={BeispielVideo} durationInFrames={gesamtLaenge(FPS)} fps={FPS} width={1920} height={1080} />
    <Folder name="Kanal">
      <Composition id="Kanal-Einstieg" component={KanalEinstieg} durationInFrames={Math.round(EINSTIEG_SEKUNDEN * FPS)} fps={FPS} width={1920} height={1080} />
    </Folder>
    <Folder name="Vorschaubilder">
      <Still id="Vorschau-A" component={Vorschaubild} width={1280} height={720} defaultProps={{ variante: "A" }} />
      <Still id="Vorschau-B" component={Vorschaubild} width={1280} height={720} defaultProps={{ variante: "B" }} />
    </Folder>
    <Folder name="Szenen">
      <Composition id="S01-Aufhaenger" component={S.S01Aufhaenger} durationInFrames={laenge(0)} fps={FPS} width={1920} height={1080} />
      <Composition id="S02-Oeffnen" component={S.S02Oeffnen} durationInFrames={laenge(1)} fps={FPS} width={1920} height={1080} />
      <Composition id="S03-Anlegen" component={S.S03Anlegen} durationInFrames={laenge(2)} fps={FPS} width={1920} height={1080} />
      <Composition id="S04-Wechseln" component={S.S04Wechseln} durationInFrames={laenge(3)} fps={FPS} width={1920} height={1080} />
      <Composition id="S05-Stolperstein" component={S.S05Stolperstein} durationInFrames={laenge(4)} fps={FPS} width={1920} height={1080} />
      <Composition id="S06-Anzeigen" component={S.S06Anzeigen} durationInFrames={laenge(5)} fps={FPS} width={1920} height={1080} />
      <Composition id="S07-Route" component={S.S07Route} durationInFrames={laenge(6)} fps={FPS} width={1920} height={1080} />
      <Composition id="S08-Abschluss" component={S.S08Abschluss} durationInFrames={laenge(7)} fps={FPS} width={1920} height={1080} />
    </Folder>
  </>
);
