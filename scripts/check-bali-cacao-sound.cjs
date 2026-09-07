const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const { cacaoCrackSamples, createCacaoCrack } = await import(pathToFileURL(path.join(__dirname, '../game-of-worms/bali-cacao-sound.js')));
  for (const rate of [22050, 44100, 48000, 96000]) {
    const data = cacaoCrackSamples(rate);
    assert.equal(data.length, Math.ceil(rate * .42));
    assert.equal(Math.abs(data[0]), 0); assert.equal(Math.abs(data.at(-1)), 0);
    assert(data.every(Number.isFinite));
    const peak = data.reduce((a, b) => Math.max(a, Math.abs(b)), 0);
    assert(peak > .15 && peak < .8, `Bounded, audible waveform at ${rate}: ${peak}`);
    const rms = (a, b) => Math.sqrt(data.slice(a * rate, b * rate).reduce((s, x) => s + x * x, 0) / ((b - a) * rate));
    assert(rms(0, .1) > rms(.25, .4) * 15, 'Short crack decays into quiet tail');
  }
  let created = 0, starts = 0, stopped = 0, disconnected = 0, ctx, finish;
  const param = () => ({ value: 0, cancelScheduledValues() {}, setTargetAtTime() {} });
  class Audio {
    constructor() { created++; ctx = this; this.state = 'running'; this.sampleRate = 48000; this.currentTime = 1; this.destination = {}; }
    resume() { return Promise.resolve(); }
    createBuffer(_, count) { const samples = new Float32Array(count); return { getChannelData: () => samples }; }
    createGain() { return { gain: param(), connect() {}, disconnect() { disconnected++; } }; }
    createBufferSource() { return { connect() {}, disconnect() { disconnected++; }, start() { starts++; finish = this.onended; }, stop() { stopped++; this.onended?.(); } }; }
  }
  global.window = { AudioContext: Audio };
  global.document = { hidden: false };
  const sound = createCacaoCrack(); assert.equal(created, 0); assert.equal(sound.play(), false);
  sound.prepare(); assert.equal(created, 1); assert.equal(starts, 0);
  assert(sound.play()); assert.equal(starts, 1); finish(); assert.equal(disconnected, 2);
  sound.play(); sound.stop(); assert.equal(stopped, 1); sound.stop(); assert.equal(stopped, 1);
  ctx.state = 'suspended'; assert.equal(sound.play(), false);
  ctx.state = 'running'; document.hidden = true; assert.equal(sound.play(), false);
  document.hidden = false; assert.equal(starts, 2, 'No delayed or hidden playback');
  window.AudioContext = undefined;
  const silent = createCacaoCrack(); silent.prepare(); assert.equal(silent.play(), false);
  window.AudioContext = class { constructor() { throw Error('unsupported'); } };
  silent.prepare(); assert.equal(silent.play(), false);
  console.log('Cacao sound: bounded 420 ms waveform, quiet tail, gesture-only initialization, cancellation, node cleanup and silent fallback pass.');
})().catch(error => { console.error(error); process.exitCode = 1; });
