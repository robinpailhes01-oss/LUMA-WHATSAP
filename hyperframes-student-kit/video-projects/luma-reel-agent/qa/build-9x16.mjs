#!/usr/bin/env node
// Builds index.html from assets/plan.json + structure/style below. Animations: motion.js (inlined). Usage: node build.mjs
// Brand rules: ../luma-film/LUMA_Bibliotheque_Marque.md (palette, Barlow Condensed hooks, Inter, Caveat, 9:16 templates).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const plan = JSON.parse(readFileSync(resolve(root, "assets/plan.json"), "utf8"));
const motion = readFileSync(resolve(root, "motion.js"), "utf8");
const ID = plan.composition, DUR = plan.duration, FOOTAGE_DUR = plan.footageDuration;
const W = 1080, H = 1920;

// LUMA brand tokens (bibliothèque §1)
const B = { night: "#0B0F2D", blue: "#3B82F6", violet: "#7C3AED", offwhite: "#F8FAFC", grayUI: "#E5E7EB", wa: "#25D366", ink: "#0B0F2D", muted: "#5B6478" };

const icon = (name, color, size = 44) => {
  const svg = readFileSync(resolve(root, `assets/icons/${name}.svg`), "utf8");
  const d = svg.match(/ d="([^"]+)"/)[1];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="${color}" d="${d}"/></svg>`;
};
const waBadge = (size = 44) => `<span class="wab" style="width:${size}px;height:${size}px">${icon("whatsapp", "#fff", Math.round(size * 0.58))}</span>`;
const star = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="${B.violet}" d="M12 1.5c.8 4.7 3 7 7.5 7.8-4.5.8-6.7 3.1-7.5 7.7-.8-4.6-3-6.9-7.5-7.7C9 8.5 11.2 6.2 12 1.5z"/></svg>`;
const arrowRight = `<svg viewBox="0 0 32 24" width="34" height="26" aria-hidden="true"><path d="M3 12h24M17 3l10 9-10 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const check = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12.5l5 5L20 7" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const fonts = readFileSync(resolve(root, "assets/fonts/fonts.css"), "utf8")
  .replace(/^\/\*[\s\S]*?\*\/\n/, "");
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

const css = `
${fontInter}
${fonts}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: ${B.night}; font-family: "Inter", sans-serif; color: ${B.offwhite}; }
#root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${B.night}; }
#frame { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; overflow: hidden; transform-origin: 50% 50%; z-index: 1; background: ${B.night}; }
#cam { position: absolute; left: 0; top: 0; width: 1440px; height: ${H}px; transform-origin: 720px 700px; will-change: transform; }
#poster, #footage { position: absolute; left: 0; top: 0; width: 1440px; height: ${H}px; display: block; object-fit: cover; }
#footage { filter: contrast(1.02) saturate(1.04); }

/* logo top-left (gabarit : logo en haut) */
#logo { position: absolute; left: 40px; top: 64px; z-index: 5; width: 214px; height: 74px; border-radius: 18px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#logo img { width: 172px; height: auto; display: block; }

/* lower-third (élément 10) */
#lt { position: absolute; left: 40px; top: 1180px; z-index: 5; border-radius: 22px; ${whiteCard} padding: 18px 26px 18px 22px; display: flex; align-items: center; gap: 16px; color: ${B.ink}; }
#lt .av { width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, ${B.blue}, ${B.violet}); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 24px; color: #fff; }
#lt .n { font-weight: 600; font-size: 34px; letter-spacing: -0.01em; line-height: 1.1; display: flex; align-items: center; gap: 8px; }
#lt .r { font-weight: 400; font-size: 23px; color: ${B.muted}; margin-top: 4px; }

/* hook band (titre style « sur fond coloré ») */
#hook { position: absolute; left: 0; top: 1060px; width: ${W}px; z-index: 5; padding: 36px 60px 40px; background: linear-gradient(120deg, rgba(11,15,45,0.96) 0%, rgba(19,26,69,0.94) 100%); border-top: 1px solid rgba(255,255,255,0.12); border-bottom: 1px solid rgba(255,255,255,0.12); box-shadow: 0 24px 60px rgba(11,15,45,0.45); }
#hook .t { font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; font-size: 118px; line-height: 0.92; letter-spacing: -0.005em; text-transform: uppercase; color: #fff; }
#hook .t .g { ${gradText} }
#hook .s { font-weight: 600; font-size: 30px; color: rgba(248,250,252,0.85); margin-top: 18px; }
#hook .ul { position: absolute; left: 60px; bottom: 30px; width: 300px; height: 8px; }

/* notifications (pack overlays : notification) */
.notif { position: absolute; left: 30px; width: 410px; z-index: 5; border-radius: 22px; ${whiteCard} padding: 16px 18px 16px 16px; display: flex; align-items: center; gap: 14px; color: ${B.ink}; }
#n1 { top: 300px; } #n2 { top: 444px; } #n3 { top: 588px; }
.notif .b { font-weight: 600; font-size: 22px; line-height: 1.15; }
.notif .m { font-weight: 400; font-size: 21px; line-height: 1.25; color: ${B.muted}; margin-top: 3px; }
.wab { border-radius: 50%; background: ${B.wa}; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; }
.tb { position: absolute; top: -14px; right: -10px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 19px; padding: 6px 12px; border-radius: 999px; box-shadow: 0 8px 18px rgba(59,130,246,0.45); }

/* handwritten annotations (Caveat, élément 8) */
.hand { position: absolute; z-index: 6; font-family: "Caveat", cursive; font-weight: 600; color: ${B.blue}; text-shadow: 0 2px 10px rgba(11,15,45,0.35), 0 0 2px rgba(11,15,45,0.5); white-space: nowrap; }
#parIci { left: 690px; top: 132px; font-size: 62px; }
#parIci svg { position: absolute; left: 48px; top: 66px; width: 90px; height: 70px; }
#repond { left: 636px; top: 1008px; font-size: 52px; }

/* phone with the real WhatsApp conversation (gabarit 3) */
#phone { position: absolute; left: 626px; top: 250px; width: 434px; height: 770px; z-index: 5; border-radius: 46px; background: #0B0F2D; padding: 10px; box-shadow: 0 30px 70px rgba(11,15,45,0.55), 0 0 0 1px rgba(255,255,255,0.12); transform-origin: 50% 0; }
#screen { position: relative; width: 414px; height: 750px; border-radius: 38px; overflow: hidden; background: #0e1a14; }
#chat { position: absolute; left: 0; top: 0; width: 414px; }
#chat img { display: block; width: 414px; height: auto; }
#chat .sep { height: 12px; background: #0e1a14; }
#screen::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 90px; background: linear-gradient(180deg, rgba(14,26,20,0) 0%, rgba(14,26,20,0.85) 100%); pointer-events: none; }

/* pills (élément 4) */
.pill { position: absolute; z-index: 5; display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 27px; color: #fff; white-space: nowrap; box-shadow: 0 12px 28px rgba(11,15,45,0.35); }
#p1 { left: 660px; top: 1026px; background: ${B.blue}; }
#p2 { left: 660px; top: 1098px; background: ${B.violet}; }
#tousOutils { left: 656px; top: 1012px; background: rgba(11,15,45,0.92); border: 1px solid rgba(255,255,255,0.16); font-size: 24px; padding: 12px 20px; }

/* tool tiles + connection lines (gabarit 4) */
.tile { position: absolute; top: 900px; width: 84px; height: 84px; z-index: 5; border-radius: 22px; ${whiteCard} display: flex; align-items: center; justify-content: center; }
#tile1 { left: 668px; } #tile2 { left: 768px; } #tile3 { left: 868px; } #tile4 { left: 968px; }
#links { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; z-index: 4; pointer-events: none; }
#links path { fill: none; stroke: ${B.blue}; stroke-width: 4; stroke-linecap: round; opacity: 0.95; filter: drop-shadow(0 0 6px rgba(59,130,246,0.6)); }

/* stat card (élément 12) */
#stat { position: absolute; left: 30px; top: 430px; width: 410px; z-index: 5; border-radius: 30px; ${navyCard} padding: 28px 30px 30px; }
#stat .lbl { font-weight: 600; font-size: 22px; letter-spacing: 0.14em; color: ${B.blue}; text-transform: uppercase; }
#stat .big { font-family: "Barlow Condensed", "Inter", sans-serif; font-weight: 800; font-size: 132px; line-height: 0.95; letter-spacing: -0.01em; ${gradText} margin-top: 8px; }
#stat .big.sec { margin-top: 2px; }
#stat .sub { font-weight: 500; font-size: 22px; color: rgba(248,250,252,0.7); margin-top: 12px; }

/* client pills at the end (élément 9 / 13) */
.cl { position: absolute; top: 1196px; height: 62px; z-index: 5; border-radius: 999px; ${whiteCard} display: flex; align-items: center; gap: 8px; padding: 0 12px 0 8px; color: ${B.ink}; font-weight: 500; font-size: 21px; white-space: nowrap; }
#c1 { left: 24px; } #c2 { left: 356px; } #c3 { left: 646px; }
.cl .ok { width: 30px; height: 30px; border-radius: 50%; background: ${B.wa}; display: inline-flex; align-items: center; justify-content: center; margin-left: 2px; }

/* captions (Inter Medium, mot actif bleu électrique ; sélection de mot avec poignées) */
#caps { position: absolute; left: 0; right: 0; top: 1440px; z-index: 7; pointer-events: none; }
.cg { position: absolute; left: 60px; right: 60px; top: 0; display: flex; justify-content: center; opacity: 0; visibility: hidden; }
.cg .line { display: inline-flex; align-items: center; gap: 0.26em; font-weight: 500; font-size: 46px; line-height: 1.2; color: #fff; text-shadow: 0 2px 10px rgba(11,15,45,0.75), 0 0 2px rgba(11,15,45,0.9); white-space: nowrap; }
.cg .w { position: relative; display: inline-block; padding: 6px 13px; border-radius: 10px; }
.cg .w .fr { position: absolute; left: -4px; top: -4px; right: -4px; bottom: -4px; border: 3px solid ${B.blue}; border-radius: 6px; opacity: 0; visibility: hidden; }
.cg .w .fr i { position: absolute; width: 12px; height: 12px; background: #fff; border: 2.5px solid ${B.blue}; border-radius: 3px; }
.cg .w .fr .a { left: -7px; top: -7px; } .cg .w .fr .b { right: -7px; top: -7px; } .cg .w .fr .c { left: -7px; bottom: -7px; } .cg .w .fr .d { right: -7px; bottom: -7px; }

/* end card (gabarit 6) */
#endcard { position: absolute; inset: 0; z-index: 8; background: ${B.night}; overflow: hidden; }
#endcard .g1, #endcard .g2 { position: absolute; border-radius: 50%; }
#endcard .g1 { left: -420px; top: 120px; width: 1300px; height: 1300px; background: radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.16) 42%, rgba(59,130,246,0) 68%); }
#endcard .g2 { left: 180px; top: 700px; width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.16) 42%, rgba(124,58,237,0) 68%); }
#endcard .grid { position: absolute; inset: 0; opacity: 0.10; background-image: linear-gradient(rgba(248,250,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.35) 1px, transparent 1px); background-size: 90px 90px; }
#logoCard { position: absolute; left: 130px; top: 560px; width: 820px; height: 420px; border-radius: 40px; background: #fff; box-shadow: 0 40px 90px rgba(0,0,0,0.45), 0 0 80px rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; overflow: hidden; }
#logoCard img { width: 780px; height: auto; display: block; }
#sign { position: absolute; left: 0; width: ${W}px; top: 1040px; text-align: center; font-family: "Caveat", cursive; font-weight: 600; font-size: 74px; color: #C4B5FD; }
#sign svg { position: absolute; left: 350px; top: 84px; width: 380px; height: 22px; }
#cta { position: absolute; left: 50%; top: 1200px; display: inline-flex; align-items: center; gap: 16px; padding: 26px 48px; border-radius: 999px; background: ${B.blue}; color: #fff; font-weight: 600; font-size: 38px; white-space: nowrap; box-shadow: 0 18px 44px rgba(59,130,246,0.5); }
#base { position: absolute; left: 0; width: ${W}px; top: 1330px; text-align: center; font-weight: 500; font-size: 22px; letter-spacing: 0.22em; color: rgba(248,250,252,0.6); text-transform: uppercase; }

#grain { position: absolute; inset: 0; z-index: 9; pointer-events: none; opacity: 0.045; background-image: ${noise}; background-size: 300px 300px; mix-blend-mode: overlay; }
`;

const sfxAudio = plan.events.filter((e) => e.sfx).map((e) => {
  const dur = { pop: 0.16, tick: 0.12, whoosh: 0.7, swell: 1.1 }[e.sfx];
  const vol = { pop: 0.14, tick: 0.1, whoosh: 0.14, swell: 0.15 }[e.sfx];
  const track = e.sfx === "whoosh" ? 7 : e.sfx === "swell" ? 8 : 6;
  return `  <audio id="sfx-${e.id}" data-start="${e.time}" data-duration="${dur}" data-track-index="${track}" data-volume="${vol}" src="assets/sfx/${e.sfx}.m4a"></audio>`;
}).join("\n");

const notif = (id, msg) => `<div class="notif" id="${id}">${waBadge(46)}<span><div class="b">Nouveau client</div><div class="m">${msg}</div></span><span class="tb" id="t${id.slice(1)}"></span></div>`;
const client = (id, msg) => `<div class="cl" id="${id}">${waBadge(38)}<span>${msg}</span><span class="ok" id="d${id.slice(1)}">${check}</span></div>`;
const tile = (id, name, color) => `<div class="tile" id="${id}">${icon(name, color, 46)}</div>`;

const body = `
<div id="root" data-composition-id="${ID}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DUR}">
  <div id="frame"><div id="cam">
    <img id="poster" src="assets/last-frame.jpg" alt="" />
    <video id="footage" data-start="0" data-duration="${FOOTAGE_DUR}" data-track-index="0" src="assets/footage.mp4" muted playsinline></video>
  </div></div>

  <div id="logo"><img src="assets/logo-mark.png" alt="Luma" /></div>
  <div id="lt"><span class="av">R</span><span><div class="n">Robin ${star}</div><div class="r">Fondateur de Luma</div></span></div>
  <div id="hook"><div class="t">Chef<br/><span class="g">d'entreprise ?</span></div><div class="s">Interrompu toute la journée…</div>
    <svg class="ul" viewBox="0 0 300 8"><path id="hookUl" d="M2 5 C60 2, 140 2, 298 4" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>

  ${notif("n1", "Bonjour, vous avez des dispos ce week-end ?")}
  ${notif("n2", "C'est quoi vos tarifs ?")}
  ${notif("n3", "Est-ce que vous êtes ouverts dimanche ?")}

  <div class="hand" id="parIci">Par ici !<svg viewBox="0 0 90 70"><path id="parIciArrow" d="M8 6 C30 10, 60 20, 62 60" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/><path id="parIciHead" d="M44 48 L62 62 L72 44" fill="none" stroke="${B.blue}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
  <div id="phone"><div id="screen"><div id="chat"><img src="assets/shots/wa1.png" alt="" /><div class="sep"></div><img src="assets/shots/wa2.png" alt="" /></div></div></div>
  <div class="hand" id="repond">Il répond tout seul.</div>
  <div class="pill" id="p1">Votre ton</div>
  <div class="pill" id="p2">Vos expressions</div>

  <svg id="links" viewBox="0 0 ${W} ${H}">
    <path id="lk1" d="M843 878 C843 890, 710 888, 710 898" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/>
    <path id="lk2" d="M843 878 C843 890, 810 888, 810 898" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/>
    <path id="lk3" d="M843 878 C843 890, 910 888, 910 898" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/>
    <path id="lk4" d="M843 878 C843 890, 1010 888, 1010 898" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/>
  </svg>
  ${tile("tile1", "notion", "#000000")}${tile("tile2", "slack", "#4A154B")}${tile("tile3", "googlecalendar", "#4285F4")}${tile("tile4", "hubspot", "#FF7A59")}
  <div class="pill" id="tousOutils">Tous vos outils. Une seule IA.</div>

  <div id="stat"><div class="lbl">Disponible</div><div class="big" id="s24">24/24</div><div class="big sec" id="s7">7/7</div><div class="sub" id="sSub">Même la nuit, même le dimanche.</div></div>

  ${client("c1", "Dispos ce week-end ?")}${client("c2", "Vos tarifs ?")}${client("c3", "Ouvert dimanche ?")}

  <div id="endcard"><div class="g1"></div><div class="g2"></div><div class="grid"></div>
    <div id="logoCard"><img src="assets/logo-end.png" alt="Luma — Agents IA pour les entreprises" /></div>
    <div id="sign">Toujours à vos côtés.<svg viewBox="0 0 380 22"><path id="signUl" d="M3 14 C90 6, 200 6, 377 12" fill="none" stroke="${B.violet}" stroke-width="5" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100; stroke-dashoffset:100;"/></svg></div>
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
<title>LUMA — L'agent WhatsApp (réel)</title>
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
