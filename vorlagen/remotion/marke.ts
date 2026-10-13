// Markenwerte des Kanals. In Phase 1 mit den echten Farben und Schriften der Person füllen
// (von der Website oder aus dem Logo messen, nicht schätzen). Diese Werte sind ein neutraler Standard.
import { loadFont as ladeKopf } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as ladeText } from "@remotion/google-fonts/Inter";

export const schrift = {
  kopf: ladeKopf("normal", { weights: ["700", "800"], subsets: ["latin"] }).fontFamily,
  text: ladeText("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily,
};

export const farbe = {
  nacht: "#111318", // Grund
  flaeche: "#1b1e26", // Karten, Platzhalter
  text: "#f2f3f5",
  leise: "#a9adb8",
  linie: "#343844",
  akzent: "#3b82f6", // Signalfarbe (Haken, Markierungen, Mauszeiger-Klick)
  akzentHell: "#7aa7ff", // Akzent für Text auf dunklem Grund
  warnung: "#e5484d", // Warnschilder, Fehler
  weiss: "#ffffff",
  tinte: "#111318",
};

// Weiche, ruhige Bewegung
export const sanft = [0.16, 1, 0.3, 1] as const;

// Kanal-Angaben für Einstieg, Abschluss und Thumbnails
export const kanal = {
  name: "Mein Kanal",
  satz: "Erklärt, Schritt für Schritt.",
  handle: "@meinkanal",
  website: "meine-seite.de",
};
