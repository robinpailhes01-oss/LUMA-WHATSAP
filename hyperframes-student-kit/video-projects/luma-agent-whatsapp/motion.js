/* motion.js — animations for luma-agent-whatsapp. Timing from window.__PLAN (assets/plan.json).
   One paused GSAP timeline, registered synchronously. Deterministic. */
(function () {
  var PLAN = window.__PLAN, DUR = PLAN.duration, T = {};
  PLAN.events.forEach(function (e) { T[e.id] = e.time; });
  var BLUE = "#4263F5";
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });

  var FULL = { x: -38, y: -22, scale: 1.04 };
  var LEFT = { x: 0, y: -60, scale: 1.26 };
  var RIGHT = { x: -560, y: -90, scale: 1.32 };
  var LEFT2 = { x: -60, y: -90, scale: 1.32 };
  var CAM = { duration: 0.7, ease: "power2.inOut" };

  // initial states
  gsap.set("#cam", FULL);
  gsap.set("#frame", { x: 0, y: 0, scale: 1, borderRadius: 0 });
  gsap.set(["#tools", "#subs", "#saving", "#fier", "#phone", ".chip", "#table", ".lead", "#relance", "#endcard"], { autoAlpha: 0 });
  gsap.set(".tile", { autoAlpha: 0, scale: 0.6 });
  gsap.set("#subs .strike", { scaleX: 0 });
  gsap.set("#perYear", { autoAlpha: 0 });
  gsap.set("#chat", { y: 0 });

  tl.fromTo("#bg .g1", { x: 0, y: 0 }, { x: 60, y: 40, duration: DUR, ease: "sine.inOut" }, 0);
  tl.fromTo("#bg .g2", { x: 0, y: 0 }, { x: -70, y: -30, duration: DUR, ease: "sine.inOut" }, 0);

  function panelIn(sel, t, dx) {
    tl.fromTo(sel, { autoAlpha: 0, x: dx, rotation: dx < 0 ? -1.2 : 1.2, scale: 0.98 }, { autoAlpha: 1, x: 0, rotation: 0, scale: 1, duration: 0.55, ease: "power3.out" }, t);
  }

  // ---- s02: tools, subscriptions, savings ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camLeft);
  panelIn("#tools", T.tiles - 0.15, -40);
  [["#tile1", T.tiles], ["#tile2", T.tile2], ["#tile3", T.tile3], ["#tile4", T.tile4]].forEach(function (p) {
    tl.to(p[0], { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, p[1]);
    tl.to(p[0], { backgroundColor: BLUE, borderColor: BLUE, duration: 0.2, ease: "none" }, p[1] + 0.12);
  });
  panelIn("#subs", T.subs, -40);
  tl.fromTo("#subs .row", { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out", stagger: 0.1 }, T.subs + 0.15);
  ["#k1", "#k2", "#k3"].forEach(function (k, i) { tl.to(k, { scaleX: 1, duration: 0.3, ease: "power3.out" }, T.strike + i * 0.12); });
  tl.to("#subs .row", { opacity: 0.55, duration: 0.3 }, T.strike + 0.2);
  panelIn("#saving", T.saving - 0.05, -40);
  var amt = { v: 0 };
  tl.to(amt, { v: 2000, duration: 0.9, ease: "power2.out", onUpdate: function () { document.getElementById("amount").textContent = Math.round(amt.v).toLocaleString("fr-FR"); } }, T.saving);
  tl.fromTo("#perYear", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, T.perYear);
  tl.to("#subs-title", { backgroundColor: BLUE, duration: 0.25, ease: "none" }, T.abo);
  tl.to("#r-crm", { opacity: 1, backgroundColor: "rgba(66,99,245,0.35)", duration: 0.3, ease: "none" }, T.crm);

  // ---- s03: camera RIGHT, phone with the real conversation ----
  tl.to("#cam", Object.assign({}, RIGHT, CAM), T.camRight);
  tl.to(["#tools", "#subs", "#saving"], { x: -80, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.04 }, T.camRight);
  tl.set("#ghost", { autoAlpha: 1 }, T.phoneGhost);
  tl.to("#ghost-rect", { strokeDashoffset: 0, duration: 1.0, ease: "power2.out" }, T.phoneGhost);
  tl.fromTo("#fier", { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, T.fier);
  tl.fromTo("#phone", { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" }, T.phone);
  tl.to("#ghost", { autoAlpha: 0, duration: 0.25 }, T.phone + 0.2);
  // the two real conversations are stacked (483 + 14 + 665 px) in a 780 px screen; scroll by steps, max -382
  tl.to("#chat", { y: -60, duration: 0.6, ease: "power2.inOut" }, T.scroll1);
  tl.to("#chat", { y: -120, duration: 0.6, ease: "power2.inOut" }, T.scroll2);
  tl.to("#chat", { y: -180, duration: 0.6, ease: "power2.inOut" }, T.scroll3);
  tl.to("#chat", { y: -240, duration: 0.6, ease: "power2.inOut" }, T.scroll4);
  tl.fromTo("#chipHum", { autoAlpha: 0, x: -30, rotation: -2 }, { autoAlpha: 1, x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, T.humaine);
  tl.fromTo("#chipTools", { autoAlpha: 0, x: -30, rotation: -2 }, { autoAlpha: 1, x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, T.chipTools);
  tl.to("#lkT", { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T.chipTools + 0.25);
  tl.fromTo("#chipMeteo", { autoAlpha: 0, x: -30, rotation: -2 }, { autoAlpha: 1, x: 0, rotation: 0, duration: 0.5, ease: "power3.out" }, T.chipMeteo);
  tl.to("#lkM", { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T.chipMeteo + 0.25);
  // second conversation (sunset question) fully in view
  tl.to("#chat", { y: -382, duration: 1.4, ease: "power2.inOut" }, T.wa2);
  tl.to("#sunIc", { rotation: 180, duration: 0.7, ease: "power2.inOut" }, T.beau);
  tl.to("#sunIc", { boxShadow: "0 0 0 8px rgba(242,179,61,0.35)", duration: 0.35, yoyo: true, repeat: 1 }, T.beau);

  // ---- s04: camera LEFT, dashboard ----
  tl.to("#cam", Object.assign({}, LEFT, CAM), T.camLeft2);
  tl.to(["#phone", ".chip", "#fier"], { x: 80, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.03 }, T.camLeft2);
  tl.to("#links path", { opacity: 0, duration: 0.3 }, T.camLeft2);
  tl.fromTo(".lead", { autoAlpha: 0, x: 60, rotation: 1.5 }, { autoAlpha: 1, x: 0, rotation: 0, duration: 0.5, ease: "power3.out", stagger: 0.12 }, T.leads);
  [["#b1", T.q1], ["#b2", T.q2], ["#b3", T.q3]].forEach(function (p) {
    tl.fromTo(p[0], { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, p[1]);
  });
  tl.fromTo("#table", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, T.table);
  // cards drop into the table slots: slot tops are 420+76=496, 586, 676 → deltas from 150/240/330
  tl.to("#lead1", { y: 346, duration: 0.55, ease: "power3.inOut" }, T.drop);
  tl.to("#lead2", { y: 346, duration: 0.55, ease: "power3.inOut" }, T.drop + 0.1);
  tl.to("#lead3", { y: 346, duration: 0.55, ease: "power3.inOut" }, T.drop + 0.2);

  // ---- s05: push-in, relance, vignette, small end card ----
  tl.to("#cam", Object.assign({}, LEFT2, { duration: 1.0, ease: "power2.inOut" }), T.pushIn);
  tl.to("#b1", { autoAlpha: 0, duration: 0.2 }, T.relance - 0.05);
  tl.fromTo("#relance", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, T.relance);
  tl.to("#cam", Object.assign({}, FULL, { duration: 0.9, ease: "power3.inOut" }), T.vignette);
  tl.to("#frame", { x: 150, y: 345, scale: 0.36, borderRadius: 48, duration: 0.9, ease: "power3.inOut" }, T.vignette);
  tl.to(["#table", ".lead", "#relance"], { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, T.vignette);
  tl.to("#frame", { x: 170, y: 335, duration: DUR - (T.vignette + 0.9), ease: "sine.inOut" }, T.vignette + 0.9);
  tl.fromTo("#endcard", { autoAlpha: 0, y: 26, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, T.endcard);

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
  window.__timelines["luma-agent-whatsapp"] = tl;
})();
