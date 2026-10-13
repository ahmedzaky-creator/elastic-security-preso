import fs from "node:fs/promises";
import { createServer } from "vite";

export async function loadScenes() {
  const loader = await createServer({
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
  });
  try {
    return (await loader.ssrLoadModule("/src/scenes.ts")).scenes;
  } finally {
    await loader.close();
  }
}

export async function writeNotes(scenes) {
  const seconds = scenes.reduce((sum, s) => sum + s.notes.seconds, 0);
  const duration = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  let md = `# Elastic Security — Presenter notes\n\n34 scenes · ${duration} suggested pacing · English · CISO and SOC leaders\n\nCore argument: **An attacker crosses boundaries. Your investigation should too.**\n\nAnimation sequences play and loop automatically. Arrow, Space, and Page keys move directly between slides; R replays the current slide. Reduced motion shows complete diagrams immediately.\n\nAll incident data and UI walkthroughs are illustrative. Verify findings, entitlements, versions, models, connectivity, and action privileges for the customer. Sources checked October 13, 2026. Hide the inline notes before screen sharing.\n\n`;
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    md += `## ${String(i + 1).padStart(2, "0")}. ${s.headline} ${s.emphasis}\n\n**Chapter:** ${s.chapter} · **Pacing:** ${s.notes.seconds} seconds\n\n**Open:** ${s.notes.opening}\n\n**Explain:** ${s.notes.body}\n\n`;
    if (s.notes.prompt) md += `**Ask:** ${s.notes.prompt}\n\n`;
    if (s.steps)
      md += `**Automatic animation sequence:**\n\n${s.steps.map((st, n) => `${n + 1}. **${st.label}** — ${st.detail}`).join("\n")}\n\n`;
    md += `**Transition:** ${s.notes.transition}\n\n**Qualification:** ${s.qualification}\n\n**Technical context:** ${s.densityExtra}\n\n**Evidence:** ${s.sources.map((x) => `[${x.label}](${x.url})`).join(" · ")}\n\n`;
  }
  await fs.writeFile(
    new URL("../docs/presenter-notes.md", import.meta.url),
    md,
  );
  return duration;
}
