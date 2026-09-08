// Quiet, original synthesized frost and exhaust. No recording or autoplay.
export function cryoSoundScore(reduced = false) {
  const frost = [
    {kind:'frost', at:40, duration:.95, level:.08, hz:3400, endHz:1300},
    {kind:'chime', at:160, duration:.55, level:.035, hz:1568, endHz:1480},
    {kind:'chime', at:470, duration:.6, level:.028, hz:2093, endHz:1976},
    {kind:'chime', at:810, duration:.5, level:.022, hz:2637, endHz:2489}
  ];
  if (reduced) return frost;
  const flight = [
    {kind:'jet', at:1250, duration:1.95, level:.15, hz:280, endHz:1900},
    {kind:'jet', at:1530, duration:1.75, level:.065, hz:350, endHz:2300}
  ];
  // Repeat the same exhaust for the 4100 ms return, with the male 280 ms later.
  return [...frost, ...flight, ...flight.map(hit=>({...hit, at:hit.at+2850}))];
}

export function createN2CryoAudio() {
  let audio = null, active = null, noise = null;
  function cancel() {
    const run = active; active = null;
    if (!run || !audio) return;
    const now = audio.currentTime;
    for (const voice of run.voices) {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setTargetAtTime(0, now, .008);
      try { voice.source.stop(now + .04); } catch { /* Already finished. */ }
    }
  }
  function noiseBuffer() {
    if (!noise) {
      noise = audio.createBuffer(1, Math.ceil(audio.sampleRate * 2.1), audio.sampleRate);
      const data = noise.getChannelData(0);
      // Stable seed gives repeatable sound and avoids a downloaded sound asset.
      let seed = 173;
      for (let i=0; i<data.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        data[i] = seed / 2147483648 - 1;
      }
    }
    return noise;
  }
  function play(hit, at, run) {
    const source = hit.kind === 'chime' ? audio.createOscillator() : audio.createBufferSource();
    const gain = audio.createGain();
    const voice = {source, gain, nodes:[source,gain]}; run.voices.add(voice);
    if (hit.kind === 'chime') {
      source.type = 'sine';
      source.frequency.setValueAtTime(hit.hz, at);
      source.frequency.exponentialRampToValueAtTime(hit.endHz, at + hit.duration);
      source.connect(gain);
    } else {
      source.buffer = noiseBuffer();
      const filter = audio.createBiquadFilter(); voice.nodes.push(filter);
      filter.type = 'bandpass'; filter.Q.value = hit.kind === 'jet' ? .55 : .8;
      filter.frequency.setValueAtTime(hit.hz, at);
      filter.frequency.exponentialRampToValueAtTime(hit.endHz, at + hit.duration * .65);
      filter.frequency.exponentialRampToValueAtTime(hit.kind === 'jet' ? 400 : 900, at + hit.duration);
      source.connect(filter); filter.connect(gain);
    }
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(hit.level, at + (hit.kind === 'jet' ? .45 : .035));
    gain.gain.exponentialRampToValueAtTime(.0001, at + hit.duration);
    gain.connect(audio.destination);
    source.onended = () => { voice.nodes.forEach(n=>n.disconnect()); run.voices.delete(voice); };
    source.start(at); source.stop(at + hit.duration + .03);
  }
  function start(reduced = false) {
    cancel();
    const run = {voices:new Set()}; active = run;
    const began = performance.now();
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) { active = null; return; }
      if (!audio || audio.state === 'closed') { audio = new Audio(); noise = null; }
      // Resume in the original click/keyboard gesture, never from a timer.
      Promise.resolve(audio.resume()).then(() => {
        if (active !== run || document.hidden || audio.state !== 'running') return;
        const elapsed = performance.now() - began;
        for (const hit of cryoSoundScore(reduced)) {
          if (hit.at >= elapsed) play(hit, audio.currentTime + (hit.at - elapsed) / 1000, run);
        }
      }).catch(() => { if (active === run) cancel(); });
    } catch { cancel(); /* Animation stays usable when audio is unavailable. */ }
  }
  return {start, cancel};
}
