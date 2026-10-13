import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

test("walkthrough animations play every phase and loop without navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-10-13T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-13T12:00:00Z"));
  await page.goto("/#0");
  const sequences = await page.evaluate(() =>
    (window as any).__PRESENTATION__.scenes.filter((s: any) => s.steps),
  );
  expect(sequences).toHaveLength(4);
  for (const scene of sequences) {
    await page.goto(`/#${scene.index}`);
    for (let phase = 0; phase < scene.steps.length; phase++) {
      if (phase) await page.clock.runFor(3200);
      await expect(page.locator("html")).toHaveAttribute(
        "data-slide",
        String(scene.index),
      );
      await expect(page.locator("html")).toHaveAttribute(
        "data-step",
        String(phase),
      );
      await expect(page.locator(".step-strip")).toContainText(
        scene.steps[phase].label,
      );
      await expect(page.locator(".security-visual")).toHaveAttribute(
        "data-step",
        String(phase),
      );
      await expect(page.locator(".qualification")).not.toBeEmpty();
    }
    await page.clock.runFor(4800);
    await expect(page.locator("html")).toHaveAttribute("data-step", "0");
    await expect(page.locator("html")).toHaveAttribute(
      "data-slide",
      String(scene.index),
    );
  }
});

test("standalone HTML works offline with embedded fonts and complete previews", async ({
  browser,
}) => {
  const context = await browser.newContext({
    offline: true,
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (/^https?:/.test(r.url())) external.push(r.url());
  });
  await page.goto(
    pathToFileURL(path.resolve("public/downloads/elastic-security-preso.html"))
      .href,
  );
  await expect(page.locator("html")).toHaveAttribute("data-ready", "true");
  await expect(page.locator(".slide")).toHaveAttribute("data-scene-id", "hero");
  await page.locator("#overview-toggle").click();
  await expect(page.locator("#overview-dialog .thumb")).toHaveCount(34);
  const embedded = await page
    .locator("#overview-dialog img")
    .evaluateAll((imgs) =>
      imgs.every((img) =>
        (img as HTMLImageElement).src.startsWith("data:image/png;base64,"),
      ),
    );
  expect(embedded).toBe(true);
  await page.locator('#overview-dialog [data-goto="28"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "28");
  await expect(page.locator("html")).toHaveAttribute("data-step", "3");
  await page.locator("#next").click();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "29");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-10-13T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-13T12:00:00Z"));
  await page.goto(page.url().split("#")[0] + "#28");
  await page.clock.runFor(3200);
  await expect(page.locator("html")).toHaveAttribute("data-step", "1");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("html")).toHaveAttribute("data-slide", "29");
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
  await context.close();
});

test("all hosted companion files and the player alias resolve", async ({
  page,
  request,
}) => {
  for (const name of [
    "elastic-security-preso.pdf",
    "elastic-security-preso.html",
    "presenter-notes.md",
    "Conversation%20Prep%20-%20Elastic%20Security%20Customer%20Presentation.md",
  ]) {
    const response = await request.get(`/downloads/${name}`);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeGreaterThan(100);
  }
  await page.goto("/company-preso.html#16");
  await expect(page.locator("html")).toHaveAttribute("data-slide", "16");
});

test("all 34 core deep links render unique complete scenes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?render=static&density=3#0");
  await expect(page.locator("html")).toHaveAttribute("data-ready", "true");
  const metadata = await page.evaluate(() => (window as any).__PRESENTATION__);
  expect(metadata.count).toBe(34);
  expect(new Set(metadata.scenes.map((s: any) => s.id)).size).toBe(34);
  expect(
    metadata.scenes.reduce((n: number, s: any) => n + s.notes.seconds, 0),
  ).toBeGreaterThanOrEqual(1500);
  expect(
    metadata.scenes.reduce((n: number, s: any) => n + s.notes.seconds, 0),
  ).toBeLessThanOrEqual(1800);
  for (let i = 0; i < 34; i++) {
    await page.evaluate((n) => {
      location.hash = String(n);
    }, i);
    await expect(page.locator("html")).toHaveAttribute("data-slide", String(i));
    await expect(page.locator(".slide h1")).not.toBeEmpty();
    await expect(page.locator(".security-visual svg")).toHaveCount(1);
    await expect(page.locator(".source-strip a").first()).toHaveAttribute(
      "href",
      /^https:\/\//,
    );
  }
  expect(errors).toEqual([]);
});

test("arrows and navigation controls always change slides immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const scene of [13, 22, 25, 28]) {
    await page.goto(`/#${scene}`);
    await expect(page.locator("html")).toHaveAttribute("data-step", "0");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("html")).toHaveAttribute(
      "data-slide",
      String(scene + 1),
    );
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("html")).toHaveAttribute(
      "data-slide",
      String(scene),
    );
    await expect(page.locator("html")).toHaveAttribute("data-step", "0");
    await page.locator("#prev").click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-slide",
      String(scene - 1),
    );
    await page.locator("#next").click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-slide",
      String(scene),
    );
  }
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  for (const key of ["Space", "PageDown"]) {
    await page.keyboard.press(key);
    await expect(page.locator("html")).toHaveAttribute("data-slide", "29");
    await page.keyboard.press("PageUp");
    await expect(page.locator("html")).toHaveAttribute("data-slide", "28");
  }
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("html")).toHaveAttribute("data-slide", "31");
});

test("browser history returns to slides and restarts their animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-10-13T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-13T12:00:00Z"));
  await page.goto("/#13");
  await page.clock.runFor(6400);
  await expect(page.locator("html")).toHaveAttribute("data-step", "2");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("html")).toHaveAttribute("data-slide", "14");
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "13");
  await expect(page.locator("html")).toHaveAttribute("data-step", "0");
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "14");
  await page.clock.runFor(20000);
  await expect(page.locator("html")).toHaveAttribute("data-step", "0");
});

test("automatic animation preserves annotations and pauses for overlays and drawing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-10-13T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-13T12:00:00Z"));
  await page.goto("/#28");
  await page.locator("#notes-toggle").click();
  await page.locator("#draw-toggle").click();
  const box = await page.locator("#stage-wrap").boundingBox();
  await page.mouse.move(box!.x + 100, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + 200, box!.y + 200);
  await page.mouse.up();
  await page.clock.runFor(10000);
  await expect(page.locator("html")).toHaveAttribute("data-step", "0");
  await page.keyboard.press("Escape");
  await page.clock.runFor(3200);
  await expect(page.locator("html")).toHaveAttribute("data-step", "1");
  await expect(page.locator("#ink path")).toHaveCount(1);
  await expect(page.locator("#notes-panel")).toBeVisible();
  await page.locator("#help-toggle").click();
  await page.clock.runFor(10000);
  await expect(page.locator("html")).toHaveAttribute("data-step", "1");
  const closed = page
    .locator("#help-dialog")
    .evaluate(
      (dialog) =>
        new Promise<void>((resolve) =>
          dialog.addEventListener("close", () => resolve(), { once: true }),
        ),
    );
  await page.locator("#help-dialog [data-close]").click();
  await closed;
  await page.clock.runFor(3200);
  await expect(page.locator("html")).toHaveAttribute("data-step", "2");
  await page.locator("#replay").click();
  await expect(page.locator("html")).toHaveAttribute("data-step", "0");
  await page.clock.runFor(3200);
  await expect(page.locator("html")).toHaveAttribute("data-step", "1");
  await page.getByRole("button", { name: "Density 5", exact: true }).click();
  await page.clock.runFor(3200);
  await expect(page.locator("html")).toHaveAttribute("data-step", "2");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-step", "3");
  await page.clock.runFor(20000);
  await expect(page.locator("html")).toHaveAttribute("data-step", "3");
});

test("in-page hash changes update the slide and notes without reload", async ({
  page,
}) => {
  await page.goto("/#0");
  await page.locator("#notes-toggle").click();
  await page.evaluate(() => {
    location.hash = "#16";
  });
  await expect(page.locator("html")).toHaveAttribute("data-slide", "16");
  await expect(page.locator("#notes-panel h2")).toContainText(
    "Related alerts.",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "16");
});

test("all five density levels disclose progressively deeper information", async ({
  page,
}) => {
  await page.goto("/#5");
  await page.getByRole("button", { name: "Density 1", exact: true }).click();
  await expect(page.locator(".lead")).toBeHidden();
  await page.getByRole("button", { name: "Density 2", exact: true }).click();
  await expect(page.locator(".lead")).toBeVisible();
  await expect(page.locator(".takeaway p").first()).toBeHidden();
  await page.getByRole("button", { name: "Density 3", exact: true }).click();
  await expect(page.locator(".takeaway p").first()).toBeVisible();
  await expect(page.locator(".density-extra")).toBeHidden();
  await page.getByRole("button", { name: "Density 4", exact: true }).click();
  await expect(page.locator(".density-extra")).toBeVisible();
  await expect(page.locator(".density-deep")).toBeHidden();
  await page.getByRole("button", { name: "Density 5", exact: true }).click();
  await expect(page.locator(".density-deep")).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-density", "5");
});

test("Space activates focused toolbar controls", async ({ page }) => {
  await page.goto("/#0");
  await page.locator("#notes-toggle").focus();
  await page.keyboard.press("Space");
  await expect(page.locator("#notes-panel")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "0");
});

test("tablet notes and scaled stage both remain within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 800, height: 768 });
  await page.goto("/#0");
  await page.locator("#notes-toggle").click();
  const positions = await page.evaluate(() => ({
    stage: document
      .querySelector("#stage-wrap")!
      .getBoundingClientRect()
      .toJSON(),
    notes: document
      .querySelector("#notes-panel")!
      .getBoundingClientRect()
      .toJSON(),
    width: innerWidth,
  }));
  expect(positions.stage.left).toBeGreaterThanOrEqual(0);
  expect(positions.notes.right).toBeLessThanOrEqual(positions.width);
  expect(positions.stage.right).toBeLessThanOrEqual(positions.notes.left - 8);
});

test("overview, filmstrip, notes and timer operate independently", async ({
  page,
}) => {
  await page.goto("/#0");
  await page.locator("#overview-toggle").click();
  await expect(page.locator("#overview-dialog .thumb")).toHaveCount(34);
  await page.locator('#overview-dialog [data-goto="16"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "16");
  await page.locator("#filmstrip-toggle").click();
  await expect(page.locator("#filmstrip .thumb")).toHaveCount(34);
  await page.locator("#notes-toggle").click();
  await expect(page.locator("#notes-panel")).toContainText("Attack Discovery");
  await page.locator("#timer").click();
  await expect(page.locator("#timer")).toHaveAttribute(
    "aria-label",
    "Resume presenter timer",
  );
  const stopped = await page.locator("#timer").textContent();
  await page.waitForTimeout(1200);
  await expect(page.locator("#timer")).toHaveText(stopped!);
  await page.locator("#timer").click();
  await expect(page.locator("#timer")).toHaveAttribute(
    "aria-label",
    "Pause presenter timer",
  );
});

test("laser and drawing are usable and drawing is cleared on slide exit", async ({
  page,
}) => {
  await page.goto("/#0");
  await page.locator("#laser-toggle").click();
  const box = await page.locator("#stage-wrap").boundingBox();
  await page.mouse.move(box!.x + 100, box!.y + 100);
  await expect(page.locator("#laser-dot")).toHaveClass("visible");
  await page.locator("#draw-toggle").click();
  await page.mouse.move(box!.x + 100, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + 200, box!.y + 200);
  await page.mouse.up();
  await expect(page.locator("#ink path")).toHaveCount(1);
  await expect(page.locator("#ink path")).toHaveAttribute("d", /L/);
  await page.locator("#next").click();
  await expect(page.locator("#ink path")).toHaveCount(0);
});

test("reduced motion completes drawings; print has exactly 34 core pages", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#12");
  const motion = await page
    .locator(".security-visual .reveal")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(motion).toBe("none");
  await page.goto("/?print=1&density=3");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".print-page")).toHaveCount(34);
  await expect(page.locator(".print-page .security-visual svg")).toHaveCount(
    34,
  );
  await expect(page.locator('.print-page > .slide[data-step="4"]')).toHaveCount(
    2,
  );
  await expect(page.locator("#appendix-dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("mobile touch navigation and help remain accessible", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/#0");
  await page.getByRole("button", { name: "Next slide", exact: true }).tap();
  await expect(page.locator("html")).toHaveAttribute("data-slide", "1");
  await page.locator("#stage-wrap").dispatchEvent("pointerdown", {
    pointerType: "touch",
    clientX: 250,
    clientY: 400,
  });
  await page.locator("#stage-wrap").dispatchEvent("pointerup", {
    pointerType: "touch",
    clientX: 150,
    clientY: 400,
  });
  await expect(page.locator("html")).toHaveAttribute("data-slide", "2");
  await page.locator("#help-toggle").tap();
  await expect(page.locator("#help-dialog")).toBeVisible();
  await expect(page.locator(".download-link")).toHaveCount(4);
  await page.locator("#open-appendix").tap();
  await expect(page.locator("#appendix-dialog")).toContainText(
    "FORTHCOMING TECHNICAL PREVIEW",
  );
  await context.close();
});
