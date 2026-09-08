// Recorded shovel contact. Kite wind/reel effects retain their existing sound.
// Source and processing are documented in assets/audio/SOURCES.md.
export const ahmedabadDiggingClips=Object.freeze([
  'ahmedabad-dig-spade.wav','ahmedabad-dig-trowel-1.wav','ahmedabad-dig-trowel-2.wav'
].map(name=>new URL(`./assets/audio/${name}`,import.meta.url).href));

export function ahmedabadDiggingCues(male=false) {
  // Clip transients meet maximum blade pressure at 1675 / 1342.5 / 2892.5 ms.
  return male?[{key:'soil0',at:1237,variant:1},{key:'soil1',at:2806,variant:2}]
    :[{key:'soil0',at:1511,variant:0}];
}

export function createAhmedabadAudio() {
  let context=null, generation=0;
  const voices=new Set();
  const buffers=new Map(),loading=new Map();
  function prepare(url) {
    if(buffers.has(url))return Promise.resolve(true);
    if(loading.has(url))return loading.get(url);
    const pending=(async()=>{
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
      try {
        const response=await fetch(url,{signal:controller.signal});
        if(!response.ok)throw Error('Digging recording unavailable');
        buffers.set(url,await context.decodeAudioData(await response.arrayBuffer()));
        return true;
      } catch { return false; }
      finally { clearTimeout(timeout); }
    })();
    loading.set(url,pending);pending.finally(()=>loading.delete(url));return pending;
  }
  function cancel() {
    generation++;
    for(const voice of voices) {
      try { voice.stop(); } catch { /* A completed source is already stopped. */ }
    }
    voices.clear();
  }
  function unlock(kind='kite') {
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)return Promise.resolve(false);
    try {
      context??=new Audio();context.resume().catch(()=>{});
      return kind==='soil'?Promise.all(ahmedabadDiggingClips.map(prepare)).then(results=>results.every(Boolean)):Promise.resolve(true);
    } catch { return Promise.resolve(false); }
  }
  function play(kind,male=false,variant=0,elapsedMs=0) {
    if(!context || context.state!=='running' || document.hidden)return;
    const token=generation, now=context.currentTime;
    if(kind==='soil') {
      const buffer=buffers.get(ahmedabadDiggingClips[variant]),offset=Math.max(0,elapsedMs/1000);
      // A missed loading deadline stays silent. Never play a late or synthetic substitute.
      if(!buffer||offset>=buffer.duration)return;
      const source=context.createBufferSource(),gain=context.createGain();
      source.buffer=buffer;gain.gain.value=male?.7:.8;
      source.connect(gain);gain.connect(context.destination);voices.add(source);
      source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();};
      source.start(0,offset);return;
    }
    if(!['wind','click'].includes(kind))return;
    const duration=kind==='wind'?.9:.055;
    const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
    const samples=buffer.getChannelData(0);
    for(let i=0;i<samples.length;i++) {
      const t=i/samples.length;
      samples[i]=(Math.random()*2-1)*Math.sin(Math.PI*t)**(kind==='wind'?2:.5);
    }
    const source=context.createBufferSource(), filter=context.createBiquadFilter(), gain=context.createGain();
    source.buffer=buffer;
    filter.type=kind==='click'?'bandpass':'lowpass';
    filter.frequency.value=kind==='wind'?650:2200;
    filter.Q.value=.7;
    gain.gain.setValueAtTime(0,now);
    gain.gain.linearRampToValueAtTime(kind==='wind'?.055:.075,now+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    source.connect(filter);filter.connect(gain);gain.connect(context.destination);
    voices.add(source);
    source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};
    if(token!==generation)return;
    source.start(now);source.stop(now+duration+.02);
  }
  return {unlock,play,cancel};
}
