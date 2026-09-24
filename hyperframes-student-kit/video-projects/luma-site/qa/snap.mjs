// usage: node qa/snap.mjs out.jpg t1 t2 ... — screenshots of the composition at given times (timeline seek + video seek), 4 per sheet row
import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
const [out, ...ts] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("file://" + resolve("index.html"));
await page.waitForTimeout(3000);
const files = [];
for (const t of ts) {
  await page.evaluate(async (t) => {
    window.__timelines["luma-site"].seek(+t, false);
    const v = document.getElementById("footage"); v.pause();
    if (+t < v.duration) { await new Promise((r) => { v.addEventListener("seeked", r, { once: true }); v.currentTime = +t; }); }
  }, t);
  await page.waitForTimeout(150);
  const f = `/tmp/claude-0/-home-user-LUMA-WHATSAP/b4779134-fd59-5702-a6d1-f2582282b14c/scratchpad/snap_${t}.jpg`;
  await page.screenshot({ path: f, type: "jpeg", quality: 80 }); files.push(f);
}
await browser.close();
const n = files.length, cols = 2, rows = Math.ceil(n / cols);
const inputs = files.flatMap((f) => ["-i", f]);
const fc = files.map((_, i) => `[${i}:v]scale=960:540[s${i}]`).join(";") + ";" + files.map((_, i) => `[s${i}]`).join("") + `xstack=inputs=${n}:layout=${files.map((_, i) => `${(i % cols) * 960}_${Math.floor(i / cols) * 540}`).join("|")}${n % 2 ? ":fill=black" : ""}[v]`;
spawnSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", fc, "-map", "[v]", "-q:v", "4", out]);
console.log(out, n);
