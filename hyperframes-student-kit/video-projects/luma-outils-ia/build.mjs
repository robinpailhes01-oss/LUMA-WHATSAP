#!/usr/bin/env node
// Builds index.html from assets/plan.json + structure/style below. Animations: motion.js (inlined). Usage: node build.mjs
// Réel LUMA « les 3 outils IA de mon entreprise », vertical 1080×1920 (rushes natifs). Brand rules: ../luma-film/LUMA_Bibliotheque_Marque.md
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition, DUR = plan.duration, FOOTAGE_DUR = plan.footageDuration;
const W = 1080, H = 1920;

const B = { night: "#0B0F2D", blue: "#3B82F6", violet: "#7C3AED", offwhite: "#F8FAFC", grayUI: "#E5E7EB", wa: "#25D366", ink: "#0B0F2D", muted: "#5B6478" };

const icon = (name, color, size = 44) => {
  const svg = readFileSync(resolve(root, `assets/icons/${name}.svg`), "utf8");
  const d = svg.match(/ d="([^"]+)"/)[1];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="${color}" d="${d}"/></svg>`;
};
const sun = (s = 44) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="#F59E0B"/><g stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round"><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></g></svg>`;
const calendar = (s = 22) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="#fff" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
const arrowRight = `<svg viewBox="0 0 32 24" width="34" height="26" aria-hidden="true"><path d="M3 12h24M17 3l10 9-10 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const check = (s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M4 12.5l5 5L20 7" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const handles = `<i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>`;

const fonts = readFileSync(resolve(root, "assets/fonts/fonts.css"), "utf8").replace(/^\/\*[\s\S]*?\*\/\n/, "");
const fontInter = `
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Inter"; font-style: normal; font-weight: 400 800; font-display: block;
  src: url(assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
`;
const whiteCard = `background: #fff; border: 1px solid rgba(11,15,45,0.06); box-shadow: 0 18px 40px rgba(11,15,45,0.28), 0 2px 6px rgba(11,15,45,0.12);`;
const navyCard = `background: linear-gradient(160deg, #0F1540 0%, ${B.night} 60%, #0A0E2A 100%); border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 22px 48px rgba(11,15,45,0.45), inset 0 1px 0 rgba(255,255,255,0.10);`;
const gradText = `background: linear-gradient(90deg, ${B.blue} 0%, ${B.violet} 100%); -webkit-background-clip: text; background-clip: text; color: transparent;`;
const barlow = `font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.005em; line-height: 0.92;`;
const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")`;

const css = `
${fontInter}
${fonts}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: ${B.night}; font-family: "Inter", sans-serif; color: ${B.offwhite}; }
#root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${B.night}; }
#frame { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; overflow: hidden; transform-origin: 50% 50%; z-index: 1; background: ${B.night}; }
#cam { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; transform-origin: 0 0; will-change: transform; }
#poster, #footage { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; display: block; object-fit: cover; }
#footage { filter: contrast(1.02) saturate(1.04); }
#scrim { position: absolute; left: 0; top: 0; width: ${W}px; height: 620px; z-index: 2; pointer-events: none; background: linear-gradient(180deg, rgba(11,15,45,0.62) 0%, rgba(11,15,45,0.42) 45%, rgba(11,15,45,0) 100%); }

#logo { position: absolute; left: 40px; top: 60px; z-index: 5; width: 214px; height: 74px; border-radius: 18px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#logo img { width: 172px; height: auto; display: block; }
#counter { position: absolute; right: 40px; top: 62px; z-index: 5; width: 150px; height: 70px; border-radius: 999px; ${navyCard} }
#counter span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; ${barlow} font-size: 44px; color: #fff; }
#counter span b { ${gradText} font-weight: 800; }

/* hook */
#hook { position: absolute; left: 50px; top: 150px; width: 980px; z-index: 5; }
#hook .k { font-weight: 600; font-size: 24px; letter-spacing: 0.16em; color: #fff; text-transform: uppercase; margin-bottom: 8px; opacity: 0.9; text-shadow: 0 2px 10px rgba(11,15,45,0.6); }
#hook .t { ${barlow} font-size: 170px; color: #fff; text-shadow: 0 6px 26px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.6); }
#hook .t .g { color: #8FBBFF; }
#hook .s { font-weight: 600; font-size: 36px; color: #fff; margin-top: 14px; text-shadow: 0 2px 12px rgba(11,15,45,0.6); }
#hook .ul { position: absolute; left: 0; bottom: -18px; width: 320px; height: 8px; }
#stat3h { position: absolute; left: 50px; top: 170px; width: 980px; z-index: 5; display: flex; align-items: center; gap: 30px; }
#stat3h .big { ${barlow} font-size: 200px; ${gradText} filter: drop-shadow(0 6px 22px rgba(11,15,45,0.5)); }
#stat3h .unit { ${barlow} font-weight: 700; font-size: 70px; color: #fff; text-shadow: 0 3px 14px rgba(11,15,45,0.6); }
#stat3h .sub { font-weight: 500; font-size: 30px; color: #fff; margin-top: 6px; text-shadow: 0 2px 12px rgba(11,15,45,0.6); }

/* section titles (top-left) */
.title { position: absolute; left: 50px; top: 150px; width: 620px; z-index: 5; }
.title .k { font-weight: 600; font-size: 22px; letter-spacing: 0.16em; color: #fff; text-transform: uppercase; margin-bottom: 8px; text-shadow: 0 2px 10px rgba(11,15,45,0.6); opacity: 0.9; }
.title .t { ${barlow} font-size: 96px; color: #fff; text-shadow: 0 4px 22px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.6); }
.title .t .g { color: #8FBBFF; }

/* phone right column (FACE_LEFT) */
#phone, #wa { position: absolute; left: 740px; top: 560px; width: 310px; z-index: 5; border-radius: 42px; background: #0B0F2D; padding: 10px; box-shadow: 0 30px 70px rgba(11,15,45,0.55), 0 0 0 1px rgba(255,255,255,0.12); transform-origin: 50% 0; }
#phone { height: 560px; } #wa { height: 400px; }
#phone .screen, #wa .screen { position: relative; width: 290px; border-radius: 34px; overflow: hidden; background: #F3F5F9; }
#phone .screen { height: 540px; } #wa .screen { height: 380px; background: #0b141a; }
.scr { position: absolute; left: 0; top: 0; width: 290px; }
.scr img { display: block; width: 290px; height: auto; }
/* phone left column (FACE_RIGHT) : ChatGPT */
#gpt { position: absolute; left: 40px; top: 560px; width: 340px; height: 600px; z-index: 5; border-radius: 42px; background: #0B0F2D; padding: 10px; box-shadow: 0 30px 70px rgba(11,15,45,0.55), 0 0 0 1px rgba(255,255,255,0.12); transform-origin: 50% 0; }
#gpt .screen { position: relative; width: 320px; height: 580px; border-radius: 34px; overflow: hidden; background: #000; }
#gpt .screen img { display: block; width: 320px; height: auto; }
.selbox { position: absolute; border: 3px solid ${B.blue}; border-radius: 10px; box-shadow: 0 0 0 4px rgba(59,130,246,0.18), 0 8px 24px rgba(59,130,246,0.25); z-index: 3; }
.selbox i, .cg .w .fr i { position: absolute; width: 12px; height: 12px; background: #fff; border: 2.5px solid ${B.blue}; border-radius: 3px; }
.selbox .a, .cg .w .fr .a { left: -7px; top: -7px; } .selbox .b, .cg .w .fr .b { right: -7px; top: -7px; } .selbox .c, .cg .w .fr .c { left: -7px; bottom: -7px; } .selbox .d, .cg .w .fr .d { right: -7px; bottom: -7px; }

/* pills, chips, tiles */
.pill { position: absolute; z-index: 6; display: inline-flex; align-items: center; gap: 10px; padding: 11px 22px; border-radius: 999px; font-weight: 600; font-size: 26px; color: #fff; white-space: nowrap; box-shadow: 0 12px 28px rgba(11,15,45,0.35); background: ${B.blue}; }
.pill.v { background: ${B.violet}; }
.pill.n { background: rgba(11,15,45,0.92); border: 1px solid rgba(255,255,255,0.16); }
#pillFin, #pillMkt, #pillResa { left: 740px; top: 488px; }
#pAuto { left: 740px; top: 980px; } #pMoi { left: 740px; top: 1044px; } #pRegles { left: 740px; top: 1108px; } #pOutils { left: 740px; top: 1172px; }
#pme { left: 60px; top: 170px; } #ia { left: 60px; top: 244px; }
.chip { position: absolute; z-index: 6; display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px 9px 12px; border-radius: 999px; ${whiteCard} color: ${B.ink}; font-weight: 500; font-size: 22px; white-space: nowrap; }
.chip b { font-weight: 700; color: ${B.blue}; }
.chip .dot { width: 12px; height: 12px; border-radius: 50%; background: ${B.wa}; } .chip .dot.p { background: ${B.blue}; }
#chip1 { left: 740px; top: 1140px; } #chip2 { left: 740px; top: 1202px; }
.tile { position: absolute; width: 84px; height: 84px; z-index: 6; border-radius: 22px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#ia1 { left: 40px; top: 1180px; } #ia2 { left: 144px; top: 1180px; } #ia3 { left: 248px; top: 1180px; }
#tCal { left: 740px; top: 1246px; } #tCrm { left: 844px; top: 1246px; } #tMeteo { left: 948px; top: 1246px; }
.tile.dark { background: #0B0F2D; }

/* handwritten */
.hand { position: absolute; z-index: 7; font-family: "Caveat", cursive; font-weight: 600; color: ${B.blue}; text-shadow: 0 2px 10px rgba(11,15,45,0.35), 0 0 2px rgba(11,15,45,0.55); white-space: nowrap; }
#geoDef { left: 60px; top: 300px; font-size: 54px; color: #fff; }
#gptHand { left: 40px; top: 1284px; font-size: 48px; }
#meteoHand { left: 740px; top: 1340px; font-size: 44px; }
#dessous { left: 60px; top: 1060px; font-size: 54px; }
#dessous svg { position: absolute; left: 120px; top: 60px; width: 70px; height: 90px; }

/* top-right slot cards (section 2) */
.slot { position: absolute; left: 640px; top: 150px; width: 400px; z-index: 5; border-radius: 24px; padding: 18px 22px 20px; background: rgba(255,255,255,0.14); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.45); box-shadow: 0 12px 34px rgba(11,15,45,0.18); }
#stat20 { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
.slot .k { font-weight: 600; font-size: 20px; letter-spacing: 0.14em; color: #fff; text-transform: uppercase; text-shadow: 0 2px 10px rgba(11,15,45,0.5); }
.slot .t { font-weight: 600; font-size: 26px; color: #fff; margin-top: 6px; line-height: 1.2; text-shadow: 0 2px 10px rgba(11,15,45,0.5); }
.slot .bar { position: relative; height: 12px; border-radius: 999px; background: rgba(255,255,255,0.14); margin-top: 16px; overflow: hidden; }
.slot .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; border-radius: 999px; background: linear-gradient(90deg, ${B.blue}, ${B.violet}); transform-origin: 0 50%; }
.slot .big { ${barlow} font-size: 150px; ${gradText} margin-top: 0; filter: drop-shadow(0 6px 22px rgba(11,15,45,0.5)); }
.slot .sub { font-weight: 500; font-size: 26px; color: #fff; margin-top: 2px; text-shadow: 0 2px 12px rgba(11,15,45,0.6); }
.slot .row { display: flex; align-items: center; gap: 12px; margin-top: 8px; font-weight: 600; font-size: 25px; color: #fff; text-shadow: 0 2px 10px rgba(11,15,45,0.5); }
.slot .row .ic { width: 42px; height: 42px; border-radius: 12px; background: ${B.blue}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 42px; }

/* CTA */
#comment { position: absolute; left: 60px; top: 1250px; width: 960px; z-index: 6; border-radius: 26px; ${whiteCard} padding: 18px 22px; display: flex; align-items: center; gap: 16px; color: ${B.ink}; }
#comment .av { width: 58px; height: 58px; border-radius: 50%; background: linear-gradient(135deg, ${B.blue}, ${B.violet}); flex: 0 0 58px; }
#comment .box { flex: 1; height: 62px; border-radius: 999px; background: #F3F5F9; border: 1px solid ${B.grayUI}; display: flex; align-items: center; padding: 0 22px; font-size: 28px; font-weight: 500; }
#comment .box .ph { color: ${B.muted}; }
#comment .box .typed span { display: inline-block; }
#comment .box .cur { display: inline-block; width: 3px; height: 34px; background: ${B.blue}; margin-left: 2px; }
#comment .btn { padding: 14px 26px; border-radius: 999px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 26px; }
#auditCard { position: absolute; left: 60px; top: 150px; width: 960px; z-index: 5; border-radius: 34px; background: rgba(11,15,45,0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.28); box-shadow: 0 16px 40px rgba(11,15,45,0.25); padding: 30px 40px 32px; }
#auditCard .k { font-weight: 600; font-size: 24px; letter-spacing: 0.16em; color: ${B.blue}; text-transform: uppercase; }
#auditCard .row { display: flex; align-items: center; gap: 24px; }
#auditCard .t { ${barlow} font-size: 118px; ${gradText} }
#auditCard .badge { display: inline-flex; align-items: center; justify-content: center; padding: 10px 22px; border-radius: 999px; background: ${B.wa}; color: #fff; font-weight: 700; font-size: 34px; }
#auditCard .chk { display: flex; align-items: center; gap: 14px; margin-top: 12px; font-weight: 500; font-size: 30px; color: #fff; }
#auditCard .chk .c { width: 38px; height: 38px; border-radius: 50%; background: ${B.blue}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 38px; }
#auditCard .chks { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12); }

/* captions */
#caps { position: absolute; left: 0; right: 0; top: 1440px; z-index: 7; pointer-events: none; }
.cg { position: absolute; left: 50px; right: 50px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.3em; font-weight: 800; font-style: italic; font-size: 54px; line-height: 1.2; color: #fff; letter-spacing: -0.01em; text-shadow: 0 3px 4px rgba(11,15,45,0.85), 0 0 18px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.9); white-space: nowrap; }
.cg .w { position: relative; display: inline-block; padding: 4px 2px; }
.cg .w.sel { color: #8FBBFF; }
.cg .w .fr { position: absolute; left: -4px; top: -4px; right: -4px; bottom: -4px; border: 3px solid ${B.blue}; border-radius: 6px; opacity: 0; visibility: hidden; }

/* end card */
#endcard { position: absolute; inset: 0; z-index: 8; background: ${B.night}; overflow: hidden; }
#endcard .g1, #endcard .g2 { position: absolute; border-radius: 50%; }
#endcard .g1 { left: -420px; top: 120px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.16) 42%, rgba(59,130,246,0) 68%); }
#endcard .g2 { left: 180px; top: 700px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.16) 42%, rgba(124,58,237,0) 68%); }
#endcard .grid { position: absolute; inset: 0; opacity: 0.10; background-image: linear-gradient(rgba(248,250,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.35) 1px, transparent 1px); background-size: 90px 90px; }
#logoCard { position: absolute; left: 130px; top: 480px; width: 820px; height: 420px; border-radius: 40px; background: #fff; box-shadow: 0 40px 90px rgba(0,0,0,0.45), 0 0 80px rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; overflow: hidden; }
#logoCard img { width: 780px; height: auto; display: block; }
#sign { position: absolute; left: 0; width: ${W}px; top: 960px; text-align: center; font-family: "Caveat", cursive; font-weight: 600; font-size: 64px; color: #C4B5FD; }
#sign svg { position: absolute; left: 250px; top: 80px; width: 580px; height: 22px; }
#cta { position: absolute; left: 50%; top: 1130px; display: inline-flex; align-items: center; gap: 16px; padding: 26px 48px; border-radius: 999px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 38px; white-space: nowrap; box-shadow: 0 18px 44px rgba(59,130,246,0.5); }
#base { position: absolute; left: 0; width: ${W}px; top: 1260px; text-align: center; font-weight: 500; font-size: 22px; letter-spacing: 0.22em; color: rgba(248,250,252,0.6); text-transform: uppercase; }
#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.045; background-image: ${noise}; background-size: 300px 300px; mix-blend-mode: overlay; }
`;

const trackEnd = {};
const sfxAudio = plan.events.filter((e) => e.sfx).sort((a, b) => a.time - b.time).map((e) => {
  const dur = { pop: 0.16, tick: 0.12, whoosh: 0.7, swell: 1.1 }[e.sfx];
  const vol = { pop: 0.14, tick: 0.1, whoosh: 0.14, swell: 0.15 }[e.sfx];
  const pool = e.sfx === "whoosh" ? [7, 11] : e.sfx === "swell" ? [8] : [6, 9, 10];
  const track = pool.find((t) => (trackEnd[t] || -1) < e.time - 0.005) ?? pool[pool.length - 1];
  trackEnd[track] = e.time + dur;
  return `  <audio id="sfx-${e.id}" data-start="${e.time}" data-duration="${dur}" data-track-index="${track}" data-volume="${vol}" src="assets/sfx/${e.sfx}.m4a"></audio>`;
}).join("\n");

const tile = (id, inner, dark) => `<div class="tile${dark ? " dark" : ""}" id="${id}">${inner}</div>`;
const chip = (id, label, n, paid) => `<div class="chip" id="${id}"><span class="dot${paid ? " p" : ""}"></span>${label} <b>· ${n}</b></div>`;

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DUR}">
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>

  <div id="scrim"></div>
  <div id="counter"><span id="cn1"><b>1</b>/3</span><span id="cn2"><b>2</b>/3</span><span id="cn3"><b>3</b>/3</span></div>

  <div id="hook"><div class="k">Mon entreprise de location de bateau</div><div class="t">3 outils <span class="g">IA</span></div><div class="s" id="hookSub">que j'ai mis en place</div>
    <svg class="ul" viewBox="0 0 320 8"><path id="hookUl" d="M2 5 C60 2, 150 2, 318 4" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
  <div id="stat3h"><span class="big" id="s3">3 h</span><span><div class="unit" id="s3jour">/ jour</div><div class="sub" id="s3sub">économisées, chaque jour</div></span></div>

  <div class="title" id="t1"><div class="k">Outil 1/3</div><div class="t">Le tableau<br/><span class="g">de bord</span></div></div>
  <div class="title" id="t2"><div class="k">Outil 2/3</div><div class="t">Le <span class="g">GEO</span></div></div>
  <div class="title" id="t3"><div class="k">Outil 3/3</div><div class="t">L'agent<br/><span class="g">WhatsApp</span></div></div>

  <div id="phone"><div class="screen">
    <div class="scr" id="scrVue"><img src="assets/shots/vue.png" alt="" /></div>
    <div class="scr" id="scrFin"><img src="assets/shots/rapports.png" alt="" /></div>
    <div class="scr" id="scrMkt"><img src="assets/shots/canaux.png" alt="" /></div>
    <div class="scr" id="scrResa"><img src="assets/shots/resa.png" alt="" /></div>
    <div class="selbox" id="selMarge" style="left:6px; top:88px; width:338px; height:104px;">${handles}</div>
    <div class="selbox" id="selCanaux" style="left:6px; top:6px; width:338px; height:78px;">${handles}</div>
    <div class="selbox" id="selVenir" style="left:6px; top:292px; width:338px; height:340px;">${handles}</div>
    <div class="selbox" id="selEnc" style="left:6px; top:10px; width:338px; height:250px;">${handles}</div>
  </div></div>
  <div class="pill" id="pillFin">Finance</div>
  <div class="pill v" id="pillMkt">Marketing</div>
  <div class="pill" id="pillResa">Réservations</div>
  ${chip("chip1", "Bouche à oreille", 19, false)}${chip("chip2", "Instagram Ads", 6, true)}

  <div class="hand" id="geoDef">= être cité par les IA</div>
  <div class="slot" id="audit"><div class="k">Audit GEO</div><div class="t">Mon entreprise est-elle citée par les IA ?</div><div class="bar"><i id="auditFill"></i></div></div>
  <div class="slot" id="actions"><div class="k">Toutes les 2 semaines</div><div class="row"><span class="ic">${calendar(24)}</span>Actions mises en place</div></div>
  <div class="slot" id="stat20"><div class="k">Clientèle</div><div class="big">≈ 20 %</div><div class="sub" id="stat20Sub">de mes clients via ChatGPT</div></div>
  <div id="gpt"><div class="screen"><img src="assets/shots/chatgpt.png" alt="" /><div class="selbox" id="selCite" style="left:4px; top:286px; width:322px; height:166px;">${handles}</div></div></div>
  ${tile("ia1", icon("openai", "#0B0F2D", 46))}${tile("ia2", icon("googlegemini", "#3B82F6", 46))}${tile("ia3", icon("perplexity", "#20808D", 46))}
  <div class="hand" id="gptHand">Cité par ChatGPT !</div>

  <div id="wa"><div class="screen"><div class="scr" id="scrWa"><img src="assets/shots/wa-dispo.png" alt="" /></div><div class="selbox" id="selDispo" style="left:46px; top:298px; width:300px; height:140px;">${handles}</div></div></div>
  <div class="pill" id="pAuto">Autonome</div>
  <div class="pill v" id="pMoi">Parle comme moi</div>
  <div class="pill" id="pRegles">Connaît mes règles</div>
  <div class="pill n" id="pOutils">Connecté à mes outils</div>
  ${tile("tCal", icon("googlecalendar", "#4285F4", 46))}${tile("tCrm", icon("hubspot", "#FF7A59", 46))}${tile("tMeteo", sun(50))}
  <div class="hand" id="meteoHand">Même la météo !</div>

  <div class="pill" id="pme">Tu as une PME ?</div>
  <div class="pill v" id="ia">L'IA dans ton entreprise</div>
  <div id="comment"><span class="av"></span><span class="box"><span class="ph" id="ph">Ajouter un commentaire…</span><span class="typed" id="typed"><span>o</span><span>u</span><span>t</span><span>i</span><span>l</span></span><span class="cur" id="cur"></span></span><span class="btn">Publier</span></div>
  <div class="hand" id="dessous">juste en dessous<svg viewBox="0 0 70 90"><path id="dessousArrow" d="M35 6 C30 30, 36 55, 35 78" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/><path id="dessousHead" d="M18 62 L35 80 L52 62" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
  <div id="auditCard"><div class="k">Offert</div><div class="row"><span class="t">Audit gratuit</span><span class="badge" id="gratuit">0 €</span></div>
    <div class="chks"><div class="chk" id="possible"><span class="c">${check(20)}</span>Ce qui est possible de faire</div><div class="chk" id="apporter"><span class="c">${check(20)}</span>Ce que ça peut vous apporter</div></div></div>

  <div id="endcard"><div class="g1"></div><div class="g2"></div><div class="grid"></div>
    <div id="logoCard"><img src="assets/logo-end.png" alt="Luma — Agents IA pour les entreprises" /></div>
    <div id="sign">Commente « outil » pour ton audit gratuit<svg viewBox="0 0 580 22"><path id="signUl" d="M3 14 C140 6, 330 6, 577 12" fill="none" stroke="${B.violet}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
    <div id="cta"><span>Découvrir Luma</span>${arrowRight}</div>
    <div id="base">L'IA au service de vos ambitions</div>
  </div>
  <div id="caps"></div>
  <div id="grain"></div>
  <audio id="voice" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="5" data-volume="1" src="assets/voice.m4a"></audio>
${sfxAudio}
</div>`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<title>LUMA — Les 3 outils IA de mon entreprise (v002)</title>
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
console.log(`index.html written (${ID}, ${W}x${H}, ${DUR}s, ${plan.events.length} events, ${plan.captions.length} caption groups)`);
