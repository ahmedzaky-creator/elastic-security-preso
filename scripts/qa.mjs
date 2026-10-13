import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.PRESENTATION_URL || "http://127.0.0.1:4173/";
const qa = path.resolve("../qa");
await fs.mkdir(qa, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const requestedIndices = process.argv.find((x) => x.startsWith("--indices="));
const requestedDensity = process.argv.find((x) => x.startsWith("--density="));
const indices = requestedIndices
  ? requestedIndices.split("=")[1].split(",").map(Number)
  : process.argv.includes("--all")
    ? Array.from({ length: 34 }, (_, i) => i)
    : [0, 4, 16, 28];
const densities = requestedDensity
  ? [Number(requestedDensity.split("=")[1])]
  : process.argv.includes("--all")
    ? [1, 3, 5]
    : [3];
const bounds = [];
for (const density of densities) {
  for (const i of indices) {
    await page.goto(`${base}?render=static&density=${density}#${i}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('html[data-ready="true"]').waitFor();
    await page.screenshot({
      path: path.join(qa, `d${density}-${String(i + 1).padStart(2, "0")}.png`),
    });
    const result = await page.evaluate(() => {
      const slide = document.querySelector(".slide");
      const copy = document
        .querySelector(".scene-copy")
        .getBoundingClientRect();
      const cards = document
        .querySelector(".takeaways")
        .getBoundingClientRect();
      const extra = document
        .querySelector(".density-extra")
        .getBoundingClientRect();
      const qualification = document
        .querySelector(".qualification")
        .getBoundingClientRect();
      const cardBottom = Math.max(
        ...Array.from(document.querySelectorAll(".takeaway p"))
          .filter((x) => getComputedStyle(x).display !== "none")
          .map((x) => x.getBoundingClientRect().bottom),
      );
      return {
        density: slide.dataset.density,
        id: slide.dataset.sceneId,
        copyBottom: copy.bottom,
        cardsTop: cards.top,
        cardsVisible:
          getComputedStyle(document.querySelector(".takeaways")).display !==
          "none",
        extraVisible:
          getComputedStyle(document.querySelector(".density-extra")).display !==
          "none",
        copyExtraOverlap:
          copy.left < extra.right &&
          copy.right > extra.left &&
          copy.bottom > extra.top - 5,
        extraBottom: extra.bottom,
        cardBottom,
        qualificationTop: qualification.top,
      };
    });
    bounds.push(result);
  }
}
await fs.writeFile(
  path.join(qa, "layout-bounds.json"),
  JSON.stringify({ errors, bounds }, null, 2),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      screenshots: indices.length * densities.length,
      pageErrors: errors,
      overlapCandidates: bounds.filter(
        (x) =>
          (x.cardsVisible &&
            (x.copyBottom > x.cardsTop - 9 ||
              x.cardBottom > x.qualificationTop - 2)) ||
          (x.extraVisible && x.copyExtraOverlap),
      ),
    },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
