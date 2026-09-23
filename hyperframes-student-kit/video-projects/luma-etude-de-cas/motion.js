/* motion.js — animations for luma-etude-de-cas (paysage 16:9). Timing from window.__PLAN (assets/plan.json).
   Durations per LUMA brand library §6 (title 0.3–0.6, underline 0.2–0.4, active word 0.15–0.3, cards 0.3–0.6,
   screen slide 0.4–0.8, data 0.4–1, outro 0.6–1). One main move at a time. One paused GSAP timeline, deterministic. */
(function () {
  var PLAN = window.__PLAN, DUR = PLAN.duration, T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  var BLUE = "#3B82F6";
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  // camera (source face at x≈960): LEFT = face right, left column free ; RIGHT = face left, right zone free
  var LEFT = { x: 0, y: -24, scale: 1.22 };
  var RIGHT = { x: -560, y: -70, scale: 1.32 };
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // ---- initial states ----
  gsap.set("#cam", LEFT);
  gsap.set("#frame", { scale: 1, borderRadius: 0 });
  gsap.set(["#logo", "#lt", "#hook", "#phone", ".pill", ".chip", ".hand", ".mini", "#stat", "#endcard", "#logoCard", "#sign", "#cta", "#base", ".selbox", ".badge"], { autoAlpha: 0 });
  gsap.set(["#s5", "#sJour", "#sSub", "#stat .chk"], { autoAlpha: 0 });
  gsap.set("#scrVue", { y: 0, autoAlpha: 1 });
  gsap.set("#scrFin", { y: 0, x: 420, autoAlpha: 0 });
  gsap.set("#scrMkt", { y: 0, x: 420, autoAlpha: 0 });
  gsap.set("#phone", { scale: 1 });
  gsap.set("#important", { rotation: -3 });
  gsap.set("#travailler", { rotation: -3 });
  gsap.set("#okHand", { rotation: -3 });
  gsap.set("#warnHand", { rotation: 2 });
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
  // switch the screenshot shown in the phone: new one slides in from the right, old one slides out left (0.55 s)
  function screenTo(fromSel, toSel, t) {
    tl.to(fromSel, { x: -420, autoAlpha: 0, duration: 0.55, ease: "power3.inOut" }, t);
    tl.fromTo(toSel, { x: 420, autoAlpha: 0, y: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: "power3.inOut" }, t);
  }

  // ---- s01: logo, lower-third, hook (camera LEFT) ----
  slideIn("#logo", T.logo, 0, -16, 0.45);
  slideIn("#lt", T.lt, -30, 0, 0.5);
  out("#lt", T.hook - 0.05, -20, 0.3);
  slideIn("#hook", T.hook, 0, 70, 0.5);
  draw("#hookUl", T.hook + 0.3, 0.35);
  out("#hook", T.hookOut, -60, 0.4);

  // ---- s02: camera RIGHT, phone with the overview slides in, scrolls ----
  tl.to("#cam", Object.assign({}, RIGHT, CAM), T.camRight);
  slideIn("#phone", T.phone, 240, 0, 0.6);
  // the overview screenshot is shorter than the screen: no scroll, a gentle push-in on the phone instead
  tl.to("#phone", { scale: 1.08, duration: 0.7, ease: "power2.inOut" }, T.scrollVue);
  tl.to("#phone", { scale: 1.0, duration: 0.6, ease: "power2.inOut" }, T.scrollVue2);

  // ---- s03: finance screen, selections, « Très important ! » ----
  screenTo("#scrVue", "#scrFin", T.finance);
  pop("#pillFin", T.pillFin, { x: 30 });
  tl.to("#phone", { scale: 1.1, duration: 0.6, ease: "power2.inOut" }, T.scrollFin);
  selIn("#selCA", T.selCA);
  tl.to("#selCA", { autoAlpha: 0, duration: 0.2 }, T.selChart);
  tl.to("#scrFin", { y: -39, duration: 0.6, ease: "power2.inOut" }, T.selChart - 0.1);   // max scroll: screenshot is 739 px in a 700 px screen
  tl.set("#selChart", { y: -39 }, 0);             // the selection follows the scrolled screen
  selIn("#selChart", T.selChart + 0.3);
  pop("#important", T.important, { y: 12 });
  draw("#impArrow", T.important + 0.2, 0.4);
  draw("#impHead", T.important + 0.55, 0.2);
  out("#important", T.importantOut, 0, 0.3);
  tl.to("#selChart", { autoAlpha: 0, duration: 0.25 }, T.scrollFin2);
  tl.to("#scrFin", { y: 0, duration: 0.7, ease: "power2.inOut" }, T.scrollFin2);
  tl.to("#phone", { scale: 1.0, duration: 0.6, ease: "power2.inOut" }, T.scrollFin2);

  // ---- s04: marketing screen, channel chips, « À travailler ! » ----
  screenTo("#scrFin", "#scrMkt", T.marketing);
  out("#pillFin", T.marketing, 30, 0.3);
  pop("#pillMkt", T.pillMkt, { x: 30 });
  selIn("#selCanaux", T.selCanaux);
  tl.to("#selCanaux", { autoAlpha: 0, duration: 0.25 }, T.chip1);
  ["#chip1", "#chip2", "#chip3", "#chip4"].forEach(function (s, i) { pop(s, T["chip" + (i + 1)], { x: -30 }); });
  tl.to("#chip2", { backgroundColor: "#7C3AED", color: "#fff", duration: 0.3, ease: "none" }, T.travailler);
  tl.to("#chip2 b", { color: "#fff", duration: 0.3, ease: "none" }, T.travailler);
  tl.to("#chip2 .dot", { backgroundColor: "#fff", duration: 0.3, ease: "none" }, T.travailler);
  pop("#travailler", T.travailler, { y: 12 });

  // ---- s05: three mini screens fan out (vue d'ensemble), label, badges ----
  out(["#phone", "#pillMkt", ".chip", "#travailler"], T.vue, 120, 0.45);
  pop("#mini1", T.mini1, { y: 40 }, 0.5);
  pop("#mini2", T.mini2, { y: 40 }, 0.5);
  pop("#mini3", T.mini3, { y: 40 }, 0.5);
  pop("#vueLabel", T.vueLabel, { y: 14 });
  tl.fromTo("#bd2", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, T.ok);
  tl.fromTo("#bd1", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, T.ok + 0.12);
  pop("#okHand", T.ok + 0.1, { y: 10 });
  tl.fromTo("#bd3", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, T.warn);
  pop("#warnHand", T.warn + 0.1, { y: 10 });
  tl.to(".mini", { y: -14, duration: 0.5, ease: "power2.inOut", stagger: 0.06 }, T.regroup);

  // ---- s06: camera LEFT, stat card « 5 min / jour » + checklist ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camLeft);
  out([".mini", "#vueLabel", "#okHand", "#warnHand"], T.camLeft, 120, 0.45);
  slideIn("#stat", T.stat5 - 0.05, -50, 0, 0.55);
  pop("#s5", T.stat5, { y: 30 }, 0.5);
  slideIn("#sJour", T.statJour, -20, 0, 0.4);
  slideIn("#sSub", T.statSub, 0, 10, 0.4);
  ["#chk1", "#chk2", "#chk3"].forEach(function (s, i) { slideIn(s, T["chk" + (i + 1)], -20, 0, 0.4); });

  // ---- s07: outro ----
  tl.to("#frame", { scale: 0.92, borderRadius: 60, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, T.outro);
  tl.to(["#stat", "#logo"], { autoAlpha: 0, duration: 0.3 }, T.outro);
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
      var s = document.createElement("span"); s.className = "w"; s.id = "cg-" + gi + "-w" + wi; s.textContent = w.text;
      if (w.sel) {
        var fr = document.createElement("b"); fr.className = "fr"; fr.id = s.id + "-fr";
        ["a", "b", "c", "d"].forEach(function (k) { var i = document.createElement("i"); i.className = k; fr.appendChild(i); });
        s.appendChild(fr);
      }
      line.appendChild(s);
    });
    el.appendChild(line); caps.appendChild(el);
    tl.fromTo(el, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, g.start);
    g.words.forEach(function (w, wi) {
      var s = "#cg-" + gi + "-w" + wi;
      tl.to(s, { backgroundColor: BLUE, duration: 0.15, ease: "none" }, w.start);
      tl.to(s, { backgroundColor: "rgba(59,130,246,0)", duration: 0.15, ease: "none" }, Math.max(w.end - 0.03, w.start + 0.15));
      if (w.sel) {
        tl.fromTo(s + "-fr", { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out" }, w.start);
        tl.to(s + "-fr", { autoAlpha: 0, duration: 0.15 }, Math.min(g.end - 0.1, w.end + 0.45));
      }
    });
    tl.to(el, { autoAlpha: 0, duration: 0.1, ease: "power2.in" }, g.end - 0.1);
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
  window.__timelines["luma-etude-de-cas"] = tl;
})();
