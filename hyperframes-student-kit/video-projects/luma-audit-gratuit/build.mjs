#!/usr/bin/env node
// Builds index.html from assets/plan.json + the structure/style below. Animations: motion.js (inlined).
// Usage: node build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition;
const DUR = plan.duration;
const FOOTAGE_DUR = plan.footageDuration;

const C = { bg: "#10182B", surface: "#F7F8FC", white: "#FFFFFF", blue: "#4263F5", violet: "#8A5CF6", muted: "#68738A", mutedDark: "#4E5A70", ink: "#10182B" };

const fontFace = `
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
`;

const glass = `
  background: linear-gradient(135deg, rgba(16,24,43,0.66) 0%, rgba(16,24,43,0.56) 45%, rgba(24,34,60,0.52) 75%, rgba(16,24,43,0.62) 100%);
  backdrop-filter: blur(16px) saturate(1.15); -webkit-backdrop-filter: blur(16px) saturate(1.15);
  border: 1px solid rgba(255,255,255,0.26);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 18px 40px rgba(16,24,43,0.35), 0 2px 6px rgba(16,24,43,0.18);
`;
const whiteCard = `
  background: ${C.white};
  border: 1px solid rgba(16,24,43,0.06);
  box-shadow: 0 22px 48px rgba(16,24,43,0.30), 0 2px 6px rgba(16,24,43,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
`;

const css = `
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: ${C.bg}; font-family: "Inter", sans-serif; color: ${C.surface}; }
#root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: ${C.bg}; }

#bg { position: absolute; inset: 0; background: ${C.bg}; z-index: 0; }
#bg .g1, #bg .g2 { position: absolute; border-radius: 50%; }
#bg .g1 { left: -200px; top: -300px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(66,99,245,0.55) 0%, rgba(66,99,245,0.18) 40%, rgba(66,99,245,0) 68%); }
#bg .g2 { left: 900px; top: 200px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(138,92,246,0.42) 0%, rgba(138,92,246,0.14) 40%, rgba(138,92,246,0) 68%); }
#bg .grid { position: absolute; inset: 0; opacity: 0.16; background-image: linear-gradient(rgba(247,248,252,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(247,248,252,0.18) 1px, transparent 1px); background-size: 96px 96px; }

#frame { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: hidden; transform-origin: 0 0; z-index: 1; border-radius: 0px; background: ${C.bg}; }
#cam { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; will-change: transform; }
#poster, #footage { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; display: block; object-fit: cover; }
#footage { filter: contrast(1.03) saturate(1.05); }

/* logo card (official asset on a white card) */
#logo { position: absolute; left: 1440px; top: 60px; width: 400px; height: 267px; z-index: 5; border-radius: 22px; overflow: hidden; ${whiteCard} }
#logo img { display: block; width: 100%; height: 100%; object-fit: cover; }

/* step chip */
#step { position: absolute; left: 90px; top: 96px; z-index: 5; padding: 8px 14px; border-radius: 9px; background: ${C.blue}; color: #fff; font-weight: 600; font-size: 16px; letter-spacing: 0.16em; }

/* audit card: white, mascot leaning at the top-right */
#cardA { position: absolute; left: 90px; top: 150px; width: 640px; height: 300px; z-index: 4; border-radius: 24px; padding: 30px 32px; ${whiteCard} color: ${C.ink}; overflow: hidden; }
#cardA .mascot { position: absolute; right: 18px; top: 10px; width: 250px; height: 201px; }
#cardA .mascot img { display: block; width: 100%; height: 100%; }
#cardA .t { font-weight: 800; font-size: 40px; letter-spacing: -0.02em; color: ${C.ink}; }
#cardA .l1 { font-weight: 600; font-size: 26px; color: ${C.ink}; margin-top: 8px; }
#cardA .chip { display: inline-block; margin-top: 18px; padding: 10px 16px; border-radius: 10px; background: ${C.blue}; color: #fff; font-weight: 700; font-size: 20px; letter-spacing: 0.12em; }
#cardA .l2 { position: absolute; left: 32px; bottom: 24px; font-weight: 500; font-size: 22px; color: ${C.mutedDark}; }

/* compact glass panels */
.panel { position: absolute; left: 90px; width: 640px; height: 104px; z-index: 4; border-radius: 18px; padding: 0 22px; ${glass} display: flex; align-items: center; gap: 16px; color: ${C.surface}; }
#p1 { top: 490px; } #p2 { top: 610px; } #p3 { top: 730px; }
.panel .ic { width: 40px; height: 40px; border-radius: 12px; background: ${C.blue}; display: flex; align-items: center; justify-content: center; flex: 0 0 40px; }
.panel .ic svg { width: 22px; height: 22px; }
.panel .t { font-weight: 600; font-size: 24px; letter-spacing: -0.01em; width: 250px; }
.panel .mini { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.tool { width: 44px; height: 44px; border-radius: 12px; background: rgba(247,248,252,0.14); border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; }
.tool svg { width: 22px; height: 22px; }
.goal { width: 22px; border-radius: 6px 6px 2px 2px; background: linear-gradient(180deg, ${C.violet}, ${C.blue}); transform-origin: 50% 100%; align-self: flex-end; }
.goals { display: flex; align-items: flex-end; gap: 8px; height: 56px; border-bottom: 1px solid rgba(255,255,255,0.35); padding: 0 4px; }
.gauge { width: 230px; height: 12px; border-radius: 6px; background: rgba(247,248,252,0.2); position: relative; overflow: visible; }
.gauge i { position: absolute; left: 0; top: 0; height: 100%; width: 100%; border-radius: 6px; background: linear-gradient(90deg, ${C.blue}, ${C.violet}); transform-origin: 0 50%; }
.gauge b { position: absolute; top: -8px; left: 0; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 4px solid ${C.blue}; margin-left: -14px; }

/* right card: step 1 — gagner du temps */
#card1 { position: absolute; left: 1180px; top: 350px; width: 620px; height: 360px; z-index: 4; border-radius: 24px; padding: 28px 32px; ${glass} }
#card1 .n { font-weight: 800; font-size: 120px; line-height: 0.9; color: ${C.blue}; letter-spacing: -0.04em; }
#card1 .k { font-weight: 600; font-size: 17px; letter-spacing: 0.16em; color: rgba(247,248,252,0.8); margin-top: 14px; }
#card1 .t { position: absolute; left: 32px; bottom: 30px; font-weight: 700; font-size: 38px; letter-spacing: -0.02em; }
#clock { position: absolute; right: 30px; top: 30px; width: 190px; height: 190px; }
#clock svg { width: 190px; height: 190px; display: block; overflow: visible; }

/* captions */
#caps { position: absolute; left: 0; right: 0; top: 924px; z-index: 6; pointer-events: none; }
.cg { position: absolute; left: 160px; right: 160px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.32em; font-weight: 600; font-size: 43px; line-height: 1.2; color: #fff; text-shadow: 0 2px 10px rgba(16,24,43,0.7), 0 0 2px rgba(16,24,43,0.9); white-space: nowrap; }
.cg .w { display: inline-block; padding: 6px 12px; border-radius: 10px; }

/* outro */
#endcard { position: absolute; left: 930px; top: 210px; width: 900px; height: 600px; z-index: 5; border-radius: 34px; overflow: hidden; ${whiteCard} }
#endcard img { display: block; width: 100%; height: 100%; object-fit: cover; }

#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.07; mix-blend-mode: overlay;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.2px), radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1.2px);
  background-size: 3px 3px, 5px 5px; background-position: 0 0, 1px 2px; }
`;

const S = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icTools = S('<path d="M14.7 6.3a4 4 0 0 0 5 5L13 18l-3-3 6.7-6.7z"/><path d="M4 20l4-4"/>');
const icTarget = S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>');
const icPulse = S('<path d="M3 12h4l2-6 4 12 2-6h6"/>');
const icMail = S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>');
const icCal = S('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>');
const icChat = S('<path d="M4 5h16v11H9l-5 4z"/>');
const icSheet = S('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>');

const sfxAudio = plan.events.filter((e) => e.sfx).map((e, i) => {
  const dur = { pop: 0.16, tick: 0.12, whoosh: 0.7, swell: 1.1 }[e.sfx];
  const vol = { pop: 0.14, tick: 0.1, whoosh: 0.14, swell: 0.15 }[e.sfx];
  const track = e.id === "vignette" || e.id === "endcard" ? 7 : 6;
  return `  <audio id="sfx-${e.id}" data-start="${e.time}" data-duration="${dur}" data-track-index="${track}" data-volume="${vol}" src="assets/sfx/${e.sfx}.m4a"></audio>`;
}).join("\n");

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="1920" data-height="1080" data-duration="${DUR}">
  <div id="bg"><div class="g1"></div><div class="g2"></div><div class="grid"></div></div>
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>

  <div id="logo"><img src="assets/logo-full.png" alt="LUMA" /></div>
  <div id="step">ÉTAPE 1</div>

  <div id="cardA">
    <div class="mascot"><img src="assets/mascot.png" alt="" /></div>
    <div class="t">Audit</div>
    <div class="l1" id="cardA-l1">avec le chef d'entreprise</div>
    <div class="chip" id="cardA-chip">COMPLÈTEMENT GRATUIT</div>
    <div class="l2" id="cardA-l2">Comprendre comment vous fonctionnez</div>
  </div>

  <div class="panel" id="p1"><span class="ic">${icTools}</span><span class="t">Vos outils</span>
    <span class="mini"><span class="tool">${icMail}</span><span class="tool">${icCal}</span><span class="tool">${icChat}</span><span class="tool">${icSheet}</span></span></div>
  <div class="panel" id="p2"><span class="ic">${icTarget}</span><span class="t">Vos objectifs</span>
    <span class="mini goals"><i class="goal" style="height:40%"></i><i class="goal" style="height:65%"></i><i class="goal" style="height:100%"></i></span></div>
  <div class="panel" id="p3"><span class="ic">${icPulse}</span><span class="t">Situation actuelle</span>
    <span class="mini"><span class="gauge"><i></i><b id="gauge-dot"></b></span></span></div>

  <div id="card1">
    <div class="n">1</div>
    <div class="k">PREMIÈREMENT</div>
    <div id="clock"><svg viewBox="0 0 190 190">
      <circle cx="95" cy="95" r="80" stroke="rgba(247,248,252,0.22)" stroke-width="12" fill="none"/>
      <circle id="ring" cx="95" cy="95" r="80" stroke="${C.blue}" stroke-width="12" fill="none" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" transform="rotate(-90 95 95)"/>
      <path id="hands" d="M95 95 V52 M95 95 L122 108" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="95" cy="95" r="7" fill="#fff"/>
    </svg></div>
    <div class="t" id="card1-t">Gagner du temps</div>
  </div>

  <div id="endcard"><img src="assets/logo-end.png" alt="LUMA — Agents IA pour les entreprises" /></div>

  <div id="caps"></div>
  <div id="grain"></div>

  <audio id="voice" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="5" data-volume="0.93" src="assets/voice.m4a"></audio>
${sfxAudio}
</div>
`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<title>LUMA — Audit gratuit</title>
<!-- GENERATED by build.mjs — edit build.mjs / motion.js / assets/plan.json, then run: node build.mjs -->
<script src="assets/gsap.min.js"></script>
<style>${css}</style>
</head>
<body>
${body}
<script>window.__PLAN = ${JSON.stringify({ composition: ID, duration: DUR, footageDuration: FOOTAGE_DUR, captions: plan.captions, events: plan.events })};</script>
<script>/* inlined from motion.js by build.mjs — edit motion.js, not this block */
${motion}</script>
</body>
</html>
`;
writeFileSync(resolve(root, "index.html"), html);
console.log(`index.html written — ${ID}, ${DUR}s, ${plan.captions.length} caption groups, ${plan.events.length} events, ${plan.events.filter((e) => e.sfx).length} sfx`);
