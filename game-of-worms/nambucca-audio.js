// Original quiet foley synthesis, never a continuous ambience or automatic loop.
export function makeNambuccaFoley(rate,kind) {
  const duration=kind==='brush'?.30:kind==='paper'?.26:.15;
  const data=new Float32Array(Math.ceil(rate*duration));
  let seed=7111,slow=0,last=0;
  for(let i=0;i<data.length;i++) {
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const noise=seed/2147483648-1,t=i/rate;
    slow+=.16*(noise-slow);
    const dry=slow-last;last=slow;
    const envelope=Math.sin(Math.PI*t/duration)**2;
    if(kind==='brush')data[i]=slow*envelope*.26*(.8+.2*Math.sin(t*69));
    else if(kind==='paper')data[i]=dry*envelope*.28;
    else data[i]=(Math.sin(2*Math.PI*410*t)*Math.exp(-t*90)+slow*Math.exp(-t*120))*.19*Math.min(1,t/.001);
  }
  return data;
}
export function createNambuccaSound() {
  let ctx=null;const voices=new Set();
  function unlock() {
    try {const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;ctx??=new Audio();ctx.resume().catch(()=>{});}catch{}
  }
  function stop(){for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
  function play(kind) {
    if(!ctx||ctx.state!=='running'||document.hidden)return;
    const data=makeNambuccaFoley(ctx.sampleRate,kind),buffer=ctx.createBuffer(1,data.length,ctx.sampleRate);
    buffer.copyToChannel(data,0);
    const source=ctx.createBufferSource(),gain=ctx.createGain();
    source.buffer=buffer;gain.gain.value=.28;source.connect(gain);gain.connect(ctx.destination);voices.add(source);
    source.onended=()=>{source.disconnect();gain.disconnect();voices.delete(source);};source.start();
  }
  return {unlock,play,stop};
}
