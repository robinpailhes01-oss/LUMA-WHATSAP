/* motion.js — animations for luma-audit-ia.
   Timing comes from window.__PLAN (assets/plan.json via build.mjs): event ids give the times,
   captions give word onsets. One paused GSAP timeline, registered synchronously. Deterministic. */
(function () {
  var PLAN = window.__PLAN;
  var ID = PLAN.composition;
  var DUR = PLAN.duration;
  var T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });

  var BLUE = "#4263F5";
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  // ---- camera framings (see DESIGN.md) ----
  var FULL = { x: -38, y: -22, scale: 1.04 };
  var LEFT = { x: 0, y: -60, scale: 1.26 };
  var RIGHT = { x: -560, y: -90, scale: 1.32 };
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // initial states (immediate, outside the timeline)
  gsap.set("#cam", FULL);
  gsap.set("#frame", { x: 0, y: 0, scale: 1, borderRadius: 0 });
  gsap.set(["#kicker", "#wordmark", "#company", ".panel", "#card"], { autoAlpha: 0 });
  gsap.set(["#p1b1", "#p1b2"], { autoAlpha: 0 });
  gsap.set("#p3slot", { autoAlpha: 0, scale: 0.85 });
  gsap.set("#sig .lm, #sig .tl", { autoAlpha: 0 });

  // ambient: slow drift of the brand glows (visible in the outro), finite repeats
  tl.fromTo("#bg .g1", { x: 0, y: 0 }, { x: 60, y: 40, duration: DUR, ease: "sine.inOut" }, 0);
  tl.fromTo("#bg .g2", { x: 0, y: 0 }, { x: -70, y: -30, duration: DUR, ease: "sine.inOut" }, 0);

  // ---- s01: hook ----
  tl.fromTo("#kicker", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.55, ease: "power3.out" }, T.kicker);
  tl.fromTo("#wordmark", { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, T.wordmark);

  // ---- s02: camera to the right, three glass panels on the left ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camLeft);

  function panelIn(sel, t) {
    tl.fromTo(sel, { autoAlpha: 0, x: -48, rotation: -1.5, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.6, ease: "power3.out" }, t);
  }
  panelIn("#p1", T.p1);
  tl.fromTo("#p1b1", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, T.p1 + 0.18);
  tl.fromTo("#p1b2", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, T.p1 + 0.5);

  panelIn("#p2", T.p2);
  ["#p2r1", "#p2r2", "#p2r3"].forEach(function (r, i) {
    var t = T.p2 + 0.16 + i * 0.14;
    tl.fromTo(r, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" }, t);
    tl.to(r + " .bar i", { scaleX: 1, duration: 0.45, ease: "power2.out" }, t + 0.1);
    tl.to(r + " .chk", { backgroundColor: BLUE, borderColor: BLUE, duration: 0.15, ease: "none" }, t + 0.5);
    tl.to(r + " .chk svg", { opacity: 1, duration: 0.12, ease: "none" }, t + 0.52);
  });

  panelIn("#p3", T.p3);
  tl.fromTo("#p3 .day", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.06 }, T.p3 + 0.14);
  tl.to("#p3slot", { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" }, T.p3 + 0.5);

  tl.fromTo("#company", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, T.company);

  // ---- s03: camera pans, panels leave with it, company card on the right ----
  tl.to("#cam", Object.assign({}, RIGHT, CAM), T.camRight);
  tl.to([".panel", "#company"], { x: -80, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.04 }, T.camRight);

  tl.fromTo("#card", { autoAlpha: 0, x: 50, rotation: 1.5, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.65, ease: "power3.out" }, T.cardIn);
  tl.to("#chart b", { scaleY: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 }, T.cardIn + 0.25);

  tl.set("#outline", { autoAlpha: 1 }, T.outline);
  tl.to("#outline-rect", { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, T.outline);
  tl.fromTo("#tag", { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, T.tag);

  tl.to("#card", { scale: 1.22, duration: 0.7, ease: "power3.inOut" }, T.grow);
  tl.to("#outline", { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, T.grow + 0.45);
  tl.to("#chart b", { scaleY: 1.06, duration: 0.5, ease: "power2.out", stagger: 0.05 }, T.grow + 0.2);

  // ---- s04: the three AI capabilities dock around the grown card ----
  function dock(sel, t, fromX, fromY) {
    tl.fromTo(sel, { autoAlpha: 0, x: fromX, y: fromY, rotation: -2 }, { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.55, ease: "power3.out" }, t);
  }
  dock("#chip1", T.chip1, -60, 20);
  dock("#chip2", T.chip2, -60, 20);
  dock("#chip3", T.chip3, -60, -20);
  tl.to(["#lk1", "#lk2", "#lk3"], { strokeDashoffset: 0, duration: 0.45, ease: "power2.out", stagger: 0.08 }, T.links);

  // ---- s05: rounded vignette moves onto the brand background; documents; signature ----
  tl.to("#cam", Object.assign({}, FULL, { duration: 0.9, ease: "power3.inOut" }), T.vignette);
  tl.to("#frame", { x: 150, y: 345, scale: 0.36, borderRadius: 48, duration: 0.9, ease: "power3.inOut" }, T.vignette);
  tl.to(["#card", "#chip1", "#chip2", "#chip3", "#tag", "#kicker", "#wordmark"], { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, T.vignette);
  tl.to("#links path", { opacity: 0, duration: 0.3 }, T.vignette);
  // slow drift of the vignette while the outro reads
  tl.to("#frame", { x: 170, y: 335, duration: DUR - (T.vignette + 0.9), ease: "sine.inOut" }, T.vignette + 0.9);

  gsap.set(".doc", { autoAlpha: 0, rotationY: -22, x: 80 });
  tl.to(".doc", { autoAlpha: 1, rotationY: -16, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, T.docs);
  tl.to(".doc", { y: -8, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 0, stagger: 0.1 }, T.docs + 0.8);

  tl.to("#sig .lm", { autoAlpha: 1, duration: 0.55, ease: "power3.out" }, T.signature);
  tl.fromTo("#sig .tl", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, T.signature + 0.18);

  // ---- captions: exact retained words, group appears once (no vertical motion), active word on blue ----
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

  // caption self-lint
  PLAN.captions.forEach(function (g, gi) {
    var el = document.getElementById("cg-" + gi); if (!el) return;
    tl.seek(g.end + 0.01);
    var cs = window.getComputedStyle(el);
    if (cs.opacity !== "0" && cs.visibility !== "hidden") console.warn("[caption-lint] group " + gi + " still visible at " + (g.end + 0.01).toFixed(2));
  });
  tl.seek(0);

  tl.set({}, {}, DUR);
  window.__timelines["luma-audit-ia"] = tl; // literal key so static checks can bind it (ID === "luma-audit-ia")
})();
