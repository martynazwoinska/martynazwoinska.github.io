// Original synthesized shell snap: a dull body impact and short fibrous cracks.
// No recording, external request or audio starts on page load.
export function cacaoCrackSamples(sampleRate) {
  const samples = new Float32Array(Math.ceil(sampleRate * .42));
  let seed = 1873, smooth = 0;
  for (let i = 0; i < samples.length; i++) {
    const t = i / sampleRate;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const noise = seed / 2147483648 - 1;
    smooth += (1 - Math.exp(-2 * Math.PI * 2100 / sampleRate)) * (noise - smooth);
    const pulse = (at, decay) => t < at ? 0 : (1 - Math.exp(-(t - at) / .001)) * Math.exp(-(t - at) / decay);
    const fracture = pulse(0, .025) + .48 * pulse(.037, .023) + .23 * pulse(.081, .038);
    const body = Math.sin(2 * Math.PI * 165 * t) * Math.exp(-t / .035) * (1 - Math.exp(-t / .002));
    const tail = smooth * .07 * Math.exp(-t / .105);
    const fade = Math.min(1, t / .0015, (samples.length - 1 - i) / (sampleRate * .018));
    samples[i] = (.56 * smooth * fracture + .2 * body + tail) * Math.max(0, fade);
  }
  return samples;
}

export function createCacaoCrack() {
  let context = null, buffer = null, voice = null;
  function prepare() {
    // Unlock synchronously in the click/key gesture, before loading pod images.
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!context || context.state === 'closed') { context = new Audio(); buffer = null; }
      Promise.resolve(context.resume()).catch(() => {});
    } catch { /* Optional sound cannot prevent the pod opening. */ }
  }
  function stop() {
    if (!voice) return;
    const current = voice; voice = null;
    try {
      const now = context.currentTime;
      current.gain.gain.cancelScheduledValues(now);
      current.gain.gain.setTargetAtTime(0, now, .005);
      current.source.stop(now + .025);
    } catch { current.source.disconnect(); current.gain.disconnect(); }
  }
  function play() {
    // Never queue a late crack behind a suspended context or a hidden scene.
    if (!context || context.state !== 'running' || document.hidden) return false;
    stop();
    try {
      if (!buffer) {
        const samples = cacaoCrackSamples(context.sampleRate);
        buffer = context.createBuffer(1, samples.length, context.sampleRate);
        buffer.getChannelData(0).set(samples);
      }
      const source = context.createBufferSource(), gain = context.createGain();
      source.buffer = buffer; gain.gain.value = .48;
      source.connect(gain); gain.connect(context.destination);
      const current = { source, gain }; voice = current;
      source.onended = () => { source.disconnect(); gain.disconnect(); if (voice === current) voice = null; };
      source.start();
      return true;
    } catch { stop(); return false; }
  }
  return { prepare, play, stop };
}
