/* motion.js — animations for luma-outils-ia (vertical 9:16). Timing from window.__PLAN (assets/plan.json).
   LUMA brand library §6 durations. One main move at a time. One paused GSAP timeline, deterministic. */
(function () {
  var PLAN = window.__PLAN, DUR = PLAN.duration, T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  var BLUE = "#3B82F6";
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  // camera (1080×1920 native, face at x 360–720 / y 500–845 at scale 1, origin 0 0)
  // v002: face measured at x 440–800 / y 700–1230 (scale 1). Nothing is ever placed over the head.
  var FULL = { x: 0, y: 0, scale: 1 };               // face y 700–1230 ; top zone y 60–640 free
  var FACE_LEFT = { x: -330, y: -290, scale: 1.3 };  // face x 242–710, y 620–1310 ; right column x 740–1060 free
  var FACE_RIGHT = { x: -90, y: -290, scale: 1.3 };  // face x 482–950, y 620–1310 ; left column x 30–440 free
  var PUSH = { x: -54, y: -150, scale: 1.1 };        // face x 430–826, y 620–1203 ; chest from y 1240
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // ---- initial states ----
  gsap.set("#cam", FULL);
  gsap.set("#frame", { scale: 1, borderRadius: 0 });
  gsap.set(["#counter", "#hook", "#hookSub", "#stat3h", "#s3jour", "#s3sub", ".title", "#phone", "#wa", "#gpt", ".pill", ".chip", ".tile", ".hand", ".slot", ".selbox", "#comment", "#auditCard", "#gratuit", "#auditCard .chk", "#endcard", "#logoCard", "#sign", "#cta", "#base"], { autoAlpha: 0 });
  gsap.set(["#cn2", "#cn3"], { autoAlpha: 0 });
  gsap.set("#cn1", { autoAlpha: 1 });
  gsap.set("#scrVue", { x: 0, autoAlpha: 1 });
  gsap.set(["#scrFin", "#scrMkt", "#scrResa"], { x: 370, autoAlpha: 0 });
  gsap.set("#auditFill", { scaleX: 0 });
  gsap.set("#typed span", { autoAlpha: 0 });
  gsap.set("#cur", { autoAlpha: 0 });
  gsap.set("#geoDef", { rotation: -3 });
  gsap.set("#gptHand", { rotation: -3 });
  gsap.set("#meteoHand", { rotation: -3 });
  gsap.set("#dessous", { rotation: -4 });
  gsap.set("#cta", { xPercent: -50 });

  function pop(sel, t, from, dur) {
    tl.fromTo(sel, Object.assign({ autoAlpha: 0, scale: 0.7 }, from || {}), { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: dur || 0.45, ease: "back.out(1.5)" }, t);
  }
  function slideIn(sel, t, dx, dy, dur) {
    tl.fromTo(sel, { autoAlpha: 0, x: dx || 0, y: dy || 0 }, { autoAlpha: 1, x: 0, y: 0, duration: dur || 0.5, ease: "power3.out" }, t);
  }
  function out(sel, t, dx, dur) { tl.to(sel, { autoAlpha: 0, x: dx || 0, duration: dur || 0.35, ease: "power2.in" }, t); }
  function draw(sel, t, dur) { tl.to(sel, { strokeDashoffset: 0, duration: dur || 0.35, ease: "power2.out" }, t); }
  function selIn(sel, t) { tl.fromTo(sel, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" }, t); }
  function screenTo(fromSel, toSel, t) {
    tl.to(fromSel, { x: -370, autoAlpha: 0, duration: 0.55, ease: "power3.inOut" }, t);
    tl.fromTo(toSel, { x: 370, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: "power3.inOut" }, t);
  }
  function counter(n, t) {
    ["#cn1", "#cn2", "#cn3"].forEach(function (s, i) { tl.to(s, { autoAlpha: i === n - 1 ? 1 : 0, duration: 0.25 }, t); });
  }

  // ---- s01: hook (FULL) ----
  slideIn("#hook", T.hook, 0, 70, 0.5);
  draw("#hookUl", T.hook + 0.3, 0.35);
  slideIn("#hookSub", T.hookSub, -20, 0, 0.4);
  out("#hook", T.stat3h - 0.35, -40, 0.3);
  slideIn("#stat3h", T.stat3h - 0.05, 0, 40, 0.5);
  pop("#s3", T.stat3h, { y: 24 }, 0.5);
  slideIn("#s3jour", T.stat3hJour, -20, 0, 0.35);
  slideIn("#s3sub", T.stat3hJour + 0.2, 0, 10, 0.35);

  // ---- s02: outil 1 — tableau de bord (FACE_LEFT) ----
  tl.to("#cam", Object.assign({}, FACE_LEFT, CAM), T.cut1);
  out("#stat3h", T.cut1, -60, 0.4);
  slideIn("#t1", T.t1, -40, 0, 0.5);
  slideIn("#counter", T.cnt1, 0, -14, 0.4);
  slideIn("#phone", T.phone, 240, 0, 0.6);
  tl.to("#phone", { scale: 1.06, duration: 0.6, ease: "power2.inOut" }, T.zoomVue);
  tl.to("#phone", { scale: 1.0, duration: 0.5, ease: "power2.inOut" }, T.fin - 0.5);
  screenTo("#scrVue", "#scrFin", T.fin);
  pop("#pillFin", T.pillFin, { x: 30 });
  selIn("#selMarge", T.selMarge);
  tl.to("#selMarge", { autoAlpha: 0, duration: 0.2 }, T.mkt);
  screenTo("#scrFin", "#scrMkt", T.mkt);
  out("#pillFin", T.mkt, 30, 0.3);
  pop("#pillMkt", T.pillMkt, { x: 30 });
  selIn("#selCanaux", T.selCanaux);
  pop("#chip1", T.chipsCanaux, { x: 30 });
  pop("#chip2", T.chipsCanaux + 0.15, { x: 30 });
  tl.to(["#selCanaux", "#chip1", "#chip2"], { autoAlpha: 0, duration: 0.25 }, T.resa);
  screenTo("#scrMkt", "#scrResa", T.resa);
  out("#pillMkt", T.resa, 30, 0.3);
  pop("#pillResa", T.pillResa, { x: 30 });
  selIn("#selVenir", T.selVenir);
  tl.to("#selVenir", { autoAlpha: 0, duration: 0.2 }, T.selEnc);
  selIn("#selEnc", T.selEnc);

  // ---- s03: outil 2 — GEO (FACE_RIGHT) ----
  tl.to("#cam", Object.assign({}, FACE_RIGHT, CAM), T.cut2);
  out(["#phone", "#pillResa", "#t1"], T.cut2, 120, 0.4);
  tl.to("#selEnc", { autoAlpha: 0, duration: 0.2 }, T.cut2);
  slideIn("#t2", T.t2, -40, 0, 0.5);
  counter(2, T.cnt2);
  pop("#geoDef", T.geoDef, { y: 10 });
  slideIn("#audit", T.audit, 40, 0, 0.5);
  tl.to("#auditFill", { scaleX: 0.72, duration: 0.9, ease: "power2.out" }, T.auditBar);
  out("#geoDef", T.gpt - 0.2, 0, 0.3);
  slideIn("#gpt", T.gpt, -240, 0, 0.6);
  selIn("#selCite", T.selCite);
  out("#audit", T.actions - 0.05, 40, 0.3);
  slideIn("#actions", T.actions, 40, 0, 0.5);
  tl.to("#actions .ic", { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.inOut" }, T.actTick);
  pop("#ia1", T.ia1, { y: 26 });
  pop("#ia2", T.ia2, { y: 26 });
  pop("#ia3", T.ia3, { y: 26 });
  out("#actions", T.stat20 - 0.05, 40, 0.3);
  slideIn("#stat20", T.stat20, 40, 0, 0.5);
  slideIn("#stat20Sub", T.stat20Sub, 0, 10, 0.35);
  tl.to("#selCite", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }, T.gptHl);
  pop("#gptHand", T.gptHl, { y: 10 });

  // ---- s04: outil 3 — agent WhatsApp (FACE_LEFT) ----
  tl.to("#cam", Object.assign({}, FACE_LEFT, CAM), T.cut3);
  out(["#gpt", ".tile", "#stat20", "#gptHand", "#t2"], T.cut3, -120, 0.4);
  tl.to("#selCite", { autoAlpha: 0, duration: 0.2 }, T.cut3);
  slideIn("#t3", T.t3, -40, 0, 0.5);
  counter(3, T.cnt3);
  slideIn("#wa", T.wa, 240, 0, 0.6);
  tl.to("#wa", { scale: 1.05, duration: 0.6, ease: "power2.inOut" }, T.waScroll);
  tl.to("#wa", { scale: 1.0, duration: 0.5, ease: "power2.inOut" }, T.pAuto);
  pop("#pAuto", T.pAuto, { x: 30 });
  pop("#pMoi", T.pMoi, { x: 30 });
  pop("#pRegles", T.pRegles, { x: 30 });
  pop("#pOutils", T.pOutils, { x: 30 });
  tl.to("#pAuto", { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }, T.autonome2);
  pop("#tCal", T.tCal, { y: 26 });
  pop("#tCrm", T.tCrm, { y: 26 });
  selIn("#selDispo", T.selDispo);
  pop("#tMeteo", T.tMeteo, { y: 26 });
  pop("#meteoHand", T.meteoHand, { y: 10 });

  // ---- s05: CTA (PUSH) ----
  tl.to("#cam", Object.assign({}, PUSH, CAM), T.cut4);
  out(["#wa", ".pill", "#tCal", "#tCrm", "#tMeteo", "#meteoHand", "#t3", "#counter"], T.cut4, 120, 0.4);
  tl.to("#selDispo", { autoAlpha: 0, duration: 0.2 }, T.cut4);
  pop("#pme", T.pme, { x: -30 });
  pop("#ia", T.ia, { x: -30 });
  slideIn("#comment", T.comment, 0, 50, 0.5);
  tl.set("#cur", { autoAlpha: 1 }, T.comment + 0.3);
  tl.to("#ph", { autoAlpha: 0, duration: 0.15 }, T.typeOutil - 0.05);
  tl.to("#typed span", { autoAlpha: 1, duration: 0.05, stagger: 0.09, ease: "none" }, T.typeOutil);
  pop("#dessous", T.dessous, { y: -10 });
  draw("#dessousArrow", T.dessous + 0.2, 0.35);
  draw("#dessousHead", T.dessous + 0.5, 0.2);
  out(["#pme", "#ia"], T.auditCard - 0.4, -30, 0.3);
  slideIn("#auditCard", T.auditCard, 0, -40, 0.55);
  pop("#gratuit", T.gratuit, { scale: 0.5 });
  slideIn("#possible", T.possible, -20, 0, 0.4);
  slideIn("#apporter", T.apporter, -20, 0, 0.4);

  // ---- s06: outro ----
  tl.to("#frame", { scale: 0.92, borderRadius: 60, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, T.outro);
  tl.to(["#comment", "#dessous", "#auditCard"], { autoAlpha: 0, duration: 0.3 }, T.outro);
  tl.fromTo("#endcard", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, T.outro + 0.1);
  tl.fromTo("#endcard .g1", { scale: 0.7 }, { scale: 1, duration: 1.6, ease: "power2.out" }, T.outro);
  tl.fromTo("#endcard .g2", { scale: 0.7 }, { scale: 1, duration: 1.8, ease: "power2.out" }, T.outro);
  tl.fromTo("#logoCard", { autoAlpha: 0, scale: 0.94, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, T.swell);
  pop("#sign", T.sign, { y: 14 });
  draw("#signUl", T.sign + 0.25, 0.4);
  tl.fromTo("#cta", { autoAlpha: 0, scale: 0.8, xPercent: -50 }, { autoAlpha: 1, scale: 1, xPercent: -50, duration: 0.45, ease: "back.out(1.6)" }, T.cta);
  slideIn("#base", T.cta + 0.25, 0, 10, 0.4);
  tl.fromTo("#endcard .g1", { x: 0 }, { x: 40, duration: DUR - T.outro, ease: "sine.inOut" }, T.outro);

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
      // active word turns light blue while spoken (0.15 s), key words stay blue afterwards
      tl.to(s, { color: "#8FBBFF", duration: 0.15, ease: "none" }, w.start);
      if (!w.sel) tl.to(s, { color: "#FFFFFF", duration: 0.15, ease: "none" }, Math.max(w.end - 0.03, w.start + 0.15));
    });
    tl.set(el, { autoAlpha: 0 }, g.end);   // instant switch: contiguous groups never overlap on screen
  });
  PLAN.captions.forEach(function (g, gi) {
    var el = document.getElementById("cg-" + gi); if (!el) return;
    tl.seek(g.end + 0.01);
    var cs = window.getComputedStyle(el);
    if (cs.opacity !== "0" && cs.visibility !== "hidden") console.warn("[caption-lint] group " + gi + " still visible at " + (g.end + 0.01).toFixed(2));
  });
  tl.seek(0);

  tl.set({}, {}, DUR);
  window.__timelines["luma-outils-ia"] = tl;
})();
