#!/usr/bin/env node
// Builds index.html from assets/plan.json + structure/style below. Animations: motion.js (inlined). Usage: node build.mjs
// Film LUMA pour le site internet (paysage 1920×1080, 11 rushes). Style validé : ../luma-outils-ia (v002) + skill luma-montage.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition, DUR = plan.duration, FOOTAGE_DUR = plan.footageDuration;
const W = 1920, H = 1080;

const B = { night: "#0B0F2D", blue: "#3B82F6", violet: "#7C3AED", offwhite: "#F8FAFC", grayUI: "#E5E7EB", wa: "#25D366", ink: "#0B0F2D", muted: "#5B6478" };

const icon = (name, color, size = 44) => {
  const svg = readFileSync(resolve(root, `assets/icons/${name}.svg`), "utf8");
  const d = svg.match(/ d="([^"]+)"/)[1];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="${color}" d="${d}"/></svg>`;
};
const sun = (s = 44) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="#F59E0B"/><g stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round"><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></g></svg>`;
const stroke = (d, s = 26, c = "#fff") => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="${d}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const clock = (s) => stroke("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2", s);
const bolt = (s) => stroke("M13 2 4 14h7l-1 8 9-12h-7l1-8z", s);
const users = (s) => stroke("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8", s);
const anchor = (s) => stroke("M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 8v13M4 13h3a5 5 0 0 0 10 0h3M5 13c0 5 3 8 7 8s7-3 7-8", s);
const cross = (s = 18) => stroke("M6 6l12 12M18 6L6 18", s);
const check = (s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M4 12.5l5 5L20 7" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const arrowDown = `<svg viewBox="0 0 24 32" width="26" height="34" aria-hidden="true"><path d="M12 3v24M3 17l9 10 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
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
const glass = `background: rgba(255,255,255,0.14); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.45); box-shadow: 0 12px 34px rgba(11,15,45,0.18);`;
const gradText = `background: linear-gradient(90deg, ${B.blue} 0%, ${B.violet} 100%); -webkit-background-clip: text; background-clip: text; color: transparent;`;
const barlow = `font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.005em; line-height: 0.92;`;
const tshadow = `text-shadow: 0 4px 22px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.6);`;
const sshadow = `text-shadow: 0 2px 10px rgba(11,15,45,0.6);`;
const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")`;
const phoneCss = (w, h) => `width: ${w}px; height: ${h}px; border-radius: 42px; background: #0B0F2D; padding: 10px; box-shadow: 0 30px 70px rgba(11,15,45,0.55), 0 0 0 1px rgba(255,255,255,0.12); transform-origin: 50% 0;`;

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
#scrim { position: absolute; left: 0; top: 0; width: ${W}px; height: 460px; z-index: 2; pointer-events: none; background: linear-gradient(180deg, rgba(11,15,45,0.55) 0%, rgba(11,15,45,0.34) 45%, rgba(11,15,45,0) 100%); }

/* kickers + titles : colonne droite (FULL/PUSH : x 1180 ; FACE_LEFT : x 990) ou colonne gauche (FACE_RIGHT : x 60) */
.kick { position: absolute; z-index: 5; font-weight: 600; font-size: 22px; letter-spacing: 0.16em; color: #fff; text-transform: uppercase; opacity: 0.92; ${sshadow} white-space: nowrap; }
.title { position: absolute; z-index: 5; ${barlow} font-size: 96px; color: #fff; ${tshadow} white-space: nowrap; }
.title .g { color: #8FBBFF; }
.sub { position: absolute; z-index: 5; font-weight: 600; font-size: 34px; color: #fff; ${sshadow} white-space: nowrap; }
.big { position: absolute; z-index: 5; ${barlow} font-size: 160px; ${gradText} white-space: nowrap; }
.rc { left: 1180px; } .rl { left: 990px; } .lc { left: 60px; }

/* s01 */
#kick { top: 110px; } #hook { top: 146px; font-size: 92px; } #hookSub { top: 244px; }
.notif { position: absolute; left: 1180px; width: 660px; z-index: 5; border-radius: 22px; ${whiteCard} padding: 14px 18px; display: flex; align-items: center; gap: 14px; color: ${B.ink}; }
.notif .ic { width: 52px; height: 52px; border-radius: 14px; background: ${B.wa}; display: flex; align-items: center; justify-content: center; flex: 0 0 52px; }
.notif .b { font-weight: 700; font-size: 23px; line-height: 1.15; } .notif .m { font-weight: 400; font-size: 21px; color: ${B.muted}; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.notif .tb { position: absolute; top: -14px; right: -10px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 19px; padding: 6px 12px; border-radius: 999px; box-shadow: 0 8px 18px rgba(59,130,246,0.45); }
#n1 { top: 360px; } #n2 { top: 460px; } #n3 { top: 560px; }

/* s02 */
#kick2 { top: 100px; } #t2 { top: 134px; }
.row { position: absolute; z-index: 5; width: 700px; border-radius: 22px; padding: 16px 22px; ${glass} display: flex; align-items: center; gap: 16px; font-weight: 600; font-size: 30px; color: #fff; ${sshadow} }
.row .ic { width: 50px; height: 50px; border-radius: 14px; background: ${B.blue}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 50px; }
.row .ic.v { background: ${B.violet}; } .row .ic.n { background: rgba(11,15,45,0.85); }
.row .txt { display: flex; flex-direction: column; } .row .s { font-weight: 500; font-size: 22px; opacity: 0.85; margin-top: 2px; }
.row .x { margin-left: auto; width: 44px; height: 44px; border-radius: 50%; background: rgba(11,15,45,0.85); border: 1px solid rgba(255,255,255,0.25); display: inline-flex; align-items: center; justify-content: center; flex: 0 0 44px; }
#manque { left: 990px; top: 350px; width: 520px; }
#manque .strike { position: absolute; left: 88px; top: 50%; width: 400px; height: 5px; background: #fff; border-radius: 3px; transform-origin: 0 50%; }
.pill { position: absolute; z-index: 6; display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 27px; color: #fff; white-space: nowrap; box-shadow: 0 12px 28px rgba(11,15,45,0.35); background: ${B.blue}; }
.pill.v { background: ${B.violet}; }
.pill.n { background: rgba(11,15,45,0.92); border: 1px solid rgba(255,255,255,0.16); }
#pTemps { left: 990px; top: 460px; } #pDispo { left: 1176px; top: 460px; }
#rapid { position: absolute; left: 990px; top: 350px; width: 700px; z-index: 5; border-radius: 26px; padding: 20px 26px 24px; ${glass} }
#rapid .k { font-weight: 600; font-size: 20px; letter-spacing: 0.14em; color: #fff; text-transform: uppercase; ${sshadow} }
#rapid .bar { position: relative; height: 12px; border-radius: 999px; background: rgba(255,255,255,0.16); margin-top: 14px; overflow: hidden; }
#rapid .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; border-radius: 999px; background: linear-gradient(90deg, ${B.blue}, ${B.violet}); transform-origin: 0 50%; }
#rapid .n1 { ${barlow} font-size: 130px; ${gradText} margin-top: 8px; }
#rapid .s { font-weight: 500; font-size: 26px; color: #fff; ${sshadow} margin-top: 2px; }
#flow { position: absolute; left: 990px; top: 360px; z-index: 5; display: flex; align-items: center; gap: 18px; }
#flow .pill { position: static; }
#flow svg { width: 90px; height: 40px; }
.hand { position: absolute; z-index: 7; font-family: "Caveat", cursive; font-weight: 600; color: #fff; text-shadow: 0 3px 4px rgba(11,15,45,0.85), 0 0 18px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.9); white-space: nowrap; }
#savoir { left: 1000px; top: 460px; font-size: 54px; }

/* s03 */
#kick3 { top: 100px; } #ans3 { top: 130px; } #ans3sub { top: 300px; }
#yacht { left: 60px; top: 372px; }
#emb { left: 60px; top: 460px; width: 680px; } #bot { left: 60px; top: 580px; width: 680px; }

/* s04 */
#kick4 { top: 100px; } #t4 { top: 134px; line-height: 0.9; }
#phone { position: absolute; left: 1500px; top: 350px; z-index: 5; ${phoneCss(360, 440)} }
#phone .screen { position: relative; width: 340px; height: 420px; border-radius: 34px; overflow: hidden; background: #0b141a; }
#phone .screen img { display: block; width: 340px; height: auto; }
#pAuto { left: 990px; top: 356px; } #pMoi { left: 990px; top: 426px; } #pRegles { left: 990px; top: 496px; } #pOutils { left: 990px; top: 566px; }
.tile { position: absolute; width: 84px; height: 84px; z-index: 6; border-radius: 22px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#tCal { left: 990px; top: 660px; } #tCrm { left: 1094px; top: 660px; } #tMeteo { left: 1198px; top: 660px; }
#meteoHand { left: 1300px; top: 664px; font-size: 44px; }
.selbox { position: absolute; border: 3px solid ${B.blue}; border-radius: 10px; box-shadow: 0 0 0 4px rgba(59,130,246,0.18), 0 8px 24px rgba(59,130,246,0.25); z-index: 3; }
.selbox i { position: absolute; width: 12px; height: 12px; background: #fff; border: 2.5px solid ${B.blue}; border-radius: 3px; }
.selbox .a { left: -7px; top: -7px; } .selbox .b { right: -7px; top: -7px; } .selbox .c { left: -7px; bottom: -7px; } .selbox .d { right: -7px; bottom: -7px; }

/* s05 : pilules puis page plein écran (STYLE-04) */
#peur { left: 1180px; top: 130px; } #relation { left: 1180px; top: 206px; }
#page { position: absolute; inset: 0; z-index: 6; overflow: hidden; background: ${B.night}; }
#page .g1, #page .g2, #endcard .g1, #endcard .g2 { position: absolute; border-radius: 50%; }
#page .g1, #endcard .g1 { left: -300px; top: -500px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.14) 42%, rgba(59,130,246,0) 68%); }
#page .g2, #endcard .g2 { left: 900px; top: 100px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0.14) 42%, rgba(124,58,237,0) 68%); }
#page .grid, #endcard .grid { position: absolute; inset: 0; opacity: 0.10; background-image: linear-gradient(rgba(248,250,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.35) 1px, transparent 1px); background-size: 90px 90px; }
#pageKick { position: absolute; left: 0; width: ${W}px; top: 64px; text-align: center; font-weight: 600; font-size: 22px; letter-spacing: 0.18em; color: #8FBBFF; text-transform: uppercase; }
#pageTitle { position: absolute; left: 0; width: ${W}px; top: 100px; text-align: center; ${barlow} font-size: 92px; color: #fff; }
#pageTitle .g { color: #8FBBFF; }
.ph { position: absolute; top: 262px; z-index: 2; ${phoneCss(400, 620)} }
.ph .screen { position: relative; width: 380px; height: 600px; border-radius: 34px; overflow: hidden; background: #0b141a; }
.ph .screen img { display: block; width: 380px; height: auto; }
#ph1 { left: 260px; } #ph2 { left: 760px; } #ph3 { left: 1260px; }
#dessous1 { left: 1500px; top: 176px; font-size: 50px; color: #C4B5FD; }

/* s06 */
#kick6 { top: 100px; } #t6 { top: 134px; }
#r1 { left: 60px; top: 300px; width: 680px; } #r2 { left: 60px; top: 396px; width: 680px; } #r3 { left: 60px; top: 492px; width: 680px; }
#charge { left: 60px; top: 640px; } #exp { left: 60px; top: 716px; } #satis { left: 372px; top: 716px; }

/* s07 */
#ans2 { top: 96px; } #ans2sub { top: 262px; }
#res { position: absolute; left: 1180px; top: 322px; width: 600px; z-index: 5; border-radius: 24px; padding: 8px; ${whiteCard} }
#res .screen { position: relative; width: 584px; border-radius: 18px; overflow: hidden; background: #F3F5F9; }
#res .screen img { display: block; width: 584px; height: auto; }

/* s08 */
#kick8 { top: 100px; } #t8 { top: 134px; }
#deleg { left: 990px; top: 300px; } #fortune { left: 1176px; top: 300px; }
#auditCard { position: absolute; left: 990px; top: 290px; width: 880px; z-index: 5; border-radius: 34px; ${glass} padding: 26px 36px 28px; }
#auditCard .k { font-weight: 600; font-size: 22px; letter-spacing: 0.16em; color: #fff; text-transform: uppercase; opacity: 0.9; ${sshadow} }
#auditCard .rw { display: flex; align-items: center; gap: 24px; }
#auditCard .t { ${barlow} font-size: 110px; color: #fff; ${tshadow} } #auditCard .t .g { color: #8FBBFF; }
#auditCard .badge { display: inline-flex; align-items: center; justify-content: center; padding: 8px 20px; border-radius: 999px; background: ${B.wa}; color: #fff; font-weight: 700; font-size: 32px; }
#auditCard .chk { display: flex; align-items: center; gap: 14px; margin-top: 10px; font-weight: 500; font-size: 28px; color: #fff; ${sshadow} }
#auditCard .chk .c { width: 36px; height: 36px; border-radius: 50%; background: ${B.blue}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 36px; }
#auditCard .chks { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.3); }
#dessous2 { left: 1010px; top: 640px; font-size: 54px; }
#dessous2 svg { position: absolute; left: 330px; top: -6px; width: 70px; height: 90px; }

/* captions */
#caps { position: absolute; left: 0; right: 0; top: 930px; z-index: 7; pointer-events: none; }
.cg { position: absolute; left: 60px; right: 60px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.3em; font-weight: 800; font-style: italic; font-size: 48px; line-height: 1.2; color: #fff; letter-spacing: -0.01em; text-shadow: 0 3px 4px rgba(11,15,45,0.85), 0 0 18px rgba(11,15,45,0.55), 0 0 2px rgba(11,15,45,0.9); white-space: nowrap; }
.cg .w { position: relative; display: inline-block; padding: 4px 2px; }
.cg .w.sel { color: #8FBBFF; }

/* end card */
#endcard { position: absolute; inset: 0; z-index: 8; background: ${B.night}; overflow: hidden; }
#logoCard { position: absolute; left: 580px; top: 110px; width: 760px; height: 380px; border-radius: 40px; background: #fff; box-shadow: 0 40px 90px rgba(0,0,0,0.45), 0 0 80px rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; overflow: hidden; }
#logoCard img { width: 700px; height: auto; display: block; }
#sign { position: absolute; left: 0; width: ${W}px; top: 540px; text-align: center; font-family: "Caveat", cursive; font-weight: 600; font-size: 66px; color: #C4B5FD; }
#sign svg { position: absolute; left: 640px; top: 80px; width: 640px; height: 22px; }
#cta { position: absolute; left: 50%; top: 690px; display: inline-flex; align-items: center; gap: 16px; padding: 24px 46px; border-radius: 999px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 38px; white-space: nowrap; box-shadow: 0 18px 44px rgba(59,130,246,0.5); }
#base { position: absolute; left: 0; width: ${W}px; top: 820px; text-align: center; font-weight: 500; font-size: 22px; letter-spacing: 0.22em; color: rgba(248,250,252,0.6); text-transform: uppercase; }
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

const tile = (id, inner) => `<div class="tile" id="${id}">${inner}</div>`;
const notif = (id, msg, time) => `<div class="notif" id="${id}"><span class="ic">${icon("whatsapp", "#fff", 30)}</span><span><div class="b">Nouveau message</div><div class="m">${msg}</div></span><span class="tb">${time}</span></div>`;
const row = (id, ic, cls, text, sub, x) => `<div class="row" id="${id}"><span class="ic ${cls}">${ic}</span><span class="txt"><span>${text}</span>${sub ? `<span class="s">${sub}</span>` : ""}</span>${x ? `<span class="x" id="${id}X">${cross(22)}</span>` : ""}</div>`;
const phone = (id, shot, sel) => `<div class="ph" id="${id}"><div class="screen"><img src="assets/shots/${shot}" alt="" />${sel || ""}</div></div>`;

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DUR}">
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>
  <div id="scrim"></div>

  <!-- s01 accroche -->
  <div class="kick rc" id="kick">Chef d'entreprise</div>
  <div class="title rc" id="hook">Demandes <span class="g">clients</span></div>
  <div class="sub rc" id="hookSub">tous les jours, à n'importe quel moment</div>
  ${notif("n1", "Bonjour, une sortie en mer samedi ?", "07:48")}${notif("n2", "C'est possible pour 6 personnes ?", "13:15")}${notif("n3", "Vous êtes dispo ce week-end ?", "23:40")}

  <!-- s02 problème -->
  <div class="kick rl" id="kick2">Le problème</div>
  <div class="title rl" id="t2">Pas un manque<br/>de <span class="g">clients</span></div>
  <div class="row" id="manque"><span class="ic n">${users(30)}</span><span>Un manque de clients</span><i class="strike" id="strikeLine"></i></div>
  <div class="pill" id="pTemps">Le temps</div>
  <div class="pill v" id="pDispo">La disponibilité</div>
  <div id="rapid"><div class="k">Rapidité de réponse</div><div class="bar"><i id="rapidFill"></i></div><div class="n1" id="num1">N°1</div><div class="s" id="num1sub">des choses les plus importantes</div></div>
  <div id="flow"><span class="pill" id="prospect">Un prospect</span><svg viewBox="0 0 90 40"><path id="flowArrow" d="M4 20h70M58 8l16 12-16 12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg><span class="pill v" id="concu">La concurrence</span></div>
  <div class="hand" id="savoir">sans même le savoir…</div>

  <!-- s03 histoire -->
  <div class="kick lc" id="kick3">Mon histoire</div>
  <div class="big lc" id="ans3">3 ans</div>
  <div class="sub lc" id="ans3sub">exactement dans la même situation</div>
  <div class="pill n" id="yacht">${anchor(28)} Ma société de location de yachts</div>
  ${row("emb", users(30), "", "Embaucher une personne dédiée", "pas les moyens", true)}
  ${row("bot", icon("whatsapp", "#fff", 30), "v", "Mettre un chatbot", "perd la qualité de la relation client", true)}

  <!-- s04 solution -->
  <div class="kick rl" id="kick4">Il y a 2 ans · la solution</div>
  <div class="title rl" id="t4">Mon agent <span class="g">WhatsApp</span></div>
  <div id="phone"><div class="screen"><img src="assets/shots/wa-tarifs.png" alt="" /><div class="selbox" id="selDispo" style="left:76px; top:214px; width:262px; height:66px;">${handles}</div></div></div>
  <div class="pill" id="pAuto">Complètement autonome</div>
  <div class="pill v" id="pMoi">Parle comme moi</div>
  <div class="pill" id="pRegles">Connaît mes règles</div>
  <div class="pill n" id="pOutils">Connecté à mes outils</div>
  ${tile("tCal", icon("googlecalendar", "#4285F4", 46))}${tile("tCrm", icon("hubspot", "#FF7A59", 46))}${tile("tMeteo", sun(50))}
  <div class="hand" id="meteoHand">Même la météo !</div>

  <!-- s05 objection + page plein écran -->
  <div class="pill n" id="peur">Peur de déléguer à l'IA ?</div>
  <div class="pill v" id="relation">Perdre la relation client ?</div>
  <div id="page"><div class="g1"></div><div class="g2"></div><div class="grid"></div>
    <div id="pageKick">Conversations réelles · noms masqués</div>
    <div id="pageTitle">Mon agent parle à mes <span class="g">clients</span></div>
    ${phone("ph1", "wa-steph.png", `<div class="selbox" id="selPh" style="left:80px; top:322px; width:296px; height:158px;">${handles}</div>`)}${phone("ph2", "wa-repas.png")}${phone("ph3", "wa-tarifs.png")}
    <div class="hand" id="dessous1">juste en dessous ↓</div>
  </div>

  <!-- s06 bénéfices -->
  <div class="kick lc" id="kick6">Ce que ça change</div>
  <div class="title lc" id="t6">Les <span class="g">résultats</span></div>
  ${row("r1", clock(30), "", "Énormément de temps gagné")}
  ${row("r2", bolt(30), "v", "Réponses très rapides")}
  ${row("r3", users(30), "", "Plus de clients", "ils n'ont pas le temps d'aller voir ailleurs")}
  <div class="pill v" id="charge">Charge mentale en moins</div>
  <div class="pill" id="exp">Expérience client</div>
  <div class="pill" id="satis">Satisfaction client</div>

  <!-- s07 preuve -->
  <div class="big rc" id="ans2">2 ans</div>
  <div class="sub rc" id="ans2sub">sans presque toucher WhatsApp</div>
  <div id="res"><div class="screen"><img src="assets/shots/resultats.png" alt="" /><div class="selbox" id="sel217" style="left:46px; top:228px; width:270px; height:60px;">${handles}</div><div class="selbox" id="sel1851" style="left:46px; top:384px; width:330px; height:86px;">${handles}</div></div></div>

  <!-- s08 CTA -->
  <div class="kick rl" id="kick8">Et toi ?</div>
  <div class="title rl" id="t8">Épuisé de <span class="g">répondre</span> ?</div>
  <div class="pill" id="deleg">Déléguer</div>
  <div class="pill v" id="fortune">sans que ça coûte une fortune</div>
  <div id="auditCard"><div class="k">Offert</div><div class="rw"><span class="t">Audit <span class="g">gratuit</span></span><span class="badge" id="gratuit">0 €</span></div>
    <div class="chks"><div class="chk" id="possible"><span class="c">${check(20)}</span>Ce qui est possible de faire</div><div class="chk" id="comment"><span class="c">${check(20)}</span>Comment ça fonctionnerait sur votre entreprise</div></div></div>
  <div class="hand" id="dessous2">juste en dessous<svg viewBox="0 0 70 90"><path id="dessousArrow" d="M35 6 C30 30, 36 55, 35 78" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/><path id="dessousHead" d="M18 62 L35 80 L52 62" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>

  <div id="endcard"><div class="g1"></div><div class="g2"></div><div class="grid"></div>
    <div id="logoCard"><img src="assets/logo-end.png" alt="Luma — Agents IA pour les entreprises" /></div>
    <div id="sign">Ton audit gratuit est juste en dessous<svg viewBox="0 0 640 22"><path id="signUl" d="M3 14 C160 6, 380 6, 637 12" fill="none" stroke="${B.violet}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
    <div id="cta"><span>Demander mon audit gratuit</span>${arrowDown}</div>
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
<title>LUMA — Film site internet (v001)</title>
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
