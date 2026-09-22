/* motion.js — animations for luma-reel-agent (v002 paysage 16:9 ; v001 9:16 conservé dans qa/motion-9x16.js). Timing from window.__PLAN (assets/plan.json).
   Durations follow the LUMA brand library §6: title 0.3–0.6, underline 0.2–0.4, active word 0.15–0.3,
   tiles 0.3–0.6, screen slide 0.4–0.8, connection lines 0.4–0.8, data 0.4–1, outro 0.6–1. One main move at a time.
   One paused GSAP timeline, registered synchronously. Deterministic. */
(function () {
  var PLAN = window.__PLAN, DUR = PLAN.duration, FD = PLAN.footageDuration, T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  var BLUE = "#3B82F6";
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  // camera (paysage 1920×1080, origine 0 0, visage source à x≈960) — même grammaire que les films LUMA précédents
  var CENTER = { x: -38, y: -22, scale: 1.04 };    // FULL : visage au centre
  var LEFT = { x: 0, y: -40, scale: 1.26 };        // visage à droite (x≈1210) ; colonne gauche 90–840 libre
  var RIGHT = { x: -560, y: -70, scale: 1.32 };    // visage à gauche (x≈707) ; zone droite 1150–1900 libre
  var PUSH = { x: -77, y: -45, scale: 1.08 };      // FULL + push-in
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // ---- initial states ----
  gsap.set("#cam", LEFT);
  gsap.set("#frame", { scale: 1, borderRadius: 0 });
  gsap.set(["#logo", "#lt", "#hook", ".notif", ".tb", "#parIci", "#phone", "#repond", ".pill", ".tile", "#stat", ".cl", "#endcard", "#logoCard", "#sign", "#cta", "#base"], { autoAlpha: 0 });
  gsap.set(["#s24", "#s7", "#sSub"], { autoAlpha: 0 });
  gsap.set(".cl .ok", { autoAlpha: 0, scale: 0.4 });
  gsap.set("#chat", { y: 0 });
  gsap.set("#phone", { scale: 1 });
  gsap.set("#parIci", { rotation: -4 });
  gsap.set("#repond", { rotation: -2.5 });
  gsap.set("#cta", { xPercent: -50 });

  function pop(sel, t, from) {
    tl.fromTo(sel, Object.assign({ autoAlpha: 0, scale: 0.7 }, from || {}), { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: 0.45, ease: "back.out(1.5)" }, t);
  }
  function slideIn(sel, t, dx, dy, dur) {
    tl.fromTo(sel, { autoAlpha: 0, x: dx || 0, y: dy || 0 }, { autoAlpha: 1, x: 0, y: 0, duration: dur || 0.5, ease: "power3.out" }, t);
  }
  function draw(sel, t, dur) { tl.to(sel, { strokeDashoffset: 0, duration: dur || 0.35, ease: "power2.out" }, t); }

  // ---- s01: logo, lower-third, hook band ----
  slideIn("#logo", T.logo, 0, -16, 0.45);
  slideIn("#lt", T.lt, -30, 0, 0.5);
  tl.to("#lt", { autoAlpha: 0, x: -20, duration: 0.3, ease: "power2.in" }, T.hook - 0.05);
  slideIn("#hook", T.hook, 0, 70, 0.5);                  // title slides up from below (0.5 s)
  draw("#hookUl", T.hook + 0.3, 0.35);                    // underline draws left → right
  tl.to("#hook", { autoAlpha: 0, y: 40, duration: 0.3, ease: "power2.in" }, T.hookOut);

  // ---- s02: camera right, three incoming client messages, time badges ----
  // T.camRight: pas de mouvement en paysage (la colonne gauche sert déjà à l'accroche)
  pop("#n1", T.n1, { x: -40, y: 0 });
  pop("#n2", T.n2, { x: -40, y: 0 });
  pop("#n3", T.n3, { x: -40, y: 0 });
  tl.to("#cam", { scale: 1.30, y: -58, duration: 0.8, ease: "power2.out" }, T.cutPush); // hides the jump cut at 4.35
  ["#t1", "#t2", "#t3"].forEach(function (s, i) {
    var el = document.querySelector(s); if (el) el.textContent = ["07:48", "13:15", "23:40"][i];
    pop(s, T["t" + (i + 1)]);
  });

  // ---- s03: camera left, notifications out, « Par ici ! », phone slides in, « Il répond tout seul. » ----
  tl.to("#cam", Object.assign({}, RIGHT, CAM), T.camLeft);
  tl.to(".notif", { autoAlpha: 0, x: -90, duration: 0.45, ease: "power2.in", stagger: 0.05 }, T.notifOut);
  pop("#parIci", T.parIci, { x: 0, y: -10 });
  draw("#parIciArrow", T.parIci + 0.2, 0.4);
  draw("#parIciHead", T.parIci + 0.55, 0.2);
  slideIn("#phone", T.phone, 240, 0, 0.6);               // screen slides in from the right (0.6 s)
  tl.to("#parIci", { autoAlpha: 0, duration: 0.3 }, T.repond);
  pop("#repond", T.repond, { x: 0, y: 14 });

  // ---- s04: conversation scrolls, pills « Votre ton » / « Vos expressions » ----
  tl.to("#chat", { y: -140, duration: 0.7, ease: "power2.inOut" }, T.scroll1);
  tl.to("#chat", { y: -340, duration: 0.8, ease: "power2.inOut" }, T.scroll2);
  tl.to("#repond", { autoAlpha: 0, y: 10, duration: 0.3, ease: "power2.in" }, T.p1 - 0.3);
  pop("#p1", T.p1, { x: 30, y: 0 });
  pop("#p2", T.p2, { x: 30, y: 0 });

  // ---- s05: phone shrinks, tool tiles pop with connection lines, « Tous vos outils. Une seule IA. » ----
  tl.to([".pill", "#p1", "#p2"], { autoAlpha: 0, x: 40, duration: 0.3, ease: "power2.in" }, T.toolsIn);
  tl.to("#phone", { scale: 0.8, duration: 0.6, ease: "power3.inOut" }, T.toolsIn);
  ["#tile1", "#tile2", "#tile3", "#tile4"].forEach(function (s, i) {
    var t = T["tile" + (i + 1)];
    pop(s, t, { y: 26 });
    draw("#lk" + (i + 1), t - 0.15, 0.45);
  });
  pop("#tousOutils", T.tousOutils, { y: 16 });

  // ---- s06: camera right, phone/tiles out, stat card 24/24 · 7/7 ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camRight2);
  tl.to(["#phone", ".tile", "#tousOutils"], { autoAlpha: 0, x: 120, duration: 0.45, ease: "power2.in", stagger: 0.03 }, T.camRight2);
  tl.to("#links path", { opacity: 0, duration: 0.25 }, T.camRight2);
  slideIn("#stat", T.statIn, -50, 0, 0.55);
  pop("#s24", T.stat24, { y: 24 });
  pop("#s7", T.stat7, { y: 24 });
  slideIn("#sSub", T.stat7 + 0.35, 0, 10, 0.4);

  // ---- s07: camera centre + push-in, stat out, three clients answered ----
  tl.to("#cam", Object.assign({}, PUSH, { duration: 0.9, ease: "power2.inOut" }), T.camCenter);
  tl.to("#stat", { autoAlpha: 0, x: -80, duration: 0.4, ease: "power2.in" }, T.camCenter);
  tl.fromTo(".cl", { autoAlpha: 0, y: 30, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)", stagger: 0.12 }, T.clients);
  ["#d1", "#d2", "#d3"].forEach(function (s, i) {
    tl.to(s, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, T["done" + (i + 1)]);
  });

  // ---- s08: outro (logo fade + glow 0.8 s, signature, CTA) ----
  tl.to("#frame", { scale: 0.92, borderRadius: 60, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, T.outro);
  tl.to([".cl", "#logo"], { autoAlpha: 0, duration: 0.3 }, T.outro);
  tl.fromTo("#endcard", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, T.outro + 0.1);
  tl.fromTo("#endcard .g1", { scale: 0.7 }, { scale: 1, duration: 1.6, ease: "power2.out" }, T.outro);
  tl.fromTo("#endcard .g2", { scale: 0.7 }, { scale: 1, duration: 1.8, ease: "power2.out" }, T.outro);
  tl.fromTo("#logoCard", { autoAlpha: 0, scale: 0.94, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, T.swell);
  pop("#sign", T.sign, { y: 14 });
  draw("#signUl", T.sign + 0.25, 0.4);
  tl.fromTo("#cta", { autoAlpha: 0, scale: 0.8, xPercent: -50 }, { autoAlpha: 1, scale: 1, xPercent: -50, duration: 0.45, ease: "back.out(1.6)" }, T.cta);
  slideIn("#base", T.cta + 0.25, 0, 10, 0.4);
  tl.fromTo("#endcard .g1", { x: 0 }, { x: 40, duration: DUR - T.outro, ease: "sine.inOut" }, T.outro);

  // ---- captions: Inter Medium, active word on a blue pill; selected words get the frame + handles ----
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
      tl.to(s, { backgroundColor: BLUE, duration: 0.15, ease: "none" }, w.start);         // 0.15–0.3 s per library
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
  window.__timelines["luma-reel-agent"] = tl;
})();
