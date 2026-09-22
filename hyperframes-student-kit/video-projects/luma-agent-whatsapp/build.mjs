#!/usr/bin/env node
// Builds index.html from assets/plan.json + structure/style below. Animations: motion.js (inlined). Usage: node build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition, DUR = plan.duration, FOOTAGE_DUR = plan.footageDuration;
const C = { bg: "#10182B", surface: "#F7F8FC", white: "#FFFFFF", blue: "#4263F5", violet: "#8A5CF6", mutedDark: "#4E5A70", ink: "#10182B", wa: "#111B21" };

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
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 18px 40px rgba(16,24,43,0.35), 0 2px 6px rgba(16,24,43,0.18);`;
const whiteCard = `background: ${C.white}; border: 1px solid rgba(16,24,43,0.06); box-shadow: 0 22px 48px rgba(16,24,43,0.30), 0 2px 6px rgba(16,24,43,0.12);`;

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

/* generic glass panel in the left column */
.gp { position: absolute; left: 90px; width: 640px; z-index: 4; border-radius: 20px; padding: 20px 24px; ${glass} color: ${C.surface}; }
.gp .h { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 24px; letter-spacing: -0.01em; }
.gp .h .ic { width: 34px; height: 34px; border-radius: 10px; background: ${C.blue}; display: flex; align-items: center; justify-content: center; flex: 0 0 34px; }
.gp .h .ic svg { width: 20px; height: 20px; }
.gp .h .hl { padding: 2px 8px; border-radius: 6px; }

/* tools */
#tools { top: 150px; height: 150px; }
#tools .tiles { display: flex; gap: 14px; margin-top: 16px; }
.tile { width: 64px; height: 64px; border-radius: 16px; background: rgba(247,248,252,0.14); border: 1px solid rgba(255,255,255,0.28); display: flex; align-items: center; justify-content: center; }
.tile svg { width: 30px; height: 30px; }
.tile.on { background: ${C.blue}; border-color: ${C.blue}; box-shadow: 0 8px 18px rgba(66,99,245,0.4); }

/* subscriptions + counter */
#subs { top: 330px; height: 214px; }
#subs .row { position: relative; display: flex; align-items: center; gap: 12px; height: 40px; margin-top: 8px; font-weight: 500; font-size: 22px; padding: 0 8px; border-radius: 10px; }
#subs .row .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(247,248,252,0.6); }
#subs .row .strike { position: absolute; left: 8px; right: 8px; top: 50%; height: 3px; background: ${C.violet}; border-radius: 2px; transform-origin: 0 50%; }
#subs .row.crm { background: rgba(66,99,245,0); }
#saving { top: 574px; height: 170px; display: flex; flex-direction: column; justify-content: center; }
#saving .big { font-weight: 800; font-size: 72px; letter-spacing: -0.03em; line-height: 1; color: ${C.surface}; font-variant-numeric: tabular-nums; }
#saving .big b { color: ${C.blue}; font-weight: 800; }
#saving .lbl { margin-top: 8px; font-weight: 600; font-size: 20px; letter-spacing: 0.12em; color: rgba(247,248,252,0.8); }

/* right zone: phone + chips */
#ghost { position: absolute; left: 1440px; top: 90px; width: 420px; height: 800px; z-index: 3; opacity: 0; visibility: hidden; }
#ghost svg { width: 420px; height: 800px; display: block; overflow: visible; }
#fier { position: absolute; left: 1180px; top: 100px; z-index: 5; padding: 8px 14px; border-radius: 9px; background: ${C.blue}; color: #fff; font-weight: 600; font-size: 16px; letter-spacing: 0.14em; }
#phone { position: absolute; left: 1440px; top: 90px; width: 420px; height: 800px; z-index: 4; border-radius: 44px; background: #0B0F1A; padding: 10px; box-shadow: 0 30px 60px rgba(16,24,43,0.5), inset 0 0 0 2px rgba(255,255,255,0.12); }
#screen { position: relative; width: 400px; height: 780px; border-radius: 36px; overflow: hidden; background: ${C.wa}; }
#chat { position: absolute; left: 0; top: 0; width: 400px; }
#chat img { display: block; width: 400px; }
#chat .sep { height: 14px; }
.chip { position: absolute; z-index: 5; display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px 12px 12px; border-radius: 999px; ${glass} font-weight: 600; font-size: 21px; color: ${C.surface}; white-space: nowrap; }
.chip .ic { width: 30px; height: 30px; border-radius: 50%; background: ${C.blue}; display: flex; align-items: center; justify-content: center; }
.chip .ic svg { width: 17px; height: 17px; }
.chip .ic.sun { background: #F2B33D; }
#chipHum { left: 1180px; top: 170px; }
#chipTools { left: 1180px; top: 330px; }
#chipMeteo { left: 1180px; top: 450px; }
#links { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; z-index: 3; pointer-events: none; }
#links path { fill: none; stroke: ${C.blue}; stroke-width: 3; stroke-linecap: round; }

/* dashboard */
.lead { position: absolute; left: 90px; width: 640px; height: 76px; z-index: 5; border-radius: 16px; ${whiteCard} display: flex; align-items: center; gap: 14px; padding: 0 18px; color: ${C.ink}; }
.lead .av { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, ${C.blue}, ${C.violet}); flex: 0 0 42px; }
.lead .t { font-weight: 600; font-size: 21px; }
.lead .s { font-weight: 500; font-size: 16px; color: ${C.mutedDark}; margin-top: 2px; }
.lead .badge { margin-left: auto; padding: 6px 12px; border-radius: 8px; background: rgba(66,99,245,0.12); color: ${C.blue}; font-weight: 700; font-size: 15px; letter-spacing: 0.1em; opacity: 0; visibility: hidden; }
#lead1 { top: 150px; } #lead2 { top: 240px; } #lead3 { top: 330px; }
#table { position: absolute; left: 90px; top: 420px; width: 640px; height: 340px; z-index: 4; border-radius: 20px; padding: 18px 24px; ${glass} }
#table .h { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 24px; }
#table .h .ic { width: 34px; height: 34px; border-radius: 10px; background: ${C.blue}; display: flex; align-items: center; justify-content: center; }
#table .h .ic svg { width: 20px; height: 20px; }
#table .slot { position: absolute; left: 24px; right: 24px; height: 76px; border-radius: 16px; border: 1px dashed rgba(247,248,252,0.35); }
#table .s1 { top: 76px; } #table .s2 { top: 166px; } #table .s3 { top: 256px; }
#relance { position: absolute; left: 570px; top: 508px; z-index: 6; display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 10px; background: ${C.blue}; color: #fff; font-weight: 700; font-size: 16px; letter-spacing: 0.08em; box-shadow: 0 8px 18px rgba(66,99,245,0.4); }
#relance svg { width: 16px; height: 16px; }

/* captions */
#caps { position: absolute; left: 0; right: 0; top: 924px; z-index: 6; pointer-events: none; }
.cg { position: absolute; left: 160px; right: 160px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.32em; font-weight: 600; font-size: 43px; line-height: 1.2; color: #fff; text-shadow: 0 2px 10px rgba(16,24,43,0.7), 0 0 2px rgba(16,24,43,0.9); white-space: nowrap; }
.cg .w { display: inline-block; padding: 6px 12px; border-radius: 10px; }

/* outro */
#endcard { position: absolute; left: 1130px; top: 340px; width: 600px; height: 400px; z-index: 5; border-radius: 28px; overflow: hidden; ${whiteCard} }
#endcard img { display: block; width: 100%; height: 100%; object-fit: cover; }
#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.07; mix-blend-mode: overlay;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.2px), radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1.2px); background-size: 3px 3px, 5px 5px; }
`;

const S = (d, col = "#fff") => `<svg viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icTools = S('<path d="M14.7 6.3a4 4 0 0 0 5 5L13 18l-3-3 6.7-6.7z"/><path d="M4 20l4-4"/>');
const icMail = S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>');
const icCal = S('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>');
const icChat = S('<path d="M4 5h16v11H9l-5 4z"/>');
const icSheet = S('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>');
const icCard = S('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>');
const icSun = S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
const icHeart = S('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>');
const icGrid = S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>');
const icUser = S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>');

const sfxAudio = plan.events.filter((e) => e.sfx).map((e) => {
  const dur = { pop: 0.16, tick: 0.12, whoosh: 0.7, swell: 1.1 }[e.sfx];
  const vol = { pop: 0.14, tick: 0.1, whoosh: 0.14, swell: 0.15 }[e.sfx];
  const track = e.sfx === "whoosh" ? 7 : 6;
  return `  <audio id="sfx-${e.id}" data-start="${e.time}" data-duration="${dur}" data-track-index="${track}" data-volume="${vol}" src="assets/sfx/${e.sfx}.m4a"></audio>`;
}).join("\n");

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="1920" data-height="1080" data-duration="${DUR}">
  <div id="bg"><div class="g1"></div><div class="g2"></div><div class="grid"></div></div>
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>

  <!-- left column, sequence 1 -->
  <div class="gp" id="tools"><div class="h"><span class="ic">${icTools}</span>Mes outils</div>
    <div class="tiles"><span class="tile" id="tile1">${icChat}</span><span class="tile" id="tile2">${icMail}</span><span class="tile" id="tile3">${icCal}</span><span class="tile" id="tile4">${icSheet}</span></div></div>
  <div class="gp" id="subs"><div class="h"><span class="ic">${icCard}</span><span class="hl" id="subs-title">Abonnements</span></div>
    <div class="row crm" id="r-crm"><span class="dot"></span>CRM<span class="strike" id="k1"></span></div>
    <div class="row" id="r-2"><span class="dot"></span>Emailing<span class="strike" id="k2"></span></div>
    <div class="row" id="r-3"><span class="dot"></span>Agenda<span class="strike" id="k3"></span></div></div>
  <div class="gp" id="saving"><div class="big">≈ <b id="amount">0</b> €</div><div class="lbl" id="perYear">/ AN · ÉCONOMISÉS</div></div>

  <!-- right zone, sequence 2 -->
  <div id="ghost"><svg viewBox="0 0 420 800" fill="none"><rect id="ghost-rect" x="1" y="1" width="418" height="798" rx="44" stroke="${C.blue}" stroke-width="2.5" pathLength="2000" style="stroke-dasharray:2000; stroke-dashoffset:2000;"/></svg></div>
  <div id="fier">LE PLUS FIER</div>
  <div id="phone"><div id="screen">
    <div id="chat"><img src="assets/shots/wa1.png" alt="" /><div class="sep"></div><img src="assets/shots/wa2.png" alt="" /></div>
  </div></div>
  <svg id="links" viewBox="0 0 1920 1080">
    <path id="lkT" d="M1400 360 C1420 360, 1425 360, 1440 360" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" />
    <path id="lkM" d="M1362 480 C1400 480, 1410 480, 1440 480" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;" />
  </svg>
  <div class="chip" id="chipHum"><span class="ic">${icHeart}</span>Relation humaine</div>
  <div class="chip" id="chipTools"><span class="ic">${icTools}</span>Mes outils</div>
  <div class="chip" id="chipMeteo"><span class="ic sun" id="sunIc">${icSun}</span>Météo</div>

  <!-- left column, sequence 3 -->
  <div id="table"><div class="h"><span class="ic">${icGrid}</span>Tableau de bord</div><div class="slot s1"></div><div class="slot s2"></div><div class="slot s3"></div></div>
  <div class="lead" id="lead1"><span class="av"></span><span><div class="t">Demande de tarifs</div><div class="s">Nuit Prestige · lundi 14</div></span><span class="badge" id="b1">QUALIFIÉ</span></div>
  <div class="lead" id="lead2"><span class="av"></span><span><div class="t">Repas à bord</div><div class="s">Petit-déjeuner inclus</div></span><span class="badge" id="b2">QUALIFIÉ</span></div>
  <div class="lead" id="lead3"><span class="av"></span><span><div class="t">Coucher de soleil</div><div class="s">Sortie en mer 18h</div></span><span class="badge" id="b3">QUALIFIÉ</span></div>
  <div id="relance">${icUser}RELANCE</div>

  <div id="endcard"><img src="assets/logo-end.png" alt="LUMA — Agents IA pour les entreprises" /></div>
  <div id="caps"></div>
  <div id="grain"></div>
  <audio id="voice" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="5" data-volume="1" src="assets/voice.m4a"></audio>
${sfxAudio}
</div>`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<title>LUMA — L'agent WhatsApp</title>
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
