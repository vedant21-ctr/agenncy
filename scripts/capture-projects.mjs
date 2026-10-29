import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const projects = [
  "pulse-analytics",
  "aura-objects",
  "synapse-flow",
  "vault-fintech",
  "apex-systems",
];

const outDir = path.resolve(process.cwd(), "public/projects");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log("Launching Chromium to capture concept project screenshots...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  for (const slug of projects) {
    const page = await context.newPage();
    const url = `http://localhost:3000/work/${slug}`;
    console.log(`Navigating to ${url}...`);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1000);

      // Locate demo container or fallback to main mockup
      const demoElement = await page.$(".rounded-2xl.border.border-white\\/10");
      const target = demoElement || (await page.$("main")) || page;

      const outPath = path.join(outDir, `${slug}.png`);
      await target.screenshot({ path: outPath });
      console.log(`Captured ${outPath}`);
    } catch (err) {
      console.error(`Error capturing ${slug}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
