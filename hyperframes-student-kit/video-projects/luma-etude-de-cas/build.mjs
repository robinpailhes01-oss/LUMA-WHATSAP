#!/usr/bin/env node
// Builds index.html from assets/plan.json + structure/style below. Animations: motion.js (inlined). Usage: node build.mjs
// Étude de cas LUMA (tableau de bord Harmonie Yacht), paysage 1920×1080. Brand rules: ../luma-film/LUMA_Bibliotheque_Marque.md
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition, DUR = plan.duration, FOOTAGE_DUR = plan.footageDuration;
const W = 1920, H = 1080;

// LUMA brand tokens (bibliothèque §1)
const B = { night: "#0B0F2D", blue: "#3B82F6", violet: "#7C3AED", offwhite: "#F8FAFC", grayUI: "#E5E7EB", wa: "#25D366", ink: "#0B0F2D", muted: "#5B6478" };

const star = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="${B.violet}" d="M12 1.5c.8 4.7 3 7 7.5 7.8-4.5.8-6.7 3.1-7.5 7.7-.8-4.6-3-6.9-7.5-7.7C9 8.5 11.2 6.2 12 1.5z"/></svg>`;
const arrowRight = `<svg viewBox="0 0 32 24" width="34" height="26" aria-hidden="true"><path d="M3 12h24M17 3l10 9-10 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const check = (s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M4 12.5l5 5L20 7" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const bang = (s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M12 4v10M12 19v1" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/></svg>`;
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
const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")`;

// phone: 420×760 at (1420, 80); screen 400×740; screenshots are 1206 px wide → displayed at 400 px (×0.3317)
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

#logo { position: absolute; left: 50px; top: 50px; z-index: 5; width: 214px; height: 74px; border-radius: 18px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#logo img { width: 172px; height: auto; display: block; }

#lt { position: absolute; left: 90px; top: 770px; z-index: 5; border-radius: 22px; ${whiteCard} padding: 18px 26px 18px 22px; display: flex; align-items: center; gap: 16px; color: ${B.ink}; }
#lt .av { width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, ${B.blue}, ${B.violet}); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 24px; color: #fff; }
#lt .n { font-weight: 600; font-size: 34px; letter-spacing: -0.01em; line-height: 1.1; display: flex; align-items: center; gap: 8px; }
#lt .r { font-weight: 400; font-size: 23px; color: ${B.muted}; margin-top: 4px; }

/* hook (Barlow Condensed, dernier mot en dégradé) */
#hook { position: absolute; left: 90px; top: 230px; width: 800px; z-index: 5; border-radius: 30px; padding: 34px 44px 40px; background: linear-gradient(120deg, rgba(11,15,45,0.96) 0%, rgba(19,26,69,0.94) 100%); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 24px 60px rgba(11,15,45,0.45); }
#hook .k { font-weight: 600; font-size: 22px; letter-spacing: 0.16em; color: ${B.blue}; text-transform: uppercase; margin-bottom: 10px; }
#hook .t { font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; font-size: 104px; line-height: 0.92; letter-spacing: -0.005em; text-transform: uppercase; color: #fff; }
#hook .t .g { ${gradText} }
#hook .ul { position: absolute; left: 44px; bottom: 22px; width: 300px; height: 8px; }

/* phone with the real dashboard screenshots */
#phone { position: absolute; left: 1420px; top: 90px; width: 420px; height: 720px; z-index: 5; border-radius: 46px; background: #0B0F2D; padding: 10px; box-shadow: 0 30px 70px rgba(11,15,45,0.55), 0 0 0 1px rgba(255,255,255,0.12); transform-origin: 50% 0; }
#screen { position: relative; width: 400px; height: 700px; border-radius: 38px; overflow: hidden; background: #F3F5F9; }
.scr { position: absolute; left: 0; top: 0; width: 400px; }
.scr img { display: block; width: 400px; height: auto; }
#screen::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 80px; background: linear-gradient(180deg, rgba(243,245,249,0) 0%, rgba(243,245,249,0.9) 100%); pointer-events: none; }
/* selection frames inside the screen (élément 5), coordinates in screen px */
.selbox { position: absolute; border: 3px solid ${B.blue}; border-radius: 10px; box-shadow: 0 0 0 4px rgba(59,130,246,0.18), 0 8px 24px rgba(59,130,246,0.25); z-index: 3; }
.selbox i, .cg .w .fr i { position: absolute; width: 12px; height: 12px; background: #fff; border: 2.5px solid ${B.blue}; border-radius: 3px; }
.selbox .a, .cg .w .fr .a { left: -7px; top: -7px; } .selbox .b, .cg .w .fr .b { right: -7px; top: -7px; } .selbox .c, .cg .w .fr .c { left: -7px; bottom: -7px; } .selbox .d, .cg .w .fr .d { right: -7px; bottom: -7px; }

/* pills & chips in the strip left of the phone (x 1150–1400) */
.pill { position: absolute; z-index: 6; display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 27px; color: #fff; white-space: nowrap; box-shadow: 0 12px 28px rgba(11,15,45,0.35); }
#pillFin { left: 1160px; top: 96px; background: ${B.blue}; }
#pillMkt { left: 1160px; top: 96px; background: ${B.violet}; }
.chip { position: absolute; left: 1150px; z-index: 6; display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px 9px 12px; border-radius: 999px; ${whiteCard} color: ${B.ink}; font-weight: 500; font-size: 21px; white-space: nowrap; }
.chip b { font-weight: 700; color: ${B.blue}; }
.chip .dot { width: 12px; height: 12px; border-radius: 50%; background: ${B.wa}; }
.chip .dot.p { background: ${B.blue}; }
#chip1 { top: 470px; } #chip2 { top: 532px; } #chip3 { top: 594px; } #chip4 { top: 656px; }
.chip.hl { background: ${B.violet}; color: #fff; border-color: ${B.violet}; }
.chip.hl b { color: #fff; }

/* handwritten annotations (Caveat) */
.hand { position: absolute; z-index: 7; font-family: "Caveat", cursive; font-weight: 600; color: ${B.blue}; text-shadow: 0 2px 10px rgba(11,15,45,0.35), 0 0 2px rgba(11,15,45,0.55); white-space: nowrap; }
#important { left: 1150px; top: 300px; font-size: 54px; }
#important svg { position: absolute; left: 190px; top: -6px; width: 110px; height: 60px; }
#travailler { left: 1150px; top: 740px; font-size: 52px; color: ${B.violet}; }
#okHand { left: 1250px; top: 728px; font-size: 52px; }
#warnHand { left: 1590px; top: 728px; font-size: 52px; color: ${B.violet}; }

/* three mini screens (vue d'ensemble) */
.mini { position: absolute; top: 210px; width: 224px; height: 388px; z-index: 5; border-radius: 30px; background: #0B0F2D; padding: 7px; box-shadow: 0 24px 50px rgba(11,15,45,0.5), 0 0 0 1px rgba(255,255,255,0.12); }
.mini .ms { position: relative; width: 210px; height: 374px; border-radius: 24px; overflow: hidden; background: #F3F5F9; }
.mini .ms img { display: block; width: 210px; height: auto; }
#mini1 { left: 1160px; } #mini2 { left: 1410px; } #mini3 { left: 1660px; }
.badge { position: absolute; top: -18px; right: -14px; width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 24px rgba(11,15,45,0.4); z-index: 8; }
.badge.ok { background: ${B.wa}; } .badge.warn { background: ${B.violet}; }
#vueLabel { left: 1160px; top: 636px; background: rgba(11,15,45,0.92); border: 1px solid rgba(255,255,255,0.16); font-size: 24px; padding: 12px 20px; }

/* stat card 5 min / jour + checklist (left column, camera LEFT) */
#stat { position: absolute; left: 90px; top: 240px; width: 470px; z-index: 5; border-radius: 30px; ${navyCard} padding: 26px 30px 26px; }
#stat .lbl { font-weight: 600; font-size: 22px; letter-spacing: 0.14em; color: ${B.blue}; text-transform: uppercase; }
#stat .row { display: flex; align-items: baseline; gap: 16px; margin-top: 6px; }
#stat .big { font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; font-size: 150px; line-height: 0.95; letter-spacing: -0.01em; ${gradText} }
#stat .unit { font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 700; font-size: 56px; color: #fff; text-transform: uppercase; }
#stat .sub { font-weight: 500; font-size: 22px; color: rgba(248,250,252,0.72); margin-top: 8px; }
#stat .chk { display: flex; align-items: center; gap: 14px; margin-top: 14px; font-weight: 500; font-size: 25px; color: #fff; }
#stat .chk .c { width: 34px; height: 34px; border-radius: 50%; background: ${B.blue}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 34px; }
#stat .chks { margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.12); }

/* captions */
#caps { position: absolute; left: 0; right: 0; top: 924px; z-index: 7; pointer-events: none; }
.cg { position: absolute; left: 160px; right: 160px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.26em; font-weight: 500; font-size: 43px; line-height: 1.2; color: #fff; text-shadow: 0 2px 10px rgba(11,15,45,0.75), 0 0 2px rgba(11,15,45,0.9); white-space: nowrap; }
.cg .w { position: relative; display: inline-block; padding: 6px 13px; border-radius: 10px; }
.cg .w .fr { position: absolute; left: -4px; top: -4px; right: -4px; bottom: -4px; border: 3px solid ${B.blue}; border-radius: 6px; opacity: 0; visibility: hidden; }

/* end card */
#endcard { position: absolute; inset: 0; z-index: 8; background: ${B.night}; overflow: hidden; }
#endcard .g1, #endcard .g2 { position: absolute; border-radius: 50%; }
#endcard .g1 { left: -300px; top: -400px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.16) 42%, rgba(59,130,246,0) 68%); }
#endcard .g2 { left: 900px; top: -100px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.16) 42%, rgba(124,58,237,0) 68%); }
#endcard .grid { position: absolute; inset: 0; opacity: 0.10; background-image: linear-gradient(rgba(248,250,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.35) 1px, transparent 1px); background-size: 90px 90px; }
#logoCard { position: absolute; left: 510px; top: 130px; width: 900px; height: 440px; border-radius: 40px; background: #fff; box-shadow: 0 40px 90px rgba(0,0,0,0.45), 0 0 80px rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; overflow: hidden; }
#logoCard img { width: 840px; height: auto; display: block; }
#sign { position: absolute; left: 0; width: ${W}px; top: 630px; text-align: center; font-family: "Caveat", cursive; font-weight: 600; font-size: 70px; color: #C4B5FD; }
#sign svg { position: absolute; left: 700px; top: 80px; width: 520px; height: 22px; }
#cta { position: absolute; left: 50%; top: 770px; display: inline-flex; align-items: center; gap: 16px; padding: 26px 48px; border-radius: 999px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 38px; white-space: nowrap; box-shadow: 0 18px 44px rgba(59,130,246,0.5); }
#base { position: absolute; left: 0; width: ${W}px; top: 900px; text-align: center; font-weight: 500; font-size: 22px; letter-spacing: 0.22em; color: rgba(248,250,252,0.6); text-transform: uppercase; }
#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.045; background-image: ${noise}; background-size: 300px 300px; mix-blend-mode: overlay; }
`;

// SFX tracks: whoosh 7/11, swell 8, pop/tick 6/9/10 — a clip takes the first track free at its start (no overlaps).
const trackEnd = {};
const sfxAudio = plan.events.filter((e) => e.sfx).sort((a, b) => a.time - b.time).map((e) => {
  const dur = { pop: 0.16, tick: 0.12, whoosh: 0.7, swell: 1.1 }[e.sfx];
  const vol = { pop: 0.14, tick: 0.1, whoosh: 0.14, swell: 0.15 }[e.sfx];
  const pool = e.sfx === "whoosh" ? [7, 11] : e.sfx === "swell" ? [8] : [6, 9, 10];
  const track = pool.find((t) => (trackEnd[t] || -1) < e.time - 0.005) ?? pool[pool.length - 1];
  trackEnd[track] = e.time + dur;
  return `  <audio id="sfx-${e.id}" data-start="${e.time}" data-duration="${dur}" data-track-index="${track}" data-volume="${vol}" src="assets/sfx/${e.sfx}.m4a"></audio>`;
}).join("\n");

const chip = (id, label, n, paid) => `<div class="chip" id="${id}"><span class="dot${paid ? " p" : ""}"></span>${label} <b>· ${n}</b></div>`;
const mini = (id, shot, badgeId, badgeCls, ic) => `<div class="mini" id="${id}"><div class="ms"><img src="assets/shots/${shot}.png" alt="" /></div><span class="badge ${badgeCls}" id="${badgeId}">${ic}</span></div>`;

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DUR}">
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>

  <div id="logo"><img src="assets/logo-mark.png" alt="Luma" /></div>
  <div id="lt"><span class="av">R</span><span><div class="n">Robin ${star}</div><div class="r">Fondateur de Luma · Harmonie Yacht</div></span></div>
  <div id="hook"><div class="k">Étude de cas</div><div class="t">Mon propre<br/><span class="g">tableau de bord</span></div>
    <svg class="ul" viewBox="0 0 300 8"><path id="hookUl" d="M2 5 C60 2, 140 2, 298 4" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>

  <div id="phone"><div id="screen">
    <div class="scr" id="scrVue"><img src="assets/shots/vue.png" alt="" /></div>
    <div class="scr" id="scrFin"><img src="assets/shots/rapports.png" alt="" /></div>
    <div class="scr" id="scrMkt"><img src="assets/shots/canaux.png" alt="" /></div>
    <div class="selbox" id="selCA" style="left:6px; top:100px; width:388px; height:126px;">${handles}</div>
    <div class="selbox" id="selChart" style="left:6px; top:372px; width:388px; height:322px;">${handles}</div>
    <div class="selbox" id="selCanaux" style="left:6px; top:-2px; width:388px; height:110px;">${handles}</div>
  </div></div>
  <div class="pill" id="pillFin">Finance</div>
  <div class="pill" id="pillMkt">Marketing</div>
  <div class="hand" id="important">Très important !<svg viewBox="0 0 110 60"><path id="impArrow" d="M6 30 C40 26, 70 22, 100 12" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/><path id="impHead" d="M84 6 L100 12 L92 26" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
  ${chip("chip1", "Bouche à oreille", 19, false)}${chip("chip2", "Instagram Ads", 6, true)}${chip("chip3", "Google", 4, false)}${chip("chip4", "TikTok", 4, false)}
  <div class="hand" id="travailler">À travailler !</div>

  ${mini("mini1", "vue", "bd1", "ok", check(26))}${mini("mini2", "rapports", "bd2", "ok", check(26))}${mini("mini3", "canaux", "bd3", "warn", bang(26))}
  <div class="pill" id="vueLabel">Toute l'entreprise, en un coup d'œil.</div>
  <div class="hand" id="okHand">Ça fonctionne</div>
  <div class="hand" id="warnHand">À améliorer</div>

  <div id="stat"><div class="lbl">Chaque jour</div><div class="row"><span class="big" id="s5">5</span><span class="unit" id="sJour">min / jour</span></div><div class="sub" id="sSub">pour piloter toute l'entreprise</div>
    <div class="chks"><div class="chk" id="chk1"><span class="c">${check(18)}</span>Ce qu'il se passe</div><div class="chk" id="chk2"><span class="c">${check(18)}</span>Comment ça se passe</div><div class="chk" id="chk3"><span class="c">${check(18)}</span>Ce qu'on pourrait améliorer</div></div></div>

  <div id="endcard"><div class="g1"></div><div class="g2"></div><div class="grid"></div>
    <div id="logoCard"><img src="assets/logo-end.png" alt="Luma — Agents IA pour les entreprises" /></div>
    <div id="sign">Du concret. Pas du blabla.<svg viewBox="0 0 520 22"><path id="signUl" d="M3 14 C120 6, 300 6, 517 12" fill="none" stroke="${B.violet}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
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
<title>LUMA — Étude de cas : mon tableau de bord</title>
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
