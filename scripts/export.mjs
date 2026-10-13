import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "@playwright/test";
import { loadScenes, writeNotes } from "./content.mjs";

const root = path.resolve(".");
const dist = path.join(root, "dist");
const downloads = path.join(root, "public/downloads");
const thumbnails = path.join(root, "public/thumbnails");
const outputs = path.resolve(process.env.PRESENTATION_OUTPUT_DIR || "artifacts");
const qa = path.resolve(process.env.PRESENTATION_QA_DIR || "work/qa");
await Promise.all(
  [downloads, thumbnails, outputs, qa].map((dir) =>
    fs.mkdir(dir, { recursive: true }),
  ),
);
const scenes = await loadScenes();
if (scenes.length !== 34)
  throw new Error("Export requires exactly 34 core scenes.");
const pacing = await writeNotes(scenes);
const guide = "Conversation Prep - Elastic Security Customer Presentation.md";
await fs.copyFile(
  path.join(root, "docs/presenter-notes.md"),
  path.join(downloads, "presenter-notes.md"),
);
await fs.copyFile(path.join(root, "docs", guide), path.join(downloads, guide));

const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".md": "text/plain",
};
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = path.resolve(dist, "." + pathname);
    if (!file.startsWith(dist + path.sep)) throw new Error("Invalid path");
    const bytes = await fs.readFile(file);
    response.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
    });
    response.end(bytes);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (let i = 0; i < scenes.length; i++) {
    await page.goto(`${url}?render=static&density=3#${i}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join(qa, `export-${String(i + 1).padStart(2, "0")}.png`),
    });
    await page.setViewportSize({ width: 480, height: 270 });
    await page.screenshot({
      path: path.join(thumbnails, `${String(i + 1).padStart(2, "0")}.png`),
    });
    await page.setViewportSize({ width: 1280, height: 720 });
  }
  if (errors.length) throw new Error(errors.join("\n"));

  await page.goto(`${url}?print=1&density=3`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const pageCount = await page.locator(".print-page").count();
  if (pageCount !== 34)
    throw new Error(`Unexpected print-page count: ${pageCount}`);
  const pdf = path.join(downloads, "elastic-security-preso.pdf");
  await page.pdf({
    path: pdf,
    width: "1280px",
    height: "720px",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const sourceHtml = await fs.readFile(path.join(dist, "index.html"), "utf8");
  let offline = sourceHtml;
  for (const match of [
    ...sourceHtml.matchAll(/<link\b[^>]*href="([^\"]+\.css)"[^>]*>/g),
  ]) {
    const css = await fs.readFile(path.resolve(dist, match[1]), "utf8");
    offline = offline.replace(match[0], `<style>${css}</style>`);
  }
  for (const match of [
    ...sourceHtml.matchAll(/<script\b[^>]*src="([^\"]+\.js)"[^>]*><\/script>/g),
  ]) {
    const js = (
      await fs.readFile(path.resolve(dist, match[1]), "utf8")
    ).replace(/<\/script/gi, "<\\/script");
    offline = offline.replace(match[0], `<script type="module">${js}</script>`);
  }
  const thumbs = await Promise.all(
    scenes.map(
      async (_, i) =>
        `data:image/png;base64,${(await fs.readFile(path.join(thumbnails, `${String(i + 1).padStart(2, "0")}.png`))).toString("base64")}`,
    ),
  );
  offline = offline.replace(
    "<body>",
    `<body>\n<script id="thumbnail-data" type="application/json">${JSON.stringify(thumbs)}</script>`,
  );
  offline = offline.replace(
    '<html lang="en">',
    '<html lang="en" data-offline="true">',
  );
  await fs.writeFile(
    path.join(downloads, "elastic-security-preso.html"),
    offline,
  );
  for (const name of [
    "elastic-security-preso.html",
    "elastic-security-preso.pdf",
    "presenter-notes.md",
    guide,
  ]) {
    await fs.copyFile(path.join(downloads, name), path.join(outputs, name));
  }
  await fs.copyFile(
    path.join(
      root,
      "docs/superpowers/specs/2026-10-13-elastic-security-design.md",
    ),
    path.join(outputs, "elastic-security-design.md"),
  );
  await fs.copyFile(
    path.join(qa, "export-01.png"),
    path.join(outputs, "elastic-security-preview.png"),
  );

  // Rebuild once so the Pages artifact contains the generated companion files.
  execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });
  console.log(
    JSON.stringify(
      {
        coreScenes: scenes.length,
        suggestedPacing: pacing,
        thumbnailCount: thumbs.length,
        pageErrors: errors,
        outputs,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
