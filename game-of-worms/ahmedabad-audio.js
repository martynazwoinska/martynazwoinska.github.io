// Original, quiet procedural effects. No recording, download or autoplay.
export function createAhmedabadAudio() {
  let context=null, generation=0;
  const voices=new Set();
  function cancel() {
    generation++;
    for(const voice of voices) {
      try { voice.stop(); } catch { /* A completed source is already stopped. */ }
    }
    voices.clear();
  }
  function unlock() {
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)return;
    try { context??=new Audio(); context.resume().catch(()=>{}); } catch { /* Audio is optional. */ }
  }
  function play(kind,male=false) {
    if(!context || context.state!=='running' || document.hidden)return;
    const token=generation, now=context.currentTime;
    const duration=kind==='wind'?.9:kind==='soil'?.27:.055;
    const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
    const samples=buffer.getChannelData(0);
    for(let i=0;i<samples.length;i++) {
      const t=i/samples.length;
      const grit=kind==='soil'?.4+.6*Math.abs(Math.sin(i*.013)):1;
      samples[i]=(Math.random()*2-1)*grit*Math.sin(Math.PI*t)**(kind==='wind'?2:.5);
    }
    const source=context.createBufferSource(), filter=context.createBiquadFilter(), gain=context.createGain();
    source.buffer=buffer;
    filter.type=kind==='click'?'bandpass':'lowpass';
    filter.frequency.value=kind==='wind'?650:kind==='soil'?(male?1500:1100):2200;
    filter.Q.value=.7;
    gain.gain.setValueAtTime(0,now);
    gain.gain.linearRampToValueAtTime(kind==='wind'?.055:kind==='soil'?.12:.075,now+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    source.connect(filter);filter.connect(gain);gain.connect(context.destination);
    voices.add(source);
    source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};
    if(token!==generation)return;
    source.start(now);source.stop(now+duration+.02);
  }
  return {unlock,play,cancel};
}
