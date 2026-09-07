const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const { celebrationColours, celebrationWormPose, celebrationFlight, launchWormConfetti } = await import(pathToFileURL(path.join(__dirname, '../game-of-worms/worm-celebration.js')));
  assert.equal(new Set(celebrationColours).size, 6);
  for (let phase = 0; phase < Math.PI * 2; phase += .05) {
    const pose = celebrationWormPose(phase);
    for (const key of ['outline', 'highlight', 'shade', 'face']) assert(!/NaN|Infinity/.test(pose[key]));
    const points = pose.outline.match(/-?\d+\.\d+/g).map(Number);
    for (let i = 0; i < points.length; i += 2) {
      assert(points[i] >= 0 && points[i] <= 72);
      assert(points[i + 1] >= 0 && points[i + 1] <= 44);
    }
  }
  for (const width of [360, 768, 1024, 1440]) for (let i = 0; i < 30; i++) {
    assert(Object.values(celebrationFlight(i, 30, width, 900)).every(Number.isFinite));
  }
  const events = () => ({ listeners: new Map(), addEventListener(k, f) { this.listeners.set(k, f); }, removeEventListener(k) { this.listeners.delete(k); } });
  class Element {
    constructor() { this.children = []; this.attrs = {}; this.style = { setProperty() {} }; this.className = ''; this.classList = { add: c => { this.className += ` ${c}`; } }; }
    setAttribute(k, v) { this.attrs[k] = v; }
    append(...children) { for (const child of children) { this.children.push(child); child.parent = this; } }
    remove() { this.parent.children = this.parent.children.filter(x => x !== this); this.parent = null; }
    get isConnected() { return this === document.body || !!this.parent?.isConnected; }
  }
  const media = Object.assign(events(), { matches: false });
  const timers = new Map(), frames = new Map(); let next = 0;
  global.window = Object.assign(events(), { innerWidth: 1440, innerHeight: 900, matchMedia: () => media,
    setTimeout(fn) { timers.set(++next, fn); return next; }, clearTimeout(id) { timers.delete(id); } });
  global.document = Object.assign(events(), { hidden: false, body: new Element(), createElement: () => new Element(), createElementNS: () => new Element() });
  global.requestAnimationFrame = fn => { frames.set(++next, fn); return next; };
  global.cancelAnimationFrame = id => frames.delete(id);
  const empty = () => { assert.equal(document.body.children.length, 0); assert.equal(timers.size, 0); assert.equal(frames.size, 0); assert.equal(document.listeners.size + window.listeners.size + media.listeners.size, 0); };
  launchWormConfetti();
  const layer = document.body.children[0];
  assert.equal(layer.attrs['aria-hidden'], 'true');
  assert.equal(layer.children.length, 65, '58 airborne pieces, six crawlers and one compass');
  launchWormConfetti(); assert.equal(document.body.children.length, 1, 'Repeated launch replaces previous burst');
  document.listeners.get('keydown')({ key: 'Escape' }); empty();
  window.innerWidth = 360; launchWormConfetti(); assert.equal(document.body.children[0].children.length, 43);
  [...timers.values()][0](); empty();
  launchWormConfetti(); document.hidden = true; document.listeners.get('visibilitychange')(); empty();
  launchWormConfetti(); empty(); document.hidden = false;
  media.matches = true; launchWormConfetti(); empty(); media.matches = false;
  launchWormConfetti(); media.listeners.get('change')(); empty();
  launchWormConfetti(); window.listeners.get('pagehide')(); empty();
  console.log('Celebration: six colours, bounded moving geometry, responsive counts, relaunch, timeout, Escape, hidden-page and reduced-motion cleanup pass.');
})().catch(error => { console.error(error); process.exitCode = 1; });
