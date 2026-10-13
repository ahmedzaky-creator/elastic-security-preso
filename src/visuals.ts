import type { Scene, VisualKind, VisualOptions } from "./types";

// Original diagrams. All events and UI results are fictional; no product connection.
const C = {
  ink: "#111820",
  muted: "#677586",
  line: "#C9D3DE",
  blue: "#0B64DD",
  blueLight: "#EAF3FF",
  teal: "#02BCB7",
  tealLight: "#E3FAF6",
  pink: "#F04E98",
  pinkLight: "#FDEBF4",
  gray: "#F4F7FA",
  amber: "#B0740B",
};
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const txt = (
  x: number,
  y: number,
  value: string,
  size = 14,
  color = C.ink,
  cls = "",
  anchor = "start",
) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}" class="${cls}">${esc(value)}</text>`;
const mono = (
  x: number,
  y: number,
  value: string,
  size = 12,
  color = C.muted,
  anchor = "start",
) => txt(x, y, value, size, color, "v-mono", anchor);
const rect = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill = "white",
  stroke = C.line,
  r = 8,
  cls = "",
) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" class="${cls}"/>`;
const line = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = C.line,
  width = 1.4,
  cls = "",
) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" class="${cls}"/>`;
const path = (
  d: string,
  stroke = C.line,
  width = 1.4,
  fill = "none",
  cls = "",
) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" class="${cls}"/>`;
const circle = (
  x: number,
  y: number,
  r: number,
  fill = "white",
  stroke = C.line,
  cls = "",
) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" class="${cls}"/>`;
const group = (body: string, delay = 0, cls = "") =>
  `<g class="reveal ${cls}" style="--delay:${delay}ms">${body}</g>`;
const pill = (
  x: number,
  y: number,
  label: string,
  color = C.blue,
  fill = C.blueLight,
  width?: number,
) => {
  const w = width || label.length * 7.1 + 24;
  return (
    rect(x, y, w, 24, fill, "none", 12) + mono(x + 12, y + 16, label, 11, color)
  );
};
const arrow = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = C.blue,
  cls = "",
) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const b = 7;
  return (
    line(x1, y1, x2, y2, color, 1.6, cls) +
    `<path d="M${x2 - b * Math.cos(a - 0.45)},${y2 - b * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - b * Math.cos(a + 0.45)},${y2 - b * Math.sin(a + 0.45)}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>`
  );
};
const dotLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = C.line,
) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.4" stroke-dasharray="3 5"/>`;

type IconKind =
  | "search"
  | "database"
  | "shield"
  | "host"
  | "user"
  | "cloud"
  | "link"
  | "spark"
  | "check"
  | "workflow"
  | "clock"
  | "document"
  | "layers"
  | "lock"
  | "network"
  | "terminal";
function icon(
  kind: IconKind,
  x: number,
  y: number,
  color = C.blue,
  scale = 1,
): string {
  const ds: Record<IconKind, string> = {
    search: "M17 17L23 23 M19 11A8 8 0 1 1 3 11A8 8 0 1 1 19 11",
    database:
      "M3 5C3 0 23 0 23 5C23 10 3 10 3 5Z M3 5V20C3 25 23 25 23 20V5 M3 12C3 17 23 17 23 12",
    shield:
      "M13 2L23 6V13C23 19 18 24 13 26C8 24 3 19 3 13V6Z M8 13L12 17L19 10",
    host: "M3 3H24V18H3Z M8 24H20 M14 18V24",
    user: "M19 7A6 6 0 1 1 7 7A6 6 0 1 1 19 7 M3 25V21C3 12 23 12 23 21V25",
    cloud: "M6 22C-1 22-1 11 6 11C6 0 23 0 23 11C31 11 31 22 23 22Z",
    link: "M11 17L17 11 M9 19L6 22C1 27-4 20 1 16L8 9C11 6 15 7 16 10 M17 7L20 4C25-1 31 6 26 10L19 17C16 20 12 19 11 16",
    spark: "M13 1L16 10L25 13L16 16L13 25L10 16L1 13L10 10Z",
    check: "M4 14L10 20L23 6",
    workflow:
      "M2 2H10V10H2Z M18 18H26V26H18Z M2 18H10V26H2Z M6 10V18 M10 6H22V18",
    clock: "M25 13A12 12 0 1 1 1 13A12 12 0 1 1 25 13 M13 5V13L19 17",
    document: "M4 1H17L24 8V26H4Z M17 1V8H24 M9 13H19 M9 18H19 M9 23H16",
    layers: "M1 8L13 1L25 8L13 15Z M1 14L13 21L25 14 M1 20L13 27L25 20",
    lock: "M6 12V8C6-1 22-1 22 8V12 M3 12H25V27H3Z M14 17V22",
    network:
      "M10 1H18V9H10Z M1 19H9V27H1Z M19 19H27V27H19Z M14 9V14 M5 19V14H23V19",
    terminal: "M1 2H27V26H1Z M6 9L11 14L6 19 M14 19H22",
  };
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${ds[kind]}"/></g>`;
}
const node = (
  x: number,
  y: number,
  kind: IconKind,
  label: string,
  sub = "",
  color = C.blue,
  w = 150,
  h = 74,
) =>
  rect(x, y, w, h, "white", C.line, 9) +
  icon(kind, x + 14, y + 15, color, 0.85) +
  txt(x + 48, y + 32, label, 14, C.ink, "v-bold") +
  (sub ? mono(x + 48, y + 52, sub, 10.5) : "");
const number = (x: number, y: number, n: string, color = C.blue) =>
  circle(x, y, 15, "white", color) + mono(x, y + 4, n, 11, color, "middle");

// A 2:1 isometric slab/cube, with a consistent upper-left light source.
function slab(
  x: number,
  y: number,
  w: number,
  d: number,
  h: number,
  color = C.blue,
  label = "",
): string {
  const a = w / 2;
  const b = d / 2;
  return `<g class="v-iso"><polygon points="${x},${y} ${x + a},${y + a / 2} ${x + a - b},${y + (a + b) / 2} ${x - b},${y + b / 2}" fill="${color === C.blue ? "#F2F7FE" : color === C.teal ? "#ECFBF8" : "#FFF4F9"}" stroke="${C.ink}" stroke-width="1.05"/><polygon points="${x - b},${y + b / 2} ${x + a - b},${y + (a + b) / 2} ${x + a - b},${y + (a + b) / 2 + h} ${x - b},${y + b / 2 + h}" fill="${color}" stroke="${C.ink}" stroke-width="1.05" opacity=".88"/><polygon points="${x + a},${y + a / 2} ${x + a - b},${y + (a + b) / 2} ${x + a - b},${y + (a + b) / 2 + h} ${x + a},${y + a / 2 + h}" fill="${color}" stroke="${C.ink}" stroke-width="1.05" opacity=".58"/>${label ? txt(x + (a - b) / 2, y + (a + b) / 4 + 5, label, 14, C.ink, "v-bold", "middle") : ""}</g>`;
}
function cube(
  x: number,
  y: number,
  size: number,
  color = C.blue,
  glyph?: IconKind,
): string {
  return (
    slab(x, y, size, size, size * 0.48, color) +
    (glyph ? icon(glyph, x - 11, y + size * 0.22 - 8, C.ink, 0.78) : "")
  );
}
const rail = (
  items: { label: string; time: string; color?: string }[],
  y = 174,
  x = 55,
  gap = 151,
) =>
  line(x, y, x + (items.length - 1) * gap, y, C.line, 2) +
  items
    .map((v, i) =>
      group(
        circle(x + i * gap, y, 7, v.color || C.blue, "white") +
          mono(x + i * gap, y - 24, v.time, 11, C.muted, "middle") +
          txt(x + i * gap, y + 30, v.label, 13, C.ink, "", "middle"),
        i * 100,
      ),
    )
    .join("");
const panelHeader = (
  x: number,
  y: number,
  w: number,
  title: string,
  tag = "",
) =>
  rect(x, y, w, 34, C.gray, C.line, 8) +
  rect(x, y + 22, w, 12, C.gray, "none", 0) +
  txt(x + 14, y + 22, title, 12, C.ink, "v-bold") +
  (tag ? mono(x + w - 14, y + 22, tag, 10, C.muted, "end") : "");
const row = (
  x: number,
  y: number,
  w: number,
  key: string,
  value: string,
  color = C.ink,
) =>
  mono(x, y, key, 11) +
  txt(x + 126, y, value, 12, color) +
  line(x, y + 12, x + w, y + 12, "#E6ECF2", 1);
const caption = (x: number, y: number, s: string, color = C.muted) =>
  mono(x, y, s, 11, color);

function hero(): string {
  return (
    dotLine(87, 305, 632, 305) +
    group(slab(324, 192, 310, 210, 19, C.blue), 0) +
    group(slab(324, 160, 310, 210, 16, C.teal, "ELASTIC SECURITY"), 90) +
    group(
      cube(235, 90, 88, C.blue, "database") +
        mono(235, 72, "EVIDENCE", 12, C.blue, "middle"),
      180,
    ) +
    group(
      cube(349, 138, 88, C.teal, "search") +
        mono(349, 117, "UNDERSTAND", 12, C.teal, "middle"),
      300,
    ) +
    group(
      cube(456, 76, 88, C.pink, "shield") +
        mono(456, 58, "ACT", 12, C.pink, "middle"),
      420,
    ) +
    path(
      "M149 192L149 161L205 133 M462 167L538 206L579 183",
      C.blue,
      1.6,
      "none",
      "v-flow",
    ) +
    circle(149, 196, 4, C.blue, C.blue) +
    circle(580, 182, 4, C.pink, C.pink) +
    path("M219 303L152 338H74", C.line) +
    mono(28, 358, "SEARCH + CONTEXT", 11, C.blue) +
    mono(
      390,
      378,
      "ONE INVESTIGATION. ACROSS BOUNDARIES.",
      11,
      C.muted,
      "middle",
    )
  );
}
function promise(): string {
  const labels = [
    "Connect the evidence",
    "Verify the narrative",
    "Control the response",
  ];
  return (
    labels
      .map((v, i) =>
        group(
          number(120 + i * 240, 70, `${i + 1}`) +
            icon(
              (["database", "search", "shield"] as IconKind[])[i],
              105 + i * 240,
              118,
              [C.blue, C.teal, C.pink][i],
              1.1,
            ) +
            txt(120 + i * 240, 181, v, 15.5, C.ink, "v-bold", "middle") +
            line(55 + i * 240, 211, 184 + i * 240, 211) +
            mono(
              120 + i * 240,
              240,
              [
                "All relevant signals",
                "Source-linked reasoning",
                "Human decision points",
              ][i],
              10.5,
              C.muted,
              "middle",
            ),
          i * 150,
        ),
      )
      .join("") +
    rect(145, 292, 432, 47, C.gray, "none", 8) +
    icon("document", 163, 303, C.muted, 0.8) +
    txt(203, 321, "One fictional incident. End to end.", 14)
  );
}
function platform(): string {
  return (
    group(slab(310, 199, 340, 230, 18, C.blue), 0) +
    group(slab(310, 152, 340, 230, 18, C.teal), 120) +
    group(slab(310, 105, 340, 230, 18, C.blue, "ELASTIC SECURITY"), 240) +
    [0, 1, 2]
      .map((i) =>
        group(
          cube(
            238 + i * 88,
            38 + [0, 28, 4][i],
            48,
            [C.blue, C.teal, C.pink][i],
            (["database", "search", "shield"] as IconKind[])[i],
          ),
          320 + i * 90,
        ),
      )
      .join("") +
    mono(26, 23, "THE SEARCH AI FOUNDATION", 11, C.blue) +
    path("M199 235L130 190H27", C.line) +
    txt(26, 176, "Search your evidence", 12.5) +
    line(481, 194, 513, 194) +
    mono(527, 198, "SECURITY", 11, C.blue) +
    line(481, 242, 513, 242) +
    mono(527, 246, "SEARCH · ANALYTICS · AI", 10.5, C.teal) +
    line(481, 288, 513, 288) +
    mono(527, 292, "ELASTICSEARCH", 11, C.blue) +
    mono(
      360,
      379,
      "SAME DATA FOUNDATION · DIFFERENT SECURITY LENSES",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function fragmented(): string {
  const nodes: [number, number, IconKind, string, string][] = [
    [20, 30, "user", "Directory", "09:12 / identity"],
    [470, 14, "host", "Windows", "09:17 / process"],
    [64, 244, "terminal", "Linux", "09:31 / session"],
    [463, 246, "network", "Network", "09:36 / flow"],
  ];
  return (
    nodes
      .map((n, i) =>
        group(
          node(
            n[0],
            n[1],
            n[2],
            n[3],
            n[4],
            [C.blue, C.pink, C.teal, C.blue][i],
            217,
          ),
          i * 100,
        ),
      )
      .join("") +
    dotLine(234, 69, 478, 52) +
    dotLine(284, 283, 470, 283) +
    dotLine(129, 111, 181, 240) +
    dotLine(575, 93, 575, 245) +
    circle(361, 172, 48, "white", C.line) +
    txt(361, 181, "?", 40, C.ink, "", "middle") +
    mono(361, 241, "FOUR TOOLS. ONE ATTACK.", 11, C.muted, "middle")
  );
}
function pillars(): string {
  const data: [IconKind, string, string, string][] = [
    ["database", "SEE", "the whole attack", C.blue],
    ["search", "UNDERSTAND", "what matters", C.teal],
    ["shield", "ACT", "with control", C.pink],
  ];
  return (
    data
      .map((d, i) =>
        group(
          cube(120 + i * 240, 61, 106, d[3], d[0]) +
            mono(120 + i * 240, 198, d[1], 12, d[3], "middle") +
            txt(120 + i * 240, 228, d[2], 20, C.ink, "v-bold", "middle") +
            mono(
              120 + i * 240,
              268,
              [
                "Breadth + history",
                "Context + reasoning",
                "Approval + evidence",
              ][i],
              11,
              C.muted,
              "middle",
            ),
          i * 180,
        ),
      )
      .join("") +
    line(67, 316, 653, 316) +
    mono(360, 344, "A CONNECTED OPERATING MODEL", 11, C.muted, "middle")
  );
}
function sources(): string {
  const n: [number, number, IconKind, string, string][] = [
    [16, 28, "user", "Directory", "AD-DC-01"],
    [16, 131, "host", "Endpoints", "Windows + Linux"],
    [16, 234, "network", "Network + apps", "Flow · DNS · service"],
  ];
  return (
    rect(308, 31, 380, 305, C.gray, C.line, 16) +
    mono(327, 55, "YOUR DATA CENTER", 11, C.muted) +
    n
      .map((v, i) =>
        group(
          node(...v, C.blue, 221) +
            path(
              `M237 ${v[1] + 37}H274V${172}H358`,
              [C.blue, C.teal, C.pink][i],
              1.5,
              "none",
              "v-flow",
            ),
          i * 130,
        ),
      )
      .join("") +
    group(
      cube(467, 106, 157, C.blue, "database") +
        txt(467, 285, "Elastic Security", 20, C.ink, "v-bold", "middle") +
        mono(467, 310, "Self-managed example", 11, C.muted, "middle"),
      390,
    ) +
    mono(29, 365, "COLLECT → NORMALIZE → SEARCH", 11, C.blue)
  );
}
function pipeline(): string {
  return (
    group(
      node(20, 47, "document", "Raw events", "Source-specific", C.blue, 196),
      0,
    ) +
    arrow(216, 84, 278, 84) +
    group(
      node(278, 47, "layers", "Normalize", "ECS fields", C.teal, 179),
      170,
    ) +
    arrow(457, 84, 520, 84, C.teal) +
    group(
      node(520, 47, "link", "Enrich", "Identity + asset", C.pink, 179),
      330,
    ) +
    group(
      rect(21, 167, 678, 169, "white", C.line, 10) +
        panelHeader(21, 167, 678, "ONE SEARCHABLE EVENT", "illustrative") +
        mono(46, 234, "user.name", 12, C.blue) +
        mono(216, 234, "svc-backup", 12, C.ink) +
        mono(46, 269, "host.name", 12, C.blue) +
        mono(216, 269, "WIN-FIN-07", 12, C.ink) +
        mono(404, 234, "event.category", 12, C.blue) +
        mono(568, 234, "process", 12, C.ink) +
        mono(404, 269, "asset.role", 12, C.blue) +
        mono(568, 269, "finance", 12, C.ink) +
        line(46, 295, 674, 295) +
        txt(
          46,
          318,
          "Consistent fields make cross-source questions possible.",
          13,
        ),
      490,
    )
  );
}
function history(): string {
  return (
    line(72, 302, 665, 302, C.ink) +
    arrow(75, 301, 673, 301, C.ink) +
    [0, 1, 2]
      .map((i) =>
        group(
          slab(
            132 + i * 222,
            73,
            146,
            100,
            [117, 86, 54][i],
            [C.blue, C.teal, C.pink][i],
          ) +
            mono(
              155 + i * 222,
              277,
              ["HOT", "WARM / COLD", "FROZEN"][i],
              12,
              [C.blue, C.teal, C.pink][i],
              "middle",
            ) +
            txt(
              155 + i * 222,
              337,
              [
                "Active investigations",
                "Recent context",
                "Historical evidence",
              ][i],
              13,
              C.ink,
              "",
              "middle",
            ),
          i * 170,
        ),
      )
      .join("") +
    path("M96 56Q348 0 615 50", C.blue, 1.8, "none", "v-flow") +
    icon("search", 340, 15, C.blue, 0.9) +
    mono(
      360,
      373,
      "RETENTION BY VALUE. SEARCH ACROSS TIERS.",
      11,
      C.muted,
      "middle",
    )
  );
}
function layers(): string {
  const ds = [
    ["Rules", "Known patterns", C.blue],
    ["Behavioral ML", "Unusual activity", C.teal],
    ["Endpoint", "Host prevention", C.pink],
  ];
  return (
    ds
      .map((d, i) =>
        group(
          slab(307, 197 - i * 61, 326, 176, 16, d[2], i === 2 ? d[0] : "") +
            line(471, 276 - i * 61, 507, 276 - i * 61, C.line) +
            txt(520, 271 - i * 61, d[0], 14, C.ink, "v-bold") +
            mono(520, 293 - i * 61, d[1], 10.5),
          (2 - i) * 160,
        ),
      )
      .join("") +
    path("M145 104L145 255L221 303", C.blue, 1.7, "none", "v-flow") +
    mono(27, 33, "COMPLEMENTARY METHODS", 11, C.blue) +
    icon("shield", 130, 60, C.blue, 1.1) +
    txt(
      352,
      369,
      "Coverage improves when methods work together.",
      14,
      C.ink,
      "",
      "middle",
    )
  );
}
function rules(): string {
  return (
    group(
      rect(23, 21, 406, 298, "white", C.line, 10) +
        panelHeader(23, 21, 406, "INSPECT THE LOGIC", "rule example") +
        mono(44, 89, "process where", 14, C.blue) +
        mono(44, 121, '  host.os.type == "windows"', 13, C.ink) +
        mono(44, 153, "  and process.name ==", 13, C.ink) +
        mono(64, 181, '  "powershell.exe"', 13, C.blue) +
        mono(44, 213, "  and command_line matches", 13, C.ink) +
        mono(64, 241, '  "* -EncodedCommand *"', 13, C.pink) +
        line(43, 268, 408, 268) +
        mono(44, 294, "Tune · test · version · explain", 11),
      0,
    ) +
    group(
      pill(478, 38, "MITRE ATT&CK", C.blue, C.blueLight, 169) +
        txt(478, 97, "Execution", 18, C.ink, "v-bold") +
        mono(478, 123, "T1059.001", 12, C.blue) +
        txt(478, 148, "PowerShell", 14) +
        rect(477, 181, 201, 111, C.gray, "none", 8) +
        txt(493, 207, "Detection content", 14, C.ink, "v-bold") +
        txt(493, 235, "is publicly inspectable.", 13) +
        mono(493, 270, "Coverage ≠ completeness", 10.5),
      210,
    ) +
    arrow(429, 149, 465, 149) +
    mono(
      25,
      359,
      "SYNTHETIC LOGIC EXCERPT · NOT A DEPLOYABLE RULE",
      10.5,
      C.muted,
    )
  );
}
function anomaly(): string {
  const pts =
    "45,259 75,251 105,254 135,248 165,252 195,246 225,248 255,235 285,239 315,237 345,224 375,231 405,229 435,219 465,215 495,111 525,77 555,177 585,222 615,231 657,225";
  return (
    rect(30, 66, 653, 264, "white", C.line, 10) +
    mono(48, 92, "svc-backup · authentication pattern", 12, C.ink) +
    [0, 1, 2, 3]
      .map((i) => line(47, 126 + i * 51, 664, 126 + i * 51, "#E7EDF3", 1))
      .join("") +
    path(
      "M45 268L105 263L165 262L225 259L285 252L345 247L405 248L465 237L525 243L585 247L657 246L657 212L585 210L525 204L465 209L405 217L345 213L285 217L225 220L165 227L105 228L45 236Z",
      "none",
      0,
      C.blueLight,
    ) +
    `<polyline points="${pts}" fill="none" stroke="${C.blue}" stroke-width="2.5" class="v-draw"/>` +
    group(
      circle(525, 77, 7, C.pink, "white") +
        pill(446, 16, "Unusual for this entity", C.pink, C.pinkLight, 216) +
        line(525, 46, 525, 68, C.pink),
      270,
    ) +
    mono(48, 316, "earlier activity", 10) +
    mono(658, 316, "incident window", 10, C.muted, "end") +
    mono(
      357,
      365,
      "A DEVIATION IS A LEAD. VERIFY ITS CONTEXT.",
      11,
      C.muted,
      "middle",
    )
  );
}
function endpoint(): string {
  return (
    group(cube(288, 130, 224, C.blue, "host"), 0) +
    group(icon("shield", 403, 62, C.teal, 3.6), 140) +
    txt(293, 315, "WIN-FIN-07", 17, C.ink, "v-bold", "middle") +
    group(
      pill(26, 65, "PREVENT", C.teal, C.tealLight, 128) +
        txt(26, 117, "Malicious behavior", 14) +
        txt(26, 140, "Endpoint policy", 14) +
        path("M154 78H214L253 116", C.teal, 1.5, "none", "v-flow"),
      240,
    ) +
    group(
      pill(516, 255, "OBSERVE", C.blue, C.blueLight, 126) +
        txt(517, 311, "Process + file + network", 13) +
        path("M360 267H485L515 269", C.blue, 1.5, "none", "v-flow"),
      340,
    ) +
    mono(
      358,
      365,
      "OS, POLICY, ENTITLEMENT, AND PRIVILEGES APPLY",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function correlation(): string {
  const ds = [
    { label: "Directory login", time: "09:12", color: C.blue },
    { label: "PowerShell", time: "09:17", color: C.pink },
    { label: "SSH activity", time: "09:24", color: C.teal },
    { label: "Outbound flow", time: "09:36", color: C.blue },
  ];
  return (
    rail(ds, 172, 77, 185) +
    ds
      .map((_, i) =>
        mono(
          77 + i * 185,
          232,
          ["AD-DC-01", "WIN-FIN-07", "LNX-DB-03", "203.0.113.44"][i],
          10.5,
          C.muted,
          "middle",
        ),
      )
      .join("") +
    group(
      rect(181, 31, 359, 57, C.blueLight, "none", 12) +
        icon("user", 203, 44, C.blue, 0.9) +
        txt(249, 66, "svc-backup", 19, C.blue, "v-bold") +
        mono(507, 66, "same identity", 11, C.blue, "end"),
      130,
    ) +
    [77, 262, 447, 632]
      .map((x, i) =>
        path(
          `M360 88V116H${x}V153`,
          [C.blue, C.pink, C.teal, C.blue][i],
          1.2,
          "none",
          "v-flow",
        ),
      )
      .join("") +
    line(46, 292, 675, 292) +
    txt(
      360,
      329,
      "Relationships expose what isolated alerts cannot.",
      15,
      C.ink,
      "",
      "middle",
    )
  );
}

function detectionDemo(o: VisualOptions): string {
  const s = o.settled ? 3 : Math.min(o.step, 3);
  const steps = [
    "Source event",
    "Detection match",
    "Related evidence",
    "Investigation lead",
  ];
  return (
    rect(27, 18, 666, 323, "white", C.line, 10) +
    panelHeader(27, 18, 666, "DETECTION WALKTHROUGH", `${s + 1} / 4`) +
    steps
      .map((v, i) =>
        pill(
          45 + i * 161,
          69,
          v,
          i <= s ? C.blue : C.muted,
          i === s ? C.blueLight : C.gray,
          150,
        ),
      )
      .join("") +
    group(
      rect(45, 114, 307, 202, C.gray, "none", 8) +
        mono(61, 140, "WIN-FIN-07 / 09:17", 11, C.blue) +
        txt(61, 176, "powershell.exe", 20, C.ink, "v-bold") +
        mono(61, 209, "user: svc-backup", 12) +
        mono(61, 238, "-EncodedCommand …", 12, C.pink) +
        line(61, 263, 334, 263) +
        txt(61, 290, "Original event remains inspectable.", 12),
      0,
    ) +
    (s >= 1
      ? group(
          rect(373, 114, 300, 65, C.pinkLight, "none", 8) +
            icon("shield", 389, 133, C.pink, 0.8) +
            txt(428, 142, "Encoded PowerShell", 15, C.ink, "v-bold") +
            mono(428, 164, "Execution · T1059.001", 10.5, C.pink),
          80,
        )
      : "") +
    (s >= 2
      ? group(
          rect(373, 191, 300, 57, C.tealLight, "none", 8) +
            txt(
              389,
              215,
              "Related: unusual directory login",
              13,
              C.ink,
              "v-bold",
            ) +
            mono(389, 236, "svc-backup · AD-DC-01 · 09:12", 10.5),
          160,
        )
      : "") +
    (s >= 3
      ? group(
          icon("check", 382, 276, C.blue, 0.8) +
            txt(
              417,
              294,
              "Open an evidence-led investigation",
              12,
              C.blue,
              "v-bold",
            ),
          250,
        )
      : "") +
    mono(
      360,
      371,
      "ILLUSTRATIVE EVENTS + RESULT",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function entities(): string {
  return (
    group(
      circle(354, 164, 65, C.blueLight, C.blue) +
        icon("user", 334, 125, C.blue, 1.5) +
        txt(354, 195, "svc-backup", 17, C.ink, "v-bold", "middle"),
      0,
    ) +
    [
      [25, 25, "user", "Directory role", "Backup service"],
      [468, 25, "host", "Observed hosts", "Windows + Linux"],
      [25, 253, "shield", "Risk signals", "Rules + anomalies"],
      [468, 253, "clock", "Behavior history", "Expected vs observed"],
    ]
      .map((v, i) =>
        group(
          node(
            Number(v[0]),
            Number(v[1]),
            v[2] as IconKind,
            String(v[3]),
            String(v[4]),
            [C.blue, C.teal, C.pink, C.blue][i],
            222,
          ) +
            line(
              [247, 468, 247, 468][i],
              [63, 63, 290, 290][i],
              [306, 402, 306, 402][i],
              [117, 117, 211, 211][i],
              C.line,
            ),
          130 + i * 90,
        ),
      )
      .join("") +
    mono(
      354,
      368,
      "IDENTITY + ASSET CONTEXT HELP PRIORITIZE",
      11,
      C.muted,
      "middle",
    )
  );
}
function alerts(): string {
  return (
    Array.from({ length: 15 }, (_, i) => {
      const x = 32 + (i % 3) * 165;
      const y = 28 + Math.floor(i / 3) * 60;
      return group(
        rect(x, y, 150, 46, i % 4 === 0 ? C.pinkLight : "white", C.line, 6) +
          circle(x + 15, y + 17, 3, i % 4 === 0 ? C.pink : C.blue, "none") +
          mono(
            x + 28,
            y + 21,
            ["Auth anomaly", "Process alert", "Network event", "Host behavior"][
              i % 4
            ],
            10.3,
          ) +
          line(x + 15, y + 32, x + 115, y + 32, "#D5DEE7"),
        i * 25,
      );
    }).join("") +
    path(
      "M552 42V72 M552 88V118 M552 134V164 M552 180V210 M552 226V256 M552 272V302",
      C.line,
      2,
    ) +
    txt(613, 133, "One", 26, C.ink, "v-bold", "middle") +
    txt(613, 170, "analyst.", 26, C.ink, "v-bold", "middle") +
    mono(613, 216, "Many leads.", 11, C.muted, "middle") +
    mono(
      359,
      366,
      "ALERT VOLUME IS NOT THE SAME AS UNDERSTANDING",
      11,
      C.muted,
      "middle",
    )
  );
}
function discovery(): string {
  return (
    group(
      Array.from(
        { length: 9 },
        (_, i) =>
          rect(
            27 + (i % 3) * 63,
            44 + Math.floor(i / 3) * 65,
            50,
            47,
            i % 3 === 0 ? C.pinkLight : C.blueLight,
            C.line,
            6,
          ) +
          line(
            38 + (i % 3) * 63,
            62 + Math.floor(i / 3) * 65,
            64 + (i % 3) * 63,
            62 + Math.floor(i / 3) * 65,
            i % 3 === 0 ? C.pink : C.blue,
          ),
      ).join("") + mono(106, 270, "SELECTED ALERTS", 10, C.muted, "middle"),
      0,
    ) +
    path(
      "M219 55C268 55 240 150 303 150 M219 120H303 M219 184C268 184 248 150 303 150",
      C.blue,
      1.5,
      "none",
      "v-flow",
    ) +
    group(
      circle(326, 149, 26, C.blueLight, C.blue) +
        icon("spark", 313, 136, C.blue, 1),
      180,
    ) +
    arrow(353, 149, 406, 149, C.blue) +
    group(
      rect(409, 42, 289, 245, "white", C.blue, 12) +
        pill(428, 60, "POTENTIAL ATTACK", C.pink, C.pinkLight, 167) +
        txt(428, 117, "Credential-led intrusion", 18, C.ink, "v-bold") +
        mono(428, 145, "svc-backup · 2 observed hosts", 11) +
        line(428, 165, 679, 165) +
        txt(428, 193, "Authentication → execution", 13) +
        txt(428, 219, "Lateral movement → staging", 13) +
        icon("link", 429, 247, C.blue, 0.7) +
        txt(460, 262, "Inspect supporting alerts", 12, C.blue),
      320,
    ) +
    group(
      rect(223, 317, 387, 41, C.gray, "none", 8) +
        icon("search", 239, 327, C.ink, 0.7) +
        txt(274, 342, "A narrative to verify. Evidence to examine.", 12),
      490,
    )
  );
}
function hypothesis(): string {
  return (
    group(
      rect(205, 26, 313, 86, C.blueLight, "none", 10) +
        mono(222, 49, "WORKING HYPOTHESIS", 10.5, C.blue) +
        txt(222, 78, "Compromised service identity", 17, C.ink, "v-bold") +
        txt(222, 100, "used across two hosts", 14),
      0,
    ) +
    [
      [
        20,
        168,
        C.blue,
        "Identity",
        "Unusual authentication",
        "09:12 · AD-DC-01",
      ],
      [
        255,
        218,
        C.pink,
        "Execution",
        "Encoded PowerShell",
        "09:17 · WIN-FIN-07",
      ],
      [
        490,
        168,
        C.teal,
        "Movement",
        "SSH + archive staging",
        "09:24–31 · LNX-DB-03",
      ],
    ]
      .map((d, i) =>
        group(
          path(
            `M361 113V144H${Number(d[0]) + 108}V${d[1]}`,
            String(d[2]),
            1.4,
            "none",
            "v-flow",
          ) +
            rect(Number(d[0]), Number(d[1]), 213, 108, "white", C.line, 8) +
            mono(
              Number(d[0]) + 15,
              Number(d[1]) + 23,
              String(d[3]).toUpperCase(),
              10.5,
              String(d[2]),
            ) +
            txt(
              Number(d[0]) + 15,
              Number(d[1]) + 53,
              String(d[4]),
              12.5,
              C.ink,
              "v-bold",
            ) +
            mono(Number(d[0]) + 15, Number(d[1]) + 86, String(d[5]), 10),
          170 + i * 120,
        ),
      )
      .join("") +
    mono(
      360,
      375,
      "CONFIRM, REJECT, OR REFINE AGAINST SOURCE EVIDENCE",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function timeline(): string {
  const rows = [
    ["09:12", "authentication", "AD-DC-01", "Unusual service-account login"],
    ["09:17", "process", "WIN-FIN-07", "Encoded PowerShell launched"],
    ["09:24", "authentication", "LNX-DB-03", "SSH session observed"],
    ["09:31", "file", "LNX-DB-03", "Archive staged"],
    [
      "09:36",
      "network",
      "LNX-DB-03",
      "Outbound connection; transfer unverified",
    ],
  ];
  return (
    rect(17, 15, 688, 335, "white", C.line, 10) +
    panelHeader(17, 15, 688, "TIMELINE", "investigation workspace") +
    pill(35, 62, "user.name: svc-backup", C.blue, C.blueLight, 217) +
    mono(35, 118, "TIME", 10) +
    mono(108, 118, "CATEGORY", 10) +
    mono(232, 118, "HOST", 10) +
    mono(372, 118, "EVIDENCE", 10) +
    rows
      .map((r, i) =>
        group(
          (i % 2 === 0
            ? rect(28, 132 + i * 40, 664, 39, C.gray, "none", 0)
            : "") +
            mono(35, 157 + i * 40, r[0], 11, C.ink) +
            mono(108, 157 + i * 40, r[1], 10.5, i === 1 ? C.pink : C.blue) +
            mono(232, 157 + i * 40, r[2], 10.5, C.ink) +
            txt(372, 157 + i * 40, r[3], 10.8),
          i * 90,
        ),
      )
      .join("") +
    mono(
      360,
      377,
      "FILTER · COMPARE · ANNOTATE · PRESERVE",
      11,
      C.muted,
      "middle",
    )
  );
}
function process(): string {
  return (
    pill(31, 13, "WIN-FIN-07 / ONE HOST", C.blue, C.blueLight, 232) +
    path(
      "M362 99V135H161V167 M362 99V167 M362 99V135H560V167 M362 231V275",
      C.line,
      1.6,
      "none",
      "v-draw",
    ) +
    group(
      node(269, 36, "host", "services.exe", "Parent process", C.blue, 185, 64),
      0,
    ) +
    group(
      node(
        37,
        168,
        "document",
        "backup.exe",
        "Expected service",
        C.teal,
        205,
        64,
      ),
      180,
    ) +
    group(
      rect(268, 167, 188, 66, C.pinkLight, C.pink, 9) +
        icon("terminal", 280, 183, C.pink, 0.75) +
        txt(315, 195, "powershell.exe", 13, C.ink, "v-bold") +
        mono(315, 216, "Encoded command", 10, C.pink),
      260,
    ) +
    group(
      node(
        488,
        168,
        "document",
        "conhost.exe",
        "Console host",
        C.blue,
        198,
        64,
      ),
      340,
    ) +
    group(
      rect(254, 277, 222, 57, "white", C.line, 8) +
        mono(270, 300, "Network connection", 10.5, C.blue) +
        mono(270, 321, "Related event details", 11, C.ink),
      430,
    ) +
    mono(
      360,
      375,
      "ANALYZER SHOWS PROCESS RELATIONSHIPS WITHIN A HOST",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function session(): string {
  return (
    rect(19, 27, 417, 308, "#182532", "none", 10) +
    rect(19, 27, 417, 35, "#233545", "none", 10) +
    circle(35, 44, 3, C.pink, "none") +
    circle(47, 44, 3, C.teal, "none") +
    mono(65, 49, "LNX-DB-03 / SESSION VIEW", 10.5, "#D9E7F2") +
    group(
      mono(38, 99, "svc-backup@LNX-DB-03", 12, "#48EFCF") +
        mono(38, 135, "$ whoami", 12, "#ECF4FC") +
        mono(38, 161, "svc-backup", 12, "#AEC6D9") +
        mono(38, 204, "$ tar -czf archive.tgz /srv/export", 11, "#ECF4FC") +
        mono(38, 232, "[file archive observed]", 11, "#AEC6D9") +
        mono(38, 278, "09:31 · source events retained", 10, "#8DA7BA"),
      0,
    ) +
    group(
      rect(462, 43, 234, 270, "white", C.line, 10) +
        icon("search", 480, 63, C.blue, 0.85) +
        txt(520, 83, "Ask the host", 17, C.ink, "v-bold") +
        line(480, 103, 677, 103) +
        mono(480, 132, "LIVE QUERY", 11, C.blue) +
        txt(480, 162, "Running processes", 13) +
        txt(480, 194, "Network connections", 13) +
        txt(480, 226, "Current host state", 13) +
        mono(480, 288, "Separate query capability", 10),
      180,
    ) +
    mono(
      360,
      374,
      "HISTORICAL SESSION CONTEXT + AUTHORIZED LIVE QUESTIONS",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function interop(): string {
  return (
    group(slab(354, 126, 254, 156, 20, C.blue, "ELASTIC SECURITY"), 200) +
    [
      [31, 29, "shield", "Existing EDR", C.blue],
      [491, 29, "network", "Network tools", C.teal],
      [31, 268, "document", "Ticketing", C.pink],
      [491, 268, "workflow", "Response tools", C.blue],
    ]
      .map((d, i) =>
        group(
          node(
            Number(d[0]),
            Number(d[1]),
            d[2] as IconKind,
            String(d[3]),
            [
              "Ingest telemetry",
              "Add signals",
              "Share cases",
              "Configured action",
            ][i],
            String(d[4]),
            198,
          ) +
            path(
              [
                "M229 66H281L323 124",
                "M491 66H442L396 145",
                "M229 305H282L335 245",
                "M491 305H442L389 245",
              ][i],
              String(d[4]),
              1.6,
              "none",
              "v-flow",
            ),
          i * 130,
        ),
      )
      .join("") +
    mono(361, 109, "CONNECT", 11, C.blue, "middle") +
    mono(
      360,
      377,
      "INTEGRATIONS NEED CONFIGURATION, ACCESS, AND VALIDATION",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function migration(o: VisualOptions): string {
  const s = o.settled ? 3 : Math.min(o.step, 3);
  const labels = ["Inventory", "Translate", "Validate", "Phase rollout"];
  return (
    labels
      .map((v, i) =>
        group(
          number(91 + i * 180, 68, `${i + 1}`, i <= s ? C.blue : C.line) +
            txt(
              91 + i * 180,
              111,
              v,
              17,
              i <= s ? C.ink : C.muted,
              "v-bold",
              "middle",
            ) +
            (i < 3
              ? arrow(
                  117 + i * 180,
                  68,
                  245 + i * 180,
                  68,
                  i < s ? C.blue : C.line,
                )
              : ""),
          i * 90,
        ),
      )
      .join("") +
    group(
      rect(44, 151, 632, 174, "white", C.line, 10) +
        mono(
          64,
          178,
          `STEP ${s + 1} / ${labels[s].toUpperCase()}`,
          11,
          C.blue,
        ) +
        txt(
          64,
          213,
          [
            "What must the SOC preserve?",
            "Generate a candidate; inspect the logic.",
            "Replay evidence. Compare expected results.",
            "Run in parallel. Cut over with evidence.",
          ][s],
          20,
          C.ink,
          "v-bold",
        ) +
        txt(
          64,
          254,
          [
            "Use cases · data sources · rules · exceptions",
            "Field mapping · semantics · queries · permissions",
            "True matches · false matches · gaps · analyst workflow",
            "Ownership · rollback · operating metrics",
          ][s],
          14,
          C.muted,
        ) +
        line(64, 277, 657, 277) +
        icon("check", 67, 291, C.teal, 0.7) +
        txt(100, 306, "Acceptance criteria govern progress.", 12, C.teal),
      220,
    ) +
    mono(
      360,
      369,
      "AI ASSISTANCE ACCELERATES WORK; VALIDATION DETERMINES READINESS",
      10.2,
      C.muted,
      "middle",
    )
  );
}
function agent(): string {
  return (
    group(
      circle(349, 176, 79, C.blueLight, C.blue) +
        icon("spark", 322, 115, C.blue, 2) +
        txt(349, 197, "Elastic AI Agent", 18, C.ink, "v-bold", "middle") +
        mono(349, 224, "Ask → retrieve → reason", 11, C.blue, "middle"),
      0,
    ) +
    group(
      node(19, 32, "user", "Analyst", "Sets the question", C.blue, 214) +
        arrow(233, 68, 298, 116, C.blue),
      120,
    ) +
    group(
      node(
        19,
        276,
        "search",
        "Security data",
        "Authorized retrieval",
        C.teal,
        214,
      ) + arrow(233, 309, 296, 239, C.teal),
      240,
    ) +
    group(
      node(481, 33, "terminal", "Tools", "ES|QL + search", C.blue, 216) +
        arrow(410, 119, 481, 70, C.blue),
      310,
    ) +
    group(
      node(
        481,
        275,
        "check",
        "Analyst review",
        "Verifies + decides",
        C.pink,
        216,
      ) + arrow(410, 234, 481, 309, C.pink),
      390,
    ) +
    mono(
      349,
      367,
      "EXPERTISE EXTENDED THROUGH DATA AND TOOLS",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function retrieval(): string {
  return (
    group(
      rect(22, 22, 673, 66, C.blueLight, "none", 10) +
        icon("user", 39, 41, C.blue, 0.9) +
        txt(
          81,
          60,
          "“What happened after the unusual login?”",
          20,
          C.ink,
          "v-bold",
        ),
      0,
    ) +
    arrow(360, 89, 360, 120) +
    group(
      rect(102, 124, 516, 118, "#182532", "none", 10) +
        mono(122, 148, "ES|QL · ILLUSTRATIVE QUERY", 10, "#A9C1D4") +
        mono(122, 177, "FROM logs-*", 13, "#48EFCF") +
        mono(122, 202, '| WHERE user.name == "svc-backup"', 13, "#ECF4FC") +
        mono(122, 227, "| SORT @timestamp ASC", 13, "#ECF4FC"),
      150,
    ) +
    arrow(360, 243, 360, 269, C.teal) +
    group(
      rect(64, 275, 592, 65, "white", C.line, 8) +
        icon("document", 84, 294, C.teal, 0.9) +
        txt(
          125,
          301,
          "Evidence returned under the analyst’s access",
          15,
          C.ink,
          "v-bold",
        ) +
        mono(
          125,
          324,
          "Source events + fields + timestamps → verifiable answer",
          10.7,
        ),
      320,
    ) +
    mono(
      360,
      376,
      "GROUND THE ANSWER IN RETRIEVED EVIDENCE",
      11,
      C.muted,
      "middle",
    )
  );
}
function aiDemo(o: VisualOptions): string {
  const s = o.settled ? 3 : Math.min(o.step, 3);
  return (
    rect(19, 19, 681, 330, "white", C.line, 11) +
    panelHeader(19, 19, 681, "AI INVESTIGATION", "illustrative conversation") +
    group(
      rect(127, 66, 548, 49, C.blueLight, "none", 8) +
        txt(
          145,
          96,
          "Trace svc-backup from login to outbound activity.",
          16,
          C.ink,
          "v-bold",
        ),
      0,
    ) +
    (s >= 1
      ? group(
          icon("spark", 39, 143, C.blue, 0.9) +
            mono(80, 159, "RETRIEVING AUTHORIZED EVIDENCE", 11, C.blue) +
            rect(81, 172, 591, 43, C.gray, "none", 6) +
            mono(
              98,
              197,
              "user.name: svc-backup | SORT @timestamp ASC",
              11.5,
              C.ink,
            ),
          100,
        )
      : "") +
    (s >= 2
      ? group(
          txt(
            81,
            243,
            "Observed: login → execution → SSH → staging.",
            15,
            C.ink,
            "v-bold",
          ) +
            pill(81, 258, "09:12 · auth", C.blue, C.blueLight, 122) +
            pill(213, 258, "09:17 · process", C.pink, C.pinkLight, 144) +
            pill(367, 258, "09:31 · archive", C.teal, C.tealLight, 146),
          180,
        )
      : "") +
    (s >= 3
      ? group(
          rect(81, 293, 591, 37, C.pinkLight, "none", 6) +
            txt(
              97,
              317,
              "Outbound connection observed. Data theft is not established.",
              12,
              C.ink,
              "v-bold",
            ),
          280,
        )
      : "") +
    mono(
      360,
      376,
      ["1 / ASK", "2 / RETRIEVE", "3 / CONNECT", "4 / VERIFY LIMITATIONS"][s],
      11,
      C.muted,
      "middle",
    )
  );
}
function trust(): string {
  return (
    rect(26, 23, 402, 315, C.gray, C.line, 14) +
    mono(44, 47, "SELF-MANAGED SECURITY BOUNDARY", 11, C.muted) +
    group(
      node(
        45,
        74,
        "database",
        "Security evidence",
        "Privileges apply",
        C.blue,
        204,
      ) +
        node(
          45,
          231,
          "spark",
          "Supported local LLM",
          "Validate suitability",
          C.teal,
          274,
        ),
      0,
    ) +
    path("M251 112H336V267H320", C.blue, 1.6, "none", "v-flow") +
    icon("lock", 324, 165, C.blue, 0.9) +
    group(
      rect(470, 102, 224, 157, "white", C.line, 10) +
        icon("cloud", 488, 120, C.pink, 1.1) +
        txt(488, 182, "Approved external LLM", 15, C.ink, "v-bold") +
        txt(488, 208, "Optional connection", 13) +
        mono(488, 237, "Payload + egress review", 10.5),
      180,
    ) +
    dotLine(428, 180, 470, 180, C.pink) +
    pill(344, 68, "CHOICE", C.blue, C.blueLight, 89) +
    mono(
      360,
      373,
      "FEATURE-SPECIFIC MODEL, LICENSE, AND CONNECTIVITY REQUIREMENTS",
      10,
      C.muted,
      "middle",
    )
  );
}
function workflow(): string {
  return (
    group(
      node(24, 114, "shield", "Trigger", "Alert / case / manual", C.blue, 164),
      0,
    ) +
    arrow(190, 149, 242, 149) +
    group(
      rect(248, 70, 234, 193, C.gray, C.line, 10) +
        mono(264, 94, "NATIVE WORKFLOW", 11, C.blue) +
        rect(265, 112, 199, 38, "white", C.line, 6) +
        txt(279, 137, "Gather context", 14) +
        rect(265, 164, 199, 38, C.tealLight, C.teal, 6) +
        txt(279, 189, "Evaluate conditions", 14) +
        rect(265, 216, 199, 29, "white", C.line, 6) +
        mono(279, 235, "Record outcome", 11),
      140,
    ) +
    arrow(484, 149, 537, 149, C.teal) +
    group(
      node(542, 113, "check", "Next step", "Configured action", C.pink, 156),
      280,
    ) +
    path("M189 242H189V298H561V224", C.line, 1.3, "none", "v-flow") +
    mono(
      366,
      323,
      "BRANCHES · RETRIES · REVIEW · AUDITABLE OUTCOMES",
      10.5,
      C.muted,
      "middle",
    ) +
    mono(
      361,
      372,
      "DESIGN THE WORKFLOW AROUND YOUR RESPONSE POLICY",
      11,
      C.blue,
      "middle",
    )
  );
}
function response(o: VisualOptions): string {
  const s = o.settled ? 3 : Math.min(o.step, 3);
  return (
    group(
      rect(23, 26, 208, 293, "white", C.line, 10) +
        pill(39, 43, "VERIFIED FINDINGS", C.blue, C.blueLight, 177) +
        txt(39, 102, "Contain the incident", 16, C.ink, "v-bold") +
        mono(39, 136, "WIN-FIN-07 + LNX-DB-03", 10.5, C.blue) +
        mono(39, 168, "svc-backup", 12, C.blue) +
        line(39, 190, 214, 190) +
        txt(39, 219, "Case evidence attached", 12) +
        txt(39, 248, "Scope reviewed", 12) +
        mono(39, 293, "09:44 · verified", 10.5),
      0,
    ) +
    arrow(231, 173, 272, 173, C.blue) +
    group(
      `<polygon points="346,94 423,173 346,252 270,173" fill="${s >= 1 ? C.tealLight : C.gray}" stroke="${s >= 1 ? C.teal : C.line}"/>` +
        icon(
          s >= 1 ? "check" : "lock",
          334,
          126,
          s >= 1 ? C.teal : C.muted,
          0.9,
        ) +
        txt(
          346,
          179,
          s >= 1 ? "APPROVED" : "APPROVAL",
          13,
          C.ink,
          "v-bold",
          "middle",
        ) +
        mono(346, 205, "manual execution", 9, C.muted, "middle"),
      150,
    ) +
    (s >= 2
      ? group(
          arrow(423, 173, 466, 173, C.teal) +
            rect(468, 69, 228, 88, C.blueLight, "none", 9) +
            icon("shield", 484, 87, C.blue, 0.85) +
            txt(523, 99, "Isolate affected hosts", 13.5, C.ink, "v-bold") +
            mono(523, 127, "Native endpoint actions", 10, C.blue) +
            rect(468, 183, 228, 88, C.pinkLight, "none", 9) +
            icon("workflow", 484, 201, C.pink, 0.85) +
            txt(523, 212, "Disable account", 15, C.ink, "v-bold") +
            mono(523, 241, "Configured directory flow", 10.2, C.pink),
          270,
        )
      : "") +
    (s >= 3
      ? group(
          rect(255, 308, 440, 39, C.gray, "none", 7) +
            icon("document", 273, 317, C.teal, 0.65) +
            txt(
              306,
              333,
              "Case records approval, actions, and outcomes.",
              12,
              C.ink,
            ),
          390,
        )
      : "") +
    mono(
      361,
      379,
      [
        "1 / REVIEW FINDINGS",
        "2 / AUTHORIZE",
        "3 / EXECUTE CONFIGURED ACTIONS",
        "4 / PRESERVE THE RECORD",
      ][s],
      10.5,
      C.muted,
      "middle",
    )
  );
}
function deploy(): string {
  return (
    group(
      rect(25, 29, 385, 292, C.blueLight, C.blue, 13) +
        pill(44, 48, "PRIMARY EXAMPLE", C.blue, "white", 155) +
        icon("database", 60, 101, C.blue, 1.6) +
        txt(119, 128, "Self-managed", 23, C.ink, "v-bold") +
        txt(45, 184, "Your infrastructure", 17) +
        txt(45, 216, "Your data controls", 17) +
        txt(45, 248, "Your operating responsibilities", 17) +
        mono(45, 295, "Data center / private cloud", 11, C.blue),
      0,
    ) +
    group(
      rect(442, 48, 251, 123, "white", C.line, 10) +
        icon("cloud", 459, 70, C.teal, 1.2) +
        txt(506, 96, "Elastic Cloud", 18, C.ink, "v-bold") +
        txt(460, 142, "Managed deployment option", 13),
      140,
    ) +
    group(
      rect(442, 196, 251, 123, "white", C.line, 10) +
        icon("spark", 459, 216, C.pink, 1.2) +
        txt(506, 242, "Serverless", 18, C.ink, "v-bold") +
        txt(460, 289, "Managed service option", 13),
      280,
    ) +
    mono(
      360,
      371,
      "COMPARE CAPABILITIES + ENTITLEMENTS FOR EACH DEPLOYMENT",
      10.5,
      C.muted,
      "middle",
    )
  );
}
function economics(): string {
  return (
    group(
      rect(25, 25, 332, 289, "white", C.line, 12) +
        mono(43, 49, "THE RESOURCE EQUATION", 11, C.blue) +
        txt(44, 104, "Ingest", 24, C.ink, "v-bold") +
        txt(44, 145, "+ Compute", 24, C.ink, "v-bold") +
        txt(44, 186, "+ Retention", 24, C.ink, "v-bold") +
        line(44, 209, 337, 209) +
        txt(44, 247, "Operating cost", 25, C.blue, "v-bold") +
        mono(44, 286, "Measure against your workload", 10.5),
      0,
    ) +
    group(
      slab(474, 76, 113, 80, 91, C.blue) +
        slab(583, 109, 113, 80, 61, C.teal) +
        slab(648, 180, 113, 80, 29, C.pink),
      180,
    ) +
    mono(476, 237, "ACTIVE", 10.5, C.blue, "middle") +
    mono(584, 274, "RECENT", 10.5, C.teal, "middle") +
    mono(661, 323, "HISTORY", 10.5, C.pink, "middle") +
    mono(458, 39, "LIFECYCLE BY VALUE", 11, C.blue) +
    rect(25, 337, 673, 40, C.gray, "none", 7) +
    txt(
      42,
      362,
      "Elastic Defend entitlement does not remove telemetry and storage costs.",
      12,
      C.ink,
    )
  );
}
function proof(): string {
  return (
    group(
      rect(24, 28, 321, 283, "white", C.line, 13) +
        mono(45, 57, "UOL", 14, C.blue) +
        txt(43, 166, "80%", 87, C.blue, "v-bold") +
        txt(45, 204, "faster incident resolution", 18, C.ink, "v-bold") +
        line(45, 229, 324, 229) +
        txt(45, 260, "Customer-reported outcome", 12, C.muted) +
        mono(45, 289, "elastic.co/customers/uol", 10.5),
      0,
    ) +
    group(
      rect(375, 28, 321, 283, "white", C.line, 13) +
        mono(396, 57, "PROFICIO", 14, C.teal) +
        txt(394, 166, "34%", 87, C.teal, "v-bold") +
        txt(396, 204, "less investigation time", 18, C.ink, "v-bold") +
        line(396, 229, 675, 229) +
        txt(396, 260, "Customer-reported outcome", 12, C.muted) +
        mono(396, 289, "elastic.co/customers/proficio", 10.5),
      200,
    ) +
    mono(
      360,
      362,
      "REAL CUSTOMER EXAMPLES. RESULTS VARY BY ENVIRONMENT.",
      11,
      C.muted,
      "middle",
    )
  );
}
function operating(): string {
  return (
    mono(127, 30, "TRADITIONAL SOC", 11, C.muted, "middle") +
    mono(565, 30, "EVIDENCE-LED SOC", 11, C.blue, "middle") +
    group(
      `<polygon points="128,65 240,290 16,290" fill="${C.gray}" stroke="${C.line}"/>` +
        line(76, 169, 180, 169) +
        line(47, 229, 210, 229) +
        txt(128, 148, "Expert", 13, C.ink, "", "middle") +
        txt(128, 205, "Investigate", 13, C.ink, "", "middle") +
        txt(128, 267, "Triage volume", 13, C.ink, "", "middle"),
      0,
    ) +
    arrow(279, 176, 369, 176, C.blue) +
    mono(324, 212, "REBALANCE", 10, C.blue, "middle") +
    group(
      `<polygon points="565,60 700,175 565,295 430,175" fill="${C.blueLight}" stroke="${C.blue}"/>` +
        line(501, 115, 629, 115, C.blue) +
        line(501, 238, 629, 238, C.blue) +
        txt(565, 97, "Expert judgment", 13, C.ink, "", "middle") +
        txt(565, 170, "Investigate + hunt", 18, C.blue, "v-bold", "middle") +
        txt(565, 198, "with connected evidence", 13, C.ink, "", "middle") +
        txt(565, 270, "Assisted triage", 12, C.ink, "", "middle"),
      190,
    ) +
    rect(47, 332, 627, 41, C.tealLight, "none", 8) +
    icon("check", 65, 342, C.teal, 0.7) +
    txt(
      99,
      358,
      "svc-backup incident: verified, approved, contained, recorded.",
      13,
      C.ink,
      "v-bold",
    )
  );
}
function closing(): string {
  return (
    [0, 1, 2]
      .map((i) =>
        group(
          cube(
            110 + i * 249,
            46,
            90,
            [C.blue, C.teal, C.pink][i],
            (["database", "search", "shield"] as IconKind[])[i],
          ) +
            txt(
              110 + i * 249,
              179,
              [
                "See the whole attack.",
                "Understand what matters.",
                "Act with control.",
              ][i],
              16,
              C.ink,
              "v-bold",
              "middle",
            ),
          i * 160,
        ),
      )
      .join("") +
    line(30, 215, 695, 215) +
    group(
      rect(44, 247, 635, 91, C.blueLight, "none", 12) +
        mono(65, 272, "YOUR NEXT STEP", 11, C.blue) +
        txt(
          65,
          306,
          "Evaluate one use case with your evidence.",
          23,
          C.ink,
          "v-bold",
        ) +
        icon("search", 622, 275, C.blue, 1.3),
      400,
    ) +
    mono(
      360,
      374,
      "PROVE COVERAGE · MEASURE QUALITY · PRACTICE RESPONSE",
      10.5,
      C.muted,
      "middle",
    )
  );
}

const visuals: Record<VisualKind, (options: VisualOptions) => string> = {
  hero,
  promise,
  platform,
  fragmented,
  pillars,
  sources,
  pipeline,
  history,
  layers,
  rules,
  anomaly,
  endpoint,
  correlation,
  "detection-demo": detectionDemo,
  entities,
  alerts,
  discovery,
  hypothesis,
  timeline,
  process,
  session,
  interop,
  migration,
  agent,
  retrieval,
  "ai-demo": aiDemo,
  trust,
  workflow,
  response,
  deploy,
  economics,
  proof,
  operating,
  closing,
};

export function renderVisual(scene: Scene, options: VisualOptions): string {
  return `<div class="security-visual${options.settled ? " settled" : ""}" data-visual="${scene.visual}" data-step="${options.step}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 390" role="img" aria-label="${esc(scene.headline + " " + scene.emphasis)}"><title>${esc(scene.headline + " " + scene.emphasis)}</title>${visuals[scene.visual](options)}</svg></div>`;
}
