import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];

page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`CON: ${msg.text()}`);
});

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("http://127.0.0.1:4173/", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(3000);

for (let i = 0; i < 10; i++) {
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(600);
}

await page.waitForTimeout(4000);

const rootHtml = await page.evaluate(
  () => document.getElementById("root")?.innerHTML?.length ?? 0,
);
console.log("ROOT_HTML_LEN", rootHtml);

const modelViewerCount = await page.locator("model-viewer").count();
console.log("MODEL_VIEWER_COUNT", modelViewerCount);

if (modelViewerCount > 0) {
  const prompt = page.locator(".interaction-prompt");
  if ((await prompt.count()) > 0) {
    await prompt.first().click();
    await page.waitForTimeout(2000);
    const rootAfter = await page.evaluate(
      () => document.getElementById("root")?.innerHTML?.length ?? 0,
    );
    console.log("ROOT_AFTER_PROMPT_CLICK", rootAfter);
  }
}

console.log("ERROR_COUNT", errors.length);
errors.forEach((e, i) => console.log(`ERR${i}:`, e));

await browser.close();
