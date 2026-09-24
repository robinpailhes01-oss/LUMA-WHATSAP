/* motion.js — animations for luma-site (paysage 16:9, 1920×1080). Timing from window.__PLAN (assets/plan.json).
   LUMA brand library §6 durations. One main move at a time. One paused GSAP timeline, deterministic.
   STYLE-04 : une page plein écran (s05) — le visage disparaît puis revient à la coupe suivante. */
(function () {
  var PLAN = window.__PLAN, DUR = PLAN.duration, T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  // camera (1920×1080 natif, origine 0 0). Visage mesuré sur grille : x 660–1080, y 60–740 (échelle 1). Rien n'est posé sur la tête.
  var FULL = { x: 0, y: 0, scale: 1 };                // visage x 660–1080 ; colonne droite x 1180–1880 libre
  var FACE_LEFT = { x: -384, y: -20, scale: 1.2 };    // visage x 408–912, y 52–868 ; colonne droite x 960–1880 libre
  var FACE_RIGHT = { x: 0, y: -20, scale: 1.2 };      // visage x 792–1296, y 52–868 ; colonne gauche x 40–740 libre
  var PUSH = { x: -96, y: -10, scale: 1.1 };          // visage x 630–1092, y 56–804 ; colonne droite x 1150–1880 libre
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // ---- initial states ----
  gsap.set("#cam", FULL);
  gsap.set("#frame", { scale: 1, borderRadius: 0 });
  gsap.set([".kick", ".title", ".sub", ".big", ".notif", ".row", ".pill", "#rapid", "#flow", ".hand", "#phone", ".tile", ".selbox", "#page", ".ph", "#res", "#auditCard", "#gratuit", "#auditCard .chk", "#endcard", "#logoCard", "#sign", "#cta", "#base", ".row .x"], { autoAlpha: 0 });
  gsap.set(["#flow .pill"], { autoAlpha: 1 });
  gsap.set(["#prospect", "#concu"], { autoAlpha: 0 });
  gsap.set("#strikeLine", { scaleX: 0 });
  gsap.set("#rapidFill", { scaleX: 0 });
  gsap.set(["#savoir", "#meteoHand", "#dessous1", "#dessous2"], { rotation: -3 });
  gsap.set("#cta", { xPercent: -50 });
  gsap.set("#ph2 img", { y: 0 });

  function pop(sel, t, from, dur) {
    tl.fromTo(sel, Object.assign({ autoAlpha: 0, scale: 0.7 }, from || {}), { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: dur || 0.45, ease: "back.out(1.5)" }, t);
  }
  function slideIn(sel, t, dx, dy, dur) {
    tl.fromTo(sel, { autoAlpha: 0, x: dx || 0, y: dy || 0 }, { autoAlpha: 1, x: 0, y: 0, duration: dur || 0.5, ease: "power3.out" }, t);
  }
  function out(sel, t, dx, dur) { tl.to(sel, { autoAlpha: 0, x: dx || 0, duration: dur || 0.35, ease: "power2.in" }, t); }
  function draw(sel, t, dur) { tl.to(sel, { strokeDashoffset: 0, duration: dur || 0.35, ease: "power2.out" }, t); }
  function selIn(sel, t) { tl.fromTo(sel, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" }, t); }
  function pulse(sel, t) { tl.to(sel, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }, t); }

  // ---- s01: accroche (FULL) ----
  slideIn("#kick", T.kick, -20, 0, 0.4);
  slideIn("#hook", T.hook, 0, 60, 0.5);
  slideIn("#hookSub", T.hookSub, -20, 0, 0.4);
  pop("#n1", T.n1, { x: 40 });
  pop("#n2", T.n2, { x: 40 });
  pop("#n3", T.n3, { x: 40 });

  // ---- s02: le problème (FACE_LEFT) ----
  tl.to("#cam", Object.assign({}, FACE_LEFT, CAM), T.cut1);
  out(["#kick", "#hook", "#hookSub", ".notif"], T.cut1, 80, 0.4);
  slideIn("#kick2", T.t2 - 0.1, -20, 0, 0.4);
  slideIn("#t2", T.t2, -40, 0, 0.5);
  slideIn("#manque", T.manque, 40, 0, 0.5);
  tl.to("#strikeLine", { scaleX: 1, duration: 0.35, ease: "power2.out" }, T.strike);
  tl.to("#manque", { opacity: 0.55, duration: 0.3 }, T.strike + 0.1);
  pop("#pTemps", T.temps, { x: 30 });
  pop("#pDispo", T.dispo, { x: 30 });
  out(["#manque", "#pTemps", "#pDispo"], T.rapid - 0.05, 60, 0.35);
  slideIn("#rapid", T.rapid, 40, 0, 0.5);
  tl.to("#rapidFill", { scaleX: 0.92, duration: 0.9, ease: "power2.out" }, T.rapidBar);
  pop("#num1", T.num1, { y: 20 }, 0.5);
  slideIn("#num1sub", T.num1 + 0.25, 0, 10, 0.35);
  out("#rapid", T.perdre - 0.05, 60, 0.35);
  tl.set("#flow", { autoAlpha: 1 }, T.perdre);
  pop("#prospect", T.perdre, { x: 30 });
  draw("#flowArrow", T.perdre + 0.35, 0.45);
  pop("#concu", T.concu, { x: 30 });
  pop("#savoir", T.savoir, { y: 10 });

  // ---- s03: mon histoire (FACE_RIGHT) ----
  tl.to("#cam", Object.assign({}, FACE_RIGHT, CAM), T.cut2);
  out(["#kick2", "#t2", "#flow", "#savoir"], T.cut2, 120, 0.4);
  slideIn("#kick3", T.kick3, -20, 0, 0.4);
  pop("#ans3", T.ans3, { y: 24 }, 0.5);
  slideIn("#ans3sub", T.ans3sub, -20, 0, 0.4);
  pop("#yacht", T.yacht, { x: -30 });
  slideIn("#emb", T.emb, -40, 0, 0.5);
  pop("#embX", T.embX, { scale: 0.4 });
  slideIn("#bot", T.bot, -40, 0, 0.5);
  pop("#botX", T.botX, { scale: 0.4 });

  // ---- s04: la solution (FACE_LEFT) ----
  tl.to("#cam", Object.assign({}, FACE_LEFT, CAM), T.cut3);
  out(["#kick3", "#ans3", "#ans3sub", "#yacht", "#emb", "#bot"], T.cut3, -120, 0.4);
  slideIn("#kick4", T.kick4, -20, 0, 0.4);
  slideIn("#t4", T.t4, -40, 0, 0.5);
  slideIn("#phone", T.phone, 240, 0, 0.6);
  pop("#pAuto", T.pAuto, { x: 30 });
  pop("#pMoi", T.pMoi, { x: 30 });
  pop("#pRegles", T.pRegles, { x: 30 });
  selIn("#selDispo", T.selDispo);
  pop("#pOutils", T.pOutils, { x: 30 });
  pulse("#pAuto", T.auto2);
  pop("#tCal", T.tCal, { y: 26 });
  pop("#tCrm", T.tCrm, { y: 26 });
  pop("#tMeteo", T.tMeteo, { y: 26 });
  pop("#meteoHand", T.meteoHand, { y: 10 });

  // ---- s05: objection puis page plein écran (FULL → PAGE) ----
  tl.to("#cam", Object.assign({}, FULL, CAM), T.cut4);
  out(["#kick4", "#t4", "#phone", "#pAuto", "#pMoi", "#pRegles", "#pOutils", ".tile", "#meteoHand"], T.cut4, 120, 0.4);
  tl.to("#selDispo", { autoAlpha: 0, duration: 0.2 }, T.cut4);
  pop("#peur", T.peur, { x: 30 });
  pop("#relation", T.relation, { x: 30 });
  out(["#peur", "#relation"], T.page - 0.05, 40, 0.3);
  tl.fromTo("#page", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" }, T.page);
  slideIn("#pageKick", T.page + 0.2, 0, -14, 0.4);
  slideIn("#pageTitle", T.page + 0.3, 0, 40, 0.5);
  pop("#ph1", T.ph1, { y: 60 }, 0.55);
  pop("#ph2", T.ph2, { y: 60 }, 0.55);
  pop("#ph3", T.ph3, { y: 60 }, 0.55);
  tl.to("#ph2 img", { y: -60, duration: 1.4, ease: "power2.inOut" }, T.ph3 + 0.8);
  pop("#dessous1", T.dessous1, { y: -10 });
  selIn("#selPh", T.selPh);

  // ---- s06: les résultats (FACE_RIGHT, retour au visage) ----
  tl.set("#cam", FACE_RIGHT, T.cut5);
  tl.to("#page", { autoAlpha: 0, scale: 1.03, duration: 0.45, ease: "power2.in" }, T.cut5);
  slideIn("#kick6", T.t6 - 0.1, -20, 0, 0.4);
  slideIn("#t6", T.t6, -40, 0, 0.5);
  slideIn("#r1", T.r1, -40, 0, 0.5);
  slideIn("#r2", T.r2, -40, 0, 0.5);
  slideIn("#r3", T.r3, -40, 0, 0.5);
  pop("#charge", T.charge, { x: -30 });
  pop("#exp", T.exp, { x: -30 });
  pop("#satis", T.satis, { x: -30 });

  // ---- s07: 2 ans + Résultats réels (PUSH) ----
  tl.to("#cam", Object.assign({}, PUSH, CAM), T.cut6);
  out(["#kick6", "#t6", ".row", "#charge", "#exp", "#satis"], T.cut6, -120, 0.4);
  pop("#ans2", T.ans2, { y: 24 }, 0.5);
  slideIn("#res", T.res, 240, 0, 0.6);
  slideIn("#ans2sub", T.ans2sub, -20, 0, 0.4);
  selIn("#sel1851", T.sel1851);
  tl.to("#sel1851", { autoAlpha: 0, duration: 0.2 }, T.sel217);
  selIn("#sel217", T.sel217);

  // ---- s08: CTA (FACE_LEFT) ----
  tl.to("#cam", Object.assign({}, FACE_LEFT, CAM), T.cut7);
  out(["#ans2", "#ans2sub", "#res"], T.cut7, 120, 0.4);
  tl.to("#sel217", { autoAlpha: 0, duration: 0.2 }, T.cut7);
  slideIn("#kick8", T.kick8, -20, 0, 0.4);
  slideIn("#t8", T.t8, -40, 0, 0.5);
  pop("#deleg", T.deleg, { x: 30 });
  pop("#fortune", T.fortune, { x: 30 });
  out(["#deleg", "#fortune"], T.audit - 0.05, 40, 0.3);
  slideIn("#auditCard", T.audit, 0, -40, 0.55);
  pop("#dessous2", T.dessous2, { y: -10 });
  draw("#dessousArrow", T.dessous2 + 0.2, 0.35);
  draw("#dessousHead", T.dessous2 + 0.5, 0.2);
  pop("#gratuit", T.gratuit, { scale: 0.5 });
  slideIn("#possible", T.possible, -20, 0, 0.4);
  slideIn("#comment", T.comment, -20, 0, 0.4);

  // ---- s09: outro ----
  tl.to("#frame", { scale: 0.92, borderRadius: 60, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, T.outro);
  tl.to(["#kick8", "#t8", "#auditCard", "#dessous2"], { autoAlpha: 0, duration: 0.3 }, T.outro);
  tl.fromTo("#endcard", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, T.outro + 0.1);
  tl.fromTo("#endcard .g1", { scale: 0.7 }, { scale: 1, duration: 1.6, ease: "power2.out" }, T.outro);
  tl.fromTo("#endcard .g2", { scale: 0.7 }, { scale: 1, duration: 1.8, ease: "power2.out" }, T.outro);
  tl.fromTo("#logoCard", { autoAlpha: 0, scale: 0.94, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, T.swell);
  pop("#sign", T.sign, { y: 14 });
  draw("#signUl", T.sign + 0.25, 0.4);
  tl.fromTo("#cta", { autoAlpha: 0, scale: 0.8, xPercent: -50 }, { autoAlpha: 1, scale: 1, xPercent: -50, duration: 0.45, ease: "back.out(1.6)" }, T.cta);
  slideIn("#base", T.cta + 0.25, 0, 10, 0.4);

  // ---- captions ----
  var caps = document.getElementById("caps");
  PLAN.captions.forEach(function (g, gi) {
    var el = document.createElement("div"); el.className = "cg"; el.id = "cg-" + gi;
    var line = document.createElement("div"); line.className = "line";
    g.words.forEach(function (w, wi) {
      var s = document.createElement("span"); s.className = "w" + (w.sel ? " sel" : ""); s.id = "cg-" + gi + "-w" + wi; s.textContent = w.text;
      line.appendChild(s);
    });
    el.appendChild(line); caps.appendChild(el);
    tl.fromTo(el, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, g.start);
    g.words.forEach(function (w, wi) {
      var s = "#cg-" + gi + "-w" + wi;
      tl.to(s, { color: "#8FBBFF", duration: 0.15, ease: "none" }, w.start);
      if (!w.sel) tl.to(s, { color: "#FFFFFF", duration: 0.15, ease: "none" }, Math.max(w.end - 0.03, w.start + 0.15));
    });
    tl.set(el, { autoAlpha: 0 }, g.end);
  });
  PLAN.captions.forEach(function (g, gi) {
    var el = document.getElementById("cg-" + gi); if (!el) return;
    tl.seek(g.end + 0.01);
    var cs = window.getComputedStyle(el);
    if (cs.opacity !== "0" && cs.visibility !== "hidden") console.warn("[caption-lint] group " + gi + " still visible at " + (g.end + 0.01).toFixed(2));
  });
  tl.seek(0);

  tl.set({}, {}, DUR);
  window.__timelines["luma-site"] = tl;
})();
