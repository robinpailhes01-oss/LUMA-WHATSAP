#!/usr/bin/env node
// Builds index.html from assets/plan.json + the structure/style below.
// Animations live in motion.js; timing (captions, scenes, events) in assets/plan.json.
// Usage: node build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition;
const DUR = plan.duration;
const FOOTAGE_DUR = 15.2;

// ---- brand tokens (LUMA_References_Video.md §5) ----
const C = {
  bg: "#10182B",
  surface: "#F7F8FC",
  blue: "#4263F5",
  violet: "#8A5CF6",
  muted: "#68738A",
  mutedDark: "#4E5A70",
  ink: "#10182B",
};

const fontFace = `
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
`;

const glass = `
  /* navy-tinted liquid glass: white text stays readable over the bright sky/sea (LUMA §6 lisibilité) */
  background:
    linear-gradient(135deg, rgba(16,24,43,0.66) 0%, rgba(16,24,43,0.56) 45%, rgba(24,34,60,0.52) 75%, rgba(16,24,43,0.62) 100%);
  backdrop-filter: blur(16px) saturate(1.15);
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
  border: 1px solid rgba(255,255,255,0.26);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 18px 40px rgba(16,24,43,0.35), 0 2px 6px rgba(16,24,43,0.18);
`;

const css = `
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: ${C.bg}; font-family: "Inter", sans-serif; color: ${C.surface}; }
#root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: ${C.bg}; }

/* abstract brand background (visible behind the vignette) */
#bg { position: absolute; inset: 0; background: ${C.bg}; z-index: 0; }
#bg .g1, #bg .g2 { position: absolute; border-radius: 50%; }
#bg .g1 { left: -200px; top: -300px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(66,99,245,0.55) 0%, rgba(66,99,245,0.18) 40%, rgba(66,99,245,0) 68%); }
#bg .g2 { left: 900px; top: 200px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(138,92,246,0.42) 0%, rgba(138,92,246,0.14) 40%, rgba(138,92,246,0) 68%); }
#bg .grid { position: absolute; inset: 0; opacity: 0.16;
  background-image: linear-gradient(rgba(247,248,252,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(247,248,252,0.18) 1px, transparent 1px);
  background-size: 96px 96px; }

/* footage: #frame is the picture frame (vignette), #cam is the camera framing */
#frame { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: hidden; transform-origin: 0 0; z-index: 1; border-radius: 0px; background: ${C.bg}; }
#cam { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; will-change: transform; }
#poster, #footage { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; display: block; object-fit: cover; }
#footage { filter: contrast(1.03) saturate(1.05); }

/* kicker + wordmark */
.pillglass { ${glass} border-radius: 14px; }
#kicker { position: absolute; left: 80px; top: 64px; z-index: 5; display: inline-flex; align-items: center; gap: 12px; padding: 12px 20px 12px 16px;
  font-weight: 600; font-size: 22px; letter-spacing: 0.18em; color: ${C.surface}; }
#kicker .dot { width: 10px; height: 10px; border-radius: 50%; background: ${C.blue}; box-shadow: 0 0 0 4px rgba(66,99,245,0.25); }
#wordmark { position: absolute; right: 80px; top: 62px; z-index: 5; padding: 10px 18px; font-weight: 800; font-size: 30px; letter-spacing: 0.08em; color: ${C.surface}; }

/* left glass panels with mini interfaces */
.panel { position: absolute; left: 90px; width: 640px; height: 230px; z-index: 4; border-radius: 22px; padding: 22px 26px; ${glass}
  color: ${C.surface}; overflow: hidden; }
#p1 { top: 150px; } #p2 { top: 410px; } #p3 { top: 670px; }
.panel .head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.panel .head .ic { width: 30px; height: 30px; border-radius: 9px; background: ${C.blue}; display: flex; align-items: center; justify-content: center; flex: 0 0 30px; }
.panel .head .ic svg { width: 18px; height: 18px; }
.panel .head .t { font-weight: 600; font-size: 24px; letter-spacing: -0.01em; }
.panel .head .st { margin-left: auto; font-weight: 600; font-size: 15px; letter-spacing: 0.12em; color: ${C.surface}; opacity: 0.8; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); }
.bubble { display: inline-block; max-width: 520px; padding: 11px 16px; border-radius: 16px; font-weight: 500; font-size: 21px; line-height: 1.25; }
.bubble.in { background: rgba(247,248,252,0.92); color: ${C.ink}; border-bottom-left-radius: 6px; }
.bubble.out { background: ${C.blue}; color: #fff; border-bottom-right-radius: 6px; }
.bubrow { display: flex; margin-top: 8px; } .bubrow.r { justify-content: flex-end; }
.row { display: flex; align-items: center; gap: 12px; height: 38px; margin-top: 6px; font-weight: 500; font-size: 21px; }
.row .bar { flex: 1; height: 10px; border-radius: 5px; background: rgba(247,248,252,0.22); overflow: hidden; }
.row .bar i { display: block; height: 100%; width: 100%; background: ${C.blue}; transform-origin: 0 50%; transform: scaleX(0); }
.row .chk { width: 26px; height: 26px; border-radius: 50%; border: 2px solid rgba(247,248,252,0.6); display: flex; align-items: center; justify-content: center; flex: 0 0 26px; }
.row .chk svg { width: 14px; height: 14px; opacity: 0; }
.row .chk.on { background: ${C.blue}; border-color: ${C.blue}; }
.week { display: flex; gap: 10px; margin-top: 4px; }
.day { flex: 1; height: 112px; border-radius: 12px; background: rgba(247,248,252,0.10); border: 1px solid rgba(255,255,255,0.22); padding: 10px 0 0; text-align: center; font-weight: 600; font-size: 16px; letter-spacing: 0.08em; color: rgba(247,248,252,0.85); position: relative; }
.day .slot { position: absolute; left: 8px; right: 8px; top: 44px; height: 54px; border-radius: 9px; background: ${C.blue}; color: #fff; font-weight: 600; font-size: 17px; letter-spacing: 0; line-height: 1.15; padding-top: 8px; box-shadow: 0 6px 16px rgba(66,99,245,0.45); }
#company { position: absolute; left: 90px; top: 116px; z-index: 5; padding: 6px 12px; border-radius: 8px; background: ${C.blue}; color: #fff; font-weight: 600; font-size: 15px; letter-spacing: 0.14em; }

/* right object: company card + projection */
#card { position: absolute; left: 1180px; top: 300px; width: 560px; height: 300px; z-index: 4; border-radius: 24px; padding: 26px 30px; ${glass} transform-origin: 0 100%; }
#card .t { font-weight: 700; font-size: 28px; letter-spacing: -0.01em; }
#card .s { font-weight: 500; font-size: 17px; letter-spacing: 0.12em; color: rgba(247,248,252,0.75); margin-top: 4px; }
#chart { position: absolute; left: 30px; bottom: 26px; right: 30px; height: 150px; display: flex; align-items: flex-end; gap: 22px; border-bottom: 1px solid rgba(255,255,255,0.35); padding-bottom: 0; }
#chart b { display: block; flex: 1; border-radius: 8px 8px 2px 2px; background: linear-gradient(180deg, ${C.violet} 0%, ${C.blue} 100%); transform-origin: 50% 100%; transform: scaleY(0); box-shadow: 0 8px 20px rgba(66,99,245,0.35); }
#chart b.b1 { height: 42%; } #chart b.b2 { height: 64%; } #chart b.b3 { height: 88%; } #chart b.b4 { height: 100%; opacity: 0.55; }
#outline { position: absolute; left: 1180px; top: 234px; width: 683px; height: 366px; z-index: 3; opacity: 0; visibility: hidden; }
#outline svg { display: block; width: 683px; height: 366px; overflow: visible; }
#tag { position: absolute; left: 1740px; top: 204px; z-index: 5; opacity: 0; visibility: hidden; padding: 7px 14px; border-radius: 9px; background: ${C.blue}; color: #fff; font-weight: 600; font-size: 17px; letter-spacing: 0.16em; }

/* AI chips docking around the card */
.chip { position: absolute; z-index: 5; display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px 12px 12px; border-radius: 999px; ${glass}
  font-weight: 600; font-size: 21px; color: ${C.surface}; white-space: nowrap; opacity: 0; visibility: hidden; }
.chip .ic { width: 28px; height: 28px; border-radius: 50%; background: ${C.blue}; display: flex; align-items: center; justify-content: center; }
.chip .ic svg { width: 16px; height: 16px; }
#chip1 { left: 1180px; top: 150px; } #chip2 { left: 1520px; top: 150px; } #chip3 { left: 1180px; top: 650px; }
#links { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; z-index: 3; pointer-events: none; }
#links path { fill: none; stroke: ${C.blue}; stroke-width: 3; stroke-linecap: round; }

/* captions: static group, active word on blue */
#caps { position: absolute; left: 0; right: 0; top: 924px; z-index: 6; pointer-events: none; }
.cg { position: absolute; left: 160px; right: 160px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.32em; font-weight: 600; font-size: 43px; line-height: 1.2; color: #fff; text-shadow: 0 2px 10px rgba(16,24,43,0.7), 0 0 2px rgba(16,24,43,0.9); white-space: nowrap; }
.cg .w { display: inline-block; padding: 6px 12px; border-radius: 10px; }
.cg .w.on { background: ${C.blue}; text-shadow: none; }

/* outro: documents + signature */
#outro { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
#docs { position: absolute; left: 1010px; top: 180px; width: 800px; height: 520px; perspective: 1400px; }
.doc { position: absolute; width: 380px; height: 460px; border-radius: 18px; padding: 30px 28px; ${glass} transform-style: preserve-3d; opacity: 0; visibility: hidden; }
#d1 { left: 0; top: 40px; } #d2 { left: 150px; top: 20px; } #d3 { left: 300px; top: 0; }
.doc .h { height: 16px; width: 60%; border-radius: 8px; background: ${C.blue}; margin-bottom: 22px; }
.doc .l { height: 11px; border-radius: 6px; background: rgba(247,248,252,0.42); margin-bottom: 14px; }
.doc .l.s { width: 70%; } .doc .l.m { width: 85%; }
.doc .k { margin-top: 26px; height: 64px; border-radius: 12px; background: rgba(247,248,252,0.14); border: 1px solid rgba(255,255,255,0.28); }
#sig { position: absolute; left: 1010px; top: 740px; z-index: 6; }
#sig .lm { font-weight: 800; font-size: 72px; letter-spacing: 0.06em; color: ${C.surface}; line-height: 1; }
#sig .tl { font-weight: 500; font-size: 34px; color: rgba(247,248,252,0.86); margin-top: 16px; letter-spacing: -0.005em; }
#sig .dash { display: inline-block; width: 28px; height: 4px; border-radius: 2px; background: ${C.blue}; vertical-align: middle; margin: 0 14px 6px 0; }
#sig .lm, #sig .tl { opacity: 0; visibility: hidden; }

#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.07; mix-blend-mode: overlay;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.2px), radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1.2px);
  background-size: 3px 3px, 5px 5px; background-position: 0 0, 1px 2px; }
`;

const svgCheck = `<svg viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg>`;
const svgChat = `<svg viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h12v8H8l-4 3v-3H3z"/></svg>`;
const svgBell = `<svg viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12V8a4 4 0 0 1 8 0v4l1.5 2h-11z"/><path d="M7.5 15.5a1.5 1.5 0 0 0 3 0"/></svg>`;
const svgCal = `<svg viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 8h12M7 2.5v3M11 2.5v3"/></svg>`;

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="1920" data-height="1080" data-duration="${DUR}">
  <div id="bg"><div class="g1"></div><div class="g2"></div><div class="grid"></div></div>

  <div id="frame">
    <div id="cam">
      <img id="poster" src="assets/last-frame.jpg" alt="" />
      <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
    </div>
  </div>

  <div id="kicker" class="pillglass"><span class="dot"></span><span>AUDIT IA</span></div>
  <div id="wordmark" class="pillglass">LUMA</div>

  <div id="company">VOTRE ENTREPRISE</div>
  <div class="panel" id="p1">
    <div class="head"><span class="ic">${svgChat}</span><span class="t">Réponses clients</span><span class="st">24/7</span></div>
    <div class="bubrow"><span class="bubble in" id="p1b1">Vous êtes ouverts dimanche ?</span></div>
    <div class="bubrow r"><span class="bubble out" id="p1b2">Oui, de 9h à 13h. Je vous réserve un créneau ?</span></div>
  </div>
  <div class="panel" id="p2">
    <div class="head"><span class="ic">${svgBell}</span><span class="t">Relances automatiques</span><span class="st">AUTO</span></div>
    <div class="row" id="p2r1"><span>Devis n° 2041</span><span class="bar"><i></i></span><span class="chk">${svgCheck}</span></div>
    <div class="row" id="p2r2"><span>Facture n° 118</span><span class="bar"><i></i></span><span class="chk">${svgCheck}</span></div>
    <div class="row" id="p2r3"><span>Devis n° 2043</span><span class="bar"><i></i></span><span class="chk">${svgCheck}</span></div>
  </div>
  <div class="panel" id="p3">
    <div class="head"><span class="ic">${svgCal}</span><span class="t">Prise de rendez-vous</span><span class="st">AGENDA</span></div>
    <div class="week">
      <div class="day">LUN</div>
      <div class="day">MAR<div class="slot" id="p3slot">10:30<br>Confirmé</div></div>
      <div class="day">MER</div>
      <div class="day">JEU</div>
      <div class="day">VEN</div>
    </div>
  </div>

  <div id="outline"><svg viewBox="0 0 683 366" fill="none"><rect id="outline-rect" x="1" y="1" width="681" height="364" rx="30" stroke="${C.blue}" stroke-width="2.5" pathLength="2000" style="stroke-dasharray:2000; stroke-dashoffset:2000;" /></svg></div>
  <div id="tag">DEMAIN</div>
  <div id="card">
    <div class="t">Votre entreprise</div>
    <div class="s">ACTIVITÉ</div>
    <div id="chart"><b class="b1"></b><b class="b2"></b><b class="b3"></b><b class="b4"></b></div>
  </div>
  <svg id="links" viewBox="0 0 1920 1080">
    <path id="lk1" d="M1300 206 C1300 250, 1300 270, 1300 300" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" />
    <path id="lk2" d="M1650 206 C1650 250, 1650 270, 1650 300" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" />
    <path id="lk3" d="M1300 650 C1300 630, 1300 615, 1300 600" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" />
  </svg>
  <div class="chip" id="chip1"><span class="ic">${svgChat}</span>Réponses 24/7</div>
  <div class="chip" id="chip2"><span class="ic">${svgBell}</span>Relances</div>
  <div class="chip" id="chip3"><span class="ic">${svgCal}</span>Rendez-vous</div>

  <div id="outro">
    <div id="docs">
      <div class="doc" id="d1"><div class="h"></div><div class="l"></div><div class="l m"></div><div class="l s"></div><div class="l"></div><div class="k"></div></div>
      <div class="doc" id="d2"><div class="h"></div><div class="l m"></div><div class="l"></div><div class="l s"></div><div class="l m"></div><div class="k"></div></div>
      <div class="doc" id="d3"><div class="h"></div><div class="l"></div><div class="l s"></div><div class="l m"></div><div class="l"></div><div class="k"></div></div>
    </div>
    <div id="sig"><div class="lm">LUMA</div><div class="tl"><span class="dash"></span>Votre partenaire IA de croissance.</div></div>
  </div>

  <div id="caps"></div>
  <div id="grain"></div>

  <audio id="voice" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="5" data-volume="1" src="assets/voice.m4a"></audio>
</div>
`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<title>LUMA — Audit IA</title>
<!-- GENERATED by build.mjs — edit build.mjs (structure/style), motion.js (animation) or assets/plan.json (timing), then run: node build.mjs -->
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
console.log(`index.html written (${(html.length / 1024).toFixed(1)} KB) — composition ${ID}, ${DUR}s, ${plan.captions.length} caption groups, ${plan.events.length} events`);
