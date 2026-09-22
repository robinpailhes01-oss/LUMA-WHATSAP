/* motion.js — animations for luma-audit-gratuit. Timing from window.__PLAN (assets/plan.json).
   One paused GSAP timeline, registered synchronously. Deterministic. */
(function () {
  var PLAN = window.__PLAN;
  var DUR = PLAN.duration;
  var T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  var BLUE = "#4263F5";

  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  var FULL = { x: -38, y: -22, scale: 1.04 };
  var LEFT = { x: 0, y: -60, scale: 1.26 };
  var RIGHT = { x: -560, y: -90, scale: 1.32 };
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // initial states (immediate)
  gsap.set("#cam", FULL);
  gsap.set("#frame", { x: 0, y: 0, scale: 1, borderRadius: 0 });
  gsap.set(["#logo", "#step", "#cardA", ".panel", "#card1", "#endcard"], { autoAlpha: 0 });
  gsap.set(["#cardA-l1", "#cardA-chip", "#cardA-l2", "#card1-t", "#clock"], { autoAlpha: 0 });
  gsap.set(".goal", { scaleY: 0 });
  gsap.set("#p3 .gauge i", { scaleX: 0 });

  tl.fromTo("#bg .g1", { x: 0, y: 0 }, { x: 60, y: 40, duration: DUR, ease: "sine.inOut" }, 0);
  tl.fromTo("#bg .g2", { x: 0, y: 0 }, { x: -70, y: -30, duration: DUR, ease: "sine.inOut" }, 0);

  // ---- s01: presenter, then the official logo on "LUMA" ----
  tl.fromTo("#logo", { autoAlpha: 0, y: -24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, T.logo);

  // ---- s02: camera LEFT, step chip, white audit card with the mascot ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camLeft);
  tl.fromTo("#step", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, T.step1);
  tl.fromTo("#cardA", { autoAlpha: 0, x: -48, rotation: -1.5, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.65, ease: "power3.out" }, T.cardIn);
  tl.fromTo("#cardA .mascot", { y: 14, rotation: 2 }, { y: 0, rotation: 0, duration: 0.7, ease: "power3.out" }, T.cardIn + 0.1);
  tl.fromTo("#cardA-l1", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, T.title);
  tl.fromTo("#cardA-chip", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, T.gratuit);
  tl.fromTo("#cardA-l2", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, T.sub);
  // the mascot breathes a little while the card is on screen
  tl.to("#cardA .mascot", { y: -4, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 5 }, T.cardIn + 0.9);

  // ---- s03: three compact panels ----
  function panelIn(sel, t) {
    tl.fromTo(sel, { autoAlpha: 0, x: -40, rotation: -1, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.55, ease: "power3.out" }, t);
  }
  panelIn("#p1", T.p1);
  tl.fromTo("#p1 .tool", { autoAlpha: 0, y: 8, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)", stagger: 0.07 }, T.p1 + 0.15);
  panelIn("#p2", T.p2);
  tl.fromTo("#p2 .goal", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 }, T.p2 + 0.15);
  panelIn("#p3", T.p3);
  tl.fromTo("#p3 .gauge i", { scaleX: 0 }, { scaleX: 0.62, duration: 0.7, ease: "power2.out" }, T.p3 + 0.15);
  tl.to("#gauge-dot", { x: 0.62 * 230, duration: 0.7, ease: "power2.out" }, T.p3 + 0.15);

  // ---- s04: camera RIGHT, left column leaves, card "1 · gagner du temps" ----
  tl.to("#cam", Object.assign({}, RIGHT, CAM), T.camRight);
  tl.to(["#cardA", "#step", ".panel"], { x: -80, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.04 }, T.camRight);
  tl.fromTo("#card1", { autoAlpha: 0, x: 50, rotation: 1.5, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.65, ease: "power3.out" }, T.card1);
  tl.fromTo("#card1 .n", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, T.card1 + 0.12);
  tl.fromTo("#clock", { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, T.clock);
  tl.fromTo("#hands", { rotation: 0, svgOrigin: "95 95" }, { rotation: 360, svgOrigin: "95 95", duration: 1.4, ease: "power2.inOut" }, T.clock + 0.2);
  tl.to("#ring", { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" }, T.ring);
  tl.fromTo("#card1-t", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, T.ring + 0.05);

  // ---- s05: vignette + end card with the official logo ----
  tl.to("#cam", Object.assign({}, FULL, { duration: 0.9, ease: "power3.inOut" }), T.vignette);
  tl.to("#frame", { x: 150, y: 345, scale: 0.36, borderRadius: 48, duration: 0.9, ease: "power3.inOut" }, T.vignette);
  tl.to(["#card1", "#logo"], { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, T.vignette);
  tl.to("#frame", { x: 170, y: 335, duration: DUR - (T.vignette + 0.9), ease: "sine.inOut" }, T.vignette + 0.9);
  tl.fromTo("#endcard", { autoAlpha: 0, y: 26, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, T.endcard);

  // ---- captions ----
  var caps = document.getElementById("caps");
  PLAN.captions.forEach(function (g, gi) {
    var el = document.createElement("div"); el.className = "cg"; el.id = "cg-" + gi;
    var line = document.createElement("div"); line.className = "line";
    g.words.forEach(function (w, wi) {
      var s = document.createElement("span"); s.className = "w"; s.id = "cg-" + gi + "-w" + wi; s.textContent = w.text; line.appendChild(s);
    });
    el.appendChild(line); caps.appendChild(el);
    tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "power2.out" }, g.start);
    g.words.forEach(function (w, wi) {
      var s = "#cg-" + gi + "-w" + wi;
      tl.to(s, { backgroundColor: BLUE, duration: 0.06, ease: "none" }, w.start);
      tl.to(s, { backgroundColor: "rgba(66,99,245,0)", duration: 0.12, ease: "none" }, Math.max(w.end - 0.02, w.start + 0.1));
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
  window.__timelines["luma-audit-gratuit"] = tl;
})();
