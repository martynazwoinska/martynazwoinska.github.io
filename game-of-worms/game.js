/* =====================================================================
   The Game of Worms — engine (state, simulation, rendering, input, UI)
   Vanilla JS, no dependencies. Canvas for the world; DOM for interface.
   Organised into: RNG/util · State · World · Simulation · Render ·
   Input · Interface · Flow (generations, reproduction, fitness).
   ===================================================================== */
(function () {
  'use strict';
  var C = window.GOW_CONFIG;

  /* ----------  palette (contained Art Nouveau jewel tones)  ---------- */
  var PAL = {
    flesh1: '#f6e3c4', flesh2: '#e9c48f', flesh3: '#d69a63',
    emerald: '#1c7a52', emeraldL: '#4bb488', teal: '#1f6f6f',
    burgundy: '#7d2145', gold: '#c39a3c', cream: '#f7efe0',
    ink: '#2a2320', mould: '#5a6b4a',
  };

  /* ----------  RNG (seedable for reproducible bugs) & utils  ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rng = mulberry32((Date.now() & 0xffffffff) >>> 0);
  function rand(a, b) { return a + (b - a) * rng(); }
  function pick(arr) { return arr[(rng() * arr.length) | 0]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function dist(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }

  /* ----------  DOM refs (filled on init)  ---------- */
  var el = {};
  function $(id) { return document.getElementById(id); }

  /* ----------  State  ---------- */
  var S = null;      // whole-run state
  var running = false, paused = false, lastT = 0, reduceMotion = false;

  function freshRunState(traits) {
    return {
      traits: traits,             // {cue:'cautious'|'bold', brood:'uniform'|'varied', disperse:'early'|'late'}
      gen: 0,
      descendants: 0,             // established, viable
      history: [],                // per-generation outcome records
      selfBroodsLeft: C.reproduce.selfBroods,
      messagesSeen: {},
      over: false,
    };
  }

  /* ----------  World / generation setup  ---------- */
  var W = 0, H = 0;               // canvas logical size

  function startGeneration(genIndex) {
    S.gen = genIndex;
    var margin = 46;
    var worm = {
      x: W * 0.5, y: H * 0.62, vx: 0, vy: 0, dir: { x: 0, y: -1 },
      trail: [], speed: C.worm.baseSpeed,
      energy: (genIndex === 0 ? C.worm.startEnergy : 70),
      dev: 0,                     // developmental units -> stage
      mode: 'normal',            // normal | arrest | l2d | dauer
      l2dTimer: 0, feedCd: 0, learned: {}, phase: 0,
      reproduced: false,
    };
    for (var i = 0; i < 26; i++) worm.trail.push({ x: worm.x, y: worm.y });

    // bacterial patches
    var patches = [];
    var defs = [
      'nutritious', 'nutritious', 'moderate', 'moderate',
      'pathogen', 'ambiguous', 'ambiguous', 'nutritious',
    ];
    for (var p = 0; p < defs.length; p++) {
      var b = C.bacteria[defs[p]];
      patches.push({
        x: rand(margin, W - margin), y: rand(margin + 30, H - margin),
        r: rand(26, 40), type: defs[p], bites: (b.pathogenic ? 999 : 3 + (rng() * 2 | 0)),
        depleted: false, learned: false, warned: false,
        resolved: (defs[p] === 'ambiguous' ? (rng() < 0.5 ? 'nutritious' : 'pathogen') : defs[p]),
        pulse: rng() * 6.28,
      });
    }
    // keep patches off the worm's start
    patches.forEach(function (q) {
      if (dist(q.x, q.y, worm.x, worm.y) < 90) { q.y = clamp(q.y - 150, margin, H - margin); }
    });

    // a fungal trap (beautiful, then dangerous)
    var fungus = { x: rand(W * 0.2, W * 0.8), y: rand(H * 0.18, H * 0.4), r: 42, triggered: false, closing: 0 };
    if (dist(fungus.x, fungus.y, worm.x, worm.y) < 140) fungus.y = clamp(fungus.y - 120, 40, H);

    // schedule a deterioration surge + cue warning (reliability-gated)
    var genSeconds = C.appleDaysPerGeneration * C.secondsPerAppleDay;
    var surgeAt = rand(genSeconds * 0.42, genSeconds * 0.62);
    var trueWarn = rng() < C.cue.reliability;
    var falseWarnAt = (rng() < 0.28) ? rand(genSeconds * 0.15, genSeconds * 0.3) : -1;

    S.env = {
      t: 0, genSeconds: genSeconds, food: 1, det: 0,
      surgeAt: surgeAt, surged: false, trueWarn: trueWarn,
      falseWarnAt: falseWarnAt, cueWarn: false, cueGlow: 0,
      male: null, maleSpawned: false,
      carrier: null, carrierPasses: 0,
    };
    S.worm = worm; S.patches = patches; S.fungus = fungus;
    S.offer = {};       // which contextual offers are active

    say(genIndex === 0 ? C.lines.hatch : 'A fresh apple. The lineage continues — generation ' + (genIndex + 1) + '.');
    if (genIndex === 0) once('firstFood', 240, function () { say(C.lines.firstFood); });
    updateHud();
    setActions();
  }

  /* ----------  Simulation  ---------- */
  function update(dt) {
    var w = S.worm, e = S.env;
    e.t += dt;

    /* --- environment clock: food decline + deterioration --- */
    var baseDet = 1 / e.genSeconds;
    e.det = clamp(e.det + baseDet * dt * 0.82, 0, 1);
    if (!e.surged && e.t >= e.surgeAt) { e.surged = true; }
    if (e.surged) e.det = clamp(e.det + baseDet * dt * 1.5, 0, 1);
    e.food = clamp(e.food - dt * 0.010 - (e.surged ? dt * 0.02 : 0), 0, 1);

    // cue warning windows
    if (e.trueWarn && !e.cueWarn && e.t >= e.surgeAt - C.cue.warnLeadSeconds && e.t < e.surgeAt) {
      e.cueWarn = true; say(C.lines.cueWarn);
    }
    if (e.falseWarnAt > 0 && !e.cueWarn && e.t >= e.falseWarnAt && e.t < e.falseWarnAt + 3) {
      e.cueWarn = true;
    }
    if (e.falseWarnAt > 0 && e.t > e.falseWarnAt + 10 && !e.surged) e.cueWarn = false; // false alarm fades
    e.cueGlow = lerp(e.cueGlow, e.cueWarn ? 1 : 0, dt * 2);

    /* --- worm movement (flowing, curved) --- */
    w.phase += dt * (w.mode === 'dauer' ? 5 : 8);
    var canMove = (w.mode !== 'arrest');
    var spd = w.speed * (0.5 + 0.5 * clamp(w.dev / 4, 0, 1)) * (w.mode === 'dauer' ? 0.75 : 1);
    var ix = input.x, iy = input.y;
    var mag = Math.hypot(ix, iy);
    if (canMove && mag > 0.01) {
      w.dir.x = lerp(w.dir.x, ix / mag, dt * 6);
      w.dir.y = lerp(w.dir.y, iy / mag, dt * 6);
      var dm = Math.hypot(w.dir.x, w.dir.y) || 1;
      w.x = clamp(w.x + (w.dir.x / dm) * spd * dt, 14, W - 14);
      w.y = clamp(w.y + (w.dir.y / dm) * spd * dt, 30, H - 14);
    }
    w.trail.unshift({ x: w.x, y: w.y });
    if (w.trail.length > 26) w.trail.pop();

    /* --- metabolism --- */
    var drain = C.worm.energyDrainPerSec;
    if (w.mode === 'arrest') drain = C.worm.arrestDrainPerSec;
    else if (w.mode === 'dauer') drain = C.worm.dauerDrainPerSec;
    else if (mag > 0.01) drain *= 1.25;               // moving costs a little more
    w.energy = clamp(w.energy - drain * dt, 0, C.worm.maxEnergy);

    /* --- feeding --- */
    if (w.feedCd > 0) w.feedCd -= dt;
    var overFood = false;
    if (w.mode === 'normal' || w.mode === 'arrest' || w.mode === 'l2d') {
      for (var i = 0; i < S.patches.length; i++) {
        var q = S.patches[i];
        if (q.depleted) continue;
        if (dist(w.x, w.y, q.x, q.y) < q.r) {
          overFood = true;
          if (w.feedCd <= 0) { bite(q); w.feedCd = 0.55; }
        }
      }
    }

    /* --- L1 arrest logic (only at L1) --- */
    if (w.mode === 'normal' && stageName() === 'L1' && w.energy < 20 && !overFood) {
      w.mode = 'arrest'; say(C.lines.arrest);
    } else if (w.mode === 'arrest' && overFood) {
      w.mode = 'normal'; say(C.lines.arrestEnd);
    }

    /* --- development --- */
    // (dev increases in bite(); no passive growth)

    /* --- fungal trap --- */
    var f = S.fungus;
    if (f.closing > 0) { f.closing = clamp(f.closing + dt * 2, 0, 1); }
    else if (dist(w.x, w.y, f.x, f.y) < f.r * 0.62 && w.mode !== 'dauer') {
      // entering the ring risks capture; moving fast / touch response helps
      var esc = (mag > 0.3 ? C.fungus.moveEscapeBonus : 0) + (w.mode === 'dauer' ? C.fungus.dauerEscapeBonus : 0);
      if (rng() < C.fungus.captureBase - esc) { f.closing = 0.001; f.triggered = true; }
    }
    if (f.closing >= 1) { return endGeneration('trapped'); }

    /* --- carrier (dispersal vehicle) --- */
    if (!e.carrier && e.det > C.carrier.appearsAtDeterioration && e.carrierPasses < 3 && rng() < dt * 0.5) {
      var fromLeft = rng() < 0.5;
      e.carrier = { x: fromLeft ? -40 : W + 40, y: rand(H * 0.25, H * 0.8), dir: fromLeft ? 1 : -1, gone: false };
      e.carrierPasses++;
      if (w.mode === 'dauer') once('nictateReady' + e.carrierPasses, 1, function () { say(C.lines.nictateReady); });
    }
    if (e.carrier) {
      e.carrier.x += e.carrier.dir * C.carrier.speed * dt;
      if (e.carrier.x < -60 || e.carrier.x > W + 60) e.carrier = null;
    }

    /* --- rare male (adult, optional outcross) --- */
    if (!e.maleSpawned && stageName() === 'Adult' && e.det < 0.85 && rng() < dt * 0.25) {
      e.maleSpawned = true;
      e.male = { x: rand(60, W - 60), y: rand(80, H - 60), phase: rng() * 6.28 };
      say(C.lines.maleAppears);
    }
    if (e.male && dist(w.x, w.y, e.male.x, e.male.y) < 26) e.male.near = true; else if (e.male) e.male.near = false;

    /* --- death by starvation / apple collapse --- */
    if (w.energy <= 0 && w.mode !== 'dauer') { return endGeneration('starved'); }
    if (e.det >= 1) {
      if (w.mode === 'dauer') { /* survives, must nictate; keep going a bit */ }
      else { say(C.lines.crash); return endGeneration('crashed'); }
    }

    /* --- L2d auto-commit to dauer if conditions stay bad --- */
    if (w.mode === 'l2d') {
      w.l2dTimer += dt;
      if (e.det < 0.35 && !e.cueWarn) { w.mode = 'normal'; say('Conditions eased — you slip back onto the reproductive path.'); }
      else if (w.l2dTimer > 6) { commitDauer(); }
    }

    refreshOffers();
    updateHud();
  }

  function bite(q) {
    var w = S.worm;
    var effType = (q.type === 'ambiguous') ? q.resolved : q.type;
    var b = C.bacteria[effType];
    var sig = q.type;                 // learned by patch "signature"
    if (b.pathogenic) {
      w.energy = clamp(w.energy + b.energy, 0, C.worm.maxEnergy);
      q.warned = true;
      if (q.type === 'ambiguous') q.type = 'pathogen-known';
      if (!w.learned[sig]) {
        w.learned[sig] = true;
        say(C.lines.atePathogenFirst);
      } else {
        say(C.lines.atePathogenAgain);
      }
    } else {
      var gain = b.energy, prog = b.progress;
      // cautious lineages eat a touch less but avoid more mistakes (handled elsewhere)
      w.energy = clamp(w.energy + gain, 0, C.worm.maxEnergy);
      if (w.mode === 'normal') w.dev += prog;
      S.env.food = clamp(S.env.food - 0.03, 0, 1);
      q.bites--; if (q.bites <= 0) q.depleted = true;
      if (q.type === 'ambiguous') { q.type = 'nutritious'; w.learned[sig] = true; }
    }
  }

  function stageName() {
    var d = S.worm.dev;
    if (d >= 4) return 'Adult';
    if (d >= 3) return 'L4';
    if (d >= 2) return 'L3';
    if (d >= 1) return 'L2';
    return 'L1';
  }
  function stageLabel() {
    var w = S.worm;
    if (w.mode === 'dauer') return 'Dauer';
    if (w.mode === 'l2d') return 'L2d';
    if (w.mode === 'arrest') return 'L1 (arrest)';
    return stageName();
  }

  /* ----------  contextual offers (actions that appear when relevant)  ---------- */
  function refreshOffers() {
    var w = S.worm, e = S.env, changed = false, want = {};
    // dauer prep only at L1/L2 and only when conditions are turning
    if ((stageName() === 'L1' || stageName() === 'L2') && w.mode === 'normal' &&
        (e.det > 0.45 || e.cueWarn)) { want.l2d = true; }
    if (w.mode === 'l2d') want.commit = true;
    if (w.mode === 'dauer' && e.carrier && dist(w.x, w.y, e.carrier.x, e.carrier.y) < 70) want.nictate = true;
    if (stageName() === 'Adult' && w.mode === 'normal' && w.energy >= C.reproduce.minEnergy) {
      if (S.selfBroodsLeft > 0) want.self = true;
      if (e.male && e.male.near) want.outcross = true;
    }
    // detect change
    var keys = ['l2d', 'commit', 'nictate', 'self', 'outcross'];
    for (var i = 0; i < keys.length; i++) { if (!!S.offer[keys[i]] !== !!want[keys[i]]) changed = true; }
    if (changed) { S.offer = want; setActions(); }
  }

  function enterL2d() {
    if (S.worm.mode !== 'normal') return;
    S.worm.mode = 'l2d'; S.worm.l2dTimer = 0; say(C.lines.l2d); refreshOffers(); setActions();
  }
  function commitDauer() {
    S.worm.mode = 'dauer'; say(C.lines.dauer); S.offer = {}; setActions(); updateHud();
    if (S.env.det > 0.8) say(C.lines.dauerLate);
  }
  function tryNictate() {
    var w = S.worm, e = S.env;
    if (w.mode !== 'dauer' || !e.carrier) return;
    var timing = clamp(1 - dist(w.x, w.y, e.carrier.x, e.carrier.y) / 70, 0, 1);
    var tend = (S.traits.disperse === 'early') ? 0.22 : -0.05;
    var chance = 0.35 + 0.5 * timing + tend;
    if (rng() < chance) { say(C.lines.nictateWin); endGeneration('dispersed'); }
    else { say(C.lines.nictateMiss); e.carrier = null; setActions(); }
  }

  function reproduce(kind) {
    var w = S.worm, e = S.env;
    if (stageName() !== 'Adult' || w.mode !== 'normal') return;
    if (kind === 'self' && S.selfBroodsLeft <= 0) return;
    if (kind === 'outcross' && !(e.male && e.male.near)) return;

    var quality = 0.4 + 0.6 * clamp(w.energy / 100, 0, 1) * (0.5 + 0.5 * e.food);
    var base = kind === 'self' ? 3 : 4;
    var brood = Math.max(1, Math.round(base * quality + rand(-0.5, 1.2)));
    // varied broods trade peak for spread (a touch fewer "established" now, safer later)
    if (S.traits.brood === 'varied') brood = Math.max(1, brood - 1);
    if (kind === 'self') S.selfBroodsLeft--;
    w.energy = clamp(w.energy - 22, 0, C.worm.maxEnergy);
    w.reproduced = true;
    S.descendants += brood;
    say(kind === 'self' ? C.lines.selfed : C.lines.outcrossed);
    once('reprod', 900, function () { say(C.lines.reproduced); });
    S.history.push({ gen: S.gen, outcome: 'reproduced-' + kind, brood: brood, det: e.det });
    endGeneration('reproduced', brood);
  }

  /* ----------  generation / run flow  ---------- */
  function endGeneration(reason, brood) {
    if (S._transitioning) return; S._transitioning = true;
    var survived = (reason === 'reproduced' || reason === 'dispersed');
    if (reason !== 'reproduced') {
      S.history.push({ gen: S.gen, outcome: reason, brood: 0, det: S.env.det });
    }
    var lethal = (reason === 'starved' || reason === 'trapped' || reason === 'crashed');

    var msg = { reproduced: 'Brood released.', dispersed: 'Carried to a new apple.',
      starved: C.lines.starved, trapped: C.lines.trapped, crashed: 'The apple died before you could escape.' }[reason];
    say(msg);

    setTimeout(function () {
      S._transitioning = false;
      if (lethal && S.descendants === 0) { return endRun(false); }
      if (lethal && S.descendants > 0) { return endRun(true); } // lineage already banked some
      if (S.gen + 1 >= C.generations) { return endRun(true); }
      startGeneration(S.gen + 1);
    }, 1400);
  }

  function competitorFitness() {
    // three simulated lineages with random dispositions in the same world
    var comps = [];
    for (var i = 0; i < 3; i++) {
      var luck = rng(), strat = rng();
      var f = Math.max(0, Math.round(rand(2, 9) * (0.5 + strat) - (luck < 0.25 ? rand(3, 6) : 0)));
      comps.push(f);
    }
    return comps;
  }

  function endRun(persisted) {
    if (S.over) return; S.over = true; running = false;
    S.offer = {}; setActions();
    var comps = competitorFitness();
    var meanComp = comps.reduce(function (a, b) { return a + b; }, 0) / comps.length;
    var rel = meanComp > 0 ? (S.descendants / meanComp) : (S.descendants > 0 ? 2 : 0);
    var gens = S.history.length;
    showResult(persisted, rel, comps, meanComp);
  }

  /* ----------  Rendering  ---------- */
  function render(ctx) {
    ctx.clearRect(0, 0, W, H);
    // apple flesh background
    var g = ctx.createRadialGradient(W * 0.5, H * 0.5, 40, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
    var det = S.env ? S.env.det : 0;
    g.addColorStop(0, PAL.flesh1);
    g.addColorStop(0.6, PAL.flesh2);
    g.addColorStop(1, mixHex(PAL.flesh3, PAL.mould, det * 0.7));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // mould creeping in as it deteriorates
    if (det > 0.3) drawMould(ctx, det);
    // cue haze
    if (S.env && S.env.cueGlow > 0.02) {
      ctx.save(); ctx.globalAlpha = 0.16 * S.env.cueGlow; ctx.fillStyle = PAL.burgundy;
      ctx.fillRect(0, 0, W, H); ctx.restore();
    }
    drawFungus(ctx, S.fungus);
    for (var i = 0; i < S.patches.length; i++) drawPatch(ctx, S.patches[i]);
    if (S.env && S.env.carrier) drawCarrier(ctx, S.env.carrier);
    if (S.env && S.env.male) drawMale(ctx, S.env.male);
    drawWorm(ctx, S.worm);
  }

  function drawPatch(ctx, q) {
    if (q.depleted) return;
    var b = C.bacteria[q.type] || C.bacteria.pathogen;
    var known = (q.type !== 'ambiguous');
    q.pulse += 0.03;
    var glow = 0.5 + 0.18 * Math.sin(q.pulse);
    var hue = b.hue;
    ctx.save();
    var rg = ctx.createRadialGradient(q.x, q.y, 2, q.x, q.y, q.r * 1.15);
    rg.addColorStop(0, 'hsla(' + hue + ',70%,72%,' + (0.9 * glow + 0.1) + ')');
    rg.addColorStop(1, 'hsla(' + hue + ',60%,45%,0)');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * 1.15, 0, 6.2832); ctx.fill();
    // little colonies
    ctx.fillStyle = 'hsla(' + hue + ',65%,40%,.7)';
    for (var k = 0; k < 6; k++) {
      var a = q.pulse * 0.3 + k, rr = q.r * 0.55;
      ctx.beginPath(); ctx.arc(q.x + Math.cos(a) * rr * 0.6, q.y + Math.sin(a * 1.3) * rr * 0.5, 3.2, 0, 6.28); ctx.fill();
    }
    // signature glyph (known/warned patches show it)
    if (known || q.warned) {
      ctx.globalAlpha = 0.9; ctx.fillStyle = q.warned ? PAL.burgundy : PAL.ink;
      ctx.font = '18px Georgia'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.glyph || '◈', q.x, q.y);
    } else {
      ctx.globalAlpha = 0.7; ctx.fillStyle = PAL.ink; ctx.font = '18px Georgia';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', q.x, q.y);
    }
    // warning ring for learned-bad
    if (q.warned) {
      ctx.globalAlpha = 0.8; ctx.strokeStyle = PAL.burgundy; ctx.lineWidth = 2; ctx.setLineDash([4, 5]);
      ctx.beginPath(); ctx.arc(q.x, q.y, q.r + 5, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }

  function drawWorm(ctx, w) {
    var t = w.trail; if (!t.length) return;
    ctx.save();
    var col = (w.mode === 'dauer') ? PAL.gold : (w.mode === 'l2d' ? PAL.teal : PAL.cream);
    var edge = (w.mode === 'dauer') ? '#8a6a1f' : PAL.emerald;
    var widthBase = 8 + 5 * clamp(w.dev / 4, 0, 1);
    if (w.mode === 'dauer') widthBase *= 0.72;
    // body as a tapered wiggling ribbon along the trail
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var pass = 0; pass < 2; pass++) {
      ctx.beginPath();
      for (var i = 0; i < t.length; i++) {
        var wob = Math.sin(w.phase - i * 0.5) * (reduceMotion ? 1.5 : 4) * (1 - i / t.length);
        // perpendicular offset
        var nx = -w.dir.y, ny = w.dir.x;
        var px = t[i].x + nx * wob, py = t[i].y + ny * wob;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = pass === 0 ? edge : col;
      ctx.lineWidth = pass === 0 ? widthBase + 3 : widthBase;
      ctx.globalAlpha = pass === 0 ? 0.9 : 1;
      ctx.stroke();
    }
    // head
    var h = t[0];
    ctx.fillStyle = edge; ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(h.x, h.y, widthBase * 0.62, 0, 6.28); ctx.fill();
    ctx.fillStyle = PAL.ink;
    ctx.beginPath(); ctx.arc(h.x + w.dir.x * 3, h.y + w.dir.y * 3, 1.7, 0, 6.28); ctx.fill();
    // nictation pose in dauer near carrier
    if (w.mode === 'dauer') {
      ctx.strokeStyle = PAL.gold; ctx.globalAlpha = 0.8; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(h.x, h.y); ctx.lineTo(h.x + Math.sin(w.phase) * 8, h.y - 20); ctx.stroke();
    }
    ctx.restore();
  }

  function drawFungus(ctx, f) {
    if (!f) return;
    ctx.save(); ctx.translate(f.x, f.y);
    var petals = 8, open = f.closing > 0 ? (1 - f.closing) : 1;
    ctx.strokeStyle = PAL.gold; ctx.lineWidth = 2.4; ctx.globalAlpha = 0.85;
    for (var i = 0; i < petals; i++) {
      var a = (i / petals) * 6.2832;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 8, Math.sin(a) * 8);
      var r2 = f.r * (0.6 + 0.4 * open);
      ctx.quadraticCurveTo(Math.cos(a + 0.4) * r2, Math.sin(a + 0.4) * r2, Math.cos(a) * r2 * 0.9, Math.sin(a) * r2 * 0.9);
      ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(0, 0, f.r * (0.5 + 0.4 * open), 0, 6.28);
    ctx.strokeStyle = 'rgba(195,154,60,.5)'; ctx.setLineDash([3, 6]); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }

  function drawCarrier(ctx, c) {
    ctx.save(); ctx.translate(c.x, c.y);
    ctx.fillStyle = mixHex(PAL.burgundy, PAL.gold, 0.3);
    ctx.beginPath(); ctx.ellipse(0, 0, 22, 14, 0, 0, 6.28); ctx.fill();  // shell
    ctx.strokeStyle = PAL.cream; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-3, 0, 8, 0, 6.28); ctx.stroke();           // spiral hint
    ctx.fillStyle = mixHex(PAL.emerald, PAL.cream, 0.4);
    ctx.beginPath(); ctx.ellipse(c.dir * 20, 6, 12, 6, 0, 0, 6.28); ctx.fill(); // foot
    ctx.restore();
  }

  function drawMale(ctx, m) {
    m.phase += 0.05;
    ctx.save(); ctx.globalAlpha = 0.9; ctx.strokeStyle = PAL.teal; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var x = m.x + i * 2.2, y = m.y + Math.sin(m.phase + i * 0.6) * 5;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // fan tail hint
    ctx.beginPath(); ctx.arc(m.x + 22, m.y, 5, -1, 1); ctx.stroke();
    ctx.restore();
  }

  function drawMould(ctx, det) {
    ctx.save(); ctx.globalAlpha = clamp((det - 0.3) * 0.5, 0, 0.4);
    ctx.fillStyle = PAL.mould;
    for (var i = 0; i < 40; i++) {
      var x = ((i * 97.3) % W), y = ((i * 57.7 + i * i * 3.1) % H);
      ctx.beginPath(); ctx.arc(x, y, 6 + (i % 4) * 3, 0, 6.28); ctx.fill();
    }
    ctx.restore();
  }

  function mixHex(a, b, t) {
    function h(x) { return parseInt(x, 16); }
    var ar = h(a.substr(1, 2)), ag = h(a.substr(3, 2)), ab = h(a.substr(5, 2));
    var br = h(b.substr(1, 2)), bg = h(b.substr(3, 2)), bb = h(b.substr(5, 2));
    var r = Math.round(lerp(ar, br, t)), gg = Math.round(lerp(ag, bg, t)), bl = Math.round(lerp(ab, bb, t));
    return 'rgb(' + r + ',' + gg + ',' + bl + ')';
  }

  /* ----------  Input  ---------- */
  var input = { x: 0, y: 0, keys: {} };
  function bindInput() {
    window.addEventListener('keydown', function (ev) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(ev.key) >= 0) ev.preventDefault();
      input.keys[ev.key.toLowerCase()] = true; computeDir();
      if (ev.key === 'Escape') togglePause();
    });
    window.addEventListener('keyup', function (ev) { input.keys[ev.key.toLowerCase()] = false; computeDir(); });
    // touch d-pad
    ['up', 'down', 'left', 'right'].forEach(function (d) {
      var b = $('dpad-' + d); if (!b) return;
      var set = function (v) { return function (e) { e.preventDefault(); input['t_' + d] = v; computeTouch(); }; };
      b.addEventListener('touchstart', set(true), { passive: false });
      b.addEventListener('touchend', set(false), { passive: false });
      b.addEventListener('mousedown', set(true)); b.addEventListener('mouseup', set(false));
      b.addEventListener('mouseleave', set(false));
    });
  }
  function computeDir() {
    var k = input.keys, x = 0, y = 0;
    if (k['arrowleft'] || k['a']) x -= 1; if (k['arrowright'] || k['d']) x += 1;
    if (k['arrowup'] || k['w']) y -= 1; if (k['arrowdown'] || k['s']) y += 1;
    input.kx = x; input.ky = y; blend();
  }
  function computeTouch() {
    var x = 0, y = 0;
    if (input.t_left) x -= 1; if (input.t_right) x += 1;
    if (input.t_up) y -= 1; if (input.t_down) y += 1;
    input.tx = x; input.ty = y; blend();
  }
  function blend() { input.x = (input.kx || 0) + (input.tx || 0); input.y = (input.ky || 0) + (input.ty || 0); }

  /* ----------  Interface (HUD, messages, actions, overlays)  ---------- */
  var tickerTimer = 0;
  function say(msg) {
    if (!el.ticker) return;
    el.ticker.textContent = msg;
    el.ticker.classList.remove('flash'); void el.ticker.offsetWidth; el.ticker.classList.add('flash');
  }
  function once(key, frames, fn) { /* run fn once after ~frames ticks */
    if (S.messagesSeen[key]) return; S.messagesSeen[key] = true;
    setTimeout(fn, Math.max(0, frames * 4));
  }
  function updateHud() {
    if (!S || !S.worm) return;
    el.hStage.textContent = stageLabel();
    el.hEnergy.style.setProperty('--v', clamp(S.worm.energy, 0, 100) + '%');
    el.hEnergyText.textContent = Math.round(S.worm.energy);
    el.hFood.style.setProperty('--v', Math.round(S.env.food * 100) + '%');
    el.hLineage.textContent = S.descendants + ' · gen ' + (S.gen + 1) + '/' + C.generations;
    el.hFoodLabel.textContent = S.env.det > 0.66 ? 'collapsing' : S.env.det > 0.33 ? 'declining' : 'rich';
  }
  function setActions() {
    if (!el.actions) return;
    el.actions.innerHTML = '';
    var o = S.offer || {};
    var add = function (label, cls, fn, hint) {
      var b = document.createElement('button');
      b.className = 'act ' + (cls || '');
      b.innerHTML = label; b.setAttribute('aria-label', hint || label);
      b.addEventListener('click', fn); el.actions.appendChild(b);
    };
    if (o.l2d) add('🜁 Prepare for dauer <small>(enter L2d)</small>', 'teal', enterL2d, 'Enter L2d, a reversible pre-dauer path');
    if (o.commit) add('◆ Commit to dauer', 'gold', commitDauer, 'Commit to the dauer stage');
    if (o.nictate) add('↥ Nictate onto carrier', 'gold', tryNictate, 'Stand and wave to catch the passing carrier');
    if (o.self) add('❀ Self-fertilize <small>(brood like you)</small>', 'emerald', function () { reproduce('self'); }, 'Produce offspring without a partner');
    if (o.outcross) add('✥ Outcross <small>(mixed brood)</small>', 'emerald', function () { reproduce('outcross'); }, 'Produce a genetically mixed brood with the rare male');
    if (!el.actions.children.length) {
      var span = document.createElement('span'); span.className = 'act-hint';
      span.textContent = hintForState(); el.actions.appendChild(span);
    }
  }
  function hintForState() {
    if (!S || !S.worm) return '';
    if (S.worm.mode === 'dauer') return 'Dauer: reach a passing carrier and nictate to disperse.';
    if (stageName() === 'Adult') return 'Adult: build reserves, then reproduce.';
    return 'Explore the apple. Feed on rich colonies; learn the harmful one.';
  }

  /* overlays */
  function togglePause() {
    if (!running) return; paused = !paused;
    el.pauseScreen.hidden = !paused; el.btnPause.textContent = paused ? '► Resume' : '❚❚ Pause';
    if (!paused) { lastT = performance.now(); }
  }

  function showResult(persisted, rel, comps, meanComp) {
    var gens = S.history.length;
    var head = persisted
      ? 'Your lineage survived ' + gens + ' generation' + (gens > 1 ? 's' : '') + (S.descendants > 0 ? ' and left ' + S.descendants + ' established descendant' + (S.descendants > 1 ? 's' : '') + '.' : ' by dispersing to safety.')
      : 'Your lineage did not persist. The apples outlasted it this time.';
    el.resTitle.textContent = persisted ? 'The lineage continues' : 'The lineage ends';
    el.resSummary.textContent = head;
    var relTxt = rel >= 1.15 ? 'above' : rel <= 0.85 ? 'below' : 'about equal to';
    var rows = [
      ['Established descendants (absolute fitness)', String(S.descendants)],
      ['Competitor lineages (descendants)', comps.join(' · ') + '  (mean ' + meanComp.toFixed(1) + ')'],
      ['Relative fitness', rel.toFixed(2) + '×  — ' + relTxt + ' competitors'],
      ['Generations lived', String(gens)],
      ['Cue reliability this scenario', Math.round(C.cue.reliability * 100) + '%  (moderately trustworthy)'],
    ];
    var body = S.history.map(function (h) {
      return 'Gen ' + (h.gen + 1) + ': ' + h.outcome + (h.brood ? ' (+' + h.brood + ')' : '') + ' at ' + Math.round(h.det * 100) + '% decay';
    });
    el.resTable.innerHTML = rows.map(function (r) {
      return '<div class="rrow"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>';
    }).join('');
    el.resDecisions.innerHTML = body.map(function (b) { return '<li>' + b + '</li>'; }).join('');
    // best score
    try {
      var best = +localStorage.getItem('gow_best') || 0;
      if (S.descendants > best) { localStorage.setItem('gow_best', S.descendants); }
      el.resBest.textContent = 'Best lineage so far: ' + Math.max(best, S.descendants) + ' descendants';
    } catch (e) {}
    el.resultScreen.hidden = false;
  }

  function buildScience() {
    el.sciIntro.textContent = C.scienceIntro;
    el.sciSimpl.innerHTML = C.simplifications.map(function (s) { return '<li>' + s + '</li>'; }).join('');
    el.sciSources.innerHTML = C.sources.map(function (s) {
      return '<li><a href="' + s[1] + '" target="_blank" rel="noopener">' + s[0] + '</a></li>';
    }).join('');
  }

  /* ----------  boot / loop  ---------- */
  function loop(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    if (!paused && !S.over && !S._transitioning) update(dt);
    render(el.ctx);
    requestAnimationFrame(loop);
  }

  function beginRun(traits) {
    S = freshRunState(traits);
    S.selfBroodsLeft = C.reproduce.selfBroods;
    el.startScreen.hidden = true; el.resultScreen.hidden = true;
    startGeneration(0);
    running = true; paused = false; S.over = false; lastT = performance.now();
    requestAnimationFrame(loop);
  }

  function resize() {
    var wrap = el.canvas.parentElement;
    var cw = wrap.clientWidth, ch = Math.min(Math.round(cw * 0.62), Math.round(window.innerHeight * 0.62));
    ch = Math.max(300, ch);
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    el.canvas.width = cw * dpr; el.canvas.height = ch * dpr;
    el.canvas.style.height = ch + 'px';
    el.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = cw; H = ch;
  }

  function init() {
    el.canvas = $('stage'); el.ctx = el.canvas.getContext('2d');
    el.ticker = $('ticker'); el.actions = $('actions');
    el.hStage = $('hud-stage'); el.hEnergy = $('hud-energy'); el.hEnergyText = $('hud-energy-text');
    el.hFood = $('hud-food'); el.hFoodLabel = $('hud-food-label'); el.hLineage = $('hud-lineage');
    el.startScreen = $('start-screen'); el.resultScreen = $('result-screen');
    el.pauseScreen = $('pause-screen'); el.btnPause = $('btn-pause');
    el.resTitle = $('res-title'); el.resSummary = $('res-summary'); el.resTable = $('res-table');
    el.resDecisions = $('res-decisions'); el.resBest = $('res-best');
    el.sciIntro = $('sci-intro'); el.sciSimpl = $('sci-simpl'); el.sciSources = $('sci-sources');

    reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    bindInput();
    window.addEventListener('resize', function () { resize(); if (S && S.worm) render(el.ctx); });
    resize();
    buildScience();

    // buttons
    $('btn-pause').addEventListener('click', togglePause);
    $('btn-restart').addEventListener('click', function () { el.resultScreen.hidden = true; el.startScreen.hidden = false; running = false; });
    $('btn-how').addEventListener('click', function () { $('how-screen').hidden = false; });
    $('how-close').addEventListener('click', function () { $('how-screen').hidden = true; });
    $('res-science').addEventListener('click', function () { $('science-screen').hidden = false; });
    $('sci-close').addEventListener('click', function () { $('science-screen').hidden = true; });
    $('res-again').addEventListener('click', function () { el.resultScreen.hidden = true; el.startScreen.hidden = false; });
    $('reset-progress').addEventListener('click', function () {
      try { localStorage.removeItem('gow_best'); } catch (e) {}
      this.textContent = 'Progress reset';
    });

    // start with chosen disposition
    $('btn-play').addEventListener('click', function () {
      var traits = {
        cue: $('trait-cue').value, brood: $('trait-brood').value, disperse: $('trait-disperse').value,
      };
      beginRun(traits);
    });

    // draw a calm idle frame behind the start screen
    S = freshRunState({ cue: 'cautious', brood: 'uniform', disperse: 'late' });
    startGeneration(0); running = false; render(el.ctx);
  }

  // Optional testing hook (only with ?test in the URL) — never active in normal play.
  if (location.search.indexOf('test') >= 0) {
    window.__GOW = {
      get S() { return S; }, reproduce: reproduce, enterL2d: enterL2d,
      commitDauer: commitDauer, tryNictate: tryNictate, stageName: stageName,
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
