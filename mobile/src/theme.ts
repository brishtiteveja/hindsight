/**
 * Design tokens mirrored from the web dashboard (web/style.css) so the app and
 * the site read as one product. Warm "ink and paper": near-black brown ground,
 * cream text, amber as the single accent.
 */
export const C = {
  ink: "#0c0b09",
  ink2: "#141210",
  ink3: "#1d1a16",
  line: "#2b2620",
  paper: "#efe6d4",
  paperDim: "#b8ad97",
  faint: "#7d745f",
  amber: "#f0b243",
  amber2: "#ffd98a",
  play: "#ff4133",
  good: "#7fd6a4",
  bad: "#ff7b66",
  mix: "#c9a7f5",
} as const;

export const S = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const R = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

/** Type ramp. The web uses a serif display face; system serif is close enough
 *  on both platforms and saves shipping a font binary in the bundle. */
export const F = {
  display: { fontSize: 26, fontWeight: "700", color: C.paper, letterSpacing: -0.4 },
  title: { fontSize: 19, fontWeight: "700", color: C.paper, letterSpacing: -0.2 },
  heading: { fontSize: 15, fontWeight: "700", color: C.paper },
  body: { fontSize: 14, color: C.paperDim, lineHeight: 20 },
  small: { fontSize: 12, color: C.faint },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: C.faint,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
} as const;

/** Verdict colouring shared by pre-flight and the contradiction views. */
export function verdictColor(v: string): string {
  switch ((v || "").toLowerCase()) {
    case "contradiction":
      return C.bad;
    case "consistent":
      return C.good;
    case "drift":
      return C.mix;
    case "new":
      return C.amber;
    default:
      return C.faint;
  }
}

/** What each verdict actually means to a creator about to hit publish. */
export const VERDICT_COPY: Record<string, string> = {
  contradiction: "You've said the opposite before",
  drift: "Same topic, you've moved position",
  consistent: "Matches what you've said",
  unrelated: "Nothing comparable in your archive",
  new: "New ground for this channel",
};
